import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ListRenderItem, Alert, Image, Button, ActivityIndicator } from 'react-native';
import { collection, query, where, getDocs, addDoc } from 'firebase/firestore';
import { db } from '../../../firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { s } from './style';
import { Link } from 'expo-router';

interface Obra {
  id: string;
  nomeDonoObra: string;
  status: string;
  dataIndicacao: {
    seconds: number;
    nanoseconds: number;
  };
  imagens: string[];
  localizacao: {
    latitude: number;
    longitude: number;
  };
  telefoneDonoObra: string;
  telefoneRespTecnico: string;
}

export default function ListaObras() {
  const [obras, setObras] = useState<Obra[]>([]);
  const [loading, setLoading] = useState(true);
  const [userType, setUserType] = useState<string | null>(null);

  useEffect(() => {
    const fetchObras = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId');
        const userType = await AsyncStorage.getItem('userRole');
        setUserType(userType);

        if (!userId) {
          Alert.alert('Erro', 'Usuário não autenticado.');
          return;
        }

        console.log('Buscando obras para o usuário:', userId);
        console.log('Tipo de usuário:', userType);

        let q;
        if (userType === 'indicador') {
          q = query(collection(db, 'obras'), where('usuarioId', '==', userId));
        } else if (userType === 'comercial') {
          q = query(collection(db, 'obras'));
        } else if (userType === 'financeiro') {
          q = query(collection(db, 'obras'), where('status', '==', 'aprovada'));
        } else {
          Alert.alert('Erro', 'Tipo de usuário desconhecido.');
          return;
        }

        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          console.log('Nenhuma obra encontrada para o usuário:', userId);
        } else {
          console.log('Obras encontradas:', querySnapshot.docs.length);
        }

        const obrasList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Obra[];
        setObras(obrasList);
      } catch (error) {
        console.error('Erro ao buscar obras:', error);
        Alert.alert('Erro', 'Não foi possível buscar as obras.');
      } finally {
        setLoading(false);
      }
    };

    fetchObras();
  }, []);

  const handleAddObra = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      if (!userId) {
        Alert.alert('Erro', 'Usuário não autenticado.');
        return;
      }

      const newObra = {
        nomeDonoObra: 'Novo Dono',
        status: 'pendente',
        dataIndicacao: new Date(),
        imagens: [],
        localizacao: {
          latitude: 0,
          longitude: 0,
        },
        telefoneDonoObra: '0000000000',
        telefoneRespTecnico: '0000000000',
        usuarioId: userId,
      };

      await addDoc(collection(db, 'obras'), newObra);
      Alert.alert('Sucesso', 'Obra adicionada com sucesso!');
    } catch (error) {
      console.error('Erro ao adicionar obra:', error);
      Alert.alert('Erro', 'Não foi possível adicionar a obra.');
    }
  };

  if (loading) {
    return (
      <View style={s.loadingContainer}>
        <ActivityIndicator></ActivityIndicator>
      </View>
    );
  }

  const renderItem: ListRenderItem<Obra> = ({ item }) => (
    <View style={s.obraItem}>
      <Image source={{ uri: item.imagens[0] }} style={s.obraImagem} />
      <View style={s.obraInfo}>
        <Text style={s.obraTitle}>{item.nomeDonoObra}</Text>
        <Text style={s.obraData}>Data de Indicação: {new Date(item.dataIndicacao.seconds * 1000).toLocaleString()}</Text>
        <Text style={s.obraStatus}>Status: {item.status}</Text>
      </View>
    </View>
  );

  return (
    <View style={s.container}>
      <Text style={s.headerText}>
        {userType === 'indicador' ? 'Minhas Obras' : userType === 'comercial' ? 'Todas as Obras Indicadas' : 'Obras Aprovadas'}
      </Text>
      <FlatList
        data={obras}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
      <Link href="/indicate" asChild>
        <Button title="Adicionar Obra" />
      </Link>
    </View>
  );
}