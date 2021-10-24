import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, View, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Floatinginput = (props) => {
    const [isFocused, setisFocused] = useState(false);
    const [isActive, setisActive] = useState(false);
    const [val, setVal] = useState('');

    const blured = () => {
        setisActive(false);
        if (val == '' || val == null) {
            setisFocused(false);
        } else {
            setisFocused(true);
        }
    }

    useEffect(() => {
        if (props.liftUp) {
            setisFocused(true);
        }
        if (props.value) {
            setVal(props.value);
        }
    }, [])

    return (
        <View style={{ paddingTop: 18 }}>
            <Text style={{
                position: 'absolute',
                left: 0,
                top: (!isFocused) ? 28 : 0,
                fontSize: (!isFocused) ? 16 : 16,
                color: '#2B2C34',
                opacity: 0.5,
                fontFamily: 'QuasimodaMedium',
            }}>
                {props.label}
            </Text>
            <TextInput
                {...props}
                style={{
                    paddingRight: 35,
                    marginTop: 14,
                    height: 32,
                    fontSize: 20,
                    color: '#000',
                    borderBottomWidth: 2,
                    paddingBottom: 10,
                    borderBottomColor: isActive ? '#2F33A4' : '#A8A8AB',
                    fontSize: 18,
                    fontFamily: 'QuasimodaMedium',
                }}
                onFocus={() => { setisFocused(true); setisActive(true) }}
                onBlur={(e) => { blured(); }}
                onChangeText={(e) => { setVal(e); props.changetext(e); }}
            />
            {props.location && <Ionicons onPress={() => { props.currLocationFn(); }} style={{
                position: 'absolute',
                right: 0,
                bottom: 10,
            }} name="navigate-circle-outline" size={24} color="black" />}

        </View>
    )
};

const styles = StyleSheet.create({

});

export default Floatinginput;