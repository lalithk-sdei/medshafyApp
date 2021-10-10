import * as React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Button, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform, ScrollView, Alert, BackHandler } from 'react-native';
import FirstHead from "../common/elements/firstHead"
import LightText from '../common/elements/lightText';
import SecondText from '../common/elements/secondtext';
import RadioButton from '../common/elements/radiobutton';
import PrimaryButton from '../common/elements/primaryButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign } from '@expo/vector-icons';
import Floatinginput from '../common/elements/floatinginput';
import { connect } from 'react-redux';
import { chnagepassword } from '../../dataStore/actions/user';
import Spinner from 'react-native-loading-spinner-overlay';
import { constants } from '../../utlits/constants';
import Errortext from '../common/elements/errorText';
const ChangePassword = (props) => {

    const [token, setToken] = React.useState('');
    const setPhoneFn = () => {
        try {
            setToken(props.route.params.OTP)
        } catch {

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
    const submit = () => {
        props.cnfPassword({
            token,
            password: formstate.cnfPassVal
        });
    }

    React.useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', (e) => {
            props.navigation.navigate('login');
        });
        setPhoneFn();
        if (props.pageState.ChangepasStatus === 'ok') {
            props.navigation.navigate('login');
        } else if (props.pageState.ChangepasStatus === 'fail') {
            Alert.alert(
                'Failed!',
                'Something went wrong, Please try after sometime',
                [{ text: 'Okay' }]
            );
        }
    }, [props.pageState.ChangepasStatus, props.pageState.random]);
    const { ChangepassProcess } = props.pageState;

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
                            visible={ChangepassProcess}
                            textContent={'Please wait...'}
                            textStyle={{ color: '#FFF' }}
                        />
                        <View style={styles.main}>
                            <View style={styles.firstCol}>
                                <TouchableOpacity onPress={() => {
                                    props.navigation.navigate('VerifyCode');
                                }}>
                                    <AntDesign name="arrowleft" size={24} color="black" />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.secondcol}>
                                <View style={{ marginBottom: 23 }}>
                                    <FirstHead>Change Password</FirstHead>
                                </View>
                            </View>
                            <View style={styles.thirdCol}>
                                <LightText>Your new password must be different from previous used passwords.</LightText>
                            </View>
                            <View style={styles.fourth}>
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
                            </View>
                            <View style={{
                                alignItems: 'center',
                                marginTop: 55
                            }}>
                                <PrimaryButton disabled={formstate.passErr || formstate.cnfpassErr} onPress={() => { submit(); }} style={{ width: '80%' }} title="Change Password" />
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
        marginLeft: 30
    },
    fourth: {
        marginTop: 55,
        paddingHorizontal: 22
    },



});

const mapStateToProps = (state) => ({
    lang: state.common.lang,
    pageState: state.user
});

const mapDispatchToProps = dispatch => ({
    cnfPassword: (body) => { dispatch(chnagepassword(body)) },
});
export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);