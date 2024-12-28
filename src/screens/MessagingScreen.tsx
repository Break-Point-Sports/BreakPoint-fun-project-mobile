import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import { useSelector } from 'react-redux';
import { useState, useRef } from 'react';
import { Button } from 'react-native-paper';
import { useEffect } from 'react';
import { generateClient } from 'aws-amplify/data';
import { fetchAuthSession } from 'aws-amplify/auth';
import { listRooms } from '../graphql/queries';

import NewMessageDrawer from '../drawers/NewMessageDrawer';
import ConversationItem from '../random/ConversationItem';

const MessagingScreen = () => {
  const cognitoId = useSelector(state => state.user.cognitoId)
  
  const [rooms, setRooms] = useState([]);
  const newMessageRef = useRef();
  const [updateRoomsToggle, setUpdateRoomsToggle] = useState('a');


  useEffect(() => {
    getRooms()
  }, [updateRoomsToggle]);
  

  const getRooms = async() => {    
    try {
      const session = await fetchAuthSession();

      const client = generateClient({
        authMode: 'userPool',
        authToken: session.tokens.accessToken.toString()
      });
      
      console.log(`Calling list rooms client for owner ${cognitoId}`)
      const result = await client.graphql({
        query: listRooms,
        variables: {
          ownerId: cognitoId
        }
      })
      setRooms(result["data"]["listRooms"]["items"])
      console.log(rooms)

    } catch (error) {
      console.log(error);

    }
  }

  return (
    <>
      <View
        style={styles.root}
      > 
            <Text
        style={styles.yourMessagesText}
      > 
        Messages
      </Text>
        {
          rooms.length === 0 ? 
          <ScrollView
            style={styles.conversations}
          >
            <Text>
              No messages. Reach out to someone to start playing!
            </Text>
          </ScrollView>

          :
            <>
              <ScrollView
                style={styles.conversations}
              >
                {rooms.map((room, key) => {
                  return <ConversationItem key={key} roomId={room.id} chatPartnerRoomId={room.chatPartnerRoomId} chatPartnerId={room.chatPartnerId} />
                })}
              </ScrollView>
              </>
        }
        <View
          style={styles.buttonView}
        >
          <Button 
            mode="contained" 
            onPress={() => newMessageRef.current.open()}
            style={styles.newMessageButton}
            labelStyle={styles.newMessageButtonLabel}
          >
            {"New Message"}
          </Button>
        </View>
      </View>
      <NewMessageDrawer
        newMessageRef={newMessageRef}
        messageScreenUpdateRoomsToggle={updateRoomsToggle}
        messageScreenSetUpdateRoomsToggle={setUpdateRoomsToggle}
      />
    </>
  );
}

const styles = StyleSheet.create({
  buttonView: {
    width: '100%',
    display: 'flex',
    alignItems: 'center'
  },
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
  newMessageButton: {
    display: 'flex',
    width: 320,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#9C11E6',
    justifyContent: 'center',
  },
  newMessageButtonLabel: {
    fontSize: 18,
    color: '#fff',
  },
  noMessagesView: {
    height: '100%'
  },
  yourMessagesText: {
    fontSize: 30,
    textAlign: 'center',
    marginTop: 0,
    marginBottom: 20
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



