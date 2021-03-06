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
import { addAddress, updateAddress } from '../../../dataStore/actions/address';

const EditAddress = (props) => {
    const [isloding, setIsloading] = React.useState(false);
    const { lat, longitude, address, completeAddress, addressline1, name, mobileno, _id } = props.route.params;
    const [formstate, setFormState] = React.useState({
        NameTch: true, NameErr: false, NameErrMsg: "", NameVal: name,
        addrTch: true, addrErr: false, addrErrMsg: "", addrVal: address,
        phTch: true, phErr: false, phErrMsg: "", phVal: mobileno,
    });
    const { lang } = props;
    const Name = (e = null, tch = false) => {

        if (["", null, undefined].includes(e)) {
            setFormState({ ...formstate, NameErr: true, NameErrMsg: constants[lang].errors.namereq, NameVal: e, ...tch && { NameTch: true } });
        } else {
            setFormState({ ...formstate, NameErr: false, NameErrMsg: '', NameVal: e, ...tch && { NameTch: true } });
        }
    }

    const addr = (e = null, tch = false) => {

        if (["", null, undefined].includes(e)) {
            setFormState({ ...formstate, addrErr: true, addrErrMsg: constants[lang].errors.addrReq, addrVal: e, ...tch && { addrTch: true } });
        } else {
            setFormState({ ...formstate, addrErr: false, addrErrMsg: '', addrVal: e, ...tch && { addrTch: true } });
        }
    }
    const mobilealdator = (e = null, tch = false) => {

        if (["", null, undefined].includes(e)) {
            setFormState({ ...formstate, phErr: true, phErrMsg: constants[lang].errors.phonereq, phVal: e, ...tch && { phTch: true } });
        } else if (`${e}`.length != 10) {
            setFormState({ ...formstate, phErr: true, phErrMsg: constants[lang].errors.phoneinvalid, phVal: e, ...tch && { phTch: true } });
        } else {
            setFormState({ ...formstate, phErr: false, phErrMsg: '', phVal: e, ...tch && { phTch: true } });
        }
    }


    const saveAddress = () => {
        props.updateAddressFn({
            lat: lat,
            longitude: longitude,
            address: formstate.addrVal,
            completeAddress: completeAddress,
            addressline1: addressline1,
            name: formstate.NameVal,
            mobileno: formstate.phVal,
            _id: _id
        }, (st) => {
            if (st) {
                props.navigation.navigate('MyAddress');
            } else {
                setTimeout(() => {
                    Alert.alert(
                        constants[lang].errors.failed,
                        constants[lang].errors.wcaaptas,
                        [
                            { text: constants[lang].errors.ok, onPress: () => { } },
                        ],
                    );
                }, 100);
            }
        });
    }
    React.useEffect(() => {
        const { address = "", name = "", mobileno = "" } = props.route.params;
        // addr(address, true);
        // Name(name, true);
        // mobilealdator(mobileno, true);
    }, []);
    const { addressprocess } = props.address;
    return (
        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss(); }}>
            <React.Fragment>
                <View style={{ flex: 1 }}>
                    <Spinner
                        color={"#9F9FA2"}
                        visible={isloding || addressprocess}
                        textContent={constants[lang].static.pleasewait}
                        textStyle={{ color: '#FFF' }}
                    />
                    <View style={{ flex: 1 }}>
                        <View style={styles.tophead}>
                            <View style={{ flex: 1 }}><Ionicons onPress={() => { props.navigation.navigate('MyAddress'); }} name="arrow-back" size={24} color="black" /></View>
                            <View style={{ flex: 7, alignItems: 'center' }}><TitleText title={constants[lang].static.anaddr} /></View>
                            <View style={{ flex: 1 }}></View>
                        </View>
                        <View>
                            <View style={{
                                margin: 20
                            }}>
                                <View style={{ flexDirection: 'column' }}>
                                    <View >
                                        <View>
                                            <Floatinginput
                                                liftUp={true}
                                                value={formstate.NameVal}
                                                changetext={(e) => { Name(e) }}
                                                onEndEditing={(e) => { Name(e.nativeEvent.text, true); }}
                                                onChangeText={(e) => { }}
                                                blurOnSubmit
                                                autoCapitalize='none'
                                                autoCorrect={false}
                                                label={constants[lang].static.name}>
                                            </Floatinginput>
                                        </View>
                                        <View style={{ height: 20 }}>
                                            {(formstate.NameTch && formstate.NameErrMsg) ?
                                                <Errortext>{formstate.NameErrMsg}</Errortext> : null
                                            }
                                        </View>
                                        <View style={{
                                            marginTop: 5,
                                            flexDirection: 'row'
                                        }}>
                                            <View style={{ flex: 1 }}>
                                                <View style={{
                                                    marginHorizontal: 10,
                                                    marginTop: 34,
                                                    borderColor: '#A8A8AB',
                                                    borderBottomWidth: 2
                                                }} >
                                                    <View style={{
                                                        flexDirection: 'row'
                                                    }}>
                                                        <Text style={{
                                                            paddingBottom: 7,
                                                            fontSize: 18,
                                                            fontFamily: 'QuasimodaMedium',
                                                        }}>+966</Text>
                                                    </View>
                                                </View>
                                            </View>
                                            <View style={{ flex: 4 }} >
                                                <View>
                                                    <Floatinginput
                                                        liftUp={true}
                                                        value={formstate.phVal}
                                                        changetext={(e) => { mobilealdator(e) }}
                                                        onEndEditing={(e) => { mobilealdator(e.nativeEvent.text, true); }}
                                                        blurOnSubmit
                                                        autoCapitalize='none'
                                                        keyboardType={'phone-pad'}
                                                        autoCorrect={false}
                                                        maxLength={10}
                                                        label={constants[lang].static.mobileno}>
                                                    </Floatinginput>
                                                </View>
                                                <View style={{ height: 20 }}>
                                                    {(formstate.phTch && formstate.phErr) && <Errortext>{formstate.phErrMsg}  </Errortext>}
                                                </View>
                                            </View>
                                        </View>
                                        <View>
                                            <Floatinginput
                                                liftUp={true}
                                                value={formstate.addrVal}
                                                changetext={(e) => { addr(e) }}
                                                onEndEditing={(e) => { addr(e.nativeEvent.text, true); }}
                                                onChangeText={(e) => { }}
                                                blurOnSubmit
                                                autoCapitalize='none'
                                                autoCorrect={false}
                                                label={constants[lang].static.Address}>
                                            </Floatinginput>
                                        </View>
                                        <View style={{ height: 20 }}>
                                            {(formstate.addrErr && formstate.addrErrMsg) ?
                                                <Errortext>{formstate.addrErrMsg}</Errortext> : null
                                            }
                                        </View>
                                    </View>
                                    <View style={{
                                        marginTop: 30
                                    }}>
                                        <PrimaryButton disabled={formstate.NameErr || formstate.addrErr || formstate.phErr} onPress={() => { saveAddress() }} title={constants[lang].static.saveChanges} />
                                    </View>
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
    lang: state.common.lang ?  state.common.lang : 'en' ,
    address: state.address
});


const mapDispatchToProps = dispatch => ({
    updateAddressFn: (bdy, done) => { dispatch(updateAddress(bdy, done)) },
});
export default connect(mapStateToProps, mapDispatchToProps)(EditAddress);
