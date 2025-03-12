import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { gradientColors, colors } from '@/styles/theme';
import { s } from './style';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../../firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter, Link } from 'expo-router';
import Checkbox from 'expo-checkbox';

export default function Login() {
  const router = useRouter();
  const [cpf, setCpf] = useState('');
  const [phone, setPhone] = useState('');
  const [isChecked, setChecked] = useState(true);

  const validarCPF = (cpf: string) => {
    cpf = cpf.replace(/\D/g, '');
    if (cpf.length !== 11) return false;
    return true;
  };

  const validarTelefone = (telefone: string) => {
    telefone = telefone.replace(/\D/g, '');
    if (telefone.length < 10 || telefone.length > 11) return false;
    return true;
  };

  const handleLogin = async () => {
    if (!cpf || !phone) {
      Alert.alert('Erro', 'Todos os campos devem ser preenchidos.');
      return;
    }

    if (!validarCPF(cpf)) {
      Alert.alert('Erro', 'CPF inválido.');
      return;
    }
    if (!validarTelefone(phone)) {
      Alert.alert('Erro', 'Telefone inválido.');
      return;
    }

    try {
      const q = query(
        collection(db, 'users'),
        where('cpf', '==', cpf),
        where('phone', '==', phone)
      );
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        Alert.alert('Erro', 'Usuário ou senha incorretos.');
        return;
      }

      const userDoc = querySnapshot.docs[0];
      const userId = userDoc.id;
      const userData = userDoc.data();
      const userRole = userData.role;

      if (!userRole) {
        Alert.alert('Erro', 'Função de usuário não definida.');
        return;
      }

      await AsyncStorage.multiSet([
        ['userId', userId],
        ['userRole', userRole]
      ]);
            
      router.replace(`/tabs/home`);
      Alert.alert('Sucesso', 'Login realizado com sucesso!');
            
      if (userRole === 'indicador') {
        router.replace('/tabs/home');
      } else if (userRole === 'comercial') {
        router.replace('/comercial');
      } else if (userRole === 'financeiro') {
        router.replace('/financeiro');
      } else {
        Alert.alert('Erro', 'Função de usuário desconhecida.');
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível autenticar o usuário.');
      console.error('Erro ao autenticar usuário:', error);
    }
  };

  return (
    <View style={s.mainContainer}>
      <LinearGradient
        colors={gradientColors as [string, string]}
        style={{
          flex: 1,
          alignContent: 'center',
          padding: 16,
          gap: 20,
          borderRadius: 10,
        }}
      >
        <View style={s.header}>
          <Image
            source={require("../../assets/mainLogoHorizontal.png")}
            style={s.logo}
          />
          <Text style={s.title}>Seja bem vindo(a)</Text>
          <Text style={s.subtitle}>Insira seus dados para entrar.</Text>
        </View>

        <View style={s.inputBox}>
          <TextInput
            style={s.input}
            placeholder="Seu CPF"
            placeholderTextColor={'#AAAAAA'}
            value={cpf}
            onChangeText={setCpf}
            keyboardType="numeric"
          />
          <TextInput
            style={s.input}
            placeholder="Seu telefone"
            placeholderTextColor={'#AAAAAA'}
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />
          <View style={s.links}>
            <View style={s.checkbox}>
              <Checkbox value={isChecked} onValueChange={setChecked} color={colors.blue.primary} />
              <Text style={s.link}>Lembrar de mim</Text>
            </View>
            <Link href={'/signup'}>
              <TouchableOpacity activeOpacity={0.7}>
                <Text style={s.link}>Esqueci minha senha</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
        <TouchableOpacity style={s.button} onPress={handleLogin}>
          <Text style={s.buttonText}>Entrar</Text>
        </TouchableOpacity>
        <Link href='/signup' asChild>
          <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', width: '100%' }}>
            <Text>Não tem uma conta? <Text style={s.link}>Criar uma.</Text></Text>
          </TouchableOpacity>
        </Link>
      </LinearGradient>
    </View>
  );
}