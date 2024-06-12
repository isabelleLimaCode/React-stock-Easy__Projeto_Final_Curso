import React, { useState,useEffect} from "react";
import { 
    Text, 
    View, 
    Image,
    TouchableOpacity,
    Modal,
    Keyboard,
    TextInput,
    Alert,
    ActivityIndicator,
    Linking
} from 'react-native';
import { Ionicons,Entypo} from '@expo/vector-icons';
import StyleCardObj from "../../../Styles/StyleCardObj";
import StyleNewProduct from "../../../Styles/StyleNewProduct";
import StyleDiscont from "../../../Styles/StyleDiscont";
import {Picker} from '@react-native-picker/picker';
import StyleCreateAccount from "../../../Styles/StyleCreateAccount";
import stylemain from "../../../Styles/Stylemain";


// header
const AtalhoBanco = ({navigation}) => {
  const [selectedBanco, setSelectedBanco] = useState('Banco Comercial Português (BCP)');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [criar,setcriar] = useState(false);
  const [selectTelemovel,setselectTelemovel] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [appstore,setappstore] = useState();

  const bancosPortugal = [
    "Caixa Geral de Depósitos (CGD)",
    "Banco Santander",
    "Novo Banco",
    "Banco BPI",
    "Millennium bcp",
  ];
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };
  const handlechangetelemovel =(text) =>{
    setselectTelemovel(text);
    
  }
 
  const deepLink = ()=>{
    if (selectedBanco == 'Caixa Geral de Depósitos (CGD)'){
      const appStoreURL = 'https://apps.apple.com/pt/app/caixadirecta/id1369089471';
      Linking.openURL(appStoreURL).catch(err => console.error('Erro ao abrir a App Store:', err));

    }else if (selectedBanco == 'Millennium bcp'){
      const appStoreURL = 'https://apps.apple.com/pt/app/millennium/id361329364';
      Linking.openURL(appStoreURL).catch(err => console.error('Erro ao abrir a App Store:', err));

    }else if (selectedBanco == 'Novo Banco'){
      const appStoreURL = 'https://apps.apple.com/pt/app/novobanco/id1523033450';
      Linking.openURL(appStoreURL).catch(err => console.error('Erro ao abrir a App Store:', err));
      
    }else if (selectedBanco == 'Banco Santander'){
      const appStoreURL = 'https://apps.apple.com/pt/app/santander-portugal/id1559567261';
      Linking.openURL(appStoreURL).catch(err => console.error('Erro ao abrir a App Store:', err));

    }else if (selectedBanco == 'Banco BPI'){
      const appStoreURL = 'https://apps.apple.com/pt/app/bpi-app/id1129271305';
      Linking.openURL(appStoreURL).catch(err => console.error('Erro ao abrir a App Store:', err));
    }
  }
  useEffect(()=>{
    console.log("banco selecionado",selectedBanco);
  },[selectedBanco])
 
  const handleEnviarPedido = () => {
    Alert.alert(
      'Pedido MBWAY',
      'Pedido enviado com sucesso',
      [
        {
          text: 'ok',
          onPress: async () => {
            setModalVisible2(!modalVisible2);
          },
        },
      ],
      { cancelable: false }
    );
  };
  
  
  return ( 
    <View style={{backgroundColor:'#FFF',flex:1}}>
      <Image
                style={{ width: 300, height: 300, resizeMode: "contain", alignSelf: 'center', top: 20,marginBottom:20}}
                source={{
                    uri: "https://firebasestorage.googleapis.com/v0/b/stock-easy-7eced.appspot.com/o/imgs%2FCredit%20card-bro.png?alt=media&token=bf8a5bfd-6eac-4ec2-acb9-a486ca9ad56b",
                }}
            />

        <TouchableOpacity style={{alignItems:'center',top:-20}} onPress={toggleModal} >
            <View style={[StyleCardObj.conteiner3,StyleNewProduct.buttonnew]}>
            <Text style={[StyleNewProduct.text2,{marginHorizontal:80,top:2}]}>Definir Atalho Banco</Text>
            <Entypo style={{top:-10, marginHorizontal:10,right:3,top:1,right:40}} name="paper-plane" size={24} color="black" />
            </View>
        </TouchableOpacity>
        <Text style={[StyleDiscont.text2,{fontSize:12,textAlign:'center',marginTop:-40,left:20,color:'#FF6347'}]}>irá criar um botão de atalho para abrir a app do teu banco</Text>

        <View style={{
          backgroundColor:'#547C96ff',
          height:200,
          top:20,
          marginHorizontal:10,
          borderRadius:10,
          alignItems:'center'
        }}>
      
    
      <Text style={[StyleNewProduct.text2,{top:2,textAlign:'center',left:-2,}]}>{selectedBanco}</Text>
      <TouchableOpacity onPress={deepLink}>
       <Ionicons name="arrow-up-circle-sharp" size={90} color="black" />
      </TouchableOpacity>
      
        </View>
        {isLoading &&(
                        <View style={{position:'absolute',alignSelf:'center',top:250}}>
                            <ActivityIndicator size="large" color="#fff" />
                        
                                <Text style={{color:'#fff',fontWeight:'bold'}}> Enviando pedido MBWAY ...</Text>
                            
                        </View>
        )}
        <Modal
            animationType='slide'
            transparent={true}
            visible={modalVisible}
            >
              <View style ={{flex:1,alignContent:'center',justifyContent:'center',left:-10}}>
                <View style ={{margin:20,
                      backgroundColor:'#fff',
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
                  <Picker
                    style = {{width:'100%'}}
                    selectedValue={selectedBanco}
                    onValueChange={(itemValue, itemIndex) => {
                    setSelectedBanco(itemValue);
                    toggleModal();
                    }}>
                      {bancosPortugal.map((banco, index) => (
                      <Picker.Item key={index} label={banco} value={banco} />
                    ))}
                  </Picker>

                </View>
            </View>
        </Modal>

        
             {/* Model alterar telemovel*/}
             <View>
                                <View style = {StyleCreateAccount.div}>
                                        <View style={StyleCreateAccount.centeredView}>
                                                <Modal
                                                        animationType="slide"
                                                        transparent={true}
                                                        visible={modalVisible2}
                                                        onRequestClose={() => {
                                                        Alert.alert('Modal has been closed.');
                                                        setModalVisible2(!modalVisible2);
                                                    }}>
                                                    <View style={StyleCreateAccount.centeredView}>
                                                            <View style={[StyleCreateAccount.modalView,{
                                                                backgroundColor:'#f4f3ee',
                                                                borderRadius:50,
                                                                width:356,
                                                                height:200,
                                                                top:-300
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
                                                                        style={[StyleCreateAccount.conteinerbtn,{top:8}]} onPress={handleEnviarPedido}>
                                                                    <Text style={{color:'#000000',fontWeight:'bold'}}> Enviar</Text>
                                                                </TouchableOpacity>
                                                                
                                                            </View>
                                                    </View>
                                                </Modal>
                                            </View>
                                        </View>
                                </View>
                         {/*fim  Model alterar telemovel*/}
    </View>

    
    
  )
}
export default AtalhoBanco;