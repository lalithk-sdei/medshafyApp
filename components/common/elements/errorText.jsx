import React from 'react';
import { Text, StyleSheet } from 'react-native';

const Errortext = props => <Text style={[styles.body, props.styles]}>{props.children}</Text>;

const styles = StyleSheet.create({
    body: {
        fontFamily: 'QuasimodaMedium',
        fontSize: 16,
        color: 'red',
        opacity: 1,
        lineHeight: 27
    }
});

export default Errortext;