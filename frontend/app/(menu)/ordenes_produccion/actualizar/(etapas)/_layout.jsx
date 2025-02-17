import { Stack } from 'expo-router';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Colors } from '@/constants/Colors';

export default function EtapasLayout() {
  const backgroundColor = useThemeColor({ light: Colors.light.background, dark: Colors.dark.background }, 'background');
  const textColor = useThemeColor({ light: Colors.light.text, dark: Colors.dark.text }, 'text');

  return (
    <Stack>
      <Stack.Screen 
        name="corte" 
        options={{ 
          title: 'Corte',
          headerStyle: { backgroundColor },
          headerTintColor: textColor,
        }} 
      />
      <Stack.Screen 
        name="perfilado" 
        options={{ 
          title: 'Perfilado',
          headerStyle: { backgroundColor },
          headerTintColor: textColor,
        }} 
      />
      <Stack.Screen 
        name="armado" 
        options={{ 
          title: 'Armado',
          headerStyle: { backgroundColor },
          headerTintColor: textColor,
        }} 
      />
      <Stack.Screen 
        name="alistado" 
        options={{ 
          title: 'Alistado',
          headerStyle: { backgroundColor },
          headerTintColor: textColor,
        }} 
      />
      
    </Stack>
  );
}