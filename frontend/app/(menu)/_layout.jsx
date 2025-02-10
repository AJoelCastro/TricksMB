import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import Icon from 'react-native-vector-icons/FontAwesome';
export default function MenuLayout() {
  
  return (
    <GestureHandlerRootView >
      <Drawer  
      >
        <Drawer.Screen
          name="menu"
          options={{
            title: 'Inicio',
            drawerIcon: () => (<Icon name="home" size={20} color="blue"/>),
            
          }}
        />
        <Drawer.Screen
          name="ordenes_produccion"
          options={{
            title: 'Ordenes de Producción',
            drawerIcon: () => (<Icon name="list-alt" size={20} color="blue"/>),
          }}
        />
        <Drawer.Screen
          name="almacen/index"
          options={{
            title: 'Almacen',
            drawerIcon: () => (<Icon name="archive" size={20} color="blue"/>),
          }}
        />
        <Drawer.Screen
          name="inventariado/index"
          options={{
            title: 'Inventario',
            drawerIcon: () => (<Icon name="cubes" size={20} color="blue"/>),
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
