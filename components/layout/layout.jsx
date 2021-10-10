import * as React from 'react';
import { Button, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Home from '../home/home';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import ProfilelandngPage from "../profile/profileLanding";

function Feed() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Feed!</Text>
    </View>
  );
}

function Profile(props) {
  const logout = async () => {
    try {
      const val = await AsyncStorage.removeItem('userLang');
      const val2 = await AsyncStorage.removeItem('loggedin');
      const val3 = await AsyncStorage.removeItem('token');
      await props.navigation.navigate('login');
    } catch (e) { }
  }
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button onPress={() => {
        logout();
      }} title={"Log Out"} />
      <Text>Profile!</Text>
    </View>
  );
}

function Invoices() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Invoices!</Text>
    </View>
  );
}

function Cart() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Cart!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <React.Fragment>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          tabBarActiveTintColor: 'black',
          headerShown: false
        }}
      >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => (
              // <MaterialCommunityIcons name="home" color={color} size={size} />
              <Feather name="home" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Invoice"
          component={Invoices}
          options={{
            tabBarLabel: 'Invoice',
            tabBarIcon: ({ color, size }) => (
              // <MaterialCommunityIcons name="file" />
              <AntDesign name="filetext1" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfilelandngPage}
          options={{
            tabBarLabel: 'Profile',
            tabBarIcon: ({ color, size }) => (
              // <MaterialCommunityIcons name="account" />
              // <AntDesign name="profile" color={color} size={size} />
              <FontAwesome name="user-o" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Cart"
          component={Cart}
          options={{
            tabBarLabel: 'Cart',
            tabBarIcon: ({ color, size }) => (
              // <MaterialCommunityIcons name="cart" color={color} size={size} />
              <AntDesign name="shoppingcart" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </React.Fragment>

  );
}

export default function Layout(props) {
  return (
    <MyTabs />
    // </NavigationContainer>
  );
}
