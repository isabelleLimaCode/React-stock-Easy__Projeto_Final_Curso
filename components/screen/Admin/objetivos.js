import React, { useState } from 'react';
import { 
    View,
    KeyboardAvoidingView,
    Platform,
    Image,
    Dimensions
} from 'react-native';
import StylesObjetivos from '../../../Styles/StylesObjetivos';
import Animated, {
    useSharedValue,
    useAnimatedGestureHandler,
  } from 'react-native-reanimated';
import { PanGestureHandler, GestureHandlerRootView } from 'react-native-gesture-handler';

export default function Objetivos({ navigation }) {

  const behavior = Platform.OS === 'ios' ? 'padding' : 'height';
  const { width } = Dimensions.get('window');
  const [status, setStatus] = useState('off');
  const Max = width - (40 + 50);

  const transX = useSharedValue(0);
  const offsetX = useSharedValue(0);
  
  const onGestureEvent = useAnimatedGestureHandler({
    onActive: (event) => {
      const newX = offsetX.value + event.translationX;
      if (newX < 0) {
        transX.value = 0;
      } else if (newX > Max) {
        transX.value = Max;
      } else if (newX < Max) {
        transX.value = newX;
      }
    },
    onEnd: () => {
      if (transX.value < Max / 2) {
        transX.value = 0;
        offsetX.value = 0;
      } else {
        transX.value = Max;
        offsetX.value = Max;
      }
    },
  });

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <KeyboardAvoidingView behavior={behavior} style={{ flex: 1, backgroundColor: '#fff' }}>
        <View>
          <Image style={StylesObjetivos.img} source={require('../../../assets/Stars.png')} />
          <View style={StylesObjetivos.barra} />
          <PanGestureHandler onGestureEvent={onGestureEvent} onHandlerStateChange={onGestureEvent}>
            <Animated.View style={[StylesObjetivos.circulo, { transform: [{ translateX: transX }] }]} />
          </PanGestureHandler>
        </View>
      </KeyboardAvoidingView>
    </GestureHandlerRootView>
  );
}
