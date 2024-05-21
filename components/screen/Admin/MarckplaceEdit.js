import React, { useEffect, useState } from 'react';
import { 
    Dimensions, 
    View,
    Text,
    Image,
    TouchableOpacity,
    KeyboardAvoidingView,
    ScrollView,
    Platform
} from 'react-native';
import StyleCardObj from '../../../Styles/StyleCardObj';
import { FontAwesome5,AntDesign} from '@expo/vector-icons';
import CardMarckplaceVenda from '../Card/CardMarckplaceVenda';
import SwipeButton from '../SwipeButton/SwipeButton';
export default function MarckplaceEdit({navigation,route}) {

    const behavior = Platform.OS === 'ios' ? 'padding' : 'height';
    const[Donthave,SetDonthave] = useState(false);
    const [clicked, setClicked] = useState(false);
    const [searchPhrase, setSearchPhrasse] = useState("");

    const { nomeempresa1 } = route.params;
    const {valor} = route.params;

    //gesture handler
    const [locked,setLocked] = useState(true);

    //ativo ou n
    const  [ativo,Setativo] = useState(false);
 
  return (
    <KeyboardAvoidingView behavior={behavior} style={{ flex: 1 , backgroundColor:'#fff'}}>
    
    <ScrollView style={{backgroundColor:'#fff',marginTop:40}}>
        <View style={{}}>
          <Text style={[StyleCardObj.text2,{top:90}]}> Vendas {nomeempresa1}</Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign style={{left:10}} name="back" size={24} color="black" />
          </TouchableOpacity>
        </View>
        
     

    {Donthave ?(
         <View>
         <ScrollView>
           <Image style={{ width: 250, height: 250,marginBottom: 10,alignSelf: 'center',marginTop:150 }} source={require('./../../../assets/Businesssolution.gif')} />
           <Text style={{ alignSelf: 'center', top: -25, fontWeight: 'bold', marginTop:20 }}>Oh! Não tem produtos a venda!</Text>
           <Text style={{ alignSelf: 'center', top: -25, fontWeight: 'bold' }}>publique teu negócio na plataformas disponiveis!</Text>
         </ScrollView>
       </View>
    ): (
     <View style={{marginTop:100}}>
        <CardMarckplaceVenda nome={'camisa'} pen={false} imagem={require('../../../assets/blusa.jpg')} stock={10} valor={10}/>

        <Text style={{
                marginTop:25,
                left:40,
                fontWeight:'bold',
                fontSize:16
            }}>Estado da Venda:
        </Text>
        
        <View style ={{
            width:70,
            height:22,
            backgroundColor:'#000',
            left:40,
            marginTop:10,
            borderRadius:10
        }}>
        <View>
        <View style={{
             width:8, 
             height:8,
             ...(ativo ? { backgroundColor: '#32CD32' } : { backgroundColor: '#8B0000' }),
             borderRadius:4,
             top:6,
             left:7
        }}/>
        <Text style={{
            color:'#fff',
            top:-5,
            left:18
        }}>
             {ativo ? 'Ativo' : 'Inativo'}
        </Text>

        </View>
        
        </View>
        <View style={{marginHorizontal:40,marginTop:150}}>
        <SwipeButton OnEndSwapp={(status) => setLocked(status)} MarginOrginal={80} Texton='Deletar' TextOff='Finalizado'/>
        </View>
     </View>
    )}

        <Text style={{
            alignSelf:'center',
            textAlign:'center',
            marginTop:20,
            fontWeight:'bold',
            fontSize:14
        }}>
        O produto será deletado da plataforma, irá
        mudar teu estado para inativo.
        </Text>
</ScrollView>         
  </KeyboardAvoidingView>
  );
}