import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import ConversationItem from '../random/ConversationItem';



const MessagingScreen = () => {
  const cognitoId = useSelector(state => state.user.cognitoId)
  // const matches = useSelector(state => state.matches.matches)
  const dispatch = useDispatch();

  const messages = [] // temp placeholder


  return (
    <View
      style={styles.root}
    > 
      <Text
        style={styles.likesText}
      >
        Messaging
      </Text>
      
      {
        messages.length !== 0 ? 
          <Text>
            No Messages Yet.
          </Text>
        :
          <>
            <ScrollView
              style={styles.conversations}
            >
              <ConversationItem />
              <ConversationItem />
              <ConversationItem />
              <ConversationItem />
            </ScrollView>
            </>
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
export default MessagingScreen;



