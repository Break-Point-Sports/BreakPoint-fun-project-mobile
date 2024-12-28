import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import { useState, useEffect, useRef } from 'react';

import MessagingDrawer from '../drawers/MessagingDrawer'

import { GET_USER_DETAILS_LAMBDA_URL, PROFILE_PIC_BUCKET_BASE_URL } from '../util/Constants';

const ConversationItem = ({chatPartnerId, roomId}) => {
  const messagingDrawerRef = useRef();

  const [chatPartnerDetails, setChatPartnerDetails] = useState(null);
  const [profilePicUrl, setProfilePicUrl] = useState(null);
  const [reloadKey, setReloadKey] = useState('a');

  useEffect(() => {
    if (reloadKey === 'a') {
      setReloadKey('b')
    } else {
      setReloadKey('a')
    }
}, [chatPartnerDetails?.cognitoId])

  useEffect(() => {
    getChatPartnerInfo()
  }, [])



  const getChatPartnerInfo = async() => {
    const URI = GET_USER_DETAILS_LAMBDA_URL + '?cognitoId='+ chatPartnerId;
    console.log("Fetching " + URI);
    const response = await fetch(URI, {method: 'GET'});
    
    const body = await response.json();
    console.log(body);
    setProfilePicUrl(`${PROFILE_PIC_BUCKET_BASE_URL}/${body.cognitoId}/profile_pic.jpg`)
    setChatPartnerDetails(body);
  }
  
  return (
    <View
      style={styles.containerConversationListItemWithDrawer}
    >
      <TouchableOpacity
        style={styles.containerConversationListItem}
        onPress={() => messagingDrawerRef.current.open()}
      >
        <Image
          source={{uri: profilePicUrl}}
          style={styles.imageProfileConversation}
          key={reloadKey}
        />
        <View
          style={styles.containerUsernameAndPreview}
        >
          <Text
            style={styles.textUsername}
          >
            {chatPartnerDetails?.firstName} {chatPartnerDetails?.lastName}
          </Text>
        </View>
      </TouchableOpacity>
      <MessagingDrawer 
        messagingDrawerRef = {messagingDrawerRef}
        chatPartnerDetails={chatPartnerDetails}
        roomId={roomId}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  containerConversationListItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  containerConversationListItemWithDrawer: {
    flexDirection: 'column',
  },
  containerUsernameAndPreview: {
    flexDirection: 'column',
    marginLeft: 14,
  },
  imageProfileConversation: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginLeft: 5,
    marginTop: 5,
    marginBottom: 21,
    backgroundColor: 'grey',
  },
  textPreview: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 12,
    lineHeight: 16,
    color: '#979797',
  },
  textUsername: {
    fontStyle: 'normal',
    fontSize: 20,
    lineHeight: 22,
    color: '#000000',
  },
});

export default ConversationItem;