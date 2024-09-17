import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import ConversationItem from '../random/ConversationItem';
import { useSelector, useDispatch } from 'react-redux';
import { addMatch } from '../redux/slices/matchesSlice';
import { useEffect } from 'react';
import MatchTileMatchesScreen from '../random/MatchTileMatchesScreen';

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
        New Matches
      </Text>
      
      {
        tournaments.length === 0 ? 
          <Text>
            No Matches Yet.
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



