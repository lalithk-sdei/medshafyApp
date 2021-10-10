import * as React from 'react';
import { View, Text, StyleSheet, Image, TouchableHighlight, CheckBox, Dimensions, TouchableWithoutFeedback, Keyboard, ScrollView, Alert, TouchableOpacity, Platform } from 'react-native';
import LightText from '../common/elements/lightText';
import PrimaryButton from '../common/elements/primaryButton';
import LinkText from '../common/elements/linktext';
import Floatinginput from '../common/elements/floatinginput';
import SecondaryBtn from '../common/elements/secondaryButton';
import { connect } from 'react-redux';
import { constants } from '../../utlits/constants';
import Errortext from '../common/elements/errorText';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import { AntDesign } from '@expo/vector-icons';
import { registerUser, uploadStoredoc } from '../../dataStore/actions/user';
import { ValidateEmail } from '../../utlits/helpers';
import Spinner from 'react-native-loading-spinner-overlay';
import { Picker } from 'react-native-web';
const SignUp = (props) => {
    const [isSelected, setSelection] = React.useState(false);
    const [cncode, setCncode] = React.useState('+966');

    const setSelectedValue = (e) => {
        if (cncode == '+966') {
            setCncode('+91');
        } else {
            setCncode('+966');
        }
    }
    const [formstate, setFormState] = React.useState({
        cmpTch: false, cmpErr: true, cmpErrMsg: "", cmpVal: "",
        phTch: false, phErr: true, phErrMsg: "", phVal: "",
        emailTch: false, emailErr: true, emailErrMsg: "", emailVal: "",
        passTch: false, passErr: true, passErrMsg: "", passVal: "",
        cnfpassTch: false, cnfpassErr: true, cnfpassErrMsg: "", cnfPassVal: "",
        regTch: false, regErr: true, regErrMsg: "", regVal: "",
        termsTch: false, termsErr: true, termsMsg: "", termsVal: false
    });

    const cmpValidator = (e = null, tch = false) => {
        const { lang } = props;
        if (["", null, undefined].includes(e)) {
            setFormState({ ...formstate, cmpErr: true, cmpErrMsg: constants[lang].errors.companyNamereq, cmpVal: e, ...tch && { cmpTch: true } });
        } else {
            setFormState({ ...formstate, cmpErr: false, cmpErrMsg: '', cmpVal: e, ...tch && { cmpTch: true } });
        }
    }
    const emialValidator = (e = null, tch = false) => {
        const { lang } = props;
        if (["", null, undefined].includes(e)) {
            setFormState({ ...formstate, emailErr: true, emailErrMsg: constants[lang].errors.emailRequired, emailVal: e, ...tch && { emailTch: true } });
        } else if (!ValidateEmail(e)) {
            setFormState({ ...formstate, emailErr: true, emailErrMsg: constants[lang].errors.invalidEmail, emailVal: e, ...tch && { emailTch: true } });
        } else {
            setFormState({ ...formstate, emailErr: false, emailErrMsg: '', emailVal: e, ...tch && { emailTch: true } });
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
    const cnfpassValidator = (e = null, tch = false) => {
        const { lang } = props;
        if (["", null, undefined].includes(e)) {
            setFormState({ ...formstate, cnfpassErr: true, cnfpassErrMsg: constants[lang].errors.cnfPass, cnfPassVal: e, ...tch && { cnfpassTch: true } });
        } else if (`${e}` != formstate.passVal) {
            setFormState({ ...formstate, cnfpassErr: true, cnfpassErrMsg: constants[lang].errors.passNotsame, cnfPassVal: e, ...tch && { cnfpassTch: true } });
        } else {
            setFormState({ ...formstate, cnfpassErr: false, cnfpassErrMsg: '', cnfPassVal: e, ...tch && { cnfpassTch: true } });
        }
    }
    const passValidator = (e = null, tch = false) => {
        const { lang } = props;
        if (["", null, undefined].includes(e)) {
            setFormState({ ...formstate, passErr: true, passErrMsg: constants[lang].errors.passwordRequired, passVal: e, ...tch && { passTch: true } });
        } else if (`${e}`.length < 6) {
            setFormState({ ...formstate, passErr: true, passErrMsg: constants[lang].errors.passwordmin, passVal: e, ...tch && { passTch: true } });
        } else {
            if (!formstate.cnfpassTch) {
                setFormState({ ...formstate, passErr: false, passErrMsg: '', passVal: e, ...tch && { passTch: true } });
            } else {
                setFormState({
                    ...formstate, passErr: false, passErrMsg: '', passVal: e, ...tch && { passTch: true },
                    ...(formstate.cnfPassVal != e) && { cnfpassErr: true, cnfpassErrMsg: constants[lang].errors.passNotsame },
                    ...(formstate.cnfPassVal == e) && { cnfpassErr: false, cnfpassErrMsg: '' }
                });
            }
        }
    }
    const regValidator = (e = null, tch = false) => {
        const { lang } = props;
        // if (["", null, undefined].includes(e)) {
        //     setFormState({ ...formstate, regErr: true, regErrMsg: constants[lang].errors.regNum, regVal: e, ...tch && { regTch: true } });
        // } else {
        setFormState({ ...formstate, regErr: false, regErrMsg: '', regVal: e, ...tch && { regTch: true } });
        // }
    }
    const termValidator = (e = null, tch = false) => {
        const { lang } = props;
        if ([false].includes(!formstate.termsVal)) {
            setFormState({ ...formstate, termsErr: true, termsMsg: constants[lang].errors.acpectTerms, termsVal: !formstate.termsVal, termsTch: true });
        } else {
            setFormState({ ...formstate, termsErr: false, termsMsg: '', termsVal: !formstate.termsVal, termsTch: true });
        }
    }


    const [images, setImages] = React.useState([]);

    const verifyPermissions = async () => {
        const result = await ImagePicker.requestCameraPermissionsAsync();
        if (result.status !== 'granted') {
            Alert.alert(
                'Insufficient permissions!',
                'You need to grant camera permissions to use this app.',
                [{ text: 'Okay' }]
            );
        } else {
            takeAndUploadPhotoAsync();
        }
        return true;
    };

    const takeAndUploadPhotoAsync = async () => {
        let result = await ImagePicker.launchCameraAsync({
            // allowsEditing: true,
            // mediaTypes: ImagePicker.MediaTypeOptions.Images,
            // allowsMultipleSelection: true,
        });
        if (result.cancelled) {
            return;
        }
        setImages([...images, result]);
    }
    const submit = async () => {
        const { cnfPassVal, cmpVal, emailVal, regVal, phVal } = formstate;

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
                props.signup({
                    type: 'user',
                    password: cnfPassVal,
                    companyName: cmpVal,
                    email: emailVal,
                    regnumber: regVal,
                    role: 'user',
                    emailVerified: false,
                    isActive: false,
                    StoreImages: res.map((e) => e.data),
                    phoneNumber: `${cncode}${phVal}`
                });
            }).then((err) => { })
        }, 10);
    }

    React.useEffect(() => {
        if (props.pageState.signUpStatus == 'ok' && props.pageState.loginStatus == 'ok') {
            props.navigation.navigate('layout');
        }
    }, [props.pageState.signUpStatus, props.pageState.loginStatus]);
    const { signUpProcess, loginprocess } = props.pageState;


    return (
        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss(); }}>
            <View style={{ flex: 1 }}>
                <ScrollView style={{ flex: 1 }}>
                    <Spinner
                        color={"#9F9FA2"}
                        visible={signUpProcess || loginprocess}
                        textContent={'Please wait...'}
                        textStyle={{ color: '#FFF' }}
                    />
                    <TouchableHighlight activeOpacity={false}>
                        <View style={styles.main}>
                            <View style={styles.firstCol}>
                                <LinkText onPress={() => { props.navigation.navigate('layout'); }} styles={{ fontSize: 22 }}> SKIP </LinkText>
                            </View>
                            <View style={styles.secondCol}>
                                <View style={{ width: Dimensions.get('window').width / 1.5 }} >
                                    <Image style={{ width: Dimensions.get('window').width / 1.5, height: 85 }} source={require('../../assets/logo.png')} />
                                </View>
                            </View>
                            <View style={styles.thirdCol}>
                                <View>
                                    <Floatinginput
                                        changetext={(e) => { cmpValidator(e) }}
                                        onEndEditing={(e) => { cmpValidator(e.nativeEvent.text, true); }}
                                        autoCapitalize='none'
                                        autoCorrect={false}
                                        label='Company Name'>
                                    </Floatinginput>
                                </View>
                                <View style={{ height: 20 }}>
                                    {(formstate.cmpTch && formstate.cmpErr) && <Errortext>{formstate.cmpErrMsg}  </Errortext>}
                                </View>
                                <View>
                                    <Floatinginput
                                        changetext={(e) => { emialValidator(e) }}
                                        onEndEditing={(e) => { emialValidator(e.nativeEvent.text, true); }}
                                        autoCapitalize='none'
                                        autoCorrect={false}
                                        label='Email'>
                                    </Floatinginput>
                                </View>
                                <View style={{ height: 20 }}>
                                    {(formstate.emailTch && formstate.emailErr) && <Errortext>{formstate.emailErrMsg}  </Errortext>}
                                </View>
                                <View style={{
                                    flexDirection: 'row'
                                }}>
                                    <View style={{ flex: 1 }}>
                                        <View style={{
                                            marginRight: 15,
                                            marginTop: 33.8,
                                            borderColor: '#A8A8AB',
                                            borderBottomWidth: 2
                                        }} >
                                            <View style={{
                                                flexDirection: 'row'
                                            }}>
                                                <TouchableOpacity onPress={() => { setSelectedValue() }}>
                                                    <Text style={{
                                                        paddingBottom: 7,
                                                        fontSize: 18,
                                                        fontFamily: 'QuasimodaMedium',
                                                    }}>{cncode}</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={{ flex: 4 }} >
                                        <View>
                                            <Floatinginput
                                                secureTextEntry={true}
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
                                    </View>
                                </View>
                                <View>
                                    <Floatinginput
                                        changetext={(e) => { passValidator(e) }}
                                        onEndEditing={(e) => { passValidator(e.nativeEvent.text, true); }}
                                        secureTextEntry={true}
                                        onChangeText={(e) => { }}
                                        blurOnSubmit
                                        autoCapitalize='none'
                                        autoCorrect={false}
                                        label='New Password'>
                                    </Floatinginput>
                                </View>
                                <View style={{ height: 20 }}>
                                    {(formstate.passTch && formstate.passErr) && <Errortext>{formstate.passErrMsg}  </Errortext>}
                                </View>
                                <View>
                                    <Floatinginput
                                        changetext={(e) => { cnfpassValidator(e) }}
                                        onEndEditing={(e) => { cnfpassValidator(e.nativeEvent.text, true); }}
                                        secureTextEntry={true}
                                        onChangeText={(e) => { }}
                                        blurOnSubmit
                                        autoCapitalize='none'
                                        autoCorrect={false}
                                        label='Confirm Password'>
                                    </Floatinginput>
                                </View>
                                <View style={{ height: 20 }}>
                                    {(formstate.cnfpassTch && formstate.cnfpassErr) && <Errortext>{formstate.cnfpassErrMsg}  </Errortext>}
                                </View>
                                <View>
                                    <Floatinginput
                                        changetext={(e) => { regValidator(e) }}
                                        onEndEditing={(e) => { regValidator(e.nativeEvent.text, true); }}
                                        blurOnSubmit
                                        autoCapitalize='none'
                                        autoCorrect={false}
                                        label='Registration Number or Entity Number'>
                                    </Floatinginput>
                                </View>
                                <View style={{ height: 20 }}>
                                    {(formstate.regTch && formstate.regErr) && <Errortext>{formstate.regErrMsg}  </Errortext>}
                                </View>
                            </View>
                            <View style={[styles.fourthCol]}>
                                <View style={[styles.lightBorder, { flex: 4 }]}></View>
                                <View style={{ flex: 1 }}><LightText styles={{ marginHorizontal: 9 }}> or </LightText></View>
                                <View style={[styles.lightBorder, { flex: 4 }]}></View>
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
                            <View style={{ marginLeft: 22, marginTop: 10 }}>
                                <LightText styles={{ fontSize: 18 }} >Upload Store Images {images.length == 5 && "(Max of 5 images)"}</LightText>
                            </View>
                            <View style={{ marginLeft: 22, marginTop: 20, marginRight: 22 }}>
                                <SecondaryBtn disabled={images.length == 5} onPress={() => { verifyPermissions() }} iscamara={true} title="Use Camera" />
                            </View>
                            <View style={{ marginLeft: 22, marginTop: 20, marginRight: 22, flexDirection: 'row' }}>
                                <CheckBox
                                    value={formstate.termsVal}
                                    onValueChange={(e) => { termValidator(e) }} />
                                <LightText styles={{ paddingTop: 5 }}> I Accept terms {'&'} conditions</LightText>
                            </View>
                            <View style={{ marginLeft: 22, height: 20 }}>
                                {(formstate.termsTch && formstate.termsErr) && <Errortext>{formstate.termsMsg}  </Errortext>}
                            </View>
                            <View style={{
                                alignItems: 'center',
                                marginTop: 30
                            }}>
                                {/* <PrimaryButton onPress={() => { submit(); }} disabled={false} style={{ width: '80%' }} title="Sign Up" /> */}
                                <PrimaryButton onPress={() => { submit(); }} disabled={formstate.cmpErr || formstate.emailErr || formstate.phErr || formstate.cnfpassErr || formstate.regErr || formstate.termsErr} style={{ width: '80%' }} title="Sign Up" />
                            </View>
                            <View style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginTop: 20,
                                flexDirection: 'row'
                            }}>
                                <LightText>Already a user?</LightText>
                                <LinkText onPress={() => { props.navigation.navigate('login') }} styles={{ marginLeft: 15 }} >Sign In</LinkText>
                            </View>

                            <View style={{ minHeight: 50 }}>

                            </View>

                        </View>
                    </TouchableHighlight>
                </ScrollView>
            </View>
        </TouchableWithoutFeedback >

    );
}



const styles = StyleSheet.create({
    main: {
        backgroundColor: '#fff',
        flex: 1,
    },
    firstCol: {
        marginTop: 60,
        alignItems: 'flex-end',
        marginRight: 22
    },
    secondCol: {
        alignItems: 'center',
        marginTop: 30,
    },
    thirdCol: {
        marginTop: 35,
        paddingHorizontal: 22
    },
    fourthCol: {
        flexDirection: 'row',
        marginRight: 22,
        marginLeft: 22,
        justifyContent: 'center',
        marginTop: 10
    },
    fifthCol: {
        marginTop: 30,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    lightBorder: {
        width: '100%',
        borderTopWidth: 2,
        borderColor: '#9F9FA2',
        position: 'relative',
        bottom: -10
    }

});



const mapStateToProps = (state) => ({
    lang: state.common.lang,
    pageState: state.user
});

const mapDispatchToProps = dispatch => ({
    signup: (body) => { dispatch(registerUser(body)) },
    uploadStorImages: (body, done) => { dispatch(uploadStoredoc(body, done)) },
});
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);