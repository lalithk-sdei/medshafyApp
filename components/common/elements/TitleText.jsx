import React from 'react';
import { Text, StyleSheet } from 'react-native';

const TitleText = props => <Text style={styles.body}>{props.title}</Text>;

const styles = StyleSheet.create({
    body: {
        fontSize: 20,
        color: '#2B2C34',
        fontWeight: 'bold',
        fontFamily: 'Quasimodabold',
    }
});

export default TitleText;