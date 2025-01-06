import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useRef } from 'react';
import { Button } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux'
import { Image } from 'expo-image';
import { signOut } from 'aws-amplify/auth';

import EditProfileDrawer from '../drawers/EditProfileDrawer';
import SettingsDrawer from '../drawers/SettingsDrawer';
import { PROFILE_PIC_BUCKET_BASE_URL } from '../util/Constants';
import { updateFirstName, updateLastName, updateBirthday, updateGender, updateTennisLevel, updateCurrentLeague, updatePastLeagues, updateCity, updateCognitoId, updateEmail, updatePhoneNumber } from '../redux/slices/userSlice';

const ProfileScreen = ({ navigation }) => {
  const editProfileRef = useRef();
  const settingsRef = useRef();
  const dispatch = useDispatch();
  const pictureOneURL = useSelector(state => state.user.pictureOneURL)
  const firstName = useSelector(state => state.user.firstName)
  const lastName = useSelector(state => state.user.lastName)
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
        {firstName + ' ' + lastName}
      </Text>
      <TouchableOpacity
        onPress={() => editProfileRef.current.open()}
      >
        <Button
          style={styles.button}
          labelStyle={styles.label}
        >
          Edit Profile
        </Button>
      </TouchableOpacity>

      <Button
        style={styles.button}
        labelStyle={styles.label}
      >
          Our Mission
      </Button>
      <Button
        style={styles.button}
        labelStyle={styles.label}
      >
        FAQs
      </Button>
      <Button
        style={styles.button}
        labelStyle={styles.label}
      >
        Contact Us
      </Button>
      <Button
        style={styles.button}
        labelStyle={styles.label}
      >
        Community Standards
      </Button>
      <View
        style={styles.logoutButtonView}
      >
        <TouchableOpacity
          onPress={() => logout()}
        >
          <Button
            style={styles.logoutButton}
            labelStyle={styles.logoutLabel}
          >
            Logout
          </Button>
        </TouchableOpacity>
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
  label: {
    color: 'black'
  },
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
  button: {
    borderColor: '#9C11E6',
    borderWidth: 1,
    marginBottom: 10,
    marginHorizontal: 10,
    padding: 5,
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