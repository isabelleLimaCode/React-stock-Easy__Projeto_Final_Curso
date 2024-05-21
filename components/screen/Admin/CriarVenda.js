import React, { useEffect, useState ,createContext} from 'react';
import { 
    Text, 
    View,
    Image,
    Alert,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    FlatList,
    TouchableOpacity
    
} from 'react-native';
import StyleCardObj from '../../../Styles/StyleCardObj';
import SearchBar from '../SearchBar/SearchBar';
import { AntDesign } from '@expo/vector-icons';
import CardCliente from '../Card/CardCliente';
import StyleNewProduct from '../../../Styles/StyleNewProduct';
import CardProduto2 from '../Card/CardProduto2';
import { db ,auth} from '../../../Services/Firebaseconfig';
import { getDoc,doc, collection, getDocs } from 'firebase/firestore';

export default function CriarVenda({navigation,route}) {

  const behavior = Platform.OS === 'ios' ? 'padding' : 'height';
  const [searchPhrase, setSearchPhrase] = useState("");
  const [searchPhrase2, setSearchPhrase2] = useState("");
  const [clicked, setClicked] = useState(false);
  const [clicked2, setClicked2] = useState(false);

  ///data 
  const [defaultValue, setDefaultValue] = useState(0);
  const [passadata,setpassadata] = useState(route.params?.passadata);
  const [passadata2,setpassadata2] = useState(route.params?.passadata2);
  const [newdata, setnewdata] = useState([]);
  const [newdata2, setnewdata2] = useState([]);
  //const { mostrar } = route.params || { mostrar: defaultValue };

  //quant
  //const { quantidade, SetQuantidade } = useProduct();

  

  //base da venda
  const [basededados,setBasededados] = useState([]);
  const [basededados2,setBasededados2] = useState([]);
  const [temdados,setTemdados] = useState(false);
  const [temdados2,setTemdados2] = useState(false);
  const [donthave,setdonthave] = useState();
  const [data1,setdata1] = useState();
  const [data2,setdata2] = useState();
  const [ changeData,SetChangedata] = useState(false);

    //filtrar
    const [filteredData, setFilteredData] = useState(data1);
    const [filteredData2, setFilteredData2] = useState(data2);


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
              console.log('clientes',clientesList);
          } else {
              console.log('Documento de clientes não encontrado');
              Alert.alert('Erro', 'Documento de clientes não encontrado');
          }
      } catch (error) {
          console.error('Erro ao buscar produtos:', error);
          Alert.alert('Erro', 'Erro ao buscar clientes');
      }
  };
    fetchCliente();

  },[]);

  
  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const user = auth.currentUser;
        const produtosRef = doc(db, user.uid, 'produtos');
        const produtosDoc = await getDoc(produtosRef);
  
        if (produtosDoc.exists()) {
          const produtosData = produtosDoc.data();
          const produtos = produtosData.produtos || [];
          const produtoDispo = produtos.filter(p => p.quantidade !== '0');
          setdata2(produtoDispo);
        } else {
          console.log('Documento de produtos não encontrado');
          Alert.alert('Erro', 'Documento de produtos não encontrado');
        }
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
        Alert.alert('Erro', 'Erro ao buscar produtos');
      }
    };
    fetchProdutos();
  }, []);
  



  
  const handleSearch = (text) => {
    const searchText = text.toLowerCase();
    setSearchPhrase(searchText);
    const filtered = data1.filter((item) =>
      item.nome.toLowerCase().startsWith(searchText)
    );
    if (filtered != null)
      SetChangedata(!changeData);
    setFilteredData(filtered);
  };

  const handleSearch2 = (text) => {
    const searchText = text.toLowerCase();
    setSearchPhrase2(text);
    const filtered = data2.filter((item) =>
      item.nome.toLowerCase().startsWith(searchText)
    );
    if (filtered != null)
      SetChangedata(!changeData);
      setFilteredData(filtered);
  };

  const additem =(item) =>{
    
  //const itemExists = basededados.some(existingItem => existingItem.key === item.key);
    if (basededados.length === 0) {
        setBasededados([...basededados, item]);
        setTemdados(true);
        setnewdata([...basededados, item])
    }else if(basededados.length  > 0 ){
      Alert.alert(
        'Atenção',
        'Já existe um cliente ! para alterar delete o atual',
        [
          {
            text: 'OK',
            onPress: () => console.log('OK Pressionado')
          }
        ],
        { cancelable: false }
      );
    }
    
  }

  const additem2 = (item) => {
    const itemExists = basededados2.some(existingItem => existingItem.codigodebarras === item.codigodebarras);
    if (!itemExists) {
      if (item.quantidade !== 0) {
        console.log('item adicionado ', item);
        setBasededados2([...basededados2, item]);
        setnewdata2([...basededados2, item]);
        setTemdados2(true);
      } else {
        Alert.alert('Produto', 'Produto fora de stock! Tente outro.');
      } 
    } else {
      Alert.alert('Produto', 'O produto já está no carrinho.');
    }
  }
  


    const removeItem = (keyToRemove) => {
        const updatedData = basededados.filter(item => item.key !== keyToRemove);
        setBasededados(updatedData);
        setTemdados(true); 
        if(basededados.length === 0){
          setdonthave(true);
        }
      }
      const removeItem2 = (itemToRemove) => {
        const updatedData = basededados2.filter(item => item.codigodebarras !== itemToRemove);
        //const updatedigual = basededados2.filter(item => item.codigodebarras === itemToRemove);
      
          setBasededados2(updatedData);
          console.log('removeu', updatedData);
          setTemdados2(true); 
          if (basededados2.length === 0) {
            setdonthave(true);
         }
        
        
    }
    
  
 /* useEffect(()=>{
    console.log(basededados2);
    console.log('passadata',newdata);
    console.log('passadata',newdata2);
  },[basededados2])*/

  const renderItem = ({ item }) => {
    return (
      <CardCliente 
        nome={item.nome}
        estado={item.estado}
        email={item.email}
        onpress={() => additem(item)}
        onPress2={() => removeItem(item.key)}
        icon={true}
        
      /> 
    );
  };

  const renderItem2 = ({ item }) => {
    return (
      <CardProduto2 
        nome={item.nome}
        valor={item.valorcompra}
        quant={item.quantidade}
        imagem={item.image}
        onpress1={() => additem2(item)}
        onpress2={()=> removeItem2(item.codigodebarras)}
      
      />
    );
  };

  
  


  return (
    <KeyboardAvoidingView behavior={behavior} style={{ flex: 1, backgroundColor:'#fff' }}>
     <View>
        <Text style={[StyleCardObj.text2,{}]}>Criar Venda</Text>
    </View>
            <SafeAreaView style={[StyleCardObj.root,{}]}>
            <Text style={{fontWeight:'bold',alignSelf:'flex-start',left:10}}>    Nome: </Text>
                    <SearchBar
                        searchPhrase={searchPhrase}
                        setSearchPhrase={handleSearch}
                        clicked={clicked}
                        setClicked={setClicked}
                        texto={'Pesquise o nome do cliente'} 
                        />
                {searchPhrase &&( 
                 
                      <FlatList
                        data={filteredData}
                        keyExtractor={(item) => item.id}
                        renderItem={renderItem}
                    />
                 
                        
                )}
            <Text style={{fontWeight:'bold',alignSelf:'flex-start',left:10}}>    Produto: </Text>
                    <SearchBar
                        searchPhrase={searchPhrase2}
                        setSearchPhrase={handleSearch2}
                        clicked={clicked2}
                        setClicked={setClicked2}
                        texto={'Pesquise nome do produto'} 
                        />
                {searchPhrase2 &&( 
                  
                       <FlatList
                        data={filteredData}
                        keyExtractor={(item) => item.id}
                        renderItem={renderItem2}
                    />
                  
                   
                )}
                </SafeAreaView>

                <Text style={{
                        fontWeight:'bold',
                        fontSize:18,
                        left:20
                    }}>Cliente</Text>
                <View style={{
                     borderWidth:3,borderColor:'#9fd86b',marginTop:10, width:370,left:10
                }}>
                  {temdados &&(
                        <FlatList
                            data={basededados}
                            keyExtractor={(item) => item.id}
                            renderItem={renderItem}
                        />
                    )}
                    {basededados.length == 0 &&(
                      <View>
                         <Text style ={{
                             textAlign:'center',
                             fontWeight:'800',
                             fontSize:12,
                             color:'#FF0000'
                         }}>
                         Ops! não foi selecionado o cliente
                         </Text>
                    </View>
                    )}
                </View>
                <Text style={{
                                fontWeight:'bold',
                                fontSize:18,
                                left:20,
                                marginTop:10
                            }}>Produtos</Text>
               <View style={{
                    borderWidth:3,borderColor:'#059b9a',marginTop:10,width:370,left:10
                }}>
                      {temdados2 &&(
                            <FlatList
                                data={basededados2}
                                keyExtractor={(item) => item.id}
                                renderItem={renderItem2}
                            />
                        )}
                        {basededados2.length === 0 &&(
                          
                            <View>
                              <Text style ={{
                                  textAlign:'center',
                                        fontWeight:'800',
                                        fontSize:12,
                                        color:'#FF0000'
                                    }}>
                                    Ops! não foi selecionado o produto
                              </Text>
                            </View>
                          
                        )}
                
               </View>

        <TouchableOpacity style={{alignItems:'center'}} onPress={() => navigation.navigate('carrinho', {passadata:newdata, passadata2:newdata2})}>
            <View style={[StyleCardObj.conteiner3,StyleNewProduct.buttonnew]}>
            <Text style={[StyleNewProduct.text2,{marginHorizontal:85,top:2}]}>Próximo</Text>
            <AntDesign style={{top:-10, marginHorizontal:10,right:3,top:1,right:40}} name="arrowright" size={24} color="black" />
            </View>
        </TouchableOpacity>
               
      
    </KeyboardAvoidingView>
  );
}