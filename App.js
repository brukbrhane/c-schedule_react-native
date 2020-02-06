/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

// import React, {Fragment} from 'react';
// import {
//   SafeAreaView,
//   StyleSheet,
//   ScrollView,
//   View,
//   Text,
//   StatusBar,
// } from 'react-native';
// import HomeScreen from './src/screens/HomeScreen';

// const App = () => {
//   return (
//     <View>
//       <Text style={styles.sectionTitle}>Hi?</Text>
//       <HomeScreen />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//   },
//   highlight: {
//     fontWeight: '700',
//   },
// });

// export default App;

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Platform} from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import ListScreen from './src/screens/ListScreen';

console.log(Platform.OS);
const navigator = createStackNavigator(
  {
    Home: HomeScreen,
    List: ListScreen
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      title: 'App'
    }
  }
);

export default createAppContainer(navigator);
