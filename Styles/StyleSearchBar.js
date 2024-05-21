import {StyleSheet} from "react-native";


export default StyleSheet.create({
    /* Estilos para Conteiner Padrão */
    container: {
        margin: 15,
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "row",
        width: "90%",
    
      },
      searchBar__unclicked: {
        padding: 10,
        flexDirection: "row",
        width: "100%",
        backgroundColor: "#d9dbda",
        borderRadius: 15,
        alignItems: "center",
      },
    
      searchBar__clicked: {
        padding: 10,
        borderColor: '#059669',
        borderWidth: 1,
        flexDirection: "row",
        width: "100%",
        backgroundColor: "#d9dbda",
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "space-evenly",
      },
    
      input: {
        fontSize: 20,
        marginLeft: 10,
        width: "90%",
      },

});
