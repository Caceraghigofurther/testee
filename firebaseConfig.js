import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';

const firebaseConfig = {
  apiKey:"AIzaSyDMFSfvPid9vixJFvOLW2nX99cULWAII3k",
  authDomain: "indicareduzzi.firebaseapp.com",
  projectId: "indicareduzzi",
  storageBucket: "658481078702",
  messagingSenderId: "1:658481078702:web:f3701d91325805eb38a83f",
  appId: "G-C2Q7033WQP",
  measurementId:"b213a35a-df12-4f87-a57d-8815c55acc36",
};



const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const db = getFirestore(app);
export const storage = getStorage(app);