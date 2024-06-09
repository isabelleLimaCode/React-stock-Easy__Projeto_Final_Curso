import React, { useEffect, useState } from 'react';
import { 
    Text, 
    View,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    TextInput,
    Keyboard,
    TouchableOpacity,
    Alert,
} from 'react-native';
import StyleCardObj from '../../../Styles/StyleCardObj';
import stylemain from '../../../Styles/Stylemain';
import { FontAwesome5, AntDesign } from '@expo/vector-icons';
import { db, auth } from '../../../Services/Firebaseconfig';
import { getDoc, doc, updateDoc } from 'firebase/firestore';

export default function EditarCliente({ route, navigation }) {
    const { index } = route.params;
    const behavior = Platform.OS === 'ios' ? 'padding' : 'height';

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [telemovel, setTelemovel] = useState('');

    useEffect(() => {
        const fetchCliente = async () => {
            try {
                const user = auth.currentUser;
                const clientesRef = doc(db, user.uid, 'clientes');
                const clientesDoc = await getDoc(clientesRef);

                if (clientesDoc.exists()) {
                    const clientesData = clientesDoc.data();
                    const cliente = clientesData.clientes[index];
                    if (cliente) {
                        setNome(cliente.nome);
                        setEmail(cliente.email);
                        setTelemovel(cliente.telemovel);
                    } else {
                        console.log('Cliente não encontrado');
                        Alert.alert('Erro', 'Cliente não encontrado');
                    }
                } else {
                    console.log('Documento de clientes não encontrado');
                    Alert.alert('Erro', 'Documento de clientes não encontrado');
                }
            } catch (error) {
                console.error('Erro ao buscar cliente:', error);
                Alert.alert('Erro', 'Erro ao buscar cliente');
            }
        };
        fetchCliente();
    }, [index]);

    const handleSave = async () => {
        try {
            const user = auth.currentUser;
            const clientesRef = doc(db, user.uid, 'clientes');
            const clientesDoc = await getDoc(clientesRef);

            if (clientesDoc.exists()) {
                const clientesData = clientesDoc.data();
                const updatedClientes = [...clientesData.clientes];
                updatedClientes[index] = { ...updatedClientes[index], nome, email, telemovel };

                await updateDoc(clientesRef, { clientes: updatedClientes });
                Alert.alert('Sucesso', 'Dados do cliente atualizados com sucesso');
                navigation.goBack();
            } else {
                console.log('Documento de clientes não encontrado');
                Alert.alert('Erro', 'Documento de clientes não encontrado');
            }
        } catch (error) {
            console.error('Erro ao atualizar cliente:', error);
            Alert.alert('Erro', 'Erro ao atualizar cliente');
        }
    };

    return (
        <KeyboardAvoidingView behavior={behavior} style={{ flex: 1, backgroundColor: '#fff' }}>
            <View>
                <Text style={[StyleCardObj.text2, { top: 90 }]}>Editar Cliente</Text>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <AntDesign style={{ left: 10 }} name="back" size={24} color="black" />
                </TouchableOpacity>
            </View>
            <ScrollView style={{ marginTop: 90 }}>
                <Text style={[stylemain.textinput, { color: '#000' }]}>Nome:</Text>
                <TextInput
                    style={[stylemain.input]}
                    placeholder="Introduza seu primeiro nome"
                    value={nome}
                    onChangeText={setNome}
                />
                <Text style={[stylemain.textinput, { color: '#000' }]}>Email:</Text>
                <TextInput
                    style={[stylemain.input]}
                    placeholder="Exemplo: you@company.com"
                    value={email}
                    onChangeText={setEmail}
                />
                <Text style={[stylemain.textinput, { color: '#000' }]}>Telemóvel:</Text>
                <TextInput
                    style={[stylemain.input]}
                    placeholder="Introduza seu telemóvel"
                    value={telemovel}
                    onChangeText={setTelemovel}
                />
                <TouchableOpacity style={[stylemain.btn, { marginTop: 100 }]} onPress={handleSave}>
                    <Text style={stylemain.txt}>Alterar dados</Text>
                    <FontAwesome5 name="location-arrow" size={20} color="white" style={stylemain.seta} />
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
