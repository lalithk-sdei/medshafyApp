import * as React from 'react';
import { Platform, Modal, View, Text, StyleSheet, Image, FlatList, Dimensions, TouchableWithoutFeedback, Keyboard, ScrollView, Alert, BackHandler, TouchableHighlight, SafeAreaView, StatusBar, TouchableOpacity } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { connect } from 'react-redux';
import { login } from '../../dataStore/actions/user';
import SearchInput from '../common/elements/searchInput';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
const { width, height } = Dimensions.get("window");
import DropDownPicker from 'react-native-dropdown-picker';
import RegularText from '../common/elements/regulartext';
import ProductCard from '../common/elements/productCard';
import { GetProducts } from '../../dataStore/actions/prod';
import { LogBox } from 'react-native';
import { GetCategories } from '../../dataStore/actions/category';
import { addtoFav, GetFavForUser, renoveFav } from '../../dataStore/actions/fav';
import TitleText from '../common/elements/TitleText';
import { AddToCart, deleteCart, GetCartForUser, UpdateCart } from '../../dataStore/actions/cart';
import CartQty from '../common/elements/cartQty';
import { constants } from '../../utlits/constants';


const ProductDetails = (props) => {

    const getPriceName = (prod) => {
        if (prod.prodQty === 'def') {
            return { _id: 'def' };
        }
        if (prod.prodId.offeredPrices.length == 0) {
            cartUpdate({ ...prod, qty: 1 }, 'dec');
        }
        const d = prod.prodId.offeredPrices.filter((e) => e._id == prod.prodQty);
        if (d.length == 0) {
            cartUpdate({ ...prod, qty: 1 }, 'dec');
        }
        return d[0];
    }

    const { offeredPrices = [], mainImage = null, salePrice = 0, price = 10, name = "Product", arabicName = "", from, val, brand, model, country, description, descriptionArabic, _id } = props.route.params;

    const [openQty, setOIpenQty] = React.useState(false);
    const [qtys, setQtys] = React.useState(false);

    const [Selprod, setSelProd] = React.useState(null);
    const { lang } = props;


    const img = "https://gcdn.pbrd.co/images/grEHL3gquLuy.png";
    const { Prodprocess, ProdStatus, ProdData } = props.product;
    const { cartprocess, cartStatus, cartData } = props.cart;


    const inCart = (cartData || []).map((e) => e.prodId._id).includes(_id);
    const cd = (cartData || []).filter((e) => e.prodId._id == _id);
    const [selQty, setselQty] = React.useState(null);
    const [isDef, setisDef] = React.useState(true);
    const [priceObj, setPriceObj] = React.useState(null);

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


    const AddtoCart = (prod) => {
        const b = {
            "prods": {
                "prodId": prod._id,
                "prodQty": selQty == null ? 'def' : selQty._id,
                "qty": 1
            },
            "userId": props.user.loggedinUserData._id
        };
        props.addtoCart(b, { ...b.prods, prodId: props.route.params }, () => { });
    }
    // Add to cart
    const cartPressed = (prod) => {
        if (props.user.loggedin) {
            if (offeredPrices != null && offeredPrices.length > 0) {
                setSelProd(props.route.params);
                setQtys(offeredPrices);
                setTimeout(() => {
                    setOIpenQty(true);
                }, 10);
            } else {
                AddtoCart(props.route.params);
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
        setselQty(item)
        const b = {
            "prods": {
                "prodId": _id,
                "prodQty": item._id,
                "qty": inCart ? 0 : 1
            },
            "userId": props.user.loggedinUserData._id
        };
        if (inCart) {
            cartUpdate(cd.length > 0 ? { ...cd[0], qty: 0, prodQty: item._id } : null, 'inc');
        } else {
            // props.addtoCart(b, { ...b.prods, prodId: props.route.params }, () => { });
        }
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



    React.useEffect(() => {
        if (inCart && cd.length > 0) {
            setselQty(getPriceName(cd[0]));
            if (cd[0].prodQty == 'def') {
                setisDef(true);
            } else {
                const p = offeredPrices.filter((q) => q._id == cd[0].prodQty);
                if (p.length > 0) {
                    setPriceObj(p[0]);
                    setisDef(false);
                } else {
                    setisDef(true);
                }
            }
        } else {
            setisDef(true);
        }
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    }, [cartData]);


    const discount = Math.ceil(100 - (salePrice / price) * 100);
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
                    <ScrollView>
                        <Spinner
                            color={"#9F9FA2"}
                            visible={cartprocess}
                            textContent={constants[lang].static.pleasewait}
                            textStyle={{ color: '#FFF' }}
                        />
                        <View style={[styles.main, { opacity: openQty ? 0.1 : 1 }]}>
                            <View style={{ paddingTop: 50, backgroundColor: 'white', flexDirection: 'column' }}>
                                <View style={{ marginLeft: 43 }}>
                                    <Ionicons onPress={() => { props.navigation.goBack(null); }} name="arrow-back" size={24} color="black" />
                                </View>
                                <View>
                                    <Image
                                        style={{ marginHorizontal: 43, marginVertical: 20, width: 'auto', height: 250, resizeMode: 'stretch' }}
                                        source={{
                                            uri: mainImage ? mainImage.fileUrl : img,
                                        }}
                                    />
                                </View>
                                <View style={{ position: 'relative', left: 43 }}>
                                    {(discount != 0) &&
                                        <React.Fragment>
                                            <View style={{
                                                position: 'absolute',
                                                backgroundColor: '#2F33A4',
                                                borderTopLeftRadius: 10,
                                                left: 0,
                                                padding: 5,
                                                fontSize: 10,
                                                // width: 58,
                                                color: 'white',
                                            }}>
                                                <Text style={{
                                                    fontSize: 10,
                                                    color: 'white',
                                                }}>{discount} % OFF</Text>
                                                <View style={{
                                                    position: 'absolute',
                                                    borderLeftColor: '#00000000',
                                                    borderLeftWidth: 8,
                                                    borderRightColor: '#00000000',
                                                    borderRightWidth: 8,
                                                    borderTopColor: '#6D6ACC',
                                                    borderTopWidth: 12,
                                                    width: 0,
                                                    right: -9,
                                                    height: 0
                                                }}><Text>{" "}</Text></View>
                                                <View style={{
                                                    position: 'absolute',
                                                    borderLeftColor: '#00000000',
                                                    borderLeftWidth: 8,
                                                    borderRightColor: '#00000000',
                                                    borderRightWidth: 8,
                                                    borderTopColor: '#6D6ACC',
                                                    borderTopWidth: 13,
                                                    top: 9,
                                                    ...Platform.select({
                                                        ios: {
                                                            top: 9,
                                                        },
                                                        android: {
                                                            top: 8.5,
                                                        }
                                                    }),
                                                    right: -9,
                                                    width: 0,
                                                    transform: [
                                                        { rotateZ: '180deg' }
                                                    ],
                                                    height: 0
                                                }}><Text>{" "}</Text></View>
                                            </View>
                                        </React.Fragment>
                                    }
                                </View>
                                <View style={{ marginLeft: 43, marginTop: 30 }} >
                                    <Text numberOfLines={1} style={{ fontFamily: 'QuasimodaMedium', fontSize: 24, textAlign: 'left' }}>{lang === 'ar' ? `${arabicName}` : name}</Text>
                                </View>
                                {/* <View style={{ marginLeft: 43, marginTop: 5 }} >
                                    <Text style={{ fontFamily: 'Quasimoda', fontSize: 18 }}>
                                        {isDef ? "" : priceObj.qtyname}
                                    </Text>
                                </View> */}
                                <View style={{ marginLeft: 43, marginTop: 5, flexDirection: 'row' }} >
                                    <TitleText title={`SAR ${selQty == null ? salePrice : (selQty._id == "def" ? salePrice : selQty.OfferdPrice)}`} styles={{ fontSize: 24 }}></TitleText>
                                    <Text style={{ textDecorationLine: 'line-through', textDecorationStyle: 'solid', fontFamily: 'Quasimoda', fontSize: 24 }}> {`SAR ${selQty == null ? price : (selQty._id == "def" ? price : selQty.price)}`}</Text>
                                </View>
                                <View style={{ marginLeft: 43, marginTop: 5, marginBottom: 20 }} >
                                    <View style={{
                                        // flexDirection: 'row',
                                        width: 200,
                                        marginTop: 15,
                                    }}>
                                        {offeredPrices.length > 0 ?
                                            <TouchableOpacity onPress={() => { cartPressed() }}>
                                                <View style={{ flexDirection: 'row', borderRadius: 5, justifyContent: 'space-between', marginBottom: 15, backgroundColor: '#E2E7E6', padding: 8 }}>
                                                    <Text style={{ width: '85%' }} numberOfLines={1}>{selQty != null ? (selQty._id == 'def' ? constants[lang].static.single : (lang === 'ar' ? selQty.qtynameArabic : selQty.qtyname)) : constants[lang].static.chosQtyPlace}</Text>
                                                    <AntDesign name="down" size={20} color="black" />
                                                </View>
                                            </TouchableOpacity> : null}
                                        {inCart ? <React.Fragment>
                                            <View style={{ flexDirection: 'row' }}>
                                                <TouchableOpacity onPress={() => { cartUpdate(cd.length > 0 ? cd[0] : null, 'dec') }}>
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
                                                    }}>{cd.length > 0 ? cd[0].qty : ""}</Text>
                                                </View>
                                                <TouchableOpacity onPress={() => { cartUpdate(cd.length > 0 ? cd[0] : null, 'inc') }}>
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
                                        </React.Fragment> :
                                            <React.Fragment>
                                                <TouchableOpacity onPress={() => { AddtoCart(props.route.params); }}>
                                                    <View style={{ flexDirection: 'row' }}>
                                                        <View style={{
                                                            flex: 4,
                                                            backgroundColor: '#98DECA',
                                                            paddingVertical: 7,
                                                            borderTopLeftRadius: 50,
                                                            borderBottomLeftRadius: 50,
                                                            justifyContent: 'center',
                                                            alignItems: 'center'
                                                        }}>
                                                            <Text style={{
                                                                fontSize: 16,
                                                                fontFamily: 'Quasimodabold',
                                                                fontWeight: 'bold',
                                                                color: 'black'
                                                            }}>{constants[lang].static.addToCart}</Text>
                                                        </View>
                                                        <View style={{
                                                            flex: 1.5,
                                                            backgroundColor: '#6CBAA8',
                                                            borderTopRightRadius: 50,
                                                            borderBottomRightRadius: 50,
                                                            justifyContent: 'center',
                                                            alignItems: 'center'
                                                        }}>
                                                            <Text style={{
                                                                color: 'white',
                                                                fontSize: 20,
                                                            }}>+ </Text>
                                                        </View>
                                                    </View>
                                                </TouchableOpacity>
                                            </React.Fragment>
                                        }
                                    </View>
                                </View>
                            </View>
                            <View style={{ paddingLeft: 43, paddingTop: 20, paddingBottom: 20, marginTop: 30, backgroundColor: 'white', flexDirection: 'column' }}>
                                <View>
                                    <TitleText title={`Product Name : ${lang === 'ar' ? arabicName : name}`}></TitleText>
                                </View>
                                <View style={{ marginTop: 15 }}>
                                    <Text style={{ textAlign: 'left', fontFamily: 'Quasimoda', fontSize: 15 }}>{constants[lang].static.Brand} : {brand} </Text>
                                </View>
                                <View >
                                    <Text style={{ textAlign: 'left', fontFamily: 'Quasimoda', fontSize: 15 }}>{constants[lang].static.modelNumber}:  {model} </Text>
                                </View>
                                <View >
                                    <Text style={{ textAlign: 'left', fontFamily: 'Quasimoda', fontSize: 15 }}>{constants[lang].static.Country} :  {country} </Text>
                                </View>
                                <View style={{ marginTop: 20 }}>
                                    <Text style={{ textAlign: 'left', fontFamily: 'Quasimoda', fontSize: 15 }}> {lang === 'ar' ? descriptionArabic : description} </Text>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </React.Fragment>
        </TouchableWithoutFeedback>
    );
}


const styles = StyleSheet.create({
    main: {
        minHeight: Dimensions.get('screen').height
    },
});


const mapStateToProps = (state) => ({
    product: state.prod,
    cat: state.category,
    user: state.user,
    fav: state.fav,
    cart: state.cart,
    lang: state.common.lang ? state.common.lang : 'en',
});


const mapDispatchToProps = dispatch => ({
    loadCart: () => { dispatch(GetCartForUser()) },
    updatecartFn: (body) => { dispatch(UpdateCart(body)) },
    deleteCartFn: (body) => { dispatch(deleteCart(body)) },
    addtoCart: (body, cartprod, done) => { dispatch(AddToCart(body, cartprod, done)) },

    loadProducts: (body) => { dispatch(GetProducts(body)) },
    callCat: () => { dispatch(GetCategories()) },
    getFavs: () => { dispatch(GetFavForUser()) },
    addtoFavFn: (body, done) => { dispatch(addtoFav(body, done)) },
    rmoveFavFn: (prodId, userId, done) => { dispatch(renoveFav(prodId, userId, done)) }
});
export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);
