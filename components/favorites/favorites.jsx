import * as React from 'react';
import { Platform, View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, TouchableWithoutFeedback, Keyboard, ScrollView, Alert, BackHandler, TouchableHighlight, SafeAreaView, StatusBar, FlatList } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { connect } from 'react-redux';
import { login } from '../../dataStore/actions/user';
import SearchInput from '../common/elements/searchInput';
import { Ionicons } from '@expo/vector-icons';
const { width, height } = Dimensions.get("window");
import RegularText from '../common/elements/regulartext';
import ProductCard from '../common/elements/productCard';
import { Entypo } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import ProductBoxOne from '../common/elements/productBoxOne';
import { addtoFav, GetFavForUser, renoveFav } from '../../dataStore/actions/fav';
import { AddToCart, deleteCart, GetCartForUser, UpdateCart } from '../../dataStore/actions/cart';
import CartQty from '../common/elements/cartQty';
import { getBuyagain } from '../../dataStore/actions/orders';
import { constants } from '../../utlits/constants';

const Favorites = (props) => {

    const [page, setpage] = React.useState(props.route.params.page);
    const [from, setFrom] = React.useState(props.route.params.from);
    const [mode, setMode] = React.useState("1");
    const [search, setSearch] = React.useState("");
    const img = "https://gcdn.pbrd.co/images/grEHL3gquLuy.png";
    const [masterProds, SetMasterprods] = React.useState([]);
    const [filteredProds, SetFilteredProds] = React.useState([]); const [time, setTime] = React.useState(null);


    const registerKey = (val) => {
        clearTimeout(time);
        setTime(setTimeout(() => {
            if (val == "") {
                SetFilteredProds(masterProds);
            } else {
                SetFilteredProds(masterProds.filter((r) => new RegExp(`${val}`.toLowerCase()).test(`${r.name}`.toLowerCase())));
            }
        }, 500));
    }


    const favEvent = (item, type) => {
        if (props.user.loggedin) {
            const i = {
                "prodId": item._id,
                "userId": props.user.loggedinUserData._id
            };
            if (type === 'add') {
                // props.addtoFavFn(i, () => {
                //     setFavs([...favs, { ...i, "prodId": { _id: item._id } }]);
                // });
            } else if (type === 'remove') {
                props.rmoveFavFn(item._id, props.user.loggedinUserData._id, () => {
                    props.getFavs();
                    SetMasterprods(masterProds.filter((e) => e._id != item._id));
                    SetFilteredProds(filteredProds.filter((e) => e._id != item._id));
                })
            }
        } else {
            Alert.alert(
                constants[lang].errors.loginReq,
                constants[lang].errors.pltaptf,
                [
                    { text: constants[lang].errors.cancel, onPress: () => { } },
                    { text: constants[lang].errors.lgn, onPress: () => { props.navigation.navigate('login'); } }
                ],
            );
        }
    }

    const { favprocess, favStatus, favData, } = props.fav;
    const { ordersprocess, ordersStatus, orders = [], buyAgain = [] } = props.order;



    const loadFavorits = () => {
        SetMasterprods([]);
        SetFilteredProds([]);
        if (props.user.loggedin) {
            props.getFavs();
        }
    }

    const loadBuagainProducts = () => {
        SetMasterprods([]);
        SetFilteredProds([]);
        // props.getFavs();
    }


    const [openQty, setOIpenQty] = React.useState(false);
    const [Selprod, setSelProd] = React.useState(null);
    const [qtys, setQtys] = React.useState(false);
    const { cartprocess, cartStatus, cartData } = props.cart;
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

    const { lang } = props;
    React.useEffect(() => {
        setFrom(props.route.params.from);
        if (props.route.params.from === 'Home' || props.route.params.from === 'profile') {
            if (page == '0') {
                if (props.user.loggedin && favStatus != 'ok') {
                    props.getFavs();
                }
                SetMasterprods(favData.map((e) => e.prodId));
                SetFilteredProds(favData.map((e) => e.prodId).filter((r) => new RegExp(search).test(r.name)));
            } else if (page == '1') {
                if (props.user.loggedin && ordersStatus != 'ok') {
                    props.fetBuyAgainOrdersFn();
                }
                SetMasterprods(buyAgain.map((e) => e));
                SetFilteredProds(buyAgain.map((e) => e).filter((r) => new RegExp(search).test(r.name)));
            }
        }
    }, [props.fav.favData, page]);
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
                        visible={favprocess || cartprocess}
                        textContent={constants[lang].static.pleasewait}
                        textStyle={{ color: '#FFF' }}
                    />
                    <View style={[styles.main, { opacity: openQty ? 0.1 : 1 }]}>
                        <View style={styles.firstCol}>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ flex: 1, marginTop: 25, paddingLeft: 10 }}>
                                    <Ionicons onPress={() => {
                                        if (from === 'profile') {
                                            props.navigation.navigate('Profile');
                                        } else {
                                            props.navigation.navigate('Home');
                                        }
                                    }} name="arrow-back" size={30} color="black" />
                                </View>
                                <View style={{ flex: 5 }}>
                                    <SearchInput closeFn={() => { setSearch(""); registerKey("") }} value={search} placeholder={search} onChangeText={(e) => { setSearch(e); registerKey(e) }} />
                                </View>
                                {/* <View style={{ flex: 1 }}>
                                    <View style={{ marginTop: 25, paddingLeft: 10, position: 'relative' }}>
                                        <Entypo onPress={() => { setMode("1") }} name="list" size={33} color={mode == "1" ? "#EE6000" : "black"} />
                                    </View>
                                </View> */}
                                <View style={{ flex: 1 }}>
                                    <View style={{ marginTop: 30, paddingLeft: 10, position: 'relative' }}>
                                        <Ionicons onPress={() => { props.navigation.navigate('Cart'); }} name="ios-cart-outline" size={30} color="black" />
                                        {cartData.length != 0 &&
                                            <View style={{
                                                paddingHorizontal: 8,
                                                right: -5,
                                                top: -10,
                                                paddingVertical: 5,
                                                backgroundColor: '#EE6000',
                                                borderRadius: 50,
                                                position: 'absolute'
                                            }}>
                                                <Text style={{
                                                    color: 'white',
                                                    fontSize: 10
                                                }}>{cartData.length}
                                                </Text>
                                            </View>
                                        }
                                        {/* <SimpleLineIcons onPress={() => { setMode("0") }} name="grid" size={24} color={mode == "0" ? "#EE6000" : "black"} /> */}
                                    </View>
                                </View>

                            </View>
                            <View style={{ marginTop: 20 }}>
                                <ScrollView>
                                    <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-around', alignItems: 'center' }}>
                                        <TouchableOpacity onPress={() => { setpage('0'); loadFavorits(); }}>
                                            <View style={{
                                                borderBottomColor: page == '0' ? '#EE6000' : 'white',
                                                borderBottomWidth: 2,
                                                paddingBottom: 10,
                                                marginRight: 20,
                                                position: 'relative',
                                            }}>
                                                <Text style={{
                                                    fontSize: 20,
                                                    fontFamily: 'Quasimodasemibold',
                                                    textTransform: 'capitalize'
                                                }}>{constants[lang].static.favourites}</Text>
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => { setpage('1'); loadBuagainProducts() }}>
                                            <View style={{
                                                borderBottomColor: page == '1' ? '#EE6000' : 'white',
                                                borderBottomWidth: 2,
                                                paddingBottom: 10,
                                                marginRight: 20,
                                                position: 'relative',
                                            }}>
                                                <Text style={{
                                                    fontSize: 20,
                                                    fontFamily: 'Quasimodasemibold',
                                                    textTransform: 'capitalize'
                                                }}>{constants[lang].static.buyagain}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </ScrollView>
                            </View>
                        </View>

                        <View style={styles.secondCol}>
                            <View>
                                <SafeAreaView>
                                    <ScrollView>
                                        <View style={{ marginTop: 0 }}>
                                            {filteredProds.length > 0 ?
                                                <View style={{ marginBottom: 200, flexDirection: 'row' }}>
                                                    {mode == "0" &&
                                                        <React.Fragment>
                                                            {filteredProds.length > 0 &&
                                                                <FlatList
                                                                    data={filteredProds.map((e, i) => ({ ...e, ind: i + 1 }))}
                                                                    renderItem={({ item, index }) => <View style={{
                                                                        flex: 1,
                                                                        marginBottom: item.ind == filteredProds.length ? 200 : 20,
                                                                        marginLeft: (index % 2) == 0 ? 0 : 10
                                                                    }}>
                                                                        <ProductBoxOne
                                                                            lang={lang}
                                                                            cartData={{
                                                                                inCart: (cartData || []).map((e) => e.prodId._id).includes(item._id),
                                                                                cartValues: (cartData || []).filter((e) => e.prodId._id == item._id),
                                                                            }}
                                                                            cartPressed={() => { catrPressed(item) }}
                                                                            cartUpdate={(cd, ope) => { cartUpdate(cd, ope) }}
                                                                            onPress={() => { props.navigation.navigate('ProductDetails', { ...item, from: 'Fav', val: search }); }}
                                                                            isFav={(filteredProds || []).map((e) => e._id).includes(item._id)}
                                                                            onpressfav={(type) => { favEvent(item, type) }}
                                                                            img={item.mainImage != null ? item.mainImage.fileUrl : img}
                                                                            mrp={item.price}
                                                                            salePrice={item.salePrice}
                                                                            name={lang === 'ar' ? item.arabicName : item.name} />
                                                                    </View>}
                                                                    keyExtractor={item => item._id}
                                                                    numColumns={2}
                                                                    columnWrapperStyle={{
                                                                        flex: 1,
                                                                        justifyContent: 'space-around',
                                                                    }}
                                                                />
                                                            }
                                                        </React.Fragment>
                                                    }
                                                    {mode == "1" &&
                                                        <React.Fragment>
                                                            {filteredProds.length > 0 &&
                                                                <FlatList

                                                                    data={filteredProds.map((e, i) => ({ ...e, ind: i + 1 }))}
                                                                    renderItem={({ item }) => <View style={{ marginBottom: item.ind == filteredProds.length ? 200 : 15 }}>
                                                                        <ProductCard
                                                                            lang={lang}
                                                                            cartData={{
                                                                                inCart: (cartData || []).map((e) => e.prodId._id).includes(item._id),
                                                                                cartValues: (cartData || []).filter((e) => e.prodId._id == item._id),
                                                                            }}
                                                                            cartPressed={() => { catrPressed(item) }}
                                                                            cartUpdate={(cd, ope) => { cartUpdate(cd, ope) }}
                                                                            onPress={() => { props.navigation.navigate('ProductDetails', { ...item, from: 'Fav', val: search }); }}
                                                                            isFav={(filteredProds || []).map((e) => e._id).includes(item._id)}
                                                                            onpressfav={(type) => { favEvent(item, type) }}
                                                                            img={item.mainImage != null ? item.mainImage.fileUrl : img}
                                                                            mrp={item.price}
                                                                            salePrice={item.salePrice}
                                                                            name={lang === 'ar' ? item.arabicName : item.name} />
                                                                    </View>}
                                                                    keyExtractor={item => item._id}
                                                                />
                                                            }
                                                        </React.Fragment>
                                                    }
                                                </View>
                                                : <View style={{ flex: 1, marginTop: Dimensions.get('screen').height / 4, justifyContent: 'center', alignItems: 'center' }}>
                                                    <View style={{}}>
                                                        <React.Fragment>
                                                            {(page == '0' && !favprocess) && <RegularText>{constants[lang].static.ydhafp}</RegularText>}
                                                            {(page == '1' && !favprocess) && <RegularText>{constants[lang].static.yhbap}</RegularText>}
                                                        </React.Fragment>
                                                    </View>
                                                </View>}
                                        </View>
                                    </ScrollView>
                                </SafeAreaView>
                            </View>
                        </View>
                    </View>
                </View>
            </React.Fragment>
        </TouchableWithoutFeedback>
    );
}


const styles = StyleSheet.create({
    main: {
        minHeight: Dimensions.get('screen').height
    },
    firstCol: {
        paddingTop: 30,
        paddingHorizontal: 23,
        backgroundColor: 'white',
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
    secondCol: {
        marginTop: 10,
        marginHorizontal: 23
    },
    thirdCol: {
        marginTop: 50,
        marginHorizontal: 23,
    },
    dropdown4BtnStyle: {
        backgroundColor: "#E2E7E6",
        borderRadius: 8,
        borderWidth: 0,
        padding: 5,
        fontSize: 14,
        height: 40,
        fontFamily: 'QuasimodaMedium',
    },
});


const mapStateToProps = (state) => ({
    lang: state.common.lang ? state.common.lang : 'en',
    user: state.user,
    fav: state.fav,
    cart: state.cart,
    order: state.order
});


const mapDispatchToProps = dispatch => ({
    loadCart: () => { dispatch(GetCartForUser()) },
    updatecartFn: (body) => { dispatch(UpdateCart(body)) },
    deleteCartFn: (body) => { dispatch(deleteCart(body)) },
    addtoCart: (body, cartprod, done) => { dispatch(AddToCart(body, cartprod, done)) },

    loginAction: (body) => { dispatch(login(body)) },
    getFavs: () => { dispatch(GetFavForUser()) },
    addtoFavFn: (body, done) => { dispatch(addtoFav(body, done)) },
    rmoveFavFn: (prodId, userId, done) => { dispatch(renoveFav(prodId, userId, done)) },
    fetBuyAgainOrdersFn: () => { dispatch(getBuyagain()) }
});
export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
