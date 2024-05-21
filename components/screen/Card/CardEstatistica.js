import React, { useEffect, useState } from 'react';
import { 
    Dimensions, 
    View,
    Text,
    Image,
    TouchableOpacity,
} from 'react-native';
import StyleCardEstatistica from '../../../Styles/StyleCardEstatistica';
export default function CardEstatistica({ label,value, color}) {

  return (
       <View style={{
            backgroundColor:'#ADD8E6',
            width:350,
            height:60,
            alignSelf:'center',
            borderColor:color,
            borderLeftWidth:10,
            borderRadius:10,
            marginBottom:10
       }}>
        <View style={StyleCardEstatistica.conteiner2}>
            <Text style={StyleCardEstatistica.text}>{label}</Text>
            <View style={{
                 flex: 1,
                 justifyContent: 'flex-end', 
                 alignItems: 'flex-end', 
                 padding: 20,
            }}>
                <Text style={StyleCardEstatistica.text2}>{value}€</Text>
            </View>
           
        </View>
       
       </View>
  );
}