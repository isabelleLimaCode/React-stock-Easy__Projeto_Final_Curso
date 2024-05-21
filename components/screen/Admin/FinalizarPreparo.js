import React, { useEffect, useState } from 'react';
import { 
    Text, 
    View,
    KeyboardAvoidingView,
    Platform,
    TouchableOpacity,
    Image


    
} from 'react-native';
import StyleCardObj from '../../../Styles/StyleCardObj';
import { FontAwesome5 ,AntDesign} from '@expo/vector-icons';
import StyleNewProduct from '../../../Styles/StyleNewProduct';
import { CommonActions } from '@react-navigation/native';

export default function FinalizarPreparo({navigation}) {



  const behavior = Platform.OS === 'ios' ? 'padding' : 'height';

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
    <KeyboardAvoidingView behavior={behavior} style={{ flex: 1 , backgroundColor:'#fff'}}>
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
                    uri: "https://firebasestorage.googleapis.com/v0/b/stock-easy-7eced.appspot.com/o/imgs%2FChecking%20boxes-rafiki.png?alt=media&token=52ef2446-015a-4758-b52c-cd8adc9b0007",
                  }}
        />
        <Text style={{
            marginTop:100,
            alignSelf:'center',
            fontWeight:'bold',
            fontSize:25
        }}>Preparação finalizada !</Text>
       
       <TouchableOpacity style={{alignItems:'center',marginTop:100}} onPress={reset}>
            <View style={[StyleCardObj.conteiner3,StyleNewProduct.buttonnew]}>
            <Text style={[StyleNewProduct.text2,{marginHorizontal:85,top:2}]}>Sair</Text>
            <AntDesign style={{top:-10, marginHorizontal:10,right:3,top:1,right:40}} name="arrowright" size={24} color="black" />
            </View>
        </TouchableOpacity> 
   </View>
    
    </KeyboardAvoidingView>
  );
}