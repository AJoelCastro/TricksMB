import { Stack } from 'expo-router';
import React from 'react';
import { Image, Platform, View } from 'react-native';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { DrawerContent } from '@react-navigation/drawer';
import { Icon } from 'react-native-paper';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Colors } from '@/constants/Colors';
export default function AdminRoutesLayout() {

  const iconColor = useThemeColor({ light: Colors.light.icon, dark: Colors.dark.icon }, 'icon');
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer>
        <Drawer.Screen
          name="dashboard/index" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: 'Dashboard',
            headerShown: false,
            drawerIcon: () => (
              <Icon
                source='home'
                color={iconColor}
                size={24}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="ordenes" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: 'Ordenes',
            headerShown: false,
            drawerIcon: () => (
              <Icon
                source='file-cog'
                color={iconColor}
                size={24}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="almacenes/index" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: 'Almacenes',
            headerShown: false,
            drawerIcon: () => (
              <Icon
                source='warehouse'
                color={iconColor}
                size={24}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="historial/index" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: 'Historial de Pedidos',
            headerShown: false,
            drawerIcon: () => (
              <Icon
                source='history'
                color={iconColor}
                size={24}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="inventario/index" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: 'Inventario',
            headerShown: false,
            drawerIcon: () => (
              <Icon
                source='package-variant'
                color={iconColor}
                size={24}
              />
            ),
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}