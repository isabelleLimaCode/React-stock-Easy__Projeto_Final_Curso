import {initializeApp,getApps,getApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage';
import { initializeAuth, getReactNativePersistence ,getAuth} from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyDPPBwyfGsPqBiaRJKFnbcYWlQInAV3cBc",
  authDomain: "stock-easy-7eced.firebaseapp.com",
  projectId: "stock-easy-7eced",
  storageBucket: "stock-easy-7eced.appspot.com",
  messagingSenderId: "331534203370",
  appId: "1:331534203370:web:08cf4aae96ea46bb2dda93"
};

let app;
let auth;
let db;
let storage;

if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
  });
  db = getFirestore(app);
  storage = getStorage(app);
} else {
  // Se já estiver inicializado, use a instância existente
  app = getApp();
  auth = getAuth(app);
  db = getFirestore(app);
  storage = getStorage(app);
}

export { app, auth, db, storage };
