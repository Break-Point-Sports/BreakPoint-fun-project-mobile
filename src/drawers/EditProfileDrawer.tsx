import RBSheet from "react-native-raw-bottom-sheet";
import { Dimensions, StyleSheet, View, Text, TouchableOpacity, Image, ScrollView, ActivityIndicator } from 'react-native';
import { IconButton, Button, TextInput } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useRef } from "react";

import { PROFILE_PIC_BUCKET_BASE_URL } from '../util/Constants';
import commonStyles from "../util/CommonStyles";

const EditProfileDrawer = ({ editProfileRef }) => {
  const [showActivityIndicatorImg1, setShowActivityIndicatorImg1] = useState(false)

  const cognitoId = useSelector(state => state.user.cognitoId)
  const phoneNumber = useSelector(state => state.user.phoneNumber)
  const email = useSelector(state => state.user.email)
  const firstName = useSelector(state => state.user.firstName)
  const lastName = useSelector(state => state.user.lastName)
  const birthday = useSelector(state => state.user.birthday)
  const gender = useSelector(state => state.user.gender)
  const tennisLevel = useSelector(state => state.user.tennisLevel);
  
  // Refs for edit profile item drawers



  return (
    <RBSheet
      ref={editProfileRef}
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
    <View style={styles.container}>
      <View
        style={styles.drawerHeader}
    >
      
        <IconButton
          icon='close'
          iconColor='#9C11E6'
          size={40}
          onPress={() => editProfileRef.current.close()}
          style={styles.closeButton}
        />
      <Text
        style={commonStyles.drawerHeaderText}
      >
        Edit Profile
      </Text>
    </View>

    <TouchableOpacity
        onPress={() => {}}
    >
      <Image
        style={commonStyles.profileImg}
        source={{uri: `${PROFILE_PIC_BUCKET_BASE_URL}/${cognitoId}/profile_pic.jpg`}}
      />
    </TouchableOpacity>
    <ScrollView style={styles.scrollContainer}>

    <Button
      style={styles.locationButton}
      labelStyle={styles.label}
    >
      Location: {'Denver'}, {'CO'}
    </Button>
    <Button
      style={styles.button}
      labelStyle={styles.label}
    >
      Phone Number: {phoneNumber}
    </Button>

    <Button
      style={styles.button}
      labelStyle={styles.label}
    >
      Email: {email}
    </Button>

    <Button
      style={styles.button}
      labelStyle={styles.label}
    >
      First Name: {firstName}
    </Button>

    <Button
      style={styles.button}
      labelStyle={styles.label}
    >
      Last Name: {lastName}
    </Button>
    
    <Button
      style={styles.button}
      labelStyle={styles.label}
    >
      Birthday: {birthday}
    </Button>

    <Button
      style={styles.button}
      labelStyle={styles.label}
    >
      Gender: {gender}
    </Button>

    <Button
      style={styles.button}
      labelStyle={styles.label}
    >
      Tennis Level: {tennisLevel}
    </Button>
    </ScrollView>

    <Button
      style={styles.deleteButton}
      labelStyle={styles.deleteButtonLabel}
    >
      Delete Account
      </Button>
    </View>
  </RBSheet>
  );
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
  scrollContainer: {
    flex: 1
  },
  button: {
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 10,
    textAlign: 'left',
    padding: 5,
    alignItems: 'flex-start',
    marginHorizontal: 10,
  },
  closeButton: {
    position: 'absolute',
    left: 5
  },
  deleteButton: {
    borderColor: 'black',
    borderWidth: 1,
    textAlign: 'left',
    marginHorizontal: 10,
    padding: 5,
  },
  deleteButtonLabel: {
    color: 'red'
  },
  drawerHeader: {
    marginTop: 50,
    marginBottom: 15,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  locationButton: {
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 10,
    marginTop: 20,
    textAlign: 'left',
    padding: 5,
    marginHorizontal: 10,
    alignItems: 'flex-start',
  },
  label: {
    color: '#9C11E6'
  },
})

export default EditProfileDrawer;