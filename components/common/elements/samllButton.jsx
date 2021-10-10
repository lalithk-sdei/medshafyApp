import React from 'react';
import { Text, StyleSheet, Button, TouchableOpacity, Dimensions } from 'react-native';

const SmallButton = ({
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
        paddingHorizontal: 10,
        paddingVertical: 5,
        width: 'auto'
    },
    buttonText: {
        fontFamily: 'Quasimodabold',
        fontSize: 15,
        color: '#2B2C34',
        fontWeight: 'bold'
    }
});

export default SmallButton;