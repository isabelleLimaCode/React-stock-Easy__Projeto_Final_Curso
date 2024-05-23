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
        top:18,
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

      secondConteiner2:{
      backgroundColor:'#fff',
      backgroundColor:'#082854',
      top:-40
        
    },
    header:{
        fontSize:25, 
        color:'white' , 
        fontWeight:'bold',
        top:10, 
        height:50, 
        left:'1%',
        backgroundColor:'#082854',
      },
      header2:{
        fontSize:13, 
        color:'white',
        top:10, 
        height:80, 
        left:'1%',
        justifyContent:'space-between',
        alignItems:'center',
        backgroundColor:'#082854',
      },
    
    textGoogle:{
     fontWeight:'bold',
     fontSize:15,
     top:30,
     textAlign:'center',
     marginTop:20,
     marginBottom:5,
     color:'#fff'

    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
        borderRadius:30,
        alignSelf:'center',
      },
      modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width:370,
      },
      conteinerbtn:{
        padding:16,
        backgroundColor:'#3C464E',
        alignItems:'center',
        justifyContent:'center',
        width:'70%',
        borderRadius:8,
        paddingHorizontal:16,
        top:20,
        marginTop:10
      },
   

});