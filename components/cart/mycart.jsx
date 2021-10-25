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

const MyCart = (props) => {
    const [openQty, setOIpenQty] = React.useState(false);
    const [Selprod, setSelProd] = React.useState(null);
    const [qtys, setQtys] = React.useState(false);
    const { cartprocess, cartStatus, cartData = [] } = props.cart;
    const AddtoCart = (prod) => {
        const b = {
            "prods": {
                "prodId": prod._id,
                "prodQty": "def",
                "qty": 1
            },
            "userId": props.user.loggedinUserData._id
        };
        props.addtoCart(b, { ...b.prods, prodId: prod }, () => { });
    }
    // Add to cart
    const catrPressed = (prod) => {
        if (props.user.loggedin) {
            if (prod.offeredPrices != null && prod.offeredPrices.length > 0) {
                setSelProd(prod);
                setQtys(prod.offeredPrices);
                setTimeout(() => {
                    setOIpenQty(true);
                }, 10);
            } else {
                AddtoCart(prod)
            }
        } else {
            Alert.alert(
                'Login Required!',
                'Please login to add products in your cart.',
                [
                    { text: 'cancel', onPress: () => { } },
                    { text: 'login', onPress: () => { props.navigation.navigate('login'); } }
                ],
            );
        }
    };
    const cartQtyRecived = (item) => {
        const b = {
            "prods": {
                "prodId": Selprod._id,
                "prodQty": item._id,
                "qty": 1
            },
            "userId": props.user.loggedinUserData._id
        };
        props.addtoCart(b, { ...b.prods, prodId: Selprod }, () => { });
    }
    // Update Cart
    const cartUpdate = (cd, ope) => {
        const b = {
            "prods": {
                "prodId": cd.prodId._id,
                "prodQty": cd.prodQty,
                "qty": ope == 'inc' ? (+cd.qty + 1) : (+cd.qty - 1)
            },
            "userId": props.user.loggedinUserData._id,
            "docId": cd._id
        };
        if (+cd.qty == 1 && ope != 'inc') {
            props.deleteCartFn({
                "userId": props.user.loggedinUserData._id,
                "docId": cd._id
            });
        } else {
            props.updatecartFn(b);
        }
    };

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

    React.useEffect(() => {
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
        // if (props.user.loggedin === false) {
        //     props.navigation.navigate('Choselanguage');
        // }
        if (cartData.length == 0 && props.user.loggedin) {
            props.loadCart();
        }
    }, [props.user.loggedin]);
    return (
        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss(); }}>
            <React.Fragment>
                <View style={{ flex: 1 }}>
                    {openQty ? <View style={{
                        position: 'absolute',
                        backgroundColor: 'white',
                        width: '90%',
                        zIndex: 1,
                        top: '30%',
                        left: '5%',
                        borderRadius: 10
                    }}><CartQty qtys={qtys} close={() => { setOIpenQty(false); }} onPress={(val) => { cartQtyRecived(val); setOIpenQty(false); }} /></View> : null}
                    <Spinner
                        color={"#9F9FA2"}
                        visible={cartprocess}
                        textContent={'Please wait...'}
                        textStyle={{ color: '#FFF' }}
                    />
                    <View style={{ flex: 1, opacity: openQty ? 0.1 : 1 }}>
                        <View style={styles.tophead}>
                            <View style={{ flex: 1 }}>
                                {/* <Ionicons onPress={() => { props.navigation.navigate('myOrders'); }} name="arrow-back" size={24} color="black" /> */}
                            </View>
                            <View style={{ flex: 7, alignItems: 'center' }}><TitleText title="Cart" /></View>
                            <View style={{ flex: 1 }}></View>
                        </View>
                        {cartData.length == 0 ? <View style={{ flex: 1, marginTop: Dimensions.get('screen').height / 4, justifyContent: 'center', alignItems: 'center' }}>
                            <View style={{}}>
                                <React.Fragment>
                                    {(!cartprocess) && <RegularText>Your cart is empty.</RegularText>}
                                </React.Fragment>
                            </View>
                        </View> : null}
                        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
                            <View style={styles.body}>
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
                                            <View style={{ flexDirection: 'row', marginTop: 10, width: '80%' }}>
                                                <TouchableOpacity onPress={() => { cartUpdate(pro, 'dec') }}>
                                                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                                        <View style={{
                                                            backgroundColor: '#6CBAA8',
                                                            borderRadius: 50,
                                                            width: 30,
                                                            height: 30,
                                                            justifyContent: 'center',
                                                            alignItems: 'center'
                                                        }}>
                                                            <Text style={{ color: 'white', fontSize: 20 }}>&#8722;</Text>
                                                        </View>
                                                    </View>
                                                </TouchableOpacity>
                                                <View style={{
                                                    flex: 2,
                                                    paddingVertical: 7,
                                                    justifyContent: 'center',
                                                    alignItems: 'center'
                                                }}>
                                                    <Text style={{
                                                        fontSize: 16,
                                                        fontFamily: 'Quasimodabold',
                                                        fontWeight: 'bold',
                                                        color: 'black'
                                                    }}>{pro.qty}</Text>
                                                </View>
                                                <TouchableOpacity onPress={() => { cartUpdate(pro, 'inc') }}>
                                                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                                        <View style={{
                                                            backgroundColor: '#6CBAA8',
                                                            borderRadius: 50,
                                                            width: 30,
                                                            height: 30,
                                                            justifyContent: 'center',
                                                            alignItems: 'center'
                                                        }}>
                                                            <Text style={{ color: 'white', fontSize: 20 }}>&#43;</Text>
                                                        </View>
                                                    </View>
                                                </TouchableOpacity>
                                            </View>
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
                                    <View>
                                        <PrimaryButton onPress={() => { props.navigation.navigate('Checkout'); }} title={"Checkout"}></PrimaryButton>
                                    </View>
                                </React.Fragment> : null}

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
    cart: state.cart

});


const mapDispatchToProps = dispatch => ({
    logoutFn: () => { dispatch({ type: SET_LOGOUT }) },
    resetAll: () => { dispatch({ type: RESET_DATA }) },
    loadCart: () => { dispatch(GetCartForUser()) },
    updatecartFn: (body) => { dispatch(UpdateCart(body)) },
    deleteCartFn: (body) => { dispatch(deleteCart(body)) },
    addtoCart: (body, cartprod, done) => { dispatch(AddToCart(body, cartprod, done)) },
});
export default connect(mapStateToProps, mapDispatchToProps)(MyCart);

