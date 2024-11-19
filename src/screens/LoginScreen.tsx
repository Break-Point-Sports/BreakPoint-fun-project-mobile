import { StyleSheet, Image, View, TextInput, ActivityIndicator } from 'react-native';
import AuthButton from '../buttons/AuthButton';
import { signIn, signUp, getCurrentUser } from 'aws-amplify/auth';
import PhoneInput, {ICountry} from 'react-native-international-phone-number';
import { useState } from 'react';
import { useDispatch } from 'react-redux'
import { updatePhoneNumber } from '../redux/slices/userSlice';
import { updateCognitoId } from '../redux/slices/userSlice'
import { confirmCodeScreenIdentifier, homeScreenIdentifier, signUpNavigatorIdentifier } from '../util/Constants';

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch()
  const [countryCode, setCountryCode] = useState('+1');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [country, setCountry] = useState<null | ICountry>(null);
  const [showIndicator, setShowIndicator] = useState(false);
  const [buttonActive, setButtonActive] = useState(false);
  const [reloadKey, setReloadKey] = useState('r');



  const PASSWORD = "password";

  const phoneNumberOnSubmit = async () => {
    const phoneNoSpacesPlusCountryCode = countryCode + phoneNumber.replace(/\s/g, "")
    console.log(phoneNoSpacesPlusCountryCode)
    setShowIndicator(true);
    try {
      console.log("Trying to sign in user");
      const {nextStep} = await signIn({
        username: phoneNoSpacesPlusCountryCode,
        password: PASSWORD,
        options: {
          authFlowType: 'USER_PASSWORD_AUTH'
      }
      })

      console.log("fetching user id")
      const { userId } = await getCurrentUser();

      dispatch(updateCognitoId(userId));
      dispatch(updatePhoneNumber(phoneNoSpacesPlusCountryCode));

      // For now we will just use user password auth since we dont have mfa set up
      console.log(nextStep);
      console.log("Successfully signed in: " + phoneNoSpacesPlusCountryCode)

      
      navigation.navigate(confirmCodeScreenIdentifier);

      // console.log('successfully sent login code to: ' + phoneNoSpacesPlusCountryCode)
      // console.log(nextStep);

    }  catch (error) {
      console.log(error);

      if (error.name == "UserAlreadyAuthenticatedException") {
        const { userId } = await getCurrentUser();
        dispatch(updateCognitoId(userId));
        dispatch(updatePhoneNumber(phoneNoSpacesPlusCountryCode));
        navigation.navigate(homeScreenIdentifier);
      }
      
      try {
        console.log("Signing up user")
        const { isSignUpComplete, userId, nextStep} = await signUp({
          username: phoneNoSpacesPlusCountryCode,
          password: PASSWORD,
        });

        dispatch(updateCognitoId(userId));
        dispatch(updatePhoneNumber(phoneNoSpacesPlusCountryCode));

        console.log(userId);
        console.log(nextStep);

        navigation.navigate(confirmCodeScreenIdentifier)

      } catch (error) {
        console.log(error)
      }


      // try {
      //   const cognitoId = await sendSignUpCode(phoneNoSpacesPlusCountryCode);
      //   dispatch(updateCognitoId(cognitoId));
      //   dispatch(updatePhoneNumber(phoneNoSpacesPlusCountryCode));
      //   console.log('successfully sent sign up code to: ' + phoneNoSpacesPlusCountryCode);
      //   // navigation.navigate(confirmCodeScreenIdentifier)

      // } catch (error) {
      //   console.log(error);
      //   alert("Something went wrong. Please restart application and try again.");
      //   // dispatch(updateCognitoId("94685448-3081-70c2-efe8-e0b597ec998f"));
      //   // dispatch(updatePhoneNumber("+13037264490"));
      //   // TODO: remove following line once we can start sending codes
      //   // navigation.navigate(confirmCodeScreenIdentifier)
      // }
    }
    setShowIndicator(false);
  };
  
  const sendSignUpCode = async (phoneAndCountryCode) => {
    console.log(phoneAndCountryCode)
      const { isSignUpComplete, userId, nextStep } = await signUp({
        username: phoneAndCountryCode,
        password: "password",
      });
    console.log(isSignUpComplete);
    console.log(userId);
    console.log(nextStep);
    return userId;
  };

  function onSelectCountry(country) {
    setCountry(country);
  }

  function onChangePhoneNumber(phoneNumber: string) {
    if (phoneNumber.replace(/\s/g, "").length === 10) {
      setButtonActive(true);
      setReloadKey('r1');
    } else {
      setButtonActive(false);
      setReloadKey('r2');
    }
    setPhoneNumber(phoneNumber);
  }

  return (
    <View
      style={styles.view}
    >
      <Image
        source={require('../../assets/splash.png')}
        style={styles.logo}
      />
      <View
        style={styles.phoneNumberInputWrapper}
      >
        <View
          style={styles.phoneInputContainerView}
        >

          <PhoneInput
            value={phoneNumber}
            placeholder={"303-303-3030"}
            onChangePhoneNumber={onChangePhoneNumber}
            selectedCountry={country}
            onChangeSelectedCountry={onSelectCountry}
            defaultCountry={'US'}
            phoneInputStyles={{
              container: styles.phoneInputContainer,
              flagContainer: styles.flagContainer
            }}
          />
        </View>
        <View 
          style={styles.space}
        />
        {
          showIndicator ?

            <ActivityIndicator
              style={styles.activityIndicator}
              size='large'
              color='#9C11E6'
            />

          :
            <AuthButton 
              onPress={phoneNumberOnSubmit}
              buttonActive={buttonActive}
              key={reloadKey}
              label={"Login/Signup"}
            />
        }


      </View>
      <View 
        style={styles.space}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  activityIndicator: {
    marginTop: 20
  },
  flagContainer: {
    borderTopLeftRadius: 28,
    borderBottomLeftRadius: 28,
    backgroundColor: 'rgba(0, 0, 0, 0.0)',
    justifyContent: 'center',
  },
  phoneInputContainer: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#9C11E6',
    borderRadius: 28,
  },
  logo: {
    position: 'absolute',
    bottom: 500,
    width: 320,
    height: 80,
  },
  phoneInputContainerView: {
    display: 'flex',
    flexDirection: 'row',
    width: 320,
    height: 56,
    alignItems: 'center',
  },
  phoneNumberInputWrapper: {
    position: 'absolute',
    bottom: 320,
  },
  space: {
    height: 5
  },
  view: {
    display: 'flex',
    height: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  }
});

export default LoginScreen;


