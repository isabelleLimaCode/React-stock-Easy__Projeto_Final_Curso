import React, { useEffect, useState } from 'react';
import { 
    Text, 
    View,
    Image,
    TouchableOpacity,
    SafeAreaView,
    KeyboardAvoidingView,
    ScrollView,
    FlatList,
    RefreshControl,
    Platform,
    Alert,
    ActivityIndicator,
    StyleSheet
} from 'react-native';
import StyleNewProduct from '../../../Styles/StyleNewProduct';
import SearchBar from '../SearchBar/SearchBar';
import StyleCardObj from '../../../Styles/StyleCardObj';
import { AntDesign } from '@expo/vector-icons';
import CardRelatorio from '../Card/CardRelatorio';
import { db, auth } from '../../../Services/Firebaseconfig';
import { collection, getDocs } from 'firebase/firestore';
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';
import * as FileSystem from 'expo-file-system';

export default function Relatorio({ navigation }) {
    const behavior = Platform.OS === 'ios' ? 'padding' : 'height';

    // Search bar
    const [Donthave, setDonthave] = useState(false);
    const [clicked, setClicked] = useState(false);
    const [searchPhrase, setSearchPhrase] = useState("");
    const [refreshing, setRefreshing] = useState(false);
    const [relatorios, setRelatorios] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isSharing, setIsSharing] = useState(false);

    useEffect(() => {
        fetchRelatorios();
    }, []);

    const fetchRelatorios = async () => {
        try {
            const user = auth.currentUser;
            const relatoriosRef = collection(db, user.uid, 'Relatorio', 'RelatoriosGerados');
            const querySnapshot = await getDocs(relatoriosRef);
            const relatoriosList = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setRelatorios(relatoriosList);
            setFilteredData(relatoriosList);
            setDonthave(relatoriosList.length === 0);
        } catch (error) {
            console.error('Erro ao buscar relatórios:', error);
            Alert.alert('Erro', 'Erro ao buscar relatórios');
        }
    };

    const onRefresh = async () => {
        setRefreshing(true);
        await fetchRelatorios();
        setRefreshing(false);
    };

    const handleViewPDF = async (pdfUri) => {
        setLoading(true);
        try {
            const uri = await FileSystem.getContentUriAsync(pdfUri);
            await Print.printAsync({ uri });
        } catch (error) {
            Alert.alert('Erro', 'PDF não disponível para visualização.');
        } finally {
            setLoading(false);
        }
    };

    const handleSharePDF = async (pdfUri) => {
        setIsSharing(true);
        try {
            await shareAsync(pdfUri);
        } catch (error) {
            Alert.alert('Erro', 'Erro ao compartilhar o PDF');
        } finally {
            setIsSharing(false);
        }
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => handleViewPDF(item.pdfUri)}>
            <CardRelatorio 
                nEncomenda={item.venda.codVenda} 
                onpress1={() => handleSharePDF(item.pdfUri)} 
            />
        </TouchableOpacity>
    );

    const handleSearch = (text) => {
        setSearchPhrase(text);
        const filtered = relatorios.filter((item) =>
            item.venda.codVenda.toString().startsWith(text.trim())
        );
        setFilteredData(filtered);
    };

    return (
        <KeyboardAvoidingView behavior={behavior} style={{ flex: 1, backgroundColor: '#fff' }}>
            <View>
                <Text style={StyleCardObj.text2}> Relatório </Text>
            </View>
            
            <SafeAreaView style={StyleCardObj.root}>
                <SearchBar
                    searchPhrase={searchPhrase}
                    setSearchPhrase={handleSearch}
                    clicked={clicked}
                    setClicked={setClicked}
                />
            </SafeAreaView>

            {Donthave ? (
                <ScrollView
                    style={{ backgroundColor: '#fff', marginTop: 10 }}
                    refreshControl={
                        <RefreshControl
                            style={{ position: 'absolute', alignSelf: 'center', color: '#059669' }}
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                >
                    <View>
                        <Image 
                            style={{ 
                                width: 250, 
                                height: 250,
                                alignSelf: 'center',
                                marginTop: 50
                            }} 
                            source={require('./../../../assets/Data.gif')} 
                        />
                        <Text style={{
                            textAlign: 'center',
                            fontWeight: 'bold',
                            fontSize: 20,
                            marginTop: 30
                        }}>Ops! Não há relatórios</Text>
                    </View>
                </ScrollView>
            ) : (
                <FlatList
                    data={filteredData.length === 0 ? relatorios : filteredData}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                />
            )}

            {loading && (
                <View style={styles.loading}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            )}

            {isSharing && (
                <View style={styles.loading}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            )}
        
            <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => navigation.navigate('CriarRelatorio')}>
                <View style={[StyleCardObj.conteiner3, StyleNewProduct.buttonnew]}>
                    <Text style={[StyleNewProduct.text2, { marginHorizontal: 85, top: 2 }]}>Adicionar Relatório</Text>
                    <AntDesign style={{ top: -10, marginHorizontal: 10, right: 3, top: 1, right: 40 }} name="pluscircle" size={24} color="black" />
                </View>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    loading: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        zIndex: 1,
    },
});
