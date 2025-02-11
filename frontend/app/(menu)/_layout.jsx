import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Colors } from '@/constants/Colors';

export default function MenuLayout() {
  
  const backgroundColor = useThemeColor({ light: Colors.light.background, dark: Colors.dark.background }, 'background');
  const textColor = useThemeColor({ light: Colors.light.text, dark: Colors.dark.text }, 'text');
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
            headerStyle: {
              backgroundColor: backgroundColor, // Cambia el color de fondo del header
            },
            headerTintColor: textColor,
          }}
          
        />
        <Drawer.Screen
          name="ordenes_produccion"
          options={{
            title: 'Ordenes de Producción',
            drawerIcon: () => (<Icon name="list-alt" size={20} color="blue"/>),
            headerStyle: {
              backgroundColor: backgroundColor, // Cambia el color de fondo del header
            },
            headerTintColor: textColor,
          }}
        />
        <Drawer.Screen
          name="almacen/index"
          options={{
            title: 'Almacen',
            drawerIcon: () => (<Icon name="archive" size={20} color="blue"/>),
            headerStyle: {
              backgroundColor: backgroundColor, // Cambia el color de fondo del header
            },
            headerTintColor: textColor,
          }}
        />
        <Drawer.Screen
          name="inventariado/index"
          options={{
            title: 'Inventario',
            drawerIcon: () => (<Icon name="cubes" size={20} color="blue"/>),
            headerStyle: {
              backgroundColor: backgroundColor, // Cambia el color de fondo del header
            },
            headerTintColor: textColor,
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
