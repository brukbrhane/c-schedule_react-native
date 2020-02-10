import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';

export default class LoginScreen extends Component {

    componentWillMount() {
        console.log("Mounting LoginScreen");
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}> Hello there! </Text>
                <TextInput
                    placeholder='Batch ID'
                    onChangeText={(text) => this.setState({ batch: text })}
                    autoCapitalize='characters'
                    autoCorrect={false} />
                <TouchableOpacity
                    onPress={(e) => {
                        Alert.alert(
                            'Confirm Batch',
                            'Are you sure the batch is correct?',
                            [
                                { 
                                    text: 'No, I am not sure',
                                    onPress: () => console.log('Cancel Pressed'),
                                    style: 'cancel',
                                },
                                {
                                    text: 'YES',
                                    onPress: () => this.props.navigation.navigate('Schedule', {batch: this.state.batch})
                                }
                            ]
                        )
                    }}>
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