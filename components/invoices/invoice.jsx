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
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import LightText from '../common/elements/lightText';
import RegularText from '../common/elements/regulartext';
import PlaneText from '../common/elements/planeText';
import PrimaryButton from '../common/elements/primaryButton';
import { AntDesign } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import LinkText from '../common/elements/linktext';
import { constants } from '../../utlits/constants';

const MyInvoices = (props) => {
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

    const { lang } = props;

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
                            <View style={{ flex: 1 }}>
                                {/* <Ionicons onPress={() => { props.navigation.navigate('myOrders'); }} name="arrow-back" size={24} color="black" /> */}
                            </View>
                            <View style={{ flex: 7, alignItems: 'center' }}><TitleText title={constants[lang].static.Invoice} /></View>
                            <View style={{ flex: 1 }}></View>
                        </View>
                        {!props.user.loggedin ? <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <View style={{}}>
                                <React.Fragment>
                                    {<RegularText>{constants[lang].static.pls} <LinkText onPress={() => { props.navigation.navigate('login'); }}>{constants[lang].static.lgn}</LinkText> {constants[lang].static.tayi}</RegularText>}
                                </React.Fragment>
                            </View>
                        </View> :
                            <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
                                <View style={styles.body}>
                                    <View style={styles.card}>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <View >
                                                <View style={{ flexDirection: 'column' }}>
                                                    <Text style={{ fontFamily: 'QuasimodaMedium', fontSize: 15, color: '#2F33A4' }}>21 June 2020</Text>
                                                    <Text style={{ fontFamily: 'QuasimodaMedium', fontSize: 15, marginTop: 10 }}>{constants[lang].static.curr} 306.00</Text>
                                                </View>
                                            </View>
                                            <View>
                                                <View style={{ flexDirection: 'column' }}>
                                                    <Text style={{ fontFamily: 'QuasimodaMedium', fontSize: 15, }}>2ORD561801524</Text>
                                                    <TouchableOpacity onPress={() => { }}>
                                                        <View style={{
                                                            backgroundColor: '#98DECA',
                                                            borderRadius: 50,
                                                            paddingHorizontal: 10,
                                                            paddingVertical: 5,
                                                            marginTop: 5,
                                                            justifyContent: 'center',
                                                            alignItems: 'center'
                                                        }}>
                                                            <Text style={{ fontFamily: 'QuasimodaMedium', fontSize: 13 }}> {constants[lang].static.download} </Text>
                                                        </View>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={styles.card}>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <View >
                                                <View style={{ flexDirection: 'column' }}>
                                                    <Text style={{ fontFamily: 'QuasimodaMedium', fontSize: 15, color: '#2F33A4' }}>21 June 2020</Text>
                                                    <Text style={{ fontFamily: 'QuasimodaMedium', fontSize: 15, marginTop: 10 }}>{constants[lang].static.curr} 306.00</Text>
                                                </View>
                                            </View>
                                            <View>
                                                <View style={{ flexDirection: 'column' }}>
                                                    <Text style={{ fontFamily: 'QuasimodaMedium', fontSize: 15, }}>2ORD561801524</Text>
                                                    <TouchableOpacity onPress={() => { }}>
                                                        <View style={{
                                                            backgroundColor: '#98DECA',
                                                            borderRadius: 50,
                                                            paddingHorizontal: 10,
                                                            paddingVertical: 5,
                                                            marginTop: 5,
                                                            justifyContent: 'center',
                                                            alignItems: 'center'
                                                        }}>
                                                            <Text style={{ fontFamily: 'QuasimodaMedium', fontSize: 13 }}> {constants[lang].static.download}</Text>
                                                        </View>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={styles.card}>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <View >
                                                <View style={{ flexDirection: 'column' }}>
                                                    <Text style={{ fontFamily: 'QuasimodaMedium', fontSize: 15, color: '#2F33A4' }}>21 June 2020</Text>
                                                    <Text style={{ fontFamily: 'QuasimodaMedium', fontSize: 15, marginTop: 10 }}>{constants[lang].static.curr} 306.00</Text>
                                                </View>
                                            </View>
                                            <View>
                                                <View style={{ flexDirection: 'column' }}>
                                                    <Text style={{ fontFamily: 'QuasimodaMedium', fontSize: 15, }}>2ORD561801524</Text>
                                                    <TouchableOpacity onPress={() => { }}>
                                                        <View style={{
                                                            backgroundColor: '#98DECA',
                                                            borderRadius: 50,
                                                            paddingHorizontal: 10,
                                                            paddingVertical: 5,
                                                            marginTop: 5,
                                                            justifyContent: 'center',
                                                            alignItems: 'center'
                                                        }}>
                                                            <Text style={{ fontFamily: 'QuasimodaMedium', fontSize: 13 }}> {constants[lang].static.download}</Text>
                                                        </View>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={styles.card}>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <View >
                                                <View style={{ flexDirection: 'column' }}>
                                                    <Text style={{ fontFamily: 'QuasimodaMedium', fontSize: 15, color: '#2F33A4' }}>21 June 2020</Text>
                                                    <Text style={{ fontFamily: 'QuasimodaMedium', fontSize: 15, marginTop: 10 }}>{constants[lang].static.curr} 306.00</Text>
                                                </View>
                                            </View>
                                            <View>
                                                <View style={{ flexDirection: 'column' }}>
                                                    <Text style={{ fontFamily: 'QuasimodaMedium', fontSize: 15, }}>2ORD561801524</Text>
                                                    <TouchableOpacity onPress={() => { }}>
                                                        <View style={{
                                                            backgroundColor: '#98DECA',
                                                            borderRadius: 50,
                                                            paddingHorizontal: 10,
                                                            paddingVertical: 5,
                                                            marginTop: 5,
                                                            justifyContent: 'center',
                                                            alignItems: 'center'
                                                        }}>
                                                            <Text style={{ fontFamily: 'QuasimodaMedium', fontSize: 13 }}> {constants[lang].static.download}</Text>
                                                        </View>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                    {/* <View style={[styles.card, { padding: 0 }]}>
                                    <View style={{ paddingHorizontal: 15, paddingTop: 15, flexDirection: 'row', paddingBottom: 15 }}>
                                        <MaterialIcons name="credit-card" size={24} color="black" />
                                        <RegularText >{"    "}Paid by Apple Pay</RegularText>
                                    </View>
                                    <View style={{ paddingBottom: 20, paddingHorizontal: 15, borderTopColor: '#d9d8d8', paddingTop: 20, borderTopWidth: 1, flexDirection: 'row' }}>
                                        <SimpleLineIcons name="location-pin" size={24} color="black" />
                                        <LightText >{"    "}Delivery Address</LightText>
                                    </View>
                                    <View style={{ paddingBottom: 20, paddingHorizontal: 15, flexDirection: 'row' }}>
                                        <RegularText >2972 Wesithemer Rd. Santa Ana, Illinois 85486</RegularText>
                                    </View>
                                </View> */}
                                </View>
                            </ScrollView>
                        }
                    </View>
                </View>
            </React.Fragment >
        </TouchableWithoutFeedback >
    );
}



const styles = StyleSheet.create({
    main: {
        backgroundColor: '#fff',
        minHeight: Dimensions.get('screen').height
    },
    tophead: {
        paddingHorizontal: 23,
        flexDirection: 'row',
        // textAlign: 'center',
        // alignItems: 'center',
        // justifyContent: 'center',
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
        padding: 20,
        marginBottom: 10,
        flexDirection: 'column'
    },
    cardClm: {
        flexDirection: 'row',
        marginBottom: 15
    },

});


const mapStateToProps = (state) => ({
    user: state.user,
    lang: state.common.lang,
});


const mapDispatchToProps = dispatch => ({
    logoutFn: () => { dispatch({ type: SET_LOGOUT }) },
    resetAll: () => { dispatch({ type: RESET_DATA }) }
});
export default connect(mapStateToProps, mapDispatchToProps)(MyInvoices);
