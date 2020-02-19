import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import HomeScreen from './src/screens/HomeScreen';
import ListScreen from './src/screens/ListScreen';
import LoginScreen from './src/screens/LoginScreen';
import ScheduleScreen from './src/screens/ScheduleScreen';

console.log(Platform.OS);

const batchs = AsyncStorage.getItem("@batch");

const navigator = createStackNavigator(
  {
    Home: HomeScreen,
    List: ListScreen,
    Login: LoginScreen,
    Schedule: ScheduleScreen,
  },
  {
    initialRouteName: batchs != null ? 'Schedule': 'Login',
    defaultNavigationOptions: {
      title: 'Class Schedule'
    }
  }
);

export default createAppContainer(navigator);
