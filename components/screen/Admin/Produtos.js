import React, { useEffect, useState } from 'react';
import { 
    View,
    Text,
    TouchableOpacity,
    KeyboardAvoidingView,
    SafeAreaView,
    FlatList,
    Alert,
    RefreshControl,
    Platform
} from 'react-native';
import StyleCardObj from '../../../Styles/StyleCardObj';
import SearchBar from '../SearchBar/SearchBar';
import StyleNewProduct from '../../../Styles/StyleNewProduct';
import { AntDesign } from '@expo/vector-icons';
import CardProduto from '../Card/CardProduto';
import { db, auth} from '../../../Services/Firebaseconfig';
import { doc, getDoc } from 'firebase/firestore';
export default function Produto({navigation}) {

    const behavior = Platform.OS === 'ios' ? 'padding' : 'height';
    const [searchPhrase, setSearchPhrasse] = useState("");
    const [clicked, setClicked] = useState(false);
    const [data1,setdata1] = useState();
    const[Donthave,SetDonthave] = useState(false);
    const [refreshing, setRefreshing] = React.useState();

    const [filteredData, setFilteredData] = useState(data1);
    const [ changeData,SetChangedata] = useState(false);

    const onRefresh = React.useCallback(async () => {
      setRefreshing(true);
      await fetchProdutos();
      setRefreshing(false);
    }, [data1]);

    const fetchProdutos = async () => {
      try {
          const user = auth.currentUser;
          const produtosRef = doc(db, user.uid, 'produtos');
          const produtosDoc = await getDoc(produtosRef);

          if (produtosDoc.exists()) {
              const produtosData = produtosDoc.data();
              const produtosList = produtosData.produtos || [];
              const verifiarForaStock = produtosList.filter(p => p.quantidade > 0)
              setdata1(verifiarForaStock);
              setFilteredData(verifiarForaStock);
          } else {
              console.log('Documento de produtos não encontrado');
              Alert.alert('Erro', 'Documento de produtos não encontrado');
          }
      } catch (error) {
          console.error('Erro ao buscar produtos:', error);
          Alert.alert('Erro', 'Erro ao buscar produtos');
      }
  };

   

  useEffect(()=>{
    fetchProdutos();
    console.log('changedata',changeData);
    console.log('data',data1);
  },[])


  const handleSearch = (text) => {
    const searchText = text.toLowerCase();
    setSearchPhrasse(searchText);
  
    const filtered = data1.filter((item) =>
      item.nome.toLowerCase().startsWith(searchText)
    );
    if (filtered != null)
      SetChangedata(!changeData);
    console.log(filtered)
    setFilteredData(filtered);
  };
  
  return (
    <KeyboardAvoidingView behavior={behavior} style={{flex:1,backgroundColor:'#fff'}}>
      <View style={{backgroundColor:'#fff'}}>
      <Text style={[StyleCardObj.text2,{}]}>Stock</Text>
    </View>
    <View style={{ flex: 1 }}>
            <SafeAreaView style={[StyleCardObj.root,{}]}>
                
            <SearchBar
                    searchPhrase={searchPhrase}
                    setSearchPhrase={handleSearch}
                    clicked={clicked}
                    setClicked={setClicked} />
            </SafeAreaView>
            <FlatList
              data={changeData ? filteredData : data1}
              keyExtractor={(item)=> item.id}
              refreshControl={
                <RefreshControl
                style={{ position: 'absolute', alignSelf: 'center', color: '#059669' }}
                refreshing={refreshing}
                onRefresh={onRefresh}
                />
              }
              renderItem={({item}) =>(
                <CardProduto 
                  key={item.id}
                  valor={item.valorvenda}
                  nome={item.nome}
                  quant={item.quantidade}
                  image={item.image}
                  onpress2={() => navigation.navigate('EditarProduto')}
                />
              )}
           />
           <TouchableOpacity style={{padding:20}} onPress ={() => navigation.navigate('CriarProduto')}>
              <View style={[StyleCardObj.conteiner3,StyleNewProduct.buttonnew,{marginBottom:20}]}>
              <Text style={[StyleNewProduct.text2,{marginHorizontal:85,top:1}]}>Criar Produto</Text>
                <AntDesign style={{top:-10, marginHorizontal:10,right:3,top:1,right:40}} name="pluscircle" size={24} color="black" />
              </View>
          </TouchableOpacity>
    </View>
        
  </KeyboardAvoidingView>
  );
}