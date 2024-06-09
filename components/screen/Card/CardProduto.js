import React, { useState, useEffect, useRef } from 'react';
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

export default function Teste({ onpress2, valor, nome, quant, image, changeColor, changeshadowColor, productId ,onpressDelete}) {
    const [Changenumber, setChangenumber] = useState(quant);
    const previousChangenumberRef = useRef(quant);

    useEffect(() => {
        previousChangenumberRef.current = Changenumber;
    }, [Changenumber]);

    const updateItemQuantity = async (productId, newQuantity) => {
        const userId = auth.currentUser.uid;
        const userRef = doc(db, userId, 'produtos');

        try {
            const userDoc = await getDoc(userRef);
            console.log('PRODUTO ANTES:', productId);

            if (userDoc.exists()) {
                const produtos = userDoc.data().produtos || [];
                const updatedProdutos = produtos.map(produto => {
                    if (produto.nome === productId.nome) {
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
        setChangenumber(prev => prev + 1);
    };

    const handleDecrement = () => {
        setChangenumber(prev => (prev > 0 ? prev - 1 : 0));
    };

    const handlePressOut = () => {
        Alert.alert(
            'Alterar quantidade em stock',
            'Deseja realmente alterar?',
            [
                {
                    text: 'Sim',
                    onPress: async () => {
                        await updateItemQuantity(productId, previousChangenumberRef.current);
                        await new Promise((resolve) => {
                          setTimeout(resolve, 500); 
                        });
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
                        <TouchableOpacity onPress={handleDecrement} style={{ left: 10 }} onPressOut={handlePressOut}>
                            <Ionicons name="remove-circle" size={26} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleIncrement} style={{ left: 15 }} onPressOut={handlePressOut}>
                            <Ionicons name="add-circle-sharp" size={26} />
                        </TouchableOpacity>
                        <TouchableOpacity style={{ left: 30 }} onPress={onpress2}>
                            <FontAwesome5 name="edit" size={24} color="black" />
                        </TouchableOpacity>
                       
                    </View>
                    <TouchableOpacity style={{top:-90,left:10}} onPress={onpressDelete}>
                        <Ionicons name="trash-sharp" size={24} color="red" />
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}
