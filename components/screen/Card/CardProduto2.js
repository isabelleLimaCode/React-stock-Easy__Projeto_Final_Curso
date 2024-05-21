import React, { useEffect, useState,createContext } from 'react';
import { 
    Dimensions, 
    View,
    Text,
    Image,
    TouchableOpacity,
    TextInput
} from 'react-native';
import { Ionicons,Feather} from '@expo/vector-icons';



export default function CardProduto2({nome,valor,onpress1,onpress2,quant,imagem}) {
    const [Changenumber, setChangenumber] = useState(quant);
    const [quantidade, setquantidade] = useState(quant);
    //const [valor, setValor] = useState(0);

    const handleIncrement = () => {
        if(Changenumber >0 || Changenumber == 0){
            setChangenumber(quantidade + 1);
            setquantidade(Changenumber);
            setquantidade(Changenumber);

        }
       
    };

    
    const handleDecrement = () => {
        if ( Changenumber > 0){
            setChangenumber(Changenumber - 1);
            setquantidade(Changenumber);
            setquantidade(Changenumber);
        }
    };

  return (
       <View style={{
        backgroundColor:'#ffff',
        width:348,
        height:86,
        alignSelf:'center',
        borderRadius:10,
        marginBottom:10,
       
       }}>
        <View style={{
            justifyContent:'space-between',
            flexDirection:'row',
            alignItems:'center'
        }}>
        <Image style= {{
                 width:70,
                 height:70,
                 borderRadius:12,
                 left:10,
                 marginTop:7,
                 marginBottom:5
            }} source={{ uri: imagem }}/>
        <View style={{ flex: 1 }}>
        <Text style={{
                fontWeight:'bold',
                fontSize:20,
                top:-20,
                left:35
            }}>{nome}</Text>
             
        </View>
           
        </View>

        <View style={{
            justifyContent:'center',
            flexDirection: 'row',
            alignItems: 'center',
            top:-45,
            left:35
        }}>
        <Text style={{
            alignSelf:'center',
            right:30,
            fontWeight:'bold',
            fontSize:17
        }}>{valor}€</Text>
        
        <TouchableOpacity onPress={handleIncrement} style={{left:-9}}>
            <Ionicons name="add-circle-sharp" size={26}/>    
        </TouchableOpacity>
        <TextInput  
        value={Changenumber.toString()}
        onChangeText={(text) => setChangenumber(parseInt(text) || 0)}
        />
        <TouchableOpacity onPress={handleDecrement} style={{left:9}}>
            <Ionicons name="remove-circle" size={26} />
        </TouchableOpacity>
        <TouchableOpacity style={{left:40}} onPress={onpress2}>
                <Ionicons name="trash-sharp" size={26} color='#7cb4c4' />
        </TouchableOpacity>
        <TouchableOpacity style={{left:50}} onPress={onpress1}>
            <Feather name="plus" size={26} color='#7cb4c4' />
        </TouchableOpacity>
        </View>
        </View>
  );
}