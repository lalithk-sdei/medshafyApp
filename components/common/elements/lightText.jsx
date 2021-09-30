import React from 'react';
import { Text, StyleSheet } from 'react-native';

const LightText = props => <Text style={[styles.body, props.styles]}>{props.children}</Text>;

const styles = StyleSheet.create({
    body: {
        fontFamily: 'QuasimodaMedium',
        fontSize: 16,
        color: '#2B2C34',
        opacity: 0.5,
        lineHeight: 27
    }
});

export default LightText;