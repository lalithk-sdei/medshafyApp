import * as React from 'react';
import { Platform, Modal, View, Text, StyleSheet, Image, FlatList, Dimensions, TouchableWithoutFeedback, Keyboard, ScrollView, Alert, BackHandler, TouchableHighlight, SafeAreaView, StatusBar } from 'react-native';
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
const Searchpage = (props) => {

    const [page, setpage] = React.useState("search");
    const [fn, setFn] = React.useState();
    const [brand, setBrand] = React.useState();

    const [cart, setCart] = React.useState(3);
    const [favs, setFavs] = React.useState(props.fav.favData);
    const [search, setSearch] = React.useState(props.route.params.val);
    const [banners, setbanners] = React.useState([
        'https://i.ibb.co/W32fQwF/Screenshot-2021-10-03-at-2-05-40-AM.png',
        'https://i.ibb.co/W32fQwF/Screenshot-2021-10-03-at-2-05-40-AM.png',
        'https://i.ibb.co/W32fQwF/Screenshot-2021-10-03-at-2-05-40-AM.png',
        'https://i.ibb.co/W32fQwF/Screenshot-2021-10-03-at-2-05-40-AM.png',
    ]);

    const img = "https://gcdn.pbrd.co/images/grEHL3gquLuy.png";
    const countries = ["Egypt", "Canada", "Australia", "Ireland", "Egypt", "Canada", "Australia", "Ireland", "Egypt", "Canada", "Australia", "Ireland",];

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
                'Login Required!',
                'Please login to add product to favourite',
                [
                    { text: 'cancel', onPress: () => { } },
                    { text: 'login', onPress: () => { props.navigation.navigate('login'); } }
                ],
            );
        }
    }



    const [open, setOpen] = React.useState(false);
    const [cat, setCat] = React.useState(null);
    const [items, setItems] = React.useState([]);
    const { Catprocess, CatStatus, CatData, } = props.cat;
    const { favprocess, favStatus, favData, } = props.fav;
    const { Prodprocess, ProdStatus, ProdData } = props.product;
    React.useEffect(() => {
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
        if (CatData.length == 0) {
            props.callCat();
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
                    <ScrollView>
                        <Spinner
                            color={"#9F9FA2"}
                            visible={Prodprocess || Catprocess || favprocess}
                            textContent={'Please wait...'}
                            textStyle={{ color: '#FFF' }}
                        />
                        {page == "search" &&
                            <View style={styles.main}>
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
                                                <Ionicons name="ios-cart-outline" size={30} color="black" />
                                                {cart != 0 &&
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
                                                        }}>{cart}
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
                                                        placeholder="Category"
                                                        style={styles.dropdown4BtnStyle}
                                                        modalProps={{
                                                            animationType: "fade"
                                                        }}
                                                        listMode="MODAL"
                                                        open={open}
                                                        value={cat}
                                                        items={CatData.map((e) => ({ label: e.name, value: e._id }))}
                                                        setOpen={setOpen}
                                                        setValue={(setCat)}
                                                        setItems={setItems}
                                                        textStyle={{
                                                            fontSize: 14,
                                                            fontFamily: 'QuasimodaMedium'
                                                        }}
                                                    />
                                                </View>
                                                <View style={{ flex: 0.5 }}></View>
                                            </View>

                                            {ProdData && ProdData.items && ProdData.items.length > 0 ? <React.Fragment>
                                                <View style={{ marginTop: 10 }}>
                                                    {ProdStatus == 'ok' &&
                                                        <RegularText>{ProdData.count} results {search != "" && <Text>for </Text>}
                                                            <RegularText styles={{ color: '#2F33A4' }}>
                                                                {search != "" && <Text>"{search}"</Text>}
                                                            </RegularText>
                                                        </RegularText>
                                                    }
                                                </View>
                                                <View style={{ marginTop: 10 }}>
                                                    {ProdStatus == 'ok' &&
                                                        <FlatList
                                                            data={ProdData.items}
                                                            renderItem={({ item }) => (<View style={{ marginBottom: 15 }}>
                                                                <ProductCard
                                                                    onPress={() => { props.navigation.navigate('ProductDetails', { ...item, from: 'searchpage', val: search }); }}
                                                                    isFav={(favs || []).map((e) => e.prodId._id).includes(item._id)}
                                                                    onpressfav={(type) => { favEvent(item, type) }}
                                                                    img={item.mainImage ? item.mainImage.mediumUrl : img}
                                                                    mrp={item.price} salePrice={item.salePrice}
                                                                    name={item.name} />
                                                            </View>)}
                                                            keyExtractor={item => item._id}
                                                        />
                                                    }
                                                </View>
                                            </React.Fragment> : <View style={{ flex: 1, marginTop: Dimensions.get('screen').height / 4, justifyContent: 'center', alignItems: 'center' }}>
                                                <View style={{}}>
                                                    <React.Fragment>
                                                        {(!Prodprocess) && <RegularText>No products found</RegularText>}
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
        minHeight: Dimensions.get('screen').height
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
    fav: state.fav
});


const mapDispatchToProps = dispatch => ({
    loadProducts: (body) => { dispatch(GetProducts(body)) },
    callCat: () => { dispatch(GetCategories()) },
    getFavs: () => { dispatch(GetFavForUser()) },
    addtoFavFn: (body, done) => { dispatch(addtoFav(body, done)) },
    rmoveFavFn: (prodId, userId, done) => { dispatch(renoveFav(prodId, userId, done)) }
});
export default connect(mapStateToProps, mapDispatchToProps)(Searchpage);
