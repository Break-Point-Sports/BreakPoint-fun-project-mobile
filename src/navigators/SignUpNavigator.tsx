import { createNativeStackNavigator } from '@react-navigation/native-stack';

import FirstNameSignUpScreen from '../screens/signup/FirstNameSignUpScreen';
import LastNameSignUpScreen from '../screens/signup/LastNameSignUpScreen';
import BirthdaySignUpScreen from '../screens/signup/BirthdaySignUpScreen';
import GenderSignUpScreen from '../screens/signup/GenderSignUpScreen';
import AddPictureSignUpScreen from '../screens/signup/AddPictureSignUpScreen';

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
      name='signup-picture'
      component={AddPictureSignUpScreen} 
      options={{
        headerShown: false,
      }}
    />
  </Stack.Navigator>
)




export default SignUpNavigator;




























