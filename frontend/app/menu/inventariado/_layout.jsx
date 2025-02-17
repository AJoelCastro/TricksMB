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
        screenOptions={{
          drawerStyle:{
            backgroundColor: backgroundColor,
            
          },
          drawerInactiveTintColor: textColor,
          drawerActiveTintColor: textColor,
        }}
      >
        <Drawer.Screen
          name="index"
          options={{
            title: 'Inicio',
            drawerIcon: () => (<Icon name="home" size={20} color="blue"/>),
            headerRight: () => (
              <TouchableOpacity onPress={handleLogout}>
                <Text className='font-bold 'style={{ color:textColor}}>Cerrar sesion</Text>
              </TouchableOpacity>
            ),
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
