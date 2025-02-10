import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {jwtDecode} from 'jwt-decode';
const API_URL = process.env.EXPO_PUBLIC_API_URL;

const AuthService = {
    login: async (correo, contrasenia) => {
        try { 
            const response = await axios.post(`${API_URL}/usuario/login`, { correo, contrasenia });
            const { token } = response.data;
            if (token) {
                await AsyncStorage.setItem('token', token); // Guardar token en almacenamiento local
                console.log("Token guardado:", token);
            }
            return response.data;
        } catch (error) {
            console.error("Error en el login:", error.response?.data || error.message);
            console.log(error);
            throw error;
        }
    },

    logout: async () => {
        await AsyncStorage.removeItem("token");

    },

    getToken: async () => {
        try {
            const token = await AsyncStorage.getItem("token");

            console.log("Recuperando token:", token);

            if (!token) return null;
            const decoded = jwtDecode(token);
            
            if (decoded.exp * 1000 < Date.now()) {
                await AuthService.logout();
                return null;
            }
            return token;
        } catch (error) {
            console.error("Error obteniendo token:", error);
            return null;
        }
    },

    register: async (correo, contrasenia) => {
        try {
            const response = await axios.post(`${API_URL}/usuario/register`, { correo, contrasenia });
            return response.data;
        } catch (error) {
            console.error("Error en el registro:", error.response?.data || error.message);
            throw error;
        }
    }
};

export default AuthService;

