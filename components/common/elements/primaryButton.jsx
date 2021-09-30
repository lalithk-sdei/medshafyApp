import React from 'react';
import { Text, StyleSheet, Button, TouchableOpacity, Dimensions } from 'react-native';

const PrimaryButton = ({
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
    <Text style={styles.buttonText}>{title}</Text>
</TouchableOpacity>)

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#98DECA',
        borderRadius: 50,
        alignItems: 'center',
        padding: 17,
    },
    buttonText: {
        fontFamily: 'Quasimodasemibold',
        fontSize: 22,
        color: '#2B2C34',
        // fontWeight: 'bold'
    }
});

export default PrimaryButton;