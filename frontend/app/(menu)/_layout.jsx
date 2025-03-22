import { Stack, useRouter } from 'expo-router';
import { Text, TouchableOpacity } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Colors } from '@/constants/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
// Prevent the splash screen from auto-hiding before asset loading is complete.
import "../../global.css";
export default function MenuLayout() {

  const backgroundColor = useThemeColor({ light: Colors.light.background, dark: Colors.dark.background }, 'background');
  const textColor = useThemeColor({ light: Colors.light.text, dark: Colors.dark.text }, 'text');
  const router = useRouter();

  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    router.replace('/'); // Redirigir al login
  };

  return (
    
      <Stack>  
        <Stack.Screen 
          name="menu" 
          options={{ 
            headerTitle:"Menu",
            headerStyle:{
              backgroundColor:backgroundColor,
            },
            headerTintColor:textColor,
            headerRight: () => (
                <TouchableOpacity onPress={handleLogout}>
                  <Text className='font-bold 'style={{ color:textColor}}>Cerrar sesion</Text>
                </TouchableOpacity>
              ),
          }} 
        />
        <Stack.Screen
            name='ordenes_produccion'
            options={{
                headerShown: false
            }}
        />
        <Stack.Screen
            name='inventariado/index'
            options={{
                headerShown: false
            }}
        />
        <Stack.Screen
            name='almacen/index'
            options={{ 
              headerTitle:"Menu",
              headerStyle:{
                backgroundColor:backgroundColor,
              },
              headerTintColor:textColor,
            }}
        />
      </Stack>
    
    
  );
}