import { Stack, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, TouchableOpacity } from 'react-native';
import { AuthProvider } from '../contexts/AuthContext';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Colors } from '@/constants/Colors';
// Prevent the splash screen from auto-hiding before asset loading is complete.
import '../global.css';
export default function RootLayout() {
  const backgroundColor = useThemeColor(
    { light: Colors.light.background, dark: Colors.dark.background },
    'background'
  );
  const textColor = useThemeColor(
    { light: Colors.light.text, dark: Colors.dark.text },
    'text'
  );
  const router = useRouter(); 
  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    router.replace('/'); // Redirigir al login
  };
  return (
    <AuthProvider>
      <Stack>
        <Stack.Screen
          name='index'
          options={{
            headerTitle: '',
            headerStyle: {
              backgroundColor: backgroundColor,
            },
            headerTintColor: textColor,
          }}
        />
        <Stack.Screen
          name='modalCliente'
          options={{
            presentation: 'modal',
            headerTitle: 'Cliente Nuevo',
            headerStyle: {
              backgroundColor: backgroundColor,
            },
            headerTintColor: textColor,
          }}
        />
        <Stack.Screen
          name='(menu)'
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name='+not-found'
          options={{
            headerStyle: {
              backgroundColor: backgroundColor,
            },
            headerTintColor: textColor,
          }}
        />
      </Stack>
    </AuthProvider>
  );
}
