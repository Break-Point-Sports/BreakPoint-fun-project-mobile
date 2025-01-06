import RBSheet from 'react-native-raw-bottom-sheet';
import { StyleSheet, Dimensions, View, Text, ScrollView, TouchableOpacity} from 'react-native';
import { IconButton } from 'react-native-paper';
import commonStyles from '../util/CommonStyles';

const SubmitScoreLeagueContactsDrawer = ({ submitScoreLeagueContactsDrawerRef, leagueContacts, setOpponent }) => {

  const onPressContact = (leagueContact) => {
    console.log(`Selected contact: ${leagueContact.firstName}`)
    setOpponent(leagueContact);
    submitScoreLeagueContactsDrawerRef.current.close()
  }
  return(
    <RBSheet
      ref={submitScoreLeagueContactsDrawerRef}
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
        onPress={() => submitScoreLeagueContactsDrawerRef.current.close()}
        style={commonStyles.closeButton}
      />
      <Text
        style={commonStyles.drawerHeaderText}
      > 
        Opponent
      </Text>
    </View>
    <ScrollView
      style={styles.scrollView}
    >
      {
          leagueContacts.length !== 0 ?
            <>
              {leagueContacts.map((contact, key) => {
                return <TouchableOpacity key={key} onPress={() => onPressContact(leagueContacts[key])}><View style={styles.contactButton}><Text> {`${contact.firstName} ${contact.lastName}`} </Text></View></TouchableOpacity>
              })}
            </>
          :
            <>
              <Text> No league contacts available to message </Text>
            </>
      }
        

    </ScrollView>
    </RBSheet>
  )
}

const styles = StyleSheet.create({
  contactButton: {
    borderRadius: 20,
    borderWidth: 1,
    height: 50,
    width: '94%',
    marginLeft: '3%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5
  },
  scrollView: {
    marginTop: 20
  }
})


export default SubmitScoreLeagueContactsDrawer;