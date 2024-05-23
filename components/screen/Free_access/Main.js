import React from 'react';
import { 
    Text, 
    TouchableOpacity, 
    View,
    Image,
    TextInput,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    ScrollView
} from 'react-native';
import Stylemain from '../../../Styles/Stylemain';
import { FontAwesome5 } from '@expo/vector-icons';
export default function Main({navigation}) {
 
  return (

    <KeyboardAvoidingView 
    behavior={Platform.OS == "ios" ? "padding" : "height"}  style={{flex:1, backgroundColor:'#082854'}} >

      
        <View style={{height:60}}/>
        <Image style= {Stylemain.logo} source={require('./../../../assets/Logo_5.png')}/>

       
   
        <ScrollView style={Stylemain.secondConteiner}>
            
            <View style={{}}>
                                                   
            <TouchableOpacity style={[Stylemain.btn,{top:40}]} onPress={() => navigation.navigate('Login')}>
              <Text style={Stylemain.txt}> Entrar </Text>
                <FontAwesome5 name="location-arrow" size={20} color="white" style={Stylemain.seta} />
            </TouchableOpacity>

            <TouchableOpacity style={[Stylemain.btn,{top:40,marginTop:10}]} onPress={() => navigation.navigate('Criar conta')} >
                <Text style={Stylemain.txt}> Criar Conta </Text>
                <FontAwesome5 name="location-arrow" size={20} color="white" style={Stylemain.seta} />
            </TouchableOpacity>
            </View>        
        
        </ScrollView>
   
    </KeyboardAvoidingView>
  );
}