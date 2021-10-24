import React from 'react';
import { Text, StyleSheet, Button, TouchableOpacity, Dimensions } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const ApplePayBtn = ({
    disabled = false,
    onPress = () => { },
    style = {},
    title = ''
}) => (<TouchableOpacity disabled={disabled} onPress={onPress} style={[
    styles.button,
    style,
    {
        opacity: disabled ? 0.5 : 1
    }
]}>
    <Text style={styles.buttonText}><AntDesign name="apple1" size={24} color="white" /> Pay</Text>
</TouchableOpacity>)

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#000000',
        borderRadius: 10,
        alignItems: 'center',
        padding: 17,
    },
    buttonText: {
        fontFamily: 'Quasimodabold',
        fontSize: 22,
        color: 'white',
        // fontWeight: 'bold'
    }
});

export default ApplePayBtn;