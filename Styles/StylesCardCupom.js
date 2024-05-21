import {StyleSheet,Dimensions} from "react-native";

export default StyleSheet.create({
  
    conteiner:{
        width: 362, 
        height: 121, 
        borderRadius: 10, 
        backgroundColor: '#095169', 
        borderColor: '#000', 
        borderWidth: 3, 
        borderStyle: 'dotted', 
        padding: 5,
    },
    iconbar:{
        marginBottom:10,
        marginTop:10,
        alignSelf:'flex-end',
        
    },
    conteiner2:{
        backgroundColor:'rgba(255, 255, 255, 0)',
        height:100,
        width:250,
        borderRightWidth:3,
    },
    logo:{
        width:100,
        height:100,
        borderRadius:10,
        left:14
    },
    text2:{
        fontWeight:'bold',
        color:'#fff',
        fontSize:15,
        alignSelf:'center',
        marginHorizontal:40,
        marginTop:10
    },
    conteiner3:{
        flexDirection:'column',
        right:16
    }


});