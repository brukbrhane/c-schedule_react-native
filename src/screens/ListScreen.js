import React from 'react';
import { ScrollView, Text, StyleSheet, FlatList, TouchableOpacity, Button } from 'react-native';

const ListScreen = ({ navigation }) => {
    const friends = [
        { name: 'Friend 1', age: 21 },
        { name: 'Friend 2', age: 22 },
        { name: 'Friend 3', age: 23 },
        { name: 'Friend 4', age: 24 },
        { name: 'Friend 5', age: 25 },
        { name: 'Friend 6', age: 26 },
        { name: 'Friend 7', age: 27 },
        { name: 'Friend 8', age: 28 },
        { name: 'Friend 9', age: 29 }
    ]

    return (
        <ScrollView>
            <TouchableOpacity
                onPress={(e) => navigation.navigate('Home')}>
                <Text>Back</Text>
            </TouchableOpacity>
            <FlatList
                data={friends}
                keyExtractor={(friend) => friend.name}
                renderItem={({ item }) => {
                    return <Text style={styles.textStyle}>{item.name} - Age {item.age}</Text>
                }}
            />
            <Button
                title='Go to the new Login Screen'
                onPress={ (e) => navigation.navigate('Login')}/>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    textStyle: {
        marginVertical: 50
    }
});

export default ListScreen;