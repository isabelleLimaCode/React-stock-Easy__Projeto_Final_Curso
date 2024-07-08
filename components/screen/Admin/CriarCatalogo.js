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
    Image
} from 'react-native';
import StyleCardObj from '../../../Styles/StyleCardObj';
import stylemain from '../../../Styles/Stylemain';
import { FontAwesome5 ,AntDesign} from '@expo/vector-icons';
import StyleCreateAccount from '../../../Styles/StyleCreateAccount';
import * as ImagePicker from 'expo-image-picker';
import { auth ,db} from '../../../Services/Firebaseconfig';
import { arrayUnion, setDoc, doc, getDoc,updateDoc,getDocs,collection} from 'firebase/firestore';
import { printToFileAsync } from "expo-print";
import * as Sharing from 'expo-sharing';
import moment from 'moment';
export default function CriarCatalogo({navigation}) {



  const behavior = Platform.OS === 'ios' ? 'padding' : 'height';
  const [Modal2visibile,Setmodal2visibile] = useState(false);
  const [image ,setImage] = useState();
  const [selectedAsset, setSelectedAsset] = useState({ uri: "" });
  const [catalogExists, setCatalogExists] = useState(false);

  //para criar catalogo
  const [produtos, setProdutos] = useState([]);
  const [empresa, setEmpresa] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

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

const deleteCatalog = async () => {
  try {
      const user = auth.currentUser;
      const catalogoRef = doc(db, 'catalogo', user.uid);
      const catalogoDoc = await getDoc(catalogoRef);

      if (catalogoDoc.exists()) {
          const catalogoData = catalogoDoc.data();
          const catalogo = catalogoData.catalogo || [];

          const catalogoExistente = catalogo.find(p => p.codigo === user.uid);

          if (catalogoExistente) {
             
              await updateDoc(catalogoRef, {
                  catalogo: catalogo.filter(p => p.codigo !== user.uid),
              });
              console.log('Catálogo excluído com sucesso');
              Alert.alert('Sucesso', 'Catálogo excluído com sucesso');
              setCatalogExists(false); 
          } else {
              console.log('Catálogo não encontrado na base de dados');
              Alert.alert('Erro', 'Catálogo não encontrado na base de dados');
          }
      } else {
          console.log('Documento de catálogo não encontrado');
          Alert.alert('Erro', 'Documento de catálogo não encontrado');
      }
  } catch (error) {
      console.error('Erro ao deletar catálogo:', error);
      Alert.alert('Erro', 'Erro ao deletar catálogo');
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
  useEffect(() => {
  const checkCatalogExists = async () => {
    try {
      const user = auth.currentUser;
      const catalogoRef = doc(db, 'catalogo', user.uid);
      const catalogoDoc = await getDoc(catalogoRef);
      
      if (catalogoDoc.exists()) {
        const catalogoData = catalogoDoc.data();
        const catalogo = catalogoData.catalogo || [];
  
        const catalogoExistente = catalogo.find(p => p.codigo === user.uid);
        
        if (catalogoExistente) {
          console.log('Catalogo já existe na base de dados');
          setCatalogExists(true);  
          Alert.alert('Verificação', 'Catalogo já existe na base de dados');
        } else {
          console.log('Catalogo não encontrado');
          setCatalogExists(false);  
          Alert.alert('Verificação', 'Catalogo não encontrado');
        }
      } else {
        console.log('Documento de catalogo não encontrado');
        setCatalogExists(false);  
        Alert.alert('Verificação', 'Documento de catalogo não encontrado');
      }
    } catch (error) {
      console.error('Erro', 'Erro ao verificar catalogo:', error);
      Alert.alert('Error', 'Erro ao verificar catalogo');
    }
  };
  checkCatalogExists();
  }, []);



  useEffect(() => {
    fetchProdutos();
    fetchEmpresa();
}, []);

const fetchProdutos = async () => {
    try {
        const user = auth.currentUser;
        const produtosRef = doc(db,user.uid,'produtos');
        const produtosDoc = await getDoc(produtosRef);
        if (produtosDoc.exists()) {
          const produtoData = produtosDoc.data();
          const produtosList= produtoData.produtos || [];
          setProdutos(produtosList);
          console.log('produtos:', produtosList);
      } else {
          console.log('Documento de produtos não encontrado');
          Alert.alert('Erro', 'Documento de produtos não encontrado');
      }
      
    } catch (error) {
        console.error('Erro ao buscar produtos:', error);
        Alert.alert('Erro', 'Erro ao buscar produtos');
    }
};

const fetchEmpresa = async () => {
    try {
        const user = auth.currentUser;
        const dadosRef = doc(db, user.uid, 'dados');
        const dadosDoc = await getDoc(dadosRef);
        if (dadosDoc.exists()) {
            const dadosData = dadosDoc.data();
            setEmpresa(dadosData.empresa);
        } else {
            console.log('Documento de dados não encontrado');
            Alert.alert('Erro', 'Documento de dados não encontrado');
        }
    } catch (error) {
        console.error('Erro ao buscar dados da empresa:', error);
        Alert.alert('Erro', 'Erro ao buscar dados da empresa');
    }
};

const generateCatalogPDF = async () => {
  const formatDate = (date) => {
      if (!date) {
          return 'Data inválida';
      }
      return moment(date).format('DD [de] MMMM [de] YYYY');
  };

  const getProdutosHtml = (produtos) => {
    return produtos.map(produto => {
        const valorVenda = parseFloat(produto.valorvenda || 0);
        const imageUrl = produto.image || 'default-image-url'; 
        return `
            <div class="product">
                <div class="image-container">
                    <img src="${imageUrl}" alt="${produto.nome}" />
                </div>
                <div class="details">
                    <h3>${produto.nome}</h3>
                    <p><strong>Categoria:</strong> ${produto.categoria}</p>
                    <p><strong>Quantidade:</strong> ${produto.quantidade}</p>
                    <p><strong>Preço:</strong> ${valorVenda.toFixed(2)} €</p>
                </div>
            </div>
        `;
    }).join('');
};


  const htmlContent = `
      <html>
      <head>
          <style>
              body {
                  font-family: 'Helvetica', Arial, sans-serif;
                  padding: 20px;
                  color: #333;
              }
              h1 {
                  text-align: center;
                  font-size: 36px;
                  margin-bottom: 20px;
                  color: #ff6347;
              }
              .header, .footer {
                  text-align: center;
                  margin-bottom: 30px;
              }
              .header img {
                  width: 150px;
                  height: auto;
                  border-radius: 10px;
                  margin-bottom: 10px;
              }
              .header h2 {
                  font-size: 18px;
                  color: #777;
              }
              .products {
                  display: grid;
                  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                  gap: 20px;
              }
              .product {
                  display: flex;
                  border: 1px solid #ddd;
                  border-radius: 10px;
                  overflow: hidden;
              }
              .image-container {
                  width: 50%;
                  position: relative;
                  overflow: hidden;
              }
              .image-container img {
                  width: 100%;
                  height: auto;
                  object-fit: cover;
                  border-radius: 10px 0 0 10px;
              }
              .details {
                  padding: 10px;
                  width: 50%;
                  background-color: #f9f9f9;
              }
              .product h3 {
                  font-size: 20px;
                  margin-bottom: 5px;
                  color: #333;
              }
              .product p {
                  font-size: 16px;
                  margin-bottom: 5px;
                  color: #666;
              }
              .product strong {
                  font-weight: bold;
              }
              .total {
                  font-weight: bold;
                  font-size: 20px;
                  text-align: center;
                  margin-top: 20px;
              }
          </style>
      </head>
      <body>
          <div class="header">
              <img src="https://firebasestorage.googleapis.com/v0/b/stock-easy-7eced.appspot.com/o/imgs%2FNavy%20Blue%20Minimalist%20Text%20Logo.png?alt=media&token=9a816e14-fdaf-4cfa-920c-54c4c9edd03d" alt="Logo" />
              <h1>Catálogo de Produtos</h1>
              <h2>${formatDate(new Date())}</h2>
          </div>
          <div class="products">
              ${getProdutosHtml(produtos)}
          </div>
          <div class="footer">
              <p>Obrigado por conferir nosso catálogo!</p>
          </div>
      </body>
      </html>
  `;

  try {
      const file = await printToFileAsync({ html: htmlContent, base64: false });
      return file.uri;
  } catch (error) {
      console.error('Erro ao gerar o PDF:', error);
      return null;
  }
};



const createCatalog = async () => {
    try {
        const pdfUri = await generateCatalogPDF();
        if (pdfUri) {
            await sharePDF(pdfUri);
            Alert.alert('Sucesso', 'Catálogo criado com sucesso!');
        } else {
            throw new Error('Erro ao gerar PDF');
        }
    } catch (error) {
        console.error('Erro ao criar catálogo:', error);
        Alert.alert('Erro', 'Erro ao criar catálogo');
    }
};


const sharePDF = async (uri) => {
    if (!(await Sharing.isAvailableAsync())) {
        Alert.alert('Erro', 'O compartilhamento não está disponível nesta plataforma');
        return;
    }
    await Sharing.shareAsync(uri);
};


const showAlertDelet = () =>
  Alert.alert(
    'Atualizar Conta',
    'Tem certeza que deseja eliminar tua empresa da lista de catálogo?',
    [
      {
        text: 'Não',
        onPress: () => Alert.alert('Operação cancelada com sucesso!'),
        style: 'cancel',
      },
      {
        text: 'Sim',
        onPress: () => {
          deleteCatalog();
          Alert.alert('Catálogo eliminado com sucesso!');
         },
        style: 'cancel',
      },
    
    ],
    {
      cancelable: true,
      onDismiss: () =>
        Alert.alert('operação cancelada por ter selecionado área externa'),
    },
  );



  return (
    <KeyboardAvoidingView behavior={behavior} style={{ flex: 1 , backgroundColor:'#fff'}}>

      <View>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign style={{left:10,top:10}} name="back" size={24} color="black" />
          </TouchableOpacity>

      </View>
      <ScrollView style={{marginTop:40}}>
      {catalogExists ? (
        <View>
          <Text style={[StyleCardObj.text2,{}]}>Catálogo</Text>
          <Image
                  style={{ 
                    width: 300, 
                    height: 310, 
                    resizeMode: "contain",
                    alignSelf:'center',
                    top:90 
                }}
                  source={{
                    uri: "https://firebasestorage.googleapis.com/v0/b/stock-easy-7eced.appspot.com/o/Files%20sent-rafiki.png?alt=media&token=59c0fd4d-96ce-4285-878c-85607fe384e8",
                  }}
        />
          <TouchableOpacity style={[stylemain.btn, { marginTop: 70 }]} onPress={createCatalog}>
              <Text style={stylemain.txt}>Partilhar Catálogo</Text>
              <FontAwesome5 name="location-arrow" size={20} color="white" style={stylemain.seta} />
            </TouchableOpacity>
            <TouchableOpacity style={[stylemain.btn, { marginTop: 10, backgroundColor:'#B22222' }]} onPress={showAlertDelet}>
              <Text style={stylemain.txt}>Eliminar Catálogo</Text>
              <FontAwesome5 name="location-arrow" size={20} color="white" style={stylemain.seta} />
            </TouchableOpacity>
        </View>
          
        ) : (
          <View>
            <Text style={[StyleCardObj.text2,{}]}>Criar Catálogo</Text>
            <Text style={[stylemain.textinput, { color: '#000' }]}>Logo da empresa:</Text>
            <TouchableOpacity style={[stylemain.input, {}]} onPress={() => Setmodal2visibile(!Modal2visibile)}>
              <Text>{selectimage}</Text>
            </TouchableOpacity>
            <Text style={[stylemain.textinput, { color: '#000' }]}>Nome da empresa:</Text>
            <TextInput
              style={[
                stylemain.input,
                {
                  width: 350,
                  height: 40,
                  backgroundColor: '#fff',
                  color: '#000',
                },
              ]}
              placeholder="Insira o nome da empresa"
              onPress={Keyboard.dismiss}
              onChangeText={handlechangenome}
            />
            <TouchableOpacity style={[stylemain.btn, { marginTop: 100 }]} onPress={fetchdataCatalogo}>
              <Text style={stylemain.txt}>Criar Catálogo</Text>
              <FontAwesome5 name="location-arrow" size={20} color="white" style={stylemain.seta} />
            </TouchableOpacity>
          </View>
        )}

     
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