import * as React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableWithoutFeedback, Keyboard, ScrollView, Alert, BackHandler, TouchableHighlight, FlatList, Button } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { connect } from 'react-redux';
import { LogBox } from 'react-native';
import { RESET_DATA, SET_LOGOUT } from '../../dataStore/types/types';

const ProfilelandngPage = (props) => {
    const logout = async () => {
        try {
            props.logoutFn();
            props.resetAll();
            props.navigation.navigate('Choselanguage');
            const val = await AsyncStorage.removeItem('userLang');
            const val2 = await AsyncStorage.removeItem('loggedin');
            const val3 = await AsyncStorage.removeItem('token');
        } catch (e) { }
    }
    React.useEffect(() => {
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
        if (props.user.loggedin === false) {
            props.navigation.navigate('Choselanguage');
        }
    }, [props.user.loggedin]);
    return (
        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss(); }}>
            <React.Fragment>
                <View style={{ flex: 1 }}>
                    <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
                        <Spinner
                            color={"#9F9FA2"}
                            visible={false}
                            textContent={'Please wait...'}
                            textStyle={{ color: '#FFF' }}
                        />
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Button onPress={() => {
                                logout();
                            }} title={"Log Out"} />
                            <Text>Profile!</Text>
                        </View>
                    </ScrollView>
                </View>
            </React.Fragment>
        </TouchableWithoutFeedback>
    );
}



const styles = StyleSheet.create({
    main: {
        backgroundColor: '#fff',
        minHeight: Dimensions.get('screen').height
    },
    firstCol: {
        marginTop: 30,
        marginHorizontal: 23,
    },
    secondCol: {
        marginTop: 20
    },
    thirdCol: {
        marginTop: 50,
        marginHorizontal: 23,
    }
});


const mapStateToProps = (state) => ({
    user: state.user
});


const mapDispatchToProps = dispatch => ({
    logoutFn: () => { dispatch({ type: SET_LOGOUT }) },
    resetAll: () => { dispatch({ type: RESET_DATA }) }
});
export default connect(mapStateToProps, mapDispatchToProps)(ProfilelandngPage);
