import {StyleSheet,Dimensions} from "react-native";

export default StyleSheet.create({
    mainConteiner:{
        backgroundColor: '#3070B6',
        top:50
        
    },

    itemConteiner:{
        marginTop:100,
        alignItems:'center',
        backgroundColor:'#fff',
        borderRadius:8,
        padding:20,
        alignItems:'center',
        justifyContent:'center',
        height:450
    },

    imgitem:{
        width:250,
        height:250,
        borderRadius:75,
        marginBottom:10,
    },

    itemtext:{
        fontSize:29,
        fontWeight:'bold',
        top:30,
        alignSelf:'center',
        display:'flex',
        textAlign:'center',
        alignItems:'center',
        
    }
});