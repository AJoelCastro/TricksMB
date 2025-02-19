import axios from 'axios';
import AuthService from './AuthService';

const API_URL = process.env.EXPO_PUBLIC_API_URL;

const TipoCalzadoService = {
    getAllTipoCalzado: async () => {
        try {
            const token = await AuthService.getToken();
            const response = await axios.get(`${API_URL}/tipoCalzado/todos`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (error) {
            console.error("Error al obtener los tipo de calzado:", error.response?.data || error.message);
            throw error;
        }
    },
};

export default TipoCalzadoService;
