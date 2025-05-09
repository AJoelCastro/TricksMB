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
      throw error;
    }
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
      console.log('✅ Token válidooooo');
      return token;
    } catch (error) {
      throw error;
    }
  },
};

export default AuthService;
