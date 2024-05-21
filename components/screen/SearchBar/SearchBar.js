
import React from "react";
import {TextInput, View, Keyboard, Button, Pressable, TouchableOpacity } from "react-native";
import { Feather, Entypo } from "@expo/vector-icons";
import StyleSearchBar from "../../../Styles/StyleSearchBar";

const SearchBar = ({clicked, searchPhrase, setSearchPhrase, setClicked,texto}) => {
var color = 'black';
  return (
    <View style={StyleSearchBar.container}>
      <View
        style={
          clicked
            ? StyleSearchBar.searchBar__clicked
            : StyleSearchBar.searchBar__unclicked
        }>

        {/* icone lupa */}
        {clicked && (
          <Pressable>
            <TouchableOpacity>
                <Feather
                  name="search"
                  size={20}
                  color='black'
                  style={{ marginLeft: 1 }}/>
            </TouchableOpacity>
          </Pressable>
        )}    
              
        {/* input */}
        <TextInput
          style={StyleSearchBar.input}
          placeholder={texto}
          value={searchPhrase}
          onChangeText={setSearchPhrase}
          onFocus={() => { setClicked(true); }}
        />
        {/* icone de X, serve para limpar o inputText */}
        {clicked && (
          <Entypo name="cross" size={20} color="black" style={{ padding: 1 }} onPress={() => {
              Keyboard.dismiss();
              setClicked(false);
              setSearchPhrase("")
          }}/>
        )}
      </View>
    </View>
  );
};

export default SearchBar;