import React, { useEffect, useState } from 'react';
import { 
    Text, 
    TouchableOpacity, 
    View,
    Image,
    TextInput,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Modal,
    Alert,
    Pressable,
    ActivityIndicator
} from 'react-native';
import stylemain from '../../../Styles/Stylemain';
import StyleCreateAccount from '../../../Styles/StyleCreateAccount';
import { FontAwesome5 ,AntDesign} from '@expo/vector-icons';
import DatePicker, {getFormatedDate}from 'react-native-modern-datepicker';
import moment from 'moment';
import dayjs from 'dayjs';
import {db,app, auth} from '../../../Services/Firebaseconfig';
import {getAuth,createUserWithEmailAndPassword, signInWithEmailAndPassword, fetchSignInMethodsForEmail} from 'firebase/auth';
import { CommonActions } from '@react-navigation/native';
import { doc, setDoc } from 'firebase/firestore';
import * as ImagePicker from 'expo-image-picker';

  

export default function CreateAccountUser({navigation}) {

    const [showPassword, setShowPassword] = useState(false);
    const [maiorque18,SetMaiorque18] =useState(' ');
    const [OpenDate, setOpenDate] = useState(false);
    const [selectedDate,setSelectStartDate] = useState();
    const [Modal2visibile,Setmodal2visibile] = useState(false);

    //dados da coleção user
    const [nome,setnome] = useState(); 
    const [sobrenome,setsobrenome] = useState();
    const [datadenascimento, setdatadenascimento] = useState();
    const [nif,setnif] = useState();
    const [email,setemail] = useState();
    const [telemovel,setTelemovel] = useState();
    const [Localizacao,setLocalizacao] = useState();
    const [passwuser,setpassuser] =useState();
    const [passwuserconf,setpassuserconf] =useState();
    const [isLoading, setIsLoading] = useState(false);
    const [tipoEmpresa,setTipoempresa] = useState();
    const [nomeempresa,setnomeempresa] = useState();
    const [entrar,setentrar] = useState(false);
    const [selectimage , setselectImage] = useState();
    const [changeYesorNot,setChangeYesorNot] = useState(false);

    const hoje = new Date();
    const StartDate = getFormatedDate(hoje.setDate(hoje.getDate()+1), 'YYYY/MM/DD');

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleOnPressDate =() =>{
        setOpenDate(!OpenDate);
        const idade = moment().subtract(18, 'years').format('YYYY');
        const idadeselect = dayjs(selectedDate).year();
    
        if (idadeselect < idade) {
            SetMaiorque18(!maiorque18);
            console.log(maiorque18);
          } else {
            console.log(maiorque18);
          }
           
    }
    const pickImage = async () => {
        try {
          const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
          });
      
          console.log(result);
      
          if (!result.canceled) {
            if (result.assets && result.assets.length > 0 && result.assets[0].uri) {
              setselectImage(result.assets[0].uri);
              console.log(selectimage);
              setChangeYesorNot(true);
            } else {
              console.error("Erro ao obter o URI da imagem selecionada.");
            }
          }
      
          Setmodal2visibile(!Modal2visibile);
        } catch (error) {
          console.error("Erro ao selecionar imagem:", error);
        }
      };
    const handleChangeDate = (propdate) => {
        setSelectStartDate(propdate);
    }

    useEffect(() => {
        if (maiorque18 && !OpenDate) {
          Alert.alert('Idade ', 'Atenção é preciso ser maior que 18 anos!');
        }
    }, [maiorque18, OpenDate]);

    const newdoc = async () => {
        try {
                const auth = getAuth(app);
                const verificar = await fetchSignInMethodsForEmail(auth,email);
                if(verificar && verificar.length > 0){
                    Alert.alert('Cadastro', 'O email já está registrado');
                    return false;
                }else{
                    const auth = getAuth(app);
                    const userCredential = await createUserWithEmailAndPassword(auth, email, passwuser);
                
                    if(userCredential){
                        await setDoc(doc(db, userCredential.user.uid, 'dados'), {
                            nome: nome,
                            sobrenome: sobrenome,
                            datadenascimento: selectedDate,
                            nif: nif,
                            email: email,
                            empresa:nomeempresa,
                            tipoEmpresa:tipoEmpresa,
                            telemovel: telemovel,
                            localizacao: Localizacao,
                            uirphoto: selectimage,
                        });
                        setentrar(true);
                        Alert.alert('Cadastro', 'Conta Criada Com sucesso');
                        return true;
                    }
                }
                
           

        } catch (error) {
            switch (error.code) {
    
                case 'auth/email-already-in-use':
                    console.log('Erro email já cadastrado no sistema:', error);
                    Alert.alert('Erro', 'Usuário já existe. Faça login em vez de criar uma nova conta.');
                    break;
                case 'auth/wrong-password':
                    console.log('Erro senha não é suficientemente forte:', error);
                    Alert.alert('Erro', 'Senha ou email incorretos !');
                    break;
                case 'auth/invalid-email':
                    console.log('Erro email não valido:', error);
                    Alert.alert('Erro', 'Email invalido !');
                    break;
                case 'auth/internal-error':
                    console.log('Erro email não valido:', error);
                    Alert.alert('Erro', 'Senha ou Email não existe!');
                    break;
                default:
                    const errorMessage = error.message;
                    Alert.alert('Erro', 'Verifique os dados inseridos!');
                    console.log('Erro desconhecido:', errorMessage);
                    break;
            }
        }
    }
    

    const handlechangedataname =(text) =>{
        setnome(text);
    }
    const handlechangedataempresatipo =(text) =>{
        setTipoempresa(text);
    }
    const handlechangenomeempresa =(text) =>{
        setnomeempresa(text);
    }
    const handlechangedatapassconfi =(text)=>{
            setpassuserconf(text);
    }

    const handlechangedatasobrenome =(text) =>{
        setsobrenome(text);
    }
    const handlechangedatausername =(text) =>{
        setusername(text);
    }
    const handlechangedatdataa =(text) =>{
        setdatadenascimento(text);
    }
    const handlechangedatnif =(text) =>{
        setnif(text);
    }
    const handlechangedataemail =(text) =>{
        setemail(text);
    }
    const handlechangedtelemovel =(text) =>{
        setTelemovel(text);
    }
    const handlechangedlocalizacao =(text) =>{
        setLocalizacao  (text);
    }
    const handlechangedatapass =(text) =>{
        setpassuser(text);
    }

    const handleSignUp = ({event})  => {
        Alert.alert(
          'Confirmação',
          'Deseja realmente criar a conta?',
          [
            {
                text: 'Criar Conta ',
                onPress: async () => {
                    setIsLoading(true);
                    const sucesso = await newdoc();
                    if (sucesso){
                        navigation.dispatch(
                                CommonActions.reset({
                                index: 0,
                                routes: [{ name: 'Home' }],
                            })
                        );
                    }else{
                        setIsLoading(false);
                    }
                },
              },
            {
              text: 'Criar Conta',
              text: 'Cancel',
             
            },
           
          ],
          { cancelable: false }
        );

      };
    
    



  return (

    <KeyboardAvoidingView style={{ flex: 1, width:390}} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={StyleCreateAccount.secondConteiner}>
        <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign style={{ left: 13, top: 80 }} name="back" size={24} color="black" />
          </TouchableOpacity>
          <Image style={StyleCreateAccount.Picture} source={changeYesorNot ? { uri: selectimage } : require('./../../../assets/user.jpg')} />
          <TouchableOpacity style={StyleCreateAccount.alterar} onPress={() => Setmodal2visibile(!Modal2visibile)}>
            <AntDesign name="picture" size={26} color="black" />
          </TouchableOpacity>
        </View>

        {/* Model alterar conta de perfil */}
        <View>
          <View style={StyleCreateAccount.div}>
            <View style={StyleCreateAccount.centeredView}>
              <Modal
                animationType="slide"
                transparent={true}
                visible={Modal2visibile}
                onRequestClose={() => {
                  Alert.alert('Modal has been closed.');
                  Setmodal2visibile(!Modal2visibile);
                }}>
                <View style={StyleCreateAccount.centeredView}>
                  <View style={StyleCreateAccount.modalView}>
                    <Pressable style={[StyleCreateAccount.conteinerbtn]} onPress={() => Setmodal2visibile(!Modal2visibile)}>
                      <Text style={{ color: 'black' }}>Remover foto Atual</Text>
                    </Pressable>
                    <Pressable style={[StyleCreateAccount.conteinerbtn, { marginTop: 10 }]} onPress={() => Setmodal2visibile(!Modal2visibile)}>
                      <Text style={{ color: 'black' }}>Tirar uma foto</Text>
                    </Pressable>
                    <Pressable style={[StyleCreateAccount.conteinerbtn, { marginTop: 10 }]} onPress={pickImage}>
                      <Text style={{ color: 'black' }}>Escolher na Bliblioteca</Text>
                    </Pressable>
                    <Pressable style={[StyleCreateAccount.conteinerbtn, { marginTop: 10 }]} onPress={() => Setmodal2visibile(!Modal2visibile)}>
                      <Text style={{ color: 'black' }}> Cancelar </Text>
                    </Pressable>
                  </View>
                </View>
              </Modal>
            </View>
          </View>
        </View>
        {/* fim Model alterar conta de perfil */}

        {/* Form Fields */}
        <View style={{ flexDirection: 'row' }}>
          <Text style={[stylemain.textinput, { top: 10 }]}>Primeiro Nome:</Text>
          <Text style={{ color: 'red', top: 14, left: 25 }}>*</Text>
        </View>
        <TextInput style={[stylemain.input, { top: 10 }]} placeholder="Introduza seu nome" onPress={Keyboard.dismiss} onChangeText={handlechangedataname} />

        <View style={{ flexDirection: 'row' }}>
          <Text style={[stylemain.textinput, { top: 10 }]}>Segundo nome:</Text>
          <Text style={{ color: 'red', top: 14, left: 25 }}>*</Text>
        </View>
        <TextInput style={[stylemain.input, { top: 10 }]} placeholder="Introduza seu sobrenome" onPress={Keyboard.dismiss} onChangeText={handlechangedatasobrenome} />

        <View style={{ flexDirection: 'row' }}>
          <Text style={[stylemain.textinput, { top: 10 }]}>Tipo de empresa:</Text>
          <Text style={{ color: 'red', top: 14, left: 25 }}>*</Text>
        </View>
        <TextInput style={[stylemain.input, { top: 10 }]} placeholder="Exemplo: Alimentação" onPress={Keyboard.dismiss} onChangeText={handlechangedataempresatipo} />

        <View style={{ flexDirection: 'row' }}>
          <Text style={[stylemain.textinput, { top: 10 }]}>Nome da empresa:</Text>
          <Text style={{ color: 'red', top: 14, left: 25 }}>*</Text>
        </View>
        <TextInput style={[stylemain.input, { top: 10 }]} placeholder="Exemplo: Lda." onPress={Keyboard.dismiss} onChangeText={handlechangenomeempresa} />

        <View style={{ flexDirection: 'row' }}>
          <Text style={[stylemain.textinput, { top: 10 }]}>Data de nascimento:</Text>
          <Text style={{ color: 'red', top: 14, left: 25 }}>*</Text>
        </View>
        <TouchableOpacity style={[stylemain.input, { top: 10 }]} onPress={handleOnPressDate}>
          <Text>{selectedDate}</Text>
        </TouchableOpacity>

        {/* modal pickdate */}
        <Modal animationType='slide' transparent={true} visible={OpenDate}>
          <View style={{ flex: 1, alignContent: 'center', justifyContent: 'center', left: -10 }}>
            <View style={{
              margin: 20,
              backgroundColor: '#080516',
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
              <DatePicker
                mode='calendar'
                selected={selectedDate}
                date={moment().format('DD')}
                current={selectedDate}
                maximumDate={moment().format('YYYY/MM/DD')}
                selectorStartingYear={StartDate}
                onDateChange={handleChangeDate}
                onSelectedChange={Date => setSelectStartDate(Date)}
                options={{
                  backgroundColor: '#080516',
                  textHeaderColor: '#059669',
                  textDefaultColor: '#ffffff',
                  selectedTextColor: '#fff',
                  mainColor: '#059669',
                  textSecondaryColor: '#ffffff',
                  borderColor: 'rgba(122,146,165,0.1)'
                }}
              />
              <TouchableOpacity onPress={handleOnPressDate}>
                <Text style={{ color: 'white' }}>Submeter</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <View style={{ flexDirection: 'row' }}>
          <Text style={[stylemain.textinput, { top: 10 }]}>Nif: *</Text>
          <Text style={{ color: 'red', top: 14, left: 25 }}>*</Text>
        </View>
        <TextInput style={[stylemain.input, { top: 10 }]} placeholder="Exemplo: Bragança" onPress={Keyboard.dismiss} onChangeText={handlechangedatnif} />

        <View style={{ flexDirection: 'row' }}>
          <Text style={[stylemain.textinput, { top: 10 }]}>E-mail:</Text>
          <Text style={{ color: 'red', top: 14, left: 25 }}>*</Text>
        </View>
        <TextInput style={[stylemain.input, { top: 10 }]} placeholder="Exemplo@gmail.com" onPress={Keyboard.dismiss} onChangeText={handlechangedataemail} />

        <View style={{ flexDirection: 'row' }}>
          <Text style={[stylemain.textinput, { top: 10 }]}>Telemóvel:</Text>
          <Text style={{ color: 'red', top: 14, left: 25 }}>*</Text>
        </View>
        <TextInput style={[stylemain.input, { top: 10 }]} placeholder="Exemplo: 9875643211" onPress={Keyboard.dismiss} onChangeText={handlechangedtelemovel} />

        <Text style={[stylemain.textinput, { top: 10 }]}>Localização:</Text>
        <TextInput style={[stylemain.input, { top: 10 }]} placeholder="Exemplo: 9875643211" onPress={Keyboard.dismiss} onChangeText={handlechangedlocalizacao} />

        <View style={{ flexDirection: 'row' }}>
          <Text style={[stylemain.textinput, { top: 10 }]}>Password:</Text>
          <Text style={{ color: 'red', top: 14, left: 25 }}>*</Text>
        </View>
        <TextInput secureTextEntry={!showPassword} keyboardType={'default'} style={[stylemain.input, { top: 10 }]} placeholder="Introduza sua password" onPress={Keyboard.dismiss} onChangeText={handlechangedatapass} />
        <TouchableOpacity onPress={togglePasswordVisibility} style={[stylemain.eye2, { top: -30, right: 35 }]}>
          <FontAwesome5 name={showPassword ? 'eye' : 'eye-slash'} size={20} color="black" />
        </TouchableOpacity>

        <View style={{ flexDirection: 'row' }}>
          <Text style={[stylemain.textinput, { top: -10 }]}>Confirmar password:</Text>
          <Text style={{ color: 'red', left: 25, top: -5 }}>*</Text>
        </View>
        <TextInput secureTextEntry={!showPassword} keyboardType={'default'} style={[stylemain.input, { top: -10 }]} placeholder="Confirme sua password" onPress={Keyboard.dismiss} onChangeText={handlechangedatapassconfi} />
        <TouchableOpacity onPress={togglePasswordVisibility} style={[stylemain.eye, { top: -50 }]}>
          <FontAwesome5 name={showPassword ? 'eye' : 'eye-slash'} size={20} color="black" />
        </TouchableOpacity>

        <TouchableOpacity style={[stylemain.btn, { top: -25 }]} onPress={handleSignUp}>
          <Text style={stylemain.txt}>Criar Conta</Text>
          <FontAwesome5 name="location-arrow" size={20} color="white" style={stylemain.seta} />
        </TouchableOpacity>
      </ScrollView>
      {isLoading && (
        <View style={{ position: 'absolute', alignSelf: 'center', top: 420 }}>
          <ActivityIndicator size="large" color="#000" />
          <Text>Criando a Sua Conta ...</Text>
        </View>
      )}
    </KeyboardAvoidingView>
  );
}