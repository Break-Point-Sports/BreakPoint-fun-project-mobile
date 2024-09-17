import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import ConfirmCodeScreen from '../screens/ConfirmCodeScreen';
import PageNavigatorContainer from './PageNavigatorContainer';
import NameSignUpScreen from '../screens/NameSignUpScreen';
import BirthdaySignUpScreen from '../screens/BirthdaySignUpScreen';

const Stack = createNativeStackNavigator();

const RootNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      gestureEnabled: false
    }}
  >
    {/* <Stack.Screen 
      name="landing" 
      component={LandingScreen} 
      options={{
        headerShown: false,
      }}
    /> */}
    <Stack.Screen 
      name="login" 
      component={LoginScreen} 
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="confirmCode"
      component={ ConfirmCodeScreen }
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen 
      name="signup-name" 
      component={NameSignUpScreen} 
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
        name="home" 
        component={PageNavigatorContainer} 
        options={{
          headerShown: false,
        }}
      />
  </Stack.Navigator>
)




export default RootNavigator;




























