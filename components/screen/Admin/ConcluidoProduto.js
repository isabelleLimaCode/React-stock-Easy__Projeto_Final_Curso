import React, { useEffect, useState } from 'react';
import { 
    Text, 
    View,
    Image,
    TouchableOpacity,
} from 'react-native';
import StyleCardObj from '../../../Styles/StyleCardObj';
import StyleNewProduct from '../../../Styles/StyleNewProduct';
import { AntDesign} from '@expo/vector-icons';
import { CommonActions } from '@react-navigation/native';


export default function ConcluidoProduto({navigation}) {

    const reset = () =>{
        setTimeout(() => {
            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{ name: 'Home' }]
                })
            );
        }, 1000);
    }

  return (
   <View style={{backgroundColor:'#fff',flex:1}}>
        <Image
                  style={{ 
                    width: 400, 
                    height: 400, 
                    resizeMode: "contain",
                    alignSelf:'center',
                    top:90 
                }}
                  source={{
                    uri: "https://firebasestorage.googleapis.com/v0/b/stock-easy-7eced.appspot.com/o/imgs%2FProduct%20presentation-rafiki.png?alt=media&token=3f1b01b1-1174-4375-aeea-2521363fe813",
                  }}
        />
        <Text style={{
            marginTop:100,
            alignSelf:'center',
            fontWeight:'bold',
            fontSize:25
        }}>Produto Registrado !</Text>
       
       <TouchableOpacity style={{alignItems:'center',marginTop:100}} onPress={reset}>
            <View style={[StyleCardObj.conteiner3,StyleNewProduct.buttonnew]}>
            <Text style={[StyleNewProduct.text2,{marginHorizontal:85,top:2}]}>Sair</Text>
            <AntDesign style={{top:-10, marginHorizontal:10,right:3,top:1,right:40}} name="arrowright" size={24} color="black" />
            </View>
        </TouchableOpacity> 
   </View>
  );
}