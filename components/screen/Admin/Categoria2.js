import React, { useEffect, useState } from 'react';
import { 
    Text, 
    View,
    Image,
    TouchableOpacity,
    FlatList,
    Alert,
    Modal,
    TextInput,
    Keyboard
} from 'react-native';
import StyleCardObj from '../../../Styles/StyleCardObj';
import StylesCategoria from '../../../Styles/StylesCategoria';
import StyleNewProduct from '../../../Styles/StyleNewProduct';
import { CommonActions } from '@react-navigation/native';
import StyleCreateAccount from '../../../Styles/StyleCreateAccount';
import stylemain from '../../../Styles/Stylemain';
import { MaterialCommunityIcons , AntDesign,MaterialIcons} from '@expo/vector-icons';

  const data2 = [
    { id: '1', name: 'ROUPA',icon:'right', style1: StylesCategoria.text2,icon2:'tshirt-crew',style2: StylesCategoria.icon1},
    { id: '2', name: 'CALÇADO',icon:'right',style1: StylesCategoria.text2,icon2:'shoe-sneaker',style2:StylesCategoria.icon1},
    { id: '3', name: 'MALAS',icon:'right', style1: StylesCategoria.text2,icon2:'bag-personal',style2:StylesCategoria.icon1},
    { id: '4', name: 'ACESSÓRIOS',icon:'right',style1: StylesCategoria.text2,icon2:'ring',style2:StylesCategoria.icon3},
    { id: '5', name: 'BELEZA',icon:'right',style1: StylesCategoria.text,icon2:'hair-dryer',style2:StylesCategoria.icon2},
  ];
  const data3 = [
    { id: '1', name: 'TÊXTEIS',icon:'right', style1: StylesCategoria.text2,icon2:'tshirt-crew',style2: StylesCategoria.icon1},
    { id: '2', name: 'ACESSÓRIOS',icon:'right',style1: StylesCategoria.text2,icon2:'food-takeout-box',style2:StylesCategoria.icon1},
  ];
  const data4 = [
    { id: '1', name: 'VIDEOSJOGOS',icon:'right', style1: StylesCategoria.text2,icon2:'tshirt-crew',style2: StylesCategoria.icon1},
    { id: '2', name: 'JOGOS E PUZZLES',icon:'right',style1: StylesCategoria.text2,icon2:'puzzle',style2:StylesCategoria.icon1},
    { id: '3', name: 'MÚSICA & VIDEO',icon:'right', style1: StylesCategoria.text2,icon2:'music',style2:StylesCategoria.icon1},
    { id: '4', name: 'LIVROS',icon:'right',style1: StylesCategoria.text2,icon2:'book-open',style2:StylesCategoria.icon3},
  ];
  const data5 = [
    { id: '1', name: 'CÃES',icon:'right', style1: StylesCategoria.text2,icon2:'dog',style2: StylesCategoria.icon1},
    { id: '2', name: 'GATOS',icon:'right',style1: StylesCategoria.text2,icon2:'cat',style2:StylesCategoria.icon1},
    { id: '3', name: 'PEIXES',icon:'right', style1: StylesCategoria.text2,icon2:'fish',style2:StylesCategoria.icon1},
    { id: '4', name: 'PáSSAROS',icon:'right',style1: StylesCategoria.text2,icon2:'bird',style2:StylesCategoria.icon3},
  ];
  const data6 = [
    { id: '1', name: 'rato',icon:'right', style1: StylesCategoria.text2,icon2:'dog',style2: StylesCategoria.icon1},
    { id: '2', name: 'Teclado',icon:'right',style1: StylesCategoria.text2,icon2:'cat',style2:StylesCategoria.icon1},
  ];

export default function Categoria2({navigation,route}) {
    const [modalVisible2, setModalVisible2] = useState(false);
    const [datacategory, setdatacategory] = useState([]);
    const [selectcategoria,setselectCateoria] = useState('');
    const [ChangeCategory,setchangeCategory] = useState(false);
    const [currentData, setCurrentData] = useState();
    const [nomeItem, SetnomeItem] = useState();
    const { passadata } = route.params;
    const { passaindex } = route.params;
    const {categoryYesOrNot} = route.params;
    
    console.log('nome', passadata);
    console.log ('index', passaindex);
  
    const handleItemPress = (index) => {
        let nomeItem = '';

        if ( currentData === data2){
             nomeItem = data2[index].name;
        }else if (currentData === data3){
          nomeItem = data3[index].name;
        }else if (currentData === data4){
          nomeItem = data4[index].name;
        }else if (currentData === data3){
          nomeItem = data5[index].name;
        }else if (currentData === data6){
          nomeItem = data6[index].name;
        }
        const params = { passadata: nomeItem, categoryYesOrNot: true };
        console.log('Nome:', nomeItem);
        Alert.alert(
          'Atenção',
          'Tens a certeza que é essa Categoria ?',
          [
              {
                  text: 'Sim',
                  onPress: () => {
                    navigation.navigate('CriarProduto', params);
                  }
              },
              {
                  text: 'Não',
                  onPress: () => {
                    navigation.navigate('CriarProduto', { passadata: ' ' ,categoryYesOrNot:' '});
                  }
              }
          ],
          { cancelable: false }
      );

         
    }

 useEffect(()=>{
  switch (passaindex) {
    case 0:
    case 1:
    case 2:
        setCurrentData(data2);
        break;
    case 3:
        setCurrentData(data3);
        break;
    case 4:
        setCurrentData(data4);
        break;
    case 5:
        setCurrentData(data5);
        break;
    case 6:
        setCurrentData(data6);
        break;
      }
    setchangeCategory(!ChangeCategory);
 },[passadata])

    
   
    
    const RenderItem = ({item,index}) => (
        
        <View key={item.id}> 
            <TouchableOpacity style={{backgroundColor:'#6CA5E4', width:'auto',height:56, borderRadius:10,margin:10}} onPress={() => handleItemPress(index)}>
            <View style ={StylesCategoria.conteiner}>
               <MaterialCommunityIcons style={item.style2} name={item.icon2} size={35} color="black" />
               <Text style = {item.style1}>{item.name}</Text>
               <AntDesign style={StylesCategoria.icon} name={item.icon} size={25} color="white" />
               </View>
            </TouchableOpacity>
        </View>
        
    )

    const handlechangeCategoria = (text) => {
        setselectCateoria(text);
    }

    const adicionarCategoria = () => {
        if (selectcategoria.trim() !== '') {
            setdatacategory(prevCategories => [...prevCategories, { nome: selectcategoria}]);
            setselectTelemovel(''); 
        }
    }

    const handleEnviarPedido = () => {
        Alert.alert(
          'Criar Categoria',
          'Categoria criada com sucesso',
          [
            {
              text: 'ok',
              onPress: async () => {
                setModalVisible2(!modalVisible2);
              },
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
                    <Text style={StyleCardObj.text2}>{passadata}</Text>
            </View>

              {/* Model alterar telemovel*/}
              <View>
                                <View style = {StyleCreateAccount.div}>
                                        <View style={StyleCreateAccount.centeredView}>
                                                <Modal
                                                        animationType="slide"
                                                        transparent={true}
                                                        visible={modalVisible2}
                                                        onRequestClose={() => {
                                                        Alert.alert('Modal has been closed.');
                                                        setModalVisible2(!modalVisible2);
                                                    }}>
                                                    <View style={StyleCreateAccount.centeredView}>
                                                            <View style={[StyleCreateAccount.modalView,{
                                                                backgroundColor:'#f4f3ee',
                                                                borderRadius:50,
                                                                width:356,
                                                                height:200,
                                                                top:-300
                                                                }]}>
                                                                <View style={{top:-20}}>
                                                                <Text style={{color:'#000',alignSelf:'center',fontSize:18,fontWeight:'bold'}}>Nova categoria</Text>
                                                                <TextInput 
                                                                style={[
                                                                  stylemain.input,
                                                                  {width:327,height:40, 
                                                                  backgroundColor:'#000',
                                                                  color:'#fff'
                                                                  }]} placeholder="Insira a categoria desejada" 
                                                                  onPress={Keyboard.dismiss}
                                                                  onChangeText={handlechangeCategoria}
                                                                  /> 
                                                                </View>

                                                                <TouchableOpacity
                                                                        style={[StyleCreateAccount.conteinerbtn,{top:8}]} onPress={handleEnviarPedido}>
                                                                    <Text style={{color:'#000000',fontWeight:'bold'}}> Enviar</Text>
                                                                </TouchableOpacity>
                                                                
                                                            </View>
                                                    </View>
                                                </Modal>
                                            </View>
                                        </View>
                                </View>
                         {/*fim  Model alterar telemovel*/}
    
                         <FlatList
                                data={currentData}
                                renderItem={RenderItem}
                                keyExtractor={item => item.id}
                        />
                {ChangeCategory &&(
                     <TouchableOpacity style={StyleNewProduct.buttonnew} onPress={() => setModalVisible2(!modalVisible2)}>
                     <Text style={[StyleNewProduct.text2,{marginHorizontal:100}]}>Criar Categoria</Text>
                     </TouchableOpacity>
                )}
               
   </View>
  );
}