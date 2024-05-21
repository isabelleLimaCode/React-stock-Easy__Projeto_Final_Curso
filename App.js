import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';


import ModificarEncomenda from './components/screen/Admin/ModificarEncomenda';
import ModoFerias from './components/screen/Admin/ModoFerias';
import NewProduct from './components/screen/Admin/NewProduct';
import Notificação from './components/screen/Admin/Notificacao';
import Objetivos from './components/screen/Admin/objetivos';
import Order from './components/screen/Admin/Order';
import Pesquisa from './components/screen/Admin/Pesquisa';
import PrepararEncomenda from './components/screen/Admin/PreparaEncomenda';
import Produto from './components/screen/Admin/Produtos';
import Promocao from './components/screen/Admin/Promoção';
import Relatorio from './components/screen/Admin/Relatorio';
import Scan from './components/screen/Admin/Scan';
import Stock from './components/screen/Admin/Stock';
import Vendas from './components/screen/Admin/Vendas';
import VendasMarckplace from './components/screen/Admin/VendasMarckplace';
import Chat from './components/screen/Admin/Support';


export default function App() {
  return (
    <View style={styles.container}>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
