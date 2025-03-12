import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../../../firebaseConfig';
import { s } from './style';

export default function Greeting() {
  const [userName, setUserName] = useState<string>("");

  useEffect(() => {
    const fetchName = async () => {
      try {
        const userId = await AsyncStorage.getItem("userId");
        console.log("userId: ", userId);
        if (userId) {
          const userDoc = await getDoc(doc(db, "users", userId));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            const fullName = userData.name;
            const firstName = fullName.split(" ")[0];
            setUserName(firstName);
          }
        }
      } catch (error) {
        console.error('Erro ao buscar o nome do usuário:', error);
      }
    };
    fetchName();
  }, []);

  return <Text style={s.title}>Seja bem-vindo, <Text style={s.mark} >{userName}! </Text></Text>;
}