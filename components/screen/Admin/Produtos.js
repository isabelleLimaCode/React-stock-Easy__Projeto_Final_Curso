import React, { useEffect, useState, useCallback } from 'react';
import { 
    View, Text, TouchableOpacity, KeyboardAvoidingView, SafeAreaView, FlatList, Alert, RefreshControl 
} from 'react-native';
import StyleCardObj from '../../../Styles/StyleCardObj';
import SearchBar from '../SearchBar/SearchBar';
import StyleNewProduct from '../../../Styles/StyleNewProduct';
import { AntDesign } from '@expo/vector-icons';
import CardProduto from '../Card/CardProduto';
import { db, auth } from '../../../Services/Firebaseconfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

export default function Produto({ navigation }) {
    const [searchPhrase, setSearchPhrase] = useState("");
    const [clicked, setClicked] = useState(false);
    const [data1, setData1] = useState([]);
    const [Donthave, setDonthave] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [filteredData, setFilteredData] = useState(data1);
    const [changeData, setChangeData] = useState(false);

    const onRefresh = useCallback(async () => {
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
                const verificarForaStock = produtosList.filter(p => p.quantidade > 0);
                setData1(verificarForaStock);
                setFilteredData(verificarForaStock);
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
        console.log('changedata', changeData);
        console.log('data', data1);
    }, []);

    const handleSearch = (text) => {
        const searchText = text.toLowerCase();
        setSearchPhrase(searchText);

        const filtered = data1.filter((item) =>
            item.nome.toLowerCase().startsWith(searchText)
        );
        if (filtered != null)
            setChangeData(!changeData);
        console.log(filtered);
        setFilteredData(filtered);
    };

    const handleDelete = async (index) => {
        try {
            const user = auth.currentUser;
            const produtosRef = doc(db, user.uid, 'produtos');
            const produtosDoc = await getDoc(produtosRef);

            if (produtosDoc.exists()) {
                const produtosData = produtosDoc.data();
                const updatedProdutos = [...produtosData.produtos];
                updatedProdutos.splice(index, 1); // Remove o produto pelo índice

                await updateDoc(produtosRef, { produtos: updatedProdutos });
                Alert.alert('Sucesso', 'Produto excluído com sucesso');
            } else {
                console.log('Documento de produtos não encontrado');
                Alert.alert('Erro', 'Documento de produtos não encontrado');
            }
        } catch (error) {
            console.error('Erro ao excluir produto:', error);
            Alert.alert('Erro', 'Erro ao excluir produto');
        }
    };

    const confirmDelete = (index) => {
        Alert.alert(
            "Confirmar Exclusão",
            "Você tem certeza que deseja excluir este produto?",
            [
                {
                    text: "Cancelar",
                    onPress: () => console.log("Exclusão cancelada"),
                    style: "cancel"
                },
                { 
                    text: "Excluir", 
                    onPress: () => handleDelete(index),
                    style: "destructive"
                }
            ],
            { cancelable: false }
        );
    };

    const renderItem = ({ item, index }) => {
        return (
            <CardProduto 
                valor={item.valorvenda}
                nome={item.nome}
                quant={item.quantidade}
                image={item.image}
                onpress2={() => navigation.navigate('EditarProduto', { index })} // Passa o índice para a tela de edição
                onpressDelete={() => confirmDelete(index)} // Chama a função de confirmação de exclusão
                productId={item}
            />
        );
    };

    return (
        <KeyboardAvoidingView style={{ flex: 1, backgroundColor: '#fff' }}>
            <View style={{ backgroundColor: '#fff' }}>
                <Text style={[StyleCardObj.text2, {}]}>Stock</Text>
            </View>
            <View style={{ flex: 1 }}>
                <SafeAreaView style={[StyleCardObj.root, {}]}>
                    <SearchBar
                        searchPhrase={searchPhrase}
                        setSearchPhrase={handleSearch}
                        clicked={clicked}
                        setClicked={setClicked} 
                    />
                </SafeAreaView>
                <FlatList
                    data={changeData ? filteredData : data1}
                    keyExtractor={(item, index) => index.toString()}
                    refreshControl={
                        <RefreshControl
                            style={{ position: 'absolute', alignSelf: 'center', color: '#059669' }}
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                    renderItem={renderItem}
                />
                <TouchableOpacity style={{ padding: 20 }} onPress={() => navigation.navigate('CriarProduto')}>
                    <View style={[StyleCardObj.conteiner3, StyleNewProduct.buttonnew, { marginBottom: 20 }]}>
                        <Text style={[StyleNewProduct.text2, { marginHorizontal: 85, top: 1 }]}>Criar Produto</Text>
                        <AntDesign style={{ top: -10, marginHorizontal: 10, right: 3, top: 1, right: 40 }} name="pluscircle" size={24} color="black" />
                    </View>
                </TouchableOpacity>    
            </View>
        </KeyboardAvoidingView>
    );
}
