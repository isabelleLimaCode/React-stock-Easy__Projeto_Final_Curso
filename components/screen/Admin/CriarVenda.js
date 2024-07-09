import React, { useEffect, useState ,useCallback} from 'react';
import { 
    Text, 
    View,
    Alert,
    KeyboardAvoidingView,
    SafeAreaView,
    FlatList,
    TouchableOpacity,
} from 'react-native';
import StyleCardObj from '../../../Styles/StyleCardObj';
import SearchBar from '../SearchBar/SearchBar';
import { AntDesign } from '@expo/vector-icons';
import CardCliente from '../Card/CardCliente';
import StyleNewProduct from '../../../Styles/StyleNewProduct';
import CardProduto2 from '../Card/CardProduto2';
import { db, auth } from '../../../Services/Firebaseconfig';
import { doc, onSnapshot } from 'firebase/firestore';

export default function CriarVenda({ navigation }) {
    const [searchPhrase, setSearchPhrase] = useState("");
    const [searchPhrase2, setSearchPhrase2] = useState("");
    const [clicked, setClicked] = useState(false);
    const [clicked2, setClicked2] = useState(false);

    const [basededados, setBasededados] = useState([]);
    const [basededados2, setBasededados2] = useState([]);
    const [temdados, setTemdados] = useState(false);
    const [quantidadeSelecionada, setQuantidadeSelecionada] = useState();
    const [temdados2, setTemdados2] = useState(false);
    const [data1, setdata1] = useState([]);
    const [data2, setdata2] = useState([]);
    const [donthave, setdonthave] = useState(false);

    const [filteredData, setFilteredData] = useState([]);
    const [filteredData2, setFilteredData2] = useState([]);

    const [newdata, setNewdata] = useState([]);
    const [newdata2, setNewdata2] = useState([]);

    useEffect(() => {
        const fetchCliente = () => {
            const user = auth.currentUser;
            const clientesRef = doc(db, user.uid, 'clientes');

            const unsubscribe = onSnapshot(clientesRef, (docSnapshot) => {
                if (docSnapshot.exists()) {
                    const clientesData = docSnapshot.data();
                    const clientesList = clientesData.clientes || [];
                    setdata1(clientesList);
                } else {
                    console.log('Documento de clientes não encontrado');
                    Alert.alert('Erro', 'Documento de clientes não encontrado');
                }
            }, (error) => {
                console.error('Erro ao buscar clientes:', error);
                Alert.alert('Erro', 'Erro ao buscar clientes');
            });

            return unsubscribe;
        };

        const unsubscribe = fetchCliente();
        return unsubscribe;
    }, []);

    useEffect(() => {
        const fetchProdutos = () => {
            const user = auth.currentUser;
            const produtosRef = doc(db, user.uid, 'produtos');

            const unsubscribe = onSnapshot(produtosRef, (docSnapshot) => {
                if (docSnapshot.exists()) {
                    const produtosData = docSnapshot.data();
                    const produtos = produtosData.produtos || [];
                    const produtoDispo = produtos.filter(p => p.quantidade !== '0');
                    setdata2(produtoDispo);
                } else {
                    console.log('Documento de produtos não encontrado');
                    Alert.alert('Erro', 'Documento de produtos não encontrado');
                }
            }, (error) => {
                console.error('Erro ao buscar produtos:', error);
                Alert.alert('Erro', 'Erro ao buscar produtos');
            });

            return unsubscribe;
        };

        const unsubscribe = fetchProdutos();
        return unsubscribe;
    }, []);

    const handleSearch = (text) => {
        const searchText = text.toLowerCase();
        setSearchPhrase(searchText);
        const filtered = data1.filter((item) =>
            item.nome.toLowerCase().startsWith(searchText)
        );
        setFilteredData(filtered);
    };

    const handleSearch2 = (text) => {
        const searchText = text.toLowerCase();
        setSearchPhrase2(text);
        const filtered = data2.filter((item) =>
            item.nome.toLowerCase().startsWith(searchText)
        );
        setFilteredData2(filtered);
    };

    const additem = (item) => {
        if (basededados.length === 0) {
            setBasededados([item]);
            setTemdados(true);
            setNewdata([item]);
        } else {
            Alert.alert(
                'Atenção',
                'Já existe um cliente! Para alterar, delete o atual.',
                [
                    {
                        text: 'OK',
                        onPress: () => console.log('OK Pressionado')
                    }
                ],
                { cancelable: false }
            );
        }
    };

    const additem2 = (item, quantidadeSelecionada) => {
        const itemExists = basededados2.some(existingItem => existingItem.codigodebarras === item.codigodebarras);
        console.log('itemExists', itemExists);
        const produto = data2.find(prod => prod.codigodebarras === item.codigodebarras);
    
        if (!produto) {
            Alert.alert('Erro', 'Produto não encontrado na base de dados.');
            return;
        }
    
        const quantidadeDisponivel = produto.quantidade;
    
        if (itemExists) {
            Alert.alert('Produto', 'A quantidade tem de ser alterada antes de adicionar ao carinho ou produto já esta.');
            return;
        }
    
        if (quantidadeSelecionada > 0 && quantidadeSelecionada <= quantidadeDisponivel) {
            const newItem = {
                ...item,
                quantidade: quantidadeSelecionada
            };
            setBasededados2(prevState => [...prevState, newItem]);
            setNewdata2(prevState => [...prevState, newItem]);
            setTemdados2(true);
        } else if (quantidadeSelecionada > quantidadeDisponivel) {
            Alert.alert('Produto', 'Quantidade selecionada é maior que o estoque disponível!');
        } else {
            Alert.alert('Produto', 'Quantidade inválida! Tente novamente.');
        }
    };
    
  
    const removeItem = (keyToRemove) => {
        const updatedData = basededados.filter(item => item.key !== keyToRemove);
        setBasededados(updatedData);
        setTemdados(true);
        if (basededados.length === 0) {
            setdonthave(true);
        }
    };

    const removeItem2 = (itemToRemove) => {
        const updatedData = basededados2.filter(item => item.codigodebarras !== itemToRemove);
        setBasededados2(updatedData);
        setNewdata2(updatedData);
        console.log('removeu', updatedData);
        setTemdados2(true);
        if (basededados2.length === 0) {
            setdonthave(true);
        }
    };

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
                imagem={item.image}
                onpress1={(quantidadeSelecionada) => additem2(item, quantidadeSelecionada)}
                onpress2={() => removeItem2(item.codigodebarras)}
                quant={item.quantidade}
            />
        );
    };
    

    return (
        <KeyboardAvoidingView style={{ flex: 1, backgroundColor:'#fff' }}>
            <View>
                <Text style={[StyleCardObj.text2, {}]}>Criar Venda</Text>
            </View>
            <SafeAreaView style={[StyleCardObj.root, {}]}>
                <Text style={{ fontWeight:'bold', alignSelf:'flex-start', left:10 }}>Nome:</Text>
                <SearchBar
                    searchPhrase={searchPhrase}
                    setSearchPhrase={handleSearch}
                    clicked={clicked}
                    setClicked={setClicked}
                    texto={'Pesquise o nome do cliente'} 
                />
                {searchPhrase && (
                    <FlatList
                        data={filteredData}
                        keyExtractor={(item) => item.id}
                        renderItem={renderItem}
                    />
                )}
                <Text style={{ fontWeight:'bold', alignSelf:'flex-start', left:10 }}>Produto:</Text>
                <SearchBar
                    searchPhrase={searchPhrase2}
                    setSearchPhrase={handleSearch2}
                    clicked={clicked2}
                    setClicked={setClicked2}
                    texto={'Pesquise nome do produto'} 
                />
                {searchPhrase2 && (
                    <FlatList
                        data={filteredData2}
                        keyExtractor={(item) => item.id}
                        renderItem={renderItem2}
                    />
                )}
            </SafeAreaView>

            <Text style={{ fontWeight:'bold', fontSize:18, left:20 }}>Cliente</Text>
            <View style={{ borderWidth:3, borderColor:'#9fd86b', marginTop:10, width:370, left:10 }}>
                {temdados && (
                    <FlatList
                        data={basededados}
                        keyExtractor={(item) => item.id}
                        renderItem={renderItem}
                    />
                )}
                {basededados.length === 0 && (
                    <View>
                        <Text style={{
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

            <Text style={{ fontWeight:'bold', fontSize:18, left:20, marginTop:10 }}>Produtos</Text>
            <View style={{ borderWidth:3, borderColor:'#059b9a', marginTop:10, width:370, left:10 }}>
                {temdados2 && (
                    <FlatList
                        data={basededados2}
                        keyExtractor={(item) => item.id}
                        renderItem={renderItem2}
                    />
                )}
                {basededados2.length === 0 && (
                    <View>
                        <Text style={{
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

            <TouchableOpacity 
                style={{ alignItems:'center' }} 
                onPress={() => {
                    navigation.navigate('carrinho', { 
                        passadata: newdata, 
                        passadata2: newdata2.length > 0 ? newdata2 : [] 
                    });
                }}
            >
                <View style={[StyleCardObj.conteiner3, StyleNewProduct.buttonnew]}>
                    <Text style={[StyleNewProduct.text2, { marginHorizontal:85, top:2 }]}>Próximo</Text>
                    <AntDesign style={{ top:-10, marginHorizontal:10, right:3, top:1, right:40 }} name="arrowright" size={24} color="black" />
                </View>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    );
}
