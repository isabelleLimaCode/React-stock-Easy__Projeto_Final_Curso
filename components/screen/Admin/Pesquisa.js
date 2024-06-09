import React, { useEffect, useState } from 'react';
import { 
    View,
    Text,
    KeyboardAvoidingView,
    SafeAreaView,
    FlatList,
    Alert,
} from 'react-native';
import StyleCardObj from '../../../Styles/StyleCardObj';
import SearchBar from '../SearchBar/SearchBar';
import CardProduto from '../Card/CardProduto';
import { db, auth } from '../../../Services/Firebaseconfig';
import { doc, getDoc } from 'firebase/firestore';

export default function Pesquisa({ navigation }) {
    const [searchPhrase, setSearchPhrase] = useState("");
    const [clicked, setClicked] = useState(false);
    const [data1, setData1] = useState([]);
    const [filteredData, setFilteredData] = useState([]);

    const fetchProdutos = async () => {
        try {
            const user = auth.currentUser;
            const produtosRef = doc(db, user.uid, 'produtos');
            const produtosDoc = await getDoc(produtosRef);

            if (produtosDoc.exists()) {
                const produtosData = produtosDoc.data();
                const produtosList = produtosData.produtos || [];
                const inStockProducts = produtosList.filter(produto => produto.quantidade > 0); // Filtrar produtos com estoque > 0
                setData1(inStockProducts);
                setFilteredData(inStockProducts);
            } else {
                console.log('Documento de produtos não encontrado');
                Alert.alert('Erro', 'Documento de produtos não encontrado');
            }
        } catch (error) {
            console.error('Erro ao buscar produtos:', error);
            Alert.alert('Erro', 'Erro ao buscar produtos');
        }
    };

    useEffect(() => {
        fetchProdutos();
    }, []);

    const handleSearch = (text) => {
        const searchText = text.toLowerCase();
        setSearchPhrase(searchText);

        const filtered = data1.filter((item) =>
            item.nome.toLowerCase().includes(searchText)
        );

        setFilteredData(filtered);
    };

    return (
        <KeyboardAvoidingView style={{ flex: 1, backgroundColor: '#fff' }}>
            <View>
                <Text style={StyleCardObj.text2}>Pesquisa</Text>
                <Text style={{
                    textAlign: 'center',
                    fontWeight: 'bold',
                }}>Pesquise todos os produtos que tem em stock!</Text>
            </View>
            <SafeAreaView style={StyleCardObj.root}>
                <SearchBar
                    searchPhrase={searchPhrase}
                    setSearchPhrase={handleSearch}
                    clicked={clicked}
                    setClicked={setClicked} />
            </SafeAreaView>
            <FlatList
                data={filteredData}
                keyExtractor={(item) => item.codigoproduct}
                renderItem={({ item }) => (
                    <CardProduto
                        valor={item.valordevenda}
                        nome={item.nome}
                        quant={item.quantidade}
                        image={item.image}
                        onpress2={() => navigation.navigate('EditarProduto')}
                    />
                )}
            />
        </KeyboardAvoidingView>
    );
}
