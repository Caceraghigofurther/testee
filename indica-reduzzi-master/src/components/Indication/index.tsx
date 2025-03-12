import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, Alert } from "react-native";
import * as Location from "expo-location";
import * as ImagePicker from "expo-image-picker";
import { collection, addDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db } from "../../../firebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { s } from "./style";

const storage = getStorage();

export default function Indication() {
  const [ownerName, setOwnerName] = useState<string>("");
  const [ownerPhone, setOwnerPhone] = useState<string>("");
  const [managerPhone, setManagerPhone] = useState<string>("");
  const [coordinates, setCoordinates] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [photos, setPhotos] = useState<string[]>([]);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserId = async () => {
      const id = await AsyncStorage.getItem("userId");
      setUserId(id);
    };
    fetchUserId();
  }, []);

  const handleGetCoordinates = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permissão negada",
        "Permissão para acessar localização foi negada."
      );
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setCoordinates({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
  };

  const handleTakePhoto = async () => {
    if (photos.length >= 3) {
      Alert.alert("Erro", "Você só pode adicionar até 3 fotos.");
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ['images', 'livePhotos', 'videos'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setPhotos([...photos, result.assets[0].uri]);
    }
  };

  const uploadImages = async () => {
    const imageUrls = await Promise.all(
      photos.map(async (photo) => {
        const imageRef = ref(storage, `images/${Date.now()}`);
        const blob = await fetch(photo).then((response) => response.blob());
        await uploadBytes(imageRef, blob);
        return await getDownloadURL(imageRef);
      })
    );
    return imageUrls;
  };

  const handleSubmit = async () => {
    if (!ownerName || (!ownerPhone && !managerPhone) || photos.length < 3 || !coordinates) {
      Alert.alert("Erro", "Todos os campos obrigatórios devem ser preenchidos.");
      return;
    }

    try {
      const imageUrls = await uploadImages();
      await addDoc(collection(db, "obras"), {
        localizacao: {
          latitude: coordinates.latitude,
          longitude: coordinates.longitude,
        },
        imagens: imageUrls,
        status: "pendente",
        dataIndicacao: new Date(),
        usuarioId: userId,
        nomeDonoObra: ownerName,
        telefoneDonoObra: ownerPhone,
        telefoneRespTecnico: managerPhone,
      });

      Alert.alert("Sucesso", "Indicação enviada com sucesso!");
      setOwnerName("");
      setOwnerPhone("");
      setManagerPhone("");
      setCoordinates(null);
      setPhotos([]);
      
    } catch (error) {
      console.error("Erro ao enviar indicação:", error);
      Alert.alert("Erro", "Ocorreu um erro ao enviar a indicação.");
    }
  };

  return (
    <View style={s.indicationContainer}>
      <Text style={s.headerText}>Indicar</Text>
      <View style={s.inputBox}>
        <TextInput
          style={s.input}
          placeholder="Nome do dono da obra"
          value={ownerName}
          onChangeText={setOwnerName}
          placeholderTextColor={"#AAA"}
        />
        <TextInput
          style={s.input}
          placeholder="Telefone do dono"
          value={ownerPhone}
          onChangeText={setOwnerPhone}
          keyboardType="phone-pad"
          placeholderTextColor={"#AAA"}
        />
        <TextInput
          style={s.input}
          placeholder="Telefone do responsável técnico"
          value={managerPhone}
          onChangeText={setManagerPhone}
          keyboardType="phone-pad"
          placeholderTextColor={"#AAA"}
        />
      </View>
      <View style={s.buttons}>
        <View style={s.coords}>
          <TouchableOpacity
            style={[s.button, s.coordButton]}
            onPress={handleGetCoordinates}
          >
            <Text style={s.buttonText}>Fornecer Coordenadas</Text>
          </TouchableOpacity>
          {coordinates && (
            <View style={s.coordView}>
              <Text style={s.coordinatesText}>
                Coordenadas: {coordinates.latitude}, {coordinates.longitude}
              </Text>
            </View>
          )}
        </View>
        <TouchableOpacity style={s.button} onPress={handleTakePhoto}>
          <Text style={s.buttonText}>Tirar Foto</Text>
        </TouchableOpacity>
        <View style={s.photosContainer}>
          {photos.map((photo, index) => (
            <Image key={index} source={{ uri: photo }} style={s.photo} />
          ))}
        </View>
      </View>
      <TouchableOpacity style={s.submitButton} onPress={handleSubmit}>
        <Text style={s.submitButtonText} >Enviar Indicação</Text>
      </TouchableOpacity>
    </View>
  );
}