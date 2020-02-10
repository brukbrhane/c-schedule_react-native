import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class ScheduleScreen extends Component {

    componentWillMount() {
        console.log('Mounting ScheduleScreen for Windows');
    }

    render() {
        return(
            <View>
                <Text>{this.props.navigation.state.params.batch} For Windows</Text>
            </View>
        )
    }
}
