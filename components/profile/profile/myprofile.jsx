import * as React from 'react';
import { Platform, View, Image, StyleSheet, Dimensions, TouchableWithoutFeedback, Keyboard, ScrollView, Alert, BackHandler, TouchableHighlight, FlatList, Button } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { connect } from 'react-redux';
import { LogBox } from 'react-native';
import { RESET_DATA, SET_LOGOUT } from '../../../dataStore/types/types';
import TitleText from '../../common/elements/TitleText';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import LightText from '../../common/elements/lightText';
import RegularText from '../../common/elements/regulartext';
import { constants } from '../../../utlits/constants';

const MyProfile = (props) => {
    const { lang } = props;
    React.useEffect(() => {
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
        if (props.user.loggedin === false) {
            props.navigation.navigate('Choselanguage');
        }
    }, []);
    const { companyName = "", email = "", phoneNumber = "", regnumber = "", address = "", StoreImages = [] } = props.user ? props.user.loggedinUserData : {};
    return (
        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss(); }}>
            <React.Fragment>
                <View style={{ flex: 1 }}>
                    <Spinner
                        color={"#9F9FA2"}
                        visible={false}
                        textContent={constants[lang].static.pleasewait}
                        textStyle={{ color: '#FFF' }}
                    />
                    <View style={{ flex: 1 }}>
                        <View style={styles.tophead}>
                            <View style={{ flex: 1 }}><Ionicons onPress={() => { props.navigation.navigate('Profile'); }} name="arrow-back" size={24} color="black" /></View>
                            <View style={{ flex: 7, alignItems: 'center' }}><TitleText title={constants[lang].static.MyPrf} /></View>
                            <View style={{ flex: 1 }}>
                                <Feather onPress={() => { props.navigation.navigate('EditProfile', { companyName, email, phoneNumber, regnumber, address, StoreImages }); }} name="edit-2" size={20} color="black" />
                            </View>
                        </View>
                        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
                            <View style={styles.body}>
                                <View style={styles.card}>
                                    <View style={styles.cardClm}>
                                        <View style={{ flex: 1 }}><LightText styles={{ fontSize: 16, textAlign: 'left' }}>{constants[lang].static.buissName}</LightText></View>
                                        <View style={{ flex: 1 }}><RegularText styles={{ color: '#3F3F46', fontSize: 16 }}>{companyName}</RegularText></View>
                                    </View>
                                    <View style={styles.cardClm}>
                                        <View style={{ flex: 1 }}><LightText styles={{ fontSize: 16, textAlign: 'left' }}>{constants[lang].static.mobileno}</LightText></View>
                                        <View style={{ flex: 1 }}><RegularText styles={{ color: '#3F3F46', fontSize: 16 }}>{phoneNumber}</RegularText></View>
                                    </View>
                                    <View style={styles.cardClm}>
                                        <View style={{ flex: 1 }}><LightText styles={{ fontSize: 16, textAlign: 'left' }}>{constants[lang].static.email}</LightText></View>
                                        <View style={{ flex: 1 }}><RegularText styles={{ color: '#3F3F46', fontSize: 16 }}>{email}</RegularText></View>
                                    </View>
                                    <View style={styles.cardClm}>
                                        <View style={{ flex: 1 }}><LightText styles={{ fontSize: 16, textAlign: 'left' }}>{constants[lang].static.Address}</LightText></View>
                                        <View style={{ flex: 1 }}><RegularText styles={{ color: '#3F3F46', fontSize: 16 }}>{address}</RegularText></View>
                                    </View>
                                </View>
                                <View style={styles.card}>
                                    <View style={styles.cardClm}>
                                        <View style={{ flex: 1 }}><LightText styles={{ fontSize: 16, textAlign: 'left' }}>{constants[lang].static.EnoRn}</LightText></View>
                                        <View style={{ flex: 1 }}><RegularText styles={{ color: '#3F3F46', fontSize: 16 }}>{regnumber}</RegularText></View>
                                    </View>
                                    <View style={styles.cardClm}>
                                        <View style={{ flex: 1 }}><LightText styles={{ fontSize: 16, textAlign: 'left' }}>{constants[lang].static.EnoRn}</LightText></View>
                                    </View>
                                    {StoreImages.length > 0 ? <View style={[styles.cardClm, { flexWrap: 'wrap' }]}>
                                        {StoreImages.map((e, ind) => <Image
                                            key={ind}
                                            style={{
                                                margin: 5, borderWidth: 1, width: Dimensions.get('screen').width / 6.2,
                                                height: Dimensions.get('screen').width / 6.2,
                                                resizeMode: 'stretch'
                                            }}
                                            source={{
                                                uri: e.fileUrl,
                                            }}
                                        />
                                        )}
                                    </View> : <LightText styles={{ fontSize: 16, textAlign: 'left' }}>{constants[lang].static.NIF}</LightText>}
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
    user: state.user,
    lang: state.common.lang ? state.common.lang : 'en',
});


const mapDispatchToProps = dispatch => ({
    logoutFn: () => { dispatch({ type: SET_LOGOUT }) },
    resetAll: () => { dispatch({ type: RESET_DATA }) }
});
export default connect(mapStateToProps, mapDispatchToProps)(MyProfile);
