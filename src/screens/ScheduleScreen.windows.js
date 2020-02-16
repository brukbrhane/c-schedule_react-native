import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
//import Axios from 'axios';

export default class ScheduleScreen extends Component {
    state = { batch: "" };

    async componentWillMount() {
        console.log('Mounting ScheduleScreen for Windows');

        this.setState({ batch: await AsyncStorage.getItem("@batch") });
        console.log(this.state.batch == null ? "No Batch" : "ScheduleScreen Batch: " + this.state.batch);
        //FIXME: Axios isn't currently supported by rn-windows. So re-add that when it is.
        return fetch('https://class-schedule.herokuapp.com/schedule/get/' + this.state.batch)
            .then(response => response.json())
            .then(responseJson => {
                console.log(responseJson);
                console.log(responseJson.schedule);
                console.log(responseJson.courses);
            })
            .catch(err => {
                console.log(err);
            });
    }

    render() {
        return (
            <View>
                <Text style={styles.textStyle}>{this.state.batch} For Windows</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    textStyle: {
        fontSize: 30,
        color: 'blue',
        fontWeight: 'bold',
    }
});
