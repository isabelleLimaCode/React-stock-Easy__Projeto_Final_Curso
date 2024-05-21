import {StyleSheet,Dimensions} from "react-native";

export default StyleSheet.create({
    textinput:{
        color:'#000',
        alignSelf:'flex-start',
        marginHorizontal:12
    }, 
    buttonsty:{
        backgroundColor:'#79ACE3',
        width:357,
        height:40,
        alignSelf:'center',
        borderRadius:30,
        shadowOffset:{
            width: 5,
            height: 5,
        },
        shadowOpacity: 0.5,
        shadowRadius: 6,
        elevation:6,
        marginTop:5
    },
    text2:{
        height:24,
        marginVertical:20,
        left:20,
        fontSize:18,
        fontWeight:'bold',
        top:-10

    },
    conteiner:{
        justifyContent:'space-evenly',
        flexDirection: 'row',
        alignItems: 'center',
    },
    buttonnew:{
        backgroundColor:'#8FBC8F',
        height:327,
        height:45,
        marginTop:25,
        marginBottom:30,
        borderRadius:48,
        marginRight:10,
        marginLeft:10
    },
    input: { 
        height:40,
        margin:9,
        borderWidth:1,
        padding:10,
        fontSize:16,
        borderColor:'#EDEFEE',
        backgroundColor:'#fff',
        width:350,
    }, 
});