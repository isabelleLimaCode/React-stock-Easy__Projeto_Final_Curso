import React, { useEffect, useState } from 'react';
import { 
    Text, 
    View,
    Image,
    TouchableOpacity,
    FlatList,
    TextInput,
    Keyboard,
    Alert,
    ActivityIndicator
} from 'react-native';
import StyleCardObj from '../../../Styles/StyleCardObj';
import stylemain from '../../../Styles/Stylemain';
import StyleMetodo from '../../../Styles/StyleMetodo';
import StyleNewProduct from '../../../Styles/StyleNewProduct';
import { AntDesign,Feather,FontAwesome5} from '@expo/vector-icons';
import {db,app,auth} from '../../../Services/Firebaseconfig';
import { arrayUnion, setDoc, doc, getDoc,updateDoc, addDoc } from 'firebase/firestore';
import moment from 'moment';

export default function FinalizarVenda({navigation,route}) {
    const [isSelected, setSelection] = useState(true);
    const [isSelected2, setSelection2] = useState(true);
    const [isSelected1, setSelection1] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [tipoEntrega1,SettipoEntrega1] = useState(false);
    const [tipoEntrega2,SettipoEntrega2] = useState(false);

    const [isSelecte, setSelecti] = useState(false);
    const [isSelecte2, setSelectio] = useState(false);

    const {passadataProduto,setpassadataProduto} = route.params;
    const {passadataMetodo,setpassadataMetodo} = route.params;
    const {passadataCliente,setpassadataCliente} = route.params;
    const [numeroVendas,SetnumeroVendas] =useState();

    useEffect(()=>{
        console.log('----------------------------------')
        console.log('passadata produto',passadataProduto);
        console.log('passadata metodo',passadataMetodo);
        console.log('passadata cliente',passadataCliente);

        if (passadataMetodo[3] === "MB"){
            setSelecti(true);
        }else if (passadataMetodo[3] === 'EmMaos'){
            setSelectio(true);
        }

        if (passadataMetodo[2] === "ctt"){
            SettipoEntrega2(true);
        }else if (passadataMetodo[2] === 'EMMaos'){
            SettipoEntrega1(true);
        }
        
       
        countVendas();
    },[passadataMetodo])

    const countVendas = async () => {
        try {
          const user = auth.currentUser.uid;
          const vendasRef = doc(db, user, 'Vendas');
          const vendasDoc = await getDoc(vendasRef);
          
          if (vendasDoc.exists()) {
            const vendasData = vendasDoc.data();
            
            if (vendasData.Venda) {
              const numVendas = vendasData.Venda.length;
              const novaVenda = numVendas + 1 ;
              SetnumeroVendas(novaVenda);
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
    
    useEffect(()=>{
        const novaVenda = {
            codVenda :numeroVendas,
            nomeCliente: passadataCliente[0].nome,
            morada: passadataMetodo[0],
            tipodeEnvio: passadataMetodo[2],
            tipodePagamento: passadataMetodo[3],
            produtos:passadataProduto,
            telemovel:passadataMetodo[1],
            estadoVenda:'Encomenda registrada',
            datadaEncomenda:moment().format('DD-MM-YYYY'),
            hora:moment().format('HH:mm:ss'),
        };
        console.log('venda:',novaVenda);
    })

    const fetchdataVenda = async () => {
        const novaVenda = {
            codVenda :numeroVendas,
            nomeCliente: passadataCliente[0].nome,
            morada: passadataMetodo[0],
            tipodeEnvio: passadataMetodo[2],
            tipodePagamento: passadataMetodo[3],
            produtos:passadataProduto,
            telemovel:passadataMetodo[1],
            estadoVenda:'Encomenda registrada',
            datadaEncomenda:moment().format('DD-MM-YYYY'),
            hora:moment().format('HH:mm:ss'),
        };
        try {
            const user = auth.currentUser;
            const VendaRef = doc(db,user.uid,'Vendas');
            const VendaDoc = await getDoc(VendaRef);
            if(!VendaDoc.exists()){
                await setDoc(VendaRef, { Venda: [novaVenda] });
                console.log('Venda criada com sucesso:', novaVenda.nome);
                Alert.alert('Venda','Venda criada com sucesso');
            }else{
                await updateDoc(VendaRef, {
                    Venda: arrayUnion(novaVenda),
                });
            }
            
        } catch (error) {
            console.error('Erro','Erro ao adicionar produto:', error);
            Alert.alert('Error','Erro ao adicionar produto');
        }
    };
   
    

    const handleChange2 = ({event})  => {
        Alert.alert(
          'Confirmação',
          'Deseja realmente criar a venda ?',
          [
            {
                text: 'Sim ',
                onPress: async () => {
                    setIsLoading(true);
                    fetchdataVenda();
                    await new Promise((resolve) => {
                      setTimeout(resolve, 5000); 
                    });
                    navigation.navigate('ConcluirVenda');
                    setIsLoading(false);
                },
              },
            {
              text: 'Modo férias',
              text: 'Cancel',
             
            },
           
          ],
          { cancelable: false }
        );

      };
  return (
   <View style={{backgroundColor:'#fff',flex:1}}>
        
        <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign style={{left:10,top:10}} name="back" size={24} color="black" />
          </TouchableOpacity>
            <View>
                <Text style={StyleCardObj.text2}>Finalizar Venda</Text>
                <Text style={[stylemain.textinput,{color:'#000',fontWeight:'bold'}]}>       Morada: </Text>
                <TextInput style={[stylemain.input,{height:100}]} 
                    onPress={Keyboard.dismiss} 
                    multiline={true}
                    editable={false}
                    value={passadataMetodo[0]}
                />
            </View>

        <View style={{
            marginTop:30
        }}>
        <Text style={StyleMetodo.text}>Opção de entrega:</Text>
        {tipoEntrega1 == true ? (
            <View style={StyleMetodo.conteiner}>
            <Image
                style={{ width: 70, height: 60, resizeMode: "contain", alignSelf: 'center', top: 20, left: 30 }}
                source={{
                    uri: "https://cdn-icons-png.flaticon.com/512/5074/5074570.png",
                }}
            />
            <Text style={[StyleMetodo.text,{marginHorizontal:40,top:10}]}>Entrega em Mãos</Text>
            </View>
        ) : tipoEntrega2 == true ? (
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
            <TouchableOpacity style={{}}onPress={() => Setmodal2visibile(!Modal2visibile)}>
            </TouchableOpacity>
            </View>
        
        ):<Text style={[StyleMetodo.text,{marginHorizontal:40,top:10,color:'red'}]}>Não selecionou um tipo de entrega !</Text>} 
        <Text style={StyleMetodo.text}>Detalhes de Método de Pagamento:</Text>
       {isSelecte ? (
           <View style={StyleMetodo.conteiner}>
           <Image
               style={{ width: 70, height: 60, resizeMode: "contain", alignSelf: 'center', top: 20, left: 30 }}
               source={{
                   uri: "https://seeklogo.com/images/M/mbway-logo-2CD6980569-seeklogo.com.png",
               }}
           />
            </View>
        ) : isSelecte2 ? (
            <View style={StyleMetodo.conteiner}>
            <Image
                style={{ width: 70, height: 60, resizeMode: "contain", alignSelf: 'center', top: 20, left: 30 }}
                source={{
                    uri: "https://cdn-icons-png.flaticon.com/512/5074/5074570.png",
                }}
            />
             <Text style={[StyleMetodo.text,{marginHorizontal:40,top:10}]}>Pagamento em Mãos</Text>
            </View>
        ): null}
        </View>
        <TouchableOpacity style={{alignItems:'center',marginTop:100}} onPress={handleChange2}>
            <View style={[StyleCardObj.conteiner3,StyleNewProduct.buttonnew]}>
            <Text style={[StyleNewProduct.text2,{marginHorizontal:85,top:2}]}>Finalizar</Text>
            <AntDesign style={{top:-10, marginHorizontal:10,right:3,top:1,right:40}} name="arrowright" size={24} color="black" />
            </View>
        </TouchableOpacity> 
        {isLoading &&(
              <View style={{position:'absolute',alignSelf:'center',top:670}}>
                <ActivityIndicator size="large" color="#000" />
                <Text style={{}}>Registrando nova venda...</Text>
              </View>
        )}
   </View>
  );
}