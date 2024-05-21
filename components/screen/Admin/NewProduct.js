import React, { useEffect, useState } from 'react';
import { 
    Text, 
    View,
    Image,
    TouchableOpacity,
    TextInput,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    Alert,
    Modal,
    Button,
    StyleSheet,
    ActivityIndicator
    
} from 'react-native';
import StyleCardObj from '../../../Styles/StyleCardObj';
import StyleNewProduct from '../../../Styles/StyleNewProduct';
import StyleCreateAccount from '../../../Styles/StyleCreateAccount';
import { Ionicons ,FontAwesome5, MaterialCommunityIcons,AntDesign} from '@expo/vector-icons';
import {db,auth} from '../../../Services/Firebaseconfig';
import { arrayUnion, setDoc, doc, getDoc,updateDoc } from 'firebase/firestore';
import * as ImagePicker from 'expo-image-picker';
import { BarCodeScanner } from 'expo-barcode-scanner';
import CardScan from '../Card/CardScan';




export default function NewProduct({navigation,route}) {


    const [Changenumber, setChangenumber] = useState(0);
    const [ChangeCategory, setChangeCategory] = useState('Homem');
    const [Modal2visibile,Setmodal2visibile] = useState(false);
    const [Modal3visibile,Setmodal3visibile] = useState(false);
    const [Modal4visibile,Setmodal4visibile] = useState(false);
    const [Modal5visibile,Setmodal5visibile] = useState(false);
    const [Modal6visibile,Setmodal6visibile] = useState(false);

    const [locked,setLocked] = useState(true);

    //dados da coleção produto
    const [nome,setnome] = useState(); 
    const [codigoproduct,setcodigoproduc] = useState();
    const [quantidade, setquantidade] = useState('0');
    const [valorcompra, setvalorcompra] = useState();
    const [valorvenda,setvalorvenda] = useState();
    //empresa
    const [empresaOp,setEmpresaOp] = useState();

    //imagem
    const [selectimage , setselectImage] = useState();
    const [changeYesorNot,setChangeYesorNot] = useState(false);

    //scan
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [showCardScan, setShowCardScan] = useState(false);
    const [codebar,setcodebar] = useState();
    const [enableinputs,setenableinputs] =useState(false);
    const [aviso,setaviso] = useState(false);
    const [alertShown, setAlertShown] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange2 = ({event})  => {
        Alert.alert(
          'Confirmação',
          'Deseja realmente criar o produto ?',
          [
            {
                text: 'Sim ',
                onPress: async () => {
                    setIsLoading(true);
                    fetchdataProduto();
                    await new Promise((resolve) => {
                      setTimeout(resolve, 5000); 
                    });
                    navigation.navigate('RegistrarProduto');
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

    useEffect(() => {
        if (route.params && route.params.passadata && route.params.categoryYesOrNot !== undefined){
            setChangeCategory(route.params.passadata);
            setenableinputs(route.params.categoryYesOrNot);
            setaviso(false);

        } else {
            setChangeCategory('');
            setenableinputs(false);
            setaviso(false);
        }
        const getBarCodeScannerPermissions = async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
          };
          if (!ChangeCategory && !enableinputs && !alertShown) {
            Alert.alert('Atenção','Para preencher os dados precisa registrar a categoria primeiro');
            setAlertShown(true); 
        }
          getBarCodeScannerPermissions();
          console.log('produto', nome,codigoproduct,quantidade,valorcompra,valorvenda,ChangeCategory,selectimage);
    }, [route.params,ChangeCategory,enableinputs]);
    

    const openBarCodeScannerModal = () => {
        Setmodal3visibile(true); 
    };

    const open = () =>{
        Setmodal3visibile(false);
        Setmodal6visibile(true);
    }
      
    const handleIncrement = () => {
        if(Changenumber >0 || Changenumber == 0){
            setChangenumber(Changenumber + 1);
            setquantidade(Changenumber);
        }
       
    };
    const fetchdataProduto = async () => {
        const novoProduto = {
            nome: nome,
            codigodebarras: codebar,
            quantidade: quantidade,
            valorcompra: valorcompra,
            valorvenda: valorvenda,
            categoria: ChangeCategory,
            image:selectimage,
        };
        try {
            const user = auth.currentUser;
            const produtosRef = doc(db,user.uid,'produtos');
            const produtosDoc = await getDoc(produtosRef);
            
            if (produtosDoc.exists()) {
                const produtosData = produtosDoc.data();
                const produtos = produtosData.produtos || [];
  
                const produtoExistente = produtos.find(p => p.codigodebarras === novoProduto.codigodebarras);
                
                if (produtoExistente) {
                    console.log('Produto já existe na base de dados');
                    Alert.alert('Adiconar Produto','Produto já existe na base de dados');
                } else {

                    await updateDoc(produtosRef, {
                        produtos: arrayUnion(novoProduto),
                    });
                    console.log('Produto adicionado com sucesso:', novoProduto.nome);
                    Alert.alert('Produto','Produto adicionado com sucesso');
                }
            } else {
                await setDoc(produtosRef, { produtos: [novoProduto] });
                console.log('Documento de produtos criado com sucesso');
                Alert.alert('Sucesso', 'Documento de produtos criado com sucesso e produto adicionado');
            }
        } catch (error) {
            console.error('Erro','Erro ao adicionar produto:', error);
            Alert.alert('Error','Erro ao adicionar produto');
        }
    };
    
   

    const handleDecrement = () => {
        if ( Changenumber > 0){
            setChangenumber(Changenumber - 1);
            setquantidade(Changenumber);
        }
    };
    const handleClearAllInputs = () => {
        setnome(' ');
        setcodigoproduc(' ');
        setquantidade(' ');
        setvalorcompra(' ');
        setvalorvenda('');
    };

    const handlechangedataname =(text) =>{
        setnome(text);
    }
    const handlechangeCodigodeBarras =(text)=>{
            setcodigoproduc(text);
    }
    const handlechangeValordeCompra =(text) =>{
        setvalorcompra(text);
    }
    const handlechangedvalordevenda =(text) =>{
        setvalorvenda(text);
    }

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
              setChangeYesorNot(true);
            } else {
              console.error("Erro ao obter o URI da imagem selecionada.");
            }
          }
      
          Setmodal2visibile(!Modal2visibile);
        } catch (error) {
          console.error("Erro ao selecionar imagem:", error);
        }
      };

    const pickImageCamera = async () => {
        try {
            const { status } = await ImagePicker.requestCameraPermissionsAsync();
            if (status !== 'granted') {
            console.error('Permissão para acessar a câmera negada.');
            return;
            }

            const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            });

            if (!result.canceled) {
            if (result.uri) {
                setselectImage(result.uri);
                console.log(selectimage);
                setChangeYesorNot(true);
            } else {
                console.error('Erro ao obter o URI da imagem selecionada.');
            }
            }

            Setmodal2visibile(!Modal2visibile);
        } catch (error) {
            console.error('Erro ao selecionar imagem:', error);
        }
    };


      const changemodel = () => {
        Setmodal4visibile(!Modal4visibile);
        Setmodal5visibile(!Modal5visibile);
      }
      const empresa = () =>{
        Setmodal4visibile(!Modal4visibile);
        Setmodal5visibile(!Modal5visibile);
        setEmpresaOp(true);
      }
      

      const empresa2 = () =>{
        Setmodal4visibile(!Modal4visibile);
        Setmodal5visibile(!Modal5visibile);
        setEmpresaOp(false);
      }
    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        setShowCardScan(true);
        setcodebar(data);
        alert(`Bar code with type ${type} and data ${data} has been scanned!`);
        <CardScan/>
    };


  const behavior = Platform.OS === 'ios' ? 'padding' : 'height';

  return (
    <KeyboardAvoidingView behavior={behavior} style={{ flex: 1 ,backgroundColor:'#fff'}}>
    
      <ScrollView>
            
          <TouchableOpacity style={StyleCardObj.back} onPress={() => navigation.navigate('Home')}>
            <AntDesign style={{left:10}} name="back" size={24} color="black" />
          </TouchableOpacity>   

            <Text style={StyleCardObj.text2}>Novo Produto</Text>
            <View style={[StyleCardObj.conteiner3,{flexDirection:'column'}]}>  
                <Image style={{height:150,width:150, alignSelf:'center',borderRadius:50}} source={changeYesorNot ? { uri: selectimage } : require('./../../../assets/not_photo.jpg')}/>
                <TouchableOpacity style={{top:-20}} onPress={()=> Setmodal2visibile(!Modal2visibile)}>
                    <Ionicons name="add-circle-sharp" size={30} color="green" />    
                </TouchableOpacity>
            </View>
        {/* Model para scan*/}
        <Modal
            animationType="slide"
            transparent={true}
            visible={Modal6visibile}
            onRequestClose={() => {
                Alert.alert('Modal has been closed.');
                Setmodal6visibile(!Modal6visibile);
            }}>
                
                <View style={StyleCreateAccount.centeredView}>
                        <View style={[StyleCreateAccount.modalView,{
                                    backgroundColor:'#f4f3ee',
                                    borderRadius:50,
                                    width:356,
                                    height:400,
                                    top:-300
                        }]}>
                            <Text style={{color:'#000',alignSelf:'center',fontSize:18,fontWeight:'bold',top:10}}>Scan</Text>
                            <View style={{top:-20, width:200,height:200,top:20}}>
                                <BarCodeScanner
                                    onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                                    style={StyleSheet.absoluteFillObject}
                                />
                                <View style={{ top: 100 }}>
                                {scanned && (
                                    <View>
                                        <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />
                                    </View>
                                )}
                            </View>
                            <Text style={{
                                top:160,
                                marginTop:5,
                                fontWeight:'bold'
                            }}>Código de barras: {codebar}</Text>
                            <TouchableOpacity style={{
                                backgroundColor:'#3070B5',
                                width:300,
                                height:50,
                                borderRadius:10,
                                alignSelf:'center',
                                top:180
                            }} onPress={()=>Setmodal6visibile(!Modal6visibile)}>
                        <Text 
                            style={{
                                color:'white',
                                textAlign:'center',
                                marginTop:15,
                                marginBottom:15
                            }}> Submeter </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                                                                
            </Modal>
       {/* Fim Model para scan*/}
        
        {/* Model codigo de barra */}
        <View>
                                <View style = {StyleCreateAccount.div}>
                                        <View style={StyleCreateAccount.centeredView}>
                                                <Modal
                                                        animationType="slide"
                                                        transparent={true}
                                                        visible={Modal3visibile}
                                                        onRequestClose={() => {
                                                        Alert.alert('Modal has been closed.');
                                                        Setmodal3visibile(!Modal3visibile);
                                                    }}>
                                                    <View style={StyleCreateAccount.centeredView}>
                                                            <View style={StyleCreateAccount.modalView}>
                                                                <TouchableOpacity
                                                                        style={[StyleCreateAccount.conteinerbtn]} onPress={open}>
                                                                    <Text style={{color:'black'}}>Ler Código de Barras</Text>
                                                                </TouchableOpacity>
                                                                <TouchableOpacity
                                                                        style={[StyleCreateAccount.conteinerbtn,{marginTop:10}]} onPress={()=>Setmodal3visibile(!Modal3visibile)}>
                                                                    <Text style={{color:'black'}}> Cancelar </Text>
                                                                </TouchableOpacity>
                                                                
                                                            </View>
                                                    </View>
                                                </Modal>
                                            </View>
                                        </View>
                                </View>
                         {/*fim  Model codigo de barra */}

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
                                                                <TouchableOpacity
                                                                        style={[StyleCreateAccount.conteinerbtn]} onPress={()=>Setmodal2visibile(!Modal2visibile)}>
                                                                    <Text style={{color:'black'}}>Remover foto Atual</Text>
                                                                </TouchableOpacity>
                                                                <TouchableOpacity
                                                                        style={[StyleCreateAccount.conteinerbtn,{marginTop:10}]} onPress={pickImageCamera}>
                                                                    <Text style={{color:'black'}}>Tirar uma foto</Text>
                                                                </TouchableOpacity>
                                                                <TouchableOpacity
                                                                        style={[StyleCreateAccount.conteinerbtn,{marginTop:10}]} onPress={pickImage}>
                                                                    <Text style={{color:'black'}}>Escolher na Bliblioteca</Text>
                                                                </TouchableOpacity>
                                                                <TouchableOpacity
                                                                        style={[StyleCreateAccount.conteinerbtn,{marginTop:10}]} onPress={()=>Setmodal2visibile(!Modal2visibile)}>
                                                                    <Text style={{color:'black'}}> Cancelar </Text>
                                                                </TouchableOpacity>
                                                                
                                                            </View>
                                                    </View>
                                                </Modal>
                                            </View>
                                        </View>
                                </View>
                         {/*fim  Model alterar conta de perfil */}


    {/* Model para publicar produto*/}
        <View>
            <View style = {StyleCreateAccount.div}>
                <View style={StyleCreateAccount.centeredView2}>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={Modal4visibile}
                        onRequestClose={() => {
                            Alert.alert('Modal has been closed.');
                            Setmodal4visibile(!Modal4visibile);
                        }}>
                        <View style={StyleCreateAccount.centeredView2}>
                            <View style={StyleCreateAccount.modalView2}>
                                <Text style={{
                                    fontWeight:'bold',
                                    fontSize:20,
                                }}
                                >
                                Publicar Produto 
                                </Text>
                                <Text style ={{
                                    textAlign:'center',
                                    marginTop:25,
                                    marginBottom:10,
                                    fontWeight:'bold',

                                }}>
                                Deseja publicar esse produto em outra plataforma de venda, 
                                melhorando assim o seu negócio? Selecione o site da sua escolha.
                                </Text>
                                <View style={{
                                    flexDirection:'row'
                                }}>
                                <TouchableOpacity
                                    style={[StyleCreateAccount.conteinerbtn,{
                                        marginTop:10, 
                                        width:166,
                                        height:51,
                                        }]} onPress={empresa}>
                                    <Text style={{color:'black'}}> Amazon </Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[StyleCreateAccount.conteinerbtn,{
                                        marginTop:10,
                                        width:166,
                                        height:51,
                                        marginHorizontal:10
                                        }]} onPress={empresa2}>
                                    <Text style={{color:'black'}}> Fnac </Text>
                                </TouchableOpacity>
                                </View>

                                <TouchableOpacity
                                    style={[StyleCreateAccount.conteinerbtn,{
                                        marginTop:10,
                                        width:340,
                                        height:51,
                                        alignSelf:'center',
                                        right:5
                                        }]} onPress={()=>Setmodal4visibile(!Modal4visibile)}>
                                    <Text style={{color:'red'}}> Cancelar </Text>
                                </TouchableOpacity>
                                
                                                                
                            </View>
                        </View>
                    </Modal>
                </View>
            </View>
        </View>
        {/*fim Model para publicar produto */}

        {/* Model termos e condições*/}
        <View>
            <View style = {StyleCreateAccount.div}>
                <View style={StyleCreateAccount.centeredView2}>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={Modal5visibile}
                        onRequestClose={() => {
                            Alert.alert('Modal has been closed.');
                            Setmodal5visibile(!Modal5visibile);
                        }}>
                        <View style={StyleCreateAccount.centeredView2}>
                            <View style={StyleCreateAccount.modalView2}>
                                <Text style={{
                                    fontWeight:'bold',
                                    fontSize:20,
                                }}
                                >
                                Termos e Condições  
                                </Text>
                                <Text style ={{
                                    textAlign:'center',
                                    marginTop:25,
                                    marginBottom:10,
                                    fontWeight:'bold',

                                }}>
                                Visualize e aceite o termo de condições para publicarmos a teu produto!
                                </Text>
                                
                                {empresaOp == true ? (
                                    <TouchableOpacity
                                    style={[StyleCreateAccount.conteinerbtn,{
                                        marginTop:10,
                                        width:346,
                                        height:51,
                                        marginHorizontal:10
                                        }]} onPress={changemodel}>
                                    <Text style={{color:'black'}}> Amazon </Text>
                                </TouchableOpacity>
                                ):
                                <TouchableOpacity
                                style={[StyleCreateAccount.conteinerbtn,{
                                    marginTop:10,
                                    width:346,
                                    height:51,
                                    marginHorizontal:10
                                    }]} onPress={changemodel}>
                                <Text style={{color:'black'}}> Fnac </Text>
                            </TouchableOpacity>
                                }
                                

                                <TouchableOpacity
                                    style={[StyleCreateAccount.conteinerbtn,{
                                        marginTop:10,
                                        width:346,
                                        height:51,
                                        marginHorizontal:10
                                        }]} onPress={changemodel}>
                                    <Text style={{color:'red'}}> Cancelar </Text>
                                </TouchableOpacity>
                                      
                            </View>
                        </View>
                    </Modal>
                </View>
            </View>
        </View>
        {/*fim Model termos e condições */}
        
            <Text style={StyleNewProduct.textinput}> Nome: </Text>
            <TextInput style={[StyleCardObj.input, { width: 'auto' }]} placeholder="Digite seu Nome" onChangeText={handlechangedataname} editable={enableinputs}/>

            <Text style={StyleNewProduct.textinput}> Código de barras: </Text>

            <View style={StyleCardObj.conteiner3}>
                <TextInput 
                        style={[StyleCardObj.input, { width:315,right:7 }]} 
                        placeholder="Digite o código barras ou utilize a camera" 
                        onChangeText={handlechangeCodigodeBarras}
                        editable={enableinputs}
                        value={codebar}

                />
                <TouchableOpacity style={{right:10,top:-2}} onPress={openBarCodeScannerModal}>
                        <MaterialCommunityIcons name="barcode-scan" size={28} color="black" />
                </TouchableOpacity>
            </View>
        
       


        <Text style={StyleNewProduct.textinput}> Quantidade: </Text>
        <View style={StyleCardObj.conteiner3}>

            <TextInput style={[StyleCardObj.input, { width: 200, right:26 ,textAlign:'center', backgroundColor:'#79ACE3'}]} 
            value={Changenumber.toString()}
            onChangeText={(text) => setChangenumber(parseInt(text) || 0)}
            editable={enableinputs}
            />
            <TouchableOpacity onPress={handleIncrement}>
                <Ionicons name="add-circle-sharp" size={24} color="green" />    
            </TouchableOpacity>
            <TouchableOpacity onPress={handleDecrement}>
                <Ionicons name="remove-circle" size={24} color="red" />
            </TouchableOpacity>
            
        </View>

        <View>
          <View style={StyleCardObj.conteiner3}>
            <Text style={[StyleNewProduct.textinput, { right: 44 }]}> Valor de Compra: </Text>
            <Text style={[StyleNewProduct, { right: 30 }]}> Valor de Venda:</Text>
          </View>
         
          <View style={[StyleCardObj.conteiner3,{}]}>
            <TextInput style={[StyleCardObj.input, {}]} placeholder="Digite seu Valor" onChangeText={handlechangeValordeCompra} editable={enableinputs}/>
            <TextInput style={[StyleCardObj.input, {}]} placeholder="Digite seu Valor" onChangeText={handlechangedvalordevenda} editable={enableinputs}/>
          </View>
        </View>
        <View>
            <View style={StyleNewProduct.buttonsty}>
                <View style={StyleNewProduct.conteiner}>
                    <Text style={StyleNewProduct.text2}>Categoria</Text>
                    <TextInput style={StyleNewProduct.text2}
                    value={ChangeCategory}
                    onChangeText={(text) => setChangeCategory(text)}
                    />
                    <TouchableOpacity onPress={() => navigation.navigate('caterogia')}>
                        <FontAwesome5 style={{top:-10}}name="caret-right" size={30} color="black" />
                    </TouchableOpacity>
                   
                </View>
            </View>
          </View>
  
                <TouchableOpacity style={StyleNewProduct.buttonnew}  onPress={handleChange2}>
                <Text style={[StyleNewProduct.text2,{marginHorizontal:100}]}>Criar Produto</Text>
               
                </TouchableOpacity>
       
       
      </ScrollView>
      {isLoading &&(
              <View style={{position:'absolute',alignSelf:'center',top:340}}>
                <ActivityIndicator size="large" color="#000" />
                <Text style={{}}>Registrando novo Produto...</Text>
              </View>
        )}
    </KeyboardAvoidingView>
    
  );
}
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height:400,
    marginHorizontal:10,
    marginTop:20,
    backgroundColor:'#fff',
  },
  barcodeData: {
    marginTop: 20,
  },
});

