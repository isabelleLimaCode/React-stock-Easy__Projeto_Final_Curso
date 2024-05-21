import React, { useEffect, useState } from 'react';
import { 
    Dimensions, 
    View,
    Text,
    Image,
    TouchableOpacity,
} from 'react-native';
import StyleCardMarckplace from '../../../Styles/StyleCardMarckplace';
export default function CardMarckplace({ imagem , empresa, onPress}) {


  return (
       <TouchableOpacity style ={StyleCardMarckplace.conteiner} onPress={onPress}>
          <Image style={StyleCardMarckplace.img} source={imagem}/> 
          <View style={StyleCardMarckplace.card}>
            <Text style={StyleCardMarckplace.text}>{empresa}</Text>
          </View>
        </TouchableOpacity>
  );
}