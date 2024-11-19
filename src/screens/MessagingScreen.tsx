import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { IconButton } from 'react-native-paper';

import ConversationItem from '../random/ConversationItem';
import { useEffect } from 'react';
import { generateClient } from 'aws-amplify/data';
import { fetchAuthSession } from 'aws-amplify/auth';
import { listRooms } from '../graphql/queries';

const MessagingScreen = () => {
  const [rooms, setRooms] = useState([]);
  const cognitoId = useSelector(state => state.user.cognitoId)
  // const matches = useSelector(state => state.matches.matches)
  const dispatch = useDispatch();




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
      setRooms(result["data"]["listRooms"]["items"])
      console.log(rooms)

    } catch (error) {
      console.log(error);

    }
    
  }

  const getRooms = () => {
    for (const room in rooms) {
      return <ConversationItem/>
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
        rooms.length == 0 ? 
          <Text>
            No Messages Yet.
          </Text>
        :
          <>
            <ScrollView
              style={styles.conversations}
            >
              {rooms.map((room, key) => {
                return <ConversationItem key={key}/>
              })}
            </ScrollView>
            </>
      }
      {/* <IconButton
        icon='arrow-right'
        color={'grey'}
        size={40}
        style={styles.arrowIcon}
        disabled={imageURL !== null ? false : true}
        onPress={() => newMessage()}
      /> */}
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



