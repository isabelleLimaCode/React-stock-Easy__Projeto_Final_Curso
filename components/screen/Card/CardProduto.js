import React, { useEffect, useState } from 'react';
import { 
    Dimensions, 
    View,
    Text,
    Image,
    TouchableOpacity,
    KeyboardAvoidingView,
    TextInput,
    Alert
} from 'react-native';
import { Ionicons,Feather,FontAwesome5} from '@expo/vector-icons';
import StyleCardStock from '../../../Styles/StyleCardStock';
export default function Teste({onpress1,onpress2,valor,nome,quant,image,changeColor,changeshadowColor}) {

    //const behavior = Platform.OS === 'ios' ? 'padding' : 'height';
    const [Changenumber, setChangenumber] = useState(0);
    const [quantidade, setquantidade] = useState(0);
    const numero = 1;
    useEffect(()=>{
        setChangenumber(quant);
    },[]);
    const handleIncrement = () => {
        if(Changenumber >= 0){
            const updatedNumber = Changenumber + 1;
            setChangenumber(updatedNumber);
            setquantidade(updatedNumber);
        }
       
    };

    const handleDecrement = () => {
        if ( Changenumber > 0){
            setChangenumber(Changenumber - 1);
            setquantidade(Changenumber);
        }
    };
   
    const handlePressOut = () => {
        Alert.alert(
            'Alterar quantidade em stock',
            'Deseja Realmente alterar ?',
            [
              {
                  text: 'Sim  ',
                  onPress : async () => {
                    
                  }
                },
              {
                text: 'Não',
               
              },
             
            ],
            { cancelable: false }
          );
    };

  
  return (
    <KeyboardAvoidingView  style={{ flex: 1 , backgroundColor:'#fff'}}>

    <View style= {{alignSelf:'center',marginTop:10,marginBottom:10}}>
        <View style={[StyleCardStock.conteiner,{shadowColor: changeshadowColor ? changeshadowColor : '#000' }]}>
               <Image style= {StyleCardStock.img} source={{ uri: image }}/> 
                <View style={{alignItems:'center'}}>
                <View style={StyleCardStock.conteiner2}/>
                  <Text style={StyleCardStock.text1}>{valor}€</Text>
                </View>
        <View style={StyleCardStock.conteiner3}>
            <Text style={StyleCardStock.text2}>{nome}</Text>
            <TextInput  
            style={{fontWeight:'bold',fontSize:16,color: changeColor ? changeColor : '#547c96'}}
            value={Changenumber.toString()}
            onChangeText={(text) => setChangenumber(parseInt(text) || 0)}
            />
            <TouchableOpacity onPress={handleDecrement} style={{left:10}} onPressOut={handlePressOut}>
                <Ionicons name="remove-circle" size={26}  />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleIncrement} style={{left:15}} onPressOut={handlePressOut}>
                <Ionicons name="add-circle-sharp" size={26} />    
            </TouchableOpacity>
            <TouchableOpacity style={{left:50}} onPress={onpress2}>
            <FontAwesome5 name="edit" size={24} color="black" />

            </TouchableOpacity>
          </View>
      </View>
    </View>
       
        
  </KeyboardAvoidingView>
  );
}