import * as React from 'react';
import { Platform, View, Text, StyleSheet, Dimensions, TouchableWithoutFeedback, Keyboard, ScrollView, Alert, BackHandler, TouchableHighlight, FlatList, Button, TouchableOpacity } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { connect } from 'react-redux';
import { LogBox } from 'react-native';
import { RESET_DATA, SET_LOGOUT } from '../../dataStore/types/types';
import TitleText from '../common/elements/TitleText';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import SecondaryBtn from '../common/elements/secondaryButton';
import LinkText from '../common/elements/linktext';
import RegularText from '../common/elements/regulartext';

const ProfilelandngPage = (props) => {
    const logout = async () => {
        try {
            props.logoutFn();
            props.resetAll();
            await AsyncStorage.removeItem('userLang');
            await AsyncStorage.removeItem('loggedin');
            await AsyncStorage.removeItem('token');
            setTimeout(() => {
                props.navigation.navigate('Choselanguage');
            }, 10);
        } catch (e) { }
    }


    React.useEffect(() => {
        // LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
        // if (props.user.loggedin === false) {
        //     props.navigation.navigate('Choselanguage');
        // }
    }, [props.user.loggedin]);
    return (
        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss(); }}>
            <React.Fragment>
                <View style={{ flex: 1 }}>
                    <Spinner
                        color={"#9F9FA2"}
                        visible={false}
                        textContent={'Please wait...'}
                        textStyle={{ color: '#FFF' }}
                    />
                    <View style={{ flex: 1 }}>
                        <View style={styles.tophead}>
                            <TitleText title="My Account" />
                        </View>
                        {!props.user.loggedin ? <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <View style={{}}>
                                <React.Fragment>
                                    {<RegularText>Please <LinkText onPress={() => { props.navigation.navigate('login'); }}>login</LinkText> to access your profile</RegularText>}
                                </React.Fragment>
                            </View>
                        </View> :
                            <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
                                <View style={styles.body}>
                                    {/* My Profile */}
                                    <TouchableOpacity onPress={() => {
                                        props.navigation.navigate('MyProfile');
                                    }}>
                                        <View style={styles.card}>
                                            <View style={styles.cardIcon}><FontAwesome name="user-o" color={'#3F3F46'} size={20} /></View>
                                            <View style={styles.CardTextDiv}>
                                                <Text style={styles.CardtextStyle}>My Profile</Text>
                                            </View>
                                            <View style={{ flex: 1, position: 'absolute', right: 14, top: 15 }}>
                                                <MaterialIcons name="chevron-right" size={39} color="#3F3F46" />
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                    {/* My Orders */}
                                    <TouchableOpacity onPress={() => { props.navigation.navigate('myOrders'); }}>
                                        <View style={styles.card}>
                                            <View style={styles.cardIcon}><MaterialCommunityIcons name="clipboard-text-outline" size={26} color="#3F3F46" /></View>
                                            <View style={styles.CardTextDiv}>
                                                <Text style={styles.CardtextStyle}>My Order</Text>
                                            </View>
                                            <View style={{ flex: 1, position: 'absolute', right: 14, top: 15 }}>
                                                <MaterialIcons name="chevron-right" size={39} color="#3F3F46" />
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                    {/* Adress Book */}
                                    <TouchableOpacity onPress={() => { props.navigation.navigate('MyAddress'); }}>
                                        <View style={styles.card}>
                                            <View style={styles.cardIcon}><Octicons name="location" color={'#3F3F46'} size={25} /></View>
                                            <View style={styles.CardTextDiv}>
                                                <Text style={styles.CardtextStyle}>Address Book</Text>
                                            </View>
                                            <View style={{ flex: 1, position: 'absolute', right: 14, top: 15 }}>
                                                <MaterialIcons name="chevron-right" size={39} color="#3F3F46" />
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                    {/* Favorite products */}
                                    <TouchableOpacity onPress={() => { props.navigation.navigate('Favorites', { from: 'profile', page: '0' }); }}>
                                        <View style={styles.card}>
                                            <View style={styles.cardIcon}><MaterialIcons name="favorite-outline" color={'#3F3F46'} size={26} /></View>
                                            <View style={styles.CardTextDiv}>
                                                <Text style={styles.CardtextStyle}>Favourite Products</Text>
                                            </View>
                                            <View style={{ flex: 1, position: 'absolute', right: 14, top: 15 }}>
                                                <MaterialIcons name="chevron-right" size={39} color="#3F3F46" />
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                    {/* Buy Again */}
                                    <TouchableOpacity onPress={() => { props.navigation.navigate('Favorites', { from: 'profile', page: '1' }); }}>
                                        <View style={styles.card}>
                                            <View style={styles.cardIcon}><Entypo name="back-in-time" size={24} color="black" /></View>
                                            <View style={styles.CardTextDiv}>
                                                <Text style={styles.CardtextStyle}>Buy Again</Text>
                                            </View>
                                            <View style={{ flex: 1, position: 'absolute', right: 14, top: 15 }}>
                                                <MaterialIcons name="chevron-right" size={39} color="#3F3F46" />
                                            </View>
                                        </View>
                                        <View style={{ marginVertical: 10 }}>
                                            <SecondaryBtn style={{ backgroundColor: '#00000000' }} title={'Logout'} onPress={() => { logout(); }}></SecondaryBtn>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </ScrollView>
                        }
                    </View>
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
    tophead: {
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 50,
        backgroundColor: 'white',
        paddingBottom: 22,
        elevation: 4,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 1, height: 3 },
                shadowOpacity: 0.2,
            },
            android: {
                elevation: 4,
            }
        })
    },
    body: {
        flex: 1,
        paddingHorizontal: 23,
        paddingVertical: 30,
        position: 'relative',
    },
    card: {
        backgroundColor: 'white',
        padding: 23,
        marginBottom: 20,
        flexDirection: 'row'
    },
    cardIcon: {
        flex: 1
    },
    CardTextDiv: {
        flex: 9,
        flexDirection: 'row'
    },
    CardtextStyle: {
        paddingLeft: 10,
        fontFamily: 'QuasimodaMedium',
        fontSize: 20,
        color: '#3F3F46'
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
