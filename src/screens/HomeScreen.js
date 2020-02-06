import React from 'react';
import { Text, StyleSheet, View, Button, TouchableOpacity, SafeAreaView } from 'react-native';

const HomeScreen = ({ navigation }) => {
    console.log(navigation);

  return (
    <View>
        <Text style={styles.text}>Hello World!</Text>
        <Button 
            title="Go to components demo" 
            onPress={(e) => navigation.navigate('Login')} />
        <TouchableOpacity onPress={() => navigation.navigate('List')}>
        <Text>Go to List demo</Text>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30
  }
});

export default HomeScreen;