import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';

const CardProduto2 = ({ nome, valor, imagem, onpress1, onpress2, quant }) => {
    const [quantidadeSelecionada, setQuantidadeSelecionada] = useState(quant || 0);

    const incrementarQuantidade = () => {
        setQuantidadeSelecionada(quantidadeSelecionada + 1);
    };

    const decrementarQuantidade = () => {
        if (quantidadeSelecionada > 1) {
            setQuantidadeSelecionada(quantidadeSelecionada - 1);
        }
    };

    return (
        <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#ffff',
            width: 348,
            height: 86,
            alignSelf: 'center',
            borderRadius: 10,
            marginBottom: 10,
            paddingHorizontal: 10
        }}>
            <Image source={{ uri: imagem }} style={{ width: 70, height: 70, borderRadius: 12 }} />

            <View style={{ flex: 1, marginLeft: 10 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{nome}</Text>
                <Text>Valor: {valor}€</Text>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity onPress={decrementarQuantidade}>
                    <Ionicons name="remove-circle" size={26} color="black" />
                </TouchableOpacity>

                <Text style={{ marginHorizontal: 10 }}>{quantidadeSelecionada}</Text>

                <TouchableOpacity onPress={incrementarQuantidade}>
                    <Ionicons name="add-circle-sharp" size={26} color="black" />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => onpress1(quantidadeSelecionada)} style={{ marginLeft: 10 }}>
                    <Feather name="plus" size={26} color='#7cb4c4' />
                </TouchableOpacity>

                <TouchableOpacity onPress={onpress2} style={{ marginLeft: 10 }}>
                    <Ionicons name="trash-sharp" size={26} color='#7cb4c4' />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default CardProduto2;
