import React from 'react';
import { Text, StyleSheet } from 'react-native';

const RegularText = props => <Text style={[styles.body, props.styles]}>{props.children}</Text>;

const styles = StyleSheet.create({
    body: {
        fontFamily: 'Quasimodasemibold',
        fontSize: 17,
        color: '#3F3F46',
        opacity: 1,
        lineHeight: 27
    }
});

export default RegularText;