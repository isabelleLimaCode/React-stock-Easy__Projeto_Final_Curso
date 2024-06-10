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
import { collection, addDoc, getDoc, doc, query, where, deleteDoc, getDocs } from 'firebase/firestore';
import * as Print from 'expo-print';
import { Picker } from '@react-native-picker/picker';
import { printToFileAsync } from "expo-print";
import * as Sharing from 'expo-sharing';
import moment from 'moment';


export default function CriarRelatorio({ navigation }) {
    const [isSelected, setSelection] = useState(false);
    const [isSelected2, setSelection2] = useState(false);
    const [vendasSaida, setVendasSaida] = useState([]);
    const [selectedVenda, setSelectedVenda] = useState(null);
    const [empresa, setEmpresa] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        fetchVendasSaida();
        fetchEmpresa();
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

    const fetchEmpresa = async () => {
        try {
            const user = auth.currentUser;
            const dadosRef = doc(db, user.uid, 'dados');
            const dadosDoc = await getDoc(dadosRef);
            if (dadosDoc.exists()) {
                const dadosData = dadosDoc.data();
                setEmpresa(dadosData.empresa);
            } else {
                console.log('Documento de dados não encontrado');
                Alert.alert('Erro', 'Documento de dados não encontrado');
            }
        } catch (error) {
            console.error('Erro ao buscar dados da empresa:', error);
            Alert.alert('Erro', 'Erro ao buscar dados da empresa');
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
            createdAt: new Date() // Adicione createdAt aqui
        };
    
        try {
            const user = auth.currentUser;
            const vendasRef = collection(db, `${user.uid}/Relatorio/RelatoriosGerados`);
            const q = query(vendasRef, where("venda.codVenda", "==", selectedVenda.codVenda));
            const querySnapshot = await getDocs(q);
    
            if (!querySnapshot.empty) {
                Alert.alert(
                    'Relatório Existente',
                    'Um relatório para esta venda já existe. Deseja substituí-lo?',
                    [
                        {
                            text: 'Cancelar',
                            style: 'cancel',
                        },
                        {
                            text: 'Substituir',
                            onPress: async () => {
                                try {
                                    // Deletar o relatório existente
                                    querySnapshot.forEach(async (doc) => {
                                        await deleteDoc(doc.ref);
                                    });
    
                                    // Criar novo relatório
                                    const pdfUri = await generatePDF({...relatorioData, createdAt: new Date()});
                                    if (pdfUri) {
                                        await saveRelatorioToVendas(relatorioData, pdfUri);
                                        await sharePDF(pdfUri);
                                        Alert.alert('Sucesso', 'Relatório criado com sucesso!');
                                    } else {
                                        throw new Error('Erro ao gerar PDF');
                                    }
                                } catch (error) {
                                    console.error('Erro ao substituir relatório:', error);
                                    Alert.alert('Erro', 'Erro ao substituir relatório');
                                }
                            },
                        },
                    ],
                    { cancelable: false }
                );
            } else {
                const pdfUri = await generatePDF({...relatorioData, createdAt: new Date()});
                if (pdfUri) {
                    await saveRelatorioToVendas(relatorioData, pdfUri);
                    await sharePDF(pdfUri);
                    Alert.alert('Sucesso', 'Relatório criado com sucesso!');
                } else {
                    throw new Error('Erro ao gerar PDF');
                }
            }
        } catch (error) {
            console.error('Erro ao criar relatório:', error);
            Alert.alert('Erro', 'Erro ao criar relatório');
        }
    };
    

    const generatePDF = async (relatorioData) => {
        const { venda, filters, createdAt } = relatorioData;
    
        const formatDate = (date) => {
            if (!date) {
                return 'Data inválida';
            }
            return moment(date).format('DD [de] MMMM [de] YYYY [às] HH:mm:ss');
        };
    
        const getProdutosHtml = (produtos) => {
            return produtos.map(produto => `
                <tr>
                    <td>${produto.quantidade}</td>
                    <td>${produto.nome}</td>
                    <td>${produto.valorvenda}</td>
                    <td>${produto.quantidade * produto.valorvenda}</td>
                </tr>
            `).join('');
        };
    
        const totalValor = venda.produtos.reduce((total, produto) => total + produto.quantidade * produto.valorvenda, 0);
    
        const htmlContent = `
            <html>
            <head>
                <style>
                    body { font-family: Arial, sans-serif; padding: 20px; }
                    h1 { color: #333; }
                    h2 { color: #555; }
                    p { line-height: 1.6; }
                    .cliente, .produtos { margin-bottom: 20px; }
                    .fatura {
                        width: 100%;
                        border-collapse: collapse;
                    }
                    .fatura, .fatura th, .fatura td {
                        border: 1px solid black;
                    }
                    .fatura th, .fatura td {
                        padding: 15px;
                        text-align: left;
                    }
                    .total {
                        font-weight: bold;
                        font-size: 18px;
                    }
                    .logo {
                        border: 2px solid #000;
                        border-radius: 10px;
                        width: 150px;
                        height: 150px;
                    }
                </style>
            </head>
            <body>
                <div>
                    <img class="logo" src="https://firebasestorage.googleapis.com/v0/b/stock-easy-7eced.appspot.com/o/imgs%2FNavy%20Blue%20Minimalist%20Text%20Logo.png?alt=media&token=9a816e14-fdaf-4cfa-920c-54c4c9edd03d" alt="Logo" />
                    <h1>Relatório</h1>
                </div>
                <table style="width: 100%; margin-top: 20px;">
                    <tr>
                        <td>DE</td>
                        <td>
                            ${empresa}
                        </td>
                        <td></td>
                        <td>
                            <strong>Relatório #</strong> ${venda.codVenda}
                            <br>
                            <strong>Data do Relatório:</strong> ${createdAt ? formatDate(createdAt) : 'Data inválida'}
                        </td>
                    </tr>
                    <tr>
                        <td>COBRAR A</td>
                        <td>
                            ${venda.nomeCliente}
                            <br>
                            ${venda.morada}
                        </td>
                        <td>ENVIAR PARA</td>
                        <td>
                            ${venda.nomeCliente}
                            <br>
                            ${venda.morada}
                        </td>
                    </tr>
                </table>
                <table class="fatura" style="width: 100%; margin-top: 20px;">
                    <thead>
                        <tr>
                            <th>QTD</th>
                            <th>DESCRIÇÃO</th>
                            <th>PREÇO POR UNIDADE</th>
                            <th>VALOR</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${getProdutosHtml(venda.produtos)}
                    </tbody>
                </table>
                <div style="margin-top: 20px;">
                    <p class="total">TOTAL: ${totalValor.toFixed(2)} €</p>
                </div>
            </body>
            </html>
        `;
    
        try {
            const file = await printToFileAsync({ html: htmlContent, base64: false });
            return file.uri;
        } catch (error) {
            console.error('Erro ao gerar o PDF:', error);
            return null;
        }
    };
    
    

    const saveRelatorioToVendas = async (relatorioData, pdfUri) => {
        try {
            const user = auth.currentUser;
            const vendasRef = collection(db, `${user.uid}/Relatorio/RelatoriosGerados`);
            await addDoc(vendasRef, {
                ...relatorioData,
                pdfUri,
                createdAt: new Date(),
            });
        } catch (error) {
            console.error('Erro ao salvar relatório na coleção Vendas:', error);
            Alert.alert('Erro', 'Erro ao salvar relatório na coleção Vendas');
        }
    };
    
    

    const sharePDF = async (uri) => {
        if (!(await Sharing.isAvailableAsync())) {
            Alert.alert('Erro', 'O compartilhamento não está disponível nesta plataforma');
            return;
        }
        await Sharing.shareAsync(uri);
    };

    const toggleModal = () => {
        setModalVisible(!modalVisible);
    };

    const handleVendaChange = (itemValue) => {
        const selected = vendasSaida.find(v => v.codVenda === itemValue);
        setSelectedVenda(selected);
        toggleModal();
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
                                    handleVendaChange(itemValue);
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
