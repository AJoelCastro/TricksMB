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
    },
    updateEstado: async (codigoPedido, estado) => {
        const token = await AuthService.getToken();
        if(!token) throw new Error("No hay token disponible");
        try{
            const response = await axios.put(`${API_URL}/detallePedido/actualizarEstado/${codigoPedido}`,{ estado },{
                headers: {Authorization: `Bearer ${token}`}
            });
            return response.data;

        } catch(error){
            console.error("(pedidoService)Error al actualizar pedido: ", error.response?.data || error.message);
            throw error;
        }
    }, 
    obtenerTodosLosPedidos: async () => {
        try {
            const token = await AuthService.getToken();
            if (!token) throw new Error("No hay token disponible");
            const response = await axios.get(`${API_URL}/detallePedido/todos`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (error) {
            if (error.response) {
                console.log("error.response",error.response);
                // El servidor respondió con un código de error
                console.log("error.response.data.error",error.response.data.error);
                throw new Error(error.response.data.error || `Error en la creación de la caja: ${error.response.status}`);
            } else if (error.request) {
                console.log("error.request",error.request);
                // No hubo respuesta del servidor
                throw new Error("No se recibió respuesta del servidor. Verifique su conexión.");
            } else {
                // Otro tipo de error
                throw new Error("Ocurrió un error inesperado al crear la caja.");
            }
        }
    }
    
}
export default DetallePedidoService;
