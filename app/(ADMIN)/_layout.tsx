import { AuthContext } from '@/contexts/AuthContext';
import { Redirect, Stack } from 'expo-router';
import React, { useContext } from 'react';
import { ActivityIndicator } from 'react-native';

const AdminLayout = () => {
  const { user, isReady } = useContext(AuthContext);
  // Espera a que se cargue el estado de autenticación
  if (!isReady) {
    return(
      <Redirect href={'/'}/>
    )
  }
 // Si rol no es "admin", redirige
    if (user?.role !== 'ADMIN') {
        return <Redirect href="/+not-found" />;
    }
  return (
    <Stack>
      <Stack.Screen name="(routes)" options={{ headerShown: false }} />
    </Stack>
  );
};

export default AdminLayout;