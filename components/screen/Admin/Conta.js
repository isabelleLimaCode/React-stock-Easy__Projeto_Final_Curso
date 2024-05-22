import React, { useEffect, useState } from 'react';
import { 
    Dimensions, 
    View,
    Text,
    Image,
    TouchableOpacity,
    KeyboardAvoidingView,
    Modal,
    Alert,
    Pressable,
    TextInput,
    Keyboard,
    Platform,
} from 'react-native';
import StylePerfil from '../../../Styles/StylePerfil';
import StyleCreateAccount from '../../../Styles/StyleCreateAccount';
import stylemain from '../../../Styles/Stylemain';
import { db } from '../../../Services/Firebaseconfig';
import { getDoc,doc, collection, getDocs} from 'firebase/firestore';
import { Ionicons,Entypo,FontAwesome5,MaterialCommunityIcons,Feather,AntDesign } from '@expo/vector-icons';
import { getAuth } from 'firebase/auth';
export default function Conta({ navigation, props }) {

    const behavior = Platform.OS === 'ios' ? 'padding' : 'height';
    const [searchPhrase, setSearchPhrasse] = useState("");
    const [Modal2visibile,Setmodal2visibile] = useState(false);
    const [Modal3visibile,Setmodal3visibile] = useState(false);
    const [Modal4visibile,Setmodal4visibile] = useState(false);
    const [clicked, setClicked] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    //dados cliente 
    const [nome, setnome] = useState();
    const [sobrenome, setsobrenome] = useState();
    const [empresa,setempresa] = useState();
    const [image,setimage] = useState();

    
    const pickImage = async () => {
        setimage(false);
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
      
        console.log(result);
      
        if (!result.canceled) {
            setselectImage(result.assets[0].uri);
          }
      
        Setmodal2visibile(!Modal2visibile);
        setimage(false);
      };
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
                        setnome(userdata.nome);
                        setsobrenome(userdata.sobrenome);
                        setempresa(userdata.empresa);
                        setimage(userdata.uirphoto);
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
    },[nome, sobrenome,empresa,image])
    
    const codigoconfirmacao = () => {
        Setmodal3visibile(!Modal3visibile);
        Alert.alert(
            'Confirmação',
            'Recebeu o código de verificação?',
            [
              {
                  text: 'Sim  ',
                  onPress: async () => {
                      await new Promise((resolve) => {
                        setTimeout(resolve, 1000); 
                      });
                      Setmodal4visibile(!Modal4visibile);
                  },

                },
              {
                text: 'Modo férias',
                text: 'Renviar o código',
               
              },
             
            ],
            { cancelable: false }
          );
    }

 
  return (
    <KeyboardAvoidingView behavior={behavior} style={{ flex: 1 , backgroundColor:'#fff'}}>
         <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign style={{left:10}} name="back" size={24} color="black" />
          </TouchableOpacity>
        <View style={{ marginTop:10}}>
            <Image style={StylePerfil.img} source={require('../../../assets/imag_back.jpg')} />
            <View style={StylePerfil.conteiner2}>

            </View>
       
            <View style={StylePerfil.conteinerPhoto}> 
                <Image style={StylePerfil.img2} source={{ uri: image }}/>
            </View>
            <View style={[StylePerfil.conteiner4,{top:10}]}>
                <TouchableOpacity style={[StylePerfil.btnalterarTema,{left:45,top:-50}]} onPress={()=> Setmodal2visibile(!Modal2visibile)}>
                        <Text style={[StylePerfil.textbtnalterartema]}>alterar</Text>
                </TouchableOpacity> 
                <Text style ={StylePerfil.text2}> Isabelle Lima </Text>
                <TouchableOpacity>
                 <Feather style={{position:'absolute',top:179,left:165}} name="edit-3" size={24} color="black" />
                </TouchableOpacity>    
            </View>
     
           <View style={{position:'absolute',alignSelf:'center',marginTop:20}}>
           <TouchableOpacity style ={StylePerfil.conteinerbnt} onPress={() => navigation.navigate('EditarConta')}>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    height: 60,
                    alignItems: 'center',
                    paddingHorizontal: 20,
                    
                }}>   
                    <Ionicons style={{marginBottom:15,marginTop:15}} name="person" size={24} color="black" />
                    <Text style={{
                        textAlign:'center', 
                        fontWeight:'bold',
                        fontSize:20,
                        right:200
                        }} >Perfil</Text>
                </View>
            </TouchableOpacity>

           
            <TouchableOpacity style ={[StylePerfil.conteinerbnt,{top:70}]} onPress={()=> Setmodal3visibile(!Modal3visibile)}>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    height: 60,
                    alignItems: 'center',
                    paddingHorizontal: 20,
                }}>   
                    <Entypo style={{marginBottom:15,marginTop:15}} name="lock" size={24} color="black"  />
                    <Text style={{
                        textAlign:'center', 
                        fontWeight:'bold',
                        fontSize:20,
                        right:160
                        }} >Password</Text>
                </View>
            </TouchableOpacity>

          
            <TouchableOpacity style ={[StylePerfil.conteinerbnt,{top:140}]} onPress={() => navigation.navigate('ModoFerias')}>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    height: 60,
                    alignItems: 'center',
                    paddingHorizontal: 20,
                }}> 
                <FontAwesome5 style={{marginBottom:15,marginTop:15}} name="umbrella-beach" size={24} color="black" /> 
                    <Text style={{
                        textAlign:'center', 
                        fontWeight:'bold',
                        fontSize:20,
                        right:108
                        }} >Modo férias</Text>
                </View>
            </TouchableOpacity>
            
           </View>

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


                           {/* Model alterar password cliente */}
            <View>
                                <View style = {StyleCreateAccount.div}>
                                        <View style={StyleCreateAccount.centeredView}>
                                                <Modal
                                                        animationType="slide"
                                                        transparent={true}
                                                        visible={Modal3visibile}
                                                        onRequestClose={() => {
                                                        Alert.alert('Modal has been closed.');
                                                        Setmodal2visibile(!Modal3visibile);
                                                    }}>
                                                    <View style={StyleCreateAccount.centeredView}>
                                                            <View style={[StyleCreateAccount.modalView,{
                                                                backgroundColor:'#000',
                                                                borderRadius:50,
                                                                width:356,
                                                                height:380,
                                                                top:-200
                                                                }]}>
                                                                <View style={{top:-20}}>
                                                                <Text style={{color:'#fff',alignSelf:'center',fontSize:18,fontWeight:'bold'}}>Alterar Password</Text>
                                                                <Text style={[stylemain.textinput,{color:'#fff',left:15}]}>Password: </Text>
                                                                <TextInput style={[stylemain.input,{width:327,height:40,}]} placeholder="Introduza seu primeiro nome" onPress={Keyboard.dismiss} secureTextEntry={true}/> 
                                                                <Text style={[stylemain.textinput,{color:'#fff',left:15}]}>Confirmação password: </Text>
                                                                <TextInput style={[stylemain.input,{width:327,height:40,marginBottom:20}]} placeholder="Introduza seu primeiro nome" onPress={Keyboard.dismiss} secureTextEntry={true}/> 
                                                                </View>

                                                                <Pressable
                                                                        style={[StyleCreateAccount.conteinerbtn,{top:8}]} onPress={codigoconfirmacao}>
                                                                    <Text style={{color:'black'}}> Alterar password </Text>
                                                                </Pressable>

                                                                <Pressable
                                                                        style={[StyleCreateAccount.conteinerbtn,{top:8}]} onPress={()=>Setmodal3visibile(!Modal3visibile)}>
                                                                    <Text style={{color:'black'}}> Cancelar </Text>
                                                                </Pressable>
                                                                
                                                            </View>
                                                    </View>
                                                </Modal>
                                            </View>
                                        </View>
                                </View>
                         {/*fim  Model alterar password cliente */}
                
    {/* Model codigo de confirmaçao */}
            <View>
                                <View style = {StyleCreateAccount.div}>
                                        <View style={StyleCreateAccount.centeredView}>
                                                <Modal
                                                        animationType="slide"
                                                        transparent={true}
                                                        visible={Modal4visibile}
                                                        onRequestClose={() => {
                                                        Alert.alert('Modal has been closed.');
                                                        Setmodal2visibile(!Modal4visibile);
                                                    }}>
                                                    <View style={StyleCreateAccount.centeredView}>
                                                            <View style={[StyleCreateAccount.modalView,{
                                                                backgroundColor:'#000',
                                                                borderRadius:50,
                                                                width:356,
                                                                height:300,
                                                                top:-200
                                                                }]}>
                                                                <View style={{top:-20}}>
                                                                <Text style={{color:'#fff',alignSelf:'center',fontSize:18,fontWeight:'bold'}}>Alterar Password</Text>
                                                                <Text style={[stylemain.textinput,{color:'#fff',left:15}]}>Codigo de confirmação: </Text>
                                                                <TextInput style={[stylemain.input,{width:327,height:40,}]} placeholder="Introduza seu primeiro nome" onPress={Keyboard.dismiss} /> 
                                                                </View>
                                                                <Pressable
                                                                        style={[StyleCreateAccount.conteinerbtn,{}]} onPress={()=>Setmodal4visibile(!Modal4visibile)}>
                                                                    <Text style={{color:'black'}}> confirmar </Text>
                                                                </Pressable>

                                                                <Pressable
                                                                        style={[StyleCreateAccount.conteinerbtn,{}]} onPress={()=>Setmodal4visibile(!Modal4visibile)}>
                                                                    <Text style={{color:'black'}}> Cancelar </Text>
                                                                </Pressable>
                                                                
                                                            </View>
                                                    </View>
                                                </Modal>
                                            </View>
                                        </View>
                                </View>
                         {/*fim  Model codigo de confirmaçao */}
            
          
                         
                         
          
           
        </View>
    </KeyboardAvoidingView>
  );
}