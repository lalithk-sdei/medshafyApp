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
const ChangePassword = (props) => {

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
                    </View>
                    <View style={{
                        alignItems: 'center',
                        marginTop: 55
                    }}>
                        <PrimaryButton disabled={false} onPress={() => { }} style={{ width: '80%' }} title="Change Password" />
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
        marginLeft: 30
    },
    fourth: {
        marginTop: 55,
        paddingHorizontal: 22
    },



});


export default ChangePassword;