import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { AuthProvider } from '../contexts/AuthContext';
// Prevent the splash screen from auto-hiding before asset loading is complete.

export default function RootLayout() {

  return (
    <AuthProvider>
      <Stack>  
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal' }}/>
        <Stack.Screen name="(menu)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
        <StatusBar style="auto" />
      </Stack>
    </AuthProvider>
    
  );
}