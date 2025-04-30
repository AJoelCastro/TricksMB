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
import AuthService from '@/services/AuthService'; // Importar servicio de autenticación
import ShowError from '@/components/ShowError';
import { AuthContext } from '@/contexts/AuthContext';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Colors } from '@/constants/Colors';

SplashScreen.preventAutoHideAsync(); // Asegura que la pantalla de carga no desaparezca antes de tiempo
const Home = () => {

  const [correo, setCorreo] = useState(''); // Estado para el email
  const [contrasenia, setContrasenia] = useState(''); // Estado para la contraseña
  const [loading, setLoading] = useState(false); // Estado para indicar si está cargando
  const [showPassword, setShowPassword] = useState(false);

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
      const data = await AuthService.login(correo, contrasenia);
      authContext.logIn({token: data.token, role: ''});
    } catch (error) {
      ShowError(error);
      setLoading(true);
    }
    setLoading(false);
  };

  const backgroundColor = useThemeColor(
    { light: Colors.light.background, dark: Colors.dark.background },
    'background'
  );
  const textColor = useThemeColor(
      { light: Colors.light.text, dark: Colors.dark.text },
      'text'
  );
  const iconColor = useThemeColor(
      { light: Colors.light.icon, dark: Colors.dark.icon },
      'icon'
  );
  const tabColor = useThemeColor(
      { light: Colors.light.tabIconSelected, dark: Colors.dark.tabIconSelected },
      'tabIconSelected'
  );
  const backIconColor = useThemeColor(
      { light: Colors.light.backIcon, dark: Colors.dark.backIcon },
      'backIcon'
  );
  const contentColor = useThemeColor(
      { light: Colors.light.content, dark: Colors.dark.content },
      'content'
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      
      <SafeAreaView className='flex-1 h-full' style={{position:'relative', backgroundColor:''}}>
        {/* Logo
        <View className='flex items-center justify-center mt-16 '>
          <Image
            source={require('@/assets/images/namiTest.jpg')}
            style={{ width: 168, height: 168, borderRadius: 84 }}
          />
        </View> */}
        <View  style={{ height: '20%', backgroundColor: '' }} >
          <Image
            source={require('@/assets/images/TricksLogo.png')}
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
            backgroundColor: 'white',
            borderTopLeftRadius: 120,
          }}
        >
          <View className='p-4 gap-2 mt-[15%]'>
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
          <View className='mt-8 items-center'>
            {loading ? (
              <ActivityIndicator size='small' color='#151718' />
            ) : (
              <Pressable
                onPress={() => {
                  handleLogin();
                }}
                disabled={!isFormValid}
                className={`bg-gray-100 rounded-md p-4 w-[90%] `}
              >
                <Text 
                  className='text-[#634AFF] text-center'
                  style={{
                    fontFamily: 'Inter-regular',
                    fontSize: 16,
                  }}
                >
                  Iniciar Sesión
                </Text>
              </Pressable>
            )}
          </View>
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default Home;
