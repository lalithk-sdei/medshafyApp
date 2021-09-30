import * as React from 'react';
import { View, Text, StyleSheet, Image, TouchableHighlight, CheckBox, Dimensions, TouchableWithoutFeedback, Keyboard, ScrollView, DeviceEventEmitter } from 'react-native';
import FirstHead from "../common/elements/firstHead"
import LightText from '../common/elements/lightText';
import SecondText from '../common/elements/secondtext';
import RadioButton from '../common/elements/radiobutton';
import PrimaryButton from '../common/elements/primaryButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinkText from '../common/elements/linktext';
import Floatinginput from '../common/elements/floatinginput';
import SecondaryBtn from '../common/elements/secondaryButton';

const SignUp = (props) => {
    const [isSelected, setSelection] = React.useState(false);
    React.useEffect(() => {
        console.log("fired");
    }, []);

    return (
        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss(); }}>
            <View style={{ flex: 1 }}>
                <ScrollView style={{ flex: 1 }}>
                    <TouchableHighlight activeOpacity={false}>
                        <View style={styles.main}>
                            <View style={styles.firstCol}>
                                <LinkText styles={{ fontSize: 22 }}> SKIP </LinkText>
                            </View>
                            <View style={styles.secondCol}>
                                <View style={{ width: Dimensions.get('window').width / 1.5 }} >
                                    <Image style={{ width: Dimensions.get('window').width / 1.5, height: 85 }} source={require('../../assets/logo.png')} />
                                </View>
                            </View>
                            <View style={styles.thirdCol}>
                                <View>
                                    <Floatinginput
                                        onChangeText={(e) => { console.log(e, 1) }}
                                        blurOnSubmit
                                        autoCapitalize='none'
                                        autoCorrect={false}
                                        label='Company Name'>
                                    </Floatinginput>
                                </View>
                                <View style={{ height: 20 }}>
                                    <Text>  </Text>
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
                                <View>
                                    <Floatinginput
                                        secureTextEntry={true}
                                        onChangeText={(e) => { }}
                                        blurOnSubmit
                                        autoCapitalize='none'
                                        autoCorrect={false}
                                        label='New Password'>
                                    </Floatinginput>
                                </View>
                                <View style={{ height: 20 }}>
                                    <Text>  </Text>
                                </View>
                                <View>
                                    <Floatinginput
                                        secureTextEntry={true}
                                        onChangeText={(e) => { }}
                                        blurOnSubmit
                                        autoCapitalize='none'
                                        autoCorrect={false}
                                        label='Confirm Password'>
                                    </Floatinginput>
                                </View>
                                <View style={{ height: 20 }}>
                                    <Text>  </Text>
                                </View>
                                <View>
                                    <Floatinginput
                                        secureTextEntry={true}
                                        onChangeText={(e) => { }}
                                        blurOnSubmit
                                        autoCapitalize='none'
                                        autoCorrect={false}
                                        label='Registration Number or Entity Number'>
                                    </Floatinginput>
                                </View>
                                <View style={{ height: 20 }}>
                                    <Text>  </Text>
                                </View>
                            </View>
                            <View style={[styles.fourthCol]}>
                                <View style={[styles.lightBorder, { flex: 4 }]}></View>
                                <View style={{ flex: 1 }}><LightText styles={{ marginHorizontal: 9 }}> or </LightText></View>
                                <View style={[styles.lightBorder, { flex: 4 }]}></View>
                            </View>
                            <View style={{ marginLeft: 22, marginTop: 10 }}>
                                <LightText styles={{ fontSize: 18 }} >Upload Store Images</LightText>
                            </View>
                            <View style={{ marginLeft: 22, marginTop: 20, marginRight: 22 }}>
                                <SecondaryBtn iscamara={true} title="Use Camera" />
                            </View>
                            <View style={{ marginLeft: 22, marginTop: 20, marginRight: 22, flexDirection: 'row' }}>
                                <CheckBox
                                    value={isSelected}
                                    onValueChange={setSelection} />
                                <LightText styles={{ paddingTop: 5 }}> I Accept terms {'&'} conditions</LightText>
                            </View>
                            <View style={{
                                alignItems: 'center',
                                marginTop: 30
                            }}>
                                <PrimaryButton disabled={false} onPress={() => { }} style={{ width: '80%' }} title="Sign Up" />
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


export default SignUp;