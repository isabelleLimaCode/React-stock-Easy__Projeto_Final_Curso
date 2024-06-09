import React, { useEffect, useState } from 'react';
import { 
    Text, 
    View,
    Image,
    TouchableOpacity,
    TextInput,
    Keyboard,
    Alert,
    ActivityIndicator
} from 'react-native';
import StyleCardObj from '../../../Styles/StyleCardObj';
import stylemain from '../../../Styles/Stylemain';
import StyleMetodo from '../../../Styles/StyleMetodo';
import StyleNewProduct from '../../../Styles/StyleNewProduct';
import { AntDesign } from '@expo/vector-icons';
import { db, auth } from '../../../Services/Firebaseconfig';
import { arrayUnion, setDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import moment from 'moment';

export default function FinalizarVenda({ navigation, route }) {
    const [isLoading, setIsLoading] = useState(false);
    const [tipoEntrega1, SettipoEntrega1] = useState(false);
    const [tipoEntrega2, SettipoEntrega2] = useState(false);
    const [isSelecte, setSelecti] = useState(false);
    const [isSelecte2, setSelectio] = useState(false);

    const { passadataProduto, passadataMetodo, passadataCliente } = route.params;
    const [codVenda, setCodVenda] = useState('');

    useEffect(() => {
        console.log('----------------------------------');
        console.log('passadata produto', passadataProduto);
        console.log('passadata metodo', passadataMetodo);
        console.log('passadata cliente', passadataCliente);

        if (passadataMetodo[3] === "MB") {
            setSelecti(true);
        } else if (passadataMetodo[3] === 'EmMaos') {
            setSelectio(true);
        }

        if (passadataMetodo[2] === "ctt") {
            SettipoEntrega2(true);
        } else if (passadataMetodo[2] === 'EMMaos') {
            SettipoEntrega1(true);
        }

        generateUniqueCodVenda();
    }, [passadataMetodo]);

    const generateUniqueCodVenda = async () => {
        let newCodVenda = generateCodVenda();
        while (await isCodVendaInUse(newCodVenda)) {
            newCodVenda = generateCodVenda();
        }
        setCodVenda(newCodVenda);
    };

    const generateCodVenda = () => {
        return Math.floor(100000 + Math.random() * 900000).toString(); // Gera um número de 6 dígitos
    };

    const isCodVendaInUse = async (cod) => {
        const user = auth.currentUser;
        const vendasRef = doc(db, user.uid, 'Vendas');
        const vendasSaidaRef = doc(db, user.uid, 'vendasSaida');

        const [vendasDoc, vendasSaidaDoc] = await Promise.all([getDoc(vendasRef), getDoc(vendasSaidaRef)]);

        if (vendasDoc.exists()) {
            const vendasData = vendasDoc.data().Venda || [];
            if (vendasData.some(venda => venda.codVenda === cod)) {
                return true;
            }
        }

        if (vendasSaidaDoc.exists()) {
            const vendasSaidaData = vendasSaidaDoc.data().Venda || [];
            if (vendasSaidaData.some(venda => venda.codVenda === cod)) {
                return true;
            }
        }

        return false;
    };

    const updateProductStock = async () => {
        try {
            const user = auth.currentUser;
            const produtosRef = doc(db, user.uid, 'produtos');
            const produtosDoc = await getDoc(produtosRef);
            if (produtosDoc.exists()) {
                const produtosData = produtosDoc.data().produtos || [];
                const updatedProdutos = produtosData.map(produto => {
                    const produtoVendido = passadataProduto.find(item => item.codigoproduct === produto.codigoproduct);
                    if (produtoVendido) {
                        return {
                            ...produto,
                            quantidade: produto.quantidade - produtoVendido.quantidade,
                        };
                    }
                    return produto;
                });
                await updateDoc(produtosRef, { produtos: updatedProdutos });
                console.log('Estoque atualizado com sucesso');
            }
        } catch (error) {
            console.error('Erro ao atualizar o estoque:', error);
        }
    };

    const fetchdataVenda = async () => {
        const novaVenda = {
            codVenda: codVenda,
            nomeCliente: passadataCliente[0].nome,
            morada: passadataMetodo[0],
            tipodeEnvio: passadataMetodo[2],
            tipodePagamento: passadataMetodo[3],
            produtos: passadataProduto,
            telemovel: passadataMetodo[1],
            estadoVenda: 'Encomenda registrada',
            datadaEncomenda: moment().format('DD-MM-YYYY'),
            hora: moment().format('HH:mm:ss'),
        };

        try {
            const user = auth.currentUser;
            const VendaRef = doc(db, user.uid, 'Vendas');
            const VendaDoc = await getDoc(VendaRef);

            if (!VendaDoc.exists()) {
                await setDoc(VendaRef, { Venda: [novaVenda] });
                console.log('Venda criada com sucesso:', novaVenda.nome);
                Alert.alert('Venda', 'Venda criada com sucesso');
            } else {
                await updateDoc(VendaRef, {
                    Venda: arrayUnion(novaVenda),
                });
            }

            await updateProductStock();
        } catch (error) {
            console.error('Erro', 'Erro ao adicionar produto:', error);
            Alert.alert('Error', 'Erro ao adicionar produto');
        }
    };

    const handleChange2 = () => {
        Alert.alert(
            'Confirmação',
            'Deseja realmente criar a venda?',
            [
                {
                    text: 'Sim',
                    onPress: async () => {
                        setIsLoading(true);
                        await fetchdataVenda();
                        await new Promise((resolve) => {
                            setTimeout(resolve, 5000);
                        });
                        navigation.navigate('ConcluirVenda');
                        setIsLoading(false);
                    },
                },
                {
                    text: 'Cancel',
                },
            ],
            { cancelable: false }
        );
    };

    return (
        <View style={{ backgroundColor: '#fff', flex: 1 }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <AntDesign style={{ left: 10, top: 10 }} name="back" size={24} color="black" />
            </TouchableOpacity>
            <View>
                <Text style={StyleCardObj.text2}>Finalizar Venda</Text>
                <Text style={[stylemain.textinput, { color: '#000', fontWeight: 'bold' }]}>Morada: </Text>
                <TextInput
                    style={[stylemain.input, { height: 100 }]}
                    onPress={Keyboard.dismiss}
                    multiline={true}
                    editable={false}
                    value={passadataMetodo[0]}
                />
            </View>
            <View style={{ marginTop: 30 }}>
                <Text style={StyleMetodo.text}>Opção de entrega:</Text>
                {tipoEntrega1 ? (
                    <View style={StyleMetodo.conteiner}>
                        <Image
                            style={{ width: 70, height: 60, resizeMode: "contain", alignSelf: 'center', top: 20, left: 30 }}
                            source={{ uri: "https://cdn-icons-png.flaticon.com/512/5074/5074570.png" }}
                        />
                        <Text style={[StyleMetodo.text, { marginHorizontal: 40, top: 10 }]}>Entrega em Mãos</Text>
                    </View>
                ) : tipoEntrega2 ? (
                    <View style={StyleMetodo.conteiner}>
                        <Image
                            style={{ width: 50, height: 50, resizeMode: "contain", alignSelf: 'center', left: 40 }}
                            source={{ uri: "https://www.sjpesqueira.pt/cmsaojoaopesqueira/uploads/poi/image/257/ctt.png" }}
                        />
                        <View style={[StyleMetodo.conteiner2, { left: 40 }]}>
                            <Text style={StyleMetodo.text}>Correios Normal Registrado</Text>
                            <Text style={StyleMetodo.text2}>4,59€</Text>
                            <Text style={StyleMetodo.text2}>Entrega ao domicilio, 1-2 dias úteis</Text>
                        </View>
                    </View>
                ) : <Text style={[StyleMetodo.text, { marginHorizontal: 40, top: 10, color: 'red' }]}>Não selecionou um tipo de entrega!</Text>}
                <Text style={StyleMetodo.text}>Detalhes de Método de Pagamento:</Text>
                {isSelecte ? (
                    <View style={StyleMetodo.conteiner}>
                        <Image
                            style={{ width: 70, height: 60, resizeMode: "contain", alignSelf: 'center', top: 20, left: 30 }}
                            source={{ uri: "https://seeklogo.com/images/M/mbway-logo-2CD6980569-seeklogo.com.png" }}
                        />
                    </View>
                ) : isSelecte2 ? (
                    <View style={StyleMetodo.conteiner}>
                        <Image
                            style={{ width: 70, height: 60, resizeMode: "contain", alignSelf: 'center', top: 20, left: 30 }}
                            source={{ uri: "https://cdn-icons-png.flaticon.com/512/5074/5074570.png" }}
                        />
                        <Text style={[StyleMetodo.text, { marginHorizontal: 40, top: 10 }]}>Pagamento em Mãos</Text>
                    </View>
                ) : null}
            </View>
            <TouchableOpacity style={{ alignItems: 'center', marginTop: 100 }} onPress={handleChange2}>
                <View style={[StyleCardObj.conteiner3, StyleNewProduct.buttonnew]}>
                    <Text style={[StyleNewProduct.text2, { marginHorizontal: 85, top: 2 }]}>Finalizar</Text>
                    <AntDesign style={{ top: -10, marginHorizontal: 10, right: 3, top: 1, right: 40 }} name="arrowright" size={24} color="black" />
                </View>
            </TouchableOpacity>
            {isLoading && (
                <View style={{ position: 'absolute', alignSelf: 'center', top: 670 }}>
                    <ActivityIndicator size="large" color="#000" />
                    <Text>Registrando nova venda...</Text>
                </View>
            )}
        </View>
    );
}
