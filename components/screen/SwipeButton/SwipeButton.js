import React, { useMemo, useState ,useRef, useEffect} from 'react';
import { View , Text, StyleSheet, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedGestureHandler,
} from 'react-native-reanimated';
import { PanGestureHandler, GestureHandlerRootView } from 'react-native-gesture-handler';

const SwipeButton = ({
  OnEndSwapp,
  Texton = 'Deslise para Cancelar',
  TextOff = 'Deslise para Finalizar',
  ColorOn = '#812020',
  ColorOff = '#6B4EFF',
  MarginOrginal = 40,
}) =>  {
  const { width } = Dimensions.get('window');
  const [status, setStatus] = useState('off');
  const Max = width - (MarginOrginal + 50);

  const transX = useSharedValue(0);
  const offsetX = useSharedValue(0);

  useEffect(() => OnEndSwapp(status === 'on'), [status]);

  useEffect(() => {
    if (transX.value === Max) {
      setStatus('on');
    } else if (transX.value === 0) {
      setStatus('off');
    }
  }, [transX.value, Max]);

  useEffect(() => {
    console.log(status);
  }, [status]);

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
    <GestureHandlerRootView>
      <View style ={[
        styles.conteiner,
        {backgroundColor:status === 'on' ? ColorOn : ColorOff},
        ]}>
          <View>
              <Text>{status === 'on' ? Texton : TextOff}</Text> 
          </View>
          <PanGestureHandler
            onGestureEvent={onGestureEvent}
            onHandlerStateChange={onGestureEvent}
          >
            <Animated.View style ={[styles.button,{transform:[{translateX:transX}]}]}>

            </Animated.View>
          </PanGestureHandler>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  conteiner:{
    height:50,
    display:'flex',
    borderRadius:50,
    justifyContent:'center',
    alignItems:'center'
  },
  button:{
    height:46,
    width:46,
    borderRadius:23,
    backgroundColor:'#fff',
    position:'absolute',
    left:2,
  }
})

export default SwipeButton;
