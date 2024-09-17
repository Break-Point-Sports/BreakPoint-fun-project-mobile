import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

const GET_USER_TOURNAMENTS_LAMBDA_URL = ''

const LeaguesScreen = () => {
  const cognitoId = useSelector(state => state.user.cognitoId)
  // const tournaments = useSelector(state => state.tournaments.tournaments)
  const dispatch = useDispatch();

  const tournaments = [] // temp place holder


  return (
    <View
      style={styles.root}
    > 
      <Text
        style={styles.likesText}
      >
        Your Leagues
      </Text>
      
      {
        tournaments.length === 0 ? 
          <Text>
            No Leagues Yet.
          </Text>
        :
          <View>
            <ScrollView
              horizontal
              style={styles.horizontalScrollView}
              showsHorizontalScrollIndicator={false}
            >
              {}
            </ScrollView>
          </View>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  conversations: {
  },
  horizontalScrollView: {
    height: 200,
  },
  img: {
    width: 150,
    height: 200,
    borderRadius: 20,
    backgroundColor: 'grey',
    marginTop: 1,
    marginLeft: 5,
  },
  likesText: {
    alignSelf: 'flex-start',
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
})
export default LeaguesScreen;



