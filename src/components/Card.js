//import 
import React from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';

const Card = (props) => (
    <View style={styles.containerStyle}>
        {props.children}
    </View>
);

const styles = StyleSheet.create({
    containerStyle: {
        width: (Dimensions.get('window').width - 10),
        borderWidth: 1,
        borderRadius: 4,
        borderColor: '#ddd',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 1,
        elevation: 5,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 5,
        marginBottom: 5,
        justifyContent: 'center',
    }
});

export default Card;
