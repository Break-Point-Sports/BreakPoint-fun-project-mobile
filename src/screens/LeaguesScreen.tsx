import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useRef, useState } from 'react';
import { Button, SegmentedButtons } from 'react-native-paper';

const GET_USER_TOURNAMENTS_LAMBDA_URL = ''

const LeaguesScreen = () => {
  const cognitoId = useSelector(state => state.user.cognitoId)
  const currentLeague = useSelector(state => state.user.currentLeague)
  const pastLeagues = useSelector(state => state.user.pastLeagues)
  const signUpForLeagueRef = useRef();
  const submitScoreButton = useRef();

  // const tournaments = useSelector(state => state.tournaments.tournaments)
  const dispatch = useDispatch();
  const [toggleValue, setToggleValue] = useState('current');



  return (
    <View
      style={styles.root}
    > 

      <SegmentedButtons
        value={toggleValue}
        onValueChange={setToggleValue}
        buttons={[
          {
            value: 'current',
            label: 'Current League',
          },
          { 
            value: 'past', 
            label: 'Past Leagues' 
          },
        ]}
      />
      {

        toggleValue === 'current' ?

          currentLeague !== 'none' ? 
            <>
              <Text>
                Skill Level:
              </Text>
              <Text>
                Start Date:
              </Text>
              <Text>
                End Date:
              </Text>
              <Text>
                Playoff Start Date:
              </Text>
              <Text>
                Minimum wins to qualify for playoffs:
              </Text>
              <Text>
                Players:
              </Text>
              <ScrollView>
                
              </ScrollView>
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
                onPress={() => console.log("yellooo")}
                style={styles.joinLeagueButton}
                labelStyle={styles.joinLeagueButtonLabel}
              >
                {"Join Now"}
              </Button>
            </View>
          :

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
      }
        <View
        style={styles.submitScoreButtonView}
        >
        <Button 
            mode="contained" 
            onPress={() => console.log(currentLeague)}
            style={styles.submitScoreButton}
            labelStyle={styles.submitScoreButtonLabel}
          >
            {"Submit Score"}
          </Button>
        </View>

    </View>
  );
}

const styles = StyleSheet.create({
  conversations: {
  },
  img: {
    width: 150,
    height: 200,
    borderRadius: 20,
    backgroundColor: 'grey',
    marginTop: 1,
    marginLeft: 5,
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

  notCurrentLeagueText: {
    fontSize: 30,
    textAlign: 'center',
    marginTop: 0,
    marginBottom: 20
  },
  yourLeagueText: {
    alignSelf: 'center',
    fontSize: 30,
    marginLeft:5
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
})
export default LeaguesScreen;



