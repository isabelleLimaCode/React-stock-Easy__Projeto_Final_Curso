import React, { useState } from 'react';
import { 
    View,
    Text,
    Image,
    TouchableOpacity,
    KeyboardAvoidingView,
    TextInput,
    Alert
} from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { getDoc, doc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../../../Services/Firebaseconfig';
import StyleCardStock from '../../../Styles/StyleCardStock';

export default function Teste({ onpress2, valor, nome, quant, image, changeColor, changeshadowColor, productId, onpressDelete }) {
    const [Changenumber, setChangenumber] = useState(quant);

    const updateItemQuantity = async (newQuantity) => {
        const userId = auth.currentUser.uid;
        const userRef = doc(db, userId, 'produtos');

        try {
            const userDoc = await getDoc(userRef);
            console.log('PRODUTO ANTES:', productId, userDoc.data());

            if (userDoc.exists()) {
                const produtos = userDoc.data().produtos || [];
                const updatedProdutos = produtos.map(produto => {
                    if (produto.codigodebarras.trim() === productId.trim()) {
                        console.log('Produto encontrado:', produto);
                        return { ...produto, quantidade: newQuantity };
                    }
                    return produto;
                });

                console.log('Produto depois:', updatedProdutos);

                await updateDoc(userRef, {
                    produtos: updatedProdutos
                });

                console.log('Item atualizado com sucesso!');
            } else {
                console.error('Erro: O documento do usuário não existe.');
            }
        } catch (error) {
            console.error('Erro ao atualizar o item:', error);
        }
    };

    const handleIncrement = () => {
        const newQuantity = Changenumber + 1;
        confirmUpdate(newQuantity);
    };

    const handleDecrement = () => {
        const newQuantity = Changenumber > 0 ? Changenumber - 1 : 0;
        confirmUpdate(newQuantity);
    };

    const confirmUpdate = (newQuantity) => {
        Alert.alert(
            'Alterar quantidade em stock',
            'Deseja realmente alterar?',
            [
                {
                    text: 'Sim',
                    onPress: async () => {
                        setChangenumber(newQuantity);
                        await updateItemQuantity(newQuantity);
                        Alert.alert('Alteração feita com sucesso!');
                    }
                },
                {
                    text: 'Não',
                },
            ],
            { cancelable: false }
        );
    };

    return (
        <KeyboardAvoidingView style={{ flex: 1, backgroundColor: '#fff' }}>
            <View style={{ alignSelf: 'center', marginTop: 10, marginBottom: 10 }}>
                <View style={[StyleCardStock.conteiner, { shadowColor: changeshadowColor ? changeshadowColor : '#000' }]}>
                    <Image style={StyleCardStock.img} source={{ uri: image }} />
                    <View style={{ alignItems: 'center' }}>
                        <View style={StyleCardStock.conteiner2} />
                        <Text style={StyleCardStock.text1}>{valor}€</Text>
                    </View>
                    <View style={StyleCardStock.conteiner3}>
                        <Text style={StyleCardStock.text2}>{nome}</Text>
                        <TextInput
                            style={{ fontWeight: 'bold', fontSize: 16, color: changeColor ? changeColor : '#547c96' }}
                            value={Changenumber.toString()}
                            onChangeText={(text) => {
                                const parsedNumber = parseInt(text) || 0;
                                setChangenumber(parsedNumber);
                            }}
                        />
                        <TouchableOpacity onPress={handleDecrement} style={{ left: 10 }}>
                            <Ionicons name="remove-circle" size={26} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleIncrement} style={{ left: 15 }}>
                            <Ionicons name="add-circle-sharp" size={26} />
                        </TouchableOpacity>
                        <TouchableOpacity style={{ left: 30 }} onPress={onpress2}>
                            <FontAwesome5 name="edit" size={24} color="black" />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={{ top: -90, left: 10 }} onPress={onpressDelete}>
                        <Ionicons name="trash-sharp" size={24} color="red" />
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}
