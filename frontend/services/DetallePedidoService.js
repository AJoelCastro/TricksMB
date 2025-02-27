import axios from 'axios';
import AuthService from './AuthService'

const API_URL = process.env.EXPO_PUBLIC_API_URL;

const DetallePedidoService = {
    
    crearPedido : async (datosPedido) =>{
        const token = await AuthService.getToken();
        if(!token) throw new Error("No hay token disponible");
        try{
            const response = await axios.post(`${API_URL}/detallePedido/crear`,datosPedido,{
                headers: {Authorization: `Bearer ${token}`}
            });
            return response.data;

        } catch(error){
            console.error("(pedidoService)Error al crear pedido: ", error.response?.data || error.message);
            throw error;
        }
    },
    obtenerDetallePedido: async (codigoPedido) => {
        const token = await AuthService.getToken();
        if (!token) throw new Error("No hay token disponible");
        try {
            const response = await axios.get(`${API_URL}/detallePedido/obtener/${codigoPedido}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (error) {
            console.error("(pedidoService) Error al obtener detalle del pedido: ", error.response?.data || error.message);
            throw error;
        }
    },
    updateDetallePedido: async (codigoPedido, datosPedido) => {
        const token = await AuthService.getToken();
        if(!token) throw new Error("No hay token disponible");
        try{
            const response = await axios.put(`${API_URL}/detallePedido/actualizar/${codigoPedido}`,datosPedido,{
                headers: {Authorization: `Bearer ${token}`}
            });
            return response.data;

        } catch(error){
            console.error("(pedidoService)Error al actualizar pedido: ", error.response?.data || error.message);
            throw error;
        }
    }
}
export default DetallePedidoService;
