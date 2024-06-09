import React, { useEffect, useState } from 'react';
import { 
    Text, 
    View,
    ScrollView,
    TouchableOpacity,
    KeyboardAvoidingView,
    Alert,
    Platform
} from 'react-native';
import StyleCardObj from '../../../Styles/StyleCardObj';
import { AntDesign ,FontAwesome5} from '@expo/vector-icons';
import StylesEncomenda from '../../../Styles/StylesEncomenda';
import Checkbox from 'expo-checkbox';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../../Services/Firebaseconfig'; 
import stylemain from '../../../Styles/Stylemain';

export default function EditarEncomenda ({navigation, route}) {
    const behavior = Platform.OS === 'ios' ? 'padding' : 'height';
    const [isChecked, setChecked] = useState(false);
    const [isChecked2, setChecked2] = useState(false);
    const [isChecked3, setChecked3] = useState(false);
    const [isChecked4, setChecked4] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    //passagem por parametro navegação
    const { nEncomenda } = route.params;
    const { DadosEncomenda } = route.params;
    const { DadosCliente } = route.params;
    const { dataencomeda } = route.params;
    const [DadosEncomenda2, setDadosEncomenda2] = useState(route.params?.DadosEncomenda2);
    const [DadosEncomenda1, setDadosEncomenda1] = useState(route.params?.DadosEncomenda1);
    const [nEncomenda1, setNEncomenda1] = useState(route.params?.nEncomenda1);

    useEffect(() => {
        console.log('dados encomenda', DadosEncomenda);
        console.log('dados cliente', DadosCliente);
        console.log('dados data', dataencomeda);
        console.log('encomenda', nEncomenda);

        fetchPrepararEncomenda();
    }, [nEncomenda]);

    useEffect(() => {
        setIsButtonDisabled(isChecked2);
    }, [isChecked2]);

    const fetchPrepararEncomenda = async () => {
        try {
            const user = auth.currentUser;
            if (!user) {
                console.error('Usuário não autenticado');
                Alert.alert('Erro', 'Usuário não autenticado');
                return;
            }

            const vendasRef = doc(db, user.uid, 'Vendas');
            const vendaData = await getDoc(vendasRef);

            if (!vendaData.exists()) {
                console.error('Documento de vendas não encontrado');
                Alert.alert('Erro', 'Documento de vendas não encontrado');
                return;
            }

            const vendas = vendaData.data().Venda || [];
            const venda = vendas.find(v => v.codVenda === nEncomenda);
            if (!venda) {
                console.error('Venda específica não encontrada');
                Alert.alert('Erro', 'Venda específica não encontrada');
                return;
            }

            if (venda.PrepararEncomenda) {
                setChecked(true);
                setChecked2(true);
            }
            if (venda.estadopagamento) {
                setChecked3(true);
            }
        } catch (error) {
            console.error('Erro ao buscar documento:', error);
            Alert.alert('Erro', 'Erro ao buscar documento');
        }
    };

    return (
        <KeyboardAvoidingView behavior={behavior} style={{ flex: 1, backgroundColor: '#fff' }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <AntDesign style={{ left: 10 }} name="back" size={24} color="black" />
            </TouchableOpacity>
            <ScrollView style={{ top: 10 }}>
                <Text style={[StyleCardObj.text2, {}]}>Modificar encomenda</Text>

                <Text style={StylesEncomenda.Text1}>Encomenda nº{nEncomenda}</Text>
                <TouchableOpacity style={StylesEncomenda.btnContainer}>
                    <Text style={[StylesEncomenda.Text1, { marginBottom: 15, marginTop: 15 }]}>Criar encomenda</Text>
                    <Checkbox style={StylesEncomenda.stylebox} disabled value={isChecked} onValueChange={setChecked} />
                </TouchableOpacity>

                <TouchableOpacity 
                    style={StylesEncomenda.btnContainer} 
                    onPress={() => navigation.navigate('prepararEncomenda', { DadosEncomenda2: DadosEncomenda, DadosEncomenda1: nEncomenda, nEncomenda1: nEncomenda })}
                    disabled={isButtonDisabled}
                >
                    <Text style={[StylesEncomenda.Text1, { marginBottom: 15, marginTop: 15 }]}>Preparar encomenda</Text>
                    <Checkbox style={StylesEncomenda.stylebox} disabled value={isChecked2} onValueChange={setChecked2} />
                </TouchableOpacity>

                <TouchableOpacity style={StylesEncomenda.btnContainer} onPress={() => navigation.navigate('confirmarPagamento',{ nEncomenda1: nEncomenda ,DadosEncomenda:DadosEncomenda})}>

                    <Text style={[StylesEncomenda.Text1, { marginBottom: 15, marginTop: 15 }]}>Confirmar pagamento</Text>
                    <Checkbox style={StylesEncomenda.stylebox} disabled value={isChecked3} onValueChange={setChecked3} />
                </TouchableOpacity>

                <TouchableOpacity style={StylesEncomenda.btnContainer} onPress={() => navigation.navigate('concluido')}>
                    <Text style={[StylesEncomenda.Text1, { marginBottom: 15, marginTop: 15 }]}>Finalizar</Text>
                    <Checkbox style={StylesEncomenda.stylebox} disabled value={isChecked4} onValueChange={setChecked4} />
                </TouchableOpacity>

                <Text style={StylesEncomenda.text2}>Complete todas etapas para puder finalizar a encomenda</Text>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
