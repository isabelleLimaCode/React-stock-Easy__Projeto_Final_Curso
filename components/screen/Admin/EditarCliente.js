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
  
} from 'react-native';
import StyleCardObj from '../../../Styles/StyleCardObj';
import stylemain from '../../../Styles/Stylemain';
import DatePicker, {getFormatedDate}from 'react-native-modern-datepicker';
import { FontAwesome5 ,AntDesign} from '@expo/vector-icons';
import moment from 'moment';
import dayjs from 'dayjs';

export default function EditarCliente({navigation}) {



  const behavior = Platform.OS === 'ios' ? 'padding' : 'height';

  //data
  const [selectedDate,setSelectStartDate] = useState();
  const [OpenDate, setOpenDate] = useState(false);
  const [maiorque18,SetMaiorque18] =useState(' ');

  const hoje = new Date();
  const StartDate = getFormatedDate(hoje.setDate(hoje.getDate()+1), 'YYYY/MM/DD');

  const handleChangeDate = (propdate) => {
    setSelectStartDate(propdate);
}

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


  return (
    <KeyboardAvoidingView behavior={behavior} style={{ flex: 1 , backgroundColor:'#fff'}}>

      <View>
        <Text style={[StyleCardObj.text2,{top:90}]}>Editar Cliente</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign style={{left:10}} name="back" size={24} color="black" />
          </TouchableOpacity>
      </View>
      <ScrollView style={{marginTop:90}}>
     
      <Text style={[stylemain.textinput,{color:'#000'}]}>    Nome: </Text>
      <TextInput style={[stylemain.input,{}]} placeholder="Introduza seu primeiro nome" onPress={Keyboard.dismiss} /> 

      <Text style={[stylemain.textinput,{color:'#000'}]}>     Email: </Text>
      <TextInput style={[stylemain.input,{}]} placeholder="Exemplo: you@company.com " onPress={Keyboard.dismiss} /> 

      <Text style={[stylemain.textinput,{color:'#000'}]}>     Telemóvel: </Text>
      <TextInput style={[stylemain.input,{}]} placeholder="Introduza seu telemóvel" onPress={Keyboard.dismiss} /> 

      <TouchableOpacity style={[stylemain.btn,{marginTop:100}]}>
                    <Text style={stylemain.txt}>Alterar dados</Text>
                    <FontAwesome5 name="location-arrow" size={20} color="white" style={stylemain.seta} />
      </TouchableOpacity>


      </ScrollView>
    </KeyboardAvoidingView>
  );
}