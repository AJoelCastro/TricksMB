import axios from 'axios';
import AuthService from './AuthService';

const API_URL = process.env.EXPO_PUBLIC_API_URL;

const EmpleadoService = {
    crearDetalleEmpleadoPedido: async (dni, codigoPedido) => {
        try {
            const token = await AuthService.getToken();
            if (!token) throw new Error("No hay token disponible");

            const response = await axios.post(`${API_URL}/empleado/crearDetalleEmpleadoPedido`, {dni, codigoPedido}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (error) {
            console.error("Error al crear cliente:", error.response?.data || error.message);
            throw error;
        }
    },
    obtenerAllDetalleEmpleadoPedido: async () => {
        try {
            const token = await AuthService.getToken();
            const response = await axios.get(`${API_URL}/cliente/clientes`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (error) {
            console.error("Error al obtener clientes:", error.response?.data || error.message);
            throw error;
        }
    },
};

export default EmpleadoService;