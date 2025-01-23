import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';


import { IconSymbol } from '@/components/ui/IconSymbol';

import { useColorScheme } from '@/hooks/useColorScheme';

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
        name="crear"
        options={{
          title: 'crear',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="editar"
        options={{
          title: 'editar',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="cancelar"
        options={{
          title: 'cancelar',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="actualizar"
        options={{
          title: 'actualizar',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      
    </Tabs>
  );
}