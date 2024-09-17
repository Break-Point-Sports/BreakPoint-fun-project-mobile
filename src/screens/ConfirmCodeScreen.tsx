import { StyleSheet, View, ActivityIndicator } from 'react-native';
import ConfirmCodeInput from '../inputs/ConfirmCodeInput';
import { IconButton, Button } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
// import { updateName };
import { useState } from 'react';

const GET_PROFILE_INFO_LAMBDA_URL = 'https://73q3mp6nlbnva4xzcjrd4d45h40avlmv.lambda-url.us-east-1.on.aws/';

const ConfirmCodeScreen = ( {navigation} ) => {
  const [showIndicator, setShowIndicator] = useState(false);
  const cognitoId = useSelector(state => state.user.cognitoId)
  const dispatch = useDispatch();

  const onPress = async() => {
    setShowIndicator(true);
    console.log('Getting user profile info for user: ' + cognitoId)
    try {      
      // await updateUserInfo();
      // throw 'signing up new user'
      navigation.navigate('home')
    } catch(error) {
      console.log(error)
    }

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
        <ConfirmCodeInput />

        { showIndicator ? 

          <ActivityIndicator
            style={styles.activityIndicator}
            size='large'
            color='#9C11E6'
          />

        :
        
          <Button 
            mode="contained" 
            onPress={() => onPress()}
            style={styles.submitButton}
            labelStyle={styles.buttonLabel}
          >
            Confirm
          </Button>
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