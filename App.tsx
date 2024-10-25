import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './src/navigators/RootNavigator';
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './src/redux/slices/userSlice';
import { Amplify } from "aws-amplify"
import { USER_POOL_CLIENT_ID, USER_POOL_ID, IDENTITY_POOL_ID, PROFILE_PIC_BUCKET, PROFILE_PIC_BUCKET_REGION } from './src/util/Constants';


Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: USER_POOL_ID,
      userPoolClientId: USER_POOL_CLIENT_ID,
      identityPoolId: IDENTITY_POOL_ID,
      loginWith: {
        phone: true,
      },
      signUpVerificationMethod: "code",
      allowGuestAccess: false,
      passwordFormat: {
        minLength: 8,
      },
    },
  },
})

const store = configureStore({ 
  reducer: {
    user: userReducer,
  } 
})

const App = () => {
  return (
    <Provider
      store={store}
    >
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </Provider>
  );
}

export default App;