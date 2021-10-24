import * as React from 'react';
import { Platform, View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, TouchableWithoutFeedback, Keyboard, ScrollView, Alert, BackHandler, TouchableHighlight, SafeAreaView, StatusBar, FlatList } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { connect } from 'react-redux';
import SearchInput from '../common/elements/searchInput';
import { Ionicons } from '@expo/vector-icons';
const { width, height } = Dimensions.get("window");
import RegularText from '../common/elements/regulartext';
import ProductCard from '../common/elements/productCard';
import { Entypo } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import ProductBoxOne from '../common/elements/productBoxOne';
import { GetProducts } from '../../dataStore/actions/prod';
import { GetCategories } from '../../dataStore/actions/category';
import { addtoFav, GetFavForUser, renoveFav } from '../../dataStore/actions/fav';
import { AddToCart, deleteCart, GetCartForUser, UpdateCart } from '../../dataStore/actions/cart';
import CartQty from '../common/elements/cartQty';

const Categories = (props) => {

    const [page, setpage] = React.useState("search");
    const [mode, setMode] = React.useState("0");
    const [search, setSearch] = React.useState("");
    const [selecTedCat, setSelectedCat] = React.useState(null);

    const img = "https://gcdn.pbrd.co/images/grEHL3gquLuy.png";

    const [cat, setCat] = React.useState(null);
    const [catPar, setCatpar] = React.useState(null);
    const [time, setTime] = React.useState(null);
    const registerKey = (val) => {
        clearTimeout(time);
        setTime(setTimeout(() => {
            if (search) {
                props.loadProducts({ search, cat: cat ? cat._id : "" });
            } else {
                props.loadProducts({ search: "", cat: cat ? cat._id : "" })
            }
        }, 500));
    }

    const { Catprocess, CatStatus, CatData, } = props.cat;
    const { Prodprocess, ProdStatus, ProdData } = props.product;
    const { favprocess, favStatus, favData, } = props.fav;
    const { cartprocess, cartStatus, cartData } = props.cart;

    const [openQty, setOIpenQty] = React.useState(false);
    const [Selprod, setSelProd] = React.useState(null);
    const [qtys, setQtys] = React.useState(false);

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

    const favEvent = (item, type) => {
        if (props.user.loggedin) {
            const i = {
                "prodId": item._id,
                "userId": props.user.loggedinUserData._id
            };
            if (type === 'add') {
                props.addtoFavFn(i, () => {
                    props.getFavs();
                });
            } else if (type === 'remove') {
                props.rmoveFavFn(item._id, props.user.loggedinUserData._id, () => {
                    props.getFavs();
                })
            }
        } else {
            Alert.alert(
                'Login Required!',
                'Please login to add product to favourite',
                [
                    { text: 'cancel', onPress: () => { } },
                    { text: 'login', onPress: () => { props.navigation.navigate('login'); } }
                ],
            );
        }
    }


    React.useEffect(() => {
        if (cat == null) {
            setCat(props.route.params.cat)
            setCatpar(props.route.params.cat)
            setSelectedCat(props.route.params.cat)
        }
        if (cartData.length == 0 && props.user.loggedin) {
            props.loadCart();
        }
        if (CatData.length == 0 && props.user.loggedin) {
            props.callCat();
        }
        if (props.user.loggedin && favStatus == '') {
            props.getFavs();
        }
        props.loadProducts({ search, cat: cat ? cat._id : props.route.params.cat._id });
    }, [cat]);
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
                        visible={Prodprocess || Catprocess || favprocess || cartprocess}
                        textContent={'Please wait...'}
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
                                        <View style={{ marginTop: 30, paddingLeft: 10, position: 'relative' }}>
                                            <SimpleLineIcons onPress={() => { setMode("0") }} name="grid" size={24} color={mode == "0" ? "#EE6000" : "black"} />
                                        </View>
                                    </View>
                                    <View style={{ flex: 1 }}>
                                        <View style={{ marginTop: 25, paddingLeft: 10, position: 'relative' }}>
                                            <Entypo onPress={() => { setMode("1") }} name="list" size={33} color={mode == "1" ? "#EE6000" : "black"} />
                                        </View>
                                    </View>
                                </View>
                                <View style={{ marginTop: 20 }}>
                                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                        <View style={{ flexDirection: 'row', overflow: 'scroll' }}>
                                            {[{ name: "All", _id: "" }, ...CatData].map((e) =>
                                                <View key={e._id} style={{ position: 'relative' }}>
                                                    <TouchableOpacity onPress={() => { setSelectedCat(e); setCat(e); setCatpar(e) }}>
                                                        <View style={{
                                                            borderBottomColor: (catPar ? catPar._id : "") == e._id ? '#EE6000' : 'white',
                                                            borderBottomWidth: 2,
                                                            paddingBottom: 10,
                                                            marginRight: 20,
                                                            position: 'relative',
                                                        }}>
                                                            <Text style={{
                                                                fontSize: 20,
                                                                fontFamily: 'Quasimodasemibold',
                                                                textTransform: 'capitalize'
                                                            }}>{e.name}</Text>
                                                        </View>
                                                    </TouchableOpacity>
                                                </View>
                                            )}
                                        </View>
                                    </ScrollView>
                                </View>
                            </View>
                            <View>
                                <View style={{ marginTop: 15, marginLeft: 0 }}>
                                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                        <View style={{ flexDirection: 'row', overflow: 'scroll' }}>
                                            <Text>{"      "}</Text>
                                            {selecTedCat && selecTedCat.children && selecTedCat.children.map((e) =>
                                                <View key={e._id}>
                                                    <TouchableOpacity onPress={() => { setCat(e) }}>
                                                        <View style={{
                                                            borderRadius: 50,
                                                            paddingVertical: 8,
                                                            paddingHorizontal: 10,
                                                            backgroundColor: (cat ? cat._id : "") == e._id ? '#EE6000' : 'white',
                                                            marginRight: 20
                                                        }}>
                                                            <Text style={{
                                                                fontSize: 16,
                                                                color: (cat ? cat._id : "") == e._id ? 'white' : 'black',
                                                                fontFamily: 'Quasimodasemibold',
                                                            }}>{e.name}</Text>
                                                        </View>
                                                    </TouchableOpacity>
                                                </View>
                                            )}
                                        </View>
                                    </ScrollView>
                                </View>
                            </View>
                            <View style={styles.secondCol}>
                                <View>
                                    <SafeAreaView>
                                        <ScrollView>
                                            <View style={{ marginTop: 0 }}>
                                                {ProdData && ProdData.items && ProdData.items.length > 0 ? <View style={{ marginBottom: 200, flexDirection: 'row' }}>
                                                    {mode == "0" &&
                                                        <React.Fragment>
                                                            {ProdStatus == 'ok' &&
                                                                <FlatList
                                                                    data={ProdData.items.map((e, i) => ({ ...e, ind: i + 1 }))}
                                                                    renderItem={({ item, index }) => <View style={{ flex: 1, marginRight: 10, marginBottom: item.ind == ProdData.items.length ? 200 : 20 }}>
                                                                        <ProductBoxOne
                                                                            cartData={{
                                                                                inCart: (cartData || []).map((e) => e.prodId._id).includes(item._id),
                                                                                cartValues: (cartData || []).filter((e) => e.prodId._id == item._id),
                                                                            }}
                                                                            cartPressed={() => { catrPressed(item) }}
                                                                            cartUpdate={(cd, ope) => { cartUpdate(cd, ope) }}
                                                                            onPress={() => { props.navigation.navigate('ProductDetails', { ...item, from: 'Home', val: search }); }}
                                                                            isFav={(favData || []).map((e) => e.prodId._id).includes(item._id)}
                                                                            onpressfav={(type) => { favEvent(item, type) }}
                                                                            img={item.mainImage ? item.mainImage.mediumUrl : img}
                                                                            mrp={item.price}
                                                                            salePrice={item.salePrice}
                                                                            name={item.name} />
                                                                    </View>}
                                                                    keyExtractor={item => item._id}
                                                                    numColumns={2}
                                                                    columnWrapperStyle={{
                                                                        flex: 1,
                                                                    }}
                                                                />
                                                            }
                                                        </React.Fragment>
                                                    }
                                                    {mode == "1" &&
                                                        <React.Fragment>
                                                            {ProdStatus == 'ok' &&
                                                                <FlatList
                                                                    data={ProdData.items.map((e, i) => ({ ...e, ind: i + 1 }))}
                                                                    renderItem={({ item }) => <View style={{ marginBottom: item.ind == ProdData.items.length ? 200 : 15 }}>
                                                                        <ProductCard
                                                                            cartData={{
                                                                                inCart: (cartData || []).map((e) => e.prodId._id).includes(item._id),
                                                                                cartValues: (cartData || []).filter((e) => e.prodId._id == item._id),
                                                                            }}
                                                                            cartPressed={() => { catrPressed(item) }}
                                                                            cartUpdate={(cd, ope) => { cartUpdate(cd, ope) }}
                                                                            onPress={() => { props.navigation.navigate('ProductDetails', { ...item, from: 'Home', val: search }); }}
                                                                            isFav={(favData || []).map((e) => e.prodId._id).includes(item._id)}
                                                                            onpressfav={(type) => { favEvent(item, type) }}
                                                                            img={item.mainImage ? item.mainImage.mediumUrl : img}
                                                                            mrp={item.price}
                                                                            salePrice={item.salePrice}
                                                                            name={item.name} />
                                                                    </View>}
                                                                    keyExtractor={item => item._id}
                                                                />
                                                            }
                                                        </React.Fragment>
                                                    }
                                                </View> : <View style={{ flex: 1, marginTop: Dimensions.get('screen').height / 4, justifyContent: 'center', alignItems: 'center' }}>
                                                    <View style={{}}>
                                                        <React.Fragment>
                                                            {(!Prodprocess) && <RegularText>No products found</RegularText>}
                                                        </React.Fragment>
                                                    </View>
                                                </View>}
                                            </View>
                                        </ScrollView>
                                    </SafeAreaView>
                                </View>
                            </View>
                        </View>
                    }
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
    product: state.prod,
    cat: state.category,
    user: state.user,
    fav: state.fav,
    cart: state.cart
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
export default connect(mapStateToProps, mapDispatchToProps)(Categories);
