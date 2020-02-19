import React, { Component } from 'react';
import { View, Text, StyleSheet, Alert, FlatList, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Axios from 'axios';
import DayViewComponent from '../components/DayViewComponent';
// import ViewPager from '@react-native-community/viewpager'; TODO: reimplement once support for viewpager has been added to windows.

export default class ScheduleScreen extends Component {
    state = { batch: "", schedule: [], courses: {}, day: "" };

    async componentWillMount() {
        const { navigation } = this.props;
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
            console.log(this.state.courses);
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
                    ListEmptyComponent={() => { return <Text>Nothin Yet</Text> }}
                    renderItem={({ item }) => {
                        return <DayViewComponent day={item} />;
                    }}
                    onViewableItemsChanged={this.onViewableItemsChanged}
                    viewabilityConfig={{ itemVisiblePercentThreshold: 100 }} />
                <Text style={styles.batchStyle}>{this.state.batch}</Text>
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
        for (let i = 0; i < schedArr.length; i++) {
            schedArr[i].id = i.toString();
        }
        this.setState({ schedule: schedArr, courses: coursObj, batch: batch });
        console.log(this.state.schedule[0]);
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
    batchStyle: {
        fontSize: 20,
        fontStyle: 'italic',
        alignSelf: 'center'
    }
});
