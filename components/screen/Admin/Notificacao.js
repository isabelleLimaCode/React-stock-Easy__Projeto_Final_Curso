import React, { useEffect, useState, useRef } from 'react';
import { 
    Text, 
    View,
    Image,
    TouchableOpacity,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    RefreshControl
    
} from 'react-native';
import StyleCardObj from '../../../Styles/StyleCardObj';
import CardNotificacao from '../Card/CardNotificacao';

export default function Notificação({navigation}) {
  const [donthave, setdonthave] = useState(true);
  const [refreshing, setRefreshing] = React.useState();
  const behavior = Platform.OS === 'ios' ? 'padding' : 'height';

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    
    setTimeout(() => {
      setdonthave((prevDonthave) => !prevDonthave);
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <KeyboardAvoidingView behavior={behavior} style={{ flex: 1 , backgroundColor:'#fff'}}>
      
      <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ flexGrow: 1 }}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor='#059669'
        />
      }
    >
    <View>
        <Text style={[StyleCardObj.text2,{marginBottom:-40}]}>Notificações</Text>
    </View>
      {donthave == false ?(
          <View
          >
          <Text style={{
            top:70,
            textAlign:'center',
            fontWeight:'bold',
            fontSize:18
          }}>Novas</Text>
          
          <CardNotificacao datacompra= '12.10.1212' nomedacompra='stock insuficiente' situacaodacompra='10'/>
          <CardNotificacao datacompra= '12.10.1212' nomedacompra='compra finalizada' situacaodacompra='10'/>
          <CardNotificacao datacompra= '12.10.1212' nomedacompra='nova compra' situacaodacompra='10'/>
          <CardNotificacao datacompra= '12.10.1212' nomedacompra='joana' situacaodacompra='10'/>
          
        <Text style={{
            top:70,
            textAlign:'center',
            fontWeight:'bold',
            fontSize:18
          }}>Antigas</Text>
         
          <CardNotificacao datacompra= '12.10.1212' nomedacompra='situação regularizada' situacaodacompra='0' />
          <CardNotificacao datacompra= '12.10.1212' nomedacompra='Notificação MBWAY enviada' situacaodacompra='0'/>
          <CardNotificacao datacompra= '12.10.1212' nomedacompra='Compra finalizada' situacaodacompra='0'/>
        </View>
  
       ):(
        <View>
            <Image style={{ width: 250, height: 250,marginBottom: 10,alignSelf: 'center',marginTop:200 }} source={require('./../../../assets/notficacao.png')} />
                    <Text style ={{
                        textAlign:'center',
                        fontWeight:'800',
                        fontSize:20,
                    }}>
                    Ops! Não há notificações
                    </Text>
        </View>
       )}
      
      </ScrollView>
       
    </KeyboardAvoidingView>
  );
}

