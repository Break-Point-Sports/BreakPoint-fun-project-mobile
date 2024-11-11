import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import ConversationItem from '../random/ConversationItem';
import { useEffect } from 'react';
import { generateClient } from 'aws-amplify/data';
import { fetchAuthSession } from 'aws-amplify/auth';
import { listRooms } from '../graphql/queries';

const MessagingScreen = () => {
  const cognitoId = useSelector(state => state.user.cognitoId)
  // const matches = useSelector(state => state.matches.matches)
  const dispatch = useDispatch();

  const messages = [] // temp placeholder



  useEffect(() => {

    getMessages()

    // console.log("Messages")
    // console.log(result)

  }, []);
  

  const getMessages = async() => {    
    try {
      const session = await fetchAuthSession();

      const client = generateClient({
        authMode: 'userPool',
        authToken: session.tokens.accessToken.toString()
      });
      
      console.log("Calling client")
      const result = await client.graphql({query: listRooms})
      console.log(result)

    } catch (error) {
      console.log(error);

    }
    
  }

  

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



