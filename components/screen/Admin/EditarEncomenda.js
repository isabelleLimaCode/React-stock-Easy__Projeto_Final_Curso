import React, { useEffect, useState ,useRef} from 'react';
import { 
    Text, 
    View,
    Image,
    ScrollView,
    TouchableOpacity,
    KeyboardAvoidingView,
    SafeAreaView,
} from 'react-native';
import StyleCardObj from '../../../Styles/StyleCardObj';
import { AntDesign} from '@expo/vector-icons';
import StylesEncomenda from '../../../Styles/StylesEncomenda';
import Checkbox from 'expo-checkbox';

export default function EditarEncomenda ({navigation,route}) {
   

    const behavior = Platform.OS === 'ios' ? 'padding' : 'height';
    const [isChecked, setChecked] = useState(true);
    const [isChecked2, setChecked2] = useState(false);
    const [isChecked3, setChecked3] = useState(false);
    const [isChecked4, setChecked4] = useState(false);

    //button toogle switch 
    const [isEnable,setIsEnable] = useState(false);
    const toogleSwitch = () => setIsEnable(previousState => !previousState);

    //gesture handler
    const [locked,setLocked] = useState(true);

    //passagem por parametro navegação
    const { nEncomenda } = route.params;
    const { DadosEncomenda } = route.params;
    const { DadosCliente } = route.params;
    const {dataencomeda } = route.params;
    const[DadosEncomenda2,setDadosEncomenda2] = useState(route.params?.DadosEncomenda2);

    useEffect(()=>{
      console.log('dados encomenda',DadosEncomenda);
      console.log('dados cliente',DadosCliente);
      console.log('dados data',dataencomeda);
    },[nEncomenda])
   
  return (
   
   <KeyboardAvoidingView behavior={behavior} style={{ flex: 1 , backgroundColor:'#fff'}}>
    <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign style={{left:10}} name="back" size={24} color="black" />
    </TouchableOpacity>
    <ScrollView style={{top:10}}>
     
        <Text style={[StyleCardObj.text2,{}]}>Modificar encomenda</Text>

      <Text style={StylesEncomenda.Text1}>Encomenda nº{nEncomenda}</Text>
      <TouchableOpacity style={StylesEncomenda.btnContainer} >
        <Text style={[StylesEncomenda.Text1,{marginBottom:15,marginTop:15}]}>Criar encomenda</Text>
        <Checkbox style={StylesEncomenda.stylebox} disabled value={isChecked} onValueChange={setChecked} />
      </TouchableOpacity>

      <TouchableOpacity style={StylesEncomenda.btnContainer}onPress={() => navigation.navigate('prepararEncomenda',{DadosEncomenda2:DadosEncomenda})}>
        <Text style={[StylesEncomenda.Text1,{marginBottom:15,marginTop:15}]}>Preparar encomenda</Text>
        <Checkbox style={StylesEncomenda.stylebox} disabled value={isChecked2} onValueChange={setChecked2} />
      </TouchableOpacity>

      <TouchableOpacity style={StylesEncomenda.btnContainer} onPress={() => navigation.navigate('confirmarPagamento')}>
        <Text style={[StylesEncomenda.Text1,{marginBottom:15,marginTop:15}]}>Confirmar pagamento</Text>
        <Checkbox style={StylesEncomenda.stylebox} disabled value={isChecked3} onValueChange={setChecked3} />
      </TouchableOpacity>

      <TouchableOpacity style={StylesEncomenda.btnContainer}onPress={() => navigation.navigate('concluido')}>
        <Text style={[StylesEncomenda.Text1,{marginBottom:15,marginTop:15}]}>Finalizar</Text>
        <Checkbox style={StylesEncomenda.stylebox} disabled value={isChecked4} onValueChange={setChecked4} />
      </TouchableOpacity>

      <Text style={StylesEncomenda.text2}>Complete todas etapas para puder finalizar a encomenda</Text>

    </ScrollView>
   </KeyboardAvoidingView>
  );
}