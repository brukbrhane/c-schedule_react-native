/**
 * @format
 */

import { AppRegistry, Platform } from 'react-native';
import App from './App';
//import App1 from './App.windows';
import { name as appName } from './app.json';

if (Platform.OS !== "windows")
    AppRegistry.registerComponent(appName, () => App);
//else
    //AppRegistry.registerComponent(appName, () => App1);
