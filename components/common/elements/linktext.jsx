import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';

const LinkText = props =>
    <TouchableOpacity activeOpacity={0.5} onPress={props.onPress}>
        <Text style={[styles.body, props.styles]}>{props.children}</Text>
    </TouchableOpacity>;

const styles = StyleSheet.create({
    body: {
        fontFamily: 'QuasimodaMedium',
        fontSize: 16,
        color: '#2F33A4',
        opacity: 1,
    }
});

export default LinkText;