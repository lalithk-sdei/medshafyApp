import * as React from 'react';
import { Platform, View, Image, StyleSheet, Dimensions, TouchableWithoutFeedback, Keyboard, ScrollView, Alert, BackHandler, TouchableHighlight, FlatList, Button } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { connect } from 'react-redux';
import { LogBox } from 'react-native';
import { RESET_DATA, SET_LOGOUT } from '../../../dataStore/types/types';
import TitleText from '../../common/elements/TitleText';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import SecondaryBtn from '../../common/elements/secondaryButton';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import LightText from '../../common/elements/lightText';
import RegularText from '../../common/elements/regulartext';
import PlaneText from '../../common/elements/planeText';
import PrimaryButton from '../../common/elements/primaryButton';
import { AntDesign } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { constants } from '../../../utlits/constants';

const Viewproducts = (props) => {
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

    const order = props.route.params;
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
                        textContent={constants[lang].static.pleasewait}
                        textStyle={{ color: '#FFF' }}
                    />
                    <View style={{ flex: 1 }}>
                        <View style={styles.tophead}>
                            <View style={{ flex: 1 }}><Ionicons onPress={() => { props.navigation.navigate('myOrders'); }} name="arrow-back" size={24} color="black" /></View>
                            <View style={{ flex: 7, alignItems: 'center' }}><TitleText title="ORD561801524" /></View>
                            <View style={{ flex: 1 }}></View>
                        </View>
                        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
                            <View style={styles.body}>

                                {order.prods && order.prods.length > 0 ? order.prods.map((pro, ind) => <View key={ind} style={styles.card}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <View style={{ flex: 1 }}>
                                            <Image
                                                style={{ margin: 5, width: Dimensions.get('screen').width / 3.5, height: Dimensions.get('screen').width / 3.5, resizeMode: 'stretch' }}
                                                source={{
                                                    uri: pro.prodImg ? pro.prodImg : 'https://gcdn.pbrd.co/images/grEHL3gquLuy.png',
                                                }}
                                            />
                                        </View>
                                        <View style={{ flex: 1, justifyContent: 'center' }}>
                                            <RegularText nolines={1}>{pro.prodName}</RegularText>
                                            <TitleText styles={{ textAlign: 'left' }} title={`${constants[lang].static.curr} ${pro.prodPrice}`} />
                                        </View>
                                    </View>
                                </View>) : null}
                                <View style={[styles.card, { padding: 0 }]}>
                                    <View style={{ paddingHorizontal: 15, paddingTop: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <RegularText title={""}>{constants[lang].static.subtotal}</RegularText>
                                        <RegularText >{constants[lang].static.curr} {order.subTotal}</RegularText>
                                    </View>
                                    <View style={{ paddingHorizontal: 15, paddingBottom: 10, paddingTop: 5, flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <RegularText title={""}>{constants[lang].static.delChag}</RegularText>
                                        <RegularText >{constants[lang].static.curr} 0</RegularText>
                                    </View>
                                    <View style={{ paddingBottom: 20, paddingHorizontal: 15, borderTopColor: '#d9d8d8', paddingTop: 20, borderTopWidth: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <RegularText title={""}>{constants[lang].static.total}</RegularText>
                                        <TitleText styles={{ fontSize: 17, textAlign: 'left' }} title={`${constants[lang].static.curr} ${order.subTotal}`} />
                                    </View>
                                </View>
                                <View style={[styles.card, { padding: 0 }]}>
                                    <View style={{ paddingHorizontal: 15, paddingTop: 15, flexDirection: 'row', paddingBottom: 15 }}>
                                        <MaterialIcons name="credit-card" size={24} color="black" />
                                        <RegularText >{"    "}{constants[lang].static.pbap}</RegularText>
                                    </View>
                                    <View style={{ paddingBottom: 20, paddingHorizontal: 15, borderTopColor: '#d9d8d8', paddingTop: 20, borderTopWidth: 1, flexDirection: 'row' }}>
                                        <SimpleLineIcons name="location-pin" size={24} color="black" />
                                        <LightText >{"    "}{constants[lang].static.delyAddress}</LightText>
                                    </View>
                                    <View style={{ paddingBottom: 20, paddingHorizontal: 15, flexDirection: 'row' }}>
                                        <RegularText >{order.address.address}</RegularText>
                                    </View>
                                </View>
                            </View>
                        </ScrollView>
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
        padding: 10,
        marginBottom: 20,
        flexDirection: 'column'
    },
    cardClm: {
        flexDirection: 'row',
        marginBottom: 15
    },

});


const mapStateToProps = (state) => ({
    user: state.user,
    lang: state.common.lang ? state.common.lang : 'en',
});


const mapDispatchToProps = dispatch => ({
    logoutFn: () => { dispatch({ type: SET_LOGOUT }) },
    resetAll: () => { dispatch({ type: RESET_DATA }) }
});
export default connect(mapStateToProps, mapDispatchToProps)(Viewproducts);
