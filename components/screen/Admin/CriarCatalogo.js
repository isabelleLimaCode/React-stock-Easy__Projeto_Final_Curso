import React, { useEffect, useState } from 'react';
import { 
    Text, 
    View,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    Modal,
    TouchableOpacity,
    Alert,
    Pressable,
    Keyboard,
    TextInput,
} from 'react-native';
import StyleCardObj from '../../../Styles/StyleCardObj';
import stylemain from '../../../Styles/Stylemain';
import { FontAwesome5 ,AntDesign} from '@expo/vector-icons';
import StyleCreateAccount from '../../../Styles/StyleCreateAccount';
import * as ImagePicker from 'expo-image-picker';
import { auth ,db} from '../../../Services/Firebaseconfig';
import { arrayUnion, setDoc, doc, getDoc,updateDoc } from 'firebase/firestore';
export default function CriarCatalogo({navigation}) {



  const behavior = Platform.OS === 'ios' ? 'padding' : 'height';
  const [Modal2visibile,Setmodal2visibile] = useState(false);
  const [image ,setImage] = useState();
  const [selectedAsset, setSelectedAsset] = useState({ uri: "" });
  

  //dados catalogo
  const [nome,setnome]= useState();
  const [selectimage , setselectImage] = useState();
  
  const fetchdataCatalogo = async () => {
    const novoCatalogo = {
        codigo: auth.currentUser.uid,
        nome: nome,
        logo: selectimage,
    };
    console.log('dados:',novoCatalogo);
    try {
        const user = auth.currentUser;
        const catalogoRef = doc(db,'catalogo',user.uid);
        const catalogoDoc = await getDoc(catalogoRef);
        
        if (catalogoDoc.exists()) {
            const catalogoData = catalogoDoc.data();
            const catalogo = catalogoData.catalogo || [];

            const catalogoExistente = catalogo.find(p => p.nif === catalogo.codigo);
            
            if (catalogoExistente) {
                console.log('Catalogo já existe na base de dados');
                Alert.alert('Adicionar Catalogo','Catalogo já existe na base de dados');
            } else {
                
                await updateDoc(catalogoRef, {
                    catalogo: arrayUnion(novoCatalogo),
                });
                console.log('Catalogo adicionado com sucesso:', novoCatalogo.codigo);
                Alert.alert('Catalogo:','Catalogo adicionado com sucesso');
            }
        } else {
            await setDoc(catalogoRef, { catalogo: [novoCatalogo] });
            console.log('Documento de catalogo criado com sucesso');
            Alert.alert('Sucesso', 'Documento do catalogo criado com sucesso');
        }
    } catch (error) {
        console.error('Erro','Erro ao adicionar catalogo:', error);
        Alert.alert('Error','Erro ao adicionar catalogo');
    }
};
  
  
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
      }
  
      Setmodal2visibile(!Modal2visibile);
    } catch (error) {
      console.error("Erro ao selecionar imagem:", error);
    }
  };
  const handlechangenome =(text) =>{
    setnome(text);
    
  }
  
  



  return (
    <KeyboardAvoidingView behavior={behavior} style={{ flex: 1 , backgroundColor:'#fff'}}>

      <View>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign style={{left:10,top:10}} name="back" size={24} color="black" />
          </TouchableOpacity>
        <Text style={[StyleCardObj.text2,{}]}>Criar Catálogo</Text>

      </View>
      <ScrollView style={{marginTop:40}}>

      <Text style={[stylemain.textinput,{color:'#000'}]}>    Logo da empresa: </Text>
                    <TouchableOpacity style ={[stylemain.input,{}]} onPress={() => Setmodal2visibile(!Modal2visibile)}>
                                    <Text>{selectimage}</Text>
                    </TouchableOpacity>
      <Text style={[stylemain.textinput,{color:'#000'}]}>    Nome da empresa: </Text>
      <TextInput style={[
        stylemain.input,
        {width:350,height:40, 
        backgroundColor:'#fff',
        color:'#000'
        }]} placeholder="Insira o nome da empresa" 
        onPress={Keyboard.dismiss}
        onChangeText={handlechangenome}
        /> 

   
      
      <TouchableOpacity style={[stylemain.btn,{marginTop:100}]} onPress={fetchdataCatalogo}>
                    <Text style={stylemain.txt}>Criar Catálogo </Text>
                    <FontAwesome5 name="location-arrow" size={20} color="white" style={stylemain.seta} />
      </TouchableOpacity>

       {/* Model alterar foto do produto */}
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
                                                                        style={[StyleCreateAccount.conteinerbtn,{marginTop:10}]} onPress={()=>Setmodal2visibile(!Modal2visibile)}>
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



      </ScrollView>
    </KeyboardAvoidingView>
  );
}