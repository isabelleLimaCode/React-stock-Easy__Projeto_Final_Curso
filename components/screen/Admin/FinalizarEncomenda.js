import React, { useEffect, useState ,useRef} from 'react';
import { 
    Text, 
    View,
    ScrollView,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform
} from 'react-native';
import StyleCardObj from '../../../Styles/StyleCardObj';
import { AntDesign} from '@expo/vector-icons';
import SwappieButton from '../SwipeButton/SwipeButton';

export default function FinalizarEncomenda ({navigation}) {
   

    const behavior = Platform.OS === 'ios' ? 'padding' : 'height';


    //button toogle switch 
    const [isEnable,setIsEnable] = useState(false);
    const toogleSwitch = () => setIsEnable(previousState => !previousState);

    //gesture handler
    const [locked,setLocked] = useState(true);
   
  return (
   
   <KeyboardAvoidingView behavior={behavior} style={{ flex: 1 , backgroundColor:'#fff'}}>
    <ScrollView>
    <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign style={{left:10,top:10}} name="back" size={24} color="black" />
     </TouchableOpacity>

      <Text style={[StyleCardObj.text2,{left:15}]}>Finalizar encomenda </Text>
      

       <View style={{marginHorizontal:40,marginTop:50}}>
          <SwappieButton OnEndSwapp={(status) => setLocked(status)} MarginOrginal={80}/>
       </View>
      
      <Text style = {{
        fontWeight:'bold',
        textAlign:'center',
        marginTop:100,
        marginHorizontal:20,
        fontSize:16
      }}> Após isso, o estado da venda ira alterar para concluido!</Text>
  
     
     <TouchableOpacity style ={{
         backgroundColor:'#6B4EFF',
         width:327,
         height:48,
         borderRadius:48,
         alignSelf:'center',
         marginTop:250,
     }}>
      <Text style={{
        alignSelf:'center',
        marginTop:15,
        marginBottom:15,
        fontWeight:'bold',
      }}> Cancelar </Text>
     </TouchableOpacity>
  

    </ScrollView>
   </KeyboardAvoidingView>
  );
}