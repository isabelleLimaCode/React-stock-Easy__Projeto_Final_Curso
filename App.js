import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import CriarRelatorio from './components/screen/Admin/CriarRelatorio';
import CriarVenda from './components/screen/Admin/CriarVenda';
import Discont from './components/screen/Admin/Discont';
import EditarCliente from './components/screen/Admin/EditarCliente';
import EditarConta from './components/screen/Admin/EditarConta';
import Estatistica from './components/screen/Admin/Estatistica';
import FinalizarEncomenda from './components/screen/Admin/FinalizarEncomenda';


export default function App() {
  return (
    <View style={styles.container}>
      <FinalizarEncomenda/>
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
