import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, BackHandler } from 'react-native';
import Choselanguage from './onboard/chooseLanguage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Login from './onboard/login';
import ForgotPassword from './onboard/forgotpassword';
import ChangePassword from './onboard/chnagePassword';
import VerifyCode from './onboard/verifyCode';
import SignUp from './onboard/signup';
import { connect } from 'react-redux';
import { setLang } from '../dataStore/actions/common';
import Layout from './layout/layout';
import Searchpage from './search/Searchpage';
import Categories from './categories/categories';
import Favorites from './favorites/favorites';
import { getMe, setToken } from '../dataStore/actions/user';


const MainComponent = (props) => {
    const { Stack } = props;

    const removeVal = async () => {
        try {
            const val = await AsyncStorage.removeItem('userLang');
            const val2 = await AsyncStorage.removeItem('loggedin');
        } catch (e) { }
    }
    React.useEffect(() => {
        props.setLangFn();
        if (props.user.loggedin) {
            props.getMeFn(props.token)
        }
    }, []);
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {props.loggedin == 'yes' && <Stack.Screen name="layout" component={Layout} />}
            <Stack.Screen initialParams={{ lang: props.lang }} name="Choselanguage" component={Choselanguage} />
            <Stack.Screen name="login" component={Login} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
            <Stack.Screen name="ChangePassword" component={ChangePassword} />
            <Stack.Screen name="searchpage" component={Searchpage} />
            <Stack.Screen name="VerifyCode" component={VerifyCode} />
            <Stack.Screen name="SignUp" component={SignUp} />
            {props.loggedin != 'yes' && <Stack.Screen name="layout" component={Layout} />}
            <Stack.Screen name="Categories" component={Categories} />
            <Stack.Screen name="Favorites" component={Favorites} />
        </Stack.Navigator >

    )
};

const styles = StyleSheet.create({

});

const mapStateToProps = (state) => ({
    user: state.user,
});


const mapDispatchToProps = dispatch => ({
    setLangFn: () => { dispatch(setLang()) },
    setToken: (tok) => { dispatch(setToken(tok)) },
    getMeFn: (tok) => { dispatch(getMe(tok)) },
});

export default connect(mapStateToProps, mapDispatchToProps)(MainComponent);