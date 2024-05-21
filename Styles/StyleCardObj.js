import {StyleSheet,Dimensions} from "react-native";

export default StyleSheet.create({
  
    conteiner:{
       backgroundColor:'#24B694',
       width:362,
       height:121,
       borderRadius:15,
       alignSelf:'center',
       marginTop:5,
       marginBottom:5
    },
    title:{
        width: "100%",
        fontSize: 30,
        fontWeight: "bold",
        paddingLeft:15,
        paddingRight:15,
        textAlign:'center',
        justifyContent:'center',
        
      },
    text:{
        alignSelf:'center',
        marginVertical:30,
    },
    conteiner2:{
        justifyContent:'space-evenly',
        flexDirection: 'row',
        alignItems: 'center',
        top:-90,
        left:20
    },
    img:{
        height:100,
        width:100,
        borderRadius:13,
        alignSelf:'flex-start'
    },
    textinput:{
        color:'#000',
        top:15,
        right:35
     
    }, 
    input: { 
        height:40,
        margin:12,
        borderWidth:1,
        fontSize:16,
        borderColor:'#EDEFEE',
        backgroundColor:'#fff',
        width:170,
        borderRadius:10,
        marginBottom:15
    },
    conteiner3:{
        backgroundColor:'#fff',
        justifyContent:'space-evenly',
        flexDirection: 'row',
        alignItems: 'center',
    },
    text2:{
        fontWeight:'bold',
        fontSize:32,
        margin:10,
        alignSelf:'center',
    },
    back:{
        top:30,
        right:-5,
        alignSelf:'flex-start',

       
    },
    root:{
        justifyContent: "center",
        alignItems: "center",
        backgroundColor:'#fff'
      },
    Picture:{
        alignSelf:'center',
        marginTop:10,
    },
    borda:{
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        alignSelf:'flex-end'
    },
    card:{
        backgroundColor:'#fff',
        padding:16,
        elevation:3,
        shadowColor:'black',
        shadowOffset:{
            width:0,    
            height:3,
        },
        shadowOpacity: 0.24,
        shadowRadius:4,
        borderRadius: 8,
    },
    conteinerCard:{
        flex:1,
        backgroundColor:'#fff',
        alignItems:'center',
        justifyContent:'center'
    },
    skeletonSty:{
        borderRadius: 20
    },
    skeletonSty2:{
        borderRadius: 8,
        marginTop:16
    },
    skeletonSty3:{
        borderRadius: 8,
        marginTop:8
    },
    container: {
        padding: 10,
        paddingHorizontal: 20,
        flexDirection: 'row',
      },
      contentContainer: {
        flex: 1,
        marginLeft: 10,
      },
      image: {
        width: '40%',
        aspectRatio: 1,
      },
      name: {
        fontWeight: '500',
        fontSize: 18,
      },
      size: {
        fontSize: 16,
        color: 'gray',
      },
      quantity: {
        marginHorizontal: 10,
        fontWeight: 'bold',
        color: 'gray',
      },
      footer: {
        marginTop: 'auto',
        flexDirection: 'row',
        alignItems: 'center',
      },
      itemTotal: {
        fontSize: 16,
        marginLeft: 'auto',
        fontWeight: '500',
      },
      img2:{
        height:400,
        width:400,
        borderRadius:13,
        alignSelf:'center'
    },
    buttonContainer: {
      height: 50,
      backgroundColor: '#6B4EFF',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius:10
    },
    buttonText: {
      color: 'white',
      fontSize: 18,
    },
    stylebutton1:{
      backgroundColor:'#DADEDF',
      width:219,
      height:48,
      borderRadius:48,
      alignSelf:'flex-end',
      marginRight:10,
      left:100
    },
    conteinerstyle:{
      backgroundColor:'#6B4EFF',
      width:106,
      height:48,
      borderRadius:48,
      right:200
    },
    conteinerbuttondesli:{
      alignItems:'center',
      justifyContent:'center',
      flexDirection:'row'
    },

    subtotal:{
      fontWeight:'bold',
      marginHorizontal:20,
      fontSize:19,
      marginTop:15
    },
    textn:{
      marginHorizontal:20,
      fontSize:18,
      marginTop:15
    }




});