import React, { useEffect, useState } from 'react';
import { 
    Dimensions, 
    View,
    Text,
    Image,
    TouchableOpacity,
    KeyboardAvoidingView,
    ScrollView,
    Platform
} from 'react-native';
import StyleCardObj from '../../../Styles/StyleCardObj';
import { Ionicons,MaterialIcons} from '@expo/vector-icons';
import StyleModificarEnc from '../../../Styles/StyleModificarEnc';
export default function ModificarEncomenda({navigation}) {

    const behavior = Platform.OS === 'ios' ? 'padding' : 'height';

    const [isChecked, setIsChecked] = useState(true);
    const [isChecked1, setIsChecked1] = useState(true);
    const [isChecked2, setIsChecked2] = useState(true);
    const [isChecked3, setIsChecked3] = useState(false);
    const [isChecked4, setIsChecked4] = useState(false);

    const handlePress = () => {
      setIsChecked(!isChecked);
    };

  return (
    <KeyboardAvoidingView behavior={behavior} style={{ flex: 1 , backgroundColor:'#fff'}}>
    <ScrollView>

      <TouchableOpacity style={StyleCardObj.back}>
        <Image style={StyleCardObj.Picture} source={require('./../../../assets/arrow-circle-left.png')} />
      </TouchableOpacity>

        <Text style={StyleCardObj.text2}>Modificar encomenda</Text>
        <Text style={StyleModificarEnc.text}>Nº Encomenda 33458</Text>

        <View style={{marginTop:50}}>

            <TouchableOpacity style={StyleModificarEnc.conteiner}>
                <Text style={StyleModificarEnc.textconteiner}>Criar encomenda</Text>
                {isChecked == true  ?( 
                   <View style={{left:22}}>
                        <MaterialIcons name="check-box" size={24} color="white" />
                   </View>
                ): 
                    <View style={{left:22}}>
                        <MaterialIcons name="check-box-outline-blank" size={24} color="black" />
                    </View>
                }
            </TouchableOpacity>

            <TouchableOpacity style={StyleModificarEnc.conteiner}>
                <Text style={StyleModificarEnc.textconteiner}>Preparar encomenda</Text>
                {isChecked2 == true  ?( 
                    <View style={{left:9}}>
                    <MaterialIcons name="check-box" size={24} color="white" />
                    </View>
                ): 
                    <View style={{left:9}}>
                        <MaterialIcons name="check-box-outline-blank" size={24} color="black" />
                    </View>
                }
            </TouchableOpacity>

            <TouchableOpacity style={StyleModificarEnc.conteiner} onPress={() => navigation.navigate('confirmarPagamento')}>
                <Text style={StyleModificarEnc.textconteiner}>Confirmar pagamento</Text>
                {isChecked3 == true  ?( 
                    <View style={{left:5}}>
                         <MaterialIcons name="check-box" size={24} color="white" />
                    </View>
                   
                ): 
                    <View style={{left:5}}>
                         <MaterialIcons name="check-box-outline-blank" size={24} color="black" />
                    </View>
  
                }
            </TouchableOpacity>

            <TouchableOpacity style={StyleModificarEnc.conteiner}>
                <Text style={StyleModificarEnc.textconteiner}>Finalizar</Text>
                {isChecked4 == true  ?( 
                    <View style={{left:50}} >
                         <MaterialIcons name="check-box" size={24} color="white" />
                    </View>
                   
                ): 
                    <View style={{left:50}}>
                        <MaterialIcons  name="check-box-outline-blank" size={24} color="black" /> 
                    </View>   
                }
            </TouchableOpacity>
        </View>
        <Text style={[StyleModificarEnc.textinfor,{marginTop:55}]}>Irá gerar a fatura para o cliente.</Text>
        <Text style={StyleModificarEnc.textinfor}>Complete todas etapas para puder finalizar</Text>
        <Text style={StyleModificarEnc.textinfor}>a encomenda.</Text>
    </ScrollView>
  </KeyboardAvoidingView>
  );
}