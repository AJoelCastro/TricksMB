import axios from 'axios';
import AuthService from './AuthService';

const API_URL = process.env.EXPO_PUBLIC_API_URL;

const ModeloService = {
    getAllModelo: async () => {
        try {
            const token = await AuthService.getToken();
            const response = await axios.get(`${API_URL}/modelo/todos`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error("Error al obtener los modelos:", error.response?.data || error.message);
            throw error;
        }
    },
};

export default ModeloService;
