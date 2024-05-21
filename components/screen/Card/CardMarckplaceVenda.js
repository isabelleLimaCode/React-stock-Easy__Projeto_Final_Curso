import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Pressable,
    Image,
  } from "react-native";
  import React from "react";
  import { FontAwesome5 } from '@expo/vector-icons';
  import { TouchableOpacity } from "react-native-gesture-handler";
  import StyleCardStock from "../../../Styles/StyleCardStock";
  
  const CardMarckplaceVenda = ({stock,nome,imagem,navigation,onpress,pen,valor}) => {
  
    return (
      <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
  
      
        <Text
          style={{
            height: 1,
            borderColor: "#D0D0D0",
            borderWidth: 1,
            
          }}
          
        />
  
        <View style={{ marginHorizontal: 10 }}>
      
            <View
              style={{
                backgroundColor: "white",
                marginVertical: 10,
                borderBottomColor: "#F0F0F0",
                borderWidth: 2,
                borderLeftWidth: 0,
                borderTopWidth: 0,
                borderRightWidth: 0,
              }}
              
            >
              <Pressable
                style={{
                  marginVertical: 10,
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View>
                  <Image
                    style={{ width: 140, height: 140, resizeMode: "contain" }}
                    source={imagem}
                  />
                </View>
  
                <View>
                  <Text numberOfLines={3} style={{ width: 150, marginTop: 10 }}/>
                  <Text
                    style={{ fontSize: 20, fontWeight: "bold", marginTop: 6 }}
                  >
                   {nome}
                  </Text>
                  <Text style={{ color: "green",marginTop:10,marginBottom:10 }}>Em Stock {stock} unidades</Text>
                  <TouchableOpacity onPress={onpress}>
                  {valor ? 
                    <View style={{right:35}}>
                      <View style={StyleCardStock.conteiner2} />
                      <Text style={StyleCardStock.text1}>{valor}€</Text>
                    </View>
                    : null}
                  { pen ? <FontAwesome5  name="pen" size={25} color="black" /> : null}
                  </TouchableOpacity>
                  
                </View>
              </Pressable>
            </View>
  
            
         
        </View>
      </ScrollView>
    );
  };
  
  export default CardMarckplaceVenda;
  