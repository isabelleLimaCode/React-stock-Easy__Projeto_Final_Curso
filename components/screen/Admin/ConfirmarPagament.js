import React, { useEffect, useState } from 'react';
import { 
    Text, 
    View,
    Image,
    ScrollView,
    TextInput,
    Keyboard,
    TouchableOpacity,
    KeyboardAvoidingView,
    Switch,
    Platform
} from 'react-native';
import StyleCardObj from '../../../Styles/StyleCardObj';
import { AntDesign} from '@expo/vector-icons';
import StyleDiscont from '../../../Styles/StyleDiscont';
export default function ConfirmarPagamento({navigation}) {

    const behavior = Platform.OS === 'ios' ? 'padding' : 'height';

    //button toogle switch 
    const [isEnable,setIsEnable] = useState(false);
    const toogleSwitch = () => setIsEnable(previousState => !previousState);
  return (
   
   <KeyboardAvoidingView behavior={behavior} style={{ flex: 1 , backgroundColor:'#fff'}}>
    <ScrollView>
    <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign style={{left:10,top:10}} name="back" size={24} color="black" />
    </TouchableOpacity>

        <Text style={StyleCardObj.text2}>Pagamento</Text>

        <View style={[StyleDiscont.switchContainer,{alignSelf:'flex-end',left:-26}]}>
            <Text style={StyleDiscont.text2}>Confirmar Pagamento</Text>
            <Text style={StyleDiscont.switchText}>{isEnable ? 'Sim' : 'Não'}</Text>
            <Switch
                trackColor={{false:'#FF6347', true:'#3CB371'}}
                thumbColor={isEnable ? '#fff' : '#f4f3f4'}
                ios_backgroundColor={'#FF6347'}
                onValueChange={toogleSwitch}
                value ={isEnable}
                style = {StyleDiscont.Switchstyle}
                onChange={isEnable ? (console.log("yes")): (console.log("No"))}
                
            />
        </View>
        <Image
                  style={{ 
                    width: 400, 
                    height: 400, 
                    resizeMode: "contain",
                    alignSelf:'center',
                    top:10 
                }}
                  source={{
                    uri: "https://firebasestorage.googleapis.com/v0/b/stock-easy-7eced.appspot.com/o/imgs%2FCredit%20card-cuate.png?alt=media&token=db377f8a-155f-4121-94b2-09eda18f7b5c",
                  }}
        />
        <Text style={{alignSelf:'center',fontWeight:'bold',marginTop:20,fontSize:16}}>Depois irá adicionar aos lucros e vendas!</Text>

    </ScrollView>
   </KeyboardAvoidingView>
  );
}