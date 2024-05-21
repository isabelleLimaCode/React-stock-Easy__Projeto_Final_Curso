import react from "react";
import {StyleSheet,Dimensions} from "react-native";

const Cardwidth = Math.round(Dimensions.get('window').width); // deixa o card do tamanho consoante a sua informação
export default StyleSheet.create({
    mainConteiner:{
        backgroundColor: '#B0E0E6',
        
    },

    input: { 
        top:30,
        height:40,
        margin:12,
        borderWidth:1,
        padding:10,
        fontSize:16,
        borderColor:'#EDEFEE',
        backgroundColor:'#fff',
        width:350,
        borderRadius:10,
        alignSelf:'center'
    }, 

    textinput:{
        color:'#fff',
        top:30,
        left:5,
    },  


    secondConteiner:{
        backgroundColor:'#082854',
        borderTopLeftRadius: 20, 
        borderTopRightRadius: 20, 
        overflow: 'hidden',
        flex:2,
        top:-20
        
    },

    eye:{
        alignSelf:'flex-end',
        top:-10,
        right:34
    },

    eye2:{
        alignSelf:'flex-end',
        top:26,
        right:20
    },

    btn: {      
        width:180,
        height:48,
        borderRadius: 15,
        backgroundColor: '#080930',
        alignSelf:'center',
      },
    
    seta: {
        left:10,
        top:-2
    },

    txt:{
        color:'white',
        alignSelf:'center',
        top:15,
        left:10
    },

    imag:{
        width:52,
        height:35,
        alignSelf:'center',
        marginTop:60,
        marginRight:70
    },

    imag2:{
        width:52,
        height:35,
        alignSelf:'center',
        top:-35,
        left:40
    },

    logo: {
        width:350,
       height:350,
       alignSelf:'center',
       left:-15
    },

    imag7:{
        width:25,
       height:25,
       alignSelf:'flex-start',
       backgroundColor:'#fff',
       left:20,
       top:-50
    },

    btn2: {      
        width:180,
        height:48,
        borderRadius: 15,
        backgroundColor: '#fff',
        alignSelf:'center',
        top:18
      },

      txt2:{
        fontSize:16,
        alignSelf:'center',
        top:13,
        color:'#BDBDBD',
        width:130,
        height:60,
        borderRadius:15,
        right:-50
      },

});