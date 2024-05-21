import {StyleSheet,Dimensions} from "react-native";

export default StyleSheet.create({
  
    conteiner:{
        backgroundColor:'#fff',
        position:'relative',
        width:360,
        height:200,
        marginTop:10,
        borderRadius:10,
        shadowOffset:{
         width: 5,
        height: 5,
        },
        shadowOpacity: 0.50,
        shadowRadius: 4,
        elevation:9,
        shadowColor:'#000'
    },
    img:{
        width:150,
        height:150,
        position:'absolute',
        alignSelf:'center',
        borderRadius:80,
        top:10,     
    },
    conteiner2:{
        backgroundColor:'#FFF',
        height:50,
        width:80,
        top:10,
        right:10,
        alignSelf:'flex-end',
        borderRadius:10,
        shadowOffset:{
          width: 5,
          height: 5,
      },
      shadowOpacity: 0.50,
      shadowRadius: 5,
      elevation:9,
      shadowColor:'#0c2c51',
    },
    text1:{
        top:-25,
        right:32,
        fontSize:20,
        color:'#547c96',
        alignSelf:'flex-end'
    },
    conteiner3:{
        justifyContent:'center',
        flexDirection: 'row',
        alignItems: 'center',
        top:90,
    },
    text2:{
        alignSelf:'center',
        fontWeight:'bold',
        fontSize:17,
        right:50,
        color:'#547c96'
    }


});