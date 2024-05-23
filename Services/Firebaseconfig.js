import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyDPPBwyfGsPqBiaRJKFnbcYWlQInAV3cBc",
  authDomain: "stock-easy-7eced.firebaseapp.com",
  databaseURL: "https://stock-easy-7eced-default-rtdb.firebaseio.com",
  projectId: "stock-easy-7eced",
  storageBucket: "stock-easy-7eced.appspot.com",
  messagingSenderId: "331534203370",
  appId: "1:331534203370:web:08cf4aae96ea46bb2dda93",
  measurementId: "G-J6TELEW3TG"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export { db, auth };
