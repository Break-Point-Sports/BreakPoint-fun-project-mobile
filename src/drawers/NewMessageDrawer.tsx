import RBSheet from 'react-native-raw-bottom-sheet';
import { Dimensions, StyleSheet, Text, View, Switch, ScrollView, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux'
import { useState, useRef, useEffect } from 'react';
import { TextInput, IconButton, Button } from 'react-native-paper';
import ContactsDrawer from './ContactsDrawer';
import { generateClient } from 'aws-amplify/data';
import { fetchAuthSession } from 'aws-amplify/auth';
import { createMessage, createRoom } from '../graphql/mutations'


const NewMessageDrawer = ({ newMessageRef, messageScreenUpdateRoomsToggle, messageScreenSetUpdateRoomsToggle}) => {
  const cognitoId = useSelector(state => state.user.cognitoId)
  const firstName = useSelector(state => state.user.firstName)
  const lastName = useSelector(state => state.user.lastName)

  const contactsDrawerRef = useRef();
  const [contactToMessage, setContactToMessage] = useState(null);
  const [reloadKey, setReloadKey] = useState('a');
  const [textInputValue, setTextInputValue] = useState("")

  useEffect(() => {
    if (contactToMessage !== null) {
      console.log("le contact: " + contactToMessage.firstName)
      if (reloadKey === 'a') {
        setReloadKey('b');
      } else {
        setReloadKey('a')
      }
    }

  }, [contactToMessage])

  const onChangeText = (text) => {
    setTextInputValue(text);
  }

  const sendMessage = async () => {
    try {
      const session = await fetchAuthSession();

      const client = generateClient({
        authMode: 'userPool',
        authToken: session.tokens.accessToken.toString()
      })

      console.log("Calling client to create new room for sender");
      const createRoomResult1 = await client.graphql({
        query: createRoom,
        variables: {
          input: {
            name: `${contactToMessage.firstName} ${contactToMessage.lastName}`,
            chatPartnerId: contactToMessage.cognitoId,
            ownerId: cognitoId
          }
        }
      })
      console.log("created new room for sender successully")
      const roomId1 = createRoomResult1["data"]["createRoom"]["id"]
      console.log("roomId sender: " + roomId1)

      console.log("Calling client to create new room for recepient");
      const createRoomResult2 = await client.graphql({
        query: createRoom,
        variables: {
          input: {
            name: `${firstName} ${lastName}`,
            chatPartnerId: cognitoId,
            ownerId: contactToMessage.cognitoId
          }
        }
      })
      console.log("created new room fpr recepient successully")
      const roomId2 = createRoomResult2["data"]["createRoom"]["id"]
      console.log("roomId recepient:" + roomId2)


      console.log("Creating message in new room");

      const createMessageResult = await client.graphql({
        query: createMessage,
        variables: {
          input: {
            content: {
              text: textInputValue,
            },
            roomId: roomId
          }
        }
      })

      console.log("Created new message successfully")
      console.log(createMessageResult['data']['createMessage'])

      setTextInputValue("");
      if (messageScreenUpdateRoomsToggle === 'a') {
        messageScreenSetUpdateRoomsToggle('b')
      } else {
        messageScreenSetUpdateRoomsToggle('a');
      }
      newMessageRef.current.close()
    } catch(error) {
      console.log("something went wrong sending message");
      console.log(error);
    }
  }

  return (
    <RBSheet
        ref={newMessageRef}
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
        style={styles.drawerHeader}
      >
      
        <IconButton
          icon='close'
          iconColor='#9C11E6'
          size={30}
          onPress={() => newMessageRef.current.close()}
          style={styles.closeButton}
        />
      </View>
      <View
        style={styles.mainView}
      >
        <TouchableOpacity
            onPress={() => contactsDrawerRef.current.open()}
            style={styles.toTouchableOpacity}
            key={reloadKey}
        >
          {contactToMessage === null?
            <Text
                style={styles.toText}
            >
                To:
            </Text>
            :
            <Text
              style={styles.toText}
             >
              To: {contactToMessage.firstName} {contactToMessage.lastName}
            </Text>
          }
        </TouchableOpacity>
        <View
          style={styles.textInputAndButtonView}
        >
          <TextInput
            style={styles.messagingTextInput}
            mode='outlined'
            multiline={true}
            value={textInputValue}
            onChangeText={text => onChangeText(text)}
            autoFocus
          />
          {textInputValue.trim() !== '' ?
              <Button 
                mode="contained" 
                onPress={() => sendMessage()}
                style={styles.sendMessageButton}
                labelStyle={styles.sendMessageButtonLabel}
              >
                {"Send Message"}
              </Button>    
        
            :
              <Button 
                mode="contained" 
                style={styles.sendMessageButtonDisabled}
                labelStyle={styles.sendMessageButtonLabel}
                disabled
              >
            {"Send Message"}
          </Button>
        }

        </View>
      </View>
      <ContactsDrawer
        contactsDrawerRef={contactsDrawerRef}
        setContactToMessage={setContactToMessage}
      />
    </RBSheet>
  );
}

const styles = StyleSheet.create({
  button: {
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 1,
    textAlign: 'left',
    padding: 0,
    alignItems: 'flex-start'
  },
  closeButton: {
    position: 'absolute',
    left: 5
  },
  drawerHeader: {
    marginTop: 50,
    marginBottom: 15,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  label: {
    color: '#9C11E6'
  },
  mainView: {
    display: 'flex',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  messagingTextInput: {
    height: 100,
    width: '95%',
    alignSelf: 'center',
    marginBottom:10
  },
  modalContainer: {
    backgroundColor: 'white',
    height: 300,
    width: 250,
    alignSelf: 'center',
    position: 'absolute',
    top: 50
  },
  modalScrollView: {
    height: 100,
    width: 100
  },
  sendMessageButton: {
    display: 'flex',
    width: 320,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#9C11E6',
    justifyContent: 'center',
    alignSelf: 'center'
  },
  sendMessageButtonDisabled: {
    display: 'flex',
    width: 320,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(156, 17, 230, 0.25)',
    justifyContent: 'center',
    alignSelf: 'center'
  },
  sendMessageButtonLabel: {
    fontSize: 18,
    color: '#fff',
  },
  textInputAndButtonView: {
    marginBottom: 450,
    alignItems: 'center'
  },
  toText: {
    fontSize: 30,
    marginLeft: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  toTouchableOpacity: {
    height: 50
  }
})

export default NewMessageDrawer;