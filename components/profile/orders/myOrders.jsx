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
import { getAddress } from '../../../dataStore/actions/address';
import { getOrders } from '../../../dataStore/actions/orders';
import { constants } from '../../../utlits/constants';

const MyOrders = (props) => {

    const { ordersprocess, ordersStatus, orders = [], buyAgain = [] } = props.order;
    const { lang } = props;

    React.useEffect(() => {
        props.getOrdersFn();
        // LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
        // if (props.user.loggedin === false) {
        //     props.navigation.navigate('Choselanguage');
        // }
    }, []);
    return (
        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss(); }}>
            <React.Fragment>
                <View style={{ flex: 1 }}>
                    <Spinner
                        color={"#9F9FA2"}
                        visible={ordersprocess}
                        textContent={constants[lang].static.pleasewait}
                        textStyle={{ color: '#FFF' }}
                    />
                    <View style={{ flex: 1 }}>
                        <View style={styles.tophead}>
                            <View style={{ flex: 1 }}><Ionicons onPress={() => { props.navigation.navigate('Profile'); }} name="arrow-back" size={24} color="black" /></View>
                            <View style={{ flex: 7, alignItems: 'center' }}><TitleText title={constants[lang].static.myOrds} /></View>
                            <View style={{ flex: 1 }}></View>
                        </View>

                        {orders.length == 0 ? <View style={{ flex: 1, marginTop: Dimensions.get('screen').height / 4, justifyContent: 'center', alignItems: 'center' }}>
                            <View style={{}}>
                                <React.Fragment>
                                    {(!ordersprocess) && <RegularText>{constants[lang].static.ydhaords}</RegularText>}
                                </React.Fragment>
                            </View>
                        </View> : null}

                        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
                            <View style={styles.body}>
                                {orders.length > 0 ? orders.map((ord, ind) => <View key={ind} style={styles.card}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <View><RegularText styles={{ fontSize: 20 }} title={constants[lang].static.ordTtl} >{constants[lang].static.ordTtl}</RegularText></View>
                                        <View><TitleText title={`${constants[lang].static.curr} ${ord.subTotal}`} /></View>
                                    </View>
                                    <View style={{ marginTop: 15 }}>
                                        <View><PlaneText>Order id : {ord.orderId ? ord.orderId : `ORD0000${ind}`}</PlaneText></View>
                                        <View><PlaneText>Created : {new Date(ord.updatedAt).toDateString()} {new Date(ord.updatedAt).toLocaleTimeString()} </PlaneText></View>
                                        <View><PlaneText>Ship to : {ord.address ? ord.address.name : "Unknown"}</PlaneText></View>
                                    </View>
                                    {/* Penfing for delivery */}
                                    {ord.status === 0 ? <View style={{ flexDirection: 'row', marginTop: 15 }}>
                                        <MaterialCommunityIcons name="clock" size={24} color="red" />
                                        <RegularText>{"    "}{constants[lang].static.pendorDel}</RegularText>
                                    </View> : null}
                                    {/* Processing */}
                                    {ord.status === 1 ? <View style={{ flexDirection: 'row', marginTop: 15 }}>
                                        <MaterialCommunityIcons name="truck-delivery" size={24} color="red" />
                                        <RegularText>{"    "}{constants[lang].static.ordPrc}</RegularText>
                                    </View> : null}
                                    {/* Out for delivery */}
                                    {ord.status === 2 ? <View style={{ flexDirection: 'row', marginTop: 15 }}>
                                        <MaterialCommunityIcons name="clock" size={24} color="red" />
                                        <RegularText>{"    "}{constants[lang].static.outofordel}</RegularText>
                                    </View> : null}
                                    {/* Delvered */}
                                    {ord.status === 3 ? <View style={{ flexDirection: 'row', marginTop: 15 }}>
                                        <MaterialIcons name="done" size={24} color="red" />
                                        <RegularText>{"    "}{constants[lang].static.delivered}</RegularText>
                                    </View> : null}
                                    {/* Canceled */}
                                    {ord.status === 4 ? <View style={{ flexDirection: 'row', marginTop: 15 }}>
                                        <MaterialIcons name="cancel" size={24} color="red" />
                                        <RegularText>{"    "}{constants[lang].static.cancelled}</RegularText>
                                    </View> : null}
                                    {/* Refunded */}
                                    {ord.status === 5 ? <View style={{ flexDirection: 'row', marginTop: 15 }}>
                                        <MaterialCommunityIcons name="cash-refund" size={24} color="red" />
                                        <RegularText>{"    "}{constants[lang].static.Refunded}</RegularText>
                                    </View> : null}
                                    <View style={{ marginTop: 20 }}>
                                        <PrimaryButton onPress={() => { props.navigation.navigate('Viewproducts', ord); }} title={constants[lang].static.viewProds} />
                                    </View>
                                </View>) : null}
                            </View>
                        </ScrollView>
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
        padding: 23,
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
    order: state.order,
    lang: state.common.lang ? state.common.lang : 'en',

});


const mapDispatchToProps = dispatch => ({
    logoutFn: () => { dispatch({ type: SET_LOGOUT }) },
    resetAll: () => { dispatch({ type: RESET_DATA }) },
    getOrdersFn: () => { dispatch(getOrders()) }
});
export default connect(mapStateToProps, mapDispatchToProps)(MyOrders);
