import React, { useEffect, useState } from 'react';
import { 
    Text, 
    View,
    Image,
    TouchableOpacity,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    RefreshControl,
    FlatList,
    Alert
    
} from 'react-native';
import StyleCardObj from '../../../Styles/StyleCardObj';
import StyleNewProduct from '../../../Styles/StyleNewProduct';
import { AntDesign } from '@expo/vector-icons';
import CardCupom from '../Card/CardCupom';
import { db, auth} from '../../../Services/Firebaseconfig';
import { doc, getDoc ,onSnapshot,deleteDoc,updateDoc} from 'firebase/firestore';

export default function Promocao({navigation}) {

    const[Donthave,SetDonthave] = useState(false);
    const [refreshing, setRefreshing] = React.useState();
    const [ changeData,SetChangedata] = useState(false);
    const [data1,setdata1] = useState();


    const onRefresh = React.useCallback(async () => {
      setRefreshing(true);
      
      setTimeout(() => {
        SetDonthave((prevDonthave) => !prevDonthave);
        setRefreshing(false);
      }, 2000);
    }, []);
  
  useEffect(()=> {
      console.log(Donthave);
  },[Donthave])

  const handleSearch2 = (text) => {
    const searchText = text.toLowerCase();
    setSearchPhrasse(searchText);
    const filtered = data1.filter((item) =>
      item.nome.toLowerCase().startsWith(searchText)
    );
    if (filtered != null)
      SetChangedata(!changeData);
    setFilteredData(filtered);
  };


useEffect(() => {
    const user = auth.currentUser;
    const cupaoRef = doc(db, user.uid, 'cupões');

    const unsubscribe = onSnapshot(cupaoRef, (cupaoDoc) => {
        if (cupaoDoc.exists()) {
            const cupaoData = cupaoDoc.data();
            const cupaoList = cupaoData.cupões || [];
            setdata1(cupaoList);
            console.log('cupaoList',cupaoList);
            SetDonthave(cupaoList.length === 0);
            console.log('verificar',Donthave)
        } else {
            console.log('Documento de cupões não encontrado');
            Alert.alert('Erro', 'Documento de cupões não encontrado');
        }
    });

    return () => unsubscribe();
}, []);

const handleDelete = (id) => {
    const user = auth.currentUser;
    if (!user) {
        console.log('Usuário não autenticado');
        return;
    }

    const cupaoRef = doc(db, user.uid, 'cupões');

    const deleteCupao = async () => {
        try {
            const cupaoDoc = await getDoc(cupaoRef);
            if (cupaoDoc.exists()) {
                const cupaoData = cupaoDoc.data();
                const cupaoList = cupaoData.cupões || [];
                const updatedCupaoList = cupaoList.filter(cupao => cupao.id !== id);

                await updateDoc(cupaoRef, { cupões: updatedCupaoList });

                Alert.alert('Cupão deletado com sucesso!');
                console.log('Documento deletado com sucesso');
            } else {
                console.log('Documento de cupões não encontrado');
                Alert.alert('Erro', 'Documento de cupões não encontrado');
            }
        } catch (error) {
            console.error('Erro ao deletar documento:', error);
            Alert.alert('Erro', 'Erro ao deletar documento');
        }
    };

    Alert.alert(
        'Deletar Cupão',
        'Tem certeza que deseja deletar este cupão?',
        [
            {
                text: 'Não',
                style: 'cancel',
            },
            {
                text: 'Sim',
                onPress: deleteCupao,
            },
        ],
        {
            cancelable: true,
            onDismiss: () => Alert.alert('Operação cancelada'),
        }
    );
};


  const behavior = Platform.OS === 'ios' ? 'padding' : 'height';

  return (
    <KeyboardAvoidingView behavior={behavior} style={{ flex: 1 ,backgroundColor:'#fff'}}>
        <FlatList
            data={Donthave ? [] : data1}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <CardCupom 
                    desconto={item.porcentagem}
                    quantidade={item.quantidade}
                    onpress1={() => handleDelete(item.id)}
                />
            )}
            ListHeaderComponent={() => (
                <View>
                    <Text style={[StyleCardObj.text2, {}]}>Cupões</Text>
                    {Donthave == true ?(
                        <View>
                            <Image style={{ width: 250, height: 250, marginBottom: 10, alignSelf: 'center', marginTop: 100 }} source={require('./../../../assets/Ecommercecampaign.gif')} />
                            <Text style={{
                                textAlign: 'center',
                                fontWeight: '800',
                                fontSize: 20,
                            }}>
                                Ops! Não há cupões ativados
                            </Text>
                            <Text style={{
                                textAlign: 'center',
                                fontWeight: '300',
                                marginTop: 20,
                                marginLeft: 10,
                                marginRight: 10
                            }}>
                                Divugue o seu negócio criando cupões de descontos para os seus clientes!
                            </Text>
                        </View>
                    ):null}
                </View>
            )}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
            }
            ListFooterComponent={() => (
                <TouchableOpacity style={{ flex: 1, justifyContent: 'space-between' }} onPress={() => navigation.navigate('addpromocao')}>
                    <View style={[StyleCardObj.conteiner3, StyleNewProduct.buttonnew, { marginBottom: 20 }]}>
                        <Text style={[StyleNewProduct.text2, { marginHorizontal: 85, top: 2 }]}>Criar cupão</Text>
                        <AntDesign style={{ top: -10, marginHorizontal: 10, right: 3, top: 1, left: -69 }} name="pluscircle" size={24} color="black" />
                    </View>
                </TouchableOpacity>
            )}
        />
    </KeyboardAvoidingView>
);
}