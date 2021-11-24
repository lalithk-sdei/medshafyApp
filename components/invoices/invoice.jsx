import * as React from 'react';
import { Platform, View, Text, StyleSheet, Dimensions, TouchableWithoutFeedback, Keyboard, ScrollView, TouchableOpacity } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { connect } from 'react-redux';
import { RESET_DATA, SET_LOGOUT } from '../../dataStore/types/types';
import TitleText from '../common/elements/TitleText';
import RegularText from '../common/elements/regulartext';
import LinkText from '../common/elements/linktext';
import { constants } from '../../utlits/constants';
import * as Print from 'expo-print';
import * as MediaLibrary from "expo-media-library";
import * as Sharing from "expo-sharing";
import { getOrders } from '../../dataStore/actions/orders';
import { getTotalAmt } from '../../utlits/helpers';

const MyInvoices = (props) => {
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

    const { lang } = props;
    const downloadfile = async (ord) => {
        try {
            const { createdAt = new Date(), prods = [], paidBy = 0, address = { address: "", addressline1: "", completeAddress: "", mobileno: "", name: "" } } = ord;
            const html = `
                <html>
                <head>
                <title>Invoice</title>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
                <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
                <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
                </head>
                <body>
                <style>
                body{margin-top:20px;
                background:#eee;
                }

                .invoice {
                    padding: 30px;
                }

                .invoice h2 {
                    margin-top: 0px;
                    line-height: 0.8em;
                }

                .invoice .small {
                    font-weight: 300;
                }

                .invoice hr {
                    margin-top: 10px;
                    border-color: #ddd;
                }

                .invoice .table tr.line {
                    border-bottom: 1px solid #ccc;
                }

                .invoice .table td {
                    border: none;
                }

                .invoice .identity {
                    margin-top: 10px;
                    font-size: 1.1em;
                    font-weight: 300;
                }

                .invoice .identity strong {
                    font-weight: 600;
                }


                .grid {
                    position: relative;
                    width: 100%;
                    background: #fff;
                    color: #666666;
                    border-radius: 2px;
                    margin-bottom: 25px;
                    box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.1);
                }
                </style>
                <div class="container">
                <div class="row">
                                    <!-- BEGIN INVOICE -->
                                    <div class="col-xs-12">
                                        <div class="grid invoice">
                                            <div class="grid-body">
                                                <div class="invoice-title">
                                                    
                                                    <div class="row">
                                                        <div class="col-xs-12">
                                                            <h2>Invoice<br>
                                                            <span class="small">Order #${ord.orderId}</span></h2>
                                                        </div>
                                                    </div>
                                                </div>
                                                <hr>
                                                <div class="row">
                                                    <div class="col-xs-6">
                                                        <address>
                                                            <strong>Billed To:</strong><br>
                                                            ${address.name}.<br>
                                                            ${address.address},<br>
                                                            ${address.addressline1},<br>
                                                            ${address.mobileno}
                                                        </address>
                                                    </div>
                                                    
                                                </div>
                                                <div class="row">
                                                    <div class="col-xs-6">
                                                        <address>
                                                            <strong>Payment Method:</strong><br>
                                                            ${paidBy === 0 ? 'COD' : ''}
                                                            ${paidBy === 1 ? 'Apple Pay' : ''}
                                                            ${paidBy === 2 ? 'Pay Tabs' : ''}
                                                            <br>
                                                        </address>
                                                    </div>
                                                    <div class="col-xs-6 text-right">
                                                        <address>
                                                            <strong>Order Date:</strong><br>
                                                            ${new Date(createdAt).toDateString()}
                                                        </address>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-md-12">
                                                        <h3>ORDER SUMMARY</h3>
                                                        <table class="table table-striped">
                                                            <thead>
                                                                <tr class="line">
                                                                    <td><strong>#</strong></td>
                                                                    <td class="text-left"><strong>Items</strong></td>
                                                                    <td class="text-center"><strong>Qty</strong></td>
                                                                    <td class="text-center"><strong>Amount</strong></td>
                                                                    <td class="text-right"><strong>SUBTOTAL</strong></td>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                            ${prods.map((prod, index) => `
                                                                    <tr>
                                                                        <td>${index}</td>
                                                                        <td><strong>${prod.prodName}</strong><br> ${prod.qtyname === 'def' ? 'Single' : prod.qtyname}</td>
                                                                        <td class="text-center">${prod.qty}</td>
                                                                        <td class="text-center">SAR ${(+prod.prodPrice) / (+prod.qty)}</td>
                                                                        <td class="text-right">SAR ${prod.prodPrice}</td>
                                                                    </tr>
                                                                ` )}
                                                                <tr>
                                                                    <td colspan="3"></td>
                                                                    <td class="text-right"><strong>VAT</strong></td>
                                                                    <td class="text-right"><strong>${ord.Vat}</strong></td>
                                                                </tr>
                                                                <tr>
                                                                    <td colspan="3"></td>
                                                                    <td class="text-right"><strong>Shipping Charges</strong></td>
                                                                    <td class="text-right"><strong>${ord.DeliveryCharges}</strong></td>
                                                                </tr>
                                                                <tr>
                                                                    <td colspan="3">
                                                                    </td><td class="text-right"><strong>Total</strong></td>
                                                                    <td class="text-right"><strong>SAR ${getTotalAmt(ord.subTotal, ord.DeliveryCharges, ord.Vat)}</strong></td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>									
                                                </div>
                                                
                                            </div>
                                        </div>
                                    </div>
                                    <!-- END INVOICE -->
                                </div>
                </div>
                </body>
                </html>
            `;
            console.log("File nees to download");
            const { uri } = await Print.printToFileAsync({ html });
            if (Platform.OS === "ios") {
                await Sharing.shareAsync(uri);
            } else {
                const permission = await MediaLibrary.requestPermissionsAsync();
                console.log(permission);
                if (permission.granted) {
                    // await MediaLibrary.createAssetAsync(uri);
                    console.log(uri);
                    await Sharing.shareAsync(uri);
                }
            }

        } catch (error) {
            console.log(error);
            console.error(error);
        }
    }
    const { ordersprocess, ordersStatus, orders = [], buyAgain = [] } = props.order;
    console.log(orders);
    React.useEffect(() => {
        props.getOrdersFn();
        // LogBox.ignoreLogs(['VirtualizedLists should never be nested']);

        // (async () => {
        //     // await MediaLibrary.requestPermissionsAsync();
        //     // console.log("Requesting for permissions");
        // })();
    }, [props.user.loggedin]);
    return (
        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss(); }}>
            <React.Fragment>
                <View style={{ flex: 1 }}>
                    <Spinner
                        color={"#9F9FA2"}
                        visible={ordersprocess}
                        textContent={constants[lang].static.pleasewait}
                        textStyle={{ color: '#FFF' }}
                    />
                    <View style={{ flex: 1 }}>
                        <View style={styles.tophead}>
                            <View style={{ flex: 1 }}>
                                {/* <Ionicons onPress={() => { props.navigation.navigate('myOrders'); }} name="arrow-back" size={24} color="black" /> */}
                            </View>
                            <View style={{ flex: 7, alignItems: 'center' }}><TitleText title={constants[lang].static.Invoice} /></View>
                            <View style={{ flex: 1 }}></View>
                        </View>
                        {orders.length === 0 ? <View style={{ flex: 1, marginTop: Dimensions.get('screen').height / 4, justifyContent: 'center', alignItems: 'center' }}>
                            <View style={{}}>
                                <React.Fragment>
                                    {(!ordersprocess) && <RegularText>{constants[lang].static.ydhaords}</RegularText>}
                                </React.Fragment>
                            </View>
                        </View> : null}

                        {!props.user.loggedin ? <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <View style={{}}>
                                <React.Fragment>
                                    {<RegularText>{constants[lang].static.pls} <LinkText onPress={() => { props.navigation.navigate('login'); }}>{constants[lang].static.lgn}</LinkText> {constants[lang].static.tayi}</RegularText>}
                                </React.Fragment>
                            </View>
                        </View> :
                            <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
                                <View style={styles.body}>
                                    {orders.map((ord) =>
                                        <View style={styles.card}>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                <View >
                                                    <View style={{ flexDirection: 'column' }}>
                                                        <Text style={{ fontFamily: 'QuasimodaMedium', fontSize: 15, color: '#2F33A4' }}>{new Date(ord.createdAt).toDateString()}</Text>
                                                        <Text style={{ fontFamily: 'QuasimodaMedium', fontSize: 15, marginTop: 10 }}>{constants[lang].static.curr} {getTotalAmt(ord.subTotal, ord.DeliveryCharges, ord.Vat)}</Text>
                                                    </View>
                                                </View>
                                                <View>
                                                    <View style={{ flexDirection: 'column' }}>
                                                        <Text style={{ fontFamily: 'QuasimodaMedium', fontSize: 15, }}>{ord.orderId}</Text>
                                                        <TouchableOpacity onPress={() => { downloadfile(ord) }}>
                                                            <View style={{
                                                                backgroundColor: '#98DECA',
                                                                borderRadius: 50,
                                                                paddingHorizontal: 10,
                                                                paddingVertical: 5,
                                                                marginTop: 5,
                                                                justifyContent: 'center',
                                                                alignItems: 'center'
                                                            }}>
                                                                <Text style={{ fontFamily: 'QuasimodaMedium', fontSize: 13 }}> {constants[lang].static.download} </Text>
                                                            </View>
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    )}
                                </View>
                            </ScrollView>
                        }
                    </View>
                </View>
            </React.Fragment >
        </TouchableWithoutFeedback >
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
        padding: 20,
        marginBottom: 10,
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
    order: state.order,
});


const mapDispatchToProps = dispatch => ({
    logoutFn: () => { dispatch({ type: SET_LOGOUT }) },
    resetAll: () => { dispatch({ type: RESET_DATA }) },
    getOrdersFn: () => { dispatch(getOrders()) }
});
export default connect(mapStateToProps, mapDispatchToProps)(MyInvoices);
