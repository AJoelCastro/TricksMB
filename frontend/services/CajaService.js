import axios from 'axios';
import AuthService from './AuthService';

const API_URL = process.env.EXPO_PUBLIC_API_URL;

const CajaService = {
    createCaja: async (codigoPedido) => {
        try {
            const token = await AuthService.getToken();
            if (!token) throw new Error("No hay token disponible");

            const response = await axios.post(`${API_URL}/caja/crear/${codigoPedido}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (error) {
            console.error("Error al crear cajas en CS FRONT:", error.response?.data || error.message);
            throw error;
        }
    },
    
    /*getAllCajaByPedido: async (codigoPedido) => {
        try {
            const token = await AuthService.getToken();
            if (!token) throw new Error("No hay token disponible");

            const response = await axios.get(`${API_URL}/caja/obtener/${codigoPedido}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (error) {
            console.error("Error al obtener cajas en CS FRONT:", error.response?.data || error.message);
            throw error;
        }
    },*/

    getCajaById: async (id) => {
        try {
            const token = await AuthService.getToken();
            if (!token) throw new Error("No hay token disponible");

            const response = await axios.get(`${API_URL}/caja/obtener/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (error) {
            console.error("Error al obtener caja por id en CS FRONT:", error.response?.data || error.message);  
            throw error;
        }
    }
};

export default CajaService;