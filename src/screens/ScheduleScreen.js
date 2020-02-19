import React, { Component } from 'react';
import { View, Text, StyleSheet, Alert, FlatList, TouchableHighlight, ProgressBarAndroid } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Axios from 'axios';
import DayViewComponent from '../components/DayViewComponent';
import { NavigationActions } from 'react-navigation';
// import ViewPager from '@react-native-community/viewpager'; TODO: reimplement once support for viewpager has been added to windows.

export default class ScheduleScreen extends Component {
    state = { batch: "", schedule: [], courses: {}, day: "" };

    async componentDidMount() {
        const { navigation } = this.props;
        await this.getSchedule();
        console.log("Mounting ScheduleScreen");
        if (this.state.schedule[0] == null) {
            console.log("Downloading schedule");
            Axios.get("https://class-schedule.herokuapp.com/schedule/get/" + this.state.batch)
                .then(async response => {
                    console.log(response)
                    if (response.data.message == "OK") {
                        const schedule = response.data.schedule;
                        const courses = response.data.courses;
                        await AsyncStorage.setItem("@schedule", JSON.stringify(schedule));
                        await AsyncStorage.setItem("@courses", JSON.stringify(courses));
                        console.log("Finished settings strings");
                    } else {
                        Alert.alert("Not Found", "We could not find the batch.");
                        this.props.navigation.goBack();
                    }
                    await this.getSchedule();
                }).catch((e) => {
                    console.log(e.response.data);
                    console.log(e.status)
                })
        } else {
            console.log("Schedule Exists so not downloading");
        }
    }

    onViewableItemsChanged = ({ viewableItems, changed }) => {
        switch (viewableItems[0] != null ? viewableItems[0].index : -1) {
            case 0:
                this.setState({ day: "Monday" });
                break;
            case 1:
                this.setState({ day: "Tuesday" });
                break;
            case 2:
                this.setState({ day: "Wednesday" });
                break;
            case 3:
                this.setState({ day: "Thursday" });
                break;
            case 4:
                this.setState({ day: "Friday" });
                break;
            case 5:
                this.setState({ day: "Saturday" });
                break;
            default:
                //Nothing cause that's just react-native staying buggy
                break;
        }
    }

    render() {
        const { batch, schedule } = this.state;
        return (
            <View style={{ flex: 1 }}>
                <Text style={styles.dayStyle}>{this.state.day}</Text>
                <FlatList
                    data={schedule}
                    pagingEnabled={true}
                    horizontal={true}
                    ListEmptyComponent={() => { 
                        return (
                        <View style={{flexDirection: 'row'}}>
                        <Text>Loading</Text>
                        <ProgressBarAndroid />
                        </View>) }}
                    renderItem={({ item }) => {
                        return <DayViewComponent day={item} />;
                    }}
                    onViewableItemsChanged={this.onViewableItemsChanged}
                    viewabilityConfig={{ itemVisiblePercentThreshold: 100 }} />
                <View style={styles.batchHolder}>
                    <Text style={styles.batchStyle}>{this.state.batch}</Text>
                    <TouchableHighlight
                        onPress={(e) => {
                            this.forgetSchedule();
                        }}>
                        <Text>Change</Text>
                    </TouchableHighlight>
                </View>
            </View>
        );

    }

    async getSchedule() {
        let batch = await AsyncStorage.getItem("@batch");
        console.log("Batch: \"" + batch + "\"");
        if (batch == null){
            this.props.navigation.replace("Login");
        }
        let schedStr = await AsyncStorage.getItem("@schedule");
        if (schedStr == null) {
            console.log("Didn't find schedule string");
            this.setState({ batch: batch });
            return; 
        }
        let crsStr = await AsyncStorage.getItem("@courses");
        let schedObj = JSON.parse(schedStr);
        let coursObj = JSON.parse(crsStr);
        let schedArr = [];
        schedArr.push(schedObj.monday);
        schedArr.push(schedObj.tuesday);
        schedArr.push(schedObj.wednesday);
        schedArr.push(schedObj.thursday);
        schedArr.push(schedObj.friday);
        schedArr.push(schedObj.saturday);
        for (let i = 0; i < schedArr.length; i++) {
            schedArr[i].id = i.toString();
        }
        this.setState({ schedule: schedArr, courses: coursObj, batch: batch });
        console.log(this.state.schedule[0]);
    }

    async forgetSchedule() {
        await AsyncStorage.clear();
        this.props.navigation.replace('Login');
    }

}


const styles = StyleSheet.create({
    viewpagerStyle: {
        flex: 1,
        justifyContent: "space-evenly",
    },
    dayStyle: {
        fontSize: 30,
        fontWeight: 'bold',
        alignSelf: 'center'
    },
    batchHolder: {
        alignContent: 'center',
        alignSelf: 'center',
        flexDirection: 'row'
    },
    batchStyle: {
        fontSize: 20,
        fontStyle: 'italic',
    }
});
