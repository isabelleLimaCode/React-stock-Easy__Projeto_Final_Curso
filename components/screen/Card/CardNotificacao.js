import React, { useEffect, useState } from 'react';
import { 
    Dimensions, 
    View,
    Text,
    Image,
    TouchableOpacity,
} from 'react-native';
import StyleCardNotificacao from '../../../Styles/StyleCardNotificacao';
export default function CardNotificacao({datacompra,nomedacompra,situacaodacompra}) {

    
    const [novanotificacao,setnovanotificaçao]= ('1');

  return (
    <View style={[StyleCardNotificacao.conteiner, situacaodacompra > 1 ? { borderColor: 'red' } : {borderColor:'green'}]}>
        <View style={{flexDirection:'row',alignItems:'center',marginHorizontal:10}}>
            <Image
                style={{ width: 80, height:80, resizeMode: "contain",alignSelf:'center',marginHorizontal:10}}
                source={{
                    uri: "https://firebasestorage.googleapis.com/v0/b/stock-easy-7eced.appspot.com/o/imgs%2FBlack%20and%20White%20Barbell%20Icon%20Fitness%20Logo.png?alt=media&token=0782964e-2d88-4bf5-98f4-a77ed0aa10b2",
                }}
            />
            <View style={{flexDirection:'column'}}>
                <Text style={StyleCardNotificacao.text}>{datacompra}</Text>
                <Text style={StyleCardNotificacao.text2}>{nomedacompra}</Text>
            </View>  
        </View>
</View>
       
  );
}
