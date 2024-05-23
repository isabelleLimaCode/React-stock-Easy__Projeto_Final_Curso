import React, { useState, useEffect } from 'react';
import {
  View,
  KeyboardAvoidingView,
  Platform,
  Image,
  Dimensions,
  Text,
  TouchableOpacity,
} from 'react-native';
import StylesObjetivos from '../../../Styles/StylesObjetivos';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { PanGestureHandler, GestureHandlerRootView } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';

export default function Objetivos({ navigation }) {
  const behavior = Platform.OS === 'ios' ? 'padding' : 'height';
  const { width } = Dimensions.get('window');
  const Max = width - (40 + 50);
  
  const transX = useSharedValue(0);
  const offsetX = useSharedValue(0);
  const objetivoTotal = 100; 
  const valorAtual = 0; 

  const onGestureEvent = (event) => {
    const newX = offsetX.value + event.translationX;
    if (newX < 0) {
      transX.value = 0;
    } else if (newX > Max) {
      transX.value = Max;
    } else {
      transX.value = newX;
    }
  };

  const onHandlerStateChange = (event) => {
    if (event.nativeEvent.oldState === event.nativeEvent.STATE_ACTIVE) {
      if (transX.value < Max / 2) {
        transX.value = withSpring(0);
        offsetX.value = 0;
      } else {
        transX.value = withSpring(Max);
        offsetX.value = Max;
      }
    }
  };

  const progressStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: transX.value }],
    };
  });

  useEffect(() => {
    const progresso = (valorAtual / objetivoTotal) * Max;
    transX.value = withSpring(progresso);
    offsetX.value = progresso;
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 ,backgroundColor:'#fff'}}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
      <AntDesign style={{left:10}} name="back" size={24} color="black" />
      </TouchableOpacity>
      <KeyboardAvoidingView behavior={behavior} style={{ flex: 1, backgroundColor: '#fff' }}>
        <View style={{ flex: 1 }}>
          <Image style={StylesObjetivos.img} source={require('../../../assets/Stars.png')} />
          <View style={StylesObjetivos.progressoContainer}>
            <View style={StylesObjetivos.barra} />
            <PanGestureHandler onGestureEvent={onGestureEvent} onHandlerStateChange={onHandlerStateChange}>
              <Animated.View style={[StylesObjetivos.circulo, progressStyle]}>
                <View style={StylesObjetivos.bola} />
                <Image style={StylesObjetivos.foguete} source={require('../../../assets/fog.png')} />
              </Animated.View>
            </PanGestureHandler>
            <Text style={StylesObjetivos.textoProgresso}>{`Progresso: ${valorAtual} / ${objetivoTotal} Euros`}</Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </GestureHandlerRootView>
  );
}
