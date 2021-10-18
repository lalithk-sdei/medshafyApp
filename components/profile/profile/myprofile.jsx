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

const MyProfile = (props) => {
    React.useEffect(() => {
        // LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
        // if (props.user.loggedin === false) {
        //     props.navigation.navigate('Choselanguage');
        // }
    }, []);
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
                            <View style={{ flex: 7, alignItems: 'center' }}><TitleText title="My Profile" /></View>
                            <View style={{ flex: 1 }}>
                                <Feather onPress={() => { props.navigation.navigate('EditProfile'); }} name="edit-2" size={20} color="black" />
                            </View>
                        </View>
                        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
                            <View style={styles.body}>
                                <View style={styles.card}>
                                    <View style={styles.cardClm}>
                                        <View style={{ flex: 1 }}><LightText styles={{ fontSize: 16 }}>Business Name</LightText></View>
                                        <View style={{ flex: 1 }}><RegularText styles={{ color: '#3F3F46', fontSize: 16 }}>Esther Medical</RegularText></View>
                                    </View>
                                    <View style={styles.cardClm}>
                                        <View style={{ flex: 1 }}><LightText styles={{ fontSize: 16 }}>Mobile Number</LightText></View>
                                        <View style={{ flex: 1 }}><RegularText styles={{ color: '#3F3F46', fontSize: 16 }}>+91 987-654-3210</RegularText></View>
                                    </View>
                                    <View style={styles.cardClm}>
                                        <View style={{ flex: 1 }}><LightText styles={{ fontSize: 16 }}>Email</LightText></View>
                                        <View style={{ flex: 1 }}><RegularText styles={{ color: '#3F3F46', fontSize: 16 }}>esther@gmail.com</RegularText></View>
                                    </View>
                                    <View style={styles.cardClm}>
                                        <View style={{ flex: 1 }}><LightText styles={{ fontSize: 16 }}>Address</LightText></View>
                                        <View style={{ flex: 1 }}><RegularText styles={{ color: '#3F3F46', fontSize: 16 }}>2972 Wesithemer Rd. Santa Ana, Illinois 85486</RegularText></View>
                                    </View>
                                </View>
                                <View style={styles.card}>
                                    <View style={styles.cardClm}>
                                        <View style={{ flex: 1 }}><LightText styles={{ fontSize: 16 }}>Entity Number or Register Number</LightText></View>
                                        <View style={{ flex: 1 }}><RegularText styles={{ color: '#3F3F46', fontSize: 16 }}>Izz5nle5lw</RegularText></View>
                                    </View>
                                    <View style={styles.cardClm}>
                                        <View style={{ flex: 1 }}><LightText styles={{ fontSize: 16 }}>Photos</LightText></View>
                                    </View>
                                    <View style={[styles.cardClm, { flexWrap: 'wrap' }]}>
                                        <Image
                                            style={{ margin: 5, borderWidth: 1, width: Dimensions.get('screen').width / 6.2, height: Dimensions.get('screen').width / 6.2, resizeMode: 'stretch' }}
                                            source={{
                                                uri: 'https://gcdn.pbrd.co/images/grEHL3gquLuy.png',
                                            }}
                                        />
                                        <Image
                                            style={{ margin: 5, borderWidth: 1, width: Dimensions.get('screen').width / 6.2, height: Dimensions.get('screen').width / 6.2, resizeMode: 'stretch' }}
                                            source={{
                                                uri: 'https://gcdn.pbrd.co/images/grEHL3gquLuy.png',
                                            }}
                                        />
                                        <Image
                                            style={{ margin: 5, borderWidth: 1, width: Dimensions.get('screen').width / 6.2, height: Dimensions.get('screen').width / 6.2, resizeMode: 'stretch' }}
                                            source={{
                                                uri: 'https://gcdn.pbrd.co/images/grEHL3gquLuy.png',
                                            }}
                                        />
                                        <Image
                                            style={{ margin: 5, borderWidth: 1, width: Dimensions.get('screen').width / 6.2, height: Dimensions.get('screen').width / 6.2, resizeMode: 'stretch' }}
                                            source={{
                                                uri: 'https://gcdn.pbrd.co/images/grEHL3gquLuy.png',
                                            }}
                                        />
                                        <Image
                                            style={{ margin: 5, borderWidth: 1, width: Dimensions.get('screen').width / 6.2, height: Dimensions.get('screen').width / 6.2, resizeMode: 'stretch' }}
                                            source={{
                                                uri: 'https://gcdn.pbrd.co/images/grEHL3gquLuy.png',
                                            }}
                                        />
                                        <Image
                                            style={{ margin: 5, borderWidth: 1, width: Dimensions.get('screen').width / 6.2, height: Dimensions.get('screen').width / 6.2, resizeMode: 'stretch' }}
                                            source={{
                                                uri: 'https://gcdn.pbrd.co/images/grEHL3gquLuy.png',
                                            }}
                                        />
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
export default connect(mapStateToProps, mapDispatchToProps)(MyProfile);
