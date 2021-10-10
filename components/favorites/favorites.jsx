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

const Favorites = (props) => {

    const [page, setpage] = React.useState(props.route.params.page);
    const [from, setFrom] = React.useState(props.route.params.from);
    const [mode, setMode] = React.useState("0");
    const [search, setSearch] = React.useState("");
    const img = "https://gcdn.pbrd.co/images/grEHL3gquLuy.png";
    const [masterProds, SetMasterprods] = React.useState([]);
    const [filteredProds, SetFilteredProds] = React.useState([]);  const [time, setTime] = React.useState(null);


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
                'Login Required!',
                'Please login to add product to favourite',
                [
                    { text: 'cancel', onPress: () => { } },
                    { text: 'login', onPress: () => { props.navigation.navigate('login'); } }
                ],
            );
        }
    }

    const { favprocess, favStatus, favData, } = props.fav;



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

    React.useEffect(() => {
        setFrom(props.route.params.from);
        if (props.route.params.from === 'home') {
            if (page == '0') {
                if (props.user.loggedin && favStatus != 'ok') {
                    props.getFavs();
                }
                SetMasterprods(favData.map((e) => e.prodId));
                SetFilteredProds(favData.map((e) => e.prodId).filter((r) => new RegExp(search).test(r.name)));
            } else if (page == '1') {
                // if (props.user.loggedin && favStatus != 'ok') {
                //     props.getFavs();
                // }
                // SetMasterprods(favData.map((e) => e.prodId));
                // SetFilteredProds(favData.map((e) => e.prodId).filter((r) => new RegExp(search).test(r.name)));
            }
        }
    }, [props.fav.favData, page]);
    return (
        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss(); }}>
            <React.Fragment>
                <View style={{ flex: 1 }}>
                    <Spinner
                        color={"#9F9FA2"}
                        visible={favprocess}
                        textContent={'Please wait...'}
                        textStyle={{ color: '#FFF' }}
                    />
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
                                                }}>Favourites</Text>
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
                                                }}>Buy Again</Text>
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
                                                                            isFav={(filteredProds || []).map((e) => e._id).includes(item._id)}
                                                                            onpressfav={(type) => { favEvent(item, type) }}
                                                                            img={item.mainImage ? img : img}
                                                                            mrp={item.price}
                                                                            salePrice={item.salePrice}
                                                                            name={item.name} />
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
                                                                            isFav={(filteredProds || []).map((e) => e._id).includes(item._id)}
                                                                            onpressfav={(type) => { favEvent(item, type) }}
                                                                            img={item.mainImage ? img : img}
                                                                            mrp={item.price}
                                                                            salePrice={item.salePrice}
                                                                            name={item.name} />
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
                                                            {(page == '0' && !favprocess) && <RegularText>You dont have any favorite products.</RegularText>}
                                                            {(page == '1' && !favprocess) && <RegularText>You haven't bought any product.</RegularText>}
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
    lang: state.common.lang,
    user: state.user,
    fav: state.fav,
});


const mapDispatchToProps = dispatch => ({
    loginAction: (body) => { dispatch(login(body)) },
    getFavs: () => { dispatch(GetFavForUser()) },
    addtoFavFn: (body, done) => { dispatch(addtoFav(body, done)) },
    rmoveFavFn: (prodId, userId, done) => { dispatch(renoveFav(prodId, userId, done)) }
});
export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
