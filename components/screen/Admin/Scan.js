import React, { useEffect, useState } from 'react';
import { 
    Text, 
    View,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    Dimensions,
    StyleSheet,
    TouchableWithoutFeedback,
    Modal,
    Button,
    Alert,
    FlatList
    
} from 'react-native';

import {BarCodeScanner} from 'expo-barcode-scanner'
import CardProduto from '../Card/CardProduto';
import { db ,auth} from '../../../Services/Firebaseconfig';
import { getDoc,doc, collection, getDocs } from 'firebase/firestore';
const Scan = ({navigation}) => {
 
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [showCardScan, setShowCardScan] = useState(false);
  const [Nscan,setNscan] = useState();
  const [data1,setdata1] = useState();

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  
  useEffect(()=>{
    const fetchProdutos = async () => {
      try {
          const user = auth.currentUser;
          const produtosRef = doc(db, user.uid, 'produtos');
          const produtosDoc = await getDoc(produtosRef);

          if (produtosDoc.exists()) {
            const produtosData = produtosDoc.data();
            const produtos = produtosData.produtos || [];
            console.log('scan',Nscan);
            const produtoExistente = produtos.filter(p => p.codigodebarras === Nscan);
            console.log('produto pesquisado',produtoExistente);
            setdata1(produtoExistente);
          } else {
              console.log('Documento de produtos não encontrado');
              Alert.alert('Erro', 'Documento de produtos não encontrado');
          }
      } catch (error) {
          console.error('Erro ao buscar produtos:', error);
          Alert.alert('Erro', 'Erro ao buscar produtos');
      }
  };
    fetchProdutos();
  },[Nscan])
    


  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    setNscan(data);
    setShowCardScan(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    if(data1.length === 0)
    Alert.alert('Erro', 'Produto não existe na base de dados!');
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={{
      backgroundColor:'#fff',
      flex:1
    }}>
        <View style={styles.container}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
        <View style={{ top: 160}}>
          {scanned && (
            <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />
          )}
          {showCardScan && data1 && data1.length > 0 && (  
              <View style={{height:80,top:80,borderRadius:20}}>
                <CardProduto 
                  nome={data1[0]?.nome} 
                  valor={data1[0]?.valorvenda} 
                  quant={data1[0]?.quantidade}
                  image={data1[0]?.image} 
                  onpress2={() => navigation.navigate('EditarProduto')} 
                /> 
              </View>
          )}

        </View>
      </View>
    </View>
   
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height:400,
    marginHorizontal:10,
    marginTop:20,
    backgroundColor:'#fff',
  },
  barcodeData: {
    marginTop: 20,
  },
});

export default Scan;