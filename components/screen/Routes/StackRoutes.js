import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Main from '../Free_access/Main';
import Login from '../Free_access/Login';
import CreateAccountUser from '../Free_access/CreateAccountUser';
import { MyDrawer } from './DrawerRoutes';
import VendasMarckplace from '../Admin/VendasMarckplace';
import MarckplaceEdit from '../Admin/MarckplaceEdit';
import NewProduct from '../Admin/NewProduct';
import EditarCliente from '../Admin/EditarCliente';
import CriarCliente from '../Admin/CriarCliente';
import Conta from '../Admin/Conta';
import EditarEncomenda from '../Admin/EditarEncomenda';
import PrepararEncomenda from '../Admin/PreparaEncomenda';
import FinalizarPreparo from '../Admin/FinalizarPreparo';
import Estatistica from '../Admin/Estatistica';
import CheckCarrinho from '../Admin/CheckCarrinho';
import CriarCatalogo from '../Admin/CriarCatalogo';
import ConfirmarPagamento from '../Admin/ConfirmarPagament';
import ChangeProduct from '../Admin/ChangeProduct';
import ModoFerias from '../Admin/ModoFerias';
import EditarConta from '../Admin/EditarConta';
import CriarRelatorio from '../Admin/CriarRelatorio';
import MetodoEnvio from '../Admin/MetodoEnvio';
import FinalizarEncomenda from '../Admin/FinalizarEncomenda';
import Concluido from '../Admin/Concluido';
import Order from '../Admin/Order';
import ConcluidoProduto from '../Admin/ConcluidoProduto';
import Categoria from '../Admin/Categoria';
import Categoria2 from '../Admin/Categoria2';
import Produto from '../Admin/Produtos';
import Promocao from '../Admin/Promoção';
import Header from '../Admin/Header';
import Discont from '../Admin/Discont';
import FinalizarVenda from '../Admin/FinalizarVenda';

const Stack = createStackNavigator();

export function RoutesStack() {
  return (
    <Stack.Navigator initialRouteName="Main" screenOptions={{ gestureEnabled: false }}>
      <Stack.Screen
        options={{ headerShown: false }}
        name="Main"
        component={Main}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="FinalizarVenda"
        component={FinalizarVenda}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Login"
        component={Login}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Criar conta"
        component={CreateAccountUser}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Home"
        component={MyDrawer}
      />
      <Stack.Screen
        options={{ header: (props) => <Header {...props} /> }}
        name="Vendas Marckplace"
        component={VendasMarckplace}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="editvendas"
        component={MarckplaceEdit}
      />
      <Stack.Screen
        options={{ header: (props) => <Header {...props} /> }}
        name="CriarProduto"
        component={NewProduct}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="editcliente"
        component={EditarCliente}
      />
      <Stack.Screen
        name="addpromocao"
        component={Discont}
        options={{ header: (props) => <Header {...props} /> }}
      />
      <Stack.Screen
        name="CriarCliente"
        component={CriarCliente}
        options={{ header: (props) => <Header {...props} /> }}
      />
      <Stack.Screen
        name="AreaCliente"
        component={Conta}
        options={{ header: (props) => <Header {...props} /> }}
      />
      <Stack.Screen
        name="EditarEncomenda"
        component={EditarEncomenda}
        options={{ header: (props) => <Header {...props} /> }}
      />
      <Stack.Screen
        name="prepararEncomenda"
        component={PrepararEncomenda}
        options={{ header: (props) => <Header {...props} /> }}
      />
      <Stack.Screen
        name="FinalizarEncomenda"
        component={FinalizarPreparo}
        options={{ header: (props) => <Header {...props} /> }}
      />
      <Stack.Screen
        name="estatistica"
        component={Estatistica}
        options={{ header: (props) => <Header {...props} /> }}
      />
      <Stack.Screen
        name="carrinho"
        component={CheckCarrinho}
        options={{ header: (props) => <Header {...props} /> }}
      />
      <Stack.Screen
        name="catalogo"
        component={CriarCatalogo}
        options={{ header: (props) => <Header {...props} /> }}
      />
      <Stack.Screen
        name="confirmarPagamento"
        component={ConfirmarPagamento}
        options={{ header: (props) => <Header {...props} /> }}
      />
      <Stack.Screen
        name="EditarProduto"
        component={ChangeProduct}
        options={{ header: (props) => <Header {...props} /> }}
      />
      <Stack.Screen
        name="ModoFerias"
        component={ModoFerias}
        options={{ header: (props) => <Header {...props} /> }}
      />
      <Stack.Screen
        name="EditarConta"
        component={EditarConta}
        options={{ header: (props) => <Header {...props} /> }}
      />
      <Stack.Screen
        name="CriarRelatorio"
        component={CriarRelatorio}
        options={{ header: (props) => <Header {...props} /> }}
      />
      <Stack.Screen
        name="MetodoPagamento"
        component={MetodoEnvio}
        options={{ header: (props) => <Header {...props} /> }}
      />
      <Stack.Screen
        name="ConcluirVenda"
        component={Concluido}
        options={{ header: (props) => <Header {...props} /> }}
      />
      <Stack.Screen
        name="visualizarEncomenda"
        component={Order}
        options={{ header: (props) => <Header {...props} /> }}
      />
      <Stack.Screen
        name="RegistrarProduto"
        component={ConcluidoProduto}
        options={{ header: (props) => <Header {...props} /> }}
      />
      <Stack.Screen
        name="caterogia"
        component={Categoria}
        options={{ header: (props) => <Header {...props} /> }}
      />
      <Stack.Screen
        name="nextcategory"
        component={Categoria2}
        options={{ header: (props) => <Header {...props} /> }}
      />
      <Stack.Screen
        name="produto"
        component={Produto}
        options={{ header: (props) => <Header {...props} /> }}
      />
      <Stack.Screen
        name="promoção"
        component={Promocao}
        options={{ header: (props) => <Header {...props} /> }}
      />
    </Stack.Navigator>
  );
}
