import React from 'react';
import { IconSymbol } from '@/components/ui/IconSymbol';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';

export default function MenuLayout() {
  return (
    <GestureHandlerRootView >
      <Drawer  
      >
        <Drawer.Screen
          name="menu"
          options={{
            title: 'Inicio',
            drawerIcon: ({ color }) => (<IconSymbol size={28} name="house.fill" color={color} />),
            
          }}
        />
        <Drawer.Screen
          name="ordenes_produccion"
          options={{
            title: 'Ordenes de Producción',
            drawerIcon: ({ color }) => (<IconSymbol size={28} name="house.fill" color={color} />),
          }}
        />
        <Drawer.Screen
          name="almacen/index"
          options={{
            title: 'Almacen',
            drawerIcon: ({ color }) => (<IconSymbol size={28} name="house.fill" color={color} />),
          }}
        />
        <Drawer.Screen
          name="inventariado/index"
          options={{
            title: 'Inventario',
            drawerIcon: ({ color }) => (<IconSymbol size={28} name="house.fill" color={color} />),
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
