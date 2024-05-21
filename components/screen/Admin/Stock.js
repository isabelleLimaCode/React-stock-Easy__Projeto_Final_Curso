import React, { useEffect, useState } from 'react';
import { 
    Text, 
    View,
    Image,
    TouchableOpacity,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,    
} from 'react-native';
import StyleCardObj from '../../../Styles/StyleCardObj';
import StyleNewProduct from '../../../Styles/StyleNewProduct';
import SearchBar from '../SearchBar/SearchBar';
import { AntDesign } from '@expo/vector-icons';
import CardProduto from '../Card/CardProduto';

export default function Stock() {

    const [searchPhrase, setSearchPhrasse] = useState("");
    const [clicked, setClicked] = useState(false);
    const[Donthave,SetDonthave] = useState(false);
    const [refreshing, setRefreshing] = React.useState();

    const onRefresh = React.useCallback(async () => {
        setRefreshing(true);
        await fetchData();
        setRefreshing(false);
      }, [SetDonthave]);

  const behavior = Platform.OS === 'ios' ? 'padding' : 'height';

  return (
    <KeyboardAvoidingView behavior={behavior} style={{ flex: 1, backgroundColor:'#fff' }}>
      <ScrollView style={{backgroundColor:'#fff',marginTop:40}}>

        <SafeAreaView style={StyleCardObj.root}>
                

                {!clicked }
                <SearchBar
                    searchPhrase={searchPhrase}
                    setSearchPhrase={setSearchPhrasse}
                    clicked={clicked}
                    setClicked={setClicked} />
            </SafeAreaView>

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
                   <Image style={{ width: 250, height: 250,marginBottom: 10,alignSelf: 'center',marginTop:30 }} source={require('./../../../assets/Businesssolution.gif')} />
                   <Text style={{ alignSelf: 'center', top: -25, fontWeight: 'bold', marginTop:20 }}>Oh! Não tem produtos!</Text>
                   <Text style={{ alignSelf: 'center', top: -25, fontWeight: 'bold' }}>Adicione novos produtos para</Text>
                   <Text style={{ alignSelf: 'center', top: -25, fontWeight: 'bold' }}>começar o seu negócio </Text>
                 </ScrollView>
               </View>
            ): (
             <View>
                <CardProduto nome ='Produto de beleza' codigo='123456789123' valor='20' quant={10}/>
             </View>
            )}
      
      </ScrollView>

      <TouchableOpacity style={{alignItems:'center'}}>
            <View style={[StyleCardObj.conteiner3,StyleNewProduct.buttonnew]}>
            <Text style={[StyleNewProduct.text2,{marginHorizontal:85,top:2}]}>Adicionar Produto</Text>
            <AntDesign style={{top:-10, marginHorizontal:10,right:3,top:1,right:40}} name="pluscircle" size={24} color="black" />
            </View>
        </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

