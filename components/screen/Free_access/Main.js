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

       <View style={[Stylemain.mainConteiner,{}]}>
        <View style={{height:60}}/>
        <Image style= {Stylemain.logo} source={require('./../../../assets/logo.gif')}/>

       </View>
   
        <ScrollView style={Stylemain.secondConteiner}>
            
                    
            <View style={{backgroundColor:'#082854'}}>
                                                   
            <TouchableOpacity style={[Stylemain.btn,{top:40}]} onPress={() => navigation.navigate('login')}>
                <Text style={Stylemain.txt}> Entrar </Text>
                <FontAwesome5 name="location-arrow" size={20} color="white" style={Stylemain.seta} />
            </TouchableOpacity>

            <TouchableOpacity style={[Stylemain.btn,{top:40}]} onPress={() => navigation.navigate('Main')} >
                <Text style={Stylemain.txt}> Criar Conta </Text>
                <FontAwesome5 name="location-arrow" size={20} color="white" style={Stylemain.seta} />
            </TouchableOpacity>
            </View>        
        
        </ScrollView>
   
    </KeyboardAvoidingView>
  );
}