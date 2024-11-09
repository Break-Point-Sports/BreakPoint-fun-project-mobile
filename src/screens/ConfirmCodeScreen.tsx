import { StyleSheet, View, ActivityIndicator } from 'react-native';
import ConfirmCodeInput from '../inputs/ConfirmCodeInput';
import { IconButton } from 'react-native-paper';
import AuthButton from '../buttons/AuthButton';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { updateFirstName, updateLastName, updateGender, updateTennisLevel, updatePhoneNumber, updateBirthday,
  } from '../redux/slices/userSlice';
import {GET_USER_DETAILS_LAMBDA} from '../util/Constants';

const ConfirmCodeScreen = ( {navigation} ) => {
  const [showIndicator, setShowIndicator] = useState(false);
  const [buttonActive, setButtonActive] = useState(false);
  const cognitoId = useSelector(state => state.user.cognitoId)
  const dispatch = useDispatch();

  const onPress = async() => {
    setShowIndicator(true);
    console.log('Getting user profile info for user: ' + cognitoId)
    try {
      await updateUserInfo();
      navigation.navigate('home');
    } catch(error) {
      console.log(error)
      navigation.navigate('signup')
    }
  }

  const updateUserInfo = async() => {
    const URI =GET_USER_DETAILS_LAMBDA + '/?cognitoId='+ cognitoId;
    console.log("Fetching " + URI);
    const response = await fetch(URI, {method: 'GET'});
    
    const body = await response.json();
    console.log(body);

    dispatch(updateFirstName(body.firstName));
    dispatch(updateLastName(body.lastName));
    dispatch(updateBirthday(body.birthday));
    dispatch(updateGender(body.gender));
    dispatch(updateTennisLevel(body.tennisLevel));
  }

  return (
    <View
      style={styles.rootView}
    >
      <IconButton
        icon='arrow-left'
        color={'grey'}
        size={40}
        style={styles.arrowIcon}
        onPress={() => navigation.navigate('login')}
      />
      <View
        style={styles.confirmCodeInputWrapper}
      >
        <ConfirmCodeInput 
          setConfirmButtonActive={setButtonActive}
        />

        { showIndicator ? 

          <ActivityIndicator
            style={styles.activityIndicator}
            size='large'
            color='#9C11E6'
          />

        :
        
          <AuthButton 
            onPress={onPress}
            buttonActive={buttonActive}
            label={"Confirm"}
          />
        }

      </View>

    </View>
  )

}

const styles = StyleSheet.create({
  activityIndicator: {
    marginTop: 25
  },
  arrowIcon: {
    position: 'absolute',
    top: 20,
    left: 5,
  },
  buttonLabel: {
    fontSize: 18,
    color: '#fff',
  },
  confirmCodeInputWrapper: {
    position: 'absolute',
    bottom: 320,
  },
  rootView: {
    display: 'flex',
    height: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  submitButton: {
    display: 'flex',
    width: 320,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#9C11E6',
    justifyContent: 'center',
    marginTop: 5,
  },
})

export default ConfirmCodeScreen;