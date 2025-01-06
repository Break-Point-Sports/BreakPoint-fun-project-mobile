import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { useRef, useState, useEffect } from 'react';
import { Button, SegmentedButtons } from 'react-native-paper';

import JoinLeagueDrawer from '../drawers/JoinLeagueDrawer';
import JoinFutureLeagueDrawer from '../drawers/JoinFutureLeagueDrawer';
import { GET_LEAGUE_INFO_LAMBDA_URL, GET_LEAGUE_RECORD_LAMBDA_URL } from '../util/Constants';
import getLeagueContacts from '../util/GetLeagueContacts';
import SubmitLeagueScoreDrawer from '../drawers/SubmitLeagueScoreDrawer';

const LeaguesScreen = () => {
  const cognitoId = useSelector(state => state.user.cognitoId)
  const currentLeague = useSelector(state => state.user.currentLeague)
  const futureLeague = useSelector(state => state.user.futureLeague)
  const pastLeagues = useSelector(state => state.user.pastLeagues)
  const joinLeagueDrawerRef = useRef();
  const joinFutureLeagueRef = useRef();
  const submitLeagueScoreDrawerRef = useRef();

  const [leaguePlayerRecords, setLeaguePayerRecords] = useState({});
  const [currentLeaguePlayers, setCurrentLeaguePlayers] = useState([]);
  const [futureLeaguePlayers, setFutureLeaguePlayers] = useState([]);
  const [toggleValue, setToggleValue] = useState('current');
  const [currentLeagueInfo, setCurrentLeagueInfo] = useState(null);
  const [futureLeagueInfo, setFutureLeagueInfo] = useState(null);


  useEffect(() => {
    if (currentLeague) {
      getCurrentLeagueInfo()
      getCurrentLeaguePlayers();
    }

    if (futureLeague) {
      getFutureLeagueInfo()
    }
  }, [])

  useEffect(() => {
    getCurrentLeagueInfo()
  }, [currentLeague])
  
  useEffect(() => {
    getFutureLeagueInfo()
  }, [futureLeague])

  const getCurrentLeagueInfo = async() => {
    const body = await getLeagueInfo(currentLeague);
    setCurrentLeagueInfo(body);
  }

  const getCurrentLeaguePlayers = async() => {
    console.log("Getting league contacts")
    const body = await getLeagueContacts(currentLeague);
    console.log(body)
    const contactsArray = []
    const leaguePlayerRecords = {}
    for (const contact of body) {
      if (contact.cognitoId != cognitoId) {
        const record = await getLeagueRecord(contact.cognitoId, currentLeague);
        leaguePlayerRecords[contact.cognitoId] = record;
        contactsArray.push(contact)
      }
    }
    console.log("leaguePlayerRecords: ")
    console.log(leaguePlayerRecords);
    console.log("contacts array: ")
    console.log(contactsArray)
    setLeaguePayerRecords(leaguePlayerRecords);
    setCurrentLeaguePlayers(contactsArray);
  }

  const getFutureLeagueInfo = async() => {
    const body = await getLeagueInfo(futureLeague);
    setFutureLeagueInfo(body);
  }

  const getLeagueInfo = async (leagueId) => {
    const URI = GET_LEAGUE_INFO_LAMBDA_URL + `?leagueId=${leagueId}`;
    console.log("Fetching league info: " + URI);
    const response = await fetch(URI, {method: 'GET'});
    const body = await response.json();
    console.log("body:")
    console.log(body);
    return body;
  }

  const getLeagueRecord = async(cognitoId, leagueId) => {
    const URI = GET_LEAGUE_RECORD_LAMBDA_URL + `?cognitoId=${cognitoId}&leagueId=${leagueId}`
    console.log(`Fetching league record for: cognitoId=${cognitoId}&leagueId=${leagueId}`)
    const response = await fetch(URI, {method: 'GET'});
    const body = response.json();
    console.log(body);
    return body;
  }

  return (
    <View
      style={styles.root}
    > 
      <Text
        style={styles.currentLeaguesText}
      > 
        League Play
      </Text>
      <SegmentedButtons
        value={toggleValue}
        onValueChange={setToggleValue}
        buttons={[
          {
            value: 'future', 
            label: 'Future' 
          },
          {
            value: 'current',
            label: 'Current',
          },
          { 
            value: 'past', 
            label: 'Past' 
          },
        ]}
      />
      {

        toggleValue === 'current' ?

          currentLeague !== 'none' && currentLeagueInfo !== null ?
            <>
              <View
                style={styles.leagueInfoView}
              >
                <View
                  style={styles.textRow}
                >
                  <Text
                    style={styles.leagueInfoText}
                  >
                    Skill Level: 
                  </Text>
                  <Text
                    style={styles.leagueInfoText}
                  >
                    {currentLeagueInfo.tennisLevel.substring(0,1).toUpperCase() + currentLeagueInfo.tennisLevel.substring(1)}
                  </Text>
                </View>
                <View
                  style={styles.textRow}
                >
                  <Text
                    style={styles.leagueInfoText}
                  >
                    Start Date:
                  </Text>
                  <Text
                    style={styles.leagueInfoText}
                  >
                    {currentLeagueInfo.startMonth + '-' + currentLeagueInfo.startDay + '-' + currentLeagueInfo.startYear}
                  </Text>
                </View>
                <View
                  style={styles.textRow}
                >
                  <Text
                    style={styles.leagueInfoText}
                  >
                    End Date:
                  </Text>
                  <Text
                    style={styles.leagueInfoText}
                  >
                    {currentLeagueInfo.endMonth + '-' + currentLeagueInfo.endDay + '-' + currentLeagueInfo.endYear}
                  </Text>
                </View>
                <View
                  style={styles.textRow}
                >
                  <Text
                    style={styles.leagueInfoText}
                  >
                    Playoff Start Date:
                  </Text>
                  <Text
                    style={styles.leagueInfoText}
                  >
                    {currentLeagueInfo.endMonth + '-' + currentLeagueInfo.endDay + '-' + currentLeagueInfo.endYear}
                  </Text>
                </View>

                <View
                  style={styles.textRow}
                >
                  <Text
                    style={styles.leagueInfoText}
                  >
                    Wins to qualify for playoffs:
                  </Text>
                  <Text
                    style={styles.leagueInfoText}
                  >
                    {currentLeagueInfo.playoffWins}
                  </Text>
                </View>
              </View>

              <Text
                style={styles.playersText}
              >
                Players:
              </Text>
              <ScrollView>
                {currentLeaguePlayers.map((player,key) => {
                  return <TouchableOpacity key={key} style={styles.playerNameView}><Text style={styles.playerName}>{player.firstName} {player.lastName}</Text><Text style={styles.recordText}>{leaguePlayerRecords[player.cognitoId].wins}-{leaguePlayerRecords[player.cognitoId].losses}</Text></TouchableOpacity>
                })}
              </ScrollView>
              <View
                style={styles.submitScoreButtonView}
              >
                <TouchableOpacity
                  onPress={() => submitLeagueScoreDrawerRef.current.open()}
                >
                  <Button 
                    mode="contained" 
                    style={styles.submitScoreButton}
                    labelStyle={styles.submitScoreButtonLabel}
                  >
                    {"Submit Score"}
                  </Button>
                </TouchableOpacity>

              </View>
            </>
          :
            <View
              style={styles.joinLeagueView}
            >
              <Text
                style={styles.notCurrentLeagueText}
              >
                You aren't currently in a league.
              </Text>
              <Button 
                mode="contained" 
                onPress={() => joinLeagueDrawerRef.current.open()}
                style={styles.joinLeagueButton}
                labelStyle={styles.joinLeagueButtonLabel}
              >
                {"View Leagues"}
              </Button>
            </View>
        :
          toggleValue === 'past' ?

            pastLeagues.length > 0 ?
              <></>
            :
              <View
              style={styles.joinLeagueView}
            >
              <Text
                style={styles.notCurrentLeagueText}
              >
                No past leagues to display
              </Text>
            </View>

          :
            futureLeague === 'none' || futureLeagueInfo === null ?
              <View
                style={styles.joinLeagueView}
              >
                <Text
                  style={styles.notCurrentLeagueText}
                >
                  You haven't joined any future leagues.
                </Text>
                <Button 
                  mode="contained" 
                  onPress={() => joinFutureLeagueRef.current.open()}
                  style={styles.joinLeagueButton}
                  labelStyle={styles.joinLeagueButtonLabel}
                >
                  {"View Leagues"}
                </Button>
              </View>
            :
            <>
              <View
                style={styles.leagueInfoView}
              >
                <View
                  style={styles.textRow}
                >
                  <Text
                    style={styles.leagueInfoText}
                  >
                    Skill Level: 
                  </Text>
                  <Text
                    style={styles.leagueInfoText}
                  >
                    {futureLeagueInfo.tennisLevel.substring(0,1).toUpperCase() + futureLeagueInfo.tennisLevel.substring(1)}
                  </Text>
                </View>
                <View
                  style={styles.textRow}
                >
                  <Text
                    style={styles.leagueInfoText}
                  >
                    Start Date:
                  </Text>
                  <Text
                    style={styles.leagueInfoText}
                  >
                    {futureLeagueInfo.startMonth + '-' + futureLeagueInfo.startDay + '-' + futureLeagueInfo.startYear}
                  </Text>
                </View>
                <View
                  style={styles.textRow}
                >
                  <Text
                    style={styles.leagueInfoText}
                  >
                    End Date:
                  </Text>
                  <Text
                    style={styles.leagueInfoText}
                  >
                    {futureLeagueInfo.endMonth + '-' + futureLeagueInfo.endDay + '-' + futureLeagueInfo.endYear}
                  </Text>
                </View>
                <View
                  style={styles.textRow}
                >
                  <Text
                    style={styles.leagueInfoText}
                  >
                    Playoff Start Date:
                  </Text>
                  <Text
                    style={styles.leagueInfoText}
                  >
                    {futureLeagueInfo.endMonth + '-' + futureLeagueInfo.endDay + '-' + futureLeagueInfo.endYear}
                  </Text>
                </View>

                <View
                  style={styles.textRow}
                >
                  <Text
                    style={styles.leagueInfoText}
                  >
                    Wins to qualify for playoffs:
                  </Text>
                  <Text
                    style={styles.leagueInfoText}
                  >
                    {futureLeagueInfo.playoffWins}
                  </Text>
                </View>
              </View>
              <Text
                style={styles.playersText}
              >
                Players:
              </Text>
              <ScrollView>
                
              </ScrollView>
            </>

      }
        <JoinLeagueDrawer 
          joinLeagueRef={joinLeagueDrawerRef}
        />
        <JoinFutureLeagueDrawer
          joinFutureLeagueRef={joinFutureLeagueRef}
        />
        <SubmitLeagueScoreDrawer
          submitLeagueScoreDrawerRef={submitLeagueScoreDrawerRef}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  currentLeaguesText: {
    fontSize: 30,
    textAlign: 'center',
    marginTop: 0,
    marginBottom: 20
  },
  joinLeagueButton: {
    display: 'flex',
    width: 320,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#9C11E6',
    justifyContent: 'center',
  },
  joinLeagueButtonLabel: {
    fontSize: 18,
    color: '#fff',
  },
  joinLeagueView: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  leagueInfoText: {
    fontSize: 20
  },
  leagueInfoView: {
    borderWidth: 1,
    borderColor: '#9C11E6',
    margin: 10,
    padding: 10,
    borderRadius: 10
  },
  notCurrentLeagueText: {
    fontSize: 30,
    textAlign: 'center',
    marginTop: 0,
    marginBottom: 20
  },
  playersText: {
    fontSize: 20,
    alignSelf: 'center'
  },
  playerName: {
    fontSize: 20,
    paddingLeft: 10
  },
  playerNameView:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15
  },
  recordText: {
    fontSize: 20,
    paddingRight: 10
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    flex: 1,
    height: '100%',
    width: '100%',
    backgroundColor: 'white',
  },
  submitScoreButton: {
    display: 'flex',
    width: 320,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#9C11E6',
    justifyContent: 'center',
  },
  submitScoreButtonLabel: {
    fontSize: 18,
    color: '#fff',
  },
  submitScoreButtonView: {
    width: '100%',
    display: 'flex',
    alignItems: 'center'
  },
  textRow: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})
export default LeaguesScreen;



