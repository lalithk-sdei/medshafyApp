import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, TouchableWithoutFeedback, Keyboard, ScrollView, Alert, BackHandler, TouchableHighlight, FlatList } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { connect } from 'react-redux';
import SearchInput from '../common/elements/searchInput';
import RegularText from '../common/elements/regulartext';
import { AntDesign } from '@expo/vector-icons';
import { SliderBox } from "react-native-image-slider-box";
import TitleText from '../common/elements/TitleText';
import SmallButton from '../common/elements/samllButton';
import ProductBox from '../common/elements/productBox';
import { GetCategories } from '../../dataStore/actions/category';
import { LogBox } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { GetFavForUser } from '../../dataStore/actions/fav';
import { useIsFocused } from "@react-navigation/native";
const Home = (props) => {

    const isFocused = useIsFocused();

    const [page, setpage] = React.useState("home");
    const [fn, setFn] = React.useState();
    const [search, setSearch] = React.useState("");
    const [banners, setbanners] = React.useState([
        'https://i.ibb.co/W32fQwF/Screenshot-2021-10-03-at-2-05-40-AM.png',
        'https://i.ibb.co/ncXVCBt/Screenshot-2021-10-03-at-7-49-30-PM.png',
        'https://i.ibb.co/W32fQwF/Screenshot-2021-10-03-at-2-05-40-AM.png',
        'https://i.ibb.co/ncXVCBt/Screenshot-2021-10-03-at-7-49-30-PM.png',
    ]);

    const img = "https://gcdn.pbrd.co/images/grEHL3gquLuy.png";
    const { Catprocess, CatStatus, CatData, } = props.cat;
    const { favprocess, favStatus, favData, } = props.fav;
    const [time, setTime] = React.useState(null);
    const registerKey = (val) => {
        clearTimeout(time);
        setTime(setTimeout(() => {
            if (search) {
                props.navigation.navigate('searchpage', { val });
            }
        }, 500));
    }
    React.useEffect(() => {
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
        props.callCat();
        BackHandler.addEventListener('hardwareBackPress', (e) => {
            setSearch("");
        });

        if (isFocused) {
            if (props.user.loggedin) {
                props.getFavs();
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
                            visible={Catprocess || favprocess}
                            textContent={'Please wait...'}
                            textStyle={{ color: '#FFF' }}
                        />
                        {page == "home" &&
                            <View style={styles.main}>
                                <View style={styles.firstCol}>
                                    <View>
                                        <SearchInput cross={false} value={search} placeholder="Looking for something" onChangeText={(e) => { setSearch(e); registerKey(e) }} />
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
                                                <RegularText>Complete your information so that you can order</RegularText>
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
                                            images={banners}
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
                                                <TitleText title={"FAVOURITES"} />
                                                <SmallButton onPress={() => { props.navigation.navigate('Favorites', { from: 'home', page: '0' }); }} title={"VIEW ALL"} />
                                            </View>
                                            <View style={{ flexDirection: 'row', marginTop: 30 }}>
                                                {favData.slice(0, 3).map((item, ind) =>
                                                    <View key={`fav-${ind}`} style={{ width: '35%', paddingRight: 17 }}><ProductBox img={item.mainImage ? img : img} mrp={item.prodId.price} salePrice={item.prodId.salePrice} name={item.prodId.name} /></View>
                                                )}
                                            </View>
                                        </View>
                                    }
                                    {/* Buy Again */}
                                    <View style={{}}>
                                        <View style={{
                                            flexDirection: 'row',
                                            justifyContent: 'space-between'
                                        }}>
                                            <TitleText title={"BUY AGAIN"} />
                                            <SmallButton onPress={() => { props.navigation.navigate('Favorites', { from: 'home', page: '1' }); }} title={"VIEW ALL"} />
                                        </View>
                                        <View style={{ flexDirection: 'row', marginTop: 30 }}>
                                            <View style={{ flex: 1, marginRight: 17 }}><ProductBox img={img} mrp={400} salePrice={400} name={"Fabric Masks"} /></View>
                                            <View style={{ flex: 1, marginRight: 17 }}><ProductBox img={img} mrp={600} salePrice={600} name={"Fabric Masks"} /></View>
                                            <View style={{ flex: 1 }}><ProductBox img={img} mrp={1100} salePrice={900} name={"Fabric Masks"} /></View>
                                        </View>
                                    </View>
                                    {/* Categories */}
                                    <View style={{ marginTop: 52, marginBottom: 50 }}>
                                        <View style={{
                                            flexDirection: 'row',
                                            justifyContent: 'space-between'
                                        }}>
                                            <TitleText title={"CATEGORIES"} />
                                        </View>
                                        <View style={{ flexDirection: 'row', marginTop: 30 }}>
                                            <FlatList
                                                data={CatData.filter((e) => e.isTopCategory)}
                                                renderItem={({ item }) => <View style={{ flex: 1, marginRight: 17, marginBottom: 15 }}><ProductBox onPress={() => { props.navigation.navigate('Categories', { cat: item }); }} isCategory={true} img={item.mainImage ? item.mainImage.mediumUrl : img} name={item.name} /></View>}
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
                                                renderItem={({ item }) => <View style={{ flex: 0.5, marginRight: 17, marginBottom: 15 }}><ProductBox onPress={() => { props.navigation.navigate('Categories', { cat: item }); }} isCategory={true} img={item.mainImage ? item.mainImage.mediumUrl : img} name={item.name} /></View>}
                                                keyExtractor={item => item._id}
                                                numColumns={4}
                                                columnWrapperStyle={{
                                                    flex: 1,
                                                    justifyContent: "space-around"
                                                }}
                                            />
                                        </View>
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
    fav: state.fav,
    user: state.user
});


const mapDispatchToProps = dispatch => ({
    callCat: () => { dispatch(GetCategories()) },
    getFavs: () => { dispatch(GetFavForUser()) },
});
export default connect(mapStateToProps, mapDispatchToProps)(Home);
