import React, { useState, useEffect, useContext } from 'react';
import {
  SafeAreaView,
  Text,
  View,
  Alert,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { TextInput } from 'react-native-paper';
import * as SplashScreen from 'expo-splash-screen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';

import ShowError from '@/components/ShowError';
import { AuthContext } from '@/contexts/AuthContext';
import { ThemedText } from '@/components/ThemedText';
import { useAppColors } from '@/hooks/useAppColors';

import AuthService from '@/services/AuthService'; // Importar servicio de autenticación
import UserService from '@/services/UserService';

SplashScreen.preventAutoHideAsync(); // Asegura que la pantalla de carga no desaparezca antes de tiempo
const Home = () => {
  const router = useRouter();
  const [correo, setCorreo] = useState(''); // Estado para el email
  const [contrasenia, setContrasenia] = useState(''); // Estado para la contraseña
  const [loading, setLoading] = useState(false); // Estado para indicar si está cargando
  const [showPassword, setShowPassword] = useState(false);
  const { background, text, backIcon, icon } = useAppColors();
  const authContext = useContext(AuthContext);

  useEffect(() => {
    async function hideSplash() {
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simula un tiempo de carga
      await SplashScreen.hideAsync(); // Oculta la pantalla de splash
    }
    hideSplash();
  }, []);
  
  const isFormValid = correo.trim() !== '' && contrasenia.trim() !== ''; // Validación de campos llenos
  const handleLogin = async () => {
    if (!isFormValid) {
      Alert.alert('Error', 'Todos los campos son obligatorios.');
      return;
    }
    try {
      const dataLogin = await AuthService.login(correo, contrasenia);
      const dataUser = await UserService.getPerfil();
      authContext.logIn({token: dataLogin.token, name: dataUser.nombres, email: dataUser.correo, role: dataUser.rol});
    } catch (error) {
      ShowError(error);
      setLoading(true);
    }
    setLoading(false);
  };
  useEffect(() => {
    if (authContext.user?.role === 'ADMIN') {
        router.replace('/(ADMIN)/(routes)/dashboard');
    }
  }, [authContext.user]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      
      <SafeAreaView className='flex-1 h-full ' style={{position:'relative', backgroundColor: background}}>
        <View  style={{ height: '35%' }} >
          <Image
            source={require('@/assets/images/tricks_logo_white.svg')}
            style={{
              width: '100%',
              height: '100%',
              contentFit: 'contain',
            }}
          />
        </View>
        {/* Inputs */}
        <View 
          style={{
            position: 'absolute',
            top: '20%',
            height: '100%',
            width: '100%',
            // backgroundColor: backIconColor,
            borderTopLeftRadius: 120,
          }}
        >
          <View className='p-4 gap-2 mt-[15%]'>
            <TextInput
              label={'Correo'}
              placeholder='Ingrese su correo'
              mode='outlined'
              value={correo}
              textColor= {text}
              placeholderTextColor={text}
              onChangeText={setCorreo}
              style={{
                backgroundColor: backIcon,
              }}
            />
            <TextInput
              label={'Contraseña'}
              placeholder='Ingrese su contraseña'
              mode='outlined'
              style={{
                backgroundColor: backIcon,
              }}
              textColor= {text}
              placeholderTextColor={text}
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
            <Icon name='check' size={16} color={icon} />
            <ThemedText>Recordar Contraseña</ThemedText>
          </View>

          {/* Botón de Iniciar Sesión */}
          <View className='mt-8 items-center'>
            {loading ? (
              <ActivityIndicator size='small' color='#151718' />
            ) : (
              <Pressable
                onPress={() => {
                  handleLogin();
                }}
                disabled={!isFormValid}
                className={`rounded-md p-4 w-[90%] `}
                style={{
                  backgroundColor: backIcon,
                  borderWidth: 0.15,
                }}
              >
                <ThemedText 
                  className='text-center'
                  style={{
                    fontFamily: 'Inter-regular',
                    fontSize: 16,
                  }}
                >
                  Iniciar Sesión
                </ThemedText>
              </Pressable>
            )}
          </View>
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default Home;
