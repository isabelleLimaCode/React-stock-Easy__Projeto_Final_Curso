import React, { useEffect, useState } from 'react';
import { 
    View,
    Text,
    Image,
    TouchableOpacity,
    KeyboardAvoidingView,
    Modal,
    Alert,
    Pressable,
    TextInput,
    Keyboard,
    Platform,
} from 'react-native';
import StylePerfil from '../../../Styles/StylePerfil';
import StyleCreateAccount from '../../../Styles/StyleCreateAccount';
import stylemain from '../../../Styles/Stylemain';
import { db } from '../../../Services/Firebaseconfig';
import { getDoc, doc, updateDoc } from 'firebase/firestore';
import { Ionicons, Entypo, FontAwesome5, Feather, AntDesign } from '@expo/vector-icons';
import { getAuth } from 'firebase/auth';
import firebase from 'firebase/compat/app';

export default function Conta({ navigation, props }) {

    const behavior = Platform.OS === 'ios' ? 'padding' : 'height';
    const [Modal2visibile, Setmodal2visibile] = useState(false);
    const [Modal3visibile, Setmodal3visibile] = useState(false);
    const [Modal4visibile, Setmodal4visibile] = useState(false);
    const [ModalNomeVisivel, setModalNomeVisivel] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // dados cliente 
    const [nome, setNome] = useState('');
    const [novoNome, setNovoNome] = useState('');
    const [sobrenome, setSobrenome] = useState('');
    const [novoSobrenome, setNovoSobrenome] = useState('');
    const [empresa, setEmpresa] = useState('');
    const [image, setImage] = useState('');

    const auth = getAuth();

    const modificarSenha = async () => {
        firebase.auth().sendPasswordResetEmail(firebase.auth().currentUser.email);
        try {
          console.log('Email de redefinição de senha enviado!');
          setModalPass(!modalPass);
        } catch (error) {
          console.log('Erro ao enviar email de redefinição de senha:', error);
        }
    };

    useEffect(() => {
        const nomeuser = async () => {
            try {
                if (auth.currentUser) {
                    const userid = auth.currentUser.uid;
                    const userdocRef = doc(db, userid, 'dados');
                    const userdocSnap = await getDoc(userdocRef);
                    
                    if (userdocSnap.exists()) {
                        const userdata = userdocSnap.data();
                        setNome(userdata.nome);
                        setSobrenome(userdata.sobrenome);
                        setEmpresa(userdata.empresa);
                        setImage(userdata.uirphoto);
                    } else {
                        console.log('Documento do usuário não encontrado.');
                    }
                } else {
                    console.log('Nenhum usuário logado.');
                } 
            } catch (error) {
                console.log('Erro ao puxar os documentos da coleção:', error);
            }
        }
        nomeuser();
    }, [nome, sobrenome, empresa, image]);

    const codigoconfirmacao = () => {
        Setmodal3visibile(!Modal3visibile);
        Alert.alert(
            'Confirmação',
            'Recebeu o código de verificação?',
            [
              {
                  text: 'Sim  ',
                  onPress: async () => {
                      await new Promise((resolve) => {
                        setTimeout(resolve, 1000); 
                      });
                      Setmodal4visibile(!Modal4visibile);
                  },

                },
              {
                text: 'Modo férias',
                text: 'Renviar o código',
               
              },
             
            ],
            { cancelable: false }
          );
    };

    const handleUpdateNome = async () => {
        try {
            const user = auth.currentUser;
            const userdocRef = doc(db, user.uid, 'dados');

            await updateDoc(userdocRef, { nome: novoNome, sobrenome: novoSobrenome });
            setNome(novoNome);
            setSobrenome(novoSobrenome);
            setModalNomeVisivel(false);
            Alert.alert('Sucesso', 'Nome atualizado com sucesso');
        } catch (error) {
            console.error('Erro ao atualizar nome:', error);
            Alert.alert('Erro', 'Erro ao atualizar nome');
        }
    };

    return (
        <KeyboardAvoidingView behavior={behavior} style={{ flex: 1, backgroundColor: '#fff' }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <AntDesign style={{ left: 10 }} name="back" size={24} color="black" />
            </TouchableOpacity>
            <View style={{ marginTop: 10 }}>
                <Image style={StylePerfil.img} source={require('../../../assets/imag_back.jpg')} />
                <View style={StylePerfil.conteiner2}></View>
                <View style={StylePerfil.conteinerPhoto}> 
                    <Image style={StylePerfil.img2} source={{ uri: image }} />
                </View>
                <View style={[StylePerfil.conteiner4, { top: 10 }]}>
                    <Text style={StylePerfil.text2}> {nome} {sobrenome} </Text>
                    <TouchableOpacity onPress={() => {
                        setNovoNome(nome);
                        setNovoSobrenome(sobrenome);
                        setModalNomeVisivel(true);
                    }}>
                        <Feather style={{ position: 'absolute', top: 179, left: 165 }} name="edit-3" size={24} color="black" />
                    </TouchableOpacity>    
                </View>
           
                <View style={{ position: 'absolute', alignSelf: 'center', marginTop: 20 }}>
                    <TouchableOpacity style={StylePerfil.conteinerbnt} onPress={() => navigation.navigate('EditarConta')}>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            height: 60,
                            alignItems: 'center',
                            paddingHorizontal: 20,
                        }}>   
                            <Ionicons style={{ marginBottom: 15, marginTop: 15 }} name="person" size={24} color="black" />
                            <Text style={{
                                textAlign: 'center', 
                                fontWeight: 'bold',
                                fontSize: 20,
                                right: 200
                            }}>Perfil</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={[StylePerfil.conteinerbnt, { top: 70 }]} onPress={() => Setmodal3visibile(!Modal3visibile)}>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            height: 60,
                            alignItems: 'center',
                            paddingHorizontal: 20,
                        }}>   
                            <Entypo style={{ marginBottom: 15, marginTop: 15 }} name="lock" size={24} color="black" />
                            <Text style={{
                                textAlign: 'center', 
                                fontWeight: 'bold',
                                fontSize: 20,
                                right: 160
                            }}>Password</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={[StylePerfil.conteinerbnt, { top: 140 }]} onPress={() => navigation.navigate('ModoFerias')}>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            height: 60,
                            alignItems: 'center',
                            paddingHorizontal: 20,
                        }}> 
                            <FontAwesome5 style={{ marginBottom: 15, marginTop: 15 }} name="umbrella-beach" size={24} color="black" /> 
                            <Text style={{
                                textAlign: 'center', 
                                fontWeight: 'bold',
                                fontSize: 20,
                                right: 108
                            }}>Modo férias</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                
                {/* Model para alterar nome */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={ModalNomeVisivel}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                        setModalNomeVisivel(!ModalNomeVisivel);
                    }}>
                    <View style={StyleCreateAccount.centeredView}>
                        <View style={[StyleCreateAccount.modalView, {
                            backgroundColor: '#000',
                            borderRadius: 50,
                            width: 356,
                            height: 380,
                            top: -200
                        }]}>
                            <Text style={{ color: '#fff', alignSelf: 'center', fontSize: 18, fontWeight: 'bold' }}>Alterar Nome</Text>
                            <Text style={[stylemain.textinput, { color: '#fff', right: 10 }]}>Novo Nome: </Text>
                            <TextInput 
                                style={[stylemain.input, { width: 327, height: 40, marginBottom: 20 }]} 
                                placeholder="Digite o novo nome"
                                value={novoNome}
                                onChangeText={setNovoNome}
                                onPress={Keyboard.dismiss}
                            />
                            <Text style={[stylemain.textinput, { color: '#fff', right: 10 }]}>Novo Sobrenome: </Text>
                            <TextInput 
                                style={[stylemain.input, { width: 327, height: 40, marginBottom: 40 }]} 
                                placeholder="Digite o novo sobrenome"
                                value={novoSobrenome}
                                onChangeText={setNovoSobrenome}
                                onPress={Keyboard.dismiss}
                            />
                            <Pressable
                                style={[StyleCreateAccount.conteinerbtn, { top: 8 }]} 
                                onPress={handleUpdateNome}>
                                <Text style={{ color: 'black' }}> Alterar Nome </Text>
                            </Pressable>
                            <Pressable
                                style={[StyleCreateAccount.conteinerbtn, { top: 8 }]} 
                                onPress={() => setModalNomeVisivel(!ModalNomeVisivel)}>
                                <Text style={{ color: 'black' }}> Cancelar </Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
                {/* fim Model para alterar nome */}
                
                {/* Model alterar password cliente */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={Modal3visibile}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                        Setmodal2visibile(!Modal3visibile);
                    }}>
                    <View style={StyleCreateAccount.centeredView}>
                        <View style={[StyleCreateAccount.modalView, {
                            backgroundColor: '#000',
                            borderRadius: 50,
                            width: 356,
                            height: 380,
                            top: -200
                        }]}>
                            <Text style={{ color: '#fff', alignSelf: 'center', fontSize: 18, fontWeight: 'bold' }}>Alterar Password</Text>
                            <Text style={[stylemain.textinput, { color: '#fff', left: 15 }]}>Password: </Text>
                            <TextInput 
                                style={[stylemain.input, { width: 327, height: 40 }]} 
                                placeholder="Introduza seu primeiro nome" 
                                onPress={Keyboard.dismiss} 
                                secureTextEntry={true}
                            /> 
                            <Text style={[stylemain.textinput, { color: '#fff', left: 15 }]}>Confirmação password: </Text>
                            <TextInput 
                                style={[stylemain.input, { width: 327, height: 40, marginBottom: 20 }]} 
                                placeholder="Introduza seu primeiro nome" 
                                onPress={Keyboard.dismiss} 
                                secureTextEntry={true}
                            /> 
                            <Pressable
                                style={[StyleCreateAccount.conteinerbtn, { top: 8 }]} 
                                onPress={codigoconfirmacao}>
                                <Text style={{ color: 'black' }}> Alterar password </Text>
                            </Pressable>
                            <Pressable
                                style={[StyleCreateAccount.conteinerbtn, { top: 8 }]} 
                                onPress={() => Setmodal3visibile(!Modal3visibile)}>
                                <Text style={{ color: 'black' }}> Cancelar </Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
                {/* fim Model alterar password cliente */}
                
                {/* Model codigo de confirmaçao */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={Modal4visibile}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                        Setmodal2visibile(!Modal4visibile);
                    }}>
                    <View style={StyleCreateAccount.centeredView}>
                        <View style={[StyleCreateAccount.modalView, {
                            backgroundColor: '#000',
                            borderRadius: 50,
                            width: 356,
                            height: 300,
                            top: -200
                        }]}>
                            <Text style={{ color: '#fff', alignSelf: 'center', fontSize: 18, fontWeight: 'bold' }}>Alterar Password</Text>
                            <Text style={[stylemain.textinput, { color: '#fff', left: 15 }]}>Codigo de confirmação: </Text>
                            <TextInput 
                                style={[stylemain.input, { width: 327, height: 40 }]} 
                                placeholder="Introduza seu primeiro nome" 
                                onPress={Keyboard.dismiss}
                            /> 
                            <Pressable
                                style={[StyleCreateAccount.conteinerbtn, { top: 8 }]} 
                                onPress={() => Setmodal4visibile(!Modal4visibile)}>
                                <Text style={{ color: 'black' }}> confirmar </Text>
                            </Pressable>
                            <Pressable
                                style={[StyleCreateAccount.conteinerbtn, { top: 8 }]} 
                                onPress={() => Setmodal4visibile(!Modal4visibile)}>
                                <Text style={{ color: 'black' }}> Cancelar </Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
                {/* fim Model codigo de confirmaçao */}
            </View>
        </KeyboardAvoidingView>
    );
}
