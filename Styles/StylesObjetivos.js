import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  img: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  progressoContainer: {
    position: 'absolute',
    top: 60, 
    left: 20,
    right: 20,
    alignItems: 'center',
  },
  barra: {
    height: 10,
    backgroundColor: '#ddd',
    borderRadius: 5,
    width: '100%',
  },
  circulo: {
    position: 'absolute',
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'red', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  foguete: {
    width: 30,
    height: 30,
    position: 'absolute',
    top: 10,
    left: 60, 
  },
  bola: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'blue', 
  },
  textoProgresso: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#fff',
  },
});
