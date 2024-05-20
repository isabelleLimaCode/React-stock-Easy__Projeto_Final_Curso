import {StyleSheet,Dimensions} from "react-native";

export default StyleSheet.create({
    Picture:{
        alignSelf:'center',
        marginTop:80,
        width:96,
        height:96,
        borderRadius:25
    },

    secondConteiner:{
        backgroundColor:'#3070B5',
    },

    quadrado:{
        flex:1,
        padding:8,
        height:130,
        position:'relative',
    },

    back:{
        top:30,
        right:-5,
        alignSelf:'flex-start',

       
    },
    alterar:{
        alignSelf:'flex-end',
        top:-40,
        right:80
    },
    conteinerbtn:{
        padding:16,
        backgroundColor:'#F5F5F5',
        alignItems:'center',
        justifyContent:'center',
        width:304,
        borderRadius:10,
        paddingHorizontal:16,
        top:15,
        marginBottom:10,
      },
      modalView: {
        margin: 20,
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
        backgroundColor:'rgba(18, 21, 21, 0.8)',
        top:35
      },
      centeredView: {
        backgroundColor:'rgba(18, 21, 21, 0.8)',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        justifyContent:'flex-end',
      },
      div:{
        justifyContent:'space-around',
        flexDirection: 'row',
        },

        centeredView2: {
          backgroundColor:'rgba(18, 21, 21, 0.8)',
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          justifyContent:'flex-end',
        },
        modalView2: {
          margin: 20,
          borderRadius: 40,
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
          backgroundColor:'#fff',
          top:25
        },
        metodo:{
          width:90,
          height:90,
          marginTop:30,
          marginHorizontal:25,
          borderRadius:30,
        }


});