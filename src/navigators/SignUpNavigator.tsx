import { createNativeStackNavigator } from '@react-navigation/native-stack';

import FirstNameSignUpScreen from '../screens/signup/FirstNameSignUpScreen';
import LastNameSignUpScreen from '../screens/signup/LastNameSignUpScreen';
import EmailSignUpScreen from '../screens/signup/EmailSignUpScreen';
import BirthdaySignUpScreen from '../screens/signup/BirthdaySignUpScreen';
import GenderSignUpScreen from '../screens/signup/GenderSignUpScreen';
import AddPictureSignUpScreen from '../screens/signup/AddPictureSignUpScreen';
import TennisLevelSignUpScreen  from '../screens/signup/TennisLevelSignUpScreen';
import CitySignUpScreen from '../screens/signup/CitySignUpScreen';

const Stack = createNativeStackNavigator();

const SignUpNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      gestureEnabled: false
    }}
  >
    <Stack.Screen 
      name="signup-first-name" 
      component={FirstNameSignUpScreen} 
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen 
      name="signup-last-name" 
      component={LastNameSignUpScreen} 
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen 
      name="signup-email" 
      component={EmailSignUpScreen} 
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen 
      name='signup-birthday'
      component={BirthdaySignUpScreen} 
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen 
      name='signup-gender'
      component={GenderSignUpScreen} 
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen 
      name='signup-city'
      component={CitySignUpScreen} 
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen 
      name='signup-level'
      component={TennisLevelSignUpScreen} 
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen 
      name='signup-picture'
      component={AddPictureSignUpScreen} 
      options={{
        headerShown: false,
      }}
    />
  </Stack.Navigator>
)




export default SignUpNavigator;




























