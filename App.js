import { createStackNavigator } from 'react-navigation-stack';
import { Platform } from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import ListScreen from './src/screens/ListScreen';
import LoginScreen from './src/screens/LoginScreen';
import ScheduleScreen from './src/screens/ScheduleScreen';

console.log(Platform.OS);
const navigator = createStackNavigator(
  {
    Home: HomeScreen,
    List: ListScreen,
    Login: LoginScreen,
    Schedule: ScheduleScreen,
  },
  {
    initialRouteName: 'Login',
    defaultNavigationOptions: {
      title: 'App'
    }
  }
);

export default createAppContainer(navigator);
