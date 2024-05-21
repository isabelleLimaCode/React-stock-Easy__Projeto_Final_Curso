import React, { useEffect, useState } from 'react';
import { 
    Text, 
    View,
    Image,
    TouchableOpacity,
    SafeAreaView,
    KeyboardAvoidingView,
    ScrollView,
    FlatList,
    RefreshControl,
    Platform
} from 'react-native';
import StyleNewProduct from '../../../Styles/StyleNewProduct';
import SearchBar from '../SearchBar/SearchBar';
import StyleCardObj from '../../../Styles/StyleCardObj';
import { AntDesign } from '@expo/vector-icons';
import CardRelatorio from '../Card/CardRelatorio';
export default function Relatorio({navigation}) {
    const behavior = Platform.OS === 'ios' ? 'padding' : 'height';


  //searchbar
  const [Donthave , setDonthave] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [searchPhrase, setSearchPhrasse] = useState("");
  const [refreshing, setRefreshing] = React.useState();


  const data = [
    {key: 1 , numero: '12896'},
    {key: 2 , numero: '12888'},
    {key: 3 , numero: '12888'}
  ];
  const [filteredData, setFilteredData] = useState(data);
  
  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    
    setTimeout(() => {
      setDonthave((prevDonthave) => !prevDonthave);
      setRefreshing(false);
    }, 2000);
  }, []);
  

  const renderitem = ({item}) =>{
    return (
    <CardRelatorio nEncomenda={item.numero}/>
    )
  }
  const handleSearch = (text) => {
    setSearchPhrasse(text);
    
    const filtered = data.filter((item) =>
      item.numero.toString().startsWith(text.trim())
    );
    
    setFilteredData(filtered);
  };

  
  

  return (
    <KeyboardAvoidingView behavior={behavior} style={{ flex: 1, backgroundColor:'#fff' }}>
    
    <View>
                <Text style={StyleCardObj.text2}> Relatório </Text>
    </View>
         
             <SafeAreaView style={StyleCardObj.root}>
                <SearchBar
                searchPhrase={searchPhrase}
                setSearchPhrase={handleSearch}
                clicked={clicked}
                setClicked={setClicked} />
            </SafeAreaView>
         
        
            {Donthave == true ? (
               <ScrollView style={{backgroundColor:'#fff',marginTop:10}}
               refreshControl={
                  <RefreshControl
                      style={{position:'absolute',alignSelf:'center', color:'#059669'}}
                      refreshing={refreshing}
                      onRefresh={onRefresh}
                  />
              }
          >
                <View>
                     <Image style={{ 
                        width: 250, 
                        height: 250,
                        alignSelf:'center',
                        marginTop:50
                    }} 
                        source={require('./../../../assets/Data.gif')} />
                        <Text style={{
                            textAlign:'center',
                            fontWeight:'bold',
                            fontSize:20,
                            marginTop:30
                        }}>Ops! Não há relatórios</Text>
                </View>
                </ScrollView>
            ) : (
               <View>
                <FlatList
                    data={filteredData.length === 0 ? data : filteredData}
                    keyExtractor={(item) => item.key.toString()}
                    renderItem={renderitem}
                    refreshControl={
                      <RefreshControl
                          style={{position:'absolute',alignSelf:'center', color:'#059669'}}
                          refreshing={refreshing}
                          onRefresh={onRefresh}
                      />
                  }
                />
                </View>
            )}
    
        <TouchableOpacity style={{alignItems:'center'}} onPress={() => navigation.navigate('CriarRelatorio')}>
            <View style={[StyleCardObj.conteiner3,StyleNewProduct.buttonnew]}>
            <Text style={[StyleNewProduct.text2,{marginHorizontal:85,top:2}]}>Adicionar Relatório</Text>
            <AntDesign style={{top:-10, marginHorizontal:10,right:3,top:1,right:40}} name="pluscircle" size={24} color="black" />
            </View>
        </TouchableOpacity>


    </KeyboardAvoidingView>
  );
}