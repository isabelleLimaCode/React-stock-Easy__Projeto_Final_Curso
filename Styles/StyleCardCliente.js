import {StyleSheet,Dimensions} from "react-native";

export default StyleSheet.create({
  
    conteiner:{
        width:350,
        height:80,
        borderBottomWidth:1,
        alignSelf:'center',
        borderColor:'#B0E0E6',
        flexDirection:'row',
        marginBottom:5,
        marginTop:5,
        borderRadius:20
    },
    Picture:{
        width:62,
        height:62,
        borderRadius:12,
        marginHorizontal:10,
        marginTop:5
        
    },
    conteinerdados:{
        flexDirection:'column',
       
    },
    text:{
        fontWeight:'bold',
        marginBottom:2,
        marginTop:2
        
    },
    estado:{
        width:8, 
        height:8,
        backgroundColor:'#32CD32',
        alignSelf:'flex-start',
        borderRadius:4,
        top:7,
        left:5
    },
    textestado:{
        color:'#000',
        marginTop:2,
        marginBottom:2,
        
    },
    conteinerativo:{
        justifyContent:'space-between',
        flexDirection:'row',
        backgroundColor:'#00FA9A',
        width:65,
        height:22,
        borderRadius:8,
        alignItems:'center',
        right:40,
        top:-10

    },
    icons:{
       top:5
    },
    iconsContainer: {
        flexDirection: 'row',
    },
   

});