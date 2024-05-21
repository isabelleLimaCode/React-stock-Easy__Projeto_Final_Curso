import React, { useEffect, useState } from 'react';
import { 
    View,
    KeyboardAvoidingView,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
export default function CardScan({}) {

   
  
  return (
    <KeyboardAvoidingView style={{ flex: 1 , backgroundColor:'#fff'}}>

    
    <View style={{height:100,backgroundColor:'#6B4EFF',width:380, borderRadius:20}}>
    <MaterialCommunityIcons name="line-scan" size={40} color="black" />
    </View>
       
        
  </KeyboardAvoidingView>
  );
}