import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useRef } from 'react';
import { Button } from 'react-native-paper';
import EditProfileDrawer from '../drawers/EditProfileDrawer';
import SettingsDrawer from '../drawers/SettingsDrawer';
import { useDispatch, useSelector } from 'react-redux'
import { Image } from 'expo-image';
import { signOut } from 'aws-amplify/auth';
import { PROFILE_PIC_BUCKET_BASE_URL } from '../util/Constants';
import { updateFirstName, updateLastName, updateBirthday, updateGender, updateTennisLevel, updateCurrentLeague, updatePastLeagues, updateCity, updateCognitoId, updateEmail, updatePhoneNumber } from '../redux/slices/userSlice';

const ProfileScreen = ({ navigation }) => {
  const editProfileRef = useRef();
  const settingsRef = useRef();
  const dispatch = useDispatch();
  const pictureOneURL = useSelector(state => state.user.pictureOneURL)
  const name = useSelector(state => state.user.name)
  const cognitoId = useSelector(state => state.user.cognitoId)
  const phoneNumber = useSelector(state => state.user.phoneNumber)

  const logout = async () => {
    await signOut();
    dispatch(updateFirstName(''));
    dispatch(updateLastName(''));
    dispatch(updateBirthday(''));
    dispatch(updateGender(''));
    dispatch(updateTennisLevel(''));
    dispatch(updateCurrentLeague('none'));
    dispatch(updatePastLeagues([]));
    dispatch(updateCity(''));
    dispatch(updateTennisLevel(''));
    dispatch(updatePhoneNumber(''))
    dispatch(updateEmail(''))
    dispatch(updateCognitoId(''))
    navigation.navigate('login')
  }


  return (
    <View
      style={styles.root}
    > 
      <TouchableOpacity
        onPress={() => editProfileRef.current.open()}
      >
        <Image
          style={styles.profileImg}
          source={{uri: `${PROFILE_PIC_BUCKET_BASE_URL}/${cognitoId}/profile_pic.jpg`}}
        />
      </TouchableOpacity>
      <Text
        style={styles.name}
      >
        {name}
      </Text>
      <Button
        style={styles.missionButton}
        onPress={() => editProfileRef.current.open()}
        labelStyle={styles.label}
      >
        Edit Profile
      </Button>
      <Button
        style={styles.missionButton}
        labelStyle={styles.label}
      >
          Our Mission
      </Button>
      <Button
        style={styles.faqButton}
        labelStyle={styles.label}
      >
        FAQs
      </Button>
      <Button
        style={styles.contactButton}
        labelStyle={styles.label}
      >
        Contact Us
      </Button>
      <Button
        style={styles.contactButton}
        labelStyle={styles.label}
      >
        Community Standards
      </Button>
      <View
        style={styles.logoutButtonView}
      >
        <Button
          style={styles.logoutButton}
          labelStyle={styles.logoutLabel}
          onPress={() => logout()}
        >
          Logout
        </Button>
      </View>

      <EditProfileDrawer 
        editProfileRef={editProfileRef}
      />
      <SettingsDrawer
        settingsRef={settingsRef}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  accountSettingsText: {
    marginLeft: 15,
    marginTop: 20,
  },
  button: {
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 1,
    textAlign: 'left',
    padding: 0,
    alignItems: 'flex-start'
  },
  cogButton: {
    position: 'absolute',
    right: 10
  },
  contactButton: {
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 1,
    textAlign: 'left',
    padding: 0,
  },
  faqButton: {
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 1,
    textAlign: 'left',
    padding: 0,
  },
  locationButton: {
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 1,
    textAlign: 'left',
    padding: 0,
    alignItems: 'flex-start',
  },
  label: {
    color: '#9C11E6'
  },
  logo: {
    width: 284,
    height:220,
    alignSelf: 'center',
    marginTop: 100
  },
  // logoutButton: {
  //   borderColor: 'black',
  //   backgroundColor: '#9C11E6',
  //   borderWidth: 1,
  //   marginBottom: 1,
  //   textAlign: 'left',
  //   padding: 0,
  // },
  logoutButtonView: {
    height: '100%',
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  logoutButton: {
    display: 'flex',
    width: 320,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#9C11E6',
    justifyContent: 'center',
  },
  logoutLabel: {
    fontSize: 18,
    color: '#fff',
  },
  // logoutLabel: {
  //   color: 'white'

  // },
  missionButton: {
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 1,
    textAlign: 'left',
    padding: 0,
  },
  name: {
    alignSelf: 'center',
    fontSize: 24,
    marginBottom: 20,
  },
  profileImg: {
    alignSelf: 'center',
    width: 150,
    height: 150,
    borderRadius: 75,
    marginTop: 10,
    backgroundColor: 'grey',
  },
  root: {
    display: 'flex',
    flex: 1,
    backgroundColor: 'white'
  },
})


export default ProfileScreen;