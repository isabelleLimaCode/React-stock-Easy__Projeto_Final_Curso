import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Concluido from './components/screen/Admin/Concluido';
import ConcluidoProduto from './components/screen/Admin/ConcluidoProduto';
import ConfirmarPagamento from './components/screen/Admin/ConfirmarPagament';
import Conta from './components/screen/Admin/Conta';
import CriarCatalogo from './components/screen/Admin/CriarCatalogo';
import CriarCliente from './components/screen/Admin/CriarCliente';
import CriarRelatorio from './components/screen/Admin/CriarRelatorio';


export default function App() {
  return (
    <View style={styles.container}>
      <CriarRelatorio/>
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
