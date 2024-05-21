import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';


import ModificarEncomenda from './components/screen/Admin/ModificarEncomenda';
import ModoFerias from './components/screen/Admin/ModoFerias';


export default function App() {
  return (
    <View style={styles.container}>
      <ModoFerias/>
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
