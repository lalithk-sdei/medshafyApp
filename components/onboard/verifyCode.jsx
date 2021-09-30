import * as React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Button, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform, TextInput } from 'react-native';
import FirstHead from "../common/elements/firstHead"
import LightText from '../common/elements/lightText';
import SecondText from '../common/elements/secondtext';
import RadioButton from '../common/elements/radiobutton';
import PrimaryButton from '../common/elements/primaryButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign } from '@expo/vector-icons';
import Floatinginput from '../common/elements/floatinginput';
import OPT from '../common/elements/otp';
const VerifyCode = (props) => {

    const [phone, setPhone] = React.useState('');
    const [OTP, setOTP] = React.useState([]);
    const first = React.useRef();
    const second = React.useRef();
    const third = React.useRef();
    const fourth = React.useRef();


    React.useEffect(() => {
        // first.current.focus();

    }, []);

    const onchange = (e) => {
        if (e == "" || e == null) {

        } else {
            const d = [...OTP, e];
            setOTP(oldArray => [...oldArray, e]);
            console.log(d);
        }

    }
    const otpChange = (e) => {
        console.log(e);
    }


    return (
        <KeyboardAvoidingView
            // behavior={Platform.OS === "ios" ? "padding" : "height"}
            behavior='position'
        >
            <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss(); }}>
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
                        <LightText>Please enter the verification code sent to mobile number: xxxxx4321</LightText>
                    </View>
                    <View style={styles.fourth}>
                        <OPT otpChange={otpChange} />
                        {/* <TextInput onChangeText={(e) => { onchange(e); }} ref={first} maxLength={1} keyboardType={'phone-pad'} style={styles.otpCell} />
                        <TextInput onChangeText={(e) => { onchange(e); }} ref={second} maxLength={1} keyboardType={'phone-pad'} style={styles.otpCell} />
                        <TextInput onChangeText={(e) => { onchange(e); }} ref={third} maxLength={1} keyboardType={'phone-pad'} style={styles.otpCell} />
                        <TextInput onChangeText={(e) => { onchange(e); }} ref={fourth} maxLength={1} keyboardType={'phone-pad'} style={styles.otpCell} /> */}
                    </View>
                    <View style={{
                        alignItems: 'center',
                        marginTop: 55
                    }}>
                        <PrimaryButton disabled={false} onPress={() => {
                            props.navigation.navigate('ChangePassword', { phoneNuumber: phone });
                        }} style={{ width: '80%' }} title="Next" />
                    </View>
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


export default VerifyCode;