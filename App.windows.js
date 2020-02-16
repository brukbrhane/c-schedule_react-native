import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { Platform, AsyncStorage } from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import ListScreen from './src/screens/ListScreen';
import LoginScreen from './src/screens/LoginScreen';
import ScheduleScreen from './src/screens/ScheduleScreen.windows';

console.log(Platform.OS);
let batch = "";
batch = AsyncStorage.getItem("@batch");
console.log(batch);

const navigator = createSwitchNavigator(
  {
    Home: { screen: HomeScreen },
    List: { screen: ListScreen},
    Login: { screen: LoginScreen },
    Schedule: { screen: ScheduleScreen },
  },
  {
    initialRouteName: batch != null ? 'Schedule': 'Login',
    defaultNavigationOptions: {
      title: 'App'
    }
  }
);

export default createAppContainer(navigator);
