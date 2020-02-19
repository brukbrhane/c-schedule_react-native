import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import Card from './Card';
import CardSection from './CardSection';
import Period from './PeriodView';

const DayViewComponent = ({ day }) => {
    const { containerStyle, headerTextStyle } = styles;

    return (
        <ScrollView>
            <Period title={day.firstPeriod.Title} room={day.firstPeriod.Room} time="08:00" />
            <Period title={day.secondPeriod.Title} room={day.secondPeriod.Room} time="10:00" />
            <Period title={day.thirdPeriod.Title} room={day.thirdPeriod.Room} time="13:30" />
            <Period title={day.fourthPeriod.Title} room={day.fourthPeriod.Room} time="15:30" />
            <Period title={day.fifthPeriod.Title} room={day.fifthPeriod.Room} time="18:30" />
            <Period title={day.sixthPeriod.Title} room={day.sixthPeriod.Room} time="19:30" />
        </ScrollView>
    );
};

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
    roomNumberStyle: {
        alignSelf: 'flex-end'
    },
    thumbnailContainerStyle: {
        justifyContent: 'center',
        alignContent: 'center',
        marginLeft: 10,
        marginRight: 10
    },
    imageStyle: {
        height: 300,
        flex: 1,
        width: null
    }
});

export default DayViewComponent;