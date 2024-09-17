import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './src/navigators/RootNavigator';
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './src/redux/slices/userSlice';

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