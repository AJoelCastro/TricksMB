import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = process.env.EXPO_PUBLIC_API_URL;

const AuthService = {
    login: async (correo, contrasenia) => {
        try {
            
            const response = await axios.post(`${API_URL}/usuario/login`, { correo, contrasenia });

            
            const { token } = response.data;
            if (token) {
                const expiresAt = Date.now() + 3 * 60 * 1000; // Tiempo actual + 3 minutos
                await AsyncStorage.setItem('token', token); // Guardar token en almacenamiento local
                await AsyncStorage.setItem("expiresAt", expiresAt.toString());

                console.log("Token guardado:", token);
                console.log("Expira en:", expiresAt);
            }
            return response.data;
        } catch (error) {
            console.error("Error en el login:", error.response?.data || error.message);
            throw error;
        }
    },

    logout: async () => {
        await AsyncStorage.removeItem("token");
        await AsyncStorage.removeItem("expiresAt");
    },

    getToken: async () => {
        try {
            const token = await AsyncStorage.getItem("token");
            const expiresAt = await AsyncStorage.getItem("expiresAt");

            console.log("Recuperando token:", token);
            console.log("Expira en:", expiresAt);

            if (!token || !expiresAt) return null;

            if (Date.now() > parseInt(expiresAt)) {
                console.log("Token expirado, cerrando sesión...");
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

