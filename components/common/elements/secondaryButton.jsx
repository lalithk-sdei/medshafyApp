import React from 'react';
import { Text, StyleSheet, Button, TouchableOpacity, Dimensions } from 'react-native';
import { Feather } from '@expo/vector-icons';
const SecondaryBtn = ({
    disabled = false,
    onPress = () => { },
    style = {},
    title = '',
    iscamara = false,
}) => (<TouchableOpacity disabled={disabled} onPress={onPress} style={[
    styles.button,
    style,
    {
        opacity: disabled ? 0.5 : 1
    }
]}>

    <Text style={styles.buttonText}>
        {iscamara && <React.Fragment><Feather name="camera" size={24} color="#707070" />{"    "}</React.Fragment>}
        {title}</Text>
</TouchableOpacity>)

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#fff',
        borderRadius: 50,
        alignItems: 'center',
        borderColor: '#707070',
        borderWidth: 1,
        padding: 17,
    },
    buttonText: {
        fontFamily: 'Quasimodasemibold',
        fontSize: 22,
        color: '#707070',
        // fontWeight: 'bold'
    }
});

export default SecondaryBtn;