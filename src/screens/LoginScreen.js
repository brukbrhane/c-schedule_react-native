import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

export default class LoginScreen extends Component {

    componentWillMount() {
        console.log("Mounting LoginScreen");
    }

    render () {
        return (
            <View style={styles.container}>
                <Text style={styles.title}> Hello there! </Text>
                <TextInput placeholder='Batch ID'/>
                <TouchableOpacity onPress={ (e) => console.log("DO NETWORKING CODE AND STUFF HERE")}>
                    <Text style={styles.button}>Search</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
          justifyContent: 'center',
          alignContent: 'center',
          flex: 1
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'blue'
    },
    button: {
        color: 'aqua',
        fontSize: 35,
        alignContent: 'center',
    }
})