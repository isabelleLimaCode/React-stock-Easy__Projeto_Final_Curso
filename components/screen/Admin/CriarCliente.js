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
    Alert

    
} from 'react-native';
import StyleCardObj from '../../../Styles/StyleCardObj';
import stylemain from '../../../Styles/Stylemain';
import DatePicker, {getFormatedDate}from 'react-native-modern-datepicker';
import { FontAwesome5 ,AntDesign} from '@expo/vector-icons';
import moment from 'moment';
import dayjs from 'dayjs';
import {db,app,auth} from '../../../Services/Firebaseconfig';
import { arrayUnion, setDoc, doc, getDoc,updateDoc } from 'firebase/firestore';

export default function CriarCliente({navigation}) {



  const behavior = Platform.OS === 'ios' ? 'padding' : 'height';

  //data
  const [selectedDate,setSelectStartDate] = useState();
  const [OpenDate, setOpenDate] = useState(false);
  const [maiorque18,SetMaiorque18] =useState(' ');

  //dados clientes
  const [nome,setnome]= useState();
  const [nif,setnif]= useState();
  const [email,setemail] = useState();
  const [telemovel,settelemovel] = useState();

  const hoje = new Date();
  const StartDate = getFormatedDate(hoje.setDate(hoje.getDate()+1), 'YYYY/MM/DD');

  const handleChangeDate = (propdate) => {
    setSelectStartDate(propdate);
}
  const fetchdataCliente = async () => {
    const novoCliente = {
        nome: nome,
        nif: nif,
        datanascimento: selectedDate,
        email: email,
        telemovel: telemovel,
        estado:'ativo',
    };
    console.log('dados:',novoCliente);
    try {
        const user = auth.currentUser;
        const clienteRef = doc(db,user.uid,'clientes');
        const clienteDoc = await getDoc(clienteRef);
        
        if (clienteDoc.exists()) {
            const clienteData = clienteDoc.data();
            const clientes = clienteData.clientes || [];

            const clienteExistente = clientes.find(p => p.nif === novoCliente.nif);
            
            if (clienteExistente) {
                console.log('Cliente já existe na base de dados');
                Alert.alert('Adicionar Cliente','Cliente já existe na base de dados');
            } else {
                
                await updateDoc(clienteRef, {
                    clientes: arrayUnion(novoCliente),
                });
                console.log('Cliente adicionado com sucesso:', novoCliente.nome);
                Alert.alert('Cliente:','Cliente adicionado com sucesso');
            }
        } else {
            await setDoc(clienteRef, { clientes: [novoCliente] });
            console.log('Documento de cliente criado com sucesso');
            Alert.alert('Sucesso', 'Documento do cliente criado com sucesso');
        }
    } catch (error) {
        console.error('Erro','Erro ao adicionar cliente:', error);
        Alert.alert('Error','Erro ao adicionar cliente');
    }
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
const handlechangedataname =(text) =>{
    setnome(text);
}
const handlechangeNif =(text) =>{
  setnif(text);
}
const handlechangeEmail =(text) =>{
  setemail(text);
}
const handlechangetelemovel =(text) =>{
  settelemovel(text);
}
  useEffect(() => {
    if (maiorque18 && !OpenDate) {
      Alert.alert('Idade ', 'Atenção é preciso ser maior que 18 anos!');
    }
  }, [maiorque18, OpenDate]);

 

  return (
    <KeyboardAvoidingView behavior={behavior} style={{ flex: 1 , backgroundColor:'#fff'}}>

      <View>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign style={{left:10,top:10}} name="back" size={24} color="black" />
          </TouchableOpacity>
        <Text style={[StyleCardObj.text2,{}]}>Criar Cliente</Text>

      </View>
      <ScrollView style={{marginTop:40}}>
     
      <Text style={[stylemain.textinput,{color:'#000'}]}>    Nome: </Text>
      <TextInput style={[stylemain.input,{}]} placeholder="Introduza seu primeiro nome" onPress={Keyboard.dismiss} onChangeText={handlechangedataname}/> 

      <Text style={[stylemain.textinput,{color:'#000'}]}>    Nif: </Text>
      <TextInput style={[stylemain.input,{}]} placeholder="exemplo 282866671" onPress={Keyboard.dismiss} onChangeText={handlechangeNif}/> 

      <Text style={[stylemain.textinput,{color:'#000'}]}>    Data de nascimento: </Text>
                    <TouchableOpacity style ={[stylemain.input,{}]} onPress={handleOnPressDate}>
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

      <Text style={[stylemain.textinput,{color:'#000'}]}>     Email: </Text>
      <TextInput style={[stylemain.input,{}]} placeholder="Exemplo: you@company.com " onPress={Keyboard.dismiss} onChangeText={handlechangeEmail}/> 

      <Text style={[stylemain.textinput,{color:'#000'}]}>     Telemóvel: </Text>
      <TextInput style={[stylemain.input,{}]} placeholder="Introduza seu telemóvel" onPress={Keyboard.dismiss} onChangeText={handlechangetelemovel}/> 

      <TouchableOpacity style={[stylemain.btn,{marginTop:100}]} onPress={fetchdataCliente}>
                    <Text style={stylemain.txt}>Criar Cliente </Text>
                    <FontAwesome5 name="location-arrow" size={20} color="white" style={stylemain.seta} />
      </TouchableOpacity>


      </ScrollView>
    </KeyboardAvoidingView>
  );
}