import * as React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Button, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native';
import FirstHead from "../common/elements/firstHead"
import LightText from '../common/elements/lightText';
import SecondText from '../common/elements/secondtext';
import RadioButton from '../common/elements/radiobutton';
import PrimaryButton from '../common/elements/primaryButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign } from '@expo/vector-icons';
import Floatinginput from '../common/elements/floatinginput';
import { ForgotSendOpt } from '../../dataStore/actions/user';
import { connect } from 'react-redux';
import Errortext from '../common/elements/errorText';
import { constants } from '../../utlits/constants';
import Spinner from 'react-native-loading-spinner-overlay';
import { SET_OTPVERFY_STATUS, SET_OTPVERFY_STATUS_ONCE } from '../../dataStore/types/types';
const ForgotPassword = (props) => {

    const [phone, setPhone] = React.useState('');

    const [formstate, setFormState] = React.useState({
        phTch: false, phErr: true, phErrMsg: "", phVal: "",
    });
    const [cncode, setCncode] = React.useState('+966');

    const setSelectedValue = (e) => {
        if (cncode == '+966') {
            setCncode('+91');
        } else {
            setCncode('+966');
        }
    }
    const { lang } = props;
    const mobilealdator = (e = null, tch = false) => {

        if (["", null, undefined].includes(e)) {
            setFormState({ ...formstate, phErr: true, phErrMsg: constants[lang].errors.phonereq, phVal: e, ...tch && { phTch: true } });
        } else if (`${e}`.length != 10) {
            setFormState({ ...formstate, phErr: true, phErrMsg: constants[lang].errors.phoneinvalid, phVal: e, ...tch && { phTch: true } });
        } else {
            setFormState({ ...formstate, phErr: false, phErrMsg: '', phVal: e, ...tch && { phTch: true } });
        }
    }

    const submit = () => {
        props.sendOtp({ phonenumber: `${cncode}${formstate.phVal}` });
    }
    React.useEffect(() => {
        props.resetVerify();
        if (props.pageState.OtpState === 'ok') {
            props.navigation.navigate('VerifyCode', { phone: `${cncode}${formstate.phVal}` });
        } else if (props.pageState.OtpState === 'fail') {
            Alert.alert(
                'Failed!',
                'This Mobile number is not registred.',
                [{ text: 'Okay' }]
            );
        }
    }, [props.pageState.OtpState, props.pageState.random]);
    const { otpSendProcess } = props.pageState;
    return (
        <KeyboardAvoidingView
            // behavior={Platform.OS === "ios" ? "padding" : "height"}
            behavior='position'
        >
            <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss(); }}>
                <View>
                    <ScrollView>
                        <Spinner
                            color={"#9F9FA2"}
                            visible={otpSendProcess}
                            textContent={constants[lang].static.pleasewait}
                            textStyle={{ color: '#FFF' }}
                        />
                        <View style={styles.main}>
                            <View style={styles.firstCol}>
                                <TouchableOpacity onPress={() => {
                                    props.navigation.navigate('login');
                                }}>
                                    <AntDesign name="arrowleft" size={24} color="black" />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.secondcol}>
                                <View style={{ marginBottom: 23 }}>
                                    <FirstHead>{constants[lang].static.forpass}</FirstHead>
                                </View>
                            </View>
                            <View style={styles.thirdCol}>
                                <LightText>{constants[lang].static.avcwbste}</LightText>
                            </View>
                            <View style={styles.fourth}>
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
                                            <TouchableOpacity onPress={() => { setSelectedValue() }}>
                                                <Text style={{
                                                    paddingBottom: 7,
                                                    fontSize: 18,
                                                    fontFamily: 'QuasimodaMedium',
                                                }}>{cncode}</Text>
                                            </TouchableOpacity>
                                            {/* <AntDesign style={{
                                        position: 'absolute',
                                        right: -1,
                                        top: 7,
                                        opacity: 0.5
                                    }} name="down" size={12} color="#3F3F46" /> */}
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
                                            label={constants[lang].static.mobileno}>
                                        </Floatinginput>
                                    </View>
                                    <View style={{ height: 20 }}>
                                        {(formstate.phTch && formstate.phErr) && <Errortext>{formstate.phErrMsg}  </Errortext>}
                                    </View>
                                </View>
                            </View>

                            <View style={{
                                alignItems: 'center',
                                marginTop: 55
                            }}>
                                <PrimaryButton disabled={formstate.phErr} onPress={() => {
                                    submit();
                                }} style={{ width: '80%' }} title={constants[lang].static.submit} />
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}



const styles = StyleSheet.create({
    firstCol: {
        marginTop: 77,
        marginLeft: 22
    },
    secondcol: {
        marginTop: 62,
        marginLeft: 30
    },
    thirdCol: {
        marginTop: 20,
        marginHorizontal: 30,
    },
    fourth: {
        marginTop: 55,
        paddingHorizontal: 22,
        flexDirection: 'row'
    },



});
const mapStateToProps = (state) => ({
    lang: state.common.lang ?  state.common.lang : 'en' ,
    pageState: state.user
});

const mapDispatchToProps = dispatch => ({
    sendOtp: (body) => { dispatch(ForgotSendOpt(body)) },
    resetVerify: () => { dispatch({ type: SET_OTPVERFY_STATUS_ONCE, payload: '' }); },
});
export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
