import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  ActivityIndicator,
  Switch,
  Alert,
  TextInput,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import StyleCardObj from '../../../Styles/StyleCardObj';
import StyleDiscont from '../../../Styles/StyleDiscont';
import { Svg, Circle } from 'react-native-svg';
import Animated, {
  interpolateColor,
  useAnimatedProps,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedText = Animated.createAnimatedComponent(TextInput);

const radius = 45;
const circumference = radius * Math.PI * 2;
const duration = 6000;

export default function ModoFerias({ navigation }) {
  const behavior = Platform.OS === 'ios' ? 'padding' : 'height';
  const [isEnable, setIsEnable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);

  const handleChange = async () => {
    Alert.alert(
      'Confirmação',
      'Deseja realmente entrar em Modo férias?',
      [
        {
          text: 'Entrar em Modo férias',
          onPress: async () => {
            setIsEnable((previousState) => !previousState);
            setIsLoading(true);
            await new Promise((resolve) => {
              setTimeout(resolve, 5000);
            });
            setIsLoading(false);
          },
        },
        {
          text: 'Cancelar',
          style: 'cancel',
        },
      ],
      { cancelable: false }
    );
  };

  const handleChange2 = async () => {
    Alert.alert(
      'Confirmação',
      'Deseja realmente Sair em Modo férias?',
      [
        {
          text: 'Sair em Modo férias',
          onPress: async () => {
            setIsEnable((previousState) => !previousState);
            setIsLoading2(true);
            await new Promise((resolve) => {
              setTimeout(resolve, 5000);
            });
            setIsLoading2(false);
          },
        },
        {
          text: 'Cancelar',
          style: 'cancel',
        },
      ],
      { cancelable: false }
    );
  };

  const strokeOffset = useSharedValue(circumference);

  const percentage = useDerivedValue(() => {
    const number = ((circumference - strokeOffset.value) / circumference) * 100;
    return withTiming(number, { duration: duration });
  });

  const strokeColor = useDerivedValue(() => {
    return interpolateColor(
      percentage.value,
      [0, 50, 100],
      ['#9E4784', '#66347F', '#37306B']
    );
  });

  const animatedCircleProps = useAnimatedProps(() => {
    return {
      strokeDashoffset: withTiming(strokeOffset.value, { duration: duration }),
      stroke: strokeColor.value,
    };
  });

  const animatedTextProps = useAnimatedProps(() => {
    return {
      text: `${Math.round(percentage.value)}%`,
    };
  });

  useEffect(() => {
    strokeOffset.value = 0;
  }, []);

  return (
    <KeyboardAvoidingView behavior={behavior} style={{ flex: 1, backgroundColor: '#fff' }}>
      <View>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign style={{ left: 10, top: 10 }} name="back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={[StyleCardObj.text2, {}]}>Modo férias</Text>
      </View>
      <View style={{ justifyContent: 'flex-start', alignItems: 'flex-start', marginTop: 40 }}>
        <View style={[StyleDiscont.switchContainer, { marginHorizontal: 5 }]}>
          <Text style={[StyleDiscont.text2, { left: 6 }]}>
            Ocultar meus artigos publicados online?
          </Text>
          <Text style={[StyleDiscont.switchText, { right: 10 }]}>{isEnable ? 'Sim' : 'Não'}</Text>
          <Switch
            trackColor={{ false: '#FF6347', true: '#3CB371' }}
            thumbColor={isEnable ? '#fff' : '#f4f3f4'}
            ios_backgroundColor={'#FF6347'}
            onValueChange={isEnable ? handleChange2 : handleChange}
            value={isEnable}
            style={[StyleDiscont.Switchstyle, { left: -35 }]}
          />
        </View>

        <Image
          style={{
            width: 300,
            height: 300,
            alignSelf: 'center',
            marginTop: 90,
          }}
          source={require('../../../assets/modoferias.png')}
        />

        {isLoading && (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <AnimatedText
              style={{
                color: '#37306B',
                fontSize: 24,
                fontWeight: 'bold',
                position: 'absolute',
              }}
              animatedProps={animatedTextProps}
            />
            <Svg height="50%" width="50%" viewBox="0 0 100 100">
              <Circle
                cx="50"
                cy="50"
                r="45"
                stroke="#E7E7E7"
                strokeWidth="10"
                fill="transparent"
              />
              <AnimatedCircle
                animatedProps={animatedCircleProps}
                cx="50"
                cy="50"
                r="45"
                strokeDasharray={`${radius * Math.PI * 2}`}
                strokeWidth="10"
                fill="transparent"
              />
            </Svg>
          </View>
        )}
        {isLoading2 && (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <AnimatedText
              style={{
                color: '#37306B',
                fontSize: 24,
                fontWeight: 'bold',
                position: 'absolute',
              }}
              animatedProps={animatedTextProps}
            />
            <Svg height="50%" width="50%" viewBox="0 0 100 100">
              <Circle
                cx="50"
                cy="50"
                r="45"
                stroke="#E7E7E7"
                strokeWidth="10"
                fill="transparent"
              />
              <AnimatedCircle
                animatedProps={animatedCircleProps}
                cx="50"
                cy="50"
                r="45"
                strokeDasharray={`${radius * Math.PI * 2}`}
                strokeWidth="10"
                fill="transparent"
              />
            </Svg>
          </View>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}
