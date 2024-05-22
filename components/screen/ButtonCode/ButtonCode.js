import React from "react";
import { 
    View,
    StyleSheet,
    Text
} from "react-native";

import {MaterialCommunityIcons} from '@expo/vector-icons';

export default function ButtonCode({size,color,focused}){
    return(
        <View style={[styles.conteiner,{backgroundColor: focused ? '#547c96' : '#a5ccd4'}]}>
             <MaterialCommunityIcons name="barcode-scan" color={color} size={size}/>
        </View>
    )
}

const styles = StyleSheet.create({
    conteiner:{
        width:60,
        height:60,
        borderRadius:30,
        alignItems:'center',
        justifyContent:'center',
        marginBottom:20
    }
})