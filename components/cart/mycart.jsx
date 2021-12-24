import * as React from 'react';
import { Platform, View, Image, StyleSheet, Dimensions, TouchableWithoutFeedback, Keyboard, ScrollView, Alert, Text, TouchableHighlight, FlatList, Button, TouchableOpacity } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { connect } from 'react-redux';
import { LogBox } from 'react-native';
import { RESET_DATA, SET_LOGOUT } from '../../dataStore/types/types';
import TitleText from '../common/elements/TitleText';
import { Ionicons } from '@expo/vector-icons';
import RegularText from '../common/elements/regulartext';
import PrimaryButton from '../common/elements/primaryButton';
import { AddToCart, deleteCart, GetCartForUser, getCharges, UpdateCart } from '../../dataStore/actions/cart';
import { constants } from '../../utlits/constants';
import { chargecutoff, getTotalAmt, roundnum } from '../../utlits/helpers';
import LightText from '../common/elements/lightText';

const MyCart = (props) => {
    const [openQty, setOIpenQty] = React.useState(false);
    const [Selprod, setSelProd] = React.useState(null);
    const [qtys, setQtys] = React.useState(false);
    const { cartprocess, cartStatus, cartData = [], } = props.cart;
    const { shipppingCharges = 23, vat = 14 } = props.cart.charges
    const AddtoCart = (prod) => {
        props.getChargsFn();
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
                constants[lang].errors.loginReq,
                constants[lang].errors.pltapiyc,
                [
                    { text: constants[lang].errors.cancel, onPress: () => { } },
                    { text: constants[lang].errors.lgn, onPress: () => { props.navigation.navigate('login'); } }
                ],
            );
        }
    };
    const cartQtyRecived = (item) => {
        props.getChargsFn();
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
        props.getChargsFn();
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
        if (lang === 'ar') {
            return d[0].qtynameArabic
        } else {
            return d[0].qtyname;
        }

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

    const { lang } = props;

    React.useEffect(() => {
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
        props.getChargsFn();
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
                    }}><CartQty lang={lang} qtys={qtys} close={() => { setOIpenQty(false); }} onPress={(val) => { cartQtyRecived(val); setOIpenQty(false); }} /></View> : null}
                    <Spinner
                        color={"#9F9FA2"}
                        visible={cartprocess}
                        textContent={constants[lang].static.pleasewait}
                        textStyle={{ color: '#FFF' }}
                    />
                    <View style={{ flex: 1, opacity: openQty ? 0.1 : 1 }}>
                        <View style={styles.tophead}>
                            <View style={{ flex: 1 }}>
                                <Ionicons onPress={() => { props.navigation.goBack(null); }} name="arrow-back" size={24} color="black" />
                            </View>
                            <View style={{ flex: 7, alignItems: 'center' }}><TitleText title={constants[lang].static.cart} /></View>
                            <View style={{ flex: 1 }}></View>
                        </View>
                        {cartData.length == 0 ? <View style={{ flex: 1, marginTop: Dimensions.get('screen').height / 4, justifyContent: 'center', alignItems: 'center' }}>
                            <View style={{}}>
                                <React.Fragment>
                                    {(!cartprocess) && <RegularText>{constants[lang].static.ycie}</RegularText>}
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
                                            <RegularText nolines={1}>{lang === 'ar' ? pro.prodId.arabicName : pro.prodId.name}</RegularText>
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
                                            <RegularText title={""}>{constants[lang].static.subtotal} </RegularText>
                                            <RegularText >{lang == 'en' ? constants[lang].static.curr : ''} {getSubtotal()} {lang == 'ar' ? constants[lang].static.curr : ''}</RegularText>
                                        </View>
                                        <View style={{ paddingHorizontal: 15, paddingBottom: 10, paddingTop: 5, flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <RegularText title={""}>{constants[lang].static.delChag}</RegularText>
                                            <RegularText >{lang == 'en' ? constants[lang].static.curr : ''} {chargecutoff(shipppingCharges, getSubtotal())} {lang == 'ar' ? constants[lang].static.curr : ''}</RegularText>
                                        </View>
                                        <View style={{ paddingHorizontal: 15, paddingBottom: 10, paddingTop: 5, flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <RegularText title={""}>{constants[lang].static.vat}</RegularText>
                                            <RegularText >{lang == 'en' ? constants[lang].static.curr : ''}  {chargecutoff(vat, getSubtotal())} {lang == 'ar' ? constants[lang].static.curr : ''}</RegularText>

                                        </View>
                                        <View style={{ paddingBottom: 20, paddingHorizontal: 15, borderTopColor: '#d9d8d8', paddingTop: 20, borderTopWidth: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <RegularText title={""}>{constants[lang].static.total}</RegularText>
                                            <TitleText styles={{ fontSize: 17 }} title={`${lang == 'en' ? constants[lang].static.curr : ''}  ${getTotalAmt(getSubtotal(), shipppingCharges, vat)} ${lang == 'ar' ? constants[lang].static.curr : ''} `} />
                                        </View>
                                    </View>
                                    <View style={{ margin: 20 }}>
                                        <LightText>
                                            Available payment methods
                                        </LightText>
                                        <View style={{ flexDirection: 'row' }}>
                                            <View style={{ flex: 1, }}>
                                                <Image style={{ width: Dimensions.get('screen').width / 6, height: 80, resizeMode: 'contain' }} source={require('../../assets/images/visa.png')} />
                                            </View>
                                            <View style={{ flex: 1 }}>
                                                <Image style={{ width: Dimensions.get('screen').width / 6, height: 80, resizeMode: 'contain' }} source={require('../../assets/images/master.png')} />
                                            </View>
                                            <View style={{ flex: 1 }}>
                                                <Image style={{ width: Dimensions.get('screen').width / 6, height: 80, resizeMode: 'contain' }} source={require('../../assets/images/mada.png')} />
                                            </View>
                                            <View style={{ flex: 1 }}>
                                                <Image style={{ width: Dimensions.get('screen').width / 6, height: 80, resizeMode: 'contain' }} source={require('../../assets/images/cod.png')} />
                                            </View>
                                        </View>
                                    </View>
                                    <View>
                                        <PrimaryButton onPress={() => { props.navigation.navigate('Checkout'); }} title={constants[lang].static.checkout}></PrimaryButton>
                                    </View>
                                </React.Fragment> : null}
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
    cart: state.cart,
    lang: state.common.lang ? state.common.lang : 'en',
});


const mapDispatchToProps = dispatch => ({
    logoutFn: () => { dispatch({ type: SET_LOGOUT }) },
    resetAll: () => { dispatch({ type: RESET_DATA }) },
    loadCart: () => { dispatch(GetCartForUser()) },
    updatecartFn: (body) => { dispatch(UpdateCart(body)) },
    deleteCartFn: (body) => { dispatch(deleteCart(body)) },
    addtoCart: (body, cartprod, done) => { dispatch(AddToCart(body, cartprod, done)) },
    getChargsFn: () => { dispatch(getCharges()) },

});
export default connect(mapStateToProps, mapDispatchToProps)(MyCart);

