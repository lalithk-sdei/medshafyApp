import * as React from 'react';
import { View, Platform, StyleSheet, TouchableOpacity, Image, Dimensions, TouchableWithoutFeedback, Keyboard, ScrollView, Alert, BackHandler, TouchableHighlight, FlatList } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { connect } from 'react-redux';
import SearchInput from '../common/elements/searchInput';
import RegularText from '../common/elements/regulartext';
import { AntDesign } from '@expo/vector-icons';
import { SliderBox } from "react-native-image-slider-box";
import TitleText from '../common/elements/TitleText';
import SmallButton from '../common/elements/samllButton';
import ProductBox from '../common/elements/productBox';
import { GetCategories, sendSpecialOrder } from '../../dataStore/actions/category';
import { LogBox } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { GetFavForUser } from '../../dataStore/actions/fav';
import { useIsFocused } from "@react-navigation/native";
import LinkText from '../common/elements/linktext';
import Floatinginput from '../common/elements/floatinginput';
import Errortext from '../common/elements/errorText';
import LightText from '../common/elements/lightText';
import SecondaryBtn from '../common/elements/secondaryButton';
import PrimaryButton from '../common/elements/primaryButton';
import { constants } from '../../utlits/constants';
import * as ImagePicker from 'expo-image-picker';
import { uploadStoredoc } from '../../dataStore/actions/user';
import { getBuyagain } from '../../dataStore/actions/orders';
import { getBanners } from '../../dataStore/actions/banners';

const Home = (props) => {

    const isFocused = useIsFocused();

    const [page, setpage] = React.useState("home");
    const [imgPrs, setimgPrs] = React.useState(false);
    const [search, setSearch] = React.useState("");
    const [images, setImages] = React.useState([]);
    const [specialProd, setSpecialProd] = React.useState(false);
    // const [banners, setbanners] = React.useState([
    //     'https://i.ibb.co/W32fQwF/Screenshot-2021-10-03-at-2-05-40-AM.png',
    //     'https://i.ibb.co/ncXVCBt/Screenshot-2021-10-03-at-7-49-30-PM.png',
    //     'https://i.ibb.co/W32fQwF/Screenshot-2021-10-03-at-2-05-40-AM.png',
    //     'https://i.ibb.co/ncXVCBt/Screenshot-2021-10-03-at-7-49-30-PM.png',
    // ]);

    const img = "https://gcdn.pbrd.co/images/grEHL3gquLuy.png";
    const { Catprocess, CatStatus, CatData, } = props.cat;
    const { favprocess, favStatus, favData, } = props.fav;
    const { banners = [] } = props.bannersProp;
    const { ordersprocess, ordersStatus, orders = [], buyAgain = [] } = props.order;
    const [time, setTime] = React.useState(null);
    const registerKey = (val) => {
        clearTimeout(time);
        setTime(setTimeout(() => {
            if (search) {
                props.navigation.navigate('searchpage', { val });
            }
        }, 500));
    }

    const verifyPermissions = async () => {
        const result = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (result.status !== 'granted') {
            Alert.alert(
                constants[lang].errors.insper,
                constants[lang].errors.yntgcptuta,
                [{ text: constants[lang].errors.ok }]
            );
        } else {
            takeAndUploadPhotoAsync();
        }
        return true;
    };

    const takeAndUploadPhotoAsync = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            // allowsEditing: true,
            // mediaTypes: ImagePicker.MediaTypeOptions.Images,
            // allowsMultipleSelection: true,
        });
        if (result.cancelled) {
            return;
        }
        setImages([...images, result]);
    }
    const { lang } = props;
    const [formstate, setFormState] = React.useState({
        prodNameTch: false, prodNameErr: true, prodNameErrMsg: "", prodNameVal: "",
        QtyTch: false, QtyErr: true, QtyErrMsg: "", QtyVal: "",
        PriceTch: false, PriceErr: true, PriceErrMsg: "", PriceVal: "",
        descTch: false, descErr: true, descErrMsg: "", descVal: "",
    });

    const prodNameValidator = (e = null, tch = false) => {

        if (["", null, undefined].includes(e)) {
            setFormState({ ...formstate, prodNameErr: true, prodNameErrMsg: constants[lang].errors.prodReq, prodNameVal: e, ...tch && { prodNameTch: true } });
        } else {
            setFormState({ ...formstate, prodNameErr: false, prodNameErrMsg: '', prodNameVal: e, ...tch && { prodNameTch: true } });
        }
    }

    const QtyValidator = (e = null, tch = false) => {

        if (["", null, undefined].includes(e)) {
            setFormState({ ...formstate, QtyErr: true, QtyErrMsg: constants[lang].errors.qtyReq, QtyVal: e, ...tch && { QtyTch: true } });
        } else {
            setFormState({ ...formstate, QtyErr: false, QtyErrMsg: '', QtyVal: e, ...tch && { QtyTch: true } });
        }
    }

    const PriceValidator = (e = null, tch = false) => {

        if (["", null, undefined].includes(e)) {
            setFormState({ ...formstate, PriceErr: true, PriceErrMsg: constants[lang].errors.priceReq, PriceVal: e, ...tch && { PriceTch: true } });
        } else {
            setFormState({ ...formstate, PriceErr: false, PriceErrMsg: '', PriceVal: e, ...tch && { PriceTch: true } });
        }
    }

    const descValidator = (e = null, tch = false) => {

        if (["", null, undefined].includes(e)) {
            setFormState({ ...formstate, descErr: true, descErrMsg: constants[lang].errors.descReq, descVal: e, ...tch && { descTch: true } });
        } else {
            setFormState({ ...formstate, descErr: false, descErrMsg: '', descVal: e, ...tch && { descTch: true } });
        }
    }




    const submit = async () => {
        setimgPrs(true);
        const { prodNameVal, QtyVal, PriceVal, descVal } = formstate;
        let pms = [];
        if (images.length > 0) {
            for (let i = 0; i < images.length; i++) {
                try {
                    let formData = new FormData();
                    formData.append('file', {
                        uri: Platform.OS === 'ios' ? images[i].uri.replace('file://', '') : images[i].uri,
                        name: `${images[i].uri}`.split('/').pop(),
                        type: "image/jpeg"
                    });
                    pms.push(
                        new Promise((res, rej) => {
                            props.uploadStorImages(formData, res);
                        })
                    );
                } catch (errrr) {
                }
            }
        }

        setTimeout(() => {
            Promise.all(pms).then((res) => {
                setimgPrs(false);
                setImages([]);
                props.sendSplOrd({
                    "name": prodNameVal,
                    "qty": QtyVal,
                    "price": PriceVal,
                    "desc": descVal,
                    "docs": res.map((e) => e.data),
                    "userId": props.user.loggedinUserData._id
                }, () => {
                    setFormState({
                        prodNameTch: false, prodNameErr: true, prodNameErrMsg: "", prodNameVal: "",
                        QtyTch: false, QtyErr: true, QtyErrMsg: "", QtyVal: "",
                        PriceTch: false, PriceErr: true, PriceErrMsg: "", PriceVal: "",
                        descTch: false, descErr: true, descErrMsg: "", descVal: "",
                    })
                    setSpecialProd(false);
                    setTimeout(() => {
                        Alert.alert(
                            constants[lang].static.sos,
                            constants[lang].static.ysostm,
                            [
                                { text: constants[lang].errors.ok, },
                            ],
                        );
                    }, 1000);
                });
            }).then((err) => { })
        }, 10);
    }


    const sendSpecialProds = (item, type) => {
        if (props.user.loggedin) {
            setSpecialProd(true);
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
    React.useEffect(() => {
        props.getBannersFn();
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
        props.callCat();
        BackHandler.addEventListener('hardwareBackPress', (e) => {
            setSearch("");
        });
        if (isFocused) {
            if (props.user.loggedin) {
                props.getFavs();
                props.fetBuyAgainOrdersFn();
            }
        }


        setSearch("");
    }, [props.fav.favStatus, isFocused]);
    return (
        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss(); }}>
            <React.Fragment>
                <View style={{ flex: 1 }}>
                    <ScrollView style={{ flex: 1 }}>
                        <Spinner
                            color={"#9F9FA2"}
                            visible={Catprocess || imgPrs || ordersprocess}
                            textContent={constants[lang].static.pleasewait}
                            textStyle={{ color: '#FFF' }}
                        />
                        {page == "home" &&
                            <View style={styles.main}>
                                <View style={styles.firstCol}>
                                    <View>
                                        <SearchInput cross={false} value={search} placeholder={constants[lang].static.lfs} onChangeText={(e) => { setSearch(e); registerKey(e) }} />
                                    </View>
                                    {!props.user.loggedin &&
                                        <View style={{ marginTop: 20 }}>
                                            <View style={{
                                                backgroundColor: '#E6E7E6',
                                                padding: 10,
                                                paddingLeft: 60,
                                                paddingRight: 30,
                                                borderRadius: 50,
                                                position: 'relative'
                                            }}>
                                                <RegularText>{constants[lang].static.cyistyco}</RegularText>
                                                <AntDesign style={{
                                                    position: 'absolute',
                                                    left: 20,
                                                    top: 18
                                                }} name="exclamationcircleo" size={24} color="#3F3F46" />
                                            </View>
                                        </View>
                                    }
                                </View>
                                <View style={styles.secondCol}>
                                    <View>
                                        <SliderBox
                                            images={banners.map((e) => e.media.fileUrl)}
                                            sliderBoxHeight={200}
                                            dotColor="#FFEE58"
                                            inactiveDotColor="#90A4AE"
                                            paginationBoxVerticalPadding={20}
                                            autoplay
                                            circleLoop
                                            resizeMethod={'resize'}
                                            resizeMode={'cover'}
                                            paginationBoxStyle={{
                                                position: "absolute",
                                                bottom: 0,
                                                padding: 0,
                                                alignItems: "center",
                                                alignSelf: "center",
                                                justifyContent: "center",
                                                paddingVertical: 10
                                            }}
                                            dotStyle={{
                                                width: 10,
                                                height: 10,
                                                borderRadius: 5,
                                                marginHorizontal: 0,
                                                padding: 0,
                                                margin: 0,
                                                backgroundColor: "rgba(128, 128, 128, 0.92)"
                                            }}
                                            ImageComponentStyle={{ borderRadius: 15, width: '97%', marginTop: 5 }}
                                            imageLoadingColor="#2196F3"
                                        />
                                    </View>
                                </View>
                                <View style={styles.thirdCol}>
                                    {/* Favorites */}
                                    {favData.length > 0 &&
                                        <View style={{ marginBottom: 52 }}>
                                            <View style={{
                                                flexDirection: 'row',
                                                justifyContent: 'space-between'
                                            }}>
                                                <TitleText title={constants[lang].static.favCap} />
                                                <SmallButton onPress={() => { props.navigation.navigate('Favorites', { from: 'Home', page: '0' }); }} title={constants[lang].static.viewAll} />
                                            </View>
                                            <View style={{ flexDirection: 'row', marginTop: 30 }}>
                                                {favData.slice(0, 3).map((item, ind) =>
                                                    <View key={`fav-${ind}`} style={{ width: '35%', paddingRight: 17 }}>
                                                        <ProductBox
                                                            onPress={() => { props.navigation.navigate('ProductDetails', { ...item.prodId, from: 'Home', val: search }); }}
                                                            img={item.prodId.mainImage != null ? item.prodId.mainImage.fileUrl : img}
                                                            mrp={item.prodId.price}
                                                            salePrice={item.prodId.salePrice}
                                                            name={lang === 'ar' ? item.prodId.arabicName : item.prodId.name}
                                                        />
                                                    </View>
                                                )}
                                            </View>
                                        </View>
                                    }
                                    {/* Buy Again */}
                                    {buyAgain.length > 0 &&
                                        <View style={{}}>
                                            <View style={{
                                                flexDirection: 'row',
                                                justifyContent: 'space-between'
                                            }}>
                                                <TitleText title={constants[lang].static.buyagaincap} />
                                                <SmallButton onPress={() => { props.navigation.navigate('Favorites', { from: 'Home', page: '1' }); }} title={constants[lang].static.viewAll} />
                                            </View>
                                            <View style={{ flexDirection: 'row', marginTop: 30 }}>
                                                {buyAgain.slice(0, 3).map((item, ind) =>
                                                    <View key={`fav-${ind}`} style={{ width: '35%', paddingRight: 17 }}>
                                                        <ProductBox
                                                            onPress={() => { props.navigation.navigate('ProductDetails', { ...item, from: 'Home', val: search }); }}
                                                            img={item.mainImage != null ? item.mainImage.fileUrl : img}
                                                            mrp={item.price}
                                                            salePrice={item.salePrice}
                                                            name={lang === 'ar' ? item.arabicName : item.name}
                                                        />
                                                    </View>
                                                )}
                                            </View>
                                        </View>
                                    }
                                    {/* Categories */}
                                    <View style={{ marginTop: 52 }}>
                                        <View style={{
                                            flexDirection: 'row',
                                            justifyContent: 'space-between'
                                        }}>
                                            <TitleText title={constants[lang].static.categor} />
                                        </View>
                                        <View style={{ flexDirection: 'row', marginTop: 30 }}>
                                            <FlatList
                                                data={CatData.filter((e) => e.isTopCategory)}
                                                renderItem={({ item }) => <View style={{ flex: 1, marginRight: 17, marginBottom: 15 }}><ProductBox onPress={() => { props.navigation.navigate('Categories', { cat: item }); }} isCategory={true} img={item.mainImage ? item.mainImage.mediumUrl : img} name={lang === 'ar' ? item.arabicName : item.name} /></View>}
                                                keyExtractor={item => item._id}
                                                numColumns={2}
                                                columnWrapperStyle={{
                                                    flex: 1,
                                                    // justifyContent: "space-around"
                                                }}
                                            />
                                        </View>
                                        <View style={{ flexDirection: 'row', marginTop: 20 }}>
                                            <FlatList
                                                data={CatData.filter((e) => !e.isTopCategory)}
                                                renderItem={({ item }) => <View style={{ flex: 0.5, marginRight: 17, marginBottom: 15 }}><ProductBox onPress={() => { props.navigation.navigate('Categories', { cat: item }); }} isCategory={true} img={item.mainImage ? item.mainImage.mediumUrl : img} name={lang === 'ar' ? item.arabicName : item.name} /></View>}
                                                keyExtractor={item => item._id}
                                                numColumns={4}
                                                columnWrapperStyle={{
                                                    flex: 1,
                                                    justifyContent: "space-around"
                                                }}
                                            />
                                        </View>
                                    </View>

                                    <View style={{
                                        marginTop: 15,
                                        marginBottom: 50,
                                        padding: 10,
                                        backgroundColor: '#C9C7F2',
                                        borderRadius: 50,
                                        justifyContent: 'space-between',
                                        flexDirection: 'row',
                                    }}>
                                        <RegularText styles={{ fontSize: 14 }}>
                                            {constants[lang].static.dyhaso}
                                        </RegularText >
                                        <LinkText onPress={() => {
                                            sendSpecialProds();
                                        }} styles={{ fontSize: 14, paddingTop: 5, paddingRight: 20 }}>{constants[lang].static.clickHere}</LinkText>
                                    </View>
                                </View>
                            </View>
                        }
                    </ScrollView>
                    {specialProd ?
                        <View style={{
                            width: Dimensions.get('screen').width,
                            // height: Dimensions.get('screen').height / 1.5,
                            backgroundColor: 'white',
                            borderTopRightRadius: 15,
                            borderTopLeftRadius: 15,
                            borderWidth: 1,
                            borderColor: 'grey',
                            padding: 23,
                            position: 'absolute',
                            bottom: 0,
                        }}>
                            <View style={{ flex: 1, position: 'absolute', right: 10, top: 10 }}>
                                <TouchableOpacity onPress={() => { setSpecialProd(false) }}>
                                    <AntDesign name="closecircle" size={24} color="black" />
                                </TouchableOpacity>
                            </View>
                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <TitleText title={constants[lang].static.etsp}></TitleText>
                                <TitleText styles={{ marginTop: 15 }} title={constants[lang].static.information}></TitleText>
                            </View>
                            <View>
                                <Floatinginput
                                    changetext={(e) => { prodNameValidator(e) }}
                                    onEndEditing={(e) => { prodNameValidator(e.nativeEvent.text, true); }}
                                    autoCapitalize='none'
                                    autoCorrect={false}
                                    label={constants[lang].static.productname}>
                                </Floatinginput>
                            </View>
                            <View style={{ height: 20 }}>
                                {(formstate.prodNameTch && formstate.prodNameErr) ? <Errortext>{formstate.prodNameErrMsg}</Errortext> : null}
                            </View>
                            <View style={{
                                flexDirection: 'row',
                            }}>
                                <View style={{ flex: 1, marginRight: 10 }}>
                                    <View>
                                        <Floatinginput
                                            changetext={(e) => { QtyValidator(e) }}
                                            onEndEditing={(e) => { QtyValidator(e.nativeEvent.text, true); }}
                                            autoCapitalize='none'
                                            autoCorrect={false}
                                            label={constants[lang].static.quantity}>
                                        </Floatinginput>
                                    </View>
                                    <View style={{ height: 20 }}>
                                        {(formstate.QtyTch && formstate.QtyErr) ? <Errortext>{formstate.QtyErrMsg}  </Errortext> : null}
                                    </View>
                                </View>
                                <View style={{ flex: 1, marginLeft: 10 }}>
                                    <View>
                                        <Floatinginput
                                            changetext={(e) => { PriceValidator(e) }}
                                            onEndEditing={(e) => { PriceValidator(e.nativeEvent.text, true); }}
                                            autoCapitalize='none'
                                            autoCorrect={false}
                                            label={constants[lang].static.expprc}>
                                        </Floatinginput>
                                    </View>
                                    <View style={{ height: 20 }}>
                                        {(formstate.PriceTch && formstate.PriceErr) ? <Errortext>{formstate.PriceErrMsg}  </Errortext> : null}
                                    </View>
                                </View>
                            </View>
                            <View>
                                <Floatinginput
                                    changetext={(e) => { descValidator(e) }}
                                    onEndEditing={(e) => { descValidator(e.nativeEvent.text, true); }}
                                    autoCapitalize='none'
                                    autoCorrect={false}
                                    label={constants[lang].static.description}>
                                </Floatinginput>
                            </View>
                            <View style={{ height: 20 }}>
                                {(formstate.descTch && formstate.descErr) ? <Errortext>{formstate.descErrMsg}</Errortext> : null}
                            </View>
                            <View style={{ marginLeft: 22, marginTop: 10, flexDirection: 'row' }}>
                                {images.map((img, index) =>
                                    <View key={index} style={{ marginRight: 20, width: 45, height: 38, position: 'relative' }}>
                                        <Image style={{ width: 45, height: 28 }} source={{ uri: img.uri }} />
                                        <View style={{ flex: 1, position: 'absolute', right: -15, top: -15 }}>
                                            <TouchableOpacity onPress={() => { setImages(images.filter((e, i) => i != index)) }} style={{ opacity: 0.5 }}>
                                                <AntDesign name="closecircle" size={24} color="black" />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                )}
                            </View>
                            <View style={{ marginTop: 10 }}>
                                <SecondaryBtn Txtstyle={{ fontSize: 16, paddingBottom: 0 }} disabled={images.length == 5} onPress={() => { verifyPermissions() }} iscamara={true} title={constants[lang].static.uapdo} />
                            </View>
                            <View style={{ marginTop: 15 }}>
                                <PrimaryButton disabled={formstate.prodNameErr || formstate.QtyErr || formstate.PriceErr || formstate.descErr} onPress={() => { submit() }} title={constants[lang].static.send}></PrimaryButton>
                            </View>
                        </View>
                        : null}
                </View>
            </React.Fragment>
        </TouchableWithoutFeedback>
    );
}



const styles = StyleSheet.create({
    main: {
        backgroundColor: '#fff',
        minHeight: Dimensions.get('screen').height
    },
    firstCol: {
        marginTop: 30,
        marginHorizontal: 23,
    },
    secondCol: {
        marginTop: 20
    },
    thirdCol: {
        marginTop: 50,
        marginHorizontal: 23,
    }
});


const mapStateToProps = (state) => ({
    cat: state.category,
    lang: state.common.lang ? state.common.lang : 'en',
    fav: state.fav,
    user: state.user,
    order: state.order,
    bannersProp: state.banners
});


const mapDispatchToProps = dispatch => ({
    callCat: () => { dispatch(GetCategories()) },
    getFavs: () => { dispatch(GetFavForUser()) },
    sendSplOrd: (body, done) => { dispatch(sendSpecialOrder(body, done)) },
    uploadStorImages: (body, done) => { dispatch(uploadStoredoc(body, done)) },
    fetBuyAgainOrdersFn: () => { dispatch(getBuyagain()) },
    getBannersFn: () => { dispatch(getBanners()) }
});
export default connect(mapStateToProps, mapDispatchToProps)(Home);
