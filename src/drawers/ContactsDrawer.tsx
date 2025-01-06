import RBSheet from 'react-native-raw-bottom-sheet';
import { SegmentedButtons, IconButton } from 'react-native-paper';
import { useState, useEffect } from 'react';
import { StyleSheet, Dimensions, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';

import getLeagueContacts from '../util/GetLeagueContacts';

const ContactsDrawer = ({ contactsDrawerRef, setContactToMessage, currentRooms }) => {
  const [toggleValue, setToggleValue] = useState('league');
  const currentLeague = useSelector(state => state.user.currentLeague)
  const cognitoId = useSelector(state => state.user.cognitoId)

  const [leagueContacts, setLeagueContacts] = useState([]);
  const [ladderContacts, setLadderContacts] = useState(['Steve Madden', 'John Cadsf', 'Fortran McDumb']);

  useEffect(() => {
    getCurrentLeagueContacts()
  }, [])

  const getCurrentLeagueContacts = async() => {
    console.log("currentRooms")
    console.log(currentRooms)
    const existingConversationPartners = []
    for (const room of currentRooms) {
      existingConversationPartners.push(room.chatPartnerId);
    }

    console.log("existingConversationPartners")
    console.log(existingConversationPartners)

    const body = await getLeagueContacts(currentLeague)
    const contactsArray = []
    for (const contact of body) {
      if (contact.cognitoId != cognitoId && !existingConversationPartners.includes(contact.cognitoId)) {
        contactsArray.push(contact)
      }
    }
    console.log("contacts array: " + contactsArray)
    setLeagueContacts(contactsArray);
    return body
  }

  const onPressContact = (contact) => {
    console.log(`Selected contact: ${contact.firstName}`)
    setContactToMessage(contact);
    contactsDrawerRef.current.close()
  }


  return(
    <RBSheet
      ref={contactsDrawerRef}
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
          size={40}
          onPress={() => contactsDrawerRef.current.close()}
          style={styles.closeButton}
        />
      </View>
      <Text 
        style={styles.breakPointContactsText}
      > 
        BreakPoint Contacts
      </Text>
      <SegmentedButtons
        value={toggleValue}
        onValueChange={setToggleValue}
        buttons={[
          { 
            value: 'league', 
            label: 'League Contacts' 
          },
          {
            value: 'ladder',
            label: 'Ladder Contacts',
          },
        ]}
      />
      <ScrollView
        style={styles.scrollView}
      >
        {
          toggleValue === 'league' ?
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
          :
            ladderContacts.length !== 0 ?
              <>
                {  ladderContacts.map((ladder, key) => {
                  return <Text key={key}> Hello </Text>
                })}
              </>
            :
              <></>
            }

      </ScrollView>
    </RBSheet>
  )
}

const styles = StyleSheet.create({
  breakPointContactsText: {
    fontSize: 30,
    textAlign: 'center',
    marginTop: 0,
    marginBottom: 20
  },
  closeButton: {
    position: 'absolute',
    left: 5
  },
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
  drawerHeader: {
    marginTop: 50,
    marginBottom: 15,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  scrollView: {
    marginTop: 20
  }
})

export default ContactsDrawer;