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
    getAllModeloById: async (id) => {
        console.log(id);
        try {
            const token = await AuthService.getToken();
            const response = await axios.get(`${API_URL}/modelo/id`, {
                headers: { Authorization: `Bearer ${token}` },
                params:{id}
            });
            return response.data;
        } catch (error) {
            console.error("Error al obtener los modelos por id:", error.response?.data || error.message);
            throw error;
        }
    },
    getModeloByCodigoPedido: async (codigoPedido) => {
        try {
            const token = await AuthService.getToken();
            const response = await axios.get(`${API_URL}/modelo/obtener/${codigoPedido}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (error) {
            console.error("Error al obtener el modelo por código de pedido:", error.response?.data || error.message);
            throw error;
        }
    },
    getImagenById: async (idModelo) => {
        try {
            const token = await AuthService.getToken();
            const response = await axios.get(`${API_URL}/modelo/imagen/${idModelo}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (error) {
            console.error("Error al obtener imagenes por idModelo:", error.response?.data || error.message);
            throw error;
        }
    },
};

export default ModeloService;
