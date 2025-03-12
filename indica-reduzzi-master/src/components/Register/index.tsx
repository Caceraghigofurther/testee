import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useState, useEffect } from "react";
import { gradientColors } from "@/styles/theme";
import { s } from "./styles";
import { Picker } from "@react-native-picker/picker";
import { City, State } from "@/types/types";
import { db } from "../../../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { useRouter } from 'expo-router';

export default function Register() {
  const router = useRouter();
  const [states, setStates] = useState<State[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [cpf, setCpf] = useState('');
  const [pixKey, setPixKey] = useState('');

  useEffect(() => {
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
      .then(response => response.json())
      .then(data => setStates(data))
      .catch(err => console.error(err, 'Erro no fetch dos estados'));
  }, []);

  useEffect(() => {
    if (selectedState) {
      fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedState}/municipios`)
        .then(response => response.json())
        .then(data => setCities(data))
        .catch(err => console.error(err, 'Erro no fetch das cidades'));
    }
  }, [selectedState]);

  const validateEmail = (email: string) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const validatePhone = (phone: string) => {
    const re = /^\d{2}-\d{5}-\d{4}$/;
    return re.test(phone);
  };

  const validateCpf = (cpf: string) => {
    const re = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    return re.test(cpf);
  };

  const formatPhone = (phone: string) => {
    const cleaned = phone.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/);
    if (match) {
      return `${match[1]}-${match[2]}-${match[3]}`;
    }
    return phone;
  };

  const formatCpf = (cpf: string) => {
    const cleaned = cpf.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{3})(\d{2})$/);
    if (match) {
      return `${match[1]}.${match[2]}.${match[3]}-${match[4]}`;
    }
    return cpf;
  };

  const handleRegister = async () => {
    if (!name || !email || !phone || !cpf || !selectedState || !selectedCity) {
      Alert.alert('Erro', 'Todos os campos devem ser preenchidos.');
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert('Erro', 'Email inválido.');
      return;
    }

    if (!validatePhone(phone)) {
      Alert.alert('Erro', 'Telefone inválido. Use o formato 11-11111-1111.');
      return;
    }

    if (!validateCpf(cpf)) {
      Alert.alert('Erro', 'CPF inválido. Use o formato 111.111.111-11.');
      return;
    }

    try {
      const selectedStateName = states.find(state => state.id === Number(selectedState))?.nome;
      const selectedCityName = cities.find(city => city.id === Number(selectedCity))?.nome;

      const userData = {
        name,
        cpf: cpf.replace(/\D/g, ''), 
        phone: phone.replace(/\D/g, ''), 
        email,
        pixKey,
        state: selectedStateName,
        city: selectedCityName,
        role: "indicador",
      };

      const userCollection = collection(db, "users");
      await addDoc(userCollection, userData);

      Alert.alert("Sucesso", "Usuário registrado com sucesso!");
      router.replace("/");
    } catch (error) {
      console.error("Erro ao registrar usuário:", error);
      Alert.alert("Erro", "Não foi possível registrar o usuário.");
    }
  };

  return (
    <View style={s.container}>
      <LinearGradient
        colors={gradientColors as [string, string]}
        style={{
          flex: 1,
          alignContent: "center",
          padding: 16,
          gap: 20,
          borderRadius: 10,
        }}
      >
        <Text style={s.title}>Crie sua conta</Text>
        <View style={s.inputBox}>
          <TextInput
            style={s.input}
            placeholder="Seu nome"
            placeholderTextColor={"#AAAAAA"}
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={s.input}
            placeholder="Seu email"
            placeholderTextColor={"#AAAAAA"}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <TextInput
            style={s.input}
            placeholder="Seu telefone"
            placeholderTextColor={"#AAAAAA"}
            value={formatPhone(phone)}
            onChangeText={(text) => setPhone(formatPhone(text))}
            keyboardType="phone-pad"
          />
          <TextInput
            style={s.input}
            placeholder="Seu CPF"
            placeholderTextColor={"#AAAAAA"}
            value={formatCpf(cpf)}
            onChangeText={(text) => setCpf(formatCpf(text))}
            keyboardType="numeric"
          />
          <Picker
            selectedValue={selectedState}
            onValueChange={(itemValue) => setSelectedState(itemValue)}
            style={s.picker}
          >
            <Picker.Item label="Selecione seu estado" value={null} color="#AAA"/>
            {states.map((state) => (
              <Picker.Item key={state.id} label={state.nome} value={state.id.toString()} color="#000" />
            ))}
          </Picker>

          <Picker
            selectedValue={selectedCity}
            onValueChange={(itemValue) => setSelectedCity(itemValue)}
            enabled={!!selectedState}
            style={s.picker}
          >
            <Picker.Item label="Selecione sua cidade" value={null} color="#AAA" />
            {cities.map((city) => (
              <Picker.Item key={city.id} label={city.nome} value={city.id.toString()} color="#000"/>
            ))}
          </Picker>
        </View>
        <TouchableOpacity style={s.button} onPress={handleRegister}>
          <Text style={s.buttonText}>Cadastrar</Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
}