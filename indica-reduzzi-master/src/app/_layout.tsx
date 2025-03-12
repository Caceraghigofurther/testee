import React, { useEffect, useState } from 'react';
import { Stack, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors } from '@/styles/theme';
import Loading from '../components/Loading';
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

export default function Layout() {
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState<string | null>(null);
  const router = useRouter();

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  useEffect(() => {
    const fetchUserRole = async () => {
      const userRole = await AsyncStorage.getItem('userRole');
      setRole(userRole);
      setLoading(false);
    };
    fetchUserRole();
  }, []);

  useEffect(() => {
    if (!loading && fontsLoaded) {
      if (role === 'indicador') {
        router.replace('/tabs/home');
      } else if (role === 'comercial') {
        router.replace('/comercial');
      } else if (role === 'financeiro') {
        router.replace('/financeiro');
      } else {
        router.replace('/');
      }
    }
  }, [loading, fontsLoaded, role]);

  if (loading || !fontsLoaded) {
    return <Loading />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background.primary },
      }}
    >
    
    </Stack>
  );
}