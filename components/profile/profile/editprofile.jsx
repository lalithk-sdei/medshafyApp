import * as React from 'react';
import { Platform, View, Image, StyleSheet, Dimensions, TouchableWithoutFeedback, Keyboard, ScrollView, Alert, BackHandler, TouchableHighlight, FlatList, Button } from 'react-native';
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
import Floatinginput from '../../common/elements/floatinginput';
import { constants } from '../../../utlits/constants';
import Errortext from '../../common/elements/errorText';
import { ValidateEmail } from '../../../utlits/helpers';
import PrimaryButton from '../../common/elements/primaryButton';
import { updateuser } from '../../../dataStore/actions/user';

const EditProfile = (props) => {
    const { loginprocess } = props.user;
    const { companyName = "", email = "", phoneNumber = "", regnumber = "", address = "", StoreImages = [] } = props.route ? props.route.params : {};
    const [formstate, setFormState] = React.useState({
        cmpTch: true, cmpErr: companyName != "" ? false : true, cmpErrMsg: companyName ? "" : constants[props.lang].errors.companyNamereq, cmpVal: companyName,
        phTch: true, phErr: phoneNumber != "" ? false : true, phErrMsg: phoneNumber ? "" : constants[props.lang].errors.phonereq, phVal: phoneNumber,
        emailTch: true, emailErr: email != "" ? false : true, emailErrMsg: email ? "" : constants[props.lang].errors.emailRequired, emailVal: email,
        regTch: true, regErr: true, regErrMsg: "", regVal: regnumber,
        addrTch: true, addrErr: address != "" ? false : true, addrErrMsg: address ? "" : constants[props.lang].errors.addrReq, addrVal: address,
    });
    const { lang } = props;
    const cmpValidator = (e = null, tch = false) => {

        if (["", null, undefined].includes(e)) {
            setFormState({ ...formstate, cmpErr: true, cmpErrMsg: constants[lang].errors.companyNamereq, cmpVal: e, ...tch && { cmpTch: true } });
        } else {
            setFormState({ ...formstate, cmpErr: false, cmpErrMsg: '', cmpVal: e, ...tch && { cmpTch: true } });
        }
    }
    const emialValidator = (e = null, tch = false) => {

        if (["", null, undefined].includes(e)) {
            setFormState({ ...formstate, emailErr: true, emailErrMsg: constants[lang].errors.emailRequired, emailVal: e, ...tch && { emailTch: true } });
        } else if (!ValidateEmail(e)) {
            setFormState({ ...formstate, emailErr: true, emailErrMsg: constants[lang].errors.invalidEmail, emailVal: e, ...tch && { emailTch: true } });
        } else {
            setFormState({ ...formstate, emailErr: false, emailErrMsg: '', emailVal: e, ...tch && { emailTch: true } });
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
    const regValidator = (e = null, tch = false) => {

        // if (["", null, undefined].includes(e)) {
        //     setFormState({ ...formstate, regErr: true, regErrMsg: constants[lang].errors.regNum, regVal: e, ...tch && { regTch: true } });
        // } else {
        setFormState({ ...formstate, regErr: false, regErrMsg: '', regVal: e, ...tch && { regTch: true } });
        // }
    }
    const addrValidator = (e = null, tch = false) => {

        if (["", null, undefined].includes(e)) {
            setFormState({ ...formstate, addrErr: true, addrErrMsg: constants[lang].errors.addrReq, addrVal: e, ...tch && { addrTch: true } });
        } else {
            setFormState({ ...formstate, addrErr: false, addrErrMsg: '', addrVal: e, ...tch && { addrTch: true } });
        }
    }

    const save = () => {
        const b = {
            companyName: formstate.cmpVal,
            email: formstate.emailVal,
            phoneNumber: formstate.phVal,
            regnumber: formstate.regVal,
            address: formstate.addrVal,
            StoreImages: StoreImages
        }
        props.updateuserFn(b, (st) => {
            if (st) {
                props.navigation.navigate('MyProfile');
            } else {
                Alert.alert(
                    constants[lang].errors.failed,
                    constants[lang].errors.wcuypptas,
                    [
                        { text: constants[lang].errors.ok, onPress: () => { } },
                    ],
                );
            }
        });
    }

    React.useEffect(() => {
    }, []);
    return (
        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss(); }}>
            <React.Fragment>
                <View style={{ flex: 1 }}>
                    <Spinner
                        color={"#9F9FA2"}
                        visible={loginprocess}
                        textContent={constants[lang].static.pleasewait}
                        textStyle={{ color: '#FFF' }}
                    />
                    <View style={{ flex: 1 }}>
                        <View style={styles.tophead}>
                            <View style={{ flex: 1 }}><Ionicons onPress={() => { props.navigation.navigate('MyProfile'); }} name="arrow-back" size={24} color="black" /></View>
                            <View style={{ flex: 7, alignItems: 'center' }}><TitleText title={constants[lang].static.editprofil} /></View>
                            <View style={{ flex: 1 }}></View>
                        </View>
                        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
                            <View style={styles.body}>
                                <View style={styles.card}>
                                    <View style={styles.cardClm}>
                                        <View style={styles.cardInp}>
                                            <Floatinginput
                                                value={formstate.cmpVal}
                                                liftUp={true}
                                                changetext={(e) => { cmpValidator(e) }}
                                                onEndEditing={(e) => { cmpValidator(e.nativeEvent.text, true); }}
                                                onChangeText={(e) => { }}
                                                blurOnSubmit
                                                autoCapitalize='none'
                                                autoCorrect={false}
                                                label={constants[lang].static.buissName}>
                                            </Floatinginput>
                                        </View>
                                        <View style={{ height: 20 }}>
                                            {(formstate.cmpTch && formstate.cmpErr) && <Errortext>{formstate.cmpErrMsg}  </Errortext>}
                                        </View>
                                        <View style={styles.cardInp}>
                                            <Floatinginput
                                                value={formstate.phVal}
                                                liftUp={true}
                                                changetext={(e) => { mobilealdator(e) }}
                                                onEndEditing={(e) => { mobilealdator(e.nativeEvent.text, true); }}
                                                onChangeText={(e) => { }}
                                                blurOnSubmit
                                                autoCapitalize='none'
                                                autoCorrect={false}
                                                label={constants[lang].static.mobileno}>
                                            </Floatinginput>
                                        </View>
                                        <View style={{ height: 20 }}>
                                            {(formstate.phTch && formstate.phErr) && <Errortext>{formstate.phErrMsg}  </Errortext>}
                                        </View>
                                        <View style={styles.cardInp}>
                                            <Floatinginput
                                                value={formstate.emailVal}
                                                liftUp={true}
                                                changetext={(e) => { emialValidator(e) }}
                                                onEndEditing={(e) => { emialValidator(e.nativeEvent.text, true); }}
                                                onChangeText={(e) => { }}
                                                blurOnSubmit
                                                autoCapitalize='none'
                                                autoCorrect={false}
                                                label={constants[lang].static.email}>
                                            </Floatinginput>
                                        </View>
                                        <View style={{ height: 20 }}>
                                            {(formstate.emailTch && formstate.emailErr) && <Errortext>{formstate.emailErrMsg}  </Errortext>}
                                        </View>
                                        <View sstyle={styles.cardInp}>
                                            <Floatinginput
                                                value={formstate.addrVal}
                                                liftUp={true}
                                                changetext={(e) => { addrValidator(e) }}
                                                onEndEditing={(e) => { addrValidator(e.nativeEvent.text, true); }}
                                                onChangeText={(e) => { }}
                                                blurOnSubmit
                                                autoCapitalize='none'
                                                autoCorrect={false}
                                                label={constants[lang].static.Address}>
                                            </Floatinginput>
                                        </View>
                                        <View style={{ height: 20 }}>
                                            {(formstate.addrTch && formstate.addrErr) && <Errortext>{formstate.addrErrMsg}  </Errortext>}
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.card}>
                                    <View style={styles.cardClm}>
                                        <View style={styles.cardInp}>
                                            <Floatinginput
                                                value={formstate.regVal}
                                                liftUp={true}
                                                changetext={(e) => { regValidator(e) }}
                                                onEndEditing={(e) => { regValidator(e.nativeEvent.text, true); }}
                                                onChangeText={(e) => { }}
                                                blurOnSubmit
                                                autoCapitalize='none'
                                                autoCorrect={false}
                                                label={constants[lang].static.EnoRn}>
                                            </Floatinginput>
                                        </View>
                                        <View style={{ height: 20 }}>
                                            {(formstate.regTch && formstate.regErr) && <Errortext>{formstate.regErrMsg}  </Errortext>}
                                        </View>
                                    </View>
                                    <View style={styles.cardClm}>
                                        <View style={{ flex: 1 }}><LightText styles={{ fontSize: 16 }}>Photos</LightText></View>
                                    </View>
                                    {StoreImages.length > 0 ? <View style={[styles.cardClm, { flexDirection: 'row', flexWrap: 'wrap' }]}>
                                        {StoreImages.map((e, ind) => <Image
                                            key={ind}
                                            style={{
                                                margin: 5, borderWidth: 1, width: Dimensions.get('screen').width / 6.2,
                                                height: Dimensions.get('screen').width / 6.2,
                                                resizeMode: 'stretch'
                                            }}
                                            source={{
                                                uri: e.fileUrl,
                                            }}
                                        />
                                        )}
                                    </View> : <LightText>{constants[lang].static.NIF}</LightText>}
                                </View>
                                <View style={{ marginVertical: 20 }}>
                                    <PrimaryButton onPress={save} disabled={formstate.cmpErr || formstate.phErr || formstate.emailErr || formstate.addrErr} title={constants[lang].static.saveChanges} />
                                </View>
                            </View>
                        </ScrollView>
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
        flexDirection: 'column',
        marginBottom: 15
    },
    cardInp: {
        marginTop: 10
    }

});


const mapStateToProps = (state) => ({
    lang: state.common.lang ?  state.common.lang : 'en' ,
    user: state.user
});


const mapDispatchToProps = dispatch => ({
    logoutFn: () => { dispatch({ type: SET_LOGOUT }) },
    resetAll: () => { dispatch({ type: RESET_DATA }) },
    updateuserFn: (body, clbk) => { dispatch(updateuser(body, clbk)) },
});
export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
