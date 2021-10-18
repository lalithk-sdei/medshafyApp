import * as React from 'react';
import { Platform, View, Image, StyleSheet, Dimensions, TouchableWithoutFeedback, Keyboard, ScrollView, Alert, BackHandler, TouchableHighlight, FlatList, Button, Text } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { connect } from 'react-redux';
import { LogBox } from 'react-native';
import { RESET_DATA, SET_LOGOUT } from '../../../dataStore/types/types';
import TitleText from '../../common/elements/TitleText';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import SecondaryBtn from '../../common/elements/secondaryButton';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import LightText from '../../common/elements/lightText';
import RegularText from '../../common/elements/regulartext';
import PrimaryButton from '../../common/elements/primaryButton';
import MapView from 'react-native-maps';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import { Marker } from 'react-native-maps';
import Floatinginput from '../../common/elements/floatinginput';
import { constants } from '../../../utlits/constants';
import Errortext from '../../common/elements/errorText';

const ConfrimLocation = (props) => {
    const [maploaded, setMapLoaded] = React.useState(false);
    const [location, setLocation] = React.useState({
        latitudeDelta: 0.1929,
        longitudeDelta: 0.0521,
    });
    const [errorMsg, setErrorMsg] = React.useState(null);
    const [address, setAddress] = React.useState(null);
    const [isloding, setIsloading] = React.useState(false);


    const [formstate, setFormState] = React.useState({
        feild1Tch: false, feild1Err: true, feild1ErrMsg: "", feild1Val: "",
        feild2Tch: false, feild2Err: true, feild2ErrMsg: "", feild2Val: "",
    });
    const feild1 = (e = null, tch = false) => {
        const { lang } = props;
        if (["", null, undefined].includes(e)) {
            setFormState({ ...formstate, feild1Err: true, feild1ErrMsg: constants[lang].errors.companyNamereq, feild1Val: e, ...tch && { feild1Tch: true } });
        } else {
            setFormState({ ...formstate, feild1Err: false, feild1ErrMsg: '', feild1Val: e, ...tch && { feild1Tch: true } });
            if (tch) {
                getLatLongonAddress(e);
            }
        }
    }

    const feild2 = (e = null, tch = false) => {
        setFormState({ ...formstate, feild2Err: false, feild2ErrMsg: '', feild2Val: e, ...tch && { feild2Tch: true } });
    }

    const getLatLongonAddress = async (val) => {
        try {
            setIsloading(true);
            if (Platform.OS === 'android' && !Constants.isDevice) {
                setErrorMsg(
                    'Oops, this will not work on Snack in an Android emulator. Try it on your device!'
                );
                setIsloading(false);
                return;
            }
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                setIsloading(false);
                return;
            }
            let loc = await Location.geocodeAsync(val);
            console.log(loc);
            if (loc.length > 0) {
                setLocation({ ...location, ...loc[0] });
                setMapLoaded(false);
                setTimeout(() => { setMapLoaded(true); }, 20);
            }
            setIsloading(false);
        } catch (e) {
            setIsloading(false);
        }
    }

    const updateLocation = async (cords) => {
        try {
            setIsloading(true);
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                setIsloading(false);
                return;
            }
            let addr = await Location.reverseGeocodeAsync(cords);
            if (addr.length > 0) {
                const addr1 = addr[0];
                const adrstring = ` ${addr1.name ? addr1.name + ' ' : ''}${addr1.street ? addr1.street + ' ' : ''}${addr1.city ? addr1.city + ' ' : ''}${addr1.country ? addr1.country + ' ' : ''}${addr1.postalCode ? addr1.postalCode : ''}`;
                feild1(adrstring)
            }
            setIsloading(false);
        } catch (e) {
            setIsloading(false);
        }

    }

    const loadMap = async () => {
        try {
            setIsloading(true);
            if (Platform.OS === 'android' && !Constants.isDevice) {
                setErrorMsg(
                    'Oops, this will not work on Snack in an Android emulator. Try it on your device!'
                );
                setIsloading(false);
                return;
            }
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                setIsloading(false);
                return;
            }

            let loc = await Location.getCurrentPositionAsync({});
            setLocation({ ...location, ...loc.coords });
            setMapLoaded(false);
            setTimeout(() => { setMapLoaded(true); }, 20);
            setMapLoaded(true);
            let addr = await Location.reverseGeocodeAsync(loc.coords);
            if (addr.length > 0) {
                const addr1 = addr[0];
                const adrstring = ` ${addr1.name && addr1.name + ' '}${addr1.street && addr1.street + ' '}${addr1.city && addr1.city + ' '}${addr1.country && addr1.country + ' '}${addr1.postalCode && addr1.postalCode}`;
                feild1(adrstring)
            }
            setIsloading(false);
        } catch (e) {
            setIsloading(false);
        }
    }

    React.useEffect(() => {
        loadMap();
    }, []);
    return (
        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss(); }}>
            <React.Fragment>
                <View style={{ flex: 1 }}>
                    <Spinner
                        color={"#9F9FA2"}
                        visible={isloding}
                        textContent={'Please wait...'}
                        textStyle={{ color: '#FFF' }}
                    />
                    <View style={{ flex: 1 }}>
                        <View style={styles.tophead}>
                            <View style={{ flex: 1 }}><Ionicons onPress={() => { props.navigation.navigate('MyAddress'); }} name="arrow-back" size={24} color="black" /></View>
                            <View style={{ flex: 7, alignItems: 'center' }}><TitleText title="Add New Address" /></View>
                            <View style={{ flex: 1 }}></View>
                        </View>
                        {/* <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}> */}
                        <View>
                            <View style={{
                                flexDirection: 'row',
                            }}>
                                <View style={{
                                    flexDirection: 'column',
                                    position: 'relative'
                                }}>
                                    {maploaded ?
                                        <React.Fragment>
                                            <View style={{}}>
                                                <MapView
                                                    initialRegion={location}
                                                    style={{
                                                        width: Dimensions.get('screen').width,
                                                        height: '90%',
                                                    }} >
                                                    <Marker
                                                        draggable
                                                        coordinate={location}
                                                        onDragEnd={(e) => {
                                                            setLocation({ ...location, ...e.nativeEvent.coordinate });
                                                            setMapLoaded(false);
                                                            setTimeout(() => { setMapLoaded(true); }, 20);
                                                            updateLocation(e.nativeEvent.coordinate)
                                                        }}
                                                    />
                                                </MapView>
                                            </View>
                                            <View style={{
                                                backgroundColor: 'white',
                                                padding: 30,
                                                position: 'absolute',
                                                width: '100%',
                                                bottom: -30,
                                                borderTopLeftRadius: 10,
                                                borderTopRightRadius: 10,
                                                borderTopColor: '#00000029'
                                            }}>
                                                <View>
                                                    <Floatinginput
                                                        liftUp={true}
                                                        value={formstate.feild1Val}
                                                        currLocationFn={() => { loadMap(); }}
                                                        location={true}
                                                        changetext={(e) => { feild1(e) }}
                                                        onEndEditing={(e) => { feild1(e.nativeEvent.text, true); }}
                                                        onChangeText={(e) => { }}
                                                        blurOnSubmit
                                                        autoCapitalize='none'
                                                        autoCorrect={false}
                                                        label='Select Delivery Location'>
                                                    </Floatinginput>
                                                </View>
                                                <View style={{ height: 20 }}>
                                                    {(formstate.feild1Tch && formstate.feild1ErrMsg) ?
                                                        <Errortext>{formstate.feild1ErrMsg}</Errortext> : null
                                                    }
                                                </View>
                                                <View>
                                                    <Floatinginput
                                                        changetext={(e) => { feild2(e) }}
                                                        onEndEditing={(e) => { feild2(e.nativeEvent.text, true); }}
                                                        onChangeText={(e) => { }}
                                                        blurOnSubmit
                                                        autoCapitalize='none'
                                                        autoCorrect={false}
                                                        label='Address line (Optional)'>
                                                    </Floatinginput>
                                                </View>
                                                <View style={{ height: 20 }}>
                                                    {/* {(formstate.feild2Tch && formstate.feild2ErrMsg) && <Errortext>{formstate.feild2ErrMsg}</Errortext>} */}
                                                </View>
                                                <View>
                                                    {/* AddressDetails */}
                                                    <PrimaryButton onPress={() => {
                                                        props.navigation.navigate('AddressDetails', { ...location, filed1: formstate.feild1Val, feild2: formstate.feild2Val });
                                                    }} disabled={formstate.feild1Err} title={"Confirm Location"}></PrimaryButton>
                                                </View>
                                            </View>
                                        </React.Fragment> : null
                                    }
                                </View>
                            </View>
                        </View>
                        {/* </ScrollView> */}
                    </View>
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
    tophead: {
        paddingHorizontal: 23,
        flexDirection: 'row',
        // textAlign: 'center',
        // alignItems: 'center',
        // justifyContent: 'center',
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
        padding: 23,
        marginBottom: 20,
        flexDirection: 'column'
    },
    cardClm: {
        flexDirection: 'row',
        marginBottom: 15
    },

});


const mapStateToProps = (state) => ({
    user: state.user,
    lang: state.common.lang
});


const mapDispatchToProps = dispatch => ({
    logoutFn: () => { dispatch({ type: SET_LOGOUT }) },
    resetAll: () => { dispatch({ type: RESET_DATA }) }
});
export default connect(mapStateToProps, mapDispatchToProps)(ConfrimLocation);
