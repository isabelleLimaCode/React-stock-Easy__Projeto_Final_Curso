import React, { useEffect, useState } from 'react';
import { 
    Text, 
    TouchableOpacity, 
    View,
    Image,
    TextInput,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    ActivityIndicator,
    Alert
} from 'react-native';
import Stylemain from '../../../Styles/Stylemain';
import { FontAwesome5 ,AntDesign} from '@expo/vector-icons';
import {db,auth,app} from './../../../Services/Firebaseconfig';
import {doc,getDoc,collection,query,where,getDocs} from 'firebase/firestore'
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';



  

export default function Login({navigation,route}) {

    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState();
    const [passwuser,setpassuser] =useState();
    const [signin, setsignin] = useState(false);


    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handlechangedataEmail =(text) =>{
      setEmail(text);
    }
   const handlechangedatapass =(text) =>{
      setpassuser(text);
    }

    useEffect(()=>{
        console.log(isLoading);
    },[isLoading])

    const auth = getAuth(app);


    
    const checkdoc = async () => {

      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          console.log('Firebase carregado. Usuário autenticado:', user);
          setsignin(true);
        } else {
          console.log('Firebase carregado. Nenhum usuário autenticado.');
          setsignin(false);
        }
      });

      setIsLoading(true);
      try {
        const auth = getAuth();
        const user = await signInWithEmailAndPassword(auth,email,passwuser);
        await new Promise((resolve) => {
          setTimeout(resolve,2000);
        });
        await auth.currentUser.reload();
        const userRef = doc(db,auth.currentUser.uid,'dados');
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()){
          //const nomeusuario = userSnap.data().nome;
          //const sobrenomeusuario = userSnap.data().sobrenome;
          navigation.navigate('Home');
          setIsLoading(false);
        }else{
          console.log('Documento do usuário não encontrado no Firestore.');
        }
      } catch (error) {
        switch (error.code) {

            case 'auth/email-already-in-use':
                setIsLoading(false);
                console.log('Erro email já cadastrado no sistema:', error);
                Alert.alert('Erro', 'O email já está cadastrado.');
                break;
            case 'auth/invalid-credential':
              setIsLoading(false);
              console.log('Erro email já cadastrado no sistema:', error);
              Alert.alert('Erro', 'Email ou password errado!');
            break;
            case 'auth/wrong-password':
                setIsLoading(false);
                console.log('Erro senha não é suficientemente forte:', error);
                Alert.alert('Erro', 'Senha ou email incorretos !');
                break;
            case 'auth/invalid-email':
                setIsLoading(false);
                console.log('Erro email não valido:', error);
                Alert.alert('Erro', 'Email invalido !');
                break;
            case 'auth/internal-error':
                setIsLoading(false);
                    console.log('Erro email não valido:', error);
                    Alert.alert('Erro', 'Senha ou Email não existe!');
            break;
            case 'auth/too-many-requests':
                setIsLoading(false);
                console.log('Erro execesso de tentativas:', error);
                Alert.alert('Muitas tentativas', 'Esta conta sera Temporariamente desativada por varias tentaivas!');
                break;
            case 'auth/missing-email':
              setIsLoading(false);
              Alert.alert('Erro', 'Introduza os dados !');
              break;
            default:
                setIsLoading(false);
                const errorMessage = error.message;
                Alert.alert('Erro', errorMessage);
                console.log('Erro desconhecido:', error);
                break;
        }
      }
    }


    


  return (

    <KeyboardAvoidingView 
    behavior={Platform.OS == "ios" ? "padding" : "height"}  style={{flex:1, backgroundColor:'#082854'}} >
       
      
       <View style={Stylemain.mainConteiner}>
       <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign style={{left:10,marginTop:60}} name="back" size={24} color="black" />
          </TouchableOpacity>
       
            <Image style= {Stylemain.logo} source={require('./../../../assets/logo.gif')}/>
        
       </View>
   
        <ScrollView style={Stylemain.secondConteiner}>
                  
            <View style={{backgroundColor:'#082854'}}>

                <TouchableOpacity style={Stylemain.btn2}>
                        <Text style={Stylemain.txt2}>Google</Text>
                        <Image style= {Stylemain.imag} source={require('./../../../assets/google.png')}/>
                </TouchableOpacity>
                                                   
                <Text style={Stylemain.textinput}>    E-mail: </Text>
                <TextInput style={Stylemain.input} placeholder="Exemplo@gmail.com"  onChangeText={handlechangedataEmail}/> 


                       
                <Text style={Stylemain.textinput}>    Password: </Text>
                <TextInput secureTextEntry={!showPassword}  style={stylemain.input}  onChangeText={handlechangedatapass}/> 
                
               <TouchableOpacity onPress={togglePasswordVisibility} style={Stylemain.eye}>
                    <FontAwesome5 name={showPassword ? 'eye' : 'eye-slash'} size={20} color="black" />
                </TouchableOpacity>

                <TouchableOpacity style={[Stylemain.btn,{top:30}]} onPress={checkdoc} >
                    <Text style={Stylemain.txt}>Iniciar Sessão</Text>
                    <FontAwesome5 name="location-arrow" size={20} color="white" style={Stylemain.seta} />
                </TouchableOpacity>

                
            </View>
        </ScrollView>
        {isLoading &&(
                        <View style={{position:'absolute',alignSelf:'center',top:750}}>
                            <ActivityIndicator size="large" color="#fff" />
                        
                                <Text style={{color:'#fff',fontWeight:'bold'}}> Verificando dados ...</Text>
                            
                        </View>
        )}
    </KeyboardAvoidingView>
  );
}