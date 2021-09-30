import * as React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Button, ScrollView } from 'react-native';

import * as Font from "expo-font";
import AppLoading from 'expo-app-loading';

import MainComponent from './components/main';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Provider } from 'react-redux';

import store from './dataStore/store';

function App() {
  const [dataLoaded, setDataLoaded] = React.useState(false);
  const [lang, setlang] = React.useState(null);

  const fetchFonts = () => {
    const fonts = Font.loadAsync({
      'Quasimoda': require('./assets/fonts/quasimoda-light.otf'),
      'Quasimodasemibold': require('./assets/fonts/Quasimodasemibold.ttf'),
      'QuasimodaMedium': require('./assets/fonts/QuasimodaMedium.ttf'),
    });

    const GetStoreData = () => {
      return new Promise(async (res, rej) => {
        try {
          const val = await AsyncStorage.getItem('userLang');
          setlang(val)
          res(val);
        } catch (e) { res(null); }
      });
    }
    return Promise.all([fonts, GetStoreData()])
  }
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
          <MainComponent lang={lang} />
        </SafeAreaProvider>
      </Provider>
    );
  }
}

export default App;