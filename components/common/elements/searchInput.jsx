import React, { useState } from 'react';
import { Text, StyleSheet, View, TextInput } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
const SearchInput = (props) => {

    const {
        cross = true,
        closeFn = () => { },
        value = value
    } = props

    return (
        <View style={{ paddingTop: 18, position: 'relative' }}>
            <TextInput
                {...props}
                style={{
                    fontSize: 20,
                    color: '#000',
                    borderWidth: 0,
                    borderRadius: 50,
                    padding: 10,
                    paddingLeft: 48,
                    fontSize: 14,
                    backgroundColor: '#F4F4F4',
                    position: 'relative',
                    fontFamily: 'QuasimodaMedium',
                }}

            />
            <Feather style={{
                position: 'absolute',
                top: 25,
                left: 15
            }} name="search" size={24} color="#98DECA" />
            {(cross && value != "") &&
                <Ionicons onPress={() => { closeFn() }} style={{
                    position: 'absolute',
                    top: 25,
                    right: 15
                }} name="close" size={24} color="black" />
            }
        </View>
    )
};

const styles = StyleSheet.create({

});

export default SearchInput;