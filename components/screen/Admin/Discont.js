import React, { useEffect, useState } from 'react';
import { 
    Text, 
    View,
    TouchableOpacity,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    Switch,
    TextInput,
    ActivityIndicator,
    Alert
    
} from 'react-native';
import StyleCardObj from '../../../Styles/StyleCardObj';
import Slider from '@react-native-community/slider';
import StyleDiscont from '../../../Styles/StyleDiscont';
import StyleNewProduct from '../../../Styles/StyleNewProduct';
import { AntDesign } from '@expo/vector-icons';
import {db,auth} from '../../../Services/Firebaseconfig';
import { arrayUnion, setDoc, doc, getDoc,updateDoc } from 'firebase/firestore';

export default function Discont({navigation}) {

    const [range, setRange] = useState('50%');
    const [sliding,Setsliding] = useState('Valor fixado');
    const [valorcompra, setvalorcompra] = useState();
    const [valorvenda,setvalorvenda] = useState();
    const [valordiscont,setValordiscont] = useState();
    const [valorfinal,Setvalorfinal] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [quantidade,setvalorquantidade]= useState();

    //button toogle switch 
    const [isEnable,setIsEnable] = useState(false);

    useEffect(()=>{
        console.log('valorminimo',valorvenda);
        console.log('range',range);
        console.log('cupão unico',isEnable);
        console.log("quantidade",quantidade);
    },[valorcompra,range,isEnable,quantidade])


    const fetchdataCupao = async () => {
        const novoCupao = {
           valorMinimo: valorvenda,
           porcentagem: range,
           cupaoUsoUnico: isEnable,
           quantidade:quantidade,
        };
        console.log('dados:',novoCupao);
        try {
            const user = auth.currentUser;
            const cupaoRef = doc(db,user.uid,'cupões');
            const cupaoDoc = await getDoc(cupaoRef);
            
            if (cupaoDoc.exists()) {
                const cupaoData = cupaoDoc.data();
                const cupao = cupaoData.clientes || [];
    
                const cupaoExistente = cupao.find(p => p.valorMinimo === novoCupao.valorMinimo);
                const cupaoExistente2 = cupao.find(p => p.porcentagem === novoCupao.porcentagem);
                
                if (cupaoExistente && cupaoExistente2) {
                    console.log('Este tipo de cupão já existe na base de dados!');
                    Alert.alert('Adicionar Cupão','Este tipo de cupão já existe na base de dados!');
                } else {
                    
                    await updateDoc(cupaoRef, {
                        cupões: arrayUnion(novoCupao),
                    });
                    console.log('Cupão adicionado com sucesso:', novoCupao.porcentagem);
                    Alert.alert('Cupão:','Cupão adicionado com sucesso');
                }
            } else {
                await setDoc(cupaoRef, { cupões: [novoCupao] });
                console.log('Documento de cupão criado com sucesso');
                Alert.alert('Sucesso', 'Documento do cupão criado com sucesso');
            }
        } catch (error) {
            console.error('Erro','Erro ao adicionar cupão:', error);
            Alert.alert('Error','Erro ao adicionar cupão');
        }
    };

    const handleChange = ()  => {
        Alert.alert(
          'Confirmação',
          'Deseja realmente criar o cupão?',
          [
            {
                text: 'Sim ',
                onPress: async () => {
                    setIsLoading(true);
                    fetchdataCupao();
                    await new Promise((resolve) => {
                      setTimeout(resolve, 5000); 
                    });
                    navigation.goBack();
                    setIsLoading(false);
                },
              },
            {
              text: 'Cancel',
             
            },
           
          ],
          { cancelable: false }
        );

      };

    const toogleSwitch = () => setIsEnable(previousState => !previousState);

    const handlechangeValordeCompra =(text) =>{
        setvalorcompra(text);
    }
    const handlechangedvalordevenda =(text) =>{
        setvalorvenda(text);
    }
    const handlechangedvalorquantidade =(text)=>{
        setvalorquantidade(text);
    }

    const handlechangevalordesconto =(text) =>{
        const percentualDesconto = parseFloat(text) || 0; 
        const valorDesconto = (percentualDesconto / 100) * valorvenda;
        setValordiscont(valorDesconto);
        
        console.log(valordiscont);
    }

    useEffect(() => {

        if(valorcompra == null && valorvenda == null){
            setValordiscont('0');
            Setvalorfinal('0');
        }else{
            const percentualDesconto = parseFloat(range) || 0; 
            const valorDesconto = (percentualDesconto / 100) * valorvenda;
            const valorFinal = valorvenda - valorDesconto;
            setValordiscont(valorDesconto.toFixed(2));
            Setvalorfinal(valorFinal.toFixed(2));
        }

      }, [valorvenda, range]);

  const behavior = Platform.OS === 'ios' ? 'padding' : 'height';

  return (
        <KeyboardAvoidingView behavior={behavior} style={{ flex: 1 }}>
        <ScrollView style={{backgroundColor:'#fff'}}>

        <View style ={[StyleDiscont.container,{}]}>
            <View style={[StyleDiscont.switchContainer,{}]}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign style={{right:50}} name="back" size={24} color="black" />
          </TouchableOpacity>
            <Text style={StyleDiscont.text2}>Cupão de uso único?</Text>
            <Text style={StyleDiscont.switchText}>{isEnable ? 'Sim' : 'Não'}</Text>
            <Switch
                trackColor={{false:'#FF6347', true:'#3CB371'}}
                thumbColor={isEnable ? '#fff' : '#f4f3f4'}
                ios_backgroundColor={'#FF6347'}
                onValueChange={toogleSwitch}
                value ={isEnable}
                style = {StyleDiscont.Switchstyle}
                onChange={isEnable ? (console.log("yes")): (console.log("No"))}
                
            />
            
            </View>
            
        </View>
        <Text style={[StyleDiscont.text2,{fontSize:12,textAlign:'center',marginTop:10,left:20,color:'#FF6347'}]}>O "cupão de uso único" apenas pode ser utilizado uma vez</Text>
        <Text style={[StyleDiscont.text2,{fontSize:15,marginTop:40,left:20,marginBottom:30}]}>Escolha o valor do desconto:</Text>


        <View style={{
            marginTop:-16,
            left:5
        }}>

            <Text style={[StyleNewProduct.textinput, {}]}> Valor mínimo de compra: </Text>
            <TextInput style={[StyleCardObj.input, {width:340,left:5}]} placeholder="Digite seu Valor" onChangeText={handlechangedvalordevenda} />

            <Text style={[StyleNewProduct.textinput, {}]}> Quantidade: </Text>
            <TextInput style={[StyleCardObj.input, {width:340,left:5}]} placeholder="Digite a quantidade" onChangeText={handlechangedvalorquantidade} />
        </View>

        <View style={StyleDiscont.conteinerswitch}>

            <Text style={StyleDiscont.text1}>{range}</Text>
            <Text style={StyleDiscont.text1}>{sliding}</Text>
            <Slider
                style={StyleDiscont.slider}
                minimumValue={0}
                maximumValue={1}
                minimumTrackTintColor='tomato'
                maximumTrackTintColor='#000'
                thumbTintColor='#fff'
                value={.5}
                onValueChange={value => setRange(parseInt(value * 100) + '%')}
                onSlidingStart={() => Setsliding('Alterando o valor ..')}
                onSlidingComplete={() => Setsliding('Valor fixado')}
            />
            </View>

            <View>
          <View style={StyleDiscont.conteinerdis}>
            <Text style={{
                fontWeight:'bold',
                fontSize:15
            }}> Valor do desconto: </Text>
            <TextInput 
            style={[StyleCardObj.input, {}]} 
            editable={false} 
            onChangeText={handlechangevalordesconto}
            value={valordiscont}
            />
          </View>

          <View style={[StyleDiscont.conteinerdis,{marginTop:-30}]}>
            <Text style={{
                fontWeight:'bold',
                fontSize:15,
                marginHorizontal:27
            }}> Valor Final: </Text>
            <TextInput 
            style={[StyleCardObj.input, {}]} 
            editable={false} 
            onChangeText={handlechangevalordesconto}
            value={valorfinal}
            />
          </View>
          <Text style={[StyleDiscont.text2,{fontSize:12,textAlign:'center',marginBottom:15,left:20,color:'#FF6347',marginTop:-20}]}>Obs: Só poderá utilizar o cupão ao fazer uma compra igual ou superior ao valor mínimo.</Text>
        </View>

            <TouchableOpacity style={StyleDiscont.conteinerButton} onPress={handleChange}>
                <Text style={StyleDiscont.textbutton}>Criar cupão</Text>
               
             </TouchableOpacity>

             <TouchableOpacity style={[StyleDiscont.conteinerButton,{marginTop:20}]}  onPress ={() => navigation.navigate('promocao')}>
                <Text style={StyleDiscont.textbutton}>Cancelar</Text>
               
             </TouchableOpacity>
       
            
            
        </ScrollView>
        {isLoading &&(
              <View style={{position:'absolute',alignSelf:'center',top:670}}>
                <ActivityIndicator size="large" color="#000" />
                <Text style={{}}>Registrando novo Cupão...</Text>
              </View>
        )}
        </KeyboardAvoidingView>
    );
}