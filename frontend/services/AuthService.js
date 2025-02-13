import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';

const API_URL = process.env.EXPO_PUBLIC_API_URL;

const AuthService = {
    login: async (correo, contrasenia) => {
        try {
            const response = await axios.post(`${API_URL}/usuario/login`, { correo, contrasenia });
            const { token } = response.data;
            if (token) {
                await AsyncStorage.setItem('token', token);
                console.log("Token guardado:", token);
            }
            return response.data;
        } catch (error) {
            console.error("Error en el login:", error.response?.data || error.message);
            throw error;
        }
    },

    logout: async () => {
        console.log("Cerrando sesión...");
        
        await AsyncStorage.removeItem("token"); // Eliminar token
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
    }
};

export default AuthService;
