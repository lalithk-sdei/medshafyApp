import * as React from 'react';
import { Platform, Modal, View, Text, StyleSheet, Pressable, FlatList, Dimensions, TouchableWithoutFeedback, Keyboard, ScrollView, Alert, BackHandler, TouchableHighlight, SafeAreaView, StatusBar } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { connect } from 'react-redux';
import { login } from '../../dataStore/actions/user';
import SearchInput from '../common/elements/searchInput';
import RadioButton from '../common/elements/radiobutton';
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
import { AddToCart, deleteCart, GetCartForUser, UpdateCart } from '../../dataStore/actions/cart';
import CartQty from '../common/elements/cartQty';
import { constants } from '../../utlits/constants';


const Searchpage = (props) => {

    const [page, setpage] = React.useState("search");
    const [openQty, setOIpenQty] = React.useState(false);
    const [Selprod, setSelProd] = React.useState(null);
    const [qtys, setQtys] = React.useState(false);
    const [brand, setBrand] = React.useState();

    const [favs, setFavs] = React.useState(props.fav.favData);
    const [search, setSearch] = React.useState(props.route.params.val);

    const img = "https://gcdn.pbrd.co/images/grEHL3gquLuy.png";

    const [open, setOpen] = React.useState(false);
    const [cat, setCat] = React.useState(null);
    const [items, setItems] = React.useState([]);


    const [openbr, setOpenbr] = React.useState(false);
    const [br, setbr] = React.useState(``);
    const [brands, setbrands] = React.useState([]);


    const { Catprocess, CatStatus, CatData, } = props.cat;
    const { favprocess, favStatus, favData, } = props.fav;
    const { Prodprocess, ProdStatus, ProdData } = props.product;
    const { cartprocess, cartStatus, cartData } = props.cart;
    const { lang } = props;
    const [time, setTime] = React.useState(null);
    const registerKey = (val) => {
        clearTimeout(time);
        setTime(setTimeout(() => {
            if (search) {
                props.loadProducts({ search: val, cat })
            } else {
                props.loadProducts({ search: "", cat })
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
                props.addtoFavFn(i, () => {
                    setFavs([...favs, { ...i, "prodId": { _id: item._id } }]);
                });
            } else if (type === 'remove') {
                props.rmoveFavFn(item._id, props.user.loggedinUserData._id, () => {
                    setFavs(favs.filter((e) => e.prodId._id != item._id));
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
                constants[lang].errors.loginReq,
                constants[lang].errors.pltapiyc,
                'Please login to add products in your cart.',
                [
                    { text: constants[lang].errors.cancel, onPress: () => { } },
                    { text: constants[lang].errors.lgn, onPress: () => { props.navigation.navigate('login'); } }
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

    React.useEffect(() => {
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
        if (CatData.length == 0) {
            props.callCat();
        }
        if (cartData.length == 0 && props.user.loggedin) {
            props.loadCart();
        }
        props.loadProducts({ search, cat });
        if (props.user.loggedin && favStatus == '') {
            props.getFavs()
        }
    }, [cat, props.fav.favData]);
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
                            visible={Prodprocess || Catprocess || favprocess || cartprocess}
                            textContent={constants[lang].static.pleasewait}
                            textStyle={{ color: '#FFF' }}
                        />
                        {page == "search" &&
                            <View style={[styles.main, { opacity: openQty ? 0.1 : 1 }]}>
                                <View style={styles.firstCol}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <View style={{ flex: 1, marginTop: 25, paddingLeft: 10 }}>
                                            <Ionicons onPress={() => { props.navigation.navigate('Home'); }} name="arrow-back" size={30} color="black" />
                                        </View>
                                        <View style={{ flex: 5 }}>
                                            <SearchInput closeFn={() => { setSearch(""); registerKey("") }} value={search} placeholder={search} onChangeText={(e) => { setSearch(e); registerKey(e) }} />
                                        </View>
                                        <View style={{ flex: 1 }}>
                                            <View style={{ marginTop: 25, paddingLeft: 10, position: 'relative' }}>
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
                                            </View>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.secondCol}>
                                    <View>
                                        <SafeAreaView>
                                            <View style={{ flexDirection: 'row' }}>
                                                <View style={{ flex: 1, marginRight: 10 }}>
                                                    <DropDownPicker
                                                        placeholder={constants[lang].static.category}
                                                        style={styles.dropdown4BtnStyle}
                                                        modalProps={{
                                                            animationType: "fade"
                                                        }}
                                                        listMode="MODAL"
                                                        open={open}
                                                        value={cat}
                                                        items={CatData.map((e) => ({ label: lang === 'ar' ? e.arabicName : e.name, value: e._id }))}
                                                        setOpen={setOpen}
                                                        setValue={(setCat)}
                                                        setItems={setItems}
                                                        textStyle={{
                                                            fontSize: 14,
                                                            fontFamily: 'QuasimodaMedium'
                                                        }}
                                                    />
                                                </View>
                                                {ProdData && ProdData.items && ProdData.items.length > 0 ? <React.Fragment>
                                                    <View style={{ flex: 1, marginRight: 10 }}>
                                                        <DropDownPicker
                                                            placeholder={constants[lang].static.Brand}
                                                            style={styles.dropdown4BtnStyle}
                                                            modalProps={{
                                                                animationType: "fade"
                                                            }}
                                                            listMode="MODAL"
                                                            open={openbr}
                                                            value={br}
                                                            items={ProdData.items.filter((p, s, ar) => ar.findIndex(t => t.brand == p.brand) == s).map((e, ind) => ({ label: e.brand, value: `${ind}-${e.brand}` }))}
                                                            setOpen={setOpenbr}
                                                            setValue={(setbr)}
                                                            setItems={setbrands}
                                                            textStyle={{
                                                                fontSize: 14,
                                                                fontFamily: 'QuasimodaMedium'
                                                            }}
                                                        />
                                                    </View>
                                                </React.Fragment> : null}
                                                <View style={{ flex: 0.5 }}></View>
                                            </View>

                                            {ProdData && ProdData.items && ProdData.items.length > 0 ? <React.Fragment>
                                                <View style={{ marginTop: 10 }}>
                                                    {ProdStatus == 'ok' &&
                                                        <RegularText>{br.split('-').length == 2 ? ProdData.items.filter((e) => e.brand == br.split('-')[1]).length : ProdData.count} {constants[lang].static.results} {search != "" && <Text>{constants[lang].static.for}</Text>}
                                                            <RegularText styles={{ color: '#2F33A4' }}>
                                                                {search != "" && <Text>"{search}"</Text>}
                                                            </RegularText>
                                                        </RegularText>
                                                    }
                                                </View>
                                                <View style={{ marginTop: 10 }}>
                                                    {ProdStatus == 'ok' &&
                                                        <FlatList
                                                            data={br.split('-').length == 2 ? ProdData.items.filter((e) => e.brand == br.split('-')[1]) : ProdData.items}
                                                            renderItem={({ item }) => (<View style={{ marginBottom: 15 }}>
                                                                <ProductCard
                                                                    lang={lang}
                                                                    cartData={{
                                                                        inCart: (cartData || []).map((e) => e.prodId._id).includes(item._id),
                                                                        cartValues: (cartData || []).filter((e) => e.prodId._id == item._id),
                                                                    }}
                                                                    cartPressed={() => { catrPressed(item) }}
                                                                    cartUpdate={(cd, ope) => { cartUpdate(cd, ope) }}
                                                                    onPress={() => { props.navigation.navigate('ProductDetails', { ...item, from: 'searchpage', val: search }); }}
                                                                    isFav={(favs || []).map((e) => e.prodId._id).includes(item._id)}
                                                                    onpressfav={(type) => { favEvent(item, type) }}
                                                                    img={item.mainImage ? item.mainImage.mediumUrl : img}
                                                                    mrp={item.price} salePrice={item.salePrice}
                                                                    name={lang === 'ar' ? item.arabicName : item.name} />
                                                            </View>)}
                                                            keyExtractor={item => item._id}
                                                        />
                                                    }
                                                </View>
                                            </React.Fragment> : <View style={{ flex: 1, marginTop: Dimensions.get('screen').height / 4, justifyContent: 'center', alignItems: 'center' }}>
                                                <View style={{}}>
                                                    <React.Fragment>
                                                        {(!Prodprocess) && <RegularText>{constants[lang].static.npf}</RegularText>}
                                                    </React.Fragment>
                                                </View>
                                            </View>}
                                        </SafeAreaView>
                                    </View>
                                </View>
                            </View>
                        }
                    </ScrollView>
                </View>
            </React.Fragment>
        </TouchableWithoutFeedback>
    );
}


const styles = StyleSheet.create({
    main: {
        minHeight: Dimensions.get('screen').height,
    },
    firstCol: {
        paddingTop: 30,
        paddingHorizontal: 23,
        backgroundColor: 'white',
        paddingBottom: 20,
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
        marginTop: 20,
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
    product: state.prod,
    cat: state.category,
    user: state.user,
    fav: state.fav,
    cart: state.cart,
    lang: state.common.lang ?  state.common.lang : 'en' ,
});


const mapDispatchToProps = dispatch => ({
    loadProducts: (body) => { dispatch(GetProducts(body)) },
    loadCart: () => { dispatch(GetCartForUser()) },
    updatecartFn: (body) => { dispatch(UpdateCart(body)) },
    deleteCartFn: (body) => { dispatch(deleteCart(body)) },
    addtoCart: (body, cartprod, done) => { dispatch(AddToCart(body, cartprod, done)) },
    callCat: () => { dispatch(GetCategories()) },
    getFavs: () => { dispatch(GetFavForUser()) },
    addtoFavFn: (body, done) => { dispatch(addtoFav(body, done)) },
    rmoveFavFn: (prodId, userId, done) => { dispatch(renoveFav(prodId, userId, done)) }
});
export default connect(mapStateToProps, mapDispatchToProps)(Searchpage);
