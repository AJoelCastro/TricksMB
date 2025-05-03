import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';

const API_URL = process.env.EXPO_PUBLIC_API_URL;

const AuthService = {
  login: async (correo, contrasenia) => {
    try {
      const response = await axios.post(`${API_URL}/usuario/login`, {
        correo,
        contrasenia,
      });
      const token = response.data?.token;
      if (!token) {
        throw new Error(
          '⚠️ Credenciales Incorrectas.'
        );
      }

      await AsyncStorage.setItem('token', token);
      return response.data;
    }catch (error) {
      if (error.message) {
        // El servidor respondió con un código de error
          throw Error(error.message) || `Error al obtener el token de acceso: ${error.response.status}`
      } else if (error.request) {
        // No hubo respuesta del servidor
        throw new Error(
          'No se recibió respuesta del servidor. Verifique su conexión.'
        );
      } else {
        // Otro tipo de error
        throw new Error('Ocurrió un error inesperado al iniciar sesion.');
      }
    }
  },

  logout: async () => {
    console.log('Cerrando sesión...');
    await AsyncStorage.removeItem('token'); // Eliminar token
  },

  getToken: async () => {
    try {
      const token = await AsyncStorage.getItem('token');

      if (!token) return null;

      let decoded;
      try {
        decoded = jwtDecode(token);
      } catch (error) {
        console.error('❌ Token inválido:', error);
        await AuthService.logout();
        return null;
      }

      // Verificar si el token ha expirado
      if (decoded.exp * 1000 < Date.now()) {
        console.warn('⚠️ Token expirado. Cerrando sesión...');
        await AuthService.logout();
        return null;
      }

      return token;
    } catch (error) {
      if (error.response) {
        // El servidor respondió con un código de error
        throw new Error(
          error.response||
            `Error al obtener el token: ${error.response.status}`
        );
      } else if (error.request) {
        // No hubo respuesta del servidor
        throw new Error(
          'No se recibió respuesta del servidor. Verifique su conexión.'
        );
      } else {
        // Otro tipo de error
        throw new Error('Ocurrió un error inesperado al obtener el token.');
      }
    }
  },
};

export default AuthService;
