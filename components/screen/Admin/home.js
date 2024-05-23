import React, { useEffect, useState } from 'react';
import { 
    Text, 
    View,
    Image,
    FlatList,
} from 'react-native';
import StyleHome from '../../../Styles/StyleHome';
import { Ionicons ,FontAwesome,Feather,Fontisto,MaterialCommunityIcons} from '@expo/vector-icons';
import CardProduto from '../Card/CardProduto';
import { getAuth,onAuthStateChanged} from 'firebase/auth';
import { db } from '../../../Services/Firebaseconfig';
import { getDoc,doc,onSnapshot} from 'firebase/firestore';
export default function Home({navigation}) {

  const [nome, setnome] = useState();
  const [sobrenome, setsobrenome] = useState();
  const [empresa,setempresa] = useState();
  const [image,setimage] = useState();
  const [numeroClientes,SetnumeroClientes] =useState();
  const [numeroVendas,SetnumeroVendas] =useState();
  const [data1,setdata1] = useState();
  const[foraStock,setforaStock] = useState();
  const auth = getAuth(); 

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
        console.log('Nenhum usuário logado.');
      }
    });

    return unsubscribe; 
  }, [auth]);

  useEffect(()=>{

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
    countClientes();
    countVendas();
},[nome, sobrenome,empresa,image])

const countClientes = async () =>{
    try {
        
         const user = auth.currentUser.uid;
         const clientesRef = doc(db,user,'clientes');
         const clientesDoc = await getDoc(clientesRef);
         
         if (clientesDoc.exists()){

          const clienteData = clientesDoc.data();
          const numClientes = clienteData.clientes.length;
          SetnumeroClientes(numClientes);

         }else{
          console.log('Documento de clientes não encontrado');
         }
         
    } catch (error) {
        console.log('Erro ao puxar quantidade de clientes:', error);
    }
}

const countVendas = async () => {
  try {
    const user = auth.currentUser.uid;
    const vendasRef = doc(db, user, 'Vendas');
    const vendasDoc = await getDoc(vendasRef);
    
    if (vendasDoc.exists()) {
      const vendasData = vendasDoc.data();
      
      if (vendasData.Venda) {
        const numVendas = vendasData.Venda.length;
        SetnumeroVendas(numVendas);
        console.log(numeroVendas);
      } else {
        console.log('O array de vendas está vazio');
      }
    } else {
      console.log('Documento de vendas não encontrado');
    }
  } catch (error) {
    console.log('Erro ao puxar quantidade de vendas:', error);
  }
}

useEffect(() => {
  const user = auth.currentUser;
  const produtosRef = doc(db, user.uid, 'produtos');

  const unsubscribe = onSnapshot(produtosRef, (produtosDoc) => {
      try {
          if (produtosDoc.exists()) {
              const produtosData = produtosDoc.data();
              const produtos = produtosData.produtos || [];

              const produtoExistente = produtos.filter(p => Number(p.quantidade) === 0);
              console.log('produtos fora de stock', produtoExistente);
              setdata1(produtoExistente);
              console.log('data1', produtoExistente);
              if (produtoExistente.length > 0) {
                  setforaStock(false);
              } else {
                  setforaStock(true);
              }
          } else {
              console.log('Documento de produtos não encontrado');
              Alert.alert('Erro', 'Documento de produtos não encontrado');
          }
      } catch (error) {
          console.error('Erro ao buscar produtos:', error);
          Alert.alert('Erro', 'Erro ao buscar produtos');
      }
  });
  return () => unsubscribe();
}, []);
  return (
    <View style={{backgroundColor:'#FFF', flex:1}}>
    
      <View style= {StyleHome.Conteiner}>
          <Image
            style={StyleHome.Picture}
            source={{
              uri: image,
            }}
          />
          <View style={{flexDirection:'column'}}>
          <Text style={StyleHome.text}>Olá {nome}{sobrenome}</Text>
          <Text style={StyleHome.text2}>Empresa: {empresa}</Text>
          </View>
          <Ionicons style={StyleHome.icon} name="notifications-sharp" size={24} color="gray" />
      </View>

      <View style={StyleHome.Marckplace}>
          <View style={StyleHome.div}>
          <View style={StyleHome.linha}>
          
          <FontAwesome style={[StyleHome.div2,{left:15}]} name="user-o" size={24} color="black" />
            <Text style={[StyleHome.icon2,{left:15}]}>{numeroClientes}</Text>
            <MaterialCommunityIcons style={[StyleHome.div2,{left:130}]} name="file-document" size={24} color="black" />
            <Text style={[StyleHome.icon2,{left:125}]}>100</Text>
            </View>
          </View>

          <View style={{flexDirection:'row'}}>
            <Text style={[StyleHome.div3,{left:20}]}>Clientes</Text>
            <Text style={[StyleHome.div3,{left:20}]}>Faturas</Text>
          </View>

          <View style={StyleHome.div}>
            <View style={StyleHome.linha}>
              <Feather style={[StyleHome.div2,{left:15}]} name="shopping-bag" size={24} color="black" />
              <Text style={[StyleHome.icon2,{left:15}]}>{numeroVendas}</Text>
              <Fontisto  style={[StyleHome.div2,{left:100}]} name="shopping-store" size={24} color="black" />
              <Text style={[StyleHome.icon2,{left:100}]}>100</Text>
            </View>
          </View>

          <View style={{flexDirection:'row'}}>
            <Text style={[StyleHome.div3,{left:10}]}>Vendas</Text>
            <Text style={[StyleHome.div3,{left:20}]}>Marcketplace</Text>
          </View>
      </View>

    
          <Text style={{
            fontWeight:'bold',
            left:25,
            fontSize:16
          }}>Produtos fora do stock:</Text>
        {foraStock ==  false ?(
         <FlatList
              data={data1}
              keyExtractor={(item)=> item.id}
              renderItem={({item}) =>(
                <CardProduto 
                  valor={item.valorcompra}
                  nome={item.nome}
                  quant={item.quantidade}
                  image={item.image}
                  changeColor={'red'}
                  changeshadowColor={'red'}
                  productId={item}
                />
                )}
           /> 
              ):(
                <View>
                <Image
                            style={{ width: 220, height: 220, resizeMode: "contain",alignSelf:'center',marginTop:10}}
                            source={{
                                uri: "https://firebasestorage.googleapis.com/v0/b/stock-easy-7eced.appspot.com/o/imgs%2Fpersonal%20goals%20checklist-amico.png?alt=media&token=14ca1cfc-f6e2-4ff8-9512-274ab93877e8",
                            }}
                    />
                <Text style={{
                  left:25,
                  fontSize:18,
                  fontWeight:'bold',
                  color:'green',
                  textAlign:'center',
                  marginRight:40
                }}>Nenhum produto fora de stock!</Text>
                </View>
              )}
     
        
        
    </View>
  );
}