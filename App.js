import * as React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Button, ScrollView, BackHandler } from 'react-native';

import * as Font from "expo-font";
import AppLoading from 'expo-app-loading';

import MainComponent from './components/main';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { connect, Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import store from './dataStore/store';
import { useRoute } from '@react-navigation/native';
import { getMe } from './dataStore/actions/user';


const Stack = createNativeStackNavigator();

function App(props) {
  const [dataLoaded, setDataLoaded] = React.useState(false);
  const [lang, setlang] = React.useState(null);
  const [loggedin, Setloggedin] = React.useState(null);
  const [userTOken, userToken] = React.useState(null);

  const fetchFonts = () => {
    const fonts = Font.loadAsync({
      'Quasimoda': require('./assets/fonts/quasimoda-light.otf'),
      'Quasimodasemibold': require('./assets/fonts/Quasimodasemibold.ttf'),
      'Quasimodabold': require('./assets/fonts/Quasimodasemibold.ttf'),
      'QuasimodaMedium': require('./assets/fonts/QuasimodaMedium.ttf'),
    });

    const GetStoreData = () => {
      return new Promise(async (res, rej) => {
        try {
          const val = await AsyncStorage.getItem('userLang');
          const logd = await AsyncStorage.getItem('loggedin');
          const token = await AsyncStorage.getItem('token');
          setlang(val); Setloggedin(logd); userToken(token);
          console.log(val, logd, token );
          if (logd === "yes") {
            store.dispatch(getMe(token, (status) => {
              if (status) {
                res({ val, logd, token });
              } else {
                res({ val, ...{ logd: 'fail' }, token });
              }
            }));
          } else {
            res({ val, logd, token });
          }
        } catch (e) { res(null); }
      });
    }
    return Promise.all([fonts, GetStoreData()])
  }

  React.useEffect(() => {

  }, [])
  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={(val) => { setDataLoaded(true) }}
        onError={(err) => setDataLoaded(true)}
      />
    );
  } else {
    return (
      <Provider store={store}>
        <SafeAreaProvider>
          <NavigationContainer>
            <View style={{ flex: 1, marginTop: 2 }}>
              <MainComponent loggedin={loggedin} token={userTOken} lang={lang} Stack={Stack} />
            </View>
          </NavigationContainer>
        </SafeAreaProvider>
      </Provider>
    );
  }
}


// const mapStateToProps = (state) => ({

// });


// const mapDispatchToProps = dispatch => ({
//   getMeFn: (tok) => { dispatch(getMe(tok)) },
// });
// export default connect(mapStateToProps, mapDispatchToProps)(App);


export default App;