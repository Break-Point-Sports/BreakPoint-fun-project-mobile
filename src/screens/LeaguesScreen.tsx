import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import { useSelector } from 'react-redux';
import { useRef, useState, useEffect } from 'react';
import { Button, SegmentedButtons } from 'react-native-paper';
import JoinLeagueDrawer from '../drawers/JoinLeagueDrawer';
import JoinFutureLeagueDrawer from '../drawers/JoinFutureLeagueDrawer';
import { GET_LEAGUE_INFO_LAMBDA_URL } from '../util/Constants';

const LeaguesScreen = () => {
  const cognitoId = useSelector(state => state.user.cognitoId)
  const currentLeague = useSelector(state => state.user.currentLeague)
  const pastLeagues = useSelector(state => state.user.pastLeagues)
  const joinLeagueDrawerRef = useRef();
  const joinFutureLeagueRef = useRef();
  const submitScoreButton = useRef();

  // const tournaments = useSelector(state => state.tournaments.tournaments)
  const [toggleValue, setToggleValue] = useState('current');
  const [currentLeagueInfo, setCurrentLeagueInfo] = useState(null);

  useEffect(() => {
    if (currentLeague) {
      getLeagueInfo()
    }
  }, [])

  useEffect(() => {
      getLeagueInfo()
  }, [currentLeague])
  
  const getLeagueInfo = async() => {
    const URI = GET_LEAGUE_INFO_LAMBDA_URL + `/?leagueId=${currentLeague}`;
    console.log("Fetching " + URI);
    const response = await fetch(URI, {method: 'GET'});
    const body = await response.json();
    console.log(body);
    setCurrentLeagueInfo(body);
  }

  return (
    <View
      style={styles.root}
    > 
      <Text
        style={styles.currentLeaguesText}
      > 
        Your Leagues
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

          currentLeague !== 'none' ? 
            <>
              <Text>
                Skill Level: {currentLeagueInfo?.tennisLevel}
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
        <JoinLeagueDrawer 
          joinLeagueRef={joinLeagueDrawerRef}
        />
        <JoinFutureLeagueDrawer
          joinFutureLeagueRef={joinFutureLeagueRef}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  conversations: {
  },
  currentLeaguesText: {
    fontSize: 30,
    textAlign: 'center',
    marginTop: 0,
    marginBottom: 20
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



