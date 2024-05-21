import React, { useEffect, useState } from 'react';
import { 
    Text, 
    View,
    TouchableOpacity,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    Modal,
    Alert,
    
} from 'react-native';
import StyleCardObj from '../../../Styles/StyleCardObj';
import moment from 'moment';
import DatePicker, {getFormatedDate}from 'react-native-modern-datepicker';
import stylemain from '../../../Styles/Stylemain';
import StyleNewProduct from '../../../Styles/StyleNewProduct';
import { AntDesign } from '@expo/vector-icons';
import { CheckBox } from 'react-native-elements';

export default function CriarRelatorio({navigation}) {

    const [searchPhrase, setSearchPhrasse] = useState("");
    const [OpenDate, setOpenDate] = useState(false);
    const [OpenDate2, setOpenDate2] = useState(false);
    const [selectedDate,setSelectStartDate] = useState();
    const [selectedDate2,setSelectStartDate2] = useState();
    const [datainicio,SetDatainicio] =useState(' ');
    const [datafinal, setDatafinal] = useState(' ');
    const [datavalida,setDatavalida] = useState(' ');

    //selects
    const [isSelected, setSelection] = useState(false);
    const [isSelected2, setSelection2] = useState(false);
    const [isSelected3, setSelection3] = useState(false);
    const [isSelected4, setSelection4] = useState(false);
    const [isSelected5, setSelection5] = useState(false);
    const [isSelected6, setSelection6] = useState(false);
    const hoje = new Date();
    const StartDate = getFormatedDate(hoje.setDate(hoje.getDate()+1), 'YYYY/MM/DD');

    const handleChangeDate = (propdate) => {
        setSelectStartDate(propdate);
    }

    const handleChangeDate2 = (propdate) => {
        setSelectStartDate2(propdate);
    }
    const handleOnPressDate =() =>{
        setOpenDate(!OpenDate);
        SetDatainicio(!datainicio);    
    }

    const handleOnPressDate2 = () => {
        setOpenDate2(!OpenDate2);
      
        if (selectedDate2 < selectedDate) {
          setDatavalida(true);
          console.log(OpenDate2);
        } else {
          setDatavalida(false);
          console.log(OpenDate2);
        }
      }
      
      useEffect(() => {
        if (datavalida && !OpenDate2) {
          Alert.alert('Datas incorretas ', 'Atenção a data final não pode ser menor que a inicial!');
        }
      }, [datavalida, OpenDate2]);


  const behavior = Platform.OS === 'ios' ? 'padding' : 'height';

  return (
    <KeyboardAvoidingView behavior={behavior} style={{ flex: 1, backgroundColor:'#fff' }}>
      <ScrollView style={{backgroundColor:'#fff',marginTop:40}}>
      <View>
         <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign style={{left:10,top:10}} name="back" size={24} color="black" />
          </TouchableOpacity>
        <Text style={StyleCardObj.text2}>Relatório</Text>
        <Text style={{
            fontWeight:'bold',
            marginBottom:-10
        }}>    Data inicial: </Text>
                    <TouchableOpacity style ={[stylemain.input,{top:10}]} onPress={handleOnPressDate}>
                                    <Text>{selectedDate}</Text>
                    </TouchableOpacity>
        
                <Text style={{
                    fontWeight:'bold',
                    marginBottom:-10,
                    marginTop:10
                }}>    Data Final: </Text>
                    <TouchableOpacity style ={[stylemain.input,{top:10}]} onPress={handleOnPressDate2}>
                                    <Text>{selectedDate2}</Text>
                    </TouchableOpacity>
                
                    <View style={{
                         flex: 1,
                         alignItems: 'center',
                         justifyContent: 'center',
                         marginTop:10,
                         alignSelf:'flex-start',
                    }}>
                         <CheckBox
                            checked={isSelected}
                            onPress={() => setSelection(!isSelected)}
                            title="Lucro"
                            containerStyle={{ flexDirection: 'row', marginBottom: 20 , width:350, left:5}}
                        />

                        <CheckBox
                            checked={isSelected2}
                            onPress={() => setSelection2(!isSelected2)}
                            title="Vendas"
                            containerStyle={{ flexDirection: 'row', marginBottom: 20 , width:350, left:5}}
                        />

                        <CheckBox
                            checked={isSelected3}
                            onPress={() => setSelection3(!isSelected3)}
                            title="Préjuizo"
                            containerStyle={{ flexDirection: 'row', marginBottom: 20 , width:350, left:5}}
                        />

                        <CheckBox
                            checked={isSelected4}
                            onPress={() => setSelection4(!isSelected4)}
                            title="Por cliente"
                            containerStyle={{ flexDirection: 'row', marginBottom: 20 , width:350, left:5}}
                        />

                    <CheckBox
                            checked={isSelected5}
                            onPress={() => setSelection5(!isSelected5)}
                            title="Por produto"
                            containerStyle={{ flexDirection: 'row', marginBottom: 20 , width:350, left:5}}
                        />
                    </View>
        {/* modal pickdate*/}
        <Modal
                                    animationType='slide'
                                    transparent={true}
                                    visible={OpenDate}
                                >
                                    <View style ={{flex:1,alignContent:'center',justifyContent:'center',left:-10}}>
                                        <View style ={{margin:20,
                                                       backgroundColor:'#080516',
                                                       alignItems:'center',
                                                       justifyContent:'center',
                                                       borderRadius:20,
                                                       padding:20,
                                                       width:'95%',
                                                       shadowColor:'#000',
                                                       shadowOffset:{
                                                        width:0,height:2
                                                        },
                                                        shadowOpacity:0.25,
                                                        shadowRadius:4,
                                                        elevation:5
                                                        }}>
                                        <DatePicker
                                            mode='calendar'
                                            selected={selectedDate}
                                            date={moment().format('DD')}
                                            current={selectedDate}
                                            maximumDate={moment().format('YYYY/MM/DD')}
                                            selectorStartingYear={StartDate}
                                            onDateChange={handleChangeDate}
                                            onSelectedChange={Date => setSelectStartDate(Date)}
                                            options={{
                                                    backgroundColor : '#080516',
                                                    textHeaderColor:'#059669',
                                                    textDefaultColor:'#ffffff',
                                                    selectedTextColor:'#fff',
                                                    mainColor:'#059669',
                                                    textSecondaryColor:'#ffffff',
                                                    borderColor:'rgba(122,146,165,0.1)'     
                                            }}    
                                        />
                                        <TouchableOpacity
                                            onPress={handleOnPressDate}
                                        >
                                            <Text style ={{color:'white'}}>Submeter </Text>
                                        </TouchableOpacity>

                                        </View>
                                    </View>
                                </Modal>

    {/* modal pickdate 2*/}
        <Modal
                                    animationType='slide'
                                    transparent={true}
                                    visible={OpenDate2}
                                >
                                    <View style ={{flex:1,alignContent:'center',justifyContent:'center',left:-10}}>
                                        <View style ={{margin:20,
                                                       backgroundColor:'#080516',
                                                       alignItems:'center',
                                                       justifyContent:'center',
                                                       borderRadius:20,
                                                       padding:20,
                                                       width:'95%',
                                                       shadowColor:'#000',
                                                       shadowOffset:{
                                                        width:0,height:2
                                                        },
                                                        shadowOpacity:0.25,
                                                        shadowRadius:4,
                                                        elevation:5
                                                        }}>
                                        <DatePicker
                                            mode='calendar'
                                            selected={selectedDate2}
                                            date={moment().format('DD')}
                                            current={selectedDate2}
                                            maximumDate={moment().format('YYYY/MM/DD')}
                                            selectorStartingYear={StartDate}
                                            onDateChange={handleChangeDate2}
                                            onSelectedChange={Date => setSelectStartDate2(Date)}
                                            options={{
                                                    backgroundColor : '#080516',
                                                    textHeaderColor:'#059669',
                                                    textDefaultColor:'#ffffff',
                                                    selectedTextColor:'#fff',
                                                    mainColor:'#059669',
                                                    textSecondaryColor:'#ffffff',
                                                    borderColor:'rgba(122,146,165,0.1)'     
                                            }}    
                                        />
                                        <TouchableOpacity
                                            onPress={handleOnPressDate2}
                                        >
                                            <Text style ={{color:'white'}}>Submeter </Text>
                                        </TouchableOpacity>

                                        </View>
                                    </View>
                                </Modal>
     </View>
      </ScrollView>
      <TouchableOpacity style={StyleNewProduct.buttonnew}>
                <Text style={[StyleNewProduct.text2,{marginHorizontal:100}]}>Criar Relatório</Text>
               
        </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

