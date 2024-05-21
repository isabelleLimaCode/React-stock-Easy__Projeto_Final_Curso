import {StyleSheet,Dimensions} from "react-native";

export default StyleSheet.create({
  
  conteiner:{
    width:355,
    height:186,
    alignSelf:'center',
    marginBottom:10,
  },
  img:{
    width:355,
    height:158,
    borderTopWidth:1,
    borderLeftWidth:1,
    borderRightWidth:1,
    borderColor:'#6B4EFF',
    borderRadius:5,
  },
  card:{
    width:355,
    height:28,
    borderWidth:0.5,
    borderColor:'#6B4EFF',
    borderRadius:5,
    backgroundColor:'#F0F8FF',
  },
  text:{
    alignSelf:'center',
    marginBottom:5,
    marginTop:5,
    fontWeight:'bold',
    fontSize:17
  },
  //parte do card venda
  conteinercardvenda:{
    width:355,
    height:100,
    backgroundColor:'#6B4EFF',
    borderRadius:40,
    shadowOffset:{
      width: 5,
      height: 5,
  },
    shadowOpacity: 0.75,
    shadowRadius: 5,
    marginTop:100,
    alignSelf:'center'
  },
  img2:{
    width:54,
    height:60,
    borderRadius:20,
    marginBottom:7,
    marginTop:7,
    alignSelf:'center',
  },

  textcard:{
    alignSelf:'center',
    fontWeight:'bold',
    fontSize:17,
    alignSelf:'center'
  },
  cardseg:{
    width:64,
    height:78,
    backgroundColor:'#fff',
    borderRadius:20,
    marginHorizontal:30,
    marginTop:10,
    marginBottom:10
  },
  pen:{
    alignSelf:'center',
    marginHorizontal:30
  }


});