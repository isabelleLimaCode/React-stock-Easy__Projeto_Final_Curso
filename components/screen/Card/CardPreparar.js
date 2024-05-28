import React, { useEffect, useState } from 'react';
import { 
    View,
    Text,
    Image,
    StyleSheet,
    Modal,
    Pressable,
    Button,
    TouchableOpacity,
    Alert
} from 'react-native';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import StyleCardObj from '../../../Styles/StyleCardObj';
import StyleCreateAccount from '../../../Styles/StyleCreateAccount';
import { BarCodeScanner } from 'expo-barcode-scanner';

const CardPreparar = ({ nome, uri, onCheckChange, DadosEncomenda2 }) => {
    const [Modal3visibile, Setmodal3visibile] = useState(false);
    const [ischeck, setischeck] = useState(false);
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [Nscan, setNscan] = useState();
    const [Modal6visibile, Setmodal6visibile] = useState(false);

    useEffect(() => {
        const getBarCodeScannerPermissions = async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        };
        getBarCodeScannerPermissions();
    }, []);

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        setNscan(data);

        const produtoEncontrado = DadosEncomenda2.find(item => item.codigodebarras === data);
        if (produtoEncontrado) {
            console.log('Produto encontrado:', produtoEncontrado);
            setischeck(true);
            onCheckChange && onCheckChange(true);
        } else {
            console.log('Produto não encontrado na base de dados');
            Alert.alert('Erro', 'Produto não encontrado na base de dados!');
            setischeck(false);
            onCheckChange && onCheckChange(false);
        }
        Setmodal6visibile(false);
    };

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    const handleCheckChange = () => {
        Setmodal3visibile(false);
        Setmodal6visibile(true);
    };

    return (
        <View style={styles.container}>
            <Image style={StyleCardObj.img} source={{ uri: uri }} />
            <View style={styles.contentContainer}>
                <Text style={[styles.name, { alignSelf: 'center' }]}>{nome}</Text>
                <TouchableOpacity onPress={handleCheckChange}>
                    <MaterialCommunityIcons 
                        style={{ marginTop: 10, alignSelf: 'center' }} 
                        name="barcode-scan" 
                        size={30} 
                        color="black" 
                    />
                </TouchableOpacity>

                {/* Modal para scan */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={Modal6visibile}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                        Setmodal6visibile(false);
                    }}>
                    <View style={StyleCreateAccount.centeredView}>
                        <View style={[StyleCreateAccount.modalView, {
                            backgroundColor: '#f4f3ee',
                            borderRadius: 50,
                            width: 356,
                            height: 400,
                            top: -300
                        }]}>
                            <Text style={{ color: '#000', alignSelf: 'center', fontSize: 18, fontWeight: 'bold', top: 10 }}>Scan</Text>
                            <View style={{ top: -20, width: 200, height: 200, top: 20 }}>
                                <BarCodeScanner
                                    onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                                    style={StyleSheet.absoluteFillObject}
                                />
                                <View style={{ top: 100 }}>
                                    {scanned && (
                                        <View>
                                            <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />
                                        </View>
                                    )}
                                </View>
                                <Text style={{
                                    top: 160,
                                    marginTop: 5,
                                    fontWeight: 'bold'
                                }}>Código de barras: {Nscan}</Text>
                            </View>
                        </View>
                    </View>
                </Modal>
                {/* Fim Modal para scan */}

                <TouchableOpacity>
                    <MaterialIcons 
                        style={{ alignSelf: 'flex-end' }}
                        name={ischeck ? "check-box" : "check-box-outline-blank"} 
                        size={24} 
                        color={ischeck ? "green" : "black"} 
                    />      
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        paddingHorizontal: 20,
        flexDirection: 'row',
    },
    contentContainer: {
        flex: 1,
        marginLeft: 10,
    },
    image: {
        width: '40%',
        aspectRatio: 1,
    },
    name: {
        fontWeight: '500',
        fontSize: 18,
    },
    size: {
        fontSize: 16,
        color: 'gray',
    },
    quantity: {
        marginHorizontal: 10,
        fontWeight: 'bold',
        color: 'gray',
    },
    footer: {
        marginTop: 'auto',
        flexDirection: 'row',
        alignItems: 'center',
    },
    itemTotal: {
        fontSize: 16,
        marginLeft: 'auto',
        fontWeight: '500',
    },
});

export default CardPreparar;
