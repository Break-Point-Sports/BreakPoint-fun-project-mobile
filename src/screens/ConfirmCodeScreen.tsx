import { StyleSheet, View, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native';
import ConfirmCodeInput from '../inputs/ConfirmCodeInput';
import { IconButton } from 'react-native-paper';
import AuthButton from '../buttons/AuthButton';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { updateUserInfo } from '../util/UpdateUserInfo';
import { signUpNavigatorIdentifier, homeScreenIdentifier, loginScreenIdentifier } from '../util/Constants';

const ConfirmCodeScreen = ( {navigation} ) => {
  const [showIndicator, setShowIndicator] = useState(false);
  const [buttonKey, setButtonKey] = useState('r');
  const [buttonActive, setButtonActive] = useState(false);
  const cognitoId = useSelector(state => state.user.cognitoId)
  const dispatch = useDispatch();

  const onPress = async() => {
    setShowIndicator(true);
    console.log('Getting user profile info for user: ' + cognitoId)
    try {
      await updateUserInfo(cognitoId, dispatch);
      navigation.navigate(homeScreenIdentifier);
    } catch(error) {
      console.log(error)
      navigation.navigate(signUpNavigatorIdentifier)
    }
  }

  const setButtonActiveFuncAndAltKey = (isActive) => {
    if (isActive) {
      setButtonActive(true);
      setButtonKey('f1')
    } else {
      setButtonActive(false);
      setButtonKey('f2')
    }
    
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.rootView}
      keyboardVerticalOffset={10}
    >
      <IconButton
        icon='arrow-left'
        color={'grey'}
        size={40}
        style={styles.arrowIcon}
        onPress={() => navigation.navigate(loginScreenIdentifier)}
      />


      <ConfirmCodeInput 
        setConfirmButtonActive={setButtonActiveFuncAndAltKey}
      />

      { showIndicator ? 

        <ActivityIndicator
          style={styles.activityIndicator}
          size='large'
          color='#9C11E6'
        />

      :
      
        <AuthButton 
          key={buttonKey}
          onPress={onPress}
          buttonActive={buttonActive}
          label={"Confirm"}
        />
      }

    </KeyboardAvoidingView>
  )

}

const styles = StyleSheet.create({
  activityIndicator: {
    marginTop: 20
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
  rootView: {
    flex:1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: '#fff',
    marginBottom: 25,
  },
})

export default ConfirmCodeScreen;