import React, { useEffect, useState } from 'react';
import { 
    Text, 
    View,
    Image,
    FlatList,
    Alert
} from 'react-native';
import StyleHome from '../../../Styles/StyleHome';
import { Ionicons, FontAwesome, Feather, Fontisto, MaterialCommunityIcons } from '@expo/vector-icons';
import CardProduto from '../Card/CardProduto';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { db } from '../../../Services/Firebaseconfig';
import { getDoc, doc, onSnapshot } from 'firebase/firestore';

export default function Home({ navigation }) {
  const [nome, setNome] = useState();
  const [sobrenome, setSobrenome] = useState();
  const [empresa, setEmpresa] = useState();
  const [image, setImage] = useState();
  const [numeroClientes, setNumeroClientes] = useState();
  const [numeroVendas, setNumeroVendas] = useState();
  const [numeroFaturas, setNumeroFaturas] = useState();
  const [numeroProdutos, setNumeroProdutos] = useState();
  const [data1, setData1] = useState([]);
  const [foraStock, setForaStock] = useState(false);
  const auth = getAuth(); 

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        loadData(user);
      } else {
        console.log('Nenhum usuário logado.');
      }
    });

    return unsubscribe;
  }, [auth]);

  const loadData = async (user) => {
    try {
      const userId = user.uid;
      const userDocRef = doc(db, userId, 'dados');
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        setNome(userData.nome);
        setSobrenome(userData.sobrenome);
        setEmpresa(userData.empresa);
        setImage(userData.uirphoto);
      } else {
        console.log('Documento do usuário não encontrado.');
      }

      await countClientes(userId);
      await countVendas(userId);
      await fetchProdutos(userId);
      await countFarturas(userId);
      await countProdutos(userId);
    } catch (error) {
      console.log('Erro ao puxar os documentos da coleção:', error);
    }
  };

  const countClientes = async (userId) => {
    try {
      const clientesRef = doc(db, userId, 'clientes');
      const clientesDoc = await getDoc(clientesRef);

      if (clientesDoc.exists()) {
        const clienteData = clientesDoc.data();
        const numClientes = clienteData.clientes.length;
        setNumeroClientes(numClientes);
      } else {
        console.log('Documento de clientes não encontrado');
      }
    } catch (error) {
      console.log('Erro ao puxar quantidade de clientes:', error);
    }
  };

  const countVendas = async (userId) => {
    try {
      const vendasRef = doc(db, userId, 'Vendas');
      const vendasDoc = await getDoc(vendasRef);

      if (vendasDoc.exists()) {
        const vendasData = vendasDoc.data();

        if (vendasData.Venda) {
          const numVendas = vendasData.Venda.length;
          setNumeroVendas(numVendas);
          console.log(numVendas);
        } else {
          console.log('O array de vendas está vazio');
        }
      } else {
        console.log('Documento de vendas não encontrado');
      }
    } catch (error) {
      console.log('Erro ao puxar quantidade de vendas:', error);
    }
  };

  const countFarturas = async (userId) => {
    try {
      const vendasRef = doc(db, userId, 'vendasSaida');
      const vendasDoc = await getDoc(vendasRef);

      if (vendasDoc.exists()) {
        const vendasData = vendasDoc.data();

        if (vendasData.Venda) {
          const numVendas = vendasData.Venda.length;
          setNumeroFaturas(numVendas);
          console.log(numVendas);
        } else {
          console.log('O array de vendas terminadas está vazio');
        }
      } else {
        console.log('Documento de vendas terminadas não encontrado');
      }
    } catch (error) {
      console.log('Erro ao puxar quantidade de vendas terminadas:', error);
    }
  };

  const countProdutos = async (userId) => {
    try {
      const ProdutosRef = doc(db, userId, 'produtos');
      const ProdutosDoc = await getDoc(ProdutosRef);

      if (ProdutosDoc.exists()) {
        const ProdutoData = ProdutosDoc.data();

        if (ProdutoData.produtos) {
          const numProdutos = ProdutoData.produtos.length;
          setNumeroProdutos(numProdutos);
          console.log(numProdutos);
        } else {
          console.log('O array de produtos está vazio');
        }
      } else {
        console.log('Documento de produtos não encontrado');
      }
    } catch (error) {
      console.log('Erro ao puxar quantidade de produtos:', error);
    }
  };

  const fetchProdutos = async (userId) => {
    const produtosRef = doc(db, userId, 'produtos');

    const unsubscribe = onSnapshot(produtosRef, (produtosDoc) => {
      if (produtosDoc.exists()) {
        const produtosData = produtosDoc.data();
        const produtos = produtosData.produtos || [];

        const produtosForaDeStock = produtos.filter(p => Number(p.quantidade) === 0);

        setData1(produtosForaDeStock);
        setForaStock(produtosForaDeStock.length === 0);
      } else {
        console.log('Documento de produtos não encontrado');
        setData1([]);
        setForaStock(true);
        Alert.alert('Erro', 'Documento de produtos não encontrado');
      }
    });

    return () => unsubscribe();
  };

  return (
    <View style={{ backgroundColor: '#FFF', flex: 1 }}>
      <View style={StyleHome.Conteiner}>
        <Image
          style={StyleHome.Picture}
          source={{ uri: image }}
        />
        <View style={{ flexDirection: 'column' }}>
          <Text style={StyleHome.text}>Olá {nome} {sobrenome}</Text>
          <Text style={StyleHome.text2}>Empresa: {empresa}</Text>
        </View>
        <Ionicons style={StyleHome.icon} name="notifications-sharp" size={24} color="gray" />
      </View>

      <View style={StyleHome.Marckplace}>
        <View style={StyleHome.div}>
          <View style={StyleHome.linha}>
            <FontAwesome style={[StyleHome.div2, { left: 15 }]} name="user-o" size={24} color="black" />
            <Text style={[StyleHome.icon2, { left: 15 }]}>{numeroClientes}</Text>
            <MaterialCommunityIcons style={[StyleHome.div2, { left: 130 }]} name="file-document" size={24} color="black" />
            <Text style={[StyleHome.icon2, { left: 125 }]}>{numeroFaturas}</Text>
          </View>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <Text style={[StyleHome.div3, { left: 20 }]}>Clientes</Text>
          <Text style={[StyleHome.div3, { left: 20 }]}>Faturas</Text>
        </View>

        <View style={StyleHome.div}>
          <View style={StyleHome.linha}>
            <Feather style={[StyleHome.div2, { left: 15 }]} name="shopping-bag" size={24} color="black" />
            <Text style={[StyleHome.icon2, { left: 15 }]}>{numeroVendas}</Text>
            <Fontisto style={[StyleHome.div2, { left: 100 }]} name="shopping-store" size={24} color="black" />
            <Text style={[StyleHome.icon2, { left: 100 }]}>{numeroProdutos}</Text>
          </View>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <Text style={[StyleHome.div3, { left: 10 }]}>Vendas</Text>
          <Text style={[StyleHome.div3, { left: 20 }]}>Marcketplace</Text>
        </View>
      </View>

      <Text style={{ fontWeight: 'bold', left: 25, fontSize: 16 }}>Produtos fora do stock:</Text>
      {foraStock === false ? (
        <FlatList
          data={data1}
          keyExtractor={(item) => item.codigodebarras}
          renderItem={({ item }) => (
            <CardProduto 
              valor={item.valorcompra}
              nome={item.nome}
              quant={item.quantidade}
              image={item.image}
              changeColor={'red'}
              changeshadowColor={'red'}
              productId={item.codigodebarras}
            />
          )}
        />
      ) : (
        <View>
          <Image
            style={{ width: 220, height: 220, resizeMode: "contain", alignSelf: 'center', marginTop: 10 }}
            source={{ uri: "https://firebasestorage.googleapis.com/v0/b/stock-easy-7eced.appspot.com/o/imgs%2Fpersonal%20goals%20checklist-amico.png?alt=media&token=14ca1cfc-f6e2-4ff8-9512-274ab93877e8" }}
          />
          <Text style={{ left: 25, fontSize: 18, fontWeight: 'bold', color: 'green', textAlign: 'center', marginRight: 40 }}>Nenhum produto fora de stock!</Text>
        </View>
      )}
    </View>
  );
}
