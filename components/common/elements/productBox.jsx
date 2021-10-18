import React from 'react';
import { Text, StyleSheet, View, Image, TouchableOpacity, Dimensions } from 'react-native';

const ProductBox = ({
    onPress = () => { },
    img = "",
    salePrice = 0,
    mrp = 0,
    name = "Product",
    isCategory = false
}) => {
    const discount = Math.ceil(100 - (salePrice / mrp) * 100);
    return <TouchableOpacity onPress={() => { onPress() }} style={[]}>
        <View>
            <View style={styles.prodBox}>
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
            <View style={{ alignItems: 'center', marginTop: 5 }}>
                <Text numberOfLines={1} style={{ fontFamily: 'QuasimodaMedium', fontSize: 14 }}>{name}</Text>
                {!isCategory &&
                    <Text style={{ fontFamily: 'Quasimodabold', fontWeight: 'bold', fontSize: 16, marginTop: 5 }}>SAR {salePrice}</Text>
                }
            </View>
        </View>
    </TouchableOpacity >

}

const styles = StyleSheet.create({
    prodBox: {
        backgroundColor: 'white',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E6E7E6',
        borderRadius: 5,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        padding: 10,
        maxHeight: 100,
        minHeight: 100,
        position: 'relative',
        overflow: 'hidden'
    },
    buttonText: {
        fontFamily: 'Quasimodasemibold',
        fontSize: 22,
        color: '#2B2C34',
        // fontWeight: 'bold'
    }
});

export default ProductBox;