import ProfileScreen from '../screens/ProfileScreen';
import MessagingScreen from '../screens/MessagingScreen';
import ShoppingScreen from '../screens/ShoppingScreen';
import LadderScreen from '../screens/LadderScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View } from "react-native";
import LeaguesScreen from '../screens/LeaguesScreen';

const Tab = createBottomTabNavigator();


const PageNavigator = () => (
  <Tab.Navigator
    tabBar={() =><View></View>}
    initialRouteName='leagues'
    screenOptions={{
      headerShown: false
    }}
  >
    <Tab.Screen name="profile" component={ProfileScreen} />
    <Tab.Screen name="leagues" component={LeaguesScreen} />
    <Tab.Screen name="messaging" component={MessagingScreen} />
    <Tab.Screen name="ladder" component={LadderScreen} />
    <Tab.Screen name="shopping" component={ShoppingScreen} />
  </Tab.Navigator>
)




export default PageNavigator;




























