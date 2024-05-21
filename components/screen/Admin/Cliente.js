import React, { useEffect, useState } from 'react';
import { 
    Dimensions, 
    View,
    Text,
    Image,
    TouchableOpacity,
    KeyboardAvoidingView,
    ScrollView,
    SafeAreaView,
    RefreshControl,
    Platform,
    FlatList,
} from 'react-native';
import StyleCardObj from '../../../Styles/StyleCardObj';
import SearchBar from '../SearchBar/SearchBar';
import CardCliente from '../Card/CardCliente';
import { AntDesign } from '@expo/vector-icons';
import StyleNewProduct from '../../../Styles/StyleNewProduct';
import { db ,auth} from '../../../Services/Firebaseconfig';
import { getDoc,doc ,setDoc} from 'firebase/firestore';

export default function Cliente({navigation}) {

    const behavior = Platform.OS === 'ios' ? 'padding' : 'height';
    const [searchPhrase, setSearchPhrasse] = useState("");
    const [clicked, setClicked] = useState(false);
    const [donthave,setdonthave] = useState(false);
    const [refreshing, setRefreshing] = React.useState();

    //fecth data
    const [data1,setdata1] = useState();
    const [refreshing1, setRefreshing1] = React.useState();
    const [ changeData,SetChangedata] = useState(false);

    const onRefresh1 = React.useCallback(async () => {
      setRefreshing(true);
      await fetchCliente();
      setRefreshing(false);
    }, [data1]);


    useEffect(()=>{
      const fetchCliente = async () => {
        try {
            const user = auth.currentUser;
            const clientesRef = doc(db, user.uid, 'clientes');
            const clientesDoc = await getDoc(clientesRef);
  
            if (clientesDoc.exists()) {
                const clientesData = clientesDoc.data();
                const clientesList = clientesData.clientes || [];
                setdata1(clientesList);
            } else {
                console.log('Documento de clientes não encontrado');
                Alert.alert('Erro', 'Documento de clientes não encontrado');
            }
        } catch (error) {
            console.error('Erro ao buscar clientes:', error);
            Alert.alert('Erro', 'Erro ao buscar clientes');
        }
    };
      fetchCliente();

    },[]);
    
    

    const [filteredData,setFilteredData] = useState(data1);
    const onRefresh = React.useCallback(async () => {
      setRefreshing(true);
      
      setTimeout(() => {
        setdonthave((prevDonthave) => !prevDonthave);
        setRefreshing(false);
      }, 2000);
    }, []);

    const handleSearch2 = (text) => {
      const searchText = text.toLowerCase();
      setSearchPhrasse(searchText);
      const filtered = data1.filter((item) =>
        item.nome.toLowerCase().startsWith(searchText)
      );
      if (filtered != null)
        SetChangedata(!changeData);
      setFilteredData(filtered);
    };

    const renderitem = ({item}) => {
      return(
        <CardCliente 
          nome={item.nome} 
          estado={'ativo'}
          onpress={() => navigation.navigate('editcliente')}
          email={item.email}
        />
      )
    }
   
  

  return (
    <KeyboardAvoidingView behavior={behavior} style={{ flex: 1 , backgroundColor:'#fff'}}>
      
     <View>

        <Text style={[StyleCardObj.text2,{}]}>Cliente</Text>
     </View>
        {donthave ? (
              <ScrollView
              refreshControl={
                <RefreshControl
                style={{ position: 'absolute', alignSelf: 'center', color: '#059669' }}
                refreshing={refreshing1}
                onRefresh={onRefresh1}
                />
              }>
              <View>
              <Image style={{ 
                  width: 250, 
                  height: 250,
                  alignSelf:'center',
                  marginTop:50,

              }} 
                  source={require('./../../../assets/cliente.png')} />
                  <Text style={{
                      textAlign:'center',
                      fontWeight:'bold',
                      fontSize:20,
                      marginTop:30
                  }}>Ops! Não há clientes</Text>
          </View>
          </ScrollView>
        ):(
          <View>
            <SafeAreaView style={[StyleCardObj.root,{}]}>
                      
                      <SearchBar
                          searchPhrase={searchPhrase}
                          setSearchPhrase={handleSearch2}
                          clicked={clicked}
                          setClicked={setClicked} />
                  </SafeAreaView>

                  <FlatList
                      data={changeData ? filteredData : data1}
                      keyExtractor={(item)=> item.id}
                      renderItem={renderitem}
                      refreshControl={
                        <RefreshControl
                        style={{ position: 'absolute', alignSelf: 'center', color: '#059669' }}
                        refreshing={refreshing1}
                        onRefresh={onRefresh1}
                        />
                      }
                  />
                   
          </View>
        )}
     

            <TouchableOpacity style={{justifyContent:'space-between',padding:20}} onPress ={() => navigation.navigate('CriarCliente')}>
            <View style={[StyleCardObj.conteiner3,StyleNewProduct.buttonnew,{marginBottom:20}]}>
            <Text style={[StyleNewProduct.text2,{marginHorizontal:85,top:1}]}>Criar Cliente</Text>
            <AntDesign style={{top:-10, marginHorizontal:10,right:3,top:1,right:40}} name="pluscircle" size={24} color="black" />
            </View>
            </TouchableOpacity>    
  </KeyboardAvoidingView>
  );
}