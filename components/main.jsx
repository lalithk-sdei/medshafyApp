import React, { useEffect, useState } from 'react';
import { Text, StyleSheet } from 'react-native';
import Choselanguage from './onboard/chooseLanguage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Login from './onboard/login';
import ForgotPassword from './onboard/forgotpassword';
import ChangePassword from './onboard/chnagePassword';
import VerifyCode from './onboard/verifyCode';
import SignUp from './onboard/signup';
import { connect } from 'react-redux';
import { setLang } from '../dataStore/actions/common';

const Stack = createNativeStackNavigator();

const MainComponent = (props) => {

    const removeVal = async () => {
        try {
            const val = await AsyncStorage.removeItem('userLang');
        } catch (e) { }
    }
    React.useEffect(() => {
        // removeVal()
        props.setLangFn()
    });
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen initialParams={{ lang: props.lang }} name="Choselanguage" component={Choselanguage} />
                <Stack.Screen name="login" component={Login} />
                <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
                <Stack.Screen name="ChangePassword" component={ChangePassword} />
                <Stack.Screen name="SignUp" component={SignUp} />
            </Stack.Navigator>
        </NavigationContainer>
    )
};

const styles = StyleSheet.create({

});

const mapDispatchToProps = dispatch => ({
    setLangFn: () => { dispatch(setLang()) },
});

export default connect(null, mapDispatchToProps)(MainComponent);