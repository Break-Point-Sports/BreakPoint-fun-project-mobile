import RBSheet from 'react-native-raw-bottom-sheet';
import { Dimensions, StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Image } from 'react-native';
import { useSelector } from 'react-redux'
import { useState, useRef, useEffect } from 'react';
import { IconButton, Button } from 'react-native-paper';
import { generateClient } from 'aws-amplify/data';
import { fetchAuthSession } from 'aws-amplify/auth';

import { createMessage, createRoom, updateChatPartnerRoomId } from '../graphql/mutations'
import ContactsDrawer from './ContactsDrawer';
import commonStyles from '../util/CommonStyles';
import { PROFILE_PIC_BUCKET_BASE_URL } from '../util/Constants';



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
            chatPartnerRoomId: roomId1,
            ownerId: contactToMessage.cognitoId,
          }
        }
      })
      console.log("created new room for recepient successully")
      const roomId2 = createRoomResult2["data"]["createRoom"]["id"]
      console.log("roomId recepient: " + roomId2)

      console.log(`Updating room1 chatPartnerRoomId with roomId2: ${roomId2}`)
      const updateRoom1WithChatPartnerRoomId2Result = await client.graphql({
        query: updateChatPartnerRoomId,
        variables: {
          input: {
            roomId: roomId1,
            chatPartnerRoomId: roomId2
          }
        }
      })

      console.log("Result: ")
      console.log(updateRoom1WithChatPartnerRoomId2Result)
      // console.log("Creating message in room 1 (for sender)");

      // const createMessageResult1 = await client.graphql({
      //   query: createMessage,
      //   variables: {
      //     input: {
      //       roomId: roomId1,
      //       senderId: cognitoId,
      //       recipientId: contactToMessage.cognitoId,
      //       content:textInputValue,
      //     }
      //   }
      // })

      // console.log("Creating message in room 2 (for recipient)");

      // const createMessageResult2 = await client.graphql({
      //   query: createMessage,
      //   variables: {
      //     input: {
      //       roomId: roomId2,
      //       senderId: contactToMessage.cognitoId,
      //       recipientId: cognitoId,
      //       content: textInputValue,
      //     }
      //   }
      // })

      // console.log("Created new messages successfully")
      // console.log(createMessageResult2['data']['createMessage'])

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

  const onClose = () => {
    setContactToMessage(null);
    newMessageRef.current.close()
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
        style={commonStyles.drawerHeader}
      >
      
        <IconButton
          icon='close'
          iconColor='#9C11E6'
          size={40}
          onPress={() => onClose()}
          style={commonStyles.closeButton}
        />
      </View>
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
          
      {contactToMessage === null ?
          <></>
        :
          <TouchableOpacity
            onPress={() => contactsDrawerRef.current.open()}
          >
            <Image
              style={commonStyles.profileImg}
              source={{uri: `${PROFILE_PIC_BUCKET_BASE_URL}/${contactToMessage?.cognitoId}/profile_pic.jpg`}}
            />
          </TouchableOpacity>
      }
      
      <KeyboardAvoidingView
        style={commonStyles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View
          style={commonStyles.textInputWrapper}
        >
          <TextInput
            style={commonStyles.textInput}
            multiline={true}
            value={textInputValue}
            onChangeText={text => onChangeText(text)}
            defaultValue='Message'
            autoFocus
          />
          {
            textInputValue.trim() !== '' ?
              <IconButton
                icon='arrow-up'
                iconColor='#9C11E6'
                size={40}
                onPress={() => sendMessage()}
                style={commonStyles.sendTextButton}
              />
            :
              <IconButton
                icon='arrow-up'
                iconColor='rgba(156, 17, 230, 0.25)'
                size={40}
                disabled
                style={commonStyles.sendTextButton}
              />
          }
        </View>
      </KeyboardAvoidingView>
      <ContactsDrawer
        contactsDrawerRef={contactsDrawerRef}
        setContactToMessage={setContactToMessage}
      />
    </RBSheet>
  );
}

const styles = StyleSheet.create({
  toText: {
    fontSize: 30,
    marginLeft: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  toTouchableOpacity: {
    height: 50,
  }
})

export default NewMessageDrawer;