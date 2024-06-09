import React, { useState, useEffect } from "react";
import { 
    Text, 
    View, 
    TouchableOpacity,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    Alert,
    Modal,
} from 'react-native';
import StyleCardObj from '../../../Styles/StyleCardObj';
import StyleNewProduct from '../../../Styles/StyleNewProduct';
import stylemain from '../../../Styles/Stylemain';
import { AntDesign } from '@expo/vector-icons';
import { CheckBox } from 'react-native-elements';
import { db, auth } from '../../../Services/Firebaseconfig';
import { collection, getDocs, addDoc, getDoc, doc } from 'firebase/firestore';
import * as Print from 'expo-print';
import { Picker } from '@react-native-picker/picker';

export default function CriarRelatorio({ navigation }) {
    const [isSelected, setSelection] = useState(false);
    const [isSelected2, setSelection2] = useState(false);
    const [vendasSaida, setVendasSaida] = useState([]);
    const [selectedVenda, setSelectedVenda] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        fetchVendasSaida();
    }, []);

    const fetchVendasSaida = async () => {
        try {
            const user = auth.currentUser;
            const vendasSaidaRef = doc(db, user.uid, 'vendasSaida');
            const vendasSaidaDoc = await getDoc(vendasSaidaRef);
            if (vendasSaidaDoc.exists()) {
                const vendaSaidaData = vendasSaidaDoc.data();
                const vendSaidaLista = vendaSaidaData.Venda || [];
                setVendasSaida(vendSaidaLista);
                console.log('Vendas de saída:', vendSaidaLista);
            } else {
                console.log('Documento de vendas de saída não encontrado');
                Alert.alert('Erro', 'Documento de vendas de saída não encontrado');
            }
            
        } catch (error) {
            console.error('Erro ao buscar vendas de saída:', error);
            Alert.alert('Erro', 'Erro ao buscar vendas de saída');
        }
    };

    const createRelatorio = async () => {
        if (!selectedVenda) {
            Alert.alert('Erro', 'Por favor, selecione uma venda de saída.');
            return;
        }

        const filters = {
            dadosCliente: isSelected,
            dadosProduto: isSelected2,
        };

        const relatorioData = {
            venda: selectedVenda,
            filters,
        };

        try {
            const pdfUri = await generatePDF(relatorioData);
            await saveRelatorioToFirestore(relatorioData, pdfUri);
            await saveRelatorioToRelatorioVendas(relatorioData, pdfUri);
            Alert.alert('Sucesso', 'Relatório criado com sucesso!', [
                { text: 'OK', onPress: () => navigation.navigate('VisualizarPDF', { pdfUri }) }
            ]);
        } catch (error) {
            console.error('Erro ao criar PDF:', error);
            Alert.alert('Erro', 'Erro ao criar o relatório em PDF');
        }
    };

    const generatePDF = async (relatorioData) => {
        const { venda, filters } = relatorioData;

        const htmlContent = `
            <html>
            <body>
                <h1>Relatório de Venda: ${venda.codVenda}</h1>
                <h2>Filtros Aplicados:</h2>
                <p>Dados do Cliente: ${filters.dadosCliente ? 'Sim' : 'Não'}</p>
                <p>Dados do Produto: ${filters.dadosProduto ? 'Sim' : 'Não'}</p>
            </body>
            </html>
        `;

        const { uri } = await Print.printToFileAsync({ html: htmlContent });

        return uri;
    };

    const saveRelatorioToFirestore = async (relatorioData, pdfUri) => {
        try {
            const user = auth.currentUser;
            const relatoriosRef = collection(db, `users/${user.uid}/relatorios`);
            await addDoc(relatoriosRef, {
                ...relatorioData,
                pdfUri,
                createdAt: new Date()
            });
        } catch (error) {
            console.error('Erro ao salvar relatório no Firestore:', error);
            Alert.alert('Erro', 'Erro ao salvar relatório no Firestore');
        }
    };

    const saveRelatorioToRelatorioVendas = async (relatorioData, pdfUri) => {
        try {
            const user = auth.currentUser;
            const relatoriosVendasRef = collection(db, `users/${user.uid}/relatorioVendas`);
            await addDoc(relatoriosVendasRef, {
                ...relatorioData,
                pdfUri,
                createdAt: new Date()
            });
        } catch (error) {
            console.error('Erro ao salvar relatório na coleção relatorioVendas:', error);
            Alert.alert('Erro', 'Erro ao salvar relatório na coleção relatorioVendas');
        }
    };

    const toggleModal = () => {
        setModalVisible(!modalVisible);
    };

    const behavior = Platform.OS === 'ios' ? 'padding' : 'height';

    return (
        <KeyboardAvoidingView behavior={behavior} style={{ flex: 1, backgroundColor: '#fff' }}>
            <ScrollView style={{ backgroundColor: '#fff', marginTop: 40, paddingHorizontal: 20 }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <AntDesign style={{ marginVertical: 10 }} name="back" size={24} color="black" />
                </TouchableOpacity>
                <Text style={[StyleCardObj.text2, { marginBottom: 20 }]}>Relatório</Text>

                <Text style={{ fontWeight: 'bold', top: 30 }}>Selecionar Venda de Saída: </Text>
                <TouchableOpacity style={[stylemain.input, { marginBottom: 40 }]} onPress={toggleModal}>
                    <Text>{selectedVenda ? `Venda ${selectedVenda.codVenda}` : "Selecione uma venda"}</Text>
                </TouchableOpacity>

                <Modal
                    animationType='slide'
                    transparent={true}
                    visible={modalVisible}
                >
                    <View style={{ flex: 1, alignContent: 'center', justifyContent: 'center', left: -10 }}>
                        <View style={{
                            margin: 20,
                            backgroundColor: '#fff',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 20,
                            padding: 20,
                            width: '95%',
                            shadowColor: '#000',
                            shadowOffset: {
                                width: 0, height: 2
                            },
                            shadowOpacity: 0.25,
                            shadowRadius: 4,
                            elevation: 5
                        }}>
                            <Picker
                                style={{ width: '100%' }}
                                selectedValue={selectedVenda ? selectedVenda.codVenda : null}
                                onValueChange={(itemValue, itemIndex) => {
                                    const selected = vendasSaida.find(v => v.codVenda === itemValue);
                                    setSelectedVenda(selected);
                                    console.log('Venda selecionada:', selected);
                                    toggleModal();
                                }}>
                                <Picker.Item label="Selecione uma venda" value={null} />
                                {vendasSaida.map((venda, index) => (
                                    <Picker.Item key={index} label={`Venda ${venda.codVenda}`} value={venda.codVenda} />
                                ))}
                            </Picker>
                        </View>
                    </View>
                </Modal>

                <View style={{ marginBottom: 20 }}>
                    <CheckBox
                        checked={isSelected}
                        onPress={() => setSelection(!isSelected)}
                        title="Dados do Cliente"
                        containerStyle={{ backgroundColor: 'transparent', borderWidth: 0 }}
                    />
                    <CheckBox
                        checked={isSelected2}
                        onPress={() => setSelection2(!isSelected2)}
                        title="Dados do Produto"
                        containerStyle={{ backgroundColor: 'transparent', borderWidth: 0 }}
                    />
                </View>

                <TouchableOpacity style={StyleNewProduct.buttonnew} onPress={createRelatorio}>
                    <Text style={[StyleNewProduct.text2, { textAlign: 'center' }]}>Criar Relatório</Text>
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
