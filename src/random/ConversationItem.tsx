import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';

const ConversationItem = () => {
  return (
    <View
      style={styles.containerConversationListItemWithDrawer}
    >
      <TouchableOpacity
        style={styles.containerConversationListItem}
      >
        <Image
          // source={glowstikLogo180}
          style={styles.imageProfileConversation}
        />
        <View
          style={styles.containerUsernameAndPreview}
        >
          <Text
            style={styles.textUsername}
          >
            Alecio
          </Text>
          <Text
            style={styles.textPreview}
          >
            Hello
          </Text>
        </View>
      </TouchableOpacity>
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