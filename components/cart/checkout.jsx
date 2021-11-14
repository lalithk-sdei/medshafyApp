import * as React from 'react';
import { Platform, View, Image, StyleSheet, Dimensions, TouchableWithoutFeedback, Keyboard, ScrollView, Alert, Text, TouchableOpacity } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { connect } from 'react-redux';
import { LogBox } from 'react-native';
import { RESET_DATA, SET_LOGOUT } from '../../dataStore/types/types';
import TitleText from '../common/elements/TitleText';
import SecondaryBtn from '../common/elements/secondaryButton';
import { Ionicons } from '@expo/vector-icons';
import LightText from '../common/elements/lightText';
import RegularText from '../common/elements/regulartext';
import PrimaryButton from '../common/elements/primaryButton';
import { AddToCart, clearCart, deleteCart, GetCartForUser, UpdateCart } from '../../dataStore/actions/cart';
import { getAddress } from '../../dataStore/actions/address';
import RadioButton from '../common/elements/radiobutton';
import ApplePayBtn from '../common/elements/applyePay';
import { addOrder } from '../../dataStore/actions/orders';
import LinkText from '../common/elements/linktext';
import { constants } from '../../utlits/constants';

const Checkout = (props) => {
    const [openQty, setOIpenQty] = React.useState(false);
    const [tab, setTab] = React.useState(0);
    const [seladdr, setseladdr] = React.useState(null);
    const [qtys, setQtys] = React.useState(false);
    const { cartprocess, cartStatus, cartData = [] } = props.cart;

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


    const getPriceName = (prod, lng = 'en') => {
        if (prod.prodId == null || prod.prodQty === 'def') {
            return "def";
        }
        if (prod.prodId.offeredPrices.length == 0) {
            cartUpdate({ ...prod, qty: 1 }, 'dec');
        }
        const d = prod.prodId.offeredPrices.filter((e) => e._id == prod.prodQty);
        if (d.length == 0) {
            cartUpdate({ ...prod, qty: 1 }, 'dec');
        }
        if (lng == 'en') {
            return d[0].qtyname;
        } else {
            return d[0].qtynameArabic;
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

    const { address = [], addressprocess } = props.address;
    const { lang } = props;

    const submit = () => {
        try {
            const b = {
                prods: cartData.map((pro) => ({
                    prodId: pro.prodId._id,
                    qty: pro.qty,
                    prodName: pro.prodId.name,
                    prodnameArabic: pro.prodId.arabicName,
                    prodImg: pro.prodId.mainImage ? pro.prodId.mainImage.mediumUrl : null,
                    qtyname: getPriceName(pro, 'en'),
                    qtynameArabic: getPriceName(pro, 'ar'),
                    prodPrice: getPriceval(pro),
                })),
                paidBy: 0,
                address: seladdr,
                DeliveryCharges: 0,
                Vat: 0,
                subTotal: cartData.map((pro) => getPriceval(pro)).reduce((a, b) => a + b),
            };
            props.addOrderFn(b, (st) => {
                if (st) {
                    // Clear Cart
                    props.clearCartFn((d, r) => {
                        props.navigation.navigate('myOrders');
                    });
                } else {
                    setTimeout(() => {
                        Alert.alert(
                            constants[lang].errors.oops,
                            constants[lang].errors.swwptast,
                            [
                                { text: constants[lang].errors.ok, onPress: () => { } },
                            ],
                        );
                    }, 100);
                }

            });
        } catch (e) {
            setTimeout(() => {
                Alert.alert(
                    constants[lang].errors.oops,
                    constants[lang].errors.swwptast,
                    [
                        { text: constants[lang].errors.ok, onPress: () => { } },
                    ],
                );
            }, 100);
        }


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
                        textContent={constants[lang].static.pleasewait}
                        textStyle={{ color: '#FFF' }}
                    />
                    <View style={{ flex: 1, opacity: openQty ? 0.1 : 1 }}>
                        <View style={styles.tophead}>
                            <View style={{ flex: 1 }}>
                                <Ionicons onPress={() => { props.navigation.goBack(null); }} name="arrow-back" size={24} color="black" />
                            </View>
                            <View style={{ flex: 7, alignItems: 'center' }}><TitleText title={constants[lang].static.checkout} /></View>
                            <View style={{ flex: 1 }}></View>
                        </View>
                        {cartData.length == 0 ? <View style={{ flex: 1, marginTop: Dimensions.get('screen').height / 4, justifyContent: 'center', alignItems: 'center' }}>
                            <View style={{}}>
                                <React.Fragment>
                                    {(!cartprocess) && <RegularText>{constants[lang].static.ycie}</RegularText>}
                                </React.Fragment>
                            </View>
                        </View> : null}
                        <ScrollView contentContainerStyle={{ flexGrow: 1, marginHorizontal: 23, marginVertical: 30 }}>
                            <View style={{ flexDirection: 'column' }}>
                                <View style={styles.clickCard}>
                                    <TouchableOpacity onPress={() => { if (seladdr) { setTab(0) } }}>
                                        <View style={{ flexDirection: 'row', padding: 15 }}>
                                            <View style={[styles.step, { backgroundColor: tab === 0 ? '#EE6000' : 'white' }]}><Text style={{ fontFamily: 'Quasimodabold', color: tab === 0 ? 'white' : '#EE6000' }}>1</Text></View>
                                            <View style={{ marginTop: 4 }}><TitleText title={constants[lang].static.cusaddr} /></View>
                                        </View>
                                    </TouchableOpacity>
                                    {tab === 0 ?
                                        <View style={{ paddingTop: 10, borderTopColor: '#0000000B', borderTopWidth: 1 }}>
                                            <View>
                                                {/* Address */}
                                                <View >
                                                    {address && address.length > 0 ? address.map((addr, ind) => <View key={ind} style={{
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
                                                    </View>) : <View style={{ flexDirection: 'column', margin: 20, justifyContent: 'center', alignItems: 'center' }}>
                                                        <View style={{}}>
                                                            <RegularText styles={{}}>{constants[lang].static.ydbie}</RegularText>
                                                        </View>
                                                        <View style={{ paddingTop: 20 }}>
                                                            <LinkText onPress={() => { props.navigation.navigate('MyAddress'); }}>{constants[lang].static.chtmyd}</LinkText>
                                                        </View>
                                                    </View>}
                                                </View>
                                                <View style={{ margin: 20 }}><PrimaryButton onPress={() => { setTab(1) }} disabled={seladdr == null} title={constants[lang].static.next}></PrimaryButton></View>
                                            </View>
                                        </View> : null}
                                </View>

                                <View style={styles.clickCard}>
                                    <View style={{ flexDirection: 'row', padding: 15 }}>
                                        <View style={[styles.step, { backgroundColor: tab === 1 ? '#EE6000' : 'white' }]}><Text style={{ fontFamily: 'Quasimodabold', color: tab === 1 ? 'white' : '#EE6000' }}>2</Text></View>
                                        <View style={{ marginTop: 4 }}><TitleText title={constants[lang].static.paymet} /></View>
                                    </View>
                                    {tab === 1 ?
                                        <View style={{ paddingTop: 10, borderTopColor: '#0000000B', borderTopWidth: 1 }}>
                                            <View>
                                                {/* Payment */}
                                                <View style={{ backgroundColor: '#E2E6E9' }}>
                                                    <View style={{ flexDirection: 'row', padding: 23 }}>
                                                        <View style={{ flex: 1 }}><LightText styles={{ fontSize: 18 }}>{constants[lang].static.payamt}</LightText></View>
                                                        <View style={{ flex: 1 }}><TitleText title={`${constants[lang].static.curr} 32`}></TitleText></View>
                                                    </View>
                                                </View>
                                                <View style={{ margin: 20 }}><ApplePayBtn onPress={() => { setTab(2) }} disabled={seladdr == null} title={constants[lang].static.next}></ApplePayBtn></View>
                                                <View style={{ marginHorizontal: 20, marginBottom: 10 }}><SecondaryBtn style={{ borderRadius: 10, padding: 10 }} onPress={() => { setTab(2) }} disabled={seladdr == null} title={constants[lang].static.cod}></SecondaryBtn></View>
                                            </View>
                                        </View> : null}
                                </View>


                                <View style={styles.clickCard}>
                                    <View style={{ flexDirection: 'row', padding: 15 }}>
                                        <View style={[styles.step, { backgroundColor: tab === 2 ? '#EE6000' : 'white' }]}><Text style={{ fontFamily: 'Quasimodabold', color: tab === 2 ? 'white' : '#EE6000' }}>3</Text></View>
                                        <View style={{ marginTop: 4 }}><TitleText title={constants[lang].static.summary} /></View>
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
                                                                <Text style={{ fontFamily: 'Quasimoda', fontSize: 14, color: '#3F3F46' }} nolines={1}>{constants[lang].static.qty} : {pro.qty}</Text>
                                                            </View>
                                                        </View>
                                                    </View>) : null}
                                                    {cartData.length > 0 ? <React.Fragment>
                                                        <View style={[styles.card, { padding: 0 }]}>
                                                            <View style={{ paddingHorizontal: 15, paddingTop: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                                                                <RegularText title={""}>{constants[lang].static.subtotal}</RegularText>
                                                                <RegularText >{constants[lang].static.curr} {getSubtotal()}</RegularText>
                                                            </View>
                                                            <View style={{ paddingHorizontal: 15, paddingBottom: 10, paddingTop: 5, flexDirection: 'row', justifyContent: 'space-between' }}>
                                                                <RegularText title={""}>{constants[lang].static.delChag}</RegularText>
                                                                <RegularText >{constants[lang].static.curr} 0</RegularText>
                                                            </View>
                                                            <View style={{ paddingHorizontal: 15, paddingBottom: 10, paddingTop: 5, flexDirection: 'row', justifyContent: 'space-between' }}>
                                                                <RegularText title={""}>{constants[lang].static.vat} (2%)</RegularText>
                                                                <RegularText >{constants[lang].static.curr} 0</RegularText>
                                                            </View>
                                                            <View style={{ paddingBottom: 20, paddingHorizontal: 15, borderTopColor: '#d9d8d8', paddingTop: 20, borderTopWidth: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                                                                <RegularText title={""}>{constants[lang].static.total}</RegularText>
                                                                <TitleText styles={{ fontSize: 17 }} title={`${constants[lang].static.curr} ${getSubtotal()}`} />
                                                            </View>
                                                        </View>
                                                    </React.Fragment> : null}
                                                </View>
                                            </View>
                                        </View> : null}
                                </View>

                                <View style={{ marginTop: 30 }}>
                                    <PrimaryButton onPress={() => { submit(); }} disabled={tab != 2} title={constants[lang].static.done} />
                                </View>


                                <View style={styles.clickCard}></View>
                                <View style={styles.clickCard}></View>
                            </View>

                            <View style={{ height: 100 }}></View>
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
    address: state.address,
    lang: state.common.lang,
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
    clearCartFn: (done) => { dispatch(clearCart(done)) }
});
export default connect(mapStateToProps, mapDispatchToProps)(Checkout);

