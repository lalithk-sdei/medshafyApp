import React from 'react';
import { Text, StyleSheet } from 'react-native';

const FirstHead = props => <Text style={styles.body}>{props.children}</Text>;

const styles = StyleSheet.create({
    body: {
        fontFamily: 'Quasimodasemibold',
        fontSize: 28,
        color: '#2B2C34',
        fontWeight: 'normal'
    }
});

export default FirstHead;