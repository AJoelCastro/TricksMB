import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, TouchableOpacity, Text } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Colors } from '@/constants/Colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import "../../../global.css";

export default function OrdenesLayout() {
  const backgroundColor = useThemeColor({ light: Colors.light.background, dark: Colors.dark.background }, 'background');
  const textColor = useThemeColor({ light: Colors.light.text, dark: Colors.dark.text }, 'text');

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
            backgroundColor: backgroundColor,
          },
          default: {
            backgroundColor: backgroundColor,
          },
        }),

      }}>
      <Tabs.Screen
        name="(tabs)/crear/index"
        options={{
          title: 'Crear',
          tabBarIcon: () => <Icon name="plus" size={22} color={textColor}/>,
        }}
      />
      <Tabs.Screen
        name="(tabs)/editar/index"
        options={{
          title: 'Editar',
          tabBarIcon: () => <Icon name="edit" size={22} color={textColor}/>,
        }}
      />
      <Tabs.Screen
        name="(tabs)/cancelar/index"
        options={{
          title: 'Cancelar',
          tabBarIcon: () => <Icon name="times-circle" size={22} color={textColor}/>,
        }}
      />
      <Tabs.Screen
        name="actualizar/index"
        options={{
          title: 'Actualizar',
          tabBarIcon: () => <Icon name="refresh" size={22} color={textColor}/>,
        }}
      />
      <Tabs.Screen
        name="actualizar/(etapas)"
        options={{
          href: null,  // Evita que expo-router lo tome como una tab
        }}
      />
      
    </Tabs>
  );
}