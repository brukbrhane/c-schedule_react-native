import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, AsyncStorage } from 'react-native';
// import AsyncStorage from '@react-native-community/async-storage';

export default class LoginScreen extends Component {

    componentWillMount() {
        console.log("Mounting LoginScreen");
    }

    async componentDidMount() {
        this.setState({ batch: await AsyncStorage.getItem("@batch") });
        console.log(this.state.batch == null ? "No Batch" : "Batch: " + this.state.batch);
        if (this.state.batch != null){
            this.props.navigation.navigate("Schedule");
        }
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
                                    onPress: async () => {
                                        await AsyncStorage.setItem("@batch", this.state.batch, (err) => {
                                            if (err) {
                                                console.log(err);
                                                return;
                                            }
                                            //Alert.alert("Batch", this.state.batch);
                                            console.log("Saved batch");
                                            this.props.navigation.navigate('Schedule');
                                        });
                                    }
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
