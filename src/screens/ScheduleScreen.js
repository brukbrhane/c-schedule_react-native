import React, { Component } from 'react';
import { View, Text, StyleSheet, Alert, FlatList, TouchableHighlight, ProgressBarAndroid, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Axios from 'axios';
import DayViewComponent from '../components/DayViewComponent';
import { NavigationActions } from 'react-navigation';
// import ViewPager from '@react-native-community/viewpager'; TODO: reimplement once support for viewpager has been added to windows.

export default class ScheduleScreen extends Component {
    state = { batch: "", schedule: [], courses: [], day: new Date().getDay() > 6 ? 0 : new Date().getDay() - 1, 
                isFetching: false };

    async componentDidMount() {
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
            console.log("Day of week: " + new Date().getDay());
        }
    }

    render() {
        const { batch, schedule, day } = this.state;
        const { navigation } = this.props;
        return (
            <View style={{ flex: 1 }}>
                <FlatList
                    data={schedule}
                    ref={(ref) => { this.flatListRef = ref; }}
                    pagingEnabled={true}
                    horizontal={true}
                    refreshing={this.state.isFetching}
                    initialScrollIndex={day}
                    getItemLayout={(data, index) => ({ length: Dimensions.get('window').width - 10, offset: (Dimensions.get('window').width) * index, index })}
                    onRefresh={() => {
                        //TODO: Alert to confirm whether I want to refersh or not
                        //FIXME: This function is buggy so fix it
                        this.setState({ isFetching: true }, () => this.forgetSchedule());
                    }}
                    ListEmptyComponent={() => {
                        return (
                            <View style={{ flexDirection: 'row' }}>
                                <Text>Loading</Text>
                                <ProgressBarAndroid />
                            </View>)
                    }}
                    renderItem={({ item , index}) => {
                        //TODO: Move the Day Title to here so you don't have to re-render it all the time
                        return <DayViewComponent day={item} dayNum={index} />;
                    }} />
                {/*initialScrollIndex={initIndex}   TODO: Fix this code cause it's buggy*/}
                <View style={styles.batchHolder}>
                    <Text style={styles.batchStyle}>{this.state.batch}</Text>
                    <TouchableHighlight
                        onPress={(e) => {
                            this.forgetEverything();
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
        if (batch == null) {
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
            if (schedArr[i].id == null)
                schedArr[i].id = i.toString();
        }
        this.setState({ schedule: schedArr, courses: coursObj, batch: batch});
        console.log(this.state.schedule[0]);
    }

    async forgetEverything() {
        await AsyncStorage.clear();
        this.props.navigation.replace('Login');
    }

    async forgetSchedule() {
        let tempSched = await AsyncStorage.getItem("@schedule");
        let tempCourse = await AsyncStorage.getItem("@courses");

        //TODO: Try to not remove
        await AsyncStorage.removeItem("@schedule");
        await AsyncStorage.removeItem("@courses");

        Axios.get("https://class-schedule.herokuapp.com/schedule/get/" + this.state.batch)
            .then(async res => {
                if (res.data.message == "OK") {
                    const schedule = response.data.schedule;
                    const courses = response.data.courses;
                    await AsyncStorage.multiSet([["@schedule", JSON.stringify(schedule)], 
                        ["@courses", JSON.stringify(courses)]]);
                    console.log("Finished downloading and saving scheudle");
                } else {
                    Alert.alert("Error", "Did not find the batch so using stale data");
                    await AsyncStorage.multiSet([['@schedule', tempSched], ["@courses", tempCourse]])
                }
                await this.getSchedule();
            })
            .catch(async (e) => {
                console.log(e);
                Alert.alert("Error", "There was a network error so using stale data");
                await AsyncStorage.multiSet([["@schedule", tempSched], ["@courses", tempCourse]], async (e) => {
                    if (e) throw e;
                    console.log("Refresh schedule failed. Network Error but re-setting schedule and courses was successful\n" + tempSched);
                    await this.getSchedule();
                });
            });
        this.setState({ isFetching: false });
    }

}


const styles = StyleSheet.create({
    viewpagerStyle: {
        flex: 1,
        justifyContent: "space-evenly",
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
