import React, { useEffect, useState } from 'react';
import { 
    View,
    Text,
    TouchableOpacity,
    KeyboardAvoidingView,
    SafeAreaView,
    FlatList,
    Modal,
    Platform,
    Alert
} from 'react-native';
import StyleCardObj from '../../../Styles/StyleCardObj';
import SearchBar from '../SearchBar/SearchBar';
import CardPreparar from '../Card/CardPreparar';
import { AntDesign } from '@expo/vector-icons';
import StyleCreateAccount from '../../../Styles/StyleCreateAccount';
import { db, auth } from '../../../Services/Firebaseconfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

export default function PrepararEncomenda({ navigation, route }) {
    const behavior = Platform.OS === 'ios' ? 'padding' : 'height';
    const [searchPhrase, setSearchPhrase] = useState("");
    const [clicked, setClicked] = useState(false);
    const [Modal4visibile, Setmodal4visibile] = useState(true);
    const [Modal5visibile, Setmodal5visibile] = useState(false);
    const [data1, setData1] = useState([]);
    const [checkedCount, setCheckedCount] = useState(0);

    const { DadosEncomenda2 } = route.params;

    const fetchProdutos = async () => {
        try {
            const user = auth.currentUser;
            const vendasRef = doc(db, user.uid, 'Vendas');
            const vendasDoc = await getDoc(vendasRef);

            if (vendasDoc.exists()) {
                const vendaData = vendasDoc.data();
                const vendLista = vendaData.produtos || [];
                setData1(vendLista.map(item => ({ ...item, isChecked: false })));
            } else {
                console.log('Documento de vendas não encontrado');
                Alert.alert('Erro', 'Documento de vendas não encontrado');
            }
        } catch (error) {
            console.error('Erro ao buscar vendas:', error);
            Alert.alert('Erro', 'Erro ao buscar vendas');
        }
    };

    useEffect(() => {
        fetchProdutos();
    }, []);

    const handleCheckChange = (key, isChecked) => {
        if (isChecked) {
            setCheckedCount(prevCount => prevCount + 1);
        } else {
            setCheckedCount(prevCount => prevCount - 1);
        }

        setData1(prevData =>
            prevData.map(item =>
                item.codigodebarras === key ? { ...item, isChecked } : item
            )
        );
    };

    const checkproduto = async () => {
        if (checkedCount === DadosEncomenda2.length) {
            try {
                const user = auth.currentUser;
                const vendasRef = doc(db, user.uid, 'Vendas');
                await updateDoc(vendasRef, { PrepararEncomenda: 'true' });
                navigation.navigate('FinalizarEncomenda');
            } catch (error) {
                console.error('Erro ao atualizar o documento:', error);
                Alert.alert('Erro', 'Erro ao atualizar o documento');
            }
        } else {
            Setmodal5visibile(true);
        }
    };

    useEffect(() => {
        console.log('checkedCount', checkedCount);
        console.log('dados', DadosEncomenda2);
    }, [checkedCount]);

    return (
        <KeyboardAvoidingView behavior={behavior} style={{ flex: 1, backgroundColor: '#fff' }}>
            <View>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <AntDesign style={{ left: 10 }} name="back" size={24} color="black" />
                </TouchableOpacity>
                <Text style={StyleCardObj.text2}>Preparar Encomenda</Text>
            </View>
            <SafeAreaView style={StyleCardObj.root}>
                <SearchBar
                    searchPhrase={searchPhrase}
                    setSearchPhrase={setSearchPhrase}
                    clicked={clicked}
                    setClicked={setClicked}
                />
            </SafeAreaView>
            <Text style={{
                textAlign: 'center',
                fontWeight: 'bold',
                marginBottom: 20,
                marginTop: 20
            }}>Valide todos os produtos usando o código de barras, para um melhor controlo de stock!</Text>
            <FlatList
                data={DadosEncomenda2}
                keyExtractor={(item) => item.codigodebarras}
                renderItem={({ item }) => (
                    <CardPreparar
                        nome={item.nome}
                        uri={item.image}
                        DadosEncomenda2={DadosEncomenda2}
                        onCheckChange={(isChecked) => handleCheckChange(item.codigodebarras, isChecked)}
                    />
                )}
            />
            <TouchableOpacity
                style={{
                    backgroundColor: '#6B4EFF',
                    width: 327,
                    height: 48,
                    alignSelf: 'center',
                    borderRadius: 48,
                    top: -40
                }} onPress={checkproduto}>
                <Text style={{
                    fontWeight: 'bold',
                    fontSize: 18,
                    textAlign: 'center',
                    marginTop: 10,
                    marginBottom: 15
                }}>
                    Finalizar
                </Text>
            </TouchableOpacity>

            {/* Modal para informar ao utilizador */}
            <View>
                <View style={StyleCreateAccount.div}>
                    <View style={StyleCreateAccount.centeredView2}>
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={Modal4visibile}
                            onRequestClose={() => {
                                Alert.alert('Modal has been closed.');
                                Setmodal4visibile(!Modal4visibile);
                            }}>
                            <View style={StyleCreateAccount.centeredView2}>
                                <View style={StyleCreateAccount.modalView2}>
                                    <Text style={{
                                        fontWeight: 'bold',
                                        fontSize: 20,
                                    }}>
                                        Conferir Atenção!
                                    </Text>
                                    <Text style={{
                                        textAlign: 'center',
                                        marginTop: 25,
                                        marginBottom: 10,
                                        fontWeight: 'bold',
                                    }}>
                                        Valide todos os produtos usando
                                        o código de barras, para um melhor controlo de stock!
                                    </Text>
                                    <View>
                                        <TouchableOpacity
                                            style={[StyleCreateAccount.conteinerbtn, {
                                                marginTop: 10,
                                                width: 340,
                                                height: 51,
                                                backgroundColor: '#90EE90'
                                            }]} onPress={() => Setmodal4visibile(!Modal4visibile)}>
                                            <Text style={{ color: 'black' }}> Conferir </Text>
                                        </TouchableOpacity>
                                    </View>
                                    <TouchableOpacity
                                        style={[StyleCreateAccount.conteinerbtn, {
                                            marginTop: 10,
                                            width: 340,
                                            height: 51,
                                            alignSelf: 'center',
                                            right: 5
                                        }]} onPress={() => Setmodal4visibile(!Modal4visibile)}>
                                        <Text style={{ color: 'red' }}> Cancelar </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Modal>
                    </View>
                </View>
            </View>
            {/* Modal para informar ao utilizador */}

            {/* Modal para alerta de controle ao utilizador */}
            <View>
                <View style={StyleCreateAccount.div}>
                    <View style={StyleCreateAccount.centeredView2}>
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={Modal5visibile}
                            onRequestClose={() => {
                                Alert.alert('Modal has been closed.');
                                Setmodal5visibile(!Modal5visibile);
                            }}>
                            <View style={StyleCreateAccount.centeredView2}>
                                <View style={StyleCreateAccount.modalView2}>
                                    <Text style={{
                                        fontWeight: 'bold',
                                        fontSize: 20,
                                    }}>
                                        Conferir Atenção!
                                    </Text>
                                    <Text style={{
                                        textAlign: 'center',
                                        marginTop: 25,
                                        marginBottom: 10,
                                        fontWeight: 'bold',
                                    }}>
                                        Ops! Há algum produto em falta.
                                        Confira por favor!
                                    </Text>
                                    <View>
                                        <TouchableOpacity
                                            style={[StyleCreateAccount.conteinerbtn, {
                                                marginTop: 10,
                                                width: 340,
                                                height: 51,
                                                backgroundColor: '#90EE90'
                                            }]} onPress={() => Setmodal5visibile(!Modal5visibile)}>
                                            <Text style={{ color: 'black' }}> Continuar </Text>
                                        </TouchableOpacity>
                                    </View>
                                    <TouchableOpacity
                                        style={[StyleCreateAccount.conteinerbtn, {
                                            marginTop: 10,
                                            width: 340,
                                            height: 51,
                                            alignSelf: 'center',
                                            right: 5
                                        }]} onPress={() => Setmodal5visibile(!Modal5visibile)}>
                                        <Text style={{ color: 'red' }}> Cancelar </ Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Modal>
                    </View>
                </View>
            </View>
            {/* Modal para alerta de controle ao utilizador */}
        </KeyboardAvoidingView>
    );
}
