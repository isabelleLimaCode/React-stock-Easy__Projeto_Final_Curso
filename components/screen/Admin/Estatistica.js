import React, { useEffect, useState } from 'react';
import { 
    View,
    Text,
    KeyboardAvoidingView,
    ScrollView,
    TouchableOpacity,
    Modal,
    Image,
    RefreshControl,
    Platform
} from 'react-native';
import StyleCardObj from '../../../Styles/StyleCardObj';
import CardEstatistica from '../Card/CardEstatistica';
import {BarChart} from 'react-native-gifted-charts';
import {Picker} from '@react-native-picker/picker';
import stylemain from '../../../Styles/Stylemain';
export default function Estatistica() {

  const [selectedMonth, setSelectedMonth] = useState('Janeiro');
  const [modalVisible, setModalVisible] = useState(false);
  const [donthavedata,setDonthavedata] = useState(true);
  const [refreshing, setRefreshing] = React.useState();

  const months = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
  ];

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    
    setTimeout(() => {
      setDonthavedata((prevDonthaveData) => !prevDonthaveData);
      setRefreshing(false);
    }, 2000);
  }, []);

  const barData = [
    {
      value: 40,
      label: 'Jan',
      spacing: 2,
      labelWidth: 30,
      labelTextStyle: {color: 'gray'},
      frontColor: '#177AD5',
    },
    {value: 20, frontColor: '#ED6665'},
    {
      value: 50,
      label: 'Feb',
      spacing: 2,
      labelWidth: 30,
      labelTextStyle: {color: 'gray'},
      frontColor: '#177AD5',
    },
    {value: 40, frontColor: '#ED6665'},
    {
      value: 75,
      label: 'Mar',
      spacing: 2,
      labelWidth: 30,
      labelTextStyle: {color: 'gray'},
      frontColor: '#177AD5',
    },
    {value: 25, frontColor: '#ED6665'},
    {
      value: 30,
      label: 'Apr',
      spacing: 2,
      labelWidth: 30,
      labelTextStyle: {color: 'gray'},
      frontColor: '#177AD5',
    },
    {value: 20, frontColor: '#ED6665'},
    {
      value: 60,
      label: 'May',
      spacing: 2,
      labelWidth: 30,
      labelTextStyle: {color: 'gray'},
      frontColor: '#177AD5',
    },
    {value: 40, frontColor: '#ED6665'},
    {
      value: 65,
      label: 'Jun',
      spacing: 2,
      labelWidth: 30,
      labelTextStyle: {color: 'gray'},
      frontColor: '#177AD5',
    },
    {value: 30, frontColor: '#ED6665'},
  ];

  const renderTitle = () => {
      return(
        <View style={{marginVertical: 30}}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            marginTop: 24,
            backgroundColor: '#333340',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View
              style={{
                height: 12,
                width: 12,
                borderRadius: 6,
                backgroundColor: '#177AD5',
                marginRight: 8,
              }}
            />
            <Text
              style={{
                width: 60,
                height: 16,
                color: 'lightgray',
              }}>
              Point 01
            </Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View
              style={{
                height: 12,
                width: 12,
                borderRadius: 6,
                backgroundColor: '#ED6665',
                marginRight: 8,
              }}
            />
            <Text
              style={{
                width: 60,
                height: 16,
                color: 'lightgray',
              }}>
              Point 02
            </Text>
          </View>
        </View>
      </View>
      )
  }


    const behavior = Platform.OS === 'ios' ? 'padding' : 'height';
  return (
    <KeyboardAvoidingView  style={{  backgroundColor:'#fff'}} >
    
     <View>

        <Text style={StyleCardObj.text2}>Balanço</Text>
     </View>
    
   <ScrollView
        refreshControl={
          <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
          />
      }
   >
   {donthavedata ?(

  <View>
    <View style={{
          marginBottom:10
          }}>
          <Text>    Selecione um mês: </Text>
          <TouchableOpacity style ={[stylemain.input,{top:10}]} onPress={toggleModal}>
                    <Text>{selectedMonth}</Text>
          </TouchableOpacity>
      
    </View>
          <Modal
            animationType='slide'
            transparent={true}
            visible={modalVisible}
            >
              <View style ={{flex:1,alignContent:'center',justifyContent:'center',left:-10}}>
                <View style ={{margin:20,
                      backgroundColor:'#fff',
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
                  <Picker
                    style = {{width:'100%'}}
                    selectedValue={selectedMonth}
                    onValueChange={(itemValue, itemIndex) => {
                    setSelectedMonth(itemValue);
                    toggleModal();
                    }}>
                      {months.map((month, index) => (
                      <Picker.Item key={index} label={month} value={month} />
                    ))}
                  </Picker>

                </View>
            </View>
        </Modal>

    <View
        style={{
          backgroundColor: '#333340',
          paddingBottom: 20,
          borderRadius: 10,
          marginBottom:30,
          width:350,
          alignSelf:'center'
        }}>
        {renderTitle()}
        <BarChart
          data={barData}
          barWidth={8}
          spacing={28}
          roundedTop
          roundedBottom
          hideRules
          xAxisThickness={0}
          yAxisThickness={0}
          yAxisTextStyle={{color: 'white'}}
          noOfSections={3}
          maxValue={75}
        />
      </View>
         
    <CardEstatistica color={'red'} label={'Encomenda nº33456'} value={'100'}/>
    <CardEstatistica color={'gray'} label={'Encomenda nº33455'} value={'40'}/>
    <CardEstatistica color={'orange'} label={'Encomenda nº33475'} value={'100'}/>
    <CardEstatistica color={'orange'} label={'Encomenda nº33475'} value={'100'}/>
    <CardEstatistica color={'orange'} label={'Encomenda nº33475'} value={'100'}/>
    <CardEstatistica color={'orange'} label={'Encomenda nº33475'} value={'100'}/>
    
    </View>
    ):(
    <View>
          <Image style={{ width: 250, height: 250,marginBottom: 10,alignSelf: 'center',marginTop:100 }} source={require('./../../../assets/estatistica.png')} />
                  <Text style ={{
                      textAlign:'center',
                      fontWeight:'800',
                      fontSize:20,
                  }}>
                  Ops! Não há dados suficientes para Visualizar o balanço 
                  </Text>
    </View>
  )}
   </ScrollView>
    
  </KeyboardAvoidingView>
  );
}