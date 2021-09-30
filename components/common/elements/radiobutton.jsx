import React from 'react';
import { View, StyleSheet } from 'react-native';

const RadioButton = (props) =>
(<View style={[{
    height: 30,
    width: 30,
    borderRadius: 15,
    borderWidth: 3,
    borderColor: '#2F33A4',
    alignItems: 'center',
    justifyContent: 'center',
}, props.style]}>
    {
        props.selected ?
            <View style={{
                height: 15,
                width: 15,
                borderRadius: 7.5,
                backgroundColor: '#2F33A4',
            }} />
            : null
    }
</View>);


export default RadioButton;