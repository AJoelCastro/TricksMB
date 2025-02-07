import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';


export default function ActualizarLayout() {

  return (
      <Stack>  
        <Stack.Screen name="index" options={{title: 'Actualizar Órdenes', headerShown: false }}  />
        <Stack.Screen name="alistado" options={{ headerShown: false }} />
        <Stack.Screen name="armado" options={{ headerShown: false }}/>
        <Stack.Screen name="corte" options={{ headerShown: false }} />
        <Stack.Screen name="perfilado" options={{ headerShown: false }}/>
        <StatusBar style="auto" />
      </Stack>
      
    
  );
}