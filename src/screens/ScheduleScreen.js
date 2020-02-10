import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class ScheduleScreen extends Component {

    componentWillMount(){
        console.log("Mounting ScheduleScreen");
    }
    
    render() {
        return (
            <View>
                <Text>{this.props.navigation.state.params.batch} Not Windows</Text>
            </View>
        );
    }

}