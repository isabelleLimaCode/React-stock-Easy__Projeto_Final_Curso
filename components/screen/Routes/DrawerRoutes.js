import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons, Entypo, AntDesign, Fontisto, MaterialCommunityIcons, Foundation } from '@expo/vector-icons';
import Promocao from '../Admin/Promoção';
import Estatistica from '../Admin/Estatistica';
import Relatorio from '../Admin/Relatorio';
import Cliente from '../Admin/Cliente';
import Marckplace from '../Admin/Marckplace';
import Produto from '../Admin/Produtos';
import CriarVenda from '../Admin/CriarVenda';
import Notificacao from '../Admin/Notificacao';
import Chat from '../Admin/Support';
import Tabnav from './TabRoutes';
import Header from '../Admin/Header';
import Mainbar from '../Card/Mainbar';

const Drawer = createDrawerNavigator();

export function MyDrawer({ navigation, ...props }) {
  return (
    <Drawer.Navigator
      initialRouteName="Inicio2"
      drawerContent={props => <Mainbar {...props} />}
      screenOptions={{
        header: (props) => <Header {...props} />,
        title: '',
        drawerActiveBackgroundColor: '#b4e4e4',
        drawerActiveTintColor: '#000',
        drawerInactiveTintColor: '#333',
        drawerLabelStyle: {
          marginLeft: -25,
          fontSize: 15,
        },
      }}
    >
      <Drawer.Screen
        name="Inicio2"
        component={Tabnav}
        options={{
          drawerIcon: ({ color, size }) => (
            <AntDesign name="appstore1" size={size} ccolor={color} />
          ),
          drawerLabel: 'Início',
        }}
      />
      <Drawer.Screen
        name="Promoção"
        component={Promocao}
        options={{
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="sale" size={size} color={color} />
          ),
          drawerLabel: 'Promoção',
        }}
      />
      <Drawer.Screen
        name="Balanço"
        component={Estatistica}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="stats-chart" size={size} color={color} />
          ),
          drawerLabel: 'Balanço',
        }}
      />
      <Drawer.Screen
        name="Relatorio"
        component={Relatorio}
        options={{
          drawerIcon: ({ color, size }) => (
            <Foundation name="page-multiple" size={size} color={color} />
          ),
          drawerLabel: 'Relatório',
        }}
      />
      <Drawer.Screen
        name="Cliente"
        component={Cliente}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
          drawerLabel: 'Cliente',
        }}
      />
      <Drawer.Screen
        name="Marcketplace"
        component={Marckplace}
        options={{
          drawerIcon: ({ color, size }) => (
            <Entypo name="shop" size={size} color={color} />
          ),
          drawerLabel: 'Marcketplace',
        }}
      />
      <Drawer.Screen
        name="Stock"
        component={Produto}
        options={{
          drawerIcon: ({ color, size }) => (
            <Entypo name="box" size={size} color={color} />
          ),
          drawerLabel: 'Stock',
        }}
      />
      <Drawer.Screen
        name="Criar venda"
        component={CriarVenda}
        options={{
          drawerIcon: ({ color, size }) => (
            <Fontisto name="shopping-basket-add" size={size} color={color} />
          ),
          drawerLabel: 'Criar venda',
        }}
      />
      <Drawer.Screen
        name="Notificações"
        component={Notificacao}
        options={{
          drawerIcon: ({ color, size }) => (
            <AntDesign name="notification" size={size} color={color} />
          ),
          drawerLabel: 'Notificações',
        }}
      />
      <Drawer.Screen
        name="Suport"
        component={Chat}
        options={{
          drawerIcon: ({ color, size }) => (
            <AntDesign name="message1" size={size} color={color} />
          ),
          drawerLabel: 'Suporte',
        }}
      />
    </Drawer.Navigator>
  );
}
