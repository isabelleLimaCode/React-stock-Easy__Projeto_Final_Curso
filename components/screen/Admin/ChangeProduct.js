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
    Pressable
    
} from 'react-native';
import StyleCardObj from '../../../Styles/StyleCardObj';
import StyleNewProduct from '../../../Styles/StyleNewProduct';
import StyleCreateAccount from '../../../Styles/StyleCreateAccount';
import { Ionicons ,FontAwesome5, MaterialCommunityIcons,AntDesign} from '@expo/vector-icons';




export default function ChangeProduct({navigation}) {


    const [Changenumber, setChangenumber] = useState(0);
    const [ChangeCategory, setChangeCategory] = useState('Homem');
    const [Modal2visibile,Setmodal2visibile] = useState(false);
    const [Modal3visibile,Setmodal3visibile] = useState(false);

      //dados da coleção produto
      const [nome,setnome] = useState(); 
      const [codigoproduct,setcodigoproduc] = useState();
      const [quantidade, setquantidade] = useState();
      const [valorcompra, setvalorcompra] = useState();
      const [valorvenda,setvalorvenda] = useState();

    const handleIncrement = () => {
        if(Changenumber >0 || Changenumber == 0){
            setChangenumber(Changenumber + 1);
            setquantidade(Changenumber);
        }
       
    };

    const handleDecrement = () => {
        if ( Changenumber > 0){
            setChangenumber(Changenumber - 1);
            setquantidade(Changenumber);
        }
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
        setImage(false);
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
      
        console.log(result);
      
        if (!result.canceled) {
            setselectImage(result.assets[0].uri);
            console.log(selecImage);
          }
      
        Setmodal2visibile(!Modal2visibile);
        setImage(false);
      };


  const behavior = Platform.OS === 'ios' ? 'padding' : 'height';

  return (
    <KeyboardAvoidingView behavior={behavior} style={{ flex: 1 , backgroundColor:'#fff'}}>
      <ScrollView>
      <TouchableOpacity style={StyleCardObj.back} onPress={() => navigation.goBack()}>
            <AntDesign style={{left:10}} name="back" size={24} color="black" />
          </TouchableOpacity>

        <Text style={StyleCardObj.text2}>Editar Produto</Text>
        <View style={[StyleCardObj.conteiner3,{flexDirection:'column'}]}>  
            <Image style={{height:150,width:150, alignSelf:'center',borderRadius:50}} source={require('./../../../assets/not_photo.jpg')}/>
            <TouchableOpacity style={{top:-20}} onPress={()=> Setmodal3visibile(!Modal2visibile)}>
                <Ionicons name="add-circle-sharp" size={30} color="green" />    
            </TouchableOpacity>
        </View>

        
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
                                                        Setmodal2visibile(!Modal3visibile);
                                                    }}>
                                                    <View style={StyleCreateAccount.centeredView}>
                                                            <View style={StyleCreateAccount.modalView}>
                                                                <Pressable
                                                                        style={[StyleCreateAccount.conteinerbtn]} onPress={()=> Setmodal3visibile(!Modal3visibile)}>
                                                                    <Text style={{color:'black'}}>Ler Codigo de Barras</Text>
                                                                </Pressable>
                                                                <Pressable
                                                                        style={[StyleCreateAccount.conteinerbtn,{marginTop:10}]} onPress={()=>Setmodal3visibile(!Modal3visibile)}>
                                                                    <Text style={{color:'black'}}> Cancelar </Text>
                                                                </Pressable>
                                                                
                                                            </View>
                                                    </View>
                                                </Modal>
                                            </View>
                                        </View>
                                </View>
                         {/*fim  Model alterar conta de perfil */}

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

        <Text style={StyleNewProduct.textinput}> Nome: </Text>
        <TextInput style={[StyleCardObj.input, { width: 'auto' }]} placeholder="Digite seu Nome" onChangeText={handlechangedataname}/>

        <Text style={StyleNewProduct.textinput}> Código de barras: </Text>

        <View style={StyleCardObj.conteiner3}>
            <TextInput 
                    style={[StyleCardObj.input, { width: 'auto',right:7 }]} 
                    placeholder="Digite o código barras ou utilize a camera" 
                    onChangeText={handlechangedataname}

                    />
            <TouchableOpacity style={{right:10,top:-2}} onPress={()=> Setmodal3visibile(!Modal3visibile)}>
                    <MaterialCommunityIcons name="barcode-scan" size={28} color="black" />
            </TouchableOpacity>
        </View>
       


        <Text style={StyleNewProduct.textinput}> Quantidade: </Text>
        <View style={StyleCardObj.conteiner3}>

            <TextInput style={[StyleCardObj.input, { width: 200, right:26 ,textAlign:'center', backgroundColor:'#79ACE3'}]} 
            value={Changenumber.toString()}
            onChangeText={(text) => setChangenumber(parseInt(text) || 0)}
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
         
          <View style={StyleCardObj.conteiner3}>
            <TextInput style={[StyleCardObj.input, {}]} placeholder="Digite seu Valor" onChangeText={handlechangeValordeCompra}/>
            <TextInput style={[StyleCardObj.input, {}]} placeholder="Digite seu Valor" onChangeText={handlechangedvalordevenda} />
          </View>
        </View>
        <View>
            <View style={StyleNewProduct.buttonsty}>
                <View style={StyleNewProduct.conteiner}>
                    <Text style={StyleNewProduct.text2}>Categoria</Text>
                    <TextInput style={StyleNewProduct.text2}
                    value={ChangeCategory}
                    onChangeText={(text) => setChangeCategory(text)}
                    editable={false}
                    />
                    <TouchableOpacity>
                        <FontAwesome5 style={{top:-10}}name="caret-right" size={30} color="black" />
                    </TouchableOpacity>
                   
                </View>
            </View>
          </View>
  
                <TouchableOpacity style={StyleNewProduct.buttonnew}>
                <Text style={[StyleNewProduct.text2,{marginHorizontal:100}]}>Editar Produto</Text>
               
                </TouchableOpacity>
       
          
      </ScrollView>
    </KeyboardAvoidingView>
  );
}