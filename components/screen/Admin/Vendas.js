import React, { useEffect, useState } from 'react';
import { 
    Text, 
    View,
    TouchableOpacity,
    SafeAreaView,
    FlatList,
    Image,
} from 'react-native';
import StyleVenda from '../../../Styles/StyleVenda';
import SearchBar from '../SearchBar/SearchBar';
import StyleCardObj from '../../../Styles/StyleCardObj';
import CardEncomenda from '../Card/CardEncomenda';
import { db, auth} from '../../../Services/Firebaseconfig';
import { doc, getDoc ,onSnapshot} from 'firebase/firestore';
import { set } from 'firebase/database';

export default function Vendas({navigation,route}) {

  const [SelectedButton, SetSelectedButton] = useState(1);
  const[nEncomenda,setnEncomenda] = useState(route.params?.nEncomenda);
  const [data1,setdata1] = useState([]);

  //buscar dados 
  const[DadosEncomenda,setDadosEncomenda] = useState(route.params?.DadosEncomenda);
  const[DadosCliente,setDadosCliente] = useState(route.params?.DadosCliente);
  const[dataencomeda,,setdataencomenda] = useState(route.params?.datadaEncomenda);

  const [Nvendas,setNvendas] = useState(false);

  
  useEffect(()=>{
    const user = auth.currentUser;
    const vendasRef = doc(db, user.uid, 'Vendas');
    const unsubscribe = onSnapshot(vendasRef, (vendasDoc) =>{
    const fetchProdutos = async () => {
      try {
          
          const vendasDoc = await getDoc(vendasRef);

          if (vendasDoc.exists()) {
            const vendaData = vendasDoc.data();
            const vendLista = vendaData || [];
            setdata1(vendLista);
            console.log(vendLista);
            console.log(data1);
            setNvendas(false);
          } else {
              console.log('Documento de vendas não encontrado');
              Alert.alert('Erro', 'Documento de vendas não encontrado');
              setNvendas(true);
          }
      } catch (error) {
          console.error('Erro ao buscar vendas:', error);
          Alert.alert('Erro', 'Erro ao buscar vendas');
      }
    }
    fetchProdutos();
  });
  return () => unsubscribe();
},[])

  const data =[
    {key: '1', value:'12888',estado:'Aceitar encomenda '},
    {key: '2', value:'12889' , estado:'Aceitar encomenda'},
    {key: '3', value:'12675' , estado:'Aceitar encomenda'}
  ]
  const data2 =[
    {key: '1', value:'76543',estado:'Finalizado'},
    {key: '2', value:'34576' ,estado:'Finalizado'},
    {key: '3', value:'77857' ,estado:'Finalizado'}
  ]
const [filteredData, setFilteredData] = useState(data1);
const [filteredData2, setFilteredData2] = useState(data);

  //searchbar
  const [searchPhrase, setSearchPhrasse] = useState("");
  const [clicked, setClicked] = useState(false);

  //alterar os dados dos botões
  const [SelectEntrada,SetSelectedEntrada] = useState(1);
  const [SelectSaida,SetSelectedSaida] = useState(0);

  
 

  const btn1selecionado = () => {
    SetSelectedButton(1);
    SetSelectedEntrada(1);
    SetSelectedSaida(0);
  };

  const btn2selecionado = () => {
    SetSelectedButton(2);
    SetSelectedEntrada(0);
    SetSelectedSaida(1);
  };
  const handleSearch = (text) => {
    setSearchPhrasse(text);
    
    const filtered = data1.filter((item) =>
      item.value.toString().startsWith(text.trim())
    );
    
    setFilteredData(filtered);
  };

  const handleSearch2 = (text) => {
    setSearchPhrasse(text);
    
    const filtered = data2.filter((item) =>
      item.value.toString().startsWith(text.trim())
    );
    
    setFilteredData2(filtered);
  };

  return (
    <View style={{backgroundColor:'#fff', flex:1}}>

            <SafeAreaView style={StyleCardObj.root}>
                
                <SearchBar
                    searchPhrase={searchPhrase}
                    setSearchPhrase={ SelectEntrada === 1 ? (handleSearch) : (handleSearch2) }
                    clicked={clicked}
                    setClicked={setClicked} />
            </SafeAreaView>
      
      <View style ={StyleVenda.btnContainerBest}>      
                <TouchableOpacity
                style={[StyleVenda.btnBest, SelectedButton === 1 ? StyleVenda.selectedBtnBetst : null]}
                onPress={btn1selecionado}>
                    <Text style={[StyleVenda.buttonText, SelectedButton === 1 ? StyleVenda.selectedBtnbuttonText : null]}>Entrada</Text>
                </TouchableOpacity>  
            
            
                <TouchableOpacity
                style={[StyleVenda.btnBest, SelectedButton === 2 ? StyleVenda.selectedBtnBetst : null]}
                onPress={btn2selecionado}>
                    <Text style={[StyleVenda.buttonText, SelectedButton === 2 ? StyleVenda.selectedBtnbuttonText : null]}>Saída</Text>
                </TouchableOpacity> 
                                                                             
        </View>
        
        {SelectEntrada == 1 ? (
          <FlatList
            data={data1["Venda"]}
            keyExtractor={(item) =>  item.codVenda.toString()}
            renderItem={({ item }) => (
              <CardEncomenda
                estado={item.estadoVenda}
                encomenda={item.codVenda}
                onPress={() => navigation.navigate('EditarEncomenda', {nEncomenda: item.codVenda ,DadosEncomenda:item.produtos,DadosCliente:item.nomeCliente,dataencomeda:item.datadaEncomenda })}
                onpress2={() => navigation.navigate('visualizarEncomenda', { nEncomenda: item.codVenda ,DadosEncomenda:item.produtos,DadosCliente:item.nomeCliente,dataencomeda:item.datadaEncomenda})}
              />
            )}
          />
        ):null}

          { Nvendas == true  && SelectSaida == 2? (
                 <View style={{marginBottom:150}}>
                  <Image style={{ width: 250, height: 250,alignSelf: 'center'}} source={require('./../../../assets/NaohaVendas.png')} />
                          <Text style ={{
                              textAlign:'center',
                              fontWeight:'800',
                              fontSize:20,
                              marginTop:10
                          }}>
                          Ops! Não há Vendas
                          </Text>
                  </View>
                ):null}



            {SelectSaida == 1 ?(
                  
                  <FlatList
                  data={filteredData2.length === 0 ? data2 : filteredData2}
                  keyExtractor={(item)=> item.id}
                  renderItem={({item}) =>(
                  <CardEncomenda 
                      estado={item.estado}
                      encomenda={item.value}
                      onpress2={()=> navigation.navigate('visualizarEncomenda',{nEncomenda: item.value})}
                  /> 
                  )}
                />):null}

                { Nvendas == true  && SelectSaida == 1? (
                 <View style={{marginBottom:150}}>
                  <Image style={{ width: 250, height: 250,alignSelf: 'center'}} source={require('./../../../assets/NaohaVendas.png')} />
                          <Text style ={{
                              textAlign:'center',
                              fontWeight:'800',
                              fontSize:20,
                              marginTop:10
                          }}>
                          Ops! Não há Vendas
                          </Text>
                  </View>
                ):null}

    </View>
  );
}