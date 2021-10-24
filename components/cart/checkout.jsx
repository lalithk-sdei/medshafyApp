import * as React from 'react';
import { Platform, View, Image, StyleSheet, Dimensions, TouchableWithoutFeedback, Keyboard, ScrollView, Alert, Text, TouchableHighlight, FlatList, Button, TouchableOpacity } from 'react-native';
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
import { AddToCart, deleteCart, GetCartForUser, UpdateCart } from '../../dataStore/actions/cart';
import { getAddress } from '../../dataStore/actions/address';
import RadioButton from '../common/elements/radiobutton';
import ApplePayBtn from '../common/elements/applyePay';
import { addOrder } from '../../dataStore/actions/orders';

const Checkout = (props) => {
    const [openQty, setOIpenQty] = React.useState(false);
    const [tab, setTab] = React.useState(0);
    const [seladdr, setseladdr] = React.useState(null);
    const [qtys, setQtys] = React.useState(false);
    const { cartprocess, cartStatus, cartData = [] } = props.cart;

    const getPriceName = (prod) => {
        if (prod.prodId == null || prod.prodQty === 'def') {
            return "";
        }
        if (prod.prodId.offeredPrices.length == 0) {
            cartUpdate({ ...prod, qty: 1 }, 'dec');
        }
        const d = prod.prodId.offeredPrices.filter((e) => e._id == prod.prodQty);
        if (d.length == 0) {
            cartUpdate({ ...prod, qty: 1 }, 'dec');
        }
        return d[0].qtyname;
    }

    const getPriceval = (prod) => {
        if (prod.prodQty === 'def') {
            return prod.prodId.salePrice * +prod.qty;
        }
        if (prod.prodId.offeredPrices.length == 0) {
            cartUpdate({ ...prod, qty: 1 }, 'dec');
        }
        const d = prod.prodId.offeredPrices.filter((e) => e._id == prod.prodQty);
        if (d.length == 0) {
            cartUpdate({ ...prod, qty: 1 }, 'dec');
        }
        return d[0].OfferdPrice * +prod.qty;
    }

    const getSubtotal = () => {
        let val = 0;
        cartData.map((a) => { val = val + getPriceval(a); });
        return val;
    }

    const { address = [], addressprocess } = props.address;

    const submit = () => {
        // const b = {
        //     prods: cartData.map((e) => ({
        //         prodId: {
        //             type: Schema.Types.ObjectId,
        //             ref: 'Product',
        //         },
        //         qty: { type: String },
        //         prodName: { type: String },
        //         prodnameArabic: { type: String },
        //         prodImg: { type: String },
        //         qtyname: { type: String },
        //         qtynameArabic: { type: String },
        //         prodPrice: { type: String },
        //     })),
        //     paidBy: { type: Number },
        //     address: { type: Object },
        //     DeliveryCharges: { type: Number },
        //     Vat: { type: Number },
        // };
        props.addOrderFn({}, (st) => { });
    }

    React.useEffect(() => {
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
        if (cartData.length == 0 && props.user.loggedin) {
            props.loadCart();
        }
        if (address.length == 0 && props.user.loggedin) {
            props.getAddressFn()
        }
    }, []);
    return (
        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss(); }}>
            <React.Fragment>
                <View style={{ flex: 1 }}>
                    <Spinner
                        color={"#9F9FA2"}
                        visible={addressprocess || cartprocess}
                        textContent={'Please wait...'}
                        textStyle={{ color: '#FFF' }}
                    />
                    <View style={{ flex: 1, opacity: openQty ? 0.1 : 1 }}>
                        <View style={styles.tophead}>
                            <View style={{ flex: 1 }}>
                                <Ionicons onPress={() => { props.navigation.navigate('MyCart'); }} name="arrow-back" size={24} color="black" />
                            </View>
                            <View style={{ flex: 7, alignItems: 'center' }}><TitleText title="Checkout" /></View>
                            <View style={{ flex: 1 }}></View>
                        </View>
                        {cartData.length == 0 ? <View style={{ flex: 1, marginTop: Dimensions.get('screen').height / 4, justifyContent: 'center', alignItems: 'center' }}>
                            <View style={{}}>
                                <React.Fragment>
                                    {(!cartprocess) && <RegularText>Your cart is empty.</RegularText>}
                                </React.Fragment>
                            </View>
                        </View> : null}
                        <ScrollView contentContainerStyle={{ flexGrow: 1, marginHorizontal: 23, marginVertical: 30 }}>
                            <View style={{ flexDirection: 'column' }}>
                                <View style={styles.clickCard}>
                                    <TouchableOpacity onPress={() => { if (seladdr) { setTab(0) } }}>
                                        <View style={{ flexDirection: 'row', padding: 15 }}>
                                            <View style={[styles.step, { backgroundColor: tab === 0 ? '#EE6000' : 'white' }]}><Text style={{ fontFamily: 'Quasimodabold', color: tab === 0 ? 'white' : '#EE6000' }}>1</Text></View>
                                            <View style={{ marginTop: 4 }}><TitleText title="Customer Address" /></View>
                                        </View>
                                    </TouchableOpacity>
                                    {tab === 0 ?
                                        <View style={{ paddingTop: 10, borderTopColor: '#0000000B', borderTopWidth: 1 }}>
                                            <View>
                                                {/* Address */}
                                                <View >
                                                    {address && address.length > 0 && address.map((addr, ind) => <View key={ind} style={{
                                                        backgroundColor: 'white',
                                                        padding: 10,
                                                        borderColor: '#efe9e9',
                                                        borderWidth: 1,
                                                        margin: 5,
                                                        borderRadius: 5
                                                    }}>
                                                        <TouchableOpacity onPress={() => { setseladdr(addr) }}>
                                                            <View style={{ flexDirection: 'row' }}>
                                                                <View style={{ flex: 7, marginRight: 5 }}>
                                                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                                        <TitleText title={addr.name} />
                                                                    </View>
                                                                    <View style={{ flexDirection: 'row', flex: 1 }}>
                                                                        <RegularText styles={{ fontFamily: 'QuasimodaMedium' }}>{addr.address}</RegularText>
                                                                    </View>
                                                                    <View style={{ flexDirection: 'row', flex: 1 }}>
                                                                        <RegularText styles={{ fontFamily: 'QuasimodaMedium' }}>{addr.completeAddress}</RegularText>
                                                                    </View>
                                                                </View>
                                                                <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}>
                                                                    <RadioButton selected={seladdr ? seladdr._id == addr._id : false}></RadioButton>
                                                                </View>
                                                            </View>
                                                        </TouchableOpacity>
                                                    </View>)}
                                                </View>
                                                <View style={{ margin: 20 }}><PrimaryButton onPress={() => { setTab(1) }} disabled={seladdr == null} title="Next"></PrimaryButton></View>
                                            </View>
                                        </View> : null}
                                </View>

                                <View style={styles.clickCard}>
                                    <View style={{ flexDirection: 'row', padding: 15 }}>
                                        <View style={[styles.step, { backgroundColor: tab === 1 ? '#EE6000' : 'white' }]}><Text style={{ fontFamily: 'Quasimodabold', color: tab === 1 ? 'white' : '#EE6000' }}>2</Text></View>
                                        <View style={{ marginTop: 4 }}><TitleText title="Payment Method" /></View>
                                    </View>
                                    {tab === 1 ?
                                        <View style={{ paddingTop: 10, borderTopColor: '#0000000B', borderTopWidth: 1 }}>
                                            <View>
                                                {/* Payment */}
                                                <View style={{ backgroundColor: '#E2E6E9' }}>
                                                    <View style={{ flexDirection: 'row', padding: 23 }}>
                                                        <View style={{ flex: 1 }}><LightText styles={{ fontSize: 18 }}>Payable Amount</LightText></View>
                                                        <View style={{ flex: 1 }}><TitleText title="SAR 306.00"></TitleText></View>
                                                    </View>
                                                </View>
                                                <View style={{ margin: 20 }}><ApplePayBtn onPress={() => { setTab(2) }} disabled={seladdr == null} title="Next"></ApplePayBtn></View>
                                            </View>
                                        </View> : null}
                                </View>


                                <View style={styles.clickCard}>
                                    <View style={{ flexDirection: 'row', padding: 15 }}>
                                        <View style={[styles.step, { backgroundColor: tab === 2 ? '#EE6000' : 'white' }]}><Text style={{ fontFamily: 'Quasimodabold', color: tab === 2 ? 'white' : '#EE6000' }}>3</Text></View>
                                        <View style={{ marginTop: 4 }}><TitleText title="Summary" /></View>
                                    </View>
                                    {tab === 2 ?
                                        <View style={{ paddingTop: 10, borderTopColor: '#0000000B', borderTopWidth: 1 }}>
                                            <View>
                                                {/* Payment */}
                                                <View>
                                                    {cartData.length > 0 ? cartData.map((pro, ind) => <View key={ind} style={styles.card}>
                                                        <View style={{ flexDirection: 'row' }}>
                                                            <View style={{ flex: 1 }}>
                                                                <Image
                                                                    style={{ margin: 5, width: Dimensions.get('screen').width / 3.5, height: Dimensions.get('screen').width / 3.5, resizeMode: 'stretch' }}
                                                                    source={{
                                                                        uri: pro.prodId.mainImage ? pro.prodId.mainImage.mediumUrl : 'https://gcdn.pbrd.co/images/grEHL3gquLuy.png',
                                                                    }}
                                                                />
                                                            </View>
                                                            <View style={{ flex: 1, justifyContent: 'center' }}>
                                                                <RegularText nolines={1}>{pro.prodId.name}</RegularText>
                                                                {pro.prodQty != 'def' ? <Text style={{ fontFamily: 'Quasimoda', fontSize: 14, color: '#3F3F46' }} nolines={1}>
                                                                    {getPriceName(pro)}
                                                                </Text> : null}
                                                                <TitleText title={`SAR ${getPriceval(pro)}`} />
                                                                <Text style={{ fontFamily: 'Quasimoda', fontSize: 14, color: '#3F3F46' }} nolines={1}>Qty : {pro.qty}</Text>
                                                            </View>
                                                        </View>
                                                    </View>) : null}
                                                    {cartData.length > 0 ? <React.Fragment>
                                                        <View style={[styles.card, { padding: 0 }]}>
                                                            <View style={{ paddingHorizontal: 15, paddingTop: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                                                                <RegularText title={""}>Sub total </RegularText>
                                                                <RegularText >SAR {getSubtotal()}</RegularText>
                                                            </View>
                                                            <View style={{ paddingHorizontal: 15, paddingBottom: 10, paddingTop: 5, flexDirection: 'row', justifyContent: 'space-between' }}>
                                                                <RegularText title={""}>Delivery charges</RegularText>
                                                                <RegularText >SAR 0</RegularText>
                                                            </View>
                                                            <View style={{ paddingHorizontal: 15, paddingBottom: 10, paddingTop: 5, flexDirection: 'row', justifyContent: 'space-between' }}>
                                                                <RegularText title={""}>Vat (2%)</RegularText>
                                                                <RegularText >SAR 0</RegularText>
                                                            </View>
                                                            <View style={{ paddingBottom: 20, paddingHorizontal: 15, borderTopColor: '#d9d8d8', paddingTop: 20, borderTopWidth: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                                                                <RegularText title={""}>Total</RegularText>
                                                                <TitleText styles={{ fontSize: 17 }} title={`SAR ${getSubtotal()}`} />
                                                            </View>
                                                        </View>
                                                    </React.Fragment> : null}
                                                </View>
                                            </View>
                                        </View> : null}
                                </View>

                                <View style={{ marginTop: 30 }}>
                                    <PrimaryButton disabled={tab != 2} title="Done" />
                                </View>


                                <View style={styles.clickCard}></View>
                                <View style={styles.clickCard}></View>
                            </View>

                            <View style={{ height: 400 }}></View>
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
    clickCard: {
        // padding: 10,
        backgroundColor: 'white',
        marginTop: 15,
        elevation: 4,
        borderRadius: 5,
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
    step: {
        paddingLeft: 12,
        paddingTop: 6,
        borderRadius: 50,
        width: 32,
        marginRight: 15,
        height: 32,
        borderWidth: 1,
        borderColor: '#EE6000',
    }

});


const mapStateToProps = (state) => ({
    user: state.user,
    cart: state.cart,
    address: state.address
});


const mapDispatchToProps = dispatch => ({
    logoutFn: () => { dispatch({ type: SET_LOGOUT }) },
    resetAll: () => { dispatch({ type: RESET_DATA }) },
    loadCart: () => { dispatch(GetCartForUser()) },
    updatecartFn: (body) => { dispatch(UpdateCart(body)) },
    deleteCartFn: (body) => { dispatch(deleteCart(body)) },
    addtoCart: (body, cartprod, done) => { dispatch(AddToCart(body, cartprod, done)) },
    getAddressFn: () => { dispatch(getAddress()) },
    addOrderFn: (body, done) => { dispatch(addOrder(body, done)) },
});
export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
