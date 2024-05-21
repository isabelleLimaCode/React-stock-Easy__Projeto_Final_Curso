import React, { useEffect, useState } from 'react';
import { 
    Dimensions, 
    View,
    Text,
    Image,
    TouchableOpacity,
    KeyboardAvoidingView,
    ScrollView,
    SafeAreaView,
    FlatList,
    Modal,
    Platform
} from 'react-native';
import StyleCardObj from '../../../Styles/StyleCardObj';
import SearchBar from '../SearchBar/SearchBar';
import CardPreparar from '../Card/CardPreparar';
import {AntDesign} from '@expo/vector-icons';
import StyleCreateAccount from '../../../Styles/StyleCreateAccount';
export default function PrepararEncomenda({navigation,route}) {

    const behavior = Platform.OS === 'ios' ? 'padding' : 'height';
    const [searchPhrase, setSearchPhrasse] = useState("");
    const [clicked, setClicked] = useState(false);
    const [Modal4visibile,Setmodal4visibile] = useState(true);
    const [Modal5visibile,Setmodal5visibile] = useState(false);

    const data =[
        {key: '1', value:'Avenno',uri:require('./../../../assets/produto.png'), isChecked:'false'},
        {key: '2', value:'ruby tratamento' , uri:require('./../../../assets/produto.png'), isChecked:''},
        {key: '3', value:'Avenno 2' , uri:require('./../../../assets/produto.png'), isChecked:''}
    ]

    const {DadosEncomenda2} = route.params;

  const [checkdata, setcheckdata] = useState([]);
  
  const checkproduto = () => {
      if (checkdata.length >= 3  && checkdata[2].isChecked ) {
        navigation.navigate('FinalizarEncomenda');
      } else{
       Setmodal5visibile(!Modal5visibile);
      }
    
  };
  
useEffect(()=>{
    console.log(DadosEncomenda2);
},[checkdata]);
  

  const handleCheckChange = (key, isChecked) => {
     
     
   const updatedData = data.map(item => {
      if (item.key === key) {
        item.isChecked = isChecked;
      }
      return item;
    });
    setcheckdata(updatedData);
  }
  
  return (
    <KeyboardAvoidingView behavior={behavior} style={{ flex: 1 , backgroundColor:'#fff'}}>
     <View>
     <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign style={{left:10}} name="back" size={24} color="black" />
      </TouchableOpacity>

        <Text style={StyleCardObj.text2}>Preparar Encomenda</Text>
     </View>
     <SafeAreaView style={StyleCardObj.root}>
                
                <SearchBar
                    searchPhrase={searchPhrase}
                    setSearchPhrase={setSearchPhrasse}
                    clicked={clicked}
                    setClicked={setClicked} />
            </SafeAreaView>
            <Text style={{
              textAlign:'center',
              fontWeight:'bold',
              marginBottom:20,
              marginTop:20
            }}>Valide todos os produtos usando o código de barras, para um melhor controlo de stock!</Text>
             <FlatList
                data={DadosEncomenda2}
                keyExtractor={(item)=> item.id}
                renderItem={({item}) =>(
                <CardPreparar 
                    nome={item.nome}
                    uri={item.image} 
                    DadosEncomenda2={DadosEncomenda2}
                    onCheckChange={(isChecked) => handleCheckChange(item.id, isChecked)}
                /> 
                       
                )}
            />
    <TouchableOpacity 
        style={{
          backgroundColor:'#6B4EFF',
          width:327,
          height:48,
          alignSelf:'center',
          borderRadius:48,
          top:-40
        }} onPress={checkproduto}>
          <Text style={{
            fontWeight:'bold',
            fontSize:18,
            textAlign:'center',
            marginTop:10,
            marginBottom:15
            }}>Finalizar</Text>
        </TouchableOpacity>

         {/* Model para mandar informar ao utilizador*/}
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
                                Conferir Atenção!
                                </Text>
                                <Text style ={{
                                    textAlign:'center',
                                    marginTop:25,
                                    marginBottom:10,
                                    fontWeight:'bold',

                                }}>
                                Valide todos os produtos usando
                                o código de barras, para um melhor controlo de stock!
                                </Text>
                                <View>
                                <TouchableOpacity
                                    style={[StyleCreateAccount.conteinerbtn,{
                                        marginTop:10, 
                                        width:340,
                                        height:51,
                                        backgroundColor:'#90EE90'
                                        }]} onPress={() => Setmodal4visibile(!Modal4visibile)}>
                                    <Text style={{color:'black'}}> Conferir </Text>
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
        {/*Model para mandar informar ao utilizador */}

    {/* Model para mandar alerta de controle ao utilizador*/}
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
                                Conferir Atenção!
                                </Text>
                                <Text style ={{
                                    textAlign:'center',
                                    marginTop:25,
                                    marginBottom:10,
                                    fontWeight:'bold',

                                }}>
                                Ops! Há algum produto em falta.
                                    Confira por favor!
                                </Text>
                                <View>
                                <TouchableOpacity
                                    style={[StyleCreateAccount.conteinerbtn,{
                                        marginTop:10, 
                                        width:340,
                                        height:51,
                                        backgroundColor:'#90EE90'
                                        }]} onPress={() => Setmodal5visibile(!Modal5visibile)}>
                                    <Text style={{color:'black'}}> Continuar </Text>
                                </TouchableOpacity>
                                </View>

                                <TouchableOpacity
                                    style={[StyleCreateAccount.conteinerbtn,{
                                        marginTop:10,
                                        width:340,
                                        height:51,
                                        alignSelf:'center',
                                        right:5
                                        }]} onPress={()=>Setmodal5visibile(!Modal5visibile)}>
                                    <Text style={{color:'red'}}> Cancelar </Text>
                                </TouchableOpacity>
                                
                                                                
                            </View>
                        </View>
                    </Modal>
                </View>
            </View>
        </View>
        {/*Model para mandar alerta de controle ao utilizador */}
  </KeyboardAvoidingView>
  );
}