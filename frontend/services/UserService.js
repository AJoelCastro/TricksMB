import axios from 'axios';
import AuthService from './AuthService';

const API_URL = process.env.EXPO_PUBLIC_API_URL;

const UserService = {
    getPerfil: async () => {
        const token = await AuthService.getToken();
        if (!token) throw new Error("No hay token disponible");

        try {
            const response = await axios.get(`${API_URL}/usuario/perfil`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (error) {
            console.error("Error obteniendo perfil:", error.response?.data || error.message);
            throw error;
        }
    }
};

export default UserService;
