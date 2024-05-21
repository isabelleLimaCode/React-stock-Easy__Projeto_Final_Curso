import {StyleSheet,Dimensions} from "react-native";

export default StyleSheet.create({
  
    btnContainerBest:{      
        justifyContent:'space-evenly',
        flexDirection: 'row',
        borderRadius: 10,
        backgroundColor: '#D9D9D9',
        height: 40,
        width:'auto',
        top:6,
        alignSelf:'center',
        marginTop:10,
        shadowOffset:{
          width: 5,
          height: 5,
      },
      shadowOpacity: 0.3,
      marginBottom:10,
      borderRadius:10,
    },

    btnBest: {      
        width:155,
        borderRadius: 10,
        backgroundColor: '#D9D9D9',
    },

    selectedBtnbuttonText:{
        textAlign:'center',
        fontWeight:'bold',
        textAlign:'center',
        color: 'white',
        
    },

    buttonText: {
        textAlign:'center',
        fontSize:15,
        fontWeight:'bold',
        marginTop: 10,
        textAlign:'center',
        color: 'black',
        left:-6
    },

    selectedBtnBetst: {
        width:155,
        borderRadius: 10,
        backgroundColor:'#6B4EFF'
    },


});