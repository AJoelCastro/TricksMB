import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
            throw error;
        }
    },

    logout: async () => {
        await AsyncStorage.removeItem('token'); // Eliminar token al cerrar sesión
    },

    getToken: async () => {
        return await AsyncStorage.getItem('token'); // Obtener token almacenado
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

