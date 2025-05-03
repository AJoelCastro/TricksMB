import React from 'react';
import { Stack, Tabs, useRouter } from 'expo-router';
import { Platform, TouchableOpacity, Text } from 'react-native';
import { Icon } from 'react-native-paper';


import { useThemeColor } from '@/hooks/useThemeColor';
import { Colors } from '@/constants/Colors';

export default function OrdenesTabLayout() {
  const router = useRouter();
  const backgroundColor = useThemeColor(
    { light: Colors.light.background, dark: Colors.dark.background },
    'background'
  );
  const textColor = useThemeColor(
    { light: Colors.light.text, dark: Colors.dark.text },
    'text'
  );

  return (
    <Stack

        >
        <Stack.Screen
            name='crear/index'
            options={{
                title: 'Crear',
                headerShown: false,
            }}
        />
        <Stack.Screen
            name='editar/index'
            options={{
                title: 'Editar',
                headerShown: false,
            }}
        />
        <Stack.Screen
            name='cancelar/index'
            options={{
                title: 'Cancelar',
                headerShown: false,
            }}
        />
        <Stack.Screen
            name='actualizar'
            options={{
                title: 'Actualizar',
                headerShown: false,
            }}
        />
    </Stack>
  );
}
