import React, { useEffect, useState } from 'react';
import { DrawerContentScrollView,DrawerItemList } from '@react-navigation/drawer';
import { Ionicons, Feather} from '@expo/vector-icons';
import { CommonActions } from '@react-navigation/native';
import { 
    View,
    Text,
    Image,
    TouchableOpacity,
    ImageBackground,
    ActivityIndicator,
} from 'react-native';
import { signOut ,getAuth} from 'firebase/auth';
import { db ,auth} from '../../../Services/Firebaseconfig';
import { getDoc,doc ,onSnapshot} from 'firebase/firestore';

const Mainbar = props =>  {
    
//const behavior = Platform.OS === 'ios' ? 'padding' : 'height';
const [isLoading, setIsLoading] = useState(false);
const [nome, setnome] = useState(false);
const [sobrenome, setsobrenome] = useState(false);
const [photo,setphoto] = useState(null);
const [temTemImage,setTemImage] =useState(false)
const { navigation} = props;



useEffect(()=>{
    const auth = getAuth(); 
    const user = auth.currentUser;
    const userRef = doc(db, user.uid, 'dados');
    const unsubscribe = onSnapshot(userRef, (produtosDoc) => {
    const nomeuser = async () =>{
        try {
            if(auth.currentUser){
             const userid = auth.currentUser.uid;
             const userdocRef = doc(db,userid,'dados');
             const userdocSnap = await getDoc(userdocRef);
                if(userdocSnap.exists()){
                    const userdata = userdocSnap.data();
                    console.log(userdata);
                    setnome(userdata.nome);
                    setsobrenome(userdata.sobrenome);
                    setphoto(userdata.uirphoto);
                    console.log(photo);
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
    });
    return () => unsubscribe();
},[])

const handleResetNavigation = async () => {
    
    console.log('Usuário deslogado com sucesso.');
    setIsLoading(true);
    try {
        await signOut(auth)
        console.log('Usuário deslogado com sucesso.');
      } catch (error) {
        console.log('Erro ao fazer logout do usuário:', error);
      }
    setTimeout(() => {
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: 'Main' }]
            })
        );
    }, 3000);
};

  return (
    <View style ={{flex:1}}>
        <DrawerContentScrollView 
            {...props} 
            contentContainerStyle={{backgroundColor:'#000'}}>
                <ImageBackground  source={require('../../../assets/imag_back.jpg')} style={{padding:20}}>
                <Image  
                source={{ uri: photo }}
                style={{
                    height:80,
                    width:80,
                    borderRadius:40,
                    marginBottom:10,
                }}/>
                <View style={{
                    justifyContent:'space-between',
                    flexDirection:'row',
                    
                }}>
                    <View style={{flexDirection:'row'}}>
                    <Text style={{color:'#fff',fontSize:18}}>{nome}</Text>
                    <Text style={{color:'#fff',fontSize:18}}>{sobrenome}</Text>
                    </View>
                    
                    <TouchableOpacity onPress={() => navigation.navigate('AreaCliente')}>
                    <Feather style={{
                        marginHorizontal:10,
                        top:-4
                    }} name="edit" size={24} color="white" />
                    </TouchableOpacity>
                   
                </View>
                
                
              
                </ImageBackground>
                <View style={{flex:1,backgroundColor:'#fff'}}>
                <DrawerItemList {...props}/>
                </View>
                
            </DrawerContentScrollView>
            <View style={{padding:20,borderTopWidth:1,borderTopColor:'#ccc'}}>
                <TouchableOpacity style={{paddingVertical:15}} onPress={() => navigation.navigate('catalogo')}>
                <View  style={{flexDirection:'row',alignItems:'center'}}>
                <Ionicons name='share-social-outline' size={22}/>
                <Text style={{
                    fontSize:15,
                    marginLeft:5
                }}> Partilhe Seu Catálogo </Text>
                </View>
                </TouchableOpacity>

                <TouchableOpacity style={{paddingVertical:15}} onPress={handleResetNavigation}>
                <View  style={{flexDirection:'row',alignItems:'center'}}>
                <Ionicons name='exit-outline' size={22}/>
                <Text style={{
                    fontSize:15, 
                    marginLeft:5
                }}> Sair </Text>
                </View>
                </TouchableOpacity>

                
              
            </View>
            {isLoading &&(
              <View style={{position:'absolute',alignSelf:'center',top:520}}>
                <ActivityIndicator size="large" color="#000" />
                <Text style={{}}>Logout .....</Text>
              </View>
            )}
    </View>
  );
}

export default Mainbar;