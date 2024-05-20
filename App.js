import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Login from './components/screen/Free_access/login';
import Main from './components/screen/Free_access/Main';
import CreateAccountUser from './components/screen/Free_access/CreateAccountUser';

export default function App() {
  return (
    <View style={styles.container}>
      <CreateAccountUser/>
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
