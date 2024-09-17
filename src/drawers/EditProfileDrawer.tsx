import RBSheet from "react-native-raw-bottom-sheet";
import { Dimensions, StyleSheet, View, Text, TouchableOpacity, Image, ScrollView, ActivityIndicator } from 'react-native';
import { IconButton, Button, TextInput } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useRef } from "react";


const ADD_PHOTO_LAMBDA_URL = "";
const GET_PROFILE_IMAGE_URL = "";

const EditProfileDrawer = ({ editProfileRef }) => {
  const [showActivityIndicatorImg1, setShowActivityIndicatorImg1] = useState(false)

  const cognitoId = useSelector(state => state.user.cognitoId)
  
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
          source={{uri: ''}}
        />
      </TouchableOpacity>

    </RBSheet>
  );
}




const styles = StyleSheet.create({
  closeButton: {
    position: 'absolute',
    left: 5
  },
  drawerHeader: {
    marginTop: 50,
    marginBottom: 15,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
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