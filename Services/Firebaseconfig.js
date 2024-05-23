import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDPPBwyfGsPqBiaRJKFnbcYWlQInAV3cBc",
  authDomain: "stock-easy-7eced.firebaseapp.com",
  projectId: "stock-easy-7eced",
  storageBucket: "stock-easy-7eced.appspot.com",
  messagingSenderId: "331534203370",
  appId: "1:331534203370:web:08cf4aae96ea46bb2dda93"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
