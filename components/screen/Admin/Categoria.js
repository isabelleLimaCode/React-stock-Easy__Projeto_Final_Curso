import React, { useEffect, useState } from 'react';
import { 
    Text, 
    View,
    TouchableOpacity,
    FlatList,
    Alert,
    Modal,
    TextInput,
    Keyboard
} from 'react-native';
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';

// Seus estilos importados (supondo que estes arquivos de estilo existam e estejam corretamente configurados)
import StyleCardObj from '../../../Styles/StyleCardObj';
import StylesCategoria from '../../../Styles/StylesCategoria';
import StyleNewProduct from '../../../Styles/StyleNewProduct';
import StyleCreateAccount from '../../../Styles/StyleCreateAccount';
import stylemain from '../../../Styles/Stylemain';

const data = [
    { id: '0', name: 'MULHER', icon: 'right', style1: StylesCategoria.text2, icon2: 'human-female', style2: StylesCategoria.icon1 },
    { id: '1', name: 'HOMEM', icon: 'right', style1: StylesCategoria.text2, icon2: 'human-male', style2: StylesCategoria.icon1 },
    { id: '2', name: 'CRIANÇA', icon: 'right', style1: StylesCategoria.text2, icon2: 'baby-carriage', style2: StylesCategoria.icon1 },
    { id: '3', name: 'CASA', icon: 'right', style1: StylesCategoria.text2, icon2: 'home', style2: StylesCategoria.icon3 },
    { id: '4', name: 'ENTRETENIMENTO', icon: 'right', style1: StylesCategoria.text2, icon2: 'cards-playing', style2: StylesCategoria.icon2 },
    { id: '5', name: 'ANIMAIS', icon: 'right', style1: StylesCategoria.text2, icon2: 'dog', style2: StylesCategoria.icon1 },
    { id: '6', name: 'TECNOLOGIA', icon: 'right', style1: StylesCategoria.text2, icon2: 'dog', style2: StylesCategoria.icon1 }
];

export default function Categoria({ navigation, route }) {
    const [modalVisible2, setModalVisible2] = useState(false);
    const [datacategory, setdatacategory] = useState([]);
    const [selectcategoria, setselectCateoria] = useState('');
    const [ChangeCategory, setchangeCategory] = useState(false);
    const [currentData, setCurrentData] = useState(data);
    const [soma, setSoma] = useState(0);

    const handleItemPress = (index) => {
        setSoma(0);
        let nomeItem = data[index].name;
        navigation.navigate('nextcategory', { passadata: nomeItem, passaindex: index });
    };

    useEffect(() => {
        console.log('valor soma ', soma);
    });

    const RenderItem = ({ item, index }) => (
        <View key={item.id}> 
            <TouchableOpacity style={StylesCategoria.button} onPress={() => handleItemPress(index)}>
                <View style={StylesCategoria.container}>
                    <MaterialCommunityIcons style={item.style2} name={item.icon2} size={35} color="black" />
                    <Text style={item.style1}>{item.name}</Text>
                    <AntDesign style={StylesCategoria.icon} name={item.icon} size={25} color="white" />
                </View>
            </TouchableOpacity>
        </View>
    );

    const handlechangeCategoria = (text) => {
        setselectCateoria(text);
    };

    const adicionarCategoria = () => {
        if (selectcategoria.trim() !== '') {
            setdatacategory(prevCategories => [...prevCategories, { nome: selectcategoria }]);
            setselectCateoria('');
        }
    };

    const handleEnviarPedido = () => {
        Alert.alert(
            'Criar Categoria',
            'Categoria criada com sucesso',
            [
                {
                    text: 'OK',
                    onPress: async () => {
                        setModalVisible2(!modalVisible2);
                    },
                },
            ],
            { cancelable: false }
        );
    };

    return (
        <View style={{ backgroundColor: '#fff', flex: 1}}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <AntDesign style={{ left: 10, top: 10 }} name="back" size={24} color="black" />
            </TouchableOpacity>
            <View>
                <Text style={StyleCardObj.text2}>Categoria</Text>
            </View>

            {/* Model alterar telemovel*/}
            <View>
                <View style={StyleCreateAccount.div}>
                    <View style={StyleCreateAccount.centeredView}>
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={modalVisible2}
                            onRequestClose={() => {
                                Alert.alert('Modal has been closed.');
                                setModalVisible2(!modalVisible2);
                            }}>
                            <View style={StyleCreateAccount.centeredView}>
                                <View style={[StyleCreateAccount.modalView, {
                                    backgroundColor: '#f4f3ee',
                                    borderRadius: 50,
                                    width: 356,
                                    height: 200,
                                    top: -300
                                }]}>
                                    <View style={{ top: -20 }}>
                                        <Text style={{ color: '#000', alignSelf: 'center', fontSize: 18, fontWeight: 'bold' }}>Nova categoria</Text>
                                        <TextInput
                                            style={[
                                                stylemain.input,
                                                {
                                                    width: 327, height: 40,
                                                    backgroundColor: '#000',
                                                    color: '#fff'
                                                }]}
                                            placeholder="Insira a categoria desejada"
                                            onPress={Keyboard.dismiss}
                                            onChangeText={handlechangeCategoria}
                                            value={selectcategoria}
                                        />
                                    </View>
                                    <TouchableOpacity
                                        style={[StyleCreateAccount.conteinerbtn, { top: 8 }]} onPress={handleEnviarPedido}>
                                        <Text style={{ color: '#000000', fontWeight: 'bold' }}> Enviar</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Modal>
                    </View>
                </View>
            </View>
            {/* fim Model alterar telemovel */}

            <FlatList
                data={currentData}
                renderItem={RenderItem}
                keyExtractor={item => item.id}
            />
            {ChangeCategory && (
                <TouchableOpacity style={StyleNewProduct.buttonnew} onPress={() => setModalVisible2(!modalVisible2)}>
                    <Text style={[StyleNewProduct.text2, { marginHorizontal: 100 }]}>Criar Categoria</Text>
                </TouchableOpacity>
            )}
        </View>
    );
}
