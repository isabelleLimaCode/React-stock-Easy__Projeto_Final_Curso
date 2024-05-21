import React, { useEffect, useState } from 'react';
import { 
    View,
    Text,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import StyleCardObj from '../../../Styles/StyleCardObj';
import { FlatList } from 'react-native-gesture-handler';
import CardMarckplace from '../Card/CardMarckplace';

export default function Marckplace({navigation,route}) {

    const behavior = Platform.OS === 'ios' ? 'padding' : 'height';
    const [searchPhrase, setSearchPhrasse] = useState("");
    const [clicked, setClicked] = useState(false);

    const[nomeempresa,setnomeempresa] = useState(route.params?.nomeempresa);
    const[imagem,setimagem] = useState(route.params?.imagem);
    const[cor,setcor] = useState(route.params?.cor);
    
    const data =[
        {key: '1', value:'Amazon',uri:require('../../../assets/amazon_logo.png'),cor:'#FFC72C'},
        {key: '2', value:'Fnac' , uri:require('../../../assets/Fnac-Logo.png'), cor:'#FFC72C'},
    ]
  return (
    <KeyboardAvoidingView behavior={behavior} style={{ flex: 1 , backgroundColor:'#fff'}}>
    
    <View>
        <Text style={[StyleCardObj.text2,{}]}>Marketplace</Text>
     </View>

     <View style={{}}>
            <FlatList
                data={data}
                keyExtractor={(item)=> item.id}
                renderItem={({item}) =>(
                <CardMarckplace 
                    empresa={item.value} 
                    imagem={item.uri} 
                    onPress={() => navigation.navigate('Vendas Marckplace', {nomeempresa:item.value,imagem:item.uri,cor:item.cor})}
                /> 
                       
                )}
            />
        </View>  

           
  </KeyboardAvoidingView>
  );
}