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
    Pressable,
    StyleSheet,
    Button
} from 'react-native';
import StyleCardObj from '../../../Styles/StyleCardObj';
//import { BarCodeScanner } from 'expo-barcode-scanner';
import { Camera } from 'expo-camera';
import StyleNewProduct from '../../../Styles/StyleNewProduct';
import StyleCreateAccount from '../../../Styles/StyleCreateAccount';
import { Ionicons, FontAwesome5, MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import { db, auth } from '../../../Services/Firebaseconfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import * as ImagePicker from 'expo-image-picker';
import CardScan from '../Card/CardScan';

export default function ChangeProduct({ route, navigation }) {
    const { index } = route.params;
    const [Changenumber, setChangenumber] = useState(0);
    const [scanned, setScanned] = useState(false);
    const [codebar,setcodebar] = useState();
    const [ChangeCategory, setChangeCategory] = useState('Homem');
    const [Modal2visibile, setModal2visibile] = useState(false);
    const [Modal3visibile, setModal3visibile] = useState(false);
    const [Modal6visibile,Setmodal6visibile] = useState(false);
    const [nome, setNome] = useState(''); 
    const [codigoproduct, setCodigoProduct] = useState('');
    const [quantidade, setQuantidade] = useState(0);
    const [valorcompra, setValorCompra] = useState('');
    const [valorvenda, setValorVenda] = useState('');
    const [image, setImage] = useState(null);

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        setcodebar(data);
        alert(`Bar code with type ${type} and data ${data} has been scanned!`);
        <CardScan/>
    };
    const open = () =>{
        setModal3visibile(false);
        Setmodal6visibile(true);
    }

    useEffect(() => {
        const fetchProduto = async () => {
            try {
                const user = auth.currentUser;
                const produtosRef = doc(db, user.uid, 'produtos');
                const produtosDoc = await getDoc(produtosRef);

                if (produtosDoc.exists()) {
                    const produtosData = produtosDoc.data();
                    const produto = produtosData.produtos[index];
                    if (produto) {
                        setNome(produto.nome);
                        setcodebar(produto.codigodebarras);
                        setQuantidade(produto.quantidade);
                        setValorCompra(produto.valorcompra);
                        setValorVenda(produto.valorvenda);
                        setImage(produto.image);
                    } else {
                        console.log('Produto não encontrado');
                        Alert.alert('Erro', 'Produto não encontrado');
                    }
                } else {
                    console.log('Documento de produtos não encontrado');
                    Alert.alert('Erro', 'Documento de produtos não encontrado');
                }
            } catch (error) {
                console.error('Erro ao buscar produto:', error);
                Alert.alert('Erro', 'Erro ao buscar produto');
            }
        };
        fetchProduto();
    }, [index]);
    const handleSave = async () => {
        try {
            const user = auth.currentUser;
            const produtosRef = doc(db, user.uid, 'produtos');
            const produtosDoc = await getDoc(produtosRef);

            if (produtosDoc.exists()) {
                const produtosData = produtosDoc.data();
                const updatedProdutos = [...produtosData.produtos];
                updatedProdutos[index] = { 
                    ...updatedProdutos[index], 
                    nome, 
                    codigodebarras:codebar, 
                    quantidade, 
                    valorcompra, 
                    valorvenda, 
                    image 
                };

                await updateDoc(produtosRef, { produtos: updatedProdutos });
                Alert.alert('Sucesso', 'Produto atualizado com sucesso');
                navigation.goBack();
            } else {
                console.log('Documento de produtos não encontrado');
                Alert.alert('Erro', 'Documento de produtos não encontrado');
            }
        } catch (error) {
            console.error('Erro ao atualizar produto:', error);
            Alert.alert('Erro', 'Erro ao atualizar produto');
        }
    };

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
      
        console.log(result);
      
        if (!result.canceled) {
            setImage(result.assets[0].uri);
          }
      
        setModal2visibile(!Modal2visibile);
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
            if (result.assets && result.assets.length > 0) {
              const uri = result.assets[0].uri;
              setImage(uri);
              console.log(uri);
            } else {
              console.error('Erro ao obter o URI da imagem selecionada.');
            }
          }
          setModal2visibile(!Modal2visibile);
        } catch (error) {
          console.error('Erro ao selecionar imagem:', error);
        }
      };

    const behavior = Platform.OS === 'ios' ? 'padding' : 'height';

    return (
        <KeyboardAvoidingView behavior={behavior} style={{ flex: 1, backgroundColor: '#fff' }}>
            <ScrollView>
                <TouchableOpacity style={StyleCardObj.back} onPress={() => navigation.goBack()}>
                    <AntDesign style={{ left: 10 }} name="back" size={24} color="black" />
                </TouchableOpacity>
                <Text style={StyleCardObj.text2}>Editar Produto</Text>
                <View style={[StyleCardObj.conteiner3, { flexDirection: 'column' }]}>  
                    <Image style={{ height: 150, width: 150, alignSelf: 'center', borderRadius: 50 }} source={image ? { uri: image } : require('./../../../assets/not_photo.jpg')} />
                    <TouchableOpacity style={{ top: -20 }} onPress={() => setModal2visibile(!Modal2visibile)}>
                        <Ionicons name="add-circle-sharp" size={30} color="green" />    
                    </TouchableOpacity>
                </View>

                <View>
                    <View style={StyleCreateAccount.div}>
                        <View style={StyleCreateAccount.centeredView}>
                            <Modal
                                animationType="slide"
                                transparent={true}
                                visible={Modal2visibile}
                                onRequestClose={() => {
                                    Alert.alert('Modal has been closed.');
                                    setModal2visibile(!Modal2visibile);
                                }}>
                                <View style={StyleCreateAccount.centeredView}>
                                    <View style={StyleCreateAccount.modalView}>
                                        <Pressable
                                            style={StyleCreateAccount.conteinerbtn} 
                                            onPress={() => setModal2visibile(!Modal2visibile)}>
                                            <Text style={{ color: 'black' }}>Remover foto Atual</Text>
                                        </Pressable>
                                        <Pressable
                                            style={[StyleCreateAccount.conteinerbtn, { marginTop: 10 }]} 
                                            onPress={pickImageCamera}>
                                            <Text style={{ color: 'black' }}>Tirar foto</Text>
                                        </Pressable>
                                        <Pressable
                                            style={[StyleCreateAccount.conteinerbtn, { marginTop: 10 }]} 
                                            onPress={() => pickImage()}>
                                            <Text style={{ color: 'black' }}>Escolher na Bliblioteca</Text>
                                        </Pressable>
                                        <Pressable
                                            style={[StyleCreateAccount.conteinerbtn, { marginTop: 10 }]} 
                                            onPress={() => setModal2visibile(!Modal2visibile)}>
                                            <Text style={{ color: 'black' }}> Cancelar </Text>
                                        </Pressable>
                                    </View>
                                </View>
                            </Modal>
                        </View>
                    </View>
                </View>

                <Text style={StyleNewProduct.textinput}> Nome: </Text>
                <TextInput 
                    style={[StyleCardObj.input, { width: 'auto' }]} 
                    placeholder="Digite seu Nome" 
                    value={nome} 
                    onChangeText={setNome}
                />

                <Text style={StyleNewProduct.textinput}> Código de barras: </Text>
                <View style={StyleCardObj.conteiner3}>
                    <TextInput 
                        style={[StyleCardObj.input, { width: 'auto', right: 7 }]} 
                        placeholder="Digite o código barras ou utilize a camera" 
                        value={codebar}
                        onChangeText={setCodigoProduct}
                    />
                    <TouchableOpacity style={{ right: 10, top: -2 }} onPress={() => setModal3visibile(!Modal3visibile)}>
                        <MaterialCommunityIcons name="barcode-scan" size={28} color="black" />
                    </TouchableOpacity>
                </View>

                <Text style={StyleNewProduct.textinput}> Quantidade: </Text>
                <View style={StyleCardObj.conteiner3}>
                    <TextInput 
                        style={[StyleCardObj.input, { width: 200, right: 26, textAlign: 'center', backgroundColor: '#79ACE3' }]} 
                        value={quantidade.toString()}
                        onChangeText={(text) => setQuantidade(parseInt(text) || 0)}
                    />
                    <TouchableOpacity onPress={() => setQuantidade(quantidade + 1)}>
                        <Ionicons name="add-circle-sharp" size={24} color="green" />    
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setQuantidade(Math.max(0, quantidade - 1))}>
                        <Ionicons name="remove-circle" size={24} color="red" />
                    </TouchableOpacity>
                </View>

                <View>
                    <View style={StyleCardObj.conteiner3}>
                        <Text style={[StyleNewProduct.textinput, { right: 44 }]}> Valor de Compra: </Text>
                        <Text style={[StyleNewProduct.textinput, { right: 30 }]}> Valor de Venda:</Text>
                    </View>
                    <View style={StyleCardObj.conteiner3}>
                        <TextInput 
                            style={[StyleCardObj.input, {}]} 
                            placeholder="Digite seu Valor" 
                            value={valorcompra}
                            onChangeText={setValorCompra}
                        />
                        <TextInput 
                            style={[StyleCardObj.input, {}]} 
                            placeholder="Digite seu Valor" 
                            value={valorvenda}
                            onChangeText={setValorVenda}
                        />
                    </View>
                </View>
                <View>
                    <View style={StyleNewProduct.buttonsty}>
                        <View style={StyleNewProduct.conteiner}>
                            <Text style={StyleNewProduct.text2}>Categoria</Text>
                            <TextInput 
                                style={StyleNewProduct.text2}
                                value={ChangeCategory}
                                onChangeText={(text) => setChangeCategory(text)}
                                editable={false}
                            />
                            <TouchableOpacity>
                                <FontAwesome5 style={{ top: -10 }} name="caret-right" size={30} color="black" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <TouchableOpacity style={StyleNewProduct.buttonnew} onPress={handleSave}>
                    <Text style={[StyleNewProduct.text2, { marginHorizontal: 100 }]}>Editar Produto</Text>
                </TouchableOpacity>
            </ScrollView>
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
                                <Camera
                                    style={StyleSheet.absoluteFillObject}
                                    onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                                    barCodeScannerSettings={{
                                        barCodeTypes: ['qr', 'ean13', 'code128'], 
                                    }}
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
                                                        setModal3visibile(!Modal3visibile);
                                                    }}>
                                                    <View style={StyleCreateAccount.centeredView}>
                                                            <View style={StyleCreateAccount.modalView}>
                                                                <TouchableOpacity
                                                                        style={[StyleCreateAccount.conteinerbtn]} onPress={open}>
                                                                    <Text style={{color:'black'}}>Ler Código de Barras</Text>
                                                                </TouchableOpacity>
                                                                <TouchableOpacity
                                                                        style={[StyleCreateAccount.conteinerbtn,{marginTop:10}]} onPress={()=>setModal3visibile(!Modal3visibile)}>
                                                                    <Text style={{color:'black'}}> Cancelar </Text>
                                                                </TouchableOpacity>
                                                                
                                                            </View>
                                                    </View>
                                                </Modal>
                                            </View>
                                        </View>
                                </View>
                         {/*fim  Model codigo de barra */}
        
        </KeyboardAvoidingView>
        
    );
}
