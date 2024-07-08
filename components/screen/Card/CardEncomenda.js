import React, { useEffect, useState } from 'react';
import { 
    Dimensions, 
    View,
    Text,
    Image,
    TouchableOpacity,
} from 'react-native';
import { FontAwesome,Feather} from '@expo/vector-icons';
import StyleCardEncomenda from '../../../Styles/StyleCardEncomenda';
export default function CardEncomenda(props) {

  return (
       <View style={[StyleCardEncomenda.conteiner,{height:100}]}>
            <Text style={StyleCardEncomenda.texttyp}>Encomenda nº{props.encomenda}</Text>
            <Text style={StyleCardEncomenda.texttyp}>Cliente: {props.nomeCliente}</Text>
            <View style={[StyleCardEncomenda.conteiner2,{}]}>
                <View style={StyleCardEncomenda.btn1}>
                        <Text style={StyleCardEncomenda.text2}>{props.estado}</Text>
                </View>
              
                <TouchableOpacity onPress={props.onpress2}>
                    <FontAwesome style={{right:9,top:2}} name="search" size={24} color="black" />
                </TouchableOpacity>

                {props.estado.toLowerCase() != 'finalizado' ?(
                  
                  <TouchableOpacity onPress={props.onPress}>
                  <Feather style={{right:20,top:2}} name="edit-3" size={24} color="black" />
                    </TouchableOpacity>

                ):null} 
                
               
               
            </View>
       </View>
  );
}