import React, { useContext, useEffect } from 'react';
import { Redirect, Stack } from 'expo-router';
import { Text, TouchableOpacity } from 'react-native';
import { useFonts } from 'expo-font';

import { useThemeColor } from '@/hooks/useThemeColor';
import { Colors } from '@/constants/Colors';
import { AuthContext } from '@/contexts/AuthContext';

import * as SplashScreen from 'expo-splash-screen';
// Prevent the splash screen from auto-hiding before asset loading is complete.

SplashScreen.preventAutoHideAsync();
export default function MenuLayout() {
  
  const authContext = useContext(AuthContext);

  if(!authContext.isReady){
    return <Redirect href={'/'}/>
  }
  const backgroundColor = useThemeColor(
    { light: Colors.light.background, dark: Colors.dark.background },
    'background'
  );
  const textColor = useThemeColor(
    { light: Colors.light.text, dark: Colors.dark.text },
    'text'
  );

  const [loaded, error] = useFonts({
    'Inter-Black': require('../../assets/fonts/DMSans-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <Stack>
      <Stack.Screen
        name='menu'
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name='ordenes_produccion'
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name='inventariado/index'
        options={{
          headerTitle: 'Inventario',
          headerStyle: {
            backgroundColor: backgroundColor,
          },
          headerTintColor: textColor,
        }}
      />
      <Stack.Screen
        name='almacen/index'
        options={{
          headerTitle: 'Almacen',
          headerStyle: {
            backgroundColor: backgroundColor,
          },
          headerTintColor: textColor,
        }}
      />
      <Stack.Screen
        name='historial/index'
        options={{
          headerTitle: 'Historial de pedidos',
          headerStyle: {
            backgroundColor: backgroundColor,
          },
          headerTintColor: textColor,
        }}
      />
    </Stack>
  );
}
