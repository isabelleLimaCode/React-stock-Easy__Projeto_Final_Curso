import {StyleSheet,Dimensions} from "react-native";

export default StyleSheet.create({
  
    conteiner:{
        backgroundColor:'#F2F4F7',
        height:68,
        width:273,
        alignSelf:'center',
        top:-20,
        borderTopLeftRadius:10,
        borderBottomRightRadius:10
    },
    img:{
        width:400,
        height:840,
    },
    barra:{
        width:100,
        height:840,
        alignSelf:'flex-start',
        borderLeftWidth:2,
        borderColor:'#fff',
        marginLeft:40,
        position:'absolute'
    },
    circulo:{
        width:48,
        height:48,
        position:'absolute',
        backgroundColor:'red',
        borderRadius:100,
        top:20
    }



});