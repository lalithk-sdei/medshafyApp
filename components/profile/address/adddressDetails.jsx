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
import { addAddress } from '../../../dataStore/actions/address';

const AddressDetails = (props) => {
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
        addrTch: false, addr2Err: true, addrErrMsg: "", addrVal: "",
        phTch: false, phErr: true, phErrMsg: "", phVal: "",
    });
    const feild1 = (e = null, tch = false) => {
        const { lang } = props;
        if (["", null, undefined].includes(e)) {
            setFormState({ ...formstate, feild1Err: true, feild1ErrMsg: constants[lang].errors.fulladdr, feild1Val: e, ...tch && { feild1Tch: true } });
        } else {
            setFormState({ ...formstate, feild1Err: false, feild1ErrMsg: '', feild1Val: e, ...tch && { feild1Tch: true } });
        }
    }

    const feild2 = (e = null, tch = false) => {
        const { lang } = props;
        if (["", null, undefined].includes(e)) {
            setFormState({ ...formstate, feild2Err: true, feild2ErrMsg: constants[lang].errors.namereq, feild2Val: e, ...tch && { feild2Tch: true } });
        } else {
            setFormState({ ...formstate, feild2Err: false, feild2ErrMsg: '', feild2Val: e, ...tch && { feild2Tch: true } });
        }
    }
    const mobilealdator = (e = null, tch = false) => {
        const { lang } = props;
        if (["", null, undefined].includes(e)) {
            setFormState({ ...formstate, phErr: true, phErrMsg: constants[lang].errors.phonereq, phVal: e, ...tch && { phTch: true } });
        } else if (`${e}`.length != 10) {
            setFormState({ ...formstate, phErr: true, phErrMsg: constants[lang].errors.phoneinvalid, phVal: e, ...tch && { phTch: true } });
        } else {
            setFormState({ ...formstate, phErr: false, phErrMsg: '', phVal: e, ...tch && { phTch: true } });
        }
    }

    const saveAddress = () => {
        const { latitude, longitude, filed1, feild2 } = props.route.params;
        props.addAddressFn({
            lat: latitude,
            longitude: longitude,
            address: filed1,
            completeAddress: formstate.feild1Val,
            addressline1: feild2,
            name: formstate.feild2Val,
            mobileno: formstate.phVal,
        }, (st) => {
            if (st) {
                props.navigation.navigate('MyAddress');
            } else {
                setTimeout(() => {
                    Alert.alert(
                        'Failed',
                        "We coudn't add address please try after sometime.",
                        [
                            { text: 'ok', onPress: () => { } },
                        ],
                    );
                }, 100);
            }
        });
    }
    React.useEffect(() => {
        setLocation(props.route.params);
        setTimeout(() => {
            setMapLoaded(true);
        }, 20);
    }, []);
    const { addressprocess } = props.address;
    return (
        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss(); }}>
            <React.Fragment>
                <View style={{ flex: 1 }}>
                    <Spinner
                        color={"#9F9FA2"}
                        visible={isloding || addressprocess}
                        textContent={'Please wait...'}
                        textStyle={{ color: '#FFF' }}
                    />
                    <View style={{ flex: 1 }}>
                        <View style={styles.tophead}>
                            <View style={{ flex: 1 }}><Ionicons onPress={() => { props.navigation.navigate('ConfrimLocation'); }} name="arrow-back" size={24} color="black" /></View>
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
                                                    {/* <Marker
                                                        draggable
                                                        coordinate={location}
                                                        onDragEnd={(e) => {
                                                            setLocation({ ...location, ...e.nativeEvent.coordinate });
                                                            setMapLoaded(false);
                                                            setTimeout(() => { setMapLoaded(true); }, 20);
                                                            updateLocation(e.nativeEvent.coordinate)
                                                        }}
                                                    /> */}
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
                                                        changetext={(e) => { feild1(e) }}
                                                        onEndEditing={(e) => { feild1(e.nativeEvent.text, true); }}
                                                        onChangeText={(e) => { }}
                                                        blurOnSubmit
                                                        autoCapitalize='none'
                                                        autoCorrect={false}
                                                        label='Complete Address'>
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
                                                        label='Name'>
                                                    </Floatinginput>
                                                </View>
                                                <View style={{ height: 20 }}>
                                                    {(formstate.feild2Tch && formstate.feild2ErrMsg) ?
                                                        <Errortext>{formstate.feild2ErrMsg}</Errortext> : null
                                                    }
                                                </View>
                                                <View>
                                                    <Floatinginput
                                                        changetext={(e) => { mobilealdator(e) }}
                                                        onEndEditing={(e) => { mobilealdator(e.nativeEvent.text, true); }}
                                                        blurOnSubmit
                                                        autoCapitalize='none'
                                                        keyboardType={'phone-pad'}
                                                        autoCorrect={false}
                                                        maxLength={10}
                                                        label='Mobile Number'>
                                                    </Floatinginput>
                                                </View>
                                                <View style={{ height: 20 }}>
                                                    {(formstate.phTch && formstate.phErr) && <Errortext>{formstate.phErrMsg}  </Errortext>}
                                                </View>
                                                <View>
                                                    <PrimaryButton onPress={() => { saveAddress() }} disabled={formstate.feild1Err || formstate.feild2Err || formstate.phErr} title={"Save Address"}></PrimaryButton>
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
    lang: state.common.lang,
    address: state.address
});


const mapDispatchToProps = dispatch => ({
    addAddressFn: (bdy, done) => { dispatch(addAddress(bdy, done)) },
});
export default connect(mapStateToProps, mapDispatchToProps)(AddressDetails);
