import React, { useEffect, useState } from 'react';
import { 
    Dimensions, 
    View,
    Text,
    Image,
    TouchableOpacity,
    KeyboardAvoidingView,
    ScrollView,
    Platform,
    FlatList
} from 'react-native';
import StyleCardObj from '../../../Styles/StyleCardObj';
import { FontAwesome5,AntDesign} from '@expo/vector-icons';
import CardMarckplaceVenda from '../Card/CardMarckplaceVenda';

export default function VendasMarckplace({navigation,route}) {

    const behavior = Platform.OS === 'ios' ? 'padding' : 'height';
    const[Donthave,SetDonthave] = useState(false);
    const [clicked, setClicked] = useState(false);
    const [searchPhrase, setSearchPhrasse] = useState("");
    const { nomeempresa } = route.params;
    const {imagem } = route.params;
    const {cor} = route.params;

    const[nomeempresa1,setnomeempresa] = useState(route.params?.nomeempresa1);
    const [valor,setvalor] = useState(route.params?.valor);
    const data = [
      {
          key:1,
          nomeempresa: nomeempresa,
          nome: 'Camisa Branca',
          stock: 10,
          imagem: require('../../../assets/blusa.jpg'),
          pen: true,
          valor:10,
      },
      {
        key:2,
        nomeempresa: nomeempresa,
        nome: 'Camisa Branca',
        stock: 10,
        imagem: require('../../../assets/blusa.jpg'),
        pen: true,
        valor:15
    }
  ];

  

  
  return (
    <KeyboardAvoidingView behavior={behavior} style={{ flex: 1 , backgroundColor:'#fff'}}>
    
  
      
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign style={{left:10}} name="back" size={24} color="black" />
          </TouchableOpacity>
        <View>
          <Text style={[StyleCardObj.text2,{top:40}]}> Vendas {nomeempresa}</Text>
          <Image
                  style={{ width: 150, height: 150, resizeMode: "contain",alignSelf:'center' }}
                  source={imagem}
          />
        </View>
        
     

    {Donthave ?(
         <View>
         <ScrollView
         /*
           refreshControl={
             <RefreshControl
               style={{ position: 'absolute', alignSelf: 'center', color: '#059669' }}
               refreshing={refreshing}
               onRefresh={onRefresh}
             />
           }*/
         >
           <Image style={{ width: 250, height: 250,marginBottom: 10,alignSelf: 'center',marginTop:150 }} source={require('./../../../assets/Businesssolution.gif')} />
           <Text style={{ alignSelf: 'center', top: -25, fontWeight: 'bold', marginTop:20 }}>Oh! Não tem produtos a venda!</Text>
           <Text style={{ alignSelf: 'center', top: -25, fontWeight: 'bold' }}>publique teu negócio na plataformas disponiveis!</Text>
         </ScrollView>
       </View>
    ): (
     <FlatList
      data={data}
      keyExtractor={(item)=> item.id}
      renderItem={({item}) =>(
        <CardMarckplaceVenda 
        nome={item.nome}
        imagem={item.imagem}
        stock={item.stock}
        pen={item.pen}
        onpress={() => navigation.navigate('editvendas', { nomeempresa1: item.nomeempresa ,valor:item.valor})}
        />       
      )}
     />
    )}

            <TouchableOpacity
                style={{
                  backgroundColor: cor,
                  padding: 10,
                  borderRadius: 5,
                  justifyContent: "center",
                  alignItems: "center",
                  marginHorizontal: 10,
                  top:-50
                }}
              >
            <Text>Publicar</Text>
          </TouchableOpacity>
        
  </KeyboardAvoidingView>
  );
}