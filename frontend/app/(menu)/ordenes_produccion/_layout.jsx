import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { IconSymbol } from '@/components/ui/IconSymbol';

import { useColorScheme } from '@/hooks/useColorScheme';

import Icon from 'react-native-vector-icons/FontAwesome';

export default function OrdenesLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="crear/index"
        options={{
          title: 'Crear',
          tabBarIcon: ({ color }) => <Icon name="plus" size={22}/>,
        }}
      />
      <Tabs.Screen
        name="editar/index"
        options={{
          title: 'Editar',
          tabBarIcon: ({ color }) => <Icon name="edit" size={22}/>,
        }}
      />
      <Tabs.Screen
        name="cancelar/index"
        options={{
          title: 'Cancelar',
          tabBarIcon: ({ color }) => <Icon name="times-circle" size={22}/>,
        }}
      />
      <Tabs.Screen
        name="actualizar"
        options={{
          title: 'Actualizar',
          tabBarIcon: ({ color }) => <Icon name="refresh" size={22}/>,
        }}
      />
      
    </Tabs>
  );
}