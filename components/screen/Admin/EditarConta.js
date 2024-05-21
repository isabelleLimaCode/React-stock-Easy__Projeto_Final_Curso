import React, { useEffect, useState } from 'react';
import { 
    Text, 
    View,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    TextInput,
    Keyboard,
    Modal,
    TouchableOpacity,
    Alert,
    Image,
    Pressable
} from 'react-native';
import StyleCardObj from '../../../Styles/StyleCardObj';
import stylemain from '../../../Styles/Stylemain';
import DatePicker, {getFormatedDate}from 'react-native-modern-datepicker';
import { FontAwesome5 ,AntDesign} from '@expo/vector-icons';
import moment from 'moment';
import dayjs from 'dayjs';
import StyleNewProduct from '../../../Styles/StyleNewProduct';
import { signOut ,getAuth} from 'firebase/auth';
import { db ,auth} from '../../../Services/Firebaseconfig';
import { getDoc,doc ,setDoc} from 'firebase/firestore';
import StyleCreateAccount from '../../../Styles/StyleCreateAccount';
import * as ImagePicker from 'expo-image-picker';

export default function EditarConta({navigation}) {



  const behavior = Platform.OS === 'ios' ? 'padding' : 'height';

  //data
  const [selectedDate,setSelectStartDate] = useState();
  const [OpenDate, setOpenDate] = useState(false);
  const [maiorque18,SetMaiorque18] =useState(' ');

  const hoje = new Date();
  const StartDate = getFormatedDate(hoje.setDate(hoje.getDate()+1), 'YYYY/MM/DD');

  //dados
  const [nome, setnome] = useState(false);
  const [sobrenome, setsobrenome] = useState(false);
  const [photo,setphoto] = useState();
  const [datanascimento,setdatanascimento] = useState();
  const [email, setemail] = useState();
  const [telemovel,settelemovel]= useState();

  //photo
  const [selectimage , setselectImage] = useState();
  const [changeYesorNot,setChangeYesorNot] = useState(false);
  const [Modal2visibile,Setmodal2visibile] = useState(false);

  useEffect(()=>{
    const auth = getAuth(); 

    const nomeuser = async () =>{
        try {
            if(auth.currentUser){
             const userid = auth.currentUser.uid;
             const userdocRef = doc(db,userid,'dados');
             const userdocSnap = await getDoc(userdocRef);
                if(userdocSnap.exists()){
                    const userdata = userdocSnap.data();
                    console.log(userdata);
                    setnome(userdata.nome);
                    setsobrenome(userdata.sobrenome);
                    setphoto(userdata.uirphoto);
                    setSelectStartDate(userdata.datadenascimento);
                    setemail(userdata.email);
                    settelemovel(userdata.telemovel);
                    setselectImage(userdata.uirphoto);
                    if (userdata.uirphoto !== '')
                    setChangeYesorNot(true);
                }else {
                    console.log('Documento do usuário não encontrado.');
                }
            }else {
                console.log('Nenhum usuário logado.');
            } 
        } catch (error) {
            console.log('Erro ao puxar os documentos da coleção:', error);
        }
    }
    nomeuser();

},[])


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
      } else {
        console.error("Erro ao obter o URI da imagem selecionada.");
      }
      if(selectimage == ''){
        setselectImage(false);
      }
    }

    Setmodal2visibile(!Modal2visibile);
  } catch (error) {
    console.error("Erro ao selecionar imagem:", error);
  }
};


const updateuser = async () =>{

  try {
    const auth = getAuth();
    if (auth.currentUser) {       
      await setDoc(doc(db,auth.currentUser.uid,'dados'),{
        datadenascimento:datanascimento,
        email: email,
        nome: nome,
        sobrenome:sobrenome,
        datadenascimento:selectedDate,
        email: email,
        telemovel:telemovel,
        uirphoto: selectimage,
      }, { merge: true });
      //await updateEmail(auth.currentUser,email);
      //await updatePassword(auth.currentUser,password);

      console.log('Dados do usuário atualizados com sucesso!');
    } else {
      console.log('Nenhum usuário logado.');
    }
  } catch (error) {
    console.log('Erro ao atualizar os dados do usuário:', error);
  }
}

  const handleChangeDate = (propdate) => {
    setSelectStartDate(propdate);
}
const showAlert = () =>
  Alert.alert(
    'Atualizar Conta',
    'Tem certeza que deseja atualizar os teus dados no aplicativo?',
    [
      {
        text: 'Não',
        onPress: () => Alert.alert('Operação cancelada com sucesso!'),
        style: 'cancel',
      },
      {
        text: 'Sim',
        onPress: () => {
          updateuser();
          Alert.alert('Dados modificados com sucesso!');
         },
        style: 'cancel',
      },
    
    ],
    {
      cancelable: true,
      onDismiss: () =>
        Alert.alert('operação cancelada por ter selecionado área externa'),
    },
  );


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
  const pickImageCamera = async () => {
    try {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
        console.error('Permissão para acessar a câmera negada.');
        return;
        }

        const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        });

        if (!result.canceled) {
        if (result.uri) {
            setselectImage(result.uri);
            console.log(selectimage);
            setChangeYesorNot(true);
        } else {
            console.error('Erro ao obter o URI da imagem selecionada.');
        }
        }

        Setmodal2visibile(!Modal2visibile);
    } catch (error) {
        console.error('Erro ao selecionar imagem:', error);
    }
};



  return (
    <KeyboardAvoidingView behavior={behavior} style={{ flex: 1 , backgroundColor:'#fff'}}>

      <View>
      <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign style={{left:10,top:20}} name="back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={[StyleCardObj.text2,{}]}>Editar Conta</Text>

        <View style={{justifyContent:'space-between',flexDirection:'row'}}>
                <Image style= {{
                   width:96,
                   height:96,
                   marginHorizontal:140,
                   borderRadius:10
                }} source={changeYesorNot ? { uri: selectimage } : require('./../../../assets/user.jpg')}/>

                <TouchableOpacity style = {StyleCreateAccount.alterar} onPress={()=> Setmodal2visibile(!Modal2visibile)}>
                <AntDesign name="picture" size={26} color="black" />
                </TouchableOpacity>
        </View>

      </View>
      <ScrollView style={{}}>
     
      <Text style={[stylemain.textinput,{color:'#000',left:12}]}>    Primeiro nome: </Text>
      <TextInput style={[stylemain.input,{}]} placeholder="Introduza seu primeiro nome" onPress={Keyboard.dismiss}  onChangeText={text => setnome(text)} value={nome}/> 

      <Text style={[stylemain.textinput,{color:'#000',left:12}]}>    Segundo nome: </Text>
      <TextInput style={[stylemain.input,{}]} placeholder="Introduza seu segundo nome" onPress={Keyboard.dismiss} onChangeText={text => setsobrenome(text)} value={sobrenome}/> 

      <Text style={[stylemain.textinput,{color:'#000',left:12}]}>    Data de nascimento: </Text>
                    <TouchableOpacity style ={[stylemain.input,{}]} onPress={handleOnPressDate} >
                                    <Text>{selectedDate}</Text>
                    </TouchableOpacity>

                     {/* modal pickdate*/}
    <Modal
                                    animationType='slide'
                                    transparent={true}
                                    visible={OpenDate}
                                >
                                    <View style ={{flex:1,alignContent:'center',justifyContent:'center',left:-10}}>
                                        <View style ={{margin:20,
                                                       backgroundColor:'#080516',
                                                       alignItems:'center',
                                                       justifyContent:'center',
                                                       borderRadius:20,
                                                       padding:20,
                                                       width:'95%',
                                                       shadowColor:'#000',
                                                       shadowOffset:{
                                                        width:0,height:2
                                                        },
                                                        shadowOpacity:0.25,
                                                        shadowRadius:4,
                                                        elevation:5
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
                                                    backgroundColor : '#080516',
                                                    textHeaderColor:'#059669',
                                                    textDefaultColor:'#ffffff',
                                                    selectedTextColor:'#fff',
                                                    mainColor:'#059669',
                                                    textSecondaryColor:'#ffffff',
                                                    borderColor:'rgba(122,146,165,0.1)'     
                                            }}    
                                        />
                                        <TouchableOpacity
                                            onPress={handleOnPressDate}
                                        >
                                            <Text style ={{color:'white'}}>Submeter </Text>
                                        </TouchableOpacity>

                                        </View>
                                    </View>
      </Modal>
        {/* Model alterar conta de perfil */}
        <View>
                                <View style = {StyleCreateAccount.div}>
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
                                                                <Pressable
                                                                        style={[StyleCreateAccount.conteinerbtn]} onPress={()=> Setmodal2visibile(!Modal2visibile)}>
                                                                    <Text style={{color:'black'}}>Remover foto Atual</Text>
                                                                </Pressable>
                                                                <Pressable
                                                                        style={[StyleCreateAccount.conteinerbtn,{marginTop:10}]} onPress={pickImageCamera}>
                                                                    <Text style={{color:'black'}}>Tirar uma foto</Text>
                                                                </Pressable>
                                                                <Pressable
                                                                        style={[StyleCreateAccount.conteinerbtn,{marginTop:10}]} onPress={pickImage}>
                                                                    <Text style={{color:'black'}}>Escolher na Bliblioteca</Text>
                                                                </Pressable>
                                                                <Pressable
                                                                        style={[StyleCreateAccount.conteinerbtn,{marginTop:10}]} onPress={()=>Setmodal2visibile(!Modal2visibile)}>
                                                                    <Text style={{color:'black'}}> Cancelar </Text>
                                                                </Pressable>
                                                                
                                                            </View>
                                                    </View>
                                                </Modal>
                                            </View>
                                        </View>
                                </View>
                         {/*fim  Model alterar conta de perfil */}

      <Text style={[stylemain.textinput,{color:'#000',left:12}]}>     Email: </Text>
      <TextInput style={[stylemain.input,{}]} placeholder="Exemplo: you@company.com " onPress={Keyboard.dismiss} onChangeText={text => setemail(text)} value={email}/> 

      <Text style={[stylemain.textinput,{color:'#000',left:12}]}>     Telemóvel: </Text>
      <TextInput style={[stylemain.input,{}]} placeholder="Introduza seu telemóvel" onPress={Keyboard.dismiss} onChangeText={text => settelemovel(text)} value={telemovel}/> 

      <TouchableOpacity style={{alignItems:'center',top:50}} onPress={showAlert}>
            <View style={[StyleCardObj.conteiner3,StyleNewProduct.buttonnew]}>
            <Text style={[StyleNewProduct.text2,{marginHorizontal:85,top:2}]}>Editar conta</Text>
            <FontAwesome5 style={{top:-10, marginHorizontal:10,right:3,top:1,right:40}} name="check" size={24} color="black" />
            </View>
        </TouchableOpacity>


      </ScrollView>
    </KeyboardAvoidingView>
  );
}