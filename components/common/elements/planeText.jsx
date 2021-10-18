import React from 'react';
import { Text, StyleSheet } from 'react-native';

const PlaneText = props => <Text style={[styles.body, props.styles]}>{props.children}</Text>;

const styles = StyleSheet.create({
    body: {
        fontFamily: 'Quasimoda',
        fontSize: 16,
        color: '#2B2C34',
        lineHeight: 27
    }
});

export default PlaneText;


