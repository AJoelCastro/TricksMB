import axios from 'axios';

const API_URL = process.env.EXPO_PUBLIC_API_URL 

const AuthService = {
    login: async (email, contraseña) => {
        try {
            const response = await axios.post(`${API_URL}/usuario/login`, { email, contraseña });
            return response.data;
        } catch (error) {
            console.error("Error en el login:", error.response?.data || error.message);
            Alert.alert("Error de autenticación", "Hubo un problema al intentar iniciar sesión.");
            throw error;
        }
    },

    register: async (email, contraseña) => {
        try {
            const response = await axios.post(`${API_URL}/usuario/register`, { email, contraseña });
            return response.data;
        } catch (error) {
            console.error("Error en el registro:", error.response?.data || error.message);
            throw error;
        }
    }
};

export default AuthService;
