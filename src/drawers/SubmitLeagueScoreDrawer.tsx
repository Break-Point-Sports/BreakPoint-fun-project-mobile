import RBSheet from 'react-native-raw-bottom-sheet';
import { View, Text, Dimensions, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native'
import { IconButton, Button, SegmentedButtons } from 'react-native-paper';
import { useState, useEffect, useRef } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useSelector } from 'react-redux';

import commonStyles from '../util/CommonStyles';
import getLeagueContacts from '../util/GetLeagueContacts';
import SubmitScoreLeagueContactsDrawer from './SubmitScoreLeagueContactsDrawer';
import { SUBMIT_NEW_MATCH_LAMBDA_URL } from '../util/Constants';

const SubmitLeagueScoreDrawer = ({ submitLeagueScoreDrawerRef }) => {

  const cognitoId = useSelector(state => state.user.cognitoId)
  const currentLeague = useSelector(state => state.user.currentLeague)

  const submitScoreLeagueContactsDrawerRef = useRef();

  const [leagueContacts, setLeagueContacts] = useState([]);
  const [date, setDate] = useState(new Date());
  const [matchWinnerToggleValue, setMatchWinnerToggleValue] = useState('winner');
  const [set1WinnerToggleValue, setSet1WinnerToggleValue] = useState('');
  const [set2WinnerToggleValue, setSet2WinnerToggleValue] = useState('');
  const [matchFormatToggleValue, setMatchFormatToggleValue] = useState('2sets');
  const [opponent, setOpponent] = useState('')
  const [buttonDisabled, setButtonDisabled] = useState(true)
  const [set1WinnerScore, setSet1WinnerScore] = useState('');
  const [set1LoserScore, setSet1LoserScore] = useState('');
  const [set2WinnerScore, setSet2WinnerScore] = useState('');
  const [set2LoserScore, setSet2LoserScore] = useState('');
  const [set3WinnerScore, setSet3WinnerScore] = useState('');
  const [set3LoserScore, setSet3LoserScore] = useState('');
  const [tiebreakerWinnerScore, setTiebreakerWinnerScore] = useState('');
  const [tiebreakerLoserScore, setTiebreakerLoserScore] = useState('');


  useEffect(() => {
    getCurrentLeagueContacts()
  }, [])

  const getCurrentLeagueContacts = async() => {

    const body = await getLeagueContacts(currentLeague)
    const contactsArray = []
    for (const contact of body) {
      if (contact.cognitoId != cognitoId) {
        contactsArray.push(contact)
      }
    }
    console.log("contacts array: " + contactsArray)
    setLeagueContacts(contactsArray);
    return body
  }

  const onChange = (event, selectedDate) => {
    setDate(selectedDate);
    const dateToSave = selectedDate.getMonth() + '-' + selectedDate.getDate() + '-' + selectedDate.getFullYear()
    console.log(dateToSave)
  };

  const onSubmit = async() => {
    let body ={
      leagueId: currentLeague,
      matchFormat: matchFormatToggleValue,
      matchDay: date.getDate(),
      matchMonth: date.getMonth() + 1,
      matchYear: date.getFullYear(),
      matchWinner: matchWinnerToggleValue === 'winner' ? cognitoId : opponent.cognitoId,
      matchLoser: matchWinnerToggleValue === 'loser' ? cognitoId : opponent.cognitoId,
      set1WinnerScore: set1WinnerScore,
      set1LoserScore: set1LoserScore,
      set2WinnerScore: set2WinnerScore,
      set2LoserScore: set2LoserScore,
    }

    if (matchFormatToggleValue !== '2sets') {
      body.set1Winner = set1WinnerToggleValue === 'me' ? cognitoId : opponent.cognitoId
      body.set1Loser = set1WinnerToggleValue === 'opponent' ? cognitoId : opponent.cognitoId
      body.set2Winner = set2WinnerToggleValue === 'me' ? cognitoId : opponent.cognitoId
      body.set2Loser = set2WinnerToggleValue === 'opponent' ? cognitoId : opponent.cognitoId
    
      if (matchFormatToggleValue === '3sets') {
        body.set3WinnerScore = set3WinnerScore
        body.set3LoserScore = set3LoserScore
      } else {
        body.tiebreakerWinnerScore = tiebreakerWinnerScore
        body.tiebreakerLoserScore = tiebreakerLoserScore
      }
    }

    console.log("Submit match body:")
    console.log(JSON.stringify(body))

    const response = await fetch (SUBMIT_NEW_MATCH_LAMBDA_URL, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(body)
    })

    if (response.status === 200) {
      console.log("successfully added match")
      setOpponent('')
      setMatchFormatToggleValue('2sets')
      setSet1WinnerScore('')
      setSet1LoserScore('')
      setSet2WinnerScore('')
      setSet2LoserScore('')
      setSet3WinnerScore('')
      setSet3LoserScore('')
      setSet1WinnerToggleValue('')
      setSet2WinnerToggleValue('')
      setMatchWinnerToggleValue('winner')
      submitLeagueScoreDrawerRef.current.close()

    } else {
      console.log("Status Code: " + response.status)
      alert("Something went wrong creating new match")
    }
    
  }

  return (
    <RBSheet
      ref={submitLeagueScoreDrawerRef}
      closeOnPressMask={false}
      height={Dimensions.get('window').height}
      customStyles={{
        wrapper: {
            backgroundColor: "transparent"
        },
        draggableIcon: {
            backgroundColor: "#000"
        }
      }}
  >
    <View
      style={commonStyles.drawerHeader}
    >
      <IconButton
        icon='close'
        iconColor='#9C11E6'
        size={40}
        onPress={() => submitLeagueScoreDrawerRef.current.close()}
        style={commonStyles.closeButton}
      />
      <Text
        style={commonStyles.drawerHeaderText}
      > 
        Submit Score
      </Text>
    </View>
    <Text
          style={styles.submitScorePrompt}
        >
          Did you win or lose?
        </Text>
    <SegmentedButtons
        value={matchWinnerToggleValue}
        onValueChange={setMatchWinnerToggleValue}
        buttons={[
          {
            value: 'winner', 
            label: 'Won' 
          },
          {
            value: 'loser',
            label: 'Lost',
          }
        ]}
        style={styles.segmentedButtons}
      />
    <ScrollView
      style={styles.inputView}
    >
      <TouchableOpacity
        onPress={() => submitScoreLeagueContactsDrawerRef.current.open()}
      >
        {matchWinnerToggleValue === 'winner' ?
          <Text
            style={styles.submitScorePrompt}
          >
            Opponent (Loser)
          </Text>
        :
          <Text
            style={styles.submitScorePrompt}
          >
            Opponent (Winner)
          </Text>
        }
        <Button
          style={styles.button}
          labelStyle={styles.label}
        >
          {opponent?.firstName} {opponent?.lastName}
        </Button>
      </TouchableOpacity>
        <Text
          style={styles.submitScorePrompt}
        >
          Match Format
        </Text>
        <SegmentedButtons
          value={matchFormatToggleValue}
          onValueChange={setMatchFormatToggleValue}
          buttons={[
            {
              value: '2sets', 
              label: '2 Sets' 
            },
            {
              value: '3sets',
              label: '3 Sets',
            },
            {
              value: 'tiebreaker',
              label: 'Tiebreaker',
            }
          ]}
          style={styles.segmentedButtons}
        />
      {
        matchFormatToggleValue !== '2sets' ?
          <>
            <Text
              style={styles.submitScorePrompt}
            >
              Set 1 Winner
            </Text>
            <SegmentedButtons
              value={set1WinnerToggleValue}
              onValueChange={setSet1WinnerToggleValue}
              buttons={[
                {
                  value: 'me', 
                  label: 'Me' 
                },
                {
                  value: 'opponent',
                  label: 'Opponent',
                }
              ]}
              style={styles.segmentedButtons}
            />
          </>
        :
        <></>
      }
        <Text
          style={styles.submitScorePrompt}
        >
          Set 1 Score
        </Text>
        <View
          style={styles.scoreView}
        >
          <Text
            style={styles.scoreLabel}
          >
            Winner
          </Text>
          <TouchableOpacity>
            <TextInput
              style={styles.scoreInput}
              maxLength={1}
              keyboardType='numeric'
              value={set1WinnerScore}
              onChangeText={value => setSet1WinnerScore(value)}
            />
          </TouchableOpacity>
          <Text
            style={styles.hyphen}
          >
            -
          </Text>
          <TouchableOpacity>
          <TextInput
              style={styles.scoreInput}
              maxLength={1}
              keyboardType='numeric'
              value={set1LoserScore}
              onChangeText={value => setSet1LoserScore(value)}
            />
          </TouchableOpacity>
          <Text
            style={styles.scoreLabel}
          >
            Loser
          </Text>
        </View>
        {
          matchFormatToggleValue !== '2sets' ?
            <>
              <Text
                style={styles.submitScorePrompt}
              >
                Set 2 Winner
              </Text>
              <SegmentedButtons
                value={set2WinnerToggleValue}
                onValueChange={setSet2WinnerToggleValue}
                buttons={[
                  {
                    value: 'me', 
                    label: 'Me' 
                  },
                  {
                    value: 'opponent',
                    label: 'Opponent',
                  }
                ]}
                style={styles.segmentedButtons}
              />
          </>
        :
          <></>
        }

        <Text
          style={styles.submitScorePrompt}
        >
          Set 2 Score
        </Text>
        <View
          style={styles.scoreView}
        >
          <Text
            style={styles.scoreLabel}
          >
            Winner
          </Text>
          <TouchableOpacity>
            <TextInput
              style={styles.scoreInput}
              maxLength={1}
              keyboardType='numeric'
              value={set2WinnerScore}
              onChangeText={value => setSet2WinnerScore(value)}
            />
          </TouchableOpacity>
          <Text
            style={styles.hyphen}
          >
            -
          </Text>
          <TouchableOpacity>
          <TextInput
              style={styles.scoreInput}
              maxLength={1}
              keyboardType='numeric'
              value={set2LoserScore}
              onChangeText={value => setSet2LoserScore(value)}
            />
          </TouchableOpacity>
          <Text
            style={styles.scoreLabel}
          >
            Loser
          </Text>
        </View>
      {matchFormatToggleValue === '3sets' ?
          <>
            <Text
              style={styles.submitScorePrompt}
            >
              Set 3 Score
            </Text>
            <View
              style={styles.scoreView}
            >
              <Text
                style={styles.scoreLabel}
              >
                Winner
              </Text>
              <TouchableOpacity>
                <TextInput
                  style={styles.scoreInput}
                  maxLength={1}
                  keyboardType='numeric'
                  value={set3WinnerScore}
                  onChangeText={value => setSet3WinnerScore(value)}
                />
              </TouchableOpacity>
              <Text
                style={styles.hyphen}
              >
                -
              </Text>
              <TouchableOpacity>
                <TextInput
                  style={styles.scoreInput}
                  maxLength={1}
                  keyboardType='numeric'
                  value={set3LoserScore}
                  onChangeText={value => setSet3LoserScore(value)}
                />
              </TouchableOpacity>
              <Text
                style={styles.scoreLabel}
              >
                Loser
              </Text>
            </View>
          </>
        :
        matchFormatToggleValue === 'tiebreaker' ?
            <>
              <Text
                style={styles.submitScorePrompt}
              >      
                Tiebreaker Score
              </Text>
              <View
                style={styles.scoreView}
              >
                <Text
                  style={styles.scoreLabel}
                >
                  Winner
                </Text>
                <TouchableOpacity>
                  <TextInput
                    style={styles.scoreInput}
                    maxLength={2}
                    keyboardType='numeric'
                    value={tiebreakerWinnerScore}
                    onChangeText={value => setTiebreakerWinnerScore(value)}
                  />
                </TouchableOpacity>
                <Text
                  style={styles.hyphen}
                >
                  -
                </Text>
              <TouchableOpacity>
                <TextInput
                  style={styles.scoreInput}
                  maxLength={2}
                  keyboardType='numeric'
                  value={tiebreakerLoserScore}
                  onChangeText={value => setTiebreakerLoserScore(value)}
                />
              </TouchableOpacity>
              <Text
                style={styles.scoreLabel}
              >
                Loser
              </Text>
            </View>
            </>
          : 
            <></>
      }  
      <Text
        style={styles.submitScorePrompt}
      >
        Match Date
      </Text>
      <DateTimePicker
        style={styles.datePicker}
        textColor='black'
        display='spinner'
        value={date}
        mode='date'
        onChange={onChange}
      />
    </ScrollView>
      { ((matchFormatToggleValue === '2sets' && opponent !== '' && set1WinnerScore !== '' && set1LoserScore !== '' && set2WinnerScore !== '' && set2LoserScore !== '')
        || (matchFormatToggleValue === '3sets'&& opponent !== '' && set1WinnerScore !== '' && set1LoserScore !== '' && set2WinnerScore !== '' && set2LoserScore !== '' && set3WinnerScore !== '' && set3LoserScore !== '')
        || (matchFormatToggleValue === 'tiebreaker'&& opponent !== '' && set1WinnerScore !== '' && set1LoserScore !== '' && set2WinnerScore !== '' && set2LoserScore !== '' && tiebreakerWinnerScore !== '' && tiebreakerLoserScore !== '')) ?
        <TouchableOpacity
          onPress={() => console.log("pressed")}
        >
          <Button 
            mode="contained" 
            style={styles.submitButton}
            labelStyle={styles.submitButtonLabel}
            onPress={() => onSubmit()}
            >
              Submit
            </Button> 
          </TouchableOpacity>        


        :
          <Button 
            mode="contained" 
            style={styles.submitButtonDisabled}
            labelStyle={styles.submitButtonLabel}
            disabled
          >
            Submit
          </Button>
    }
  <SubmitScoreLeagueContactsDrawer 
    submitScoreLeagueContactsDrawerRef={submitScoreLeagueContactsDrawerRef}
    leagueContacts={leagueContacts}
    setOpponent={setOpponent}
  />

  </RBSheet>
  )
}

const styles = StyleSheet.create({
  button: {
    borderColor: '#9C11E6',
    borderWidth: 1,
    marginBottom: 10,
    padding: 5,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  datePicker:{
    alignSelf: 'center',
  },
  hyphen: {
    fontSize: 25,
    alignSelf: 'center'
  },
  inputView: {
    flex: 1,
  },
  label: {
    color: 'black',
    fontSize:20
  },
  scoreView: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  segmentedButtons: {
    marginTop: 20,
    marginBottom: 10,
    marginHorizontal: 10,
  },
  scoreInput: {
    borderColor: '#9C11E6',
    borderWidth: 1,
    flex: 1,
    width: 70,
    borderRadius: 15,
    padding: 10,
    fontSize: 25,
    textAlign: 'center',
    margin: 15
  },
  scoreLabel: {
    fontSize: 25,
    alignSelf: 'center'
  },
  submitScorePrompt: {
    alignSelf: 'center',
    fontSize: 25,
    marginTop: 20
  },
  submitButton: {
    display: 'flex',
    width: 320,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#9C11E6',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 25,
    marginTop: 10
  },
  submitButtonDisabled: {
    display: 'flex',
    width: 320,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(156, 17, 230, 0.25)',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 25,
    marginTop: 10
  },
  submitButtonLabel: {
    fontSize: 18,
    color: '#fff',
  },
})

export default SubmitLeagueScoreDrawer