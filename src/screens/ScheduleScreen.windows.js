import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, AsyncStorage, Alert, ScrollView, ActivityIndicator, Dimensions, Platform } from 'react-native';
// import AsyncStorage from '@react-native-community/async-storage';
import DayViewComponent from '../components/DayViewComponent';
import { AppTheme } from 'react-native-windows';
//import Axios from 'axios';

export default class ScheduleScreen extends Component {
    state = { batch: "", schedule: [], courses: [], isFetching: false, day: new Date().getDay() > 6 ? 0 : new Date().getDay() - 1
                , currentTheme: AppTheme.currentTheme };

    componentDidMount(){
        AppTheme.addListener('appThemeChanged', this.onAppThemeChanged);
    };

    componentWillUnmount(){
        AppTheme.removeListener('appThemeChanged', this.onAppThemeChanged);
    }

    async componentWillMount() {
        console.log('Mounting ScheduleScreen for Windows');

        await this.getSchedule();
        console.log(this.state.batch == null ? "No Batch" : "ScheduleScreen Batch: " + this.state.batch);
        //FIXME: Axios isn't currently supported by rn-windows. So re-add that when it is.
        if (this.state.schedule[0] == null) {
            return fetch('https://class-schedule.herokuapp.com/schedule/get/' + this.state.batch)
                .then(response => response.json())
                .then(async responseJson => {
                    console.log(responseJson);
                    console.log(responseJson.schedule);
                    console.log(responseJson.courses);
                    if (responseJson.message == "OK") {
                        await AsyncStorage.setItem("@schedule", JSON.stringify(responseJson.schedule));
                        await AsyncStorage.setItem("@courses", JSON.stringify(responseJson.courses));
                        console.log("Finished donwloading and saving schedule");
                        this.getSchedule();
                    } else {
                        Alert.alert("No Batch", "You entered an invalid batch. please enter the correct batch again");
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        } else {
            console.log("Schedule exists so not downloading");
        }
    }

    render() {
        const { batch, schedule, day, isFetching } = this.state;
        const { textStyle } = styles;

        return (
            <View>
                <Text style={textStyle}>{batch}</Text>
                <FlatList
                    ref={(ref) => this.flatListRef = ref}
                    data={schedule}
                    // getItemLayout={(data, index) => { return { length: 6, index, offset: 6 * index } }}
                    horizontal
                    pagingEnabled
                    refreshing={isFetching}
                    onRefresh={() => this.onRefresh()}
                    initialScrollIndex={day}
                    getItemLayout={(data, index) => ({ length: Dimensions.get('window').width - 10, offset: (Dimensions.get('window').width) * index, index })}
                    onScrollToIndexFailed={({ }) => { this.flatListRef.scrollToIndex({ animated: true, index: 4 }) }}
                    ListEmptyComponent={() => {
                        return (
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <Text>Loading Schedule...</Text>
                                <ActivityIndicator size="large" />
                            </View>
                        )
                    }}
                    renderItem={({ item , index}) => {
                        return (<View>
                            <DayViewComponent day={item} index={index} dayNum={index}/>
                        </View>
                        );
                    }} />
            </View>
        );
    }

    onRefresh() {
        this.setState({ isFetching: true }, () => this.forgetSchedule());
    }

    async getSchedule() {
        let schedStr = ""
        schedStr = await AsyncStorage.getItem("@schedule");
        let batch = await AsyncStorage.getItem("@batch");
        let crsStr = ""
        crsStr = await AsyncStorage.getItem("@courses");
        if (batch == null) {
            this.props.navigation.navigate("Login");
        }
        if (schedStr == null) {
            console.log("Schedule string not found");
            this.setState({ batch });
            return;
        }
        coursArr = JSON.parse(crsStr);
        let schedObj = JSON.parse(schedStr);
        let schedArr = [];
        schedArr.push(schedObj.monday);
        schedArr.push(schedObj.tuesday);
        schedArr.push(schedObj.wednesday);
        schedArr.push(schedObj.thursday);
        schedArr.push(schedObj.friday);
        schedArr.push(schedObj.saturday);
        for (let i = 0; i < schedArr.length; i++) {
            if (schedArr[i].id == null) {
                schedArr[i].id = i.toString();
            }
        }
        console.log(schedArr[0]);

        let date = new Date();
        let day = date.getDay() > 6 ? 0 : date.getDay() - 1;
        this.setState({ schedule: schedArr, courses: coursArr, batch, day});
    }

    async forgetSchedule() {
        let tempSched = await AsyncStorage.getItem("@schedule");
        let tempCourse = await AsyncStorage.getItem("@courses");

        //TODO: Try to not remove
        // await AsyncStorage.removeItem("@schedule");
        // await AsyncStorage.removeItem("@courses");
        fetch('https://class-schedule.herokuapp.com/schedule/get/' + this.state.batch)
            .then(response => response.json())
            .then(async responseJson => {
                console.log(responseJson);
                console.log(responseJson.schedule);
                console.log(responseJson.courses);
                if (responseJson.message == "OK") {
                    await AsyncStorage.multiSet([['@schedule', JSON.stringify(responseJson.schedule)],
                    ['@courses', JSON.stringify(responseJson.courses)]]);
                    console.log("Finished donwloading and saving schedule");
                } else {
                    Alert.alert("No Batch", "The batch file is missing from the server. Using old data");
                    await AsyncStorage.multiSet([['@schedule', tempSched], ['@courses', tempCourse]]);
                }
            })
            .catch(async err => {
                console.log(err);
                Alert.alert("Network Error", "There was a network error so using stale data");
                await AsyncStorage.multiSet([['@schedule', tempSched], ["@courses", tempCourse]], async (e) => {
                    if (e) throw e;
                    console.log("Refresh schedule failed. Network Error but re-setting schedule and courses was successful\n" + tempSched);
                });
            });

        // Axios.get("https://class-schedule.herokuapp.com/schedule/get/" + this.state.batch)
        //     .then(async res => {
        //         if (res.data.message == "OK") {
        //             const schedule = response.data.schedule;
        //             const courses = response.data.courses;
        //             await AsyncStorage.setItem("@schedule", JSON.stringify(schedule));
        //             await AsyncStorage.setItem("@courses", JSON.stringify(courses));
        //         } else {
        //             Alert.alert("Error", "Did not find the batch so using stale data");
        //             await AsyncStorage.multiSet([['@schedule', tempSched], ["@courses", tempCourse]])
        //         }
        //         await this.getSchedule();
        //     })
        //     .catch(async (e) => {
        //         console.log(e);
        //         Alert.alert("Error", "There was a network error so using stale data");
        //         await AsyncStorage.multiSet([["@schedule", tempSched], ["@courses", tempCourse]], async (e) => {
        //             if (e) throw e;
        //             console.log("Refresh schedule failed. Network Error but re-setting schedule and courses was successful\n" + tempSched);
        //             await this.getSchedule();
        //         });
        //     });
        await this.getSchedule();
        this.setState({ isFetching: false });
    }

    onAppThemeChanged = (event) => {
        const currentTheme = AppTheme.currentTheme;
        this.setState({currentTheme});
    };
}

const styles = StyleSheet.create({
    textStyle: {
        alignSelf: 'center',
        fontSize: 30,
        color: Platform.OS === "windows" ? {windowsbrush: AppTheme.currentTheme === 'dark' ? 'SystemAccentColorLight3' : 'SystemAccentColorDark3'}: "blue",
        fontWeight: 'bold',
    }
});
