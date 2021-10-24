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
import mycart from '../cart/mycart';
import MyInvoices from "../invoices/invoice";
import { GetCartForUser } from '../../dataStore/actions/cart';
import { connect } from 'react-redux';

const Tab = createBottomTabNavigator();

function MyTabs({ cartData = [] }) {
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
          component={MyInvoices}
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
          component={mycart}
          options={{
            tabBarLabel: 'Cart',
            tabBarIcon: ({ color, size }) => (
              // <MaterialCommunityIcons name="cart" color={color} size={size} />
              <React.Fragment>
                <AntDesign name="shoppingcart" color={color} size={size} />
                {cartData.length != 0 &&
                  <View style={{
                    paddingHorizontal: 8,
                    right: 20,
                    top: -5,
                    paddingVertical: 5,
                    backgroundColor: '#EE6000',
                    borderRadius: 50,
                    position: 'absolute'
                  }}>
                    <Text style={{
                      color: 'white',
                      fontSize: 10
                    }}>{cartData.length}
                    </Text>
                  </View>
                }
              </React.Fragment>

            ),
          }}
        />
      </Tab.Navigator>
    </React.Fragment>

  );
}

export function Layout(props) {
  const { cartprocess, cartStatus, cartData } = props.cart;
  React.useEffect(() => {
    if (cartData.length == 0 && props.user.loggedin) {
      props.loadCart();
    }
  }, []);
  return (
    <MyTabs cartData={cartData} />
  );
}


const mapStateToProps = (state) => ({
  user: state.user,
  cart: state.cart
});


const mapDispatchToProps = dispatch => ({
  loadCart: () => { dispatch(GetCartForUser()) },
});
export default connect(mapStateToProps, mapDispatchToProps)(Layout);

