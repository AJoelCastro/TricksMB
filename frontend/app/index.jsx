import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  Text,
  View,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { TextInput } from 'react-native-paper';
import * as SplashScreen from 'expo-splash-screen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import CustomButtom from '../components/customButtom';
import AuthService from '@/services/AuthService'; // Importar servicio de autenticación

SplashScreen.preventAutoHideAsync(); // Asegura que la pantalla de carga no desaparezca antes de tiempo
const Home = () => {
  const router = useRouter();
  useEffect(() => {
    async function hideSplash() {
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simula un tiempo de carga
      await SplashScreen.hideAsync(); // Oculta la pantalla de splash
    }
    hideSplash();
  }, []);
  const [correo, setCorreo] = useState(''); // Estado para el email
  const [contrasenia, setContrasenia] = useState(''); // Estado para la contraseña
  const [loading, setLoading] = useState(true); // Estado para indicar si está cargando
  const [showPassword, setShowPassword] = useState(false);

  const isFormValid = correo.trim() !== '' && contrasenia.trim() !== ''; // Validación de campos llenos

  const handleLogin = async () => {
    if (!isFormValid) {
      Alert.alert('Error', 'Todos los campos son obligatorios.');
      return;
    }

    setLoading(true);
    try {
      await AuthService.login(correo, contrasenia);
      router.replace('/menu'); // Redirigir después de actualizar el estado
    } catch (error) {
      Alert.alert('Error', 'Credenciales incorrectas');
    }
    setLoading(false);
  };
  useEffect(() => {
    const checkAuth = async () => {
      const token = await AuthService.getToken();
      console.log('Token en Home.js:', token);

      if (token) {
        router.replace('/menu');
      } else {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  return (
    <GestureHandlerRootView>
      <SafeAreaView className='h-full bg-white flex'>
        {/* Logo */}
        <View className='flex items-center justify-center mt-16 '>
          <Image
            source={require('@/assets/images/namiTest.jpg')}
            style={{ width: 168, height: 168, borderRadius: 84 }}
          />
        </View>

        {/* Inputs */}
        <View>
          <View className='p-4 gap-2'>
            <TextInput
              label={'Correo'}
              placeholder='Ingrese su correo'
              mode='outlined'
              value={correo}
              onChangeText={setCorreo}
            />
            <TextInput
              label={'Contraseña'}
              placeholder='Ingrese su contraseña'
              mode='outlined'
              secureTextEntry={!showPassword}
              value={contrasenia}
              onChangeText={setContrasenia}
              right={
                <TextInput.Icon
                  icon={showPassword ? 'eye-off' : 'eye'}
                  onPress={() => setShowPassword(!showPassword)}
                />
              }
            />
          </View>
          <View className='flex-row items-center gap-4 mt-6 ml-16'>
            <Icon name='check' size={16} color='black' />
            <Text>Recordar Contraseña</Text>
          </View>

          {/* Botón de Iniciar Sesión */}
          <View className='mx-16 mt-2'>
            {loading ? (
              <ActivityIndicator size='small' color='#151718' />
            ) : (
              <CustomButtom
                title='Iniciar Sesión'
                touch={() => {
                  handleLogin();
                }}
                disabled={!isFormValid}
              />
            )}
          </View>
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default Home;
