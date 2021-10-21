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
import TitleText from '../common/elements/TitleText';


const ProductDetails = (props) => {

    const img = "https://gcdn.pbrd.co/images/grEHL3gquLuy.png";
    const { Prodprocess, ProdStatus, ProdData } = props.product;
    React.useEffect(() => {
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    }, []);
    console.log(props.route.params);
    const { mainImage = null, salePrice = 0, price = 10, name = "Product", from, val, brand, model, country, description } = props.route.params;
    const discount = Math.ceil(100 - (salePrice / price) * 100);
    return (
        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss(); }}>
            <React.Fragment>
                <View style={{ flex: 1 }}>
                    <ScrollView>
                        {/* <Spinner
                            color={"#9F9FA2"}
                            visible={Prodprocess || Catprocess || favprocess}
                            textContent={'Please wait...'}
                            textStyle={{ color: '#FFF' }}
                        /> */}
                        <View style={styles.main}>
                            <View style={{ paddingTop: 50, backgroundColor: 'white', flexDirection: 'column' }}>
                                <View style={{ marginLeft: 43 }}>
                                    <Ionicons onPress={() => { props.navigation.navigate(from, { val }); }} name="arrow-back" size={24} color="black" />
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
                                                borderTopLeftRadius: 15,
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
                                    <Text numberOfLines={1} style={{ fontFamily: 'QuasimodaMedium', fontSize: 24 }}>{name}</Text>
                                </View>
                                <View style={{ marginLeft: 43, marginTop: 5 }} >
                                    <Text style={{ fontFamily: 'Quasimoda', fontSize: 18 }}>Price per box :</Text>
                                </View>
                                <View style={{ marginLeft: 43, marginTop: 5, flexDirection: 'row' }} >
                                    <TitleText title={`SAR ${salePrice}   `} styles={{ fontSize: 24 }}></TitleText>
                                    <Text style={{ textDecorationLine: 'line-through', textDecorationStyle: 'solid', fontFamily: 'Quasimoda', fontSize: 24 }}>SAR {price} </Text>
                                </View>
                                <View style={{ marginLeft: 43, marginTop: 5, marginBottom: 20 }} >
                                    <View style={{
                                        flexDirection: 'row',
                                        marginTop: 15,
                                    }}>
                                        <View style={{
                                            borderTopLeftRadius: 50,
                                            borderBottomLeftRadius: 50,
                                            paddingHorizontal: 15,
                                            paddingVertical: 10,
                                            backgroundColor: '#98DECA',
                                        }}>
                                            <Text style={{
                                                fontSize: Platform.OS == 'ios' ? 12 : 16,
                                                fontFamily: 'Quasimodabold',
                                                fontWeight: 'bold'
                                            }}>Add to card</Text>
                                        </View>
                                        <View style={{
                                            borderTopRightRadius: 50,
                                            borderBottomRightRadius: 50,
                                            paddingHorizontal: 10,
                                            paddingVertical: 2,
                                            backgroundColor: '#6CBAA8'
                                        }}>
                                            <Text style={{
                                                color: 'white',
                                                fontSize: Platform.OS == 'ios' ? 20 : 28,
                                            }}>+</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View style={{ paddingLeft: 43, paddingTop: 20, paddingBottom: 20, marginTop: 30, backgroundColor: 'white', flexDirection: 'column' }}>
                                <View>
                                    <TitleText title={`Product Name : ${name}`}></TitleText>
                                </View>
                                <View style={{ marginTop: 15 }}>
                                    <Text style={{ fontFamily: 'Quasimoda', fontSize: 15 }}>Brand :  {brand} </Text>
                                </View>
                                <View >
                                    <Text style={{ fontFamily: 'Quasimoda', fontSize: 15 }}>Model Number :  {model} </Text>
                                </View>
                                <View >
                                    <Text style={{ fontFamily: 'Quasimoda', fontSize: 15 }}>Country :  {country} </Text>
                                </View>
                                <View style={{ marginTop: 20 }}>
                                    <Text style={{ fontFamily: 'Quasimoda', fontSize: 15 }}> {description} </Text>
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
    fav: state.fav
});


const mapDispatchToProps = dispatch => ({
    loadProducts: (body) => { dispatch(GetProducts(body)) },
    callCat: () => { dispatch(GetCategories()) },
    getFavs: () => { dispatch(GetFavForUser()) },
    addtoFavFn: (body, done) => { dispatch(addtoFav(body, done)) },
    rmoveFavFn: (prodId, userId, done) => { dispatch(renoveFav(prodId, userId, done)) }
});
export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);
