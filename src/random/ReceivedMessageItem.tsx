
import {View, StyleSheet, Text, Image} from 'react-native'
import { useSelector } from 'react-redux'

import { PROFILE_PIC_BUCKET_BASE_URL } from '../util/Constants';


const ReceivedMessageItem = ({message}) => {
  return (
    <View>
        <View
          style={styles.messageWrapper}
        >
          <Image
            source={{uri: `${PROFILE_PIC_BUCKET_BASE_URL}/${message?.senderId}/profile_pic.jpg`}}
            style={styles.imageProfileConversation}
          />
          <View
            style={styles.receivedMessage}
          >
            <Text> {message?.content} </Text>
          </View>

      </View>

    </View>

  )
}

const styles = StyleSheet.create({
  imageProfileConversation: {
    width: 25,
    height: 25,
    borderRadius: 40,
    marginHorizontal: 5,
    marginTop: 5,
    backgroundColor: 'grey',
  },
  messageWrapper: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row'
  },
  receivedMessage: {
    width: '40%',
    backgroundColor: 'rgba(156, 17, 230, 0.25)',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 20,
    marginBottom: 5
  }

})


export default ReceivedMessageItem;

