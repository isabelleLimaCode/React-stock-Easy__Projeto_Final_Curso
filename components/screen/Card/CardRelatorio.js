import React, { useEffect, useState } from 'react';
import { 
    View,
    Text,
    TouchableOpacity,
} from 'react-native';
import StyleCardEncomenda from '../../../Styles/StyleCardEncomenda';
export default function CardRelatorio({nEncomenda}) {

  return (
       <View style={[StyleCardEncomenda.conteiner,{width:362,height:54}]}>
        <View style={StyleCardEncomenda.conteiner2}>
        <Text style={StyleCardEncomenda.texttyp}> Encomenda nº{nEncomenda}</Text>
            <TouchableOpacity style={{
                width:107, 
                height:32,
                borderRadius:10,
                borderWidth:2,
                borderColor:'#6B4EFF',
                marginLeft:10,
                marginTop:10,
                right:4
                }}>
                        <Text style={StyleCardEncomenda.text2}>Visualizar</Text>
            </TouchableOpacity>
        </View>
           
       </View>
  );
}