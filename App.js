import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { RoutesStack } from './components/screen/Routes/StackRoutes'; // Ajuste o caminho conforme necessário

const App = () => {
  return (
    <NavigationContainer>
      <RoutesStack />
    </NavigationContainer>
  );
}

export default App;
