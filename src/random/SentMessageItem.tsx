
import {View, StyleSheet, Text, Image} from 'react-native'
import { useSelector } from 'react-redux'

import { PROFILE_PIC_BUCKET_BASE_URL } from '../util/Constants';


const SentMessageItem = ({message}) => {
  const cognitoId = useSelector(state => state.user.cognitoId)
  return (
    <View>
        <View
          style={styles.messageWrapper}
        >
          <View
            style={styles.sentMessage}
          >
            <Text> {message?.content} </Text>
          </View>
          <Image
            source={{uri: `${PROFILE_PIC_BUCKET_BASE_URL}/${cognitoId}/profile_pic.jpg`}}
            style={styles.imageProfileConversation}
          />
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
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row'
  },
  sentMessage: {
    width: '40%',
    backgroundColor: 'rgba(156, 17, 230, 0.75)',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 20,
    marginBottom: 5
  }

})


export default SentMessageItem;

