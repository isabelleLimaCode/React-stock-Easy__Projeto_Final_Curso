import React, { useEffect, useState , useCallback} from 'react';
import { 
    View,
    Text,
    TouchableOpacity,
    KeyboardAvoidingView,
    Modal,
    TextInput,
    Keyboard,
    Alert,
    Platform
} from 'react-native';
import StyleCardObj from '../../../Styles/StyleCardObj';
import { AntDesign ,Entypo} from '@expo/vector-icons';
import StyleNewProduct from '../../../Styles/StyleNewProduct';
import stylemain from '../../../Styles/Stylemain';
import StyleCreateAccount from '../../../Styles/StyleCreateAccount';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import CardProduto2 from '../Card/CardProduto2';

export default function CheckCarrinho({navigation,route}) {

    const behavior = Platform.OS === 'ios' ? 'padding' : 'height';
    const [searchPhrase, setSearchPhrasse] = useState("");
    const [clicked, setClicked] = useState(false);
    const [Modalvisibile,Setmodalvisibile] = useState(false);
    const [passadata3,setpassadata3] = useState(route.params?.passadata3);
    const [passadata4,setpassadata4] = useState(route.params?.passadata4);
    const [valortotal, setValorTotal] = useState(route.params?.valortotalAlterar);
    const [valortotalAlterar, setValorTotalAlterar] = useState();
    
    const [codigo,setcodigo] = useState(); 

    const { passadata} = route.params;
    const { passadata2} = route.params;
    const {valorPagar} = route.params;
    const [cupoeslist, setCupoesList] = useState([]);
    const [valorEntrega, setvalorEntrega] = useState(5);
    const formattedValorEntrega = valorEntrega.toFixed(2);

    
    const fetchCupões = useCallback(() => {
      const user = auth.currentUser;
      if (!user) {
          Alert.alert('Erro', 'Usuário não autenticado');
          return;
      }
      const cupoesRef = doc(db, user.uid, 'cupões');

      const unsubscribe = onSnapshot(cupoesRef, (docSnapshot) => {
          if (docSnapshot.exists()) {
              const cupoesData = docSnapshot.data();
              const cupõesList = cupoesData.cupões || [];

              setCupoesList(cupõesList);
              setFilteredData(clientesList);
              setdonthave(clientesList.length === 0);
          } else {
              console.log('Documento de clientes não encontrado');
              Alert.alert('Erro', 'Documento de clientes não encontrado');
              setdonthave(true);
          }
      }, (error) => {
          console.error('Erro ao buscar clientes:', error);
          Alert.alert('Erro', 'Erro ao buscar clientes');
      });

      return unsubscribe; 
  }, []);
  
    const renderItem2 = ({ item }) => {
      return (
        <CardProduto2 
          nome={item.nome}
          valor={item.valorcompra}
          quant={item.quantidade}
          imagem={item.image}
          onpress1={() => additem2(item)}
          onpress2={()=> removeItem2(item.key)}
        />
      );
    };

    const calcularValor = () => {
      const valorTotal = passadata2.reduce((total, produto) => {
        return total + parseFloat(produto.valorcompra) + parseFloat(valorEntrega);
      }, 0);
      return valorTotal;
    };
    
    
    useState(() => {
      let newData = [];
      console.log('newdata1',passadata);
      console.log('newdata2',passadata2);
      setValorTotalAlterar(calcularValor().toFixed(2));
  }, [passadata2]);

   

    const handlechangedatacodigo =(text) =>{
      setcodigo(text);
    }
    const handlecodigoaceito =() =>{
      Alert.alert(
        'Código de desconto',
        'Codigo inserido com sucesso',
        [
          {
              text: 'ok ',
              onPress: () => {
                Setmodalvisibile(!Modalvisibile);
            }
        
          },
          
         
        ],
        { cancelable: false }
      );
    }
  return (
    <KeyboardAvoidingView behavior={behavior} style={{ flex: 1 , backgroundColor:'#fff'}}>
    
     <View>
        <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign style={{left:10,top:20}} name="back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={[StyleCardObj.text2,{}]}>Carrinho</Text>

         {passadata2 && (
          <View>
            <FlatList
                data={passadata2}
                keyExtractor={(item) => item.id}
                renderItem={renderItem2}
            />
          </View>
        )}
     </View>
     <TouchableOpacity onPress={()=> Setmodalvisibile(!Modalvisibile)}>
        <Text style={{
          alignSelf:'center',
          color:'#000',
          fontWeight:'bold',
          marginBottom:10,
          marginTop:10
          }}>Tens um código de desconto?</Text>
          <Text style={{alignSelf:'center',color:'#3a89ff',fontSize:17}}>Código: {codigo}</Text>
     </TouchableOpacity>
    
    <View style={{borderTopWidth:2,borderColor:'#3a89ff'}}>

        <View style = {{
          justifyContent:'space-between',
          flexDirection:'row'
        }}>
              <Text style={StyleCardObj.textn}>Entrega:</Text>
              <Text style={StyleCardObj.textn}>{valorEntrega}€</Text>
        </View>
        <View style = {{
          justifyContent:'space-between',
          flexDirection:'row'
        }}>
              <Text style={StyleCardObj.textn}>Desconto:</Text>
              <Text style={StyleCardObj.textn}>{valorEntrega}€</Text>
        </View>

        <View style = {{
          justifyContent:'space-between',
          flexDirection:'row'
        }}>
              <Text style={StyleCardObj.subtotal}>Subtotal:</Text>
              <Text style={StyleCardObj.subtotal}>{valortotalAlterar}€</Text>
        </View>
      
    </View>
     

     <TouchableOpacity style={{alignItems:'center'}} onPress={() => navigation.navigate('MetodoPagamento', {passadata3:passadata, passadata4:passadata2,valortotal:valortotalAlterar})}>
            <View style={[StyleCardObj.conteiner3,StyleNewProduct.buttonnew]}>
            <Text style={[StyleNewProduct.text2,{marginHorizontal:85,top:2}]}>Próximo</Text>
            <AntDesign style={{top:-10, marginHorizontal:10,right:3,top:1,right:40}} name="arrowright" size={24} color="black" />
            </View>
    </TouchableOpacity>

         {/* Model alterar cupão */}
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
                                                                <Text style={{color:'#000',alignSelf:'center',fontSize:18,fontWeight:'bold'}}>Código de desconto</Text>
                                                                <TextInput 
                                                                style={[
                                                                  stylemain.input,
                                                                  {width:327,height:40, 
                                                                  backgroundColor:'#000',
                                                                  color:'#fff'
                                                                  }]} placeholder="Insira o código de desconto" 
                                                                  onPress={Keyboard.dismiss}
                                                                  onChangeText={handlechangedatacodigo}
                                                                  /> 
                                                                </View>

                                                                <TouchableOpacity 
                                                                        style={[StyleCreateAccount.conteinerbtn,{top:8}]} onPress={handlecodigoaceito}>
                                                                    <Text style={{color:'#000000',fontWeight:'bold'}}> inserir Código </Text>
                                                                </TouchableOpacity>

                                                                <TouchableOpacity
                                                                        style={[StyleCreateAccount.conteinerbtn,{top:8}]} onPress={()=>Setmodalvisibile(!Modalvisibile)}>
                                                                    <Text style={{color:'#000000',fontWeight:'bold'}}> Cancelar </Text>
                                                                </TouchableOpacity>
                                                                
                                                            </View>
                                                    </View>
                                                </Modal>
                                            </View>
                                        </View>
                                </View>
                         {/*fim  Model alterar cupão */}
    
  </KeyboardAvoidingView>
  
  );
}