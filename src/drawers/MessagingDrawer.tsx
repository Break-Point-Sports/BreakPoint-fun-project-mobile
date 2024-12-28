import RBSheet from 'react-native-raw-bottom-sheet';
import { Dimensions, StyleSheet, Image, Text, View, ScrollView, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { IconButton } from 'react-native-paper';
import { fetchAuthSession } from 'aws-amplify/auth';
import { generateClient } from 'aws-amplify/data';
import { useSelector } from 'react-redux';

import { listMessagesForRoom } from '../graphql/queries';
import { onCreateMessageByRoomId } from '../graphql/subscriptions'
import { createMessage } from '../graphql/mutations';
import commonStyles from '../util/CommonStyles';
import { PROFILE_PIC_BUCKET_BASE_URL } from '../util/Constants';
import { useState, useEffect } from 'react';
import SentMessageItem from '../random/SentMessageItem';
import { Observable } from '@reduxjs/toolkit';
import ReceivedMessageItem from '../random/ReceivedMessageItem';

const MessagingDrawer = ({messagingDrawerRef, chatPartnerDetails, roomId, chatPartnerRoomId}) => {
  const cognitoId = useSelector(state => state.user.cognitoId)

  
  const [textInputValue, setTextInputValue] = useState('');
  const [messages, setMessages] = useState([])

  useEffect(() => {
    getMessages()
    subscribteToMessages()
  }, [])

  const subscribteToMessages = async() => {
    const session = await fetchAuthSession();


    const client = generateClient({
      authMode: 'userPool',
      authToken: session.tokens.accessToken.toString()
    });

    console.log("Subscribing to messages")

    const createMessageByRoomIdSub = (client.graphql({
      query: onCreateMessageByRoomId,
      variables: {
        roomId: roomId
      }
    }) as unknown as Observable<any>).subscribe({
      next: async ({value}) => {
        console.log("Message subscription action!")
        await getMessages()
      }
    })
  }

  const getMessages = async() => {    
    try {
      const session = await fetchAuthSession();

      const client = generateClient({
        authMode: 'userPool',
        authToken: session.tokens.accessToken.toString()
      });
      
      console.log(`Calling get messages for room ${roomId}`)
      const result = await client.graphql({
        query: listMessagesForRoom,
        variables: {
          roomId: roomId
        }
      })
      setMessages(result["data"]["listMessagesForRoom"]["items"])
      console.log(result["data"]["listMessagesForRoom"]["items"])

    } catch (error) {
      console.log(error);
    }
  }
  
  const onChangeText = (text) => {
    setTextInputValue(text)
  }

  const sendMessage = async () => {
    console.log(`roomId: ${roomId}`)
    console.log(`chatPartnerRoomID: ${chatPartnerRoomId}`)

    try {
      const session = await fetchAuthSession();

      const client = generateClient({
        authMode: 'userPool',
        authToken: session.tokens.accessToken.toString()
      })

      console.log("Creating message in room 1 (for sender)");

      const createMessageResult1 = await client.graphql({
        query: createMessage,
        variables: {
          input: {
            roomId: roomId,
            senderId: cognitoId,
            recipientId: chatPartnerDetails.cognitoId,
            content:textInputValue,
          }
        }
      })

      console.log("Creating message in room 2 (for recipient)");

      const createMessageResult2 = await client.graphql({
        query: createMessage,
        variables: {
          input: {
            roomId: chatPartnerRoomId,
            senderId: cognitoId,
            recipientId: chatPartnerDetails.cognitoId,
            content: textInputValue,
          }
        }
      })

      console.log("Created new messages successfully")
      console.log(createMessageResult2['data']['createMessage'])

      setTextInputValue("");
      await getMessages()
    } catch(error) {
      console.log("something went wrong sending message");
      console.log(error);
    }
  }

  return (
    <RBSheet
        ref={messagingDrawerRef}
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
          onPress={() => messagingDrawerRef.current.close()}
          style={commonStyles.closeButton}
        />
        <Text
          style={commonStyles.drawerHeaderText}
        > 
          {chatPartnerDetails?.firstName} {chatPartnerDetails?.lastName}
        </Text>
      </View>
      <Image
        style={commonStyles.profileImg}
        source={{uri: `${PROFILE_PIC_BUCKET_BASE_URL}/${chatPartnerDetails?.cognitoId}/profile_pic.jpg`}}
      />
      <KeyboardAvoidingView
        style={commonStyles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView>
          {messages.map((message, key) => {
            if (message.senderId === cognitoId) {
              return <SentMessageItem message={message} key={key}/>
            } else {
              return <ReceivedMessageItem message={message} key={key}/>
            }
          })}
        </ScrollView>
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
    </RBSheet>

  )
}


const styles = StyleSheet.create({
  test: {
    flex: 1,
    flexDirection: 'column',
  }
})


export default MessagingDrawer;