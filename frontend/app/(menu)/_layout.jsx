import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

export default function MenuLayout() {

  const router = useRouter();

  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    router.replace('/'); // Redirigir al login
  };
  return (
    <GestureHandlerRootView >
      <Drawer  
      >
        <Drawer.Screen
          name="menu"
          options={{
            title: 'Inicio',
            drawerIcon: () => (<Icon name="home" size={20} color="blue"/>),
            headerRight: () => (
              <TouchableOpacity onPress={handleLogout}>
                <Text className='font-bold '>Cerrar sesion</Text>
              </TouchableOpacity>
            ),
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
