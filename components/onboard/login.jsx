import * as React from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableWithoutFeedback, Keyboard, ScrollView, Alert, BackHandler } from 'react-native';
import LightText from '../common/elements/lightText';
import PrimaryButton from '../common/elements/primaryButton';
import LinkText from '../common/elements/linktext';
import Floatinginput from '../common/elements/floatinginput';
import Spinner from 'react-native-loading-spinner-overlay';
import { constants } from '../../utlits/constants';
import { connect } from 'react-redux';
import { ValidateEmail } from '../../utlits/helpers';
import Errortext from '../common/elements/errorText';
import { login } from '../../dataStore/actions/user';
import { useIsFocused } from '@react-navigation/native';


const Login = (props) => {
    const [Errors, setErrors] = React.useState({
        emailTouched: false,
        emailError: true,
        errorMessage: "",
        passwordTouched: false,
        passwordError: true,
        passwordMessage: "",
    });

    const [email, setemail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [alertOpen, setIsalertOpen] = React.useState(false);

    const emialValidator = (e = null, touched = false) => {
        setemail(e);
        const { lang } = props;
        if (["", null, undefined].includes(e)) {
            setErrors({ ...Errors, emailError: true, errorMessage: constants[lang].errors.emailRequired, ...touched && { emailTouched: true } });
        } else if (!ValidateEmail(e)) {
            setErrors({ ...Errors, emailError: true, errorMessage: constants[lang].errors.invalidEmail, ...touched && { emailTouched: true } });
        } else {
            setErrors({ ...Errors, emailError: false, errorMessage: '' });
        }
    }
    const passwordValidator = (e = null, touched = false) => {
        setPassword(e);
        const { lang } = props;
        if (["", null, undefined].includes(e)) {
            setErrors({ ...Errors, passwordError: true, passwordMessage: constants[lang].errors.passwordRequired, ...touched && { passwordTouched: true } });
        } else {
            setErrors({ ...Errors, passwordError: false, passwordMessage: '' });
        }
    }
    const { loginprocess } = props.pageState;

    const submit = () => {
        props.loginAction({ email, password });
    }


    React.useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', (e) => {
            BackHandler.exitApp();
        });
        if (props.pageState.loginStatus === 'ok') {
            props.navigation.navigate('layout');
            setIsalertOpen(false);
        } else if (props.pageState.loginStatus === 'fail') {
            setIsalertOpen(true);
            // Alert.alert(
            //     'Login Failed!',
            //     'You have entered invalid email/password',
            //     [{ text: 'Okay', onPress: () => { setIsalertOpen(false); } }],
            // );
        }
    }, [props.pageState.loginStatus, props.pageState.random]);
    return (
        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss(); }}>
            <React.Fragment>
                {props.pageState.loginStatus !== 'ok' &&
                    <View style={{ flex: 1 }}>
                        <ScrollView style={{ flex: 1 }}>
                            <Spinner
                                color={"#9F9FA2"}
                                visible={loginprocess}
                                textContent={'Please wait...'}
                                textStyle={{ color: '#FFF' }}
                            />
                            <View style={styles.main}>
                                <View style={styles.firstCol}>
                                    <LinkText onPress={() => { props.navigation.navigate('layout'); }} styles={{ fontSize: 22 }}> SKIP </LinkText>
                                </View>
                                <View style={styles.secondCol}>
                                    <View style={{ width: Dimensions.get('window').width / 1.5 }} >
                                        <Image style={{ width: '100%', height: 85, resizeMode: 'stretch', }} source={require('../../assets/logo.png')} />
                                    </View>
                                </View>
                                <View style={styles.thirdCol}>
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
                                        {(Errors.emailTouched && Errors.emailError) && <Errortext>{Errors.errorMessage}  </Errortext>}
                                    </View>
                                    <View>
                                        <Floatinginput
                                            changetext={(e) => { passwordValidator(e) }}
                                            onEndEditing={(e) => { passwordValidator(e.nativeEvent.text, true); }}
                                            secureTextEntry={true}
                                            autoCapitalize='none'
                                            autoCorrect={false}
                                            label='Password'>
                                        </Floatinginput>
                                    </View>
                                    <View style={{ height: 20 }}>
                                        {(Errors.passwordTouched && Errors.passwordError) && <Errortext>{Errors.passwordMessage}  </Errortext>}
                                    </View>
                                </View>
                                <View style={{ height: 20, paddingHorizontal: 22 }}>
                                    {(props.pageState.loginStatus === 'fail' && (!Errors.emailError && !Errors.passwordError)) && <Errortext>Invalid Username or password</Errortext>}
                                </View>
                                <View style={{
                                    alignItems: 'center',
                                    marginTop: 30
                                }}>
                                    <PrimaryButton disabled={Errors.emailError || Errors.passwordError} onPress={() => { submit() }} style={{ width: '80%' }} title="Sign In" />
                                </View>
                                <View style={{
                                    alignItems: 'center',
                                    marginTop: 20
                                }}>
                                    <LinkText onPress={() => { props.navigation.navigate('ForgotPassword', { name: 'Jane' }) }} style={{ width: '80%' }} >Forgot Password?</LinkText>
                                </View>

                                <View style={styles.fourthCol}>
                                    <View style={[styles.lightBorder, { flex: 4 }]}></View>
                                    <View style={{ flex: 1 }}><LightText styles={{ marginHorizontal: 9 }}> or </LightText></View>
                                    <View style={[styles.lightBorder, { flex: 4 }]}></View>
                                </View>

                                <View style={styles.fifthCol}>
                                    <LightText>Don’t have an account?</LightText>
                                </View>

                                <View style={[styles.fifthCol, { marginTop: 20 }]}>
                                    <LinkText onPress={() => { props.navigation.navigate('SignUp') }}>Click Here to Register</LinkText>
                                </View>
                            </View>
                        </ScrollView>
                    </View>
                }
            </React.Fragment>
        </TouchableWithoutFeedback>
    );
}



const styles = StyleSheet.create({
    main: {
        backgroundColor: '#fff',
        minHeight: Dimensions.get('screen').height
    },
    firstCol: {
        marginTop: 85,
        alignItems: 'flex-end',
        marginRight: 22
    },
    secondCol: {
        alignItems: 'center',
        marginTop: 42,
    },
    thirdCol: {
        marginTop: 55,
        paddingHorizontal: 22
    },
    fourthCol: {
        flexDirection: 'row',
        marginRight: 22,
        marginLeft: 22,
        justifyContent: 'center',
        marginTop: 21
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
    loginAction: (body) => { dispatch(login(body)) },
});
export default connect(mapStateToProps, mapDispatchToProps)(Login);
