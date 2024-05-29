import React, { useEffect, useState } from 'react';
import { 
    Text, 
    View,
    Image,
    ScrollView,
    TouchableOpacity,
    KeyboardAvoidingView,
    Switch,
    Platform,
    Alert
} from 'react-native';
import StyleCardObj from '../../../Styles/StyleCardObj';
import { AntDesign } from '@expo/vector-icons';
import StyleDiscont from '../../../Styles/StyleDiscont';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../../Services/Firebaseconfig'; 

export default function ConfirmarPagamento({navigation, route}) {

    const behavior = Platform.OS === 'ios' ? 'padding' : 'height';
    const { nEncomenda1 } = route.params;
    const [isEnable, setIsEnable] = useState(false);

    useEffect(() => {
        fetchConfirmarPagamento();
    }, []);

    const fetchConfirmarPagamento = async () => {
        try {
            const user = auth.currentUser;
            if (!user) {
                console.error('Usuário não autenticado');
                Alert.alert('Erro', 'Usuário não autenticado');
                return;
            }

            console.log('User ID:', user.uid);

            const vendasRef = doc(db, user.uid, 'Vendas');
            const vendaData = await getDoc(vendasRef);

            if (!vendaData.exists()) {
                console.error('Documento de vendas não encontrado');
                return;
            }

            console.log('Dados de vendas:', vendaData.data());

            const vendas = vendaData.data().Venda || [];
            console.log('Lista de vendas:', vendas);
            console.log('Número da encomenda:', nEncomenda1);

            const venda = vendas.find(v => String(v.codVenda) === String(nEncomenda1));
            console.log('Venda específica:', venda);

            if (venda && venda.estadopagamento) {
                setIsEnable(venda.estadopagamento);
            }
        } catch (error) {
            console.error('Erro ao buscar documento:', error);
        }
    };

    const toogleSwitch = async () => {
        setIsEnable(previousState => !previousState);
        try {
            const user = auth.currentUser;
            if (!user) {
                console.error('Usuário não autenticado');
                Alert.alert('Erro', 'Usuário não autenticado');
                return;
            }

            console.log('User ID:', user.uid);

            const vendasRef = doc(db, user.uid, 'Vendas');
            const vendaData = await getDoc(vendasRef);

            if (!vendaData.exists()) {
                console.error('Documento de vendas não encontrado');
                Alert.alert('Erro', 'Documento de vendas não encontrado');
                return;
            }

            console.log('Dados de vendas:', vendaData.data());

            const vendas = vendaData.data().Venda || [];
            console.log('Lista de vendas:', vendas);
            console.log('Número da encomenda:', nEncomenda1);

            const vendaIndex = vendas.findIndex(v => String(v.codVenda) === String(nEncomenda1));
            console.log('Índice da venda específica:', vendaIndex);

            if (vendaIndex === -1) {
                console.error('Venda específica não encontrada');
                Alert.alert('Erro', 'Venda específica não encontrada');
                return;
            }
            vendas[vendaIndex].estadopagamento = !isEnable;
            await updateDoc(vendasRef, { Venda: vendas });

        } catch (error) {
            console.error('Erro ao atualizar documento:', error);
            Alert.alert('Erro', 'Erro ao atualizar documento');
        }
    };

    return (
        <KeyboardAvoidingView behavior={behavior} style={{ flex: 1, backgroundColor: '#fff' }}>
            <ScrollView>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <AntDesign style={{ left: 10, top: 10 }} name="back" size={24} color="black" />
                </TouchableOpacity>

                <Text style={StyleCardObj.text2}>Pagamento</Text>

                <View style={[StyleDiscont.switchContainer, { alignSelf: 'flex-end', left: -26 }]}>
                    <Text style={StyleDiscont.text2}>Confirmar Pagamento</Text>
                    <Text style={StyleDiscont.switchText}>{isEnable ? 'Sim' : 'Não'}</Text>
                    <Switch
                        trackColor={{ false: '#FF6347', true: '#3CB371' }}
                        thumbColor={isEnable ? '#fff' : '#f4f3f4'}
                        ios_backgroundColor={'#FF6347'}
                        onValueChange={toogleSwitch}
                        value={isEnable}
                        style={StyleDiscont.Switchstyle}
                    />
                </View>
                <Image
                    style={{
                        width: 400,
                        height: 400,
                        resizeMode: "contain",
                        alignSelf: 'center',
                        top: 10
                    }}
                    source={{
                        uri: "https://firebasestorage.googleapis.com/v0/b/stock-easy-7eced.appspot.com/o/imgs%2FCredit%20card-cuate.png?alt=media&token=db377f8a-155f-4121-94b2-09eda18f7b5c",
                    }}
                />
                <Text style={{ alignSelf: 'center', fontWeight: 'bold', marginTop: 20, fontSize: 16 }}>Depois irá adicionar aos lucros e vendas!</Text>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
