import React, { useEffect, useState } from 'react';
import { 
    View,
    Text,
    KeyboardAvoidingView,
    TouchableOpacity,
    Modal,
    Image,
    RefreshControl,
    Platform,
    FlatList
} from 'react-native';
import StyleCardObj from '../../../Styles/StyleCardObj';
import CardEstatistica from '../Card/CardEstatistica';
import { BarChart } from 'react-native-gifted-charts';
import { Picker } from '@react-native-picker/picker';
import stylemain from '../../../Styles/Stylemain';
import { db, auth } from '../../../Services/Firebaseconfig';
import { doc, getDoc } from 'firebase/firestore';

export default function Estatistica() {
    const [selectedMonth, setSelectedMonth] = useState('Janeiro');
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString());
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisibleYear, setModalVisibleYear] = useState(false);
    const [donthavedata, setDonthavedata] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [vendasSaida, setVendasSaida] = useState([]);
    const [barColors, setBarColors] = useState([]);

    const months = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
    ];

    const years = [];
    for (let i = new Date().getFullYear(); i >= 2000; i--) {
        years.push(i.toString());
    }

    const toggleModal = () => {
        setModalVisible(!modalVisible);
    };

    const toggleModalYear = () => {
        setModalVisibleYear(!modalVisibleYear);
    };

    const onRefresh = React.useCallback(async () => {
        setRefreshing(true);
        await fetchVendasSaida();
        setRefreshing(false);
    }, [selectedMonth, selectedYear]);

    useEffect(() => {
        fetchVendasSaida();
    }, [selectedMonth, selectedYear]);

    const fetchVendasSaida = async () => {
        try {
            const user = auth.currentUser;
            const vendasSaidaRef = doc(db, user.uid, 'vendasSaida');
            const vendasSaidaDoc = await getDoc(vendasSaidaRef);

            if (vendasSaidaDoc.exists()) {
                const vendaSaidaData = vendasSaidaDoc.data();
                const vendSaidaLista = vendaSaidaData.Venda || [];
                const filteredVendas = vendSaidaLista.filter(venda => {
                    const [day, month, year] = venda.datadaEncomenda.split('-');
                    const vendaMonth = months[parseInt(month, 10) - 1];
                    return vendaMonth === selectedMonth && year === selectedYear;
                });
                const distinctColors = generateDistinctColors(filteredVendas.length);
                setVendasSaida(filteredVendas);
                setBarColors(distinctColors);
                setDonthavedata(filteredVendas.length === 0);
                console.log('Vendas de saída:', filteredVendas);
            } else {
                console.log('Documento de vendas de saída não encontrado');
                setDonthavedata(true);
            }
        } catch (error) {
            console.error('Erro ao buscar vendas de saída:', error);
            setDonthavedata(true);
        }
    };

    const generateDistinctColors = (numColors) => {
        const baseColors = ['#FF6347', '#4682B4', '#FFD700', '#ADFF2F', '#FF69B4', '#8A2BE2'];
        const colors = [];
        for (let i = 0; i < numColors; i++) {
            colors.push(baseColors[i % baseColors.length]);
        }
        return colors;
    };

    const behavior = Platform.OS === 'ios' ? 'padding' : 'height';

    const renderLegendaItem = ({ item, index }) => (
        <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 15 }}>
            <View style={{ width: 20, height: 20, backgroundColor: barColors[index], marginRight: 5 }} />
            <Text>{`Venda ${item.codVenda}`}</Text>
        </View>
    );

    return (
        <KeyboardAvoidingView behavior={behavior} style={{ backgroundColor: '#fff', flex: 1 }}>
            <View>
                <Text style={StyleCardObj.text2}>Balanço</Text>
            </View>
            
            <View style={{ flex: 1 }}>
                <View style={{ marginBottom: 10 }}>
                    <Text style={{ fontWeight: 'bold', top: 10, marginLeft: 20 }}>Selecione um mês: </Text>
                    <TouchableOpacity style={[stylemain.input, { top: 10 }]} onPress={toggleModal}>
                        <Text>{selectedMonth}</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ marginBottom: 10 }}>
                    <Text style={{ fontWeight: 'bold', top: 10, marginLeft: 20 }}>Selecione um ano: </Text>
                    <TouchableOpacity style={[stylemain.input, { top: 10 }]} onPress={toggleModalYear}>
                        <Text>{selectedYear}</Text>
                    </TouchableOpacity>
                </View>

                <Modal
                    animationType='slide'
                    transparent={true}
                    visible={modalVisible}
                >
                    <View style={{ flex: 1, alignContent: 'center', justifyContent: 'center', left: -10 }}>
                        <View style={{
                            margin: 20,
                            backgroundColor: '#fff',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 20,
                            padding: 20,
                            width: '95%',
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.25,
                            shadowRadius: 4,
                            elevation: 5
                        }}>
                            <Picker
                                style={{ width: '100%' }}
                                selectedValue={selectedMonth}
                                onValueChange={(itemValue, itemIndex) => {
                                    setSelectedMonth(itemValue);
                                    toggleModal();
                                }}
                            >
                                {months.map((month, index) => (
                                    <Picker.Item key={index} label={month} value={month} />
                                ))}
                            </Picker>
                        </View>
                    </View>
                </Modal>

                <Modal
                    animationType='slide'
                    transparent={true}
                    visible={modalVisibleYear}
                >
                    <View style={{ flex: 1, alignContent: 'center', justifyContent: 'center', left: -10 }}>
                        <View style={{
                            margin: 20,
                            backgroundColor: '#fff',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 20,
                            padding: 20,
                            width: '95%',
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.25,
                            shadowRadius: 4,
                            elevation: 5
                        }}>
                            <Picker
                                style={{ width: '100%' }}
                                selectedValue={selectedYear}
                                onValueChange={(itemValue, itemIndex) => {
                                    setSelectedYear(itemValue);
                                    toggleModalYear();
                                }}
                            >
                                {years.map((year, index) => (
                                    <Picker.Item key={index} label={year} value={year} />
                                ))}
                            </Picker>
                        </View>
                    </View>
                </Modal>

                {donthavedata ? (
                    <View style={{ backgroundColor: '#fff', flex: 1 }}>
                        <Image style={{ width: 250, height: 250, marginBottom: 10, alignSelf: 'center', marginTop: 100 }} source={require('./../../../assets/estatistica.png')} />
                        <Text style={{
                            textAlign: 'center',
                            fontWeight: '800',
                            fontSize: 20,
                        }}>
                            Ops! Não há dados suficientes para Visualizar o balanço
                        </Text>
                    </View>
                ) : (
                    <View style={{ flex: 1 }}>
                        <View
                            style={{
                                backgroundColor: '#fff',
                                paddingBottom: 20,
                                borderRadius: 10,
                                marginBottom: 10,
                                width: '95%',
                                alignSelf: 'center'
                            }}
                        >
                            <BarChart
                                data={vendasSaida.map((venda, index) => ({
                                    value: venda.produtos.reduce((sum, prod) => sum + parseFloat(prod.valorvenda), 0),
                                    label: `Venda ${venda.codVenda}`,
                                    frontColor: barColors[index],
                                }))}
                                barWidth={30}
                                spacing={10}
                                roundedTop={false}
                                roundedBottom={false}
                                xAxisThickness={2}
                                yAxisThickness={2}
                                yAxisTextStyle={{ color: 'black', fontSize: 10 }}
                                noOfSections={4}
                                maxValue={Math.max(...vendasSaida.map(venda => venda.produtos.reduce((sum, prod) => sum + parseFloat(prod.valorvenda), 0))) + 20}
                                backgroundColor='#fff'
                                showVerticalLines={false}
                                xAxisLabelTextStyle={{ rotation: 45, fontSize: 10, yOffset: 10 }}
                            />
                        </View>

                        <View style={{ marginHorizontal: 20, marginBottom: 10 }}>
                            <FlatList
                                data={vendasSaida}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={renderLegendaItem}
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
                            />
                        </View>

                        <FlatList
                            data={vendasSaida}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item, index }) => (
                                <CardEstatistica
                                    key={index}
                                    color={barColors[index]}
                                    label={`Encomenda nº${item.codVenda}`}
                                    value={`${item.produtos.reduce((sum, prod) => sum + parseFloat(prod.valorvenda), 0)}`}
                                />
                            )}
                            contentContainerStyle={{ paddingBottom: 20 }}
                        />
                    </View>
                )}
            </View>
        </KeyboardAvoidingView>
    );
}
