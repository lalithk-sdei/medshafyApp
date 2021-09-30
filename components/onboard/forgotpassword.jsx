import * as React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Button, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform } from 'react-native';
import FirstHead from "../common/elements/firstHead"
import LightText from '../common/elements/lightText';
import SecondText from '../common/elements/secondtext';
import RadioButton from '../common/elements/radiobutton';
import PrimaryButton from '../common/elements/primaryButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign } from '@expo/vector-icons';
import Floatinginput from '../common/elements/floatinginput';
const ForgotPassword = (props) => {

    const [phone, setPhone] = React.useState('');

    React.useEffect(() => {
    }, []);

    return (
        <KeyboardAvoidingView
            // behavior={Platform.OS === "ios" ? "padding" : "height"}
            behavior='position'
        >
            <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss(); }}>
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
                            <FirstHead>Forgot Password</FirstHead>
                        </View>
                    </View>
                    <View style={styles.thirdCol}>
                        <LightText>A verification code will be sent to the email address. Please verify your email by entering the code on the next screen.</LightText>
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
                                    <Text style={{
                                        paddingBottom: 7,
                                        fontSize: 18,
                                        fontFamily: 'QuasimodaMedium',
                                    }}>+966</Text>
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
                                    onChangeText={(e) => { setPhone(e); console.log(e) }}
                                    blurOnSubmit
                                    autoCapitalize='none'
                                    keyboardType={'phone-pad'}
                                    autoCorrect={false}
                                    maxLength={10}
                                    label='Mobile Number'>
                                </Floatinginput>
                            </View>
                            <View style={{ height: 20 }}>
                                <Text>  </Text>
                            </View>
                        </View>
                    </View>

                    <View style={{
                        alignItems: 'center',
                        marginTop: 55
                    }}>
                        <PrimaryButton disabled={phone.length != 10} onPress={() => {
                            props.navigation.navigate('VerifyCode', { phoneNuumber: phone });
                        }} style={{ width: '80%' }} title="Submit" />
                    </View>
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


export default ForgotPassword;