import { Stack } from 'expo-router';

import { AuthProvider } from '../contexts/AuthContext';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Colors } from '@/constants/Colors';
// Prevent the splash screen from auto-hiding before asset loading is complete.
import '../global.css';
import { PaperProvider } from 'react-native-paper';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';

export default function RootLayout() {

  const colorScheme = useColorScheme();
  const backgroundColor = useThemeColor(
    { light: Colors.light.background, dark: Colors.dark.background },
    'background'
  );
  const textColor = useThemeColor(
    { light: Colors.light.text, dark: Colors.dark.text },
    'text'
  );
  return (
    <AuthProvider>
      <PaperProvider>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
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
              name='(ADMIN)'
              options={{
                headerShown: false,
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
        </ThemeProvider>
      </PaperProvider>
    </AuthProvider>
  );
}
