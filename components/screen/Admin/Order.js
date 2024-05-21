import React, { useEffect, useState } from 'react';
import { 
    Text, 
    View,
    TextInput,
    TouchableOpacity,
    FlatList
} from 'react-native';
import StyleNewProduct from '../../../Styles/StyleNewProduct';
import StyleCardObj from '../../../Styles/StyleCardObj';
import { AntDesign } from '@expo/vector-icons';
import CardProduto2 from '../Card/CardProduto2';
export default function Order({navigation,route}) {

    const { nEncomenda } = route.params;
    const { DadosEncomenda } = route.params;
    const { DadosCliente } = route.params;
    const {dataencomeda } = route.params;

    useEffect(()=>{
        console.log('dados encomenda',DadosEncomenda);
        console.log('dados cliente',DadosCliente);
        console.log('dados data',dataencomeda);
      },[nEncomenda])

    const data2 =[
        {key:1 , nome:'creme', codigo:'000987651', valor:'10', quantidade:'10'},
        {key:2 , nome:'pos barba', codigo:'000987651', valor:'15', quantidade:'10'},
        {key:3 , nome:'rato', codigo:'000987651', valor:'16', quantidade:'10'},
        {key:4 , nome:'creme', codigo:'000987651', valor:'18', quantidade:'10'},
    ]

    const renderItem2 = ({ item }) => {
        return (
          <CardProduto2 
            nome={item.nome}
            valor={item.valorvenda}
            quant={item.quantidade}
            imagem={item.image}
            onpress1={() => additem2(item)}
            onpress2={()=> removeItem2(item.key)}
          
          />
        );
      };

      const soma = DadosEncomenda.map(item => parseFloat(item.valorvenda)).reduce((acc, curr) => acc + curr, 0).toFixed(2);

  return (
   
    <View style={{flex:1,backgroundColor:'#fff'}}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign style={{left:10,top:20}} name="back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={[StyleCardObj.text2,{top:20}]}>Encomenda nº{nEncomenda}</Text>
        <View style={{flexDirection:'row',left:15,top:20}}>
        <Text style={[StyleNewProduct.textinput,{top:8,left:3,fontWeight:'bold'}]}>Data Da Encomenda: </Text>
        </View>
        
        <View style={{flexDirection:'row',left:15,marginTop:20, alignItems:'center'}}>
        <TextInput editable={false} value={dataencomeda} style={[StyleCardObj.input, { width: '85%', borderColor: 'blue', textAlign: 'center' }]} />
        </View>

        <View style={{flexDirection:'row',left:15,top:20}}>
        <Text style={[StyleNewProduct.textinput,{top:8,left:3,fontWeight:'bold'}]}>Cliente:</Text>
            <Text style={[StyleNewProduct.textinput,{top:8,left:105,fontWeight:'bold'}]}> Desconto: </Text>
        </View>
        
        <View style={{flexDirection:'row',left:15,marginTop:20,marginBottom:10}}>
            <TextInput editable={false} value={DadosCliente} style={[StyleCardObj.input, { width: '40%',borderColor:'blue',textAlign:'center'}]} />
            <TextInput editable={false} style={[StyleCardObj.input, { width: '40%',borderColor:'blue' }]} />
        </View>
        <FlatList
            data={DadosEncomenda}
            keyExtractor={(item) => item.id}
            renderItem={renderItem2}
        />
        <View style={{borderTopWidth:2,borderColor:'#3a89ff',marginTop:20,top:-30}}>

                <View style = {{
                justifyContent:'space-between',
                flexDirection:'row'
                }}>
                    <Text style={StyleCardObj.textn}>Entrega </Text>
                    <Text style={StyleCardObj.textn}>5.00€</Text>
                </View>
                <View style = {{
                justifyContent:'space-between',
                flexDirection:'row'
                }}>
                    <Text style={[StyleCardObj.textn,{color:'red'}]}>Desconto:</Text>
                    <Text style={[StyleCardObj.textn,{color:'red'}]}>- 5.00€</Text>
                </View>
                <View style = {{
                justifyContent:'space-between',
                flexDirection:'row'
                }}>
                    <Text style={StyleCardObj.subtotal}>Total:</Text>
                    <Text style={StyleCardObj.subtotal}>{soma}€</Text>
                </View>
            
        </View>
    </View>
  );
}