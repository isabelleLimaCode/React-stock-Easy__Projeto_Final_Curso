import React, { useEffect, useState } from 'react';
import { 
    Dimensions, 
    View,
    Text,
    Image,
    TouchableOpacity,
} from 'react-native';
import StyleCardCliente from '../../../Styles/StyleCardCliente';
import { Ionicons ,FontAwesome5} from '@expo/vector-icons';
export default function CardCliente({ nome, estado , onpress,navigation,icon,onPress2,email}) {

    const cardWidth = Dimensions.get("window").width * 0.8;
    const skeWidth = cardWidth - 32;

  return (
    <View style ={StyleCardCliente.conteiner}>
       <View>
           <Image style= {StyleCardCliente.Picture} 
               source={require('./../../../assets/user.jpg')}
           />
        </View>
        
        <View style={StyleCardCliente.conteinerdados}>
                   
          <Text style={StyleCardCliente.text}>{nome}</Text>
          <Text style={StyleCardCliente.text}>{email}</Text>
          <View style={{
            backgroundColor:'#A1E8AF',
            borderRadius:10,
            width:50,
            marginTop:2
          }}>
           <Text style={[StyleCardCliente.text,{left:6}]}>{estado}</Text>
          </View>
          <View style={{flexDirection:'row',left:190,top:-40}}>
          <TouchableOpacity onPress={onPress2}>
            <Ionicons style={StyleCardCliente.icons} name="trash-sharp" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={onpress}>
            <FontAwesome5 style={[StyleCardCliente.icons,{left:10,alignSelf:'flex-end'}]} name={ icon ?'plus':'pen'} size={24} color="black" />
          </TouchableOpacity>
          </View>
        </View>

         
    </View>
  );
}