import React, { useEffect, useState } from 'react';
import { 
    Text, 
    View,
    TouchableOpacity,
    SafeAreaView,
    FlatList,
    Image,
    Alert
} from 'react-native';
import StyleVenda from '../../../Styles/StyleVenda';
import SearchBar from '../SearchBar/SearchBar';
import StyleCardObj from '../../../Styles/StyleCardObj';
import CardEncomenda from '../Card/CardEncomenda';
import { db, auth } from '../../../Services/Firebaseconfig';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';

export default function Vendas({ navigation, route }) {
  const [SelectedButton, SetSelectedButton] = useState(1);
  const [nEncomenda, setNEncomenda] = useState(route.params?.nEncomenda);
  const [data1, setData1] = useState([]);
  const [dataSaida, setDataSaida] = useState([]);
  const [Nvendas, setNvendas] = useState(false);
  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);
  const [SelectEntrada, SetSelectedEntrada] = useState(1);
  const [SelectSaida, SetSelectedSaida] = useState(0);

  useEffect(() => {
    const user = auth.currentUser;
    const vendasRef = doc(db, user.uid, 'Vendas');
    const unsubscribe = onSnapshot(vendasRef, (vendasDoc) => {
      fetchProdutos();
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (SelectedButton === 2) {
      fetchVendasSaida();
    }
  }, [SelectedButton]);

  const fetchProdutos = async () => {
    try {
      const user = auth.currentUser;
      const vendasRef = doc(db, user.uid, 'Vendas');
      const vendasDoc = await getDoc(vendasRef);

      if (vendasDoc.exists()) {
        const vendaData = vendasDoc.data();
        const vendLista = vendaData.Venda || [];
        setData1(vendLista);
        setNvendas(false);
      } else {
        console.log('Documento de vendas não encontrado');
        Alert.alert('Erro', 'Documento de vendas não encontrado');
        setNvendas(true);
      }
    } catch (error) {
      console.error('Erro ao buscar vendas:', error);
      Alert.alert('Erro', 'Erro ao buscar vendas');
    }
  };

  const fetchVendasSaida = async () => {
    try {
      const user = auth.currentUser;
      const vendasSaidaRef = doc(db, user.uid, 'vendasSaida');
      const vendasSaidaDoc = await getDoc(vendasSaidaRef);

      if (vendasSaidaDoc.exists()) {
        const vendaSaidaData = vendasSaidaDoc.data();
        const vendSaidaLista = vendaSaidaData.Venda || [];
        setDataSaida(vendSaidaLista);

        if (vendSaidaLista.length === 0) {
          setNvendas(true);
        } else {
          setNvendas(false);
        }
      } else {
        console.log('Documento de vendas de saída não encontrado');
        Alert.alert('Erro', 'Documento de vendas de saída não encontrado');
        setNvendas(true);
      }
    } catch (error) {
      console.error('Erro ao buscar vendas de saída:', error);
      Alert.alert('Erro', 'Erro ao buscar vendas de saída');
    }
  };

  const handleSearch = (text) => {
    setSearchPhrase(text);
    if (SelectedButton === 1) {
      const filtered = data1.filter((item) =>
        item.codVenda.toString().startsWith(text.trim())
      );
      setData1(filtered);
    } else {
      const filtered = dataSaida.filter((item) =>
        item.codVenda.toString().startsWith(text.trim())
      );
      setDataSaida(filtered);
    }
  };

  const btn1selecionado = () => {
    SetSelectedButton(1);
    SetSelectedEntrada(1);
    SetSelectedSaida(0);
    fetchProdutos();
  };

  const btn2selecionado = () => {
    SetSelectedButton(2);
    SetSelectedEntrada(0);
    SetSelectedSaida(1);
    fetchVendasSaida();
  };

  return (
    <View style={{ backgroundColor: '#fff', flex: 1 }}>
      <SafeAreaView style={StyleCardObj.root}>
        <SearchBar
          searchPhrase={searchPhrase}
          setSearchPhrase={handleSearch}
          clicked={clicked}
          setClicked={setClicked}
        />
      </SafeAreaView>

      <View style={StyleVenda.btnContainerBest}>
        <TouchableOpacity
          style={[StyleVenda.btnBest, SelectedButton === 1 ? StyleVenda.selectedBtnBetst : null]}
          onPress={btn1selecionado}>
          <Text style={[StyleVenda.buttonText, SelectedButton === 1 ? StyleVenda.selectedBtnbuttonText : null]}>Entrada</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[StyleVenda.btnBest, SelectedButton === 2 ? StyleVenda.selectedBtnBetst : null]}
          onPress={btn2selecionado}>
          <Text style={[StyleVenda.buttonText, SelectedButton === 2 ? StyleVenda.selectedBtnbuttonText : null]}>Saída</Text>
        </TouchableOpacity>
      </View>

      {SelectEntrada === 1 ? (
        <FlatList
          data={data1}
          keyExtractor={(item) => item.codVenda.toString()}
          renderItem={({ item }) => (
            <CardEncomenda
              estado={item.estadoVenda}
              encomenda={item.codVenda}
              onPress={() => navigation.navigate('EditarEncomenda', { nEncomenda: item.codVenda, DadosEncomenda: item.produtos, DadosCliente: item.nomeCliente, dataencomeda: item.datadaEncomenda })}
              onpress2={() => navigation.navigate('visualizarEncomenda', { nEncomenda: item.codVenda, DadosEncomenda: item.produtos, DadosCliente: item.nomeCliente, dataencomeda: item.datadaEncomenda })}
            />
          )}
        />
      ) : null}

      {Nvendas === true && SelectSaida === 2 ? (
        <View style={{ marginBottom: 150 }}>
          <Image style={{ width: 250, height: 250, alignSelf: 'center' }} source={require('./../../../assets/NaohaVendas.png')} />
          <Text style={{
            textAlign: 'center',
            fontWeight: '800',
            fontSize: 20,
            marginTop: 10
          }}>
            Ops! Não há Vendas
          </Text>
        </View>
      ) : null}

      {SelectSaida === 1 ? (
        <FlatList
          data={dataSaida}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <CardEncomenda
              estado={item.estadoEnc}
              encomenda={item.codVenda}
              onpress2={() => navigation.navigate('visualizarEncomenda', { nEncomenda: item.codVenda })}
            />
          )}
        />
      ) : null}

      {Nvendas === true && SelectSaida === 1 ? (
        <View style={{ marginBottom: 150 }}>
          <Image style={{ width: 250, height: 250, alignSelf: 'center' }} source={require('./../../../assets/NaohaVendas.png')} />
          <Text style={{
            textAlign: 'center',
            fontWeight: '800',
            fontSize: 20,
            marginTop: 10
          }}>
            Ops! Não há Vendas
          </Text>
        </View>
      ) : null}
    </View>
  );
}
