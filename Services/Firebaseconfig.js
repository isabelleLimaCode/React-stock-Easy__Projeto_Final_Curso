import { initializeApp, getApps, getApp} from 'firebase/app';
import { getFirestore,initializeFirestore,persistentLocalCache} from 'firebase/firestore';
import { initializeAuth, getAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

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



const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

const auth = getApps().length === 0 ? initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
}) : getAuth(app);


let db;
if (getApps().length === 0) {
  db = initializeFirestore(app, {
    experimentalAutoDetectLongPolling: true,
    localCache: persistentLocalCache,
  });
} else {
  db = getFirestore(app);
}

export { db, auth };