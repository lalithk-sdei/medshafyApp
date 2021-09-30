import React from 'react';
import { Text, StyleSheet } from 'react-native';

const SecondText = props => <Text style={styles.body}>{props.children}</Text>;

const styles = StyleSheet.create({
    body: {
        fontFamily: 'Quasimodasemibold',
        fontSize: 22,
        color: '#2B2C34',
    }
});

export default SecondText;