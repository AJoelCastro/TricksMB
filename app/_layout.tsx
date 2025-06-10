import { Stack } from 'expo-router';
import { AuthProvider } from '../contexts/AuthContext';
import { useColorScheme } from '@/hooks/useColorScheme';
// Prevent the splash screen from auto-hiding before asset loading is complete.
import '../global.css';
import { PaperProvider } from 'react-native-paper';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useAppColors } from '@/hooks/useAppColors';

export default function RootLayout() {

  const colorScheme = useColorScheme();
  const { background, text } = useAppColors();
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
                  backgroundColor: background,
                },
                headerTintColor: text,
              }}
            />
            <Stack.Screen
              name='(ADMIN)'
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name='+not-found'
              options={{
                headerStyle: {
                  backgroundColor: background,
                },
                headerTintColor: text,
              }}
            />
          </Stack>
        </ThemeProvider>
      </PaperProvider>
    </AuthProvider>
  );
}
