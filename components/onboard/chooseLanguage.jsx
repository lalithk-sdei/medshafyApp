import * as React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Button } from 'react-native';
import FirstHead from "../common/elements/firstHead"
import LightText from '../common/elements/lightText';
import SecondText from '../common/elements/secondtext';
import RadioButton from '../common/elements/radiobutton';
import PrimaryButton from '../common/elements/primaryButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { connect } from 'react-redux';
import { setLang } from '../../dataStore/actions/common';
import { RESET_DATA, SET_LOGOUT } from '../../dataStore/types/types';


const Choselanguage = (props) => {
    const [selected, setSelected] = React.useState(null);
    const [loaded, setLoaded] = React.useState(false);
    const storeData = async () => {
        try {
            await AsyncStorage.setItem('userLang', `${selected}`);
            props.setLangFn();
            setTimeout(() => {
                props.navigation.navigate('login', { lang: `${selected}` });
            }, 20);
        } catch (e) {
            // saving error
        }
    }

    React.useEffect(() => {
        if (['en', 'ar'].includes(props.route.params.lang)) {
            props.setLangFn((d) => {
                props.navigation.navigate('login');
            });
        } else {
            setLoaded(true);
        }
        // if (props.route.params && props.route.params.logout) {
        //     (async () => {
        //         props.logoutFn();
        //         props.resetAll();
        //         await AsyncStorage.removeItem('userLang');
        //         await AsyncStorage.removeItem('loggedin');
        //         await AsyncStorage.removeItem('token');
        //     })();
        // }
    }, []);

    return (
        <View style={styles.main}>
            {loaded && <React.Fragment>
                <View style={styles.topContainer}>
                    <View style={{ marginBottom: 23 }}>
                        <FirstHead>Choose the Language</FirstHead>
                    </View>
                    <View>
                        <LightText>Please select your language.</LightText>
                    </View>
                </View>
                <View style={styles.langContainer}>
                    <TouchableOpacity activeOpacity={0.5} onPress={() => { setSelected('ar') }}>
                        <View style={styles.langInp}>
                            <View style={{ flex: 1 }}>
                                <Image style={{ width: 35, height: 28 }} source={require('../../assets/images/arabicflag.png')} />
                            </View>
                            <View style={{ flex: 4 }}><SecondText>Arabic </SecondText></View>
                            <View style={{ flex: 1, textAlign: 'right', flexDirection: 'row-reverse' }}>
                                <RadioButton selected={selected === 'ar'}></RadioButton>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.5} onPress={() => { setSelected('en') }}>
                        <View style={styles.langInp}>
                            <View style={{ flex: 1 }}>
                                <Image style={{ width: 35, height: 27 }} source={require('../../assets/images/usFlag.png')} />
                            </View>
                            <View style={{ flex: 4 }}><SecondText>English </SecondText></View>
                            <View style={{ flex: 1, textAlign: 'right', flexDirection: 'row-reverse' }}>
                                <RadioButton selected={selected === 'en'}></RadioButton>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{
                    alignItems: 'center',
                    marginTop: 70
                }}>
                    <PrimaryButton disabled={selected == null} onPress={() => { storeData() }} style={{ width: '80%' }} title={"Next"} />
                </View>
            </React.Fragment>}
        </View>
    );
}



const styles = StyleSheet.create({
    langInp: {
        flexDirection: 'row',
        padding: 30,
        borderColor: '#DCDCDC',
        borderWidth: 1
    },
    langContainer: {
        marginTop: 59,
    },
    topContainer: {
        marginTop: 119,
        marginLeft: 30
    },
    main: {
        backgroundColor: '#fff',
        flex: 1,
        fontFamily: 'Quasimoda'
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

const mapDispatchToProps = dispatch => ({
    setLangFn: (done) => { dispatch(setLang(done)) },
    logoutFn: () => { dispatch({ type: SET_LOGOUT }) },
    resetAll: () => { dispatch({ type: RESET_DATA }) }
});

export default connect(null, mapDispatchToProps)(Choselanguage);