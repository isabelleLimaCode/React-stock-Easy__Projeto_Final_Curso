import {StyleSheet,Dimensions} from "react-native";

export default StyleSheet.create({
  
   text1:{
      fontSize:17,
      fontWeight:'bold',
      textAlign:'center'
   },
   slider:{
      width:340,
      height:40,
      alignSelf:'center',
   },
   Switchstyle:{
      transform:[{scaleX: 1}, {scaleY: 1}],
      alignSelf:'flex-end',
      right:20,
      marginTop:40
   },
   Switchstyle2:{
    transform:[{scaleX: 1}, {scaleY: 1}],
    alignSelf:'flex-end',
    right:20,
    top:-10,
    marginHorizontal:10
 },
   container: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
      right:10
    },
    switchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    switchText: {
      marginRight:30,
      marginTop:40
    },
    text2: {
      marginRight:30,
      fontSize:14,
      fontWeight:'bold',
      marginTop:40
    },
    conteinerswitch:{
      marginTop:20
    },
    textinput:{
      top:2,
      right:20,
      marginHorizontal:140
    },
    conteinerButton:{
      width:327,
      height:48,
      backgroundColor:'#DDA0DD',
      borderRadius:48,
      alignItems:'center',
      alignSelf:'center'
    },
    textbutton:{
         marginBottom:15,
         marginTop:15,
         fontSize:15,
         fontWeight:'bold'
    },
    conteinerdis:{
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginHorizontal:30,
        marginBottom:40,
        marginTop:20
    },
   



});