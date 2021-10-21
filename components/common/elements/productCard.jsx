import React from 'react';
import { Text, StyleSheet, View, Image, TouchableOpacity, Dimensions } from 'react-native';
import { backgroundColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';
import { EvilIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
const ProductCard = ({
    onPress = () => { },
    img = "",
    salePrice = 0,
    mrp = 10,
    name = "Product",
    isCategory = false,
    isFav = false,
    cartPressed = () => { },
    onpressfav = () => { },
}) => {
    const discount = Math.ceil(100 - (salePrice / mrp) * 100);
    return <TouchableOpacity onPress={() => { onPress(); }}>
        <View>
            <View style={styles.prodBox}>
                <View style={{ flex: 2, paddingVertical: 20 }}>
                    <Image
                        style={{ width: '100%', height: '100%', resizeMode: 'stretch' }}
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
                <View style={{ flex: 2, marginLeft: 20, paddingVertical: 0, marginTop: 20 }}>
                    <TouchableOpacity onPress={() => { onPress(); }}><Text numberOfLines={1} style={{ fontFamily: 'QuasimodaMedium', fontSize: 18, }}>{name}</Text></TouchableOpacity>
                    <TouchableOpacity onPress={() => { onPress(); }}><Text style={{ fontFamily: 'Quasimodabold', fontWeight: 'bold', fontSize: 18, marginTop: 10 }}>SAR {salePrice}</Text></TouchableOpacity>
                    <View style={{
                        flexDirection: 'row',
                        marginTop: 15,
                    }}>
                        <TouchableOpacity onPress={cartPressed}>
                            <View style={{
                                borderTopLeftRadius: 50,
                                borderBottomLeftRadius: 50,
                                paddingHorizontal: 15,
                                paddingVertical: 10,
                                backgroundColor: '#98DECA',
                            }}>
                                <Text style={{
                                    fontSize: Platform.OS == 'ios' ? 12 : 16,
                                    fontFamily: 'Quasimodabold',
                                    fontWeight: 'bold'
                                }}>Add to card</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={cartPressed}>
                            <View style={{
                                borderTopRightRadius: 50,
                                borderBottomRightRadius: 50,
                                paddingHorizontal: 10,
                                paddingBottom: 5,
                                paddingTop: 3,
                                backgroundColor: '#6CBAA8'
                            }}>
                                <Text style={{
                                    color: 'white',
                                    fontSize: 20,
                                }}>+</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ flex: 2 }}>
                    <View style={{
                        position: 'absolute',
                        right: 10,
                        top: 10
                    }}>
                        {isFav ? <Entypo name="heart" size={30} color="#EE6000" onPress={() => { onpressfav("remove") }} /> : <EvilIcons onPress={() => { onpressfav("add") }} name="heart" size={36} color="#EE6000" />}
                    </View>
                </View>
            </View>
        </View>
    </TouchableOpacity >

}

const styles = StyleSheet.create({
    prodBox: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#E6E7E6',
        borderRadius: 5,
        maxHeight: 150,
        minHeight: 100,
        position: 'relative',
        flexDirection: 'row'
    },
    buttonText: {
        fontFamily: 'Quasimodasemibold',
        fontSize: 22,
        color: '#2B2C34',
        // fontWeight: 'bold'
    }
});

export default ProductCard;