import React, { Component } from 'react';
import { View, Text, StyleSheet, Alert, FlatList } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Axios from 'axios';
// import ViewPager from '@react-native-community/viewpager'; TODO: reimplement once support for viewpager has been added to windows.

export default class ScheduleScreen extends Component {
    state = { batch: "", schedule: [], courses: {} };

    async componentWillMount() {
        await this.getSchedule();
        console.log("Mounting ScheduleScreen");
        if (this.state.schedule == null) {
            Axios.get("https://class-schedule.herokuapp.com/schedule/get/" + this.state.batch)
                .then(async response => {
                    console.log(response)
                    if (response.data.message == "OK") {
                        const schedule = response.data.schedule;
                        const courses = response.data.courses;
                        await AsyncStorage.setItem("@schedule", JSON.stringify(schedule));
                        await AsyncStorage.setItem("@courses", JSON.stringify(courses));
                    } else {
                        Alert.alert("Not Found", "We could not find the batch.");
                        this.props.navigation.goBack();
                    }
                    this.setState({ schedule: await AsyncStorage.getItem("@schedule") });
                    this.setState({ courses: await AsyncStorage.getItem("@courses") });
                });
        } else {
            console.log("Schedule Exists so not downloading");
            //TODO: THE STRAT will be passing schedule objects like monday and stuff to other componnets and let them handle it
        }
    }

    render() {
        const { batch, schedule } = this.state;
        console.log("In render schedule: " + schedule)
        return (
            <View>
                <Text>{batch} Not Windows</Text>
                <FlatList
                    data={schedule}
                    ListEmptyComponent={() => { return <Text>Nothin Yet</Text> }}
                    renderItem={({ item }) => {
                        return <Text> Hi I'm an item {item.id} </Text>
                    }} />
            </View>
        );

    }

    async getSchedule() {
        let batch = await AsyncStorage.getItem("@batch");
        let schedObj = JSON.parse(await AsyncStorage.getItem("@schedule"));
        let coursObj = JSON.parse(await AsyncStorage.getItem("@courses"));
        let schedArr = [];
        schedArr.push(schedObj.monday);
        schedArr.push(schedObj.tuesday);
        schedArr.push(schedObj.wednesday);
        schedArr.push(schedObj.thursday);
        schedArr.push(schedObj.friday);
        schedArr.push(schedObj.saturday);
        for (let i = 0; i < schedArr.length; i++){
            schedArr[i].id = i.toString();
        }
        this.setState({ schedule: schedArr, courses: coursObj, batch: batch });
        console.log(this.state.schedule[0]);
    }

}


const styles = StyleSheet.create({
    viewpagerStyle: {
        flex: 1,
    }
});
