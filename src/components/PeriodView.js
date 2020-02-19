import React from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import Card from './Card';

const Period = ({ title, room, time}) => {

    const { containerStyle, headerTextStyle } = styles;
    
    return (
        <Card>
            <View style={containerStyle}>
                <Text>{time}</Text>
                <Text style={headerTextStyle}>{title}</Text>
                <Text style={{ alignSelf: 'flex-end' }}>{room}</Text>
            </View>
        </Card>
    );
}

const styles = StyleSheet.create({
    containerStyle: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingBottom: 20,
        paddingTop: 20
    },
    headerTextStyle: {
        fontSize: 18
    },
});

export default Period;