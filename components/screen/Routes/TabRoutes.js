import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Fontisto, AntDesign, FontAwesome } from '@expo/vector-icons';
import Pesquisa from '../Admin/Pesquisa';
import Scan from '../Admin/Scan';
import Vendas from '../Admin/Vendas';
import AtalhoBanco from '../Admin/AtalhoBanco';
import Home from '../Admin/home';
import ButtonCode from '../ButtonCode/ButtonCode';

const Tab = createBottomTabNavigator();

const Tabnav = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#0c2c51',
          borderTopColor: 'transparent',
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        },
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#547c96',
        tabBarShowLabel: false,
        tabBarTabStyle: {
          padding: 5,
          paddingTop: 5,
        },
      }}
    >
      <Tab.Screen
        name="home"
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: ({ size, color }) => (
            <AntDesign name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Pesquisa"
        component={Pesquisa}
        options={{
          headerShown: false,
          tabBarIcon: ({ size, color }) => (
            <FontAwesome name="search" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Pesquisar barcode"
        component={Scan}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, size, color }) => (
            <ButtonCode size={size} color={color} focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="Vendas"
        component={Vendas}
        options={{
          headerShown: false,
          tabBarIcon: ({ size, color }) => (
            <Fontisto name="shopping-store" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Banco"
        component={AtalhoBanco}
        options={{
          headerShown: false,
          tabBarIcon: ({ size, color }) => (
            <FontAwesome name="bank" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabnav;
