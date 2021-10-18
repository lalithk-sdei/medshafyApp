import * as React from 'react';
import { Platform, View, Image, StyleSheet, Dimensions, TouchableWithoutFeedback, Keyboard, ScrollView, Alert, BackHandler, TouchableHighlight, FlatList, Button, Text } from 'react-native';
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
import PrimaryButton from '../../common/elements/primaryButton';

const MyAddress = (props) => {
    const logout = async () => {
        try {
            props.logoutFn();
            props.resetAll();
            props.navigation.navigate('Choselanguage');
            const val = await AsyncStorage.removeItem('userLang');
            const val2 = await AsyncStorage.removeItem('loggedin');
            const val3 = await AsyncStorage.removeItem('token');
        } catch (e) { }
    }





    React.useEffect(() => {
        // LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
        // if (props.user.loggedin === false) {
        //     props.navigation.navigate('Choselanguage');
        // }
    }, [props.user.loggedin]);
    console.log(props.address);
    const { address = [] } = props.address;
    return (
        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss(); }}>
            <React.Fragment>
                <View style={{ flex: 1 }}>
                    <Spinner
                        color={"#9F9FA2"}
                        visible={false}
                        textContent={'Please wait...'}
                        textStyle={{ color: '#FFF' }}
                    />
                    <View style={{ flex: 1 }}>
                        <View style={styles.tophead}>
                            <View style={{ flex: 1 }}><Ionicons onPress={() => { props.navigation.navigate('Profile'); }} name="arrow-back" size={24} color="black" /></View>
                            <View style={{ flex: 7, alignItems: 'center' }}><TitleText title="Address Book" /></View>
                            <View style={{ flex: 1 }}></View>
                        </View>
                        <View style={{
                            ...address.length == 0 && { justifyContent: 'center' },
                            flexGrow: 1,
                        }}>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ flex: 1 }}>
                                    {address.length == 0 ? <React.Fragment>
                                        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                            <Image style={{ width: Dimensions.get('screen').width / 2, height: Dimensions.get('screen').width / 2 }} source={require('./../../../assets/images/noAddr.png')} />
                                        </View>
                                        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                            <TitleText title={"Your Address Book is Empty"}></TitleText>
                                        </View>
                                        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                            <LightText>Start adding them to your list</LightText>
                                        </View>
                                    </React.Fragment> : <React.Fragment>
                                        <View style={{ height: Dimensions.get('screen').height / 1.5 }}>
                                            <ScrollView contentContainerStyle={{}}>
                                                {address.map((addr) => <View style={{
                                                    backgroundColor: 'white',
                                                    padding: 20,
                                                    margin: 20
                                                }}>
                                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                        <TitleText title={addr.name} />
                                                        <Feather onPress={() => { props.navigation.navigate('EditAddress', addr); }} name="edit-2" size={24} color="black" />
                                                    </View>
                                                    <View style={{ flexDirection: 'row', flex: 1 }}>
                                                        <RegularText styles={{ fontFamily: 'QuasimodaMedium' }}>{addr.address}</RegularText>
                                                    </View>
                                                    <View style={{ flexDirection: 'row', flex: 1 }}>
                                                        <RegularText styles={{ fontFamily: 'QuasimodaMedium' }}>{addr.completeAddress}</RegularText>
                                                    </View>
                                                </View>)}

                                            </ScrollView>
                                        </View>
                                    </React.Fragment>}
                                    <View style={{ marginTop: 30, marginTop: 20, flexDirection: 'row', justifyContent: 'center' }}>
                                        <PrimaryButton onPress={() => { props.navigation.navigate('ConfrimLocation') }} title="Add New Address"></PrimaryButton>
                                    </View>
                                </View>
                            </View>
                        </View>
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
        // textAlign: 'center',
        // alignItems: 'center',
        // justifyContent: 'center',
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
        flexDirection: 'row',
        marginBottom: 15
    },

});


const mapStateToProps = (state) => ({
    user: state.user,
    address: state.address
});


const mapDispatchToProps = dispatch => ({
    logoutFn: () => { dispatch({ type: SET_LOGOUT }) },
    resetAll: () => { dispatch({ type: RESET_DATA }) }
});
export default connect(mapStateToProps, mapDispatchToProps)(MyAddress);
