import React, { useEffect, useState } from 'react';
import { 
    Dimensions, 
    View,
    Text,
    Image,
    TouchableOpacity,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import StylesCardCupom from '../../../Styles/StylesCardCupom';
export default function CardCupom({ desconto,quantidade}) {

    const cardWidth = Dimensions.get("window").width * 0.8;
    const skeWidth = cardWidth - 32;

  return ( 

    <View style={{ justifyContent: 'center', alignItems: 'center' ,left:39,marginTop:10, marginBottom:10}}>
    <TouchableOpacity style={{ alignSelf: 'center', alignItems: 'center' }}>
        <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
            <View style={StylesCardCupom.conteiner}>
                <View style={StylesCardCupom.conteiner2} >
                <View style={{
                    justifyContent:'space-between',
                    flexDirection:'row'
                }}>
                     <Image style= {StylesCardCupom.logo} source={require('./../../../assets/logo.gif')}/>
                     <View style={StylesCardCupom.conteiner3}>
                        <Text style={StylesCardCupom.text2}>Desconto</Text>
                        <Text style={StylesCardCupom.text2}>{desconto}</Text>
                        <Text style={StylesCardCupom.text2}>Disponíveis: {quantidade}</Text>
                     </View>
                </View>
                </View>
            </View>

            <View style={{ alignItems: 'center', justifyContent: 'center', right: 100 }}>
                <View style={{ transform: [{ rotate: '90deg' }] }}>
                    <AntDesign style={StylesCardCupom.iconbar} name="barcode" size={80} color="#53ba83" />
                </View>
            </View>
        </View>
    </TouchableOpacity>
</View>


        
        
  
  );
}