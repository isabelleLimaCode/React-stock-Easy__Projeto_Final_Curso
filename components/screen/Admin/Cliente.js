import React, { useEffect, useState, useCallback } from 'react';
import { 
    View, Text, Image, TouchableOpacity, KeyboardAvoidingView, ScrollView, SafeAreaView, RefreshControl, Platform, FlatList, Alert 
} from 'react-native';
import StyleCardObj from '../../../Styles/StyleCardObj';
import SearchBar from '../SearchBar/SearchBar';
import CardCliente from '../Card/CardCliente';
import { AntDesign } from '@expo/vector-icons';
import StyleNewProduct from '../../../Styles/StyleNewProduct';
import { db, auth } from '../../../Services/Firebaseconfig';
import { doc, onSnapshot, updateDoc, getDoc } from 'firebase/firestore';

export default function Cliente({ navigation }) {
    const behavior = Platform.OS === 'ios' ? 'padding' : 'height';
    const [searchPhrase, setSearchPhrase] = useState("");
    const [clicked, setClicked] = useState(false);
    const [donthave, setdonthave] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [data1, setData1] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [changeData, setChangeData] = useState(false);

    const fetchCliente = useCallback(() => {
        const user = auth.currentUser;
        if (!user) {
            Alert.alert('Erro', 'Usuário não autenticado');
            return;
        }
        const clientesRef = doc(db, user.uid, 'clientes');

        const unsubscribe = onSnapshot(clientesRef, (docSnapshot) => {
            if (docSnapshot.exists()) {
                const clientesData = docSnapshot.data();
                const clientesList = clientesData.clientes || [];

                setData1(clientesList);
                setFilteredData(clientesList);
                setdonthave(clientesList.length === 0);
            } else {
                console.log('Documento de clientes não encontrado');
                Alert.alert('Erro', 'Documento de clientes não encontrado');
                setdonthave(true);
            }
        }, (error) => {
            console.error('Erro ao buscar clientes:', error);
            Alert.alert('Erro', 'Erro ao buscar clientes');
        });

        return unsubscribe; 
    }, []);

    useEffect(() => {
        const unsubscribe = fetchCliente();
        return () => unsubscribe(); 
    }, [fetchCliente]);

    const handleSearch2 = (text) => {
        const searchText = text.toLowerCase();
        setSearchPhrase(searchText);
        const filtered = data1.filter((item) =>
            item.nome.toLowerCase().startsWith(searchText)
        );
        setFilteredData(filtered);
        setChangeData(true);
    };

    const handleDelete = async (index) => {
        try {
            const user = auth.currentUser;
            const clientesRef = doc(db, user.uid, 'clientes');
            const clientesDoc = await getDoc(clientesRef);

            if (clientesDoc.exists()) {
                const clientesData = clientesDoc.data();
                const updatedClientes = [...clientesData.clientes];
                updatedClientes.splice(index, 1); // Remove o cliente pelo índice

                await updateDoc(clientesRef, { clientes: updatedClientes });
                Alert.alert('Sucesso', 'Cliente excluído com sucesso');
            } else {
                console.log('Documento de clientes não encontrado');
                Alert.alert('Erro', 'Documento de clientes não encontrado');
            }
        } catch (error) {
            console.error('Erro ao excluir cliente:', error);
            Alert.alert('Erro', 'Erro ao excluir cliente');
        }
    };

    const confirmDelete = (index,item) => {
        Alert.alert(
            "Excluir Cliente",
            "Você tem certeza que deseja excluir o cliente" +" " +item.nome +" "+ "?",
            [
                {
                    text: "Cancelar",
                    onPress: () => console.log("Excluir cliente cancelado"),
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

    const renderitem = ({ item, index }) => {
        return (
            <CardCliente 
                nome={item.nome} 
                estado={'ativo'}
                onpress={() => {
                    console.log('Navegando para editar cliente com índice:', index);
                    navigation.navigate('editcliente', { index });
                }}
                onPress2={() => confirmDelete(index,item)} 
                email={item.email}
            />
        )
    }

    return (
        <KeyboardAvoidingView behavior={behavior} style={{ flex: 1, backgroundColor: '#fff' }}>
            <View>
                <Text style={StyleCardObj.text2}>Cliente</Text>
            </View>
            {donthave ? (
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            style={{ position: 'absolute', alignSelf: 'center', color: '#059669' }}
                            refreshing={refreshing}
                            onRefresh={fetchCliente}
                        />
                    }>
                    <View>
                        <Image 
                            style={{ width: 250, height: 250, alignSelf: 'center', marginTop: 50 }} 
                            source={require('./../../../assets/cliente.png')} 
                        />
                        <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20, marginTop: 30 }}>
                            Ops! Não há clientes
                        </Text>
                    </View>
                </ScrollView>
            ) : (
                <View>
                    <SafeAreaView style={StyleCardObj.root}>
                        <SearchBar
                            searchPhrase={searchPhrase}
                            setSearchPhrase={handleSearch2}
                            clicked={clicked}
                            setClicked={setClicked} 
                        />
                    </SafeAreaView>
                    <FlatList
                        data={changeData ? filteredData : data1}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={renderitem}
                        refreshControl={
                            <RefreshControl
                                style={{ position: 'absolute', alignSelf: 'center', color: '#059669' }}
                                refreshing={refreshing}
                                onRefresh={fetchCliente}
                            />
                        }
                    />
                </View>
            )}
            <TouchableOpacity style={{ justifyContent: 'space-between', padding: 20 }} onPress={() => navigation.navigate('CriarCliente')}>
                <View style={[StyleCardObj.conteiner3, StyleNewProduct.buttonnew, { marginBottom: 20 }]}>
                    <Text style={[StyleNewProduct.text2, { marginHorizontal: 85, top: 1 }]}>Criar Cliente</Text>
                    <AntDesign style={{ top: -10, marginHorizontal: 10, right: 3, top: 1, right: 40 }} name="pluscircle" size={24} color="black" />
                </View>
            </TouchableOpacity>    
        </KeyboardAvoidingView>
    );
}
