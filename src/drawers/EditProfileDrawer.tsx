import RBSheet from "react-native-raw-bottom-sheet";
import { Dimensions, StyleSheet, View, Text, TouchableOpacity, Image, ScrollView, ActivityIndicator } from 'react-native';
import { IconButton, Button, TextInput } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useRef } from "react";
import { PROFILE_PIC_BUCKET_BASE_URL } from '../util/Constants';

const EditProfileDrawer = ({ editProfileRef }) => {
  const [showActivityIndicatorImg1, setShowActivityIndicatorImg1] = useState(false)

  const cognitoId = useSelector(state => state.user.cognitoId)
  const phoneNumber = useSelector(state => state.user.phoneNumber)
  
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
     <View
      style={styles.drawerHeader}
    >
      
        <IconButton
          icon='close'
          iconColor='#9C11E6'
          size={30}
          onPress={() => editProfileRef.current.close()}
          style={styles.closeButton}
        />
      <Text
        style={styles.settingsText}
      >
        Edit Profile
      </Text>
    </View>
    <TouchableOpacity
        onPress={() => {}}
    >
      <Image
        style={styles.profileImg}
        source={{uri: `${PROFILE_PIC_BUCKET_BASE_URL}/${cognitoId}/profile_pic.jpg`}}
      />
    </TouchableOpacity>
    <ScrollView>

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
      style={styles.deleteButton}
      labelStyle={styles.deleteButtonLabel}
    >
      Delete Account
    </Button>
    </ScrollView>
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
  deleteButton: {
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 1,
    textAlign: 'left',
    padding: 0,
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
    marginBottom: 1,
    marginTop: 50,
    textAlign: 'left',
    padding: 0,
    alignItems: 'flex-start',
  },
  label: {
    color: '#9C11E6'
  },
  profileImg: {
    alignSelf: 'center',
    width: 150,
    height: 150,
    borderRadius: 75,
    marginTop: 10,
    backgroundColor: 'grey',
  },
  settingsText: {
    fontSize: 25,
    color: '#9C11E6'
  },
})

export default EditProfileDrawer;