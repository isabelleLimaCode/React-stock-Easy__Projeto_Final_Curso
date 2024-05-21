import React, { useEffect, useState } from 'react';
import { 
    View,
    Text,
    TouchableOpacity,
    KeyboardAvoidingView,
    TextInput,
    Keyboard,
    Image,
    Modal,
    Alert,
    Platform
} from 'react-native';
import StyleCardObj from '../../../Styles/StyleCardObj';
import { FontAwesome5 ,AntDesign,Feather} from '@expo/vector-icons';
import StyleNewProduct from '../../../Styles/StyleNewProduct';
import stylemain from '../../../Styles/Stylemain';
import StyleMetodo from '../../../Styles/StyleMetodo';
import { CheckBox } from 'react-native-elements';
import StyleCreateAccount from '../../../Styles/StyleCreateAccount';
import { ScrollView } from 'react-native-gesture-handler';

export default function MetodoEnvio({navigation,route}) {

    const behavior = Platform.OS === 'ios' ? 'padding' : 'height';
    const [isSelected, setSelection] = useState(false);
    const [isSelected2, setSelection2] = useState(false);
    const [selectTelemovel,setselectTelemovel] = useState('');
    const [Modalvisibile,Setmodalvisibile] = useState(false);
    const [Modal2visibile,Setmodal2visibile] = useState(false);
    //quanl sera selecionado
    const [isSelect,SetisSelect] = useState(false);
    const [isSelect2,SetisSelect2] = useState(false);

    //props
    const[morada,setmorada] = useState(route.params?.morada);
    const[tipoentrega,settipoentrega] = useState(route.params?.tipoentrega);
    const[contacto,setcontacto] = useState(route.params?.contacto);
    const[metodopagamento,setmetodopagamento] = useState();
    const [data,setdata] = useState([]);
    const [passadataProduto,setpassadataProduto] = useState(route.params?.passadata);
    const [passadataMetodo,setpassadataMetodo] = useState(route.params?.passadata);
    const [passadataCliente,setpassadataCliente] = useState(route.params?.passadata);
    const { passadata3,setpassadata3} = route.params;
    const { passadata4,setpassadata4} = route.params;
    const { valortotal,setvalortotal} = route.params;
    const [opçãoEntrega,setopçãoEntrega] = useState(false);
    const [opçãoEntrega2,setopçãoEntrega2] = useState(false);

    

    useEffect(()=>{
        console.log(passadata3);
        console.log(passadata4);
        console.log('opçao entrega MB', opçãoEntrega2);
        console.log('opçao entrega Maos', opçãoEntrega);
        console.log('valortotal:',valortotal);
    },[opçãoEntrega2,opçãoEntrega])
    const handlechangetelemovel =(text) =>{
        setselectTelemovel(text);
        setcontacto(text);
    }
    const handleMorada = (text) => {
        setmorada(text);
    }

    useEffect(() => {
        if(isSelect === true ){
            settipoentrega('enviarCasa');
        }else if (isSelect2 === true ){
            settipoentrega('EmMaos');
        }
        console.log('tipo de entrega selecionado',tipoentrega);
    }, [isSelect, isSelect2,tipoentrega]);
    
    useEffect(() => {
        if (opçãoEntrega2) {
            setmetodopagamento('MB');
        } else if (opçãoEntrega) {
            setmetodopagamento('EmMaos');
        }
    }, [opçãoEntrega, opçãoEntrega2]);

  
    
    const handlePress = () => {
        Setmodalvisibile(!Modalvisibile);
    };

    const handlepress2 = () => {
        if (!opçãoEntrega2) {
            setopçãoEntrega2(true);
            if (opçãoEntrega) {
                setopçãoEntrega(false); 
            }
        }
    }

   
    
    
    const handlepress3 = () => {
        if (!opçãoEntrega) {
            setopçãoEntrega(true);
            if (opçãoEntrega2) {
                setopçãoEntrega2(false); 
            }
        }

    }
    
    const opçãoentregaMetodo = () => {
        if (isSelected2) {
            Alert.alert(
                'Método de entrega',
                'Você só pode escolher um método de entrega por vez',
                [{ text: 'OK' }],
                { cancelable: false }
            );
        } else {
            setSelection(!isSelected);
            if (!isSelected) {
                setSelection2(false); 
                settipoentrega('ctt');
            }
        }
    }
    const opçãoentregaMetodo2 = () => {
        if (isSelected) {
            Alert.alert(
                'Método de entrega',
                'Você só pode escolher um método de entrega por vez',
                [{ text: 'OK' }],
                { cancelable: false }
            );
        } else {
            setSelection2(!isSelected2);
            if (!isSelected2) {
                setSelection(false); 
                settipoentrega('EmMaos');
            }
        }
    }

        useEffect(() => {
            let newData = [];
            newData.push(morada, contacto, tipoentrega,metodopagamento);
            console.log('tipo de entrega selecionado', tipoentrega);
            setdata(newData);
        }, [isSelect, isSelect2, morada, contacto,tipoentrega,metodopagamento]);
    

  return (
    <KeyboardAvoidingView behavior={behavior} style={{ flex: 1 , backgroundColor:'#fff'}}>
      <ScrollView>
     <View>
        <TouchableOpacity onPress={() => navigation.goBack()}>
                <AntDesign style={{left:10,top:10}} name="back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={[StyleCardObj.text2,{}]}>Método de Envio</Text>
        <Text style={[stylemain.textinput,{color:'#000',fontWeight:'bold'}]}>       Morada: </Text>

        <TextInput 
            style={[stylemain.input, { height: 100 }]} 
            placeholder="Digite sua Morada" 
            multiline={true}
            onChangeText={handleMorada}
        />

        <Text style={StyleMetodo.text}>Opção de entrega:</Text>
        
        <View style={StyleMetodo.conteiner}>
        <FontAwesome5 style={StyleMetodo.icon} name="shipping-fast" size={24} color="black" />
        <View style={StyleMetodo.conteiner2}>
            <Text style={StyleMetodo.text}>Enviar para casa</Text>
            <Text style={StyleMetodo.text2}>Desde 4,59 €</Text>
        </View>
        <CheckBox
            checked={isSelected}
            onPress={opçãoentregaMetodo}
            containerStyle={{left:50,top:20}}
        />
        </View>

        <View style={StyleMetodo.conteiner}>
        <FontAwesome5 style={StyleMetodo.icon} name="handshake" size={24} color="black" />
        <View style={StyleMetodo.conteiner2}>
            <Text style={StyleMetodo.text}>Entregar em Mãos</Text>
        </View>
        <CheckBox
            checked={isSelected2}
            onPress={opçãoentregaMetodo2}
            containerStyle={{left:39,top:20}}
        />
        </View>
       {isSelected && (
         <View>
            <Text style={StyleMetodo.text}>Detalhes de entrega:</Text>
            <View style={StyleMetodo.conteiner}>
                    <Image
                            style={{ width: 50, height: 50, resizeMode: "contain",alignSelf:'center',left:40 }}
                            source={{
                                uri: "https://www.sjpesqueira.pt/cmsaojoaopesqueira/uploads/poi/image/257/ctt.png",
                            }}
                    />
                    <View style={[StyleMetodo.conteiner2,{left:40}]}>
                        <Text style={StyleMetodo.text}>Correios Normal Registrado</Text>
                        <Text style={StyleMetodo.text2}>4,59€</Text>
                        <Text style={StyleMetodo.text2}>Entrega ao domicilio , 1-2 dias úteis</Text>
                    </View>
            </View>
        </View>
       )}
       <Text style={StyleMetodo.text}>Dados de Contacto:</Text>
        <View style={StyleMetodo.conteiner}>
                <TextInput
                style={[stylemain.input, { top: -5 ,width:200}]}
                editable={false}
                value={selectTelemovel}
                />
        <TouchableOpacity style={{}} onPress={handlePress}>
        <Feather style={[StyleMetodo.icon,{top:-8,right:40}]} name="edit" size={24} color="black" />
        </TouchableOpacity>
        </View>

         <Text style={StyleMetodo.text}>Pagamento:</Text>
         <View style={StyleMetodo.conteiner}>
         {opçãoEntrega ? (
            <View style={StyleMetodo.conteiner}>
            <Image
                style={{ width: 70, height: 60, resizeMode: "contain", alignSelf: 'center', top: 20, left: 30 }}
                source={{
                    uri: "https://cdn-icons-png.flaticon.com/512/5074/5074570.png",
                }}
            />
            <TouchableOpacity style={{}} onPress={() => Setmodal2visibile(!Modal2visibile)}>
            <Feather style={[StyleMetodo.icon,{left:10,top:15}]} name="edit" size={24} color="black" />
            </TouchableOpacity>
            </View>
        ) : (opçãoEntrega2 ? (
            <View style={StyleMetodo.conteiner}>
            <Image
                style={{ width: 70, height: 60, resizeMode: "contain", alignSelf: 'center', top: 20, left: 30 }}
                source={{
                    uri: "https://seeklogo.com/images/M/mbway-logo-2CD6980569-seeklogo.com.png",
                }}
            />
            <TouchableOpacity style={{}}onPress={() => Setmodal2visibile(!Modal2visibile)}>
            <Feather style={[StyleMetodo.icon,{left:10,top:15}]} name="edit" size={24} color="black" />
            </TouchableOpacity>
            </View>
        ) : (
            <View style={StyleMetodo.conteiner}>
                <Text style={StyleMetodo.text}>Escolha um método de pagamento</Text>
                <TouchableOpacity onPress={() => Setmodal2visibile(!Modal2visibile)}>
                    <AntDesign style={[StyleMetodo.icon, { top: 6 }]} name="plussquareo" size={24} color="#a5ccd4" />
                </TouchableOpacity>
            </View>
        ))}

            
        
         </View>
        
       

     </View>
     
     

     <TouchableOpacity style={{alignItems:'center',marginTop:5}} onPress={()=> navigation.navigate('FinalizarVenda',{passadataProduto:passadata4,passadataMetodo:data,passadataCliente:passadata3})}>
            <View style={[StyleCardObj.conteiner3,StyleNewProduct.buttonnew]}>
            <Text style={[StyleNewProduct.text2,{marginHorizontal:85,top:2}]}>Próximo</Text>
            <AntDesign style={{top:-10, marginHorizontal:10,right:3,top:1,right:40}} name="arrowright" size={24} color="black" />
            </View>
        </TouchableOpacity>  

             {/* Model alterar telemovel*/}
         <View>
                                <View style = {StyleCreateAccount.div}>
                                        <View style={StyleCreateAccount.centeredView}>
                                                <Modal
                                                        animationType="slide"
                                                        transparent={true}
                                                        visible={Modalvisibile}
                                                        onRequestClose={() => {
                                                        Alert.alert('Modal has been closed.');
                                                        Setmodalvisibile(!Modalvisibile);
                                                    }}>
                                                    <View style={StyleCreateAccount.centeredView}>
                                                            <View style={[StyleCreateAccount.modalView,{
                                                                backgroundColor:'#f4f3ee',
                                                                borderRadius:50,
                                                                width:356,
                                                                height:300,
                                                                top:-200
                                                                }]}>
                                                                <View style={{top:-20}}>
                                                                <Text style={{color:'#000',alignSelf:'center',fontSize:18,fontWeight:'bold'}}>Telemóvel</Text>
                                                                <TextInput 
                                                                style={[
                                                                  stylemain.input,
                                                                  {width:327,height:40, 
                                                                  backgroundColor:'#000',
                                                                  color:'#fff'
                                                                  }]} placeholder="Insira o numero de telemóvel" 
                                                                  onPress={Keyboard.dismiss}
                                                                  onChangeText={handlechangetelemovel}
                                                                  /> 
                                                                </View>

                                                                <TouchableOpacity
                                                                        style={[StyleCreateAccount.conteinerbtn,{top:8}]} onPress={()=>Setmodalvisibile(!Modalvisibile)}>
                                                                    <Text style={{color:'#000000',fontWeight:'bold'}}> Alterar</Text>
                                                                </TouchableOpacity>
                                                                
                                                            </View>
                                                    </View>
                                                </Modal>
                                            </View>
                                        </View>
                                </View>
                         {/*fim  Model alterar telemovel*/}

 {/* Model alterar metodo de envio */}
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
                                                            <View style={[StyleCreateAccount.modalView,{
                                                                backgroundColor:'#f4f3ee',
                                                                borderRadius:50,
                                                                width:356,
                                                                height:500,
                                                                top:-100
                                                                }]}>
                                                                <View style={{top:-20}}>
                                                                    <Text style={{color:'#000',alignSelf:'center',fontSize:18,fontWeight:'bold'}}>Método de Pagamento</Text>
                                                                    <View style={StyleMetodo.conteiner}>
                                                                        <TouchableOpacity onPress={handlepress2}>
                                                                            <View  style={[StyleCreateAccount.metodo,{backgroundColor:opçãoEntrega2 ? '#a5ccd4' : '#fff'}]}>
                                                                            <Image
                                                                                style={{ width: 60, height: 30, resizeMode: "contain",alignSelf:'center' ,top:30}}
                                                                                source={{
                                                                                    uri: "https://seeklogo.com/images/M/mbway-logo-2CD6980569-seeklogo.com.png",
                                                                                }}
                                                                                />
                                                                            </View>
                                                                        </TouchableOpacity>
                                                                        
                                                                        <TouchableOpacity onPress={handlepress3}>
                                                                            <View style={[StyleCreateAccount.metodo,{backgroundColor:opçãoEntrega ? '#a5ccd4' : '#fff'}]}>
                                                                            <Image
                                                                                style={{ width: 70, height: 70, resizeMode: "contain",alignSelf:'center' ,top:15}}
                                                                                source={{
                                                                                    uri: "https://cdn-icons-png.flaticon.com/512/5074/5074570.png",
                                                                                }}
                                                                                />
                                                                            </View>
                                                                        </TouchableOpacity>
                                                                    
                                                                    </View>
                                        
                                                                </View>
                                                                {opçãoEntrega2 &&(
                                                                            <View style={{top:-20}}>
                                                                            <Text style={{textAlign:'center',marginTop:15,fontWeight:'bold',fontSize:12}}>Para confirmar a compra, clique em 'Definir método'.
                                                                                Após a confirmação, receberá notificação do MB WAY para confirmar o pagamento.</Text>
                                                                            <Text style={{top:30,left:15,fontWeight:'bold'}}> Nº Telemóvel MB WAY*: </Text>
                                                                            <TextInput 
                                                                            style={[
                                                                            stylemain.input,
                                                                            {width:327,height:40, 
                                                                            backgroundColor:'#000',
                                                                            color:'#fff'
                                                                            }]} placeholder="Insira o numero de telemóvel" 
                                                                            onPress={Keyboard.dismiss}
                                                                            onChangeText={handlechangetelemovel}
                                                                            value={selectTelemovel}
                                                                            />
                                                                            <Text style={{top:20,fontSize:13,left:15,color:'blue'}}>*Depois irá receber uma confirmação de pagamento</Text>
                                                                            </View>
                                                                            
                                                                        )}
                                                                {opçãoEntrega &&(
                                                                    <Text style={{textAlign:'center',marginTop:15,fontWeight:'bold',fontSize:12}}>
                                                                    Para confirmar a compra, clique em 'Definir método de entrega'. Após a confirmação, você poderá definir o local 
                                                                    e horário de entrega conforme sua preferência.</Text>
                                                                )}
                                                                <TouchableOpacity
                                                                        style={[StyleCreateAccount.conteinerbtn,{top:20,borderWidth:2}]} onPress={()=>Setmodal2visibile(!Modal2visibile)}>
                                                                    <Text style={{color:'#000000',fontWeight:'bold'}}>Definir método</Text>
                                                                </TouchableOpacity>
                                                                
                                                            </View>
                                                    </View>
                                                </Modal>
                                            </View>
                                        </View>
                                </View>
                         {/*fim  Model alterar password cliente */}  
    </ScrollView>
  </KeyboardAvoidingView>
  );
}