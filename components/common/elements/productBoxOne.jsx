import React from 'react';
import { Text, StyleSheet, View, Image, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { backgroundColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';
import { EvilIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
const ProductBoxOne = ({
    onPress = () => { },
    img = "",
    salePrice = 0,
    mrp = 10,
    name = "Product",
    isCategory = false,
    isFav = false,
    onpressfav = () => { },
    cartPressed = () => { },
    cartUpdate = () => { },
    cartData = {
        inCart: false,
        cartValues: null
    }
}) => {
    const discount = Math.ceil(100 - (salePrice / mrp) * 100);
    return <TouchableOpacity onPress={() => { onPress() }}>
        <View>
            <View style={styles.prodBox}>
                <View style={{ flex: 2, paddingTop: 20, alignItems: 'center' }}>
                    <Image
                        style={{ marginTop: 15, width: '80%', height: '80%', resizeMode: 'stretch' }}
                        source={{
                            uri: img,
                        }}
                    />
                    {(discount != 0 && !isCategory) &&
                        <React.Fragment>
                            <Text style={{
                                position: 'absolute',
                                backgroundColor: '#2F33A4',
                                left: 0,
                                borderTopLeftRadius: 5,
                                padding: 5,
                                fontSize: 10,
                                width: 58,
                                color: 'white',
                            }}>{discount} % OFF</Text>
                            <View style={{
                                position: 'absolute',
                                borderLeftColor: '#00000000',
                                borderLeftWidth: 8,
                                borderRightColor: '#00000000',
                                borderRightWidth: 8,
                                borderTopColor: '#6D6ACC',
                                borderTopWidth: 12,
                                width: 0,
                                left: 51,
                                height: 0
                            }}><Text>{" "}</Text></View>
                            <View style={{
                                position: 'absolute',
                                borderLeftColor: '#00000000',
                                borderLeftWidth: 8,
                                borderRightColor: '#00000000',
                                borderRightWidth: 8,
                                borderTopColor: '#6D6ACC',
                                borderTopWidth: 13,
                                top: 10,
                                left: 50.7,
                                width: 0,
                                transform: [
                                    { rotateZ: '180deg' }
                                ],
                                height: 0
                            }}><Text>{" "}</Text></View>
                        </React.Fragment>
                    }
                </View>
                <View style={{ marginTop: 0, alignItems: 'center' }}>
                    <Text numberOfLines={1} style={{ paddingHorizontal: 10, fontFamily: 'QuasimodaMedium', fontSize: 18 }}>{name}</Text>
                    <Text style={{ fontFamily: 'Quasimodabold', fontWeight: 'bold', fontSize: 18, marginTop: 10 }}>SAR {salePrice}</Text>
                </View>
                <View style={{
                    margin: 15,
                }}>
                    <View style={{
                    }}>
                        {cartData.inCart ? <React.Fragment>
                            <View style={{ flexDirection: 'row' }}>
                                <TouchableOpacity onPress={() => { cartUpdate(cartData.cartValues.length > 0 ? cartData.cartValues[0] : null, 'dec') }}>
                                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                        <View style={{
                                            backgroundColor: '#6CBAA8',
                                            borderRadius: 50,
                                            width: 30,
                                            height: 30,
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}>
                                            <Text style={{ color: 'white', fontSize: 20 }}>&#8722;</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                                <View style={{
                                    flex: 2,
                                    paddingVertical: 7,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    <Text style={{
                                        fontSize: 16,
                                        fontFamily: 'Quasimodabold',
                                        fontWeight: 'bold',
                                        color: 'black'
                                    }}>{cartData.cartValues.length > 0 ? cartData.cartValues[0].qty : ""}</Text>
                                </View>
                                <TouchableOpacity onPress={() => { cartUpdate(cartData.cartValues.length > 0 ? cartData.cartValues[0] : null, 'inc') }}>
                                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                        <View style={{
                                            backgroundColor: '#6CBAA8',
                                            borderRadius: 50,
                                            width: 30,
                                            height: 30,
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}>
                                            <Text style={{ color: 'white', fontSize: 20 }}>&#43;</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </React.Fragment> :
                            <React.Fragment>
                                <TouchableOpacity onPress={() => { cartPressed() }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <View style={{
                                            flex: 4,
                                            backgroundColor: '#98DECA',
                                            paddingVertical: 7,
                                            borderTopLeftRadius: 50,
                                            borderBottomLeftRadius: 50,
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}>
                                            <Text style={{
                                                fontSize: 14,
                                                fontFamily: 'Quasimodabold',
                                                fontWeight: 'bold',
                                                color: 'black'
                                            }}>Add to card</Text>
                                        </View>
                                        <View style={{
                                            flex: 1.5,
                                            backgroundColor: '#6CBAA8',
                                            borderTopRightRadius: 50,
                                            borderBottomRightRadius: 50,
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}>
                                            <Text style={{
                                                color: 'white',
                                                fontSize: 20,
                                            }}>+ </Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </React.Fragment>
                        }
                    </View>
                </View>
                <View style={{
                    position: 'absolute',
                    right: 5,
                    top: 5
                }}>
                    {isFav ? <Entypo name="heart" size={30} color="#EE6000" onPress={() => { onpressfav("remove") }} /> : <EvilIcons onPress={() => { onpressfav("add") }} name="heart" size={36} color="#EE6000" />}
                </View>
            </View>
        </View>
    </TouchableOpacity>
}

const styles = StyleSheet.create({
    prodBox: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#E6E7E6',
        borderRadius: 5,
        maxHeight: 300,
        justifyContent: 'center',
        minHeight: 300,
        position: 'relative',
        flexDirection: 'column'
    },
    buttonText: {
        fontFamily: 'Quasimodasemibold',
        fontSize: 22,
        color: '#2B2C34',
        // fontWeight: 'bold'
    }
});

export default ProductBoxOne;