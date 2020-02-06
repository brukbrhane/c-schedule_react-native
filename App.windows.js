import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { Platform} from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import ListScreen from './src/screens/ListScreen';
import LoginScreen from './src/screens/LoginScreen';

console.log(Platform.OS);
const navigator = createSwitchNavigator(
  {
    Home: { screen: HomeScreen },
    List: { screen: ListScreen},
    Login: { screen: LoginScreen }
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      title: 'App'
    }
  }
);

export default createAppContainer(navigator);
