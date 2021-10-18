import * as React from 'react';
import { Platform, View, Image, StyleSheet, Dimensions, TouchableWithoutFeedback, Keyboard, ScrollView, Alert, BackHandler, TouchableHighlight, FlatList, Button } from 'react-native';
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
import PlaneText from '../../common/elements/planeText';
import PrimaryButton from '../../common/elements/primaryButton';
import { AntDesign } from '@expo/vector-icons';

const MyOrders = (props) => {
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
                            <View style={{ flex: 7, alignItems: 'center' }}><TitleText title="My Orders" /></View>
                            <View style={{ flex: 1 }}></View>
                        </View>
                        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
                            <View style={styles.body}>
                                <View style={styles.card}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <View><RegularText styles={{ fontSize: 20 }} title="Order Total" >Order Total</RegularText></View>
                                        <View><TitleText title="SAR 306" /></View>
                                    </View>
                                    <View style={{ marginTop: 15 }}>
                                        <View><PlaneText>Order id : ORD561801524</PlaneText></View>
                                        <View><PlaneText>Created : 2019-04-01 09:25:20</PlaneText></View>
                                        <View><PlaneText>Ship to : Adam Watts</PlaneText></View>
                                    </View>
                                    <View style={{ flexDirection: 'row', marginTop: 15 }}>
                                        <MaterialCommunityIcons name="clock" size={24} color="red" />
                                        <RegularText>{"    "}Pending for Delivery</RegularText>
                                    </View>
                                    <View style={{ marginTop: 20 }}>
                                        <PrimaryButton onPress={() => { props.navigation.navigate('Viewproducts'); }} title={"View Products"} />
                                    </View>
                                </View>
                                <View style={styles.card}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <View><RegularText styles={{ fontSize: 20 }} title="Order Total" >Order Total</RegularText></View>
                                        <View><TitleText title="SAR 306" /></View>
                                    </View>
                                    <View style={{ marginTop: 15 }}>
                                        <View><PlaneText>Order id : ORD561801524</PlaneText></View>
                                        <View><PlaneText>Created : 2019-04-01 09:25:20</PlaneText></View>
                                        <View><PlaneText>Ship to : Adam Watts</PlaneText></View>
                                    </View>
                                    <View style={{ flexDirection: 'row', marginTop: 15 }}>
                                        <AntDesign name="checkcircle" size={24} color="#98DECA" />
                                        <RegularText>{"    "}Pending for Delivery</RegularText>
                                    </View>
                                    <View style={{ marginTop: 20 }}>
                                        <PrimaryButton onPress={() => { props.navigation.navigate('Viewproducts'); }} title={"View Products"} />
                                    </View>
                                </View>
                                <View style={styles.card}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <View><RegularText styles={{ fontSize: 20 }} title="Order Total" >Order Total</RegularText></View>
                                        <View><TitleText title="SAR 306" /></View>
                                    </View>
                                    <View style={{ marginTop: 15 }}>
                                        <View><PlaneText>Order id : ORD561801524</PlaneText></View>
                                        <View><PlaneText>Created : 2019-04-01 09:25:20</PlaneText></View>
                                        <View><PlaneText>Ship to : Adam Watts</PlaneText></View>
                                    </View>
                                    <View style={{ flexDirection: 'row', marginTop: 15 }}>
                                        <MaterialCommunityIcons name="clock" size={24} color="red" />
                                        <RegularText>{"    "}Pending for Delivery</RegularText>
                                    </View>
                                    <View style={{ marginTop: 20 }}>
                                        <PrimaryButton onPress={() => { props.navigation.navigate('Viewproducts'); }} title={"View Products"} />
                                    </View>
                                </View>
                            </View>
                        </ScrollView>
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
    user: state.user
});


const mapDispatchToProps = dispatch => ({
    logoutFn: () => { dispatch({ type: SET_LOGOUT }) },
    resetAll: () => { dispatch({ type: RESET_DATA }) }
});
export default connect(mapStateToProps, mapDispatchToProps)(MyOrders);
