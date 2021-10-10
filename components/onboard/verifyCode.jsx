import * as React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Button, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform, TextInput, ScrollView, Alert } from 'react-native';
import FirstHead from "../common/elements/firstHead"
import LightText from '../common/elements/lightText';
import SecondText from '../common/elements/secondtext';
import RadioButton from '../common/elements/radiobutton';
import PrimaryButton from '../common/elements/primaryButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign } from '@expo/vector-icons';
import Floatinginput from '../common/elements/floatinginput';
import OPT from '../common/elements/otp';
import { connect } from 'react-redux';
import { validateOTP } from '../../dataStore/actions/user';
import Spinner from 'react-native-loading-spinner-overlay';
import { SET_CHNAGPASS_STATUS_ONCE } from '../../dataStore/types/types';
const VerifyCode = (props) => {

    const [phone, setPhone] = React.useState('');
    const [OTP, setOTP] = React.useState('');


    const setPhoneFn = () => {
        try {
            setPhone(props.route.params.phone)
        } catch {

        }
    }

    const otpChange = (e) => {
        setOTP(e)
    }
    const submit = () => {
        props.verifyOTP({
            OTP,
            phoneNumber: phone
        });
    }

    React.useEffect(() => {
        setPhoneFn();
        props.changepassreset();
        if (props.pageState.otpVerifyStatus === 'ok') {
            props.navigation.navigate('ChangePassword', { OTP });
        } else if (props.pageState.otpVerifyStatus === 'fail') {
            Alert.alert(
                'Invalid OTP!',
                'You have entred invalid OTP, Please enter valid OTP',
                [{ text: 'Okay' }]
            );
        }
    }, [props.pageState.otpVerifyStatus, props.pageState.random]);
    const { otpVerifyProcess } = props.pageState;

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
                            visible={otpVerifyProcess}
                            textContent={'Please wait...'}
                            textStyle={{ color: '#FFF' }}
                        />
                        <View style={styles.main}>
                            <View style={styles.firstCol}>
                                <View style={{ flex: 1, paddingTop: 5 }}>
                                    <TouchableOpacity onPress={() => {
                                        props.navigation.navigate('ForgotPassword');
                                    }}>
                                        <AntDesign name="arrowleft" size={24} color="black" />
                                    </TouchableOpacity>
                                </View>
                                <View style={{ flex: 3 }} >
                                    <View style={{}}>
                                        <FirstHead>Verify Code</FirstHead>
                                    </View>
                                </View>
                            </View>

                            <View style={styles.thirdCol}>
                                <LightText>Please enter the verification code sent to mobile number: {phone}</LightText>
                            </View>
                            <View style={styles.fourth}>
                                <OPT otpChange={otpChange} />
                            </View>
                            <View style={{
                                alignItems: 'center',
                                marginTop: 55
                            }}>
                                <PrimaryButton disabled={OTP.length != 4} onPress={() => {
                                    submit()
                                }} style={{ width: '80%' }} title="Next" />
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView >
    );
}



const styles = StyleSheet.create({
    firstCol: {
        marginTop: 77,
        marginLeft: 22,
        flexDirection: 'row'
    },
    otpView: {
        width: '80%',
        height: 200,
        color: 'black',
    },
    // secondcol: {
    //     marginTop: 62,
    //     marginLeft: 30
    // },
    thirdCol: {
        marginTop: 112,
        marginHorizontal: 30,
    },
    fourth: {
        // marginTop: 55,
        // paddingHorizontal: 22,
        // flexDirection: 'row',
        // overflow: 'hidden'
    },
    underlineStyleBase: {
        width: 30,
        height: 45,
        borderWidth: 0,
        borderBottomWidth: 1,
        color: 'black',
        borderBottomColor: '#17BED0',
    },
    underlineStyleHighLighted: {
        borderColor: '#3F3F46',
        opacity: 0.5
    },
    otpCell: {
        borderBottomWidth: 2,
        borderBottomColor: 'black',
        width: 64,
        fontSize: 38,
        margin: 15,
        fontFamily: 'Quasimodasemibold',
        flex: 1,
        textAlign: 'center'
    }



});


const mapStateToProps = (state) => ({
    lang: state.common.lang,
    pageState: state.user
});

const mapDispatchToProps = dispatch => ({
    verifyOTP: (body) => { dispatch(validateOTP(body)) },
    changepassreset: () => { dispatch({ type: SET_CHNAGPASS_STATUS_ONCE, payload: '' }); }
});
export default connect(mapStateToProps, mapDispatchToProps)(VerifyCode);

