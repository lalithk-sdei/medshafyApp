import React, { useState } from 'react';
import { Text, StyleSheet, View, Image, TouchableOpacity, TouchableNativeFeedback, ScrollView } from 'react-native';
import RadioButton from './radiobutton';
import { AntDesign } from '@expo/vector-icons';

const CartQty = ({
    onPress = () => { },
    close = () => { },
    qtys = []
}) => {
    const [pressed, setpressed] = useState(false)
    return <View>
        <View style={{ flexDirection: 'column' }}>
            <View style={{ padding: 20, borderBottomWidth: 1, borderBottomColor: '#ddd6d6', flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text numberOfLines={1} style={{ fontFamily: 'Quasimodasemibold', fontSize: 18 }}>Choose an Option...</Text>
                <AntDesign onPress={() => { close() }} name="closecircleo" size={24} color="black" />
            </View>
            <View style={{ maxHeight: 250, }}>
                <ScrollView>
                    <TouchableOpacity onPress={() => { onPress({ _id: 'def' }); }}>
                        <View key={"XCD"} style={{ padding: 15, paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: '#ddd6d6' }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View>
                                    <Text style={{ fontFamily: 'Quasimodasemibold', fontSize: 16, marginRight: 40 }}>Single</Text>
                                </View>
                                <View><RadioButton selected={pressed}></RadioButton></View>
                            </View>
                        </View>
                    </TouchableOpacity>
                    {qtys.map((e, ind) => <TouchableOpacity key={ind} onPress={() => { onPress(e); }}>
                        <View style={{ padding: 15, paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: '#ddd6d6' }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View>
                                    <Text style={{ fontFamily: 'Quasimodasemibold', fontSize: 16, marginRight: 40 }}>{e.qtyname} - SAR {e.OfferdPrice}</Text>
                                </View>
                                <View><RadioButton selected={pressed}></RadioButton></View>
                            </View>
                        </View>
                    </TouchableOpacity>)}
                </ScrollView>
            </View>
        </View>
    </View>
}

const styles = StyleSheet.create({

});

export default CartQty;