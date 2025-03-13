import axios from 'axios';
import AuthService from './AuthService';

const API_URL = process.env.EXPO_PUBLIC_API_URL;

const DetalleAreaTrabajoService= {

    createDetalleAreaTrabajo : async (nomArea, codigoPedido) =>{
        try{
            const token = await AuthService.getToken();
            if(!token) throw new Error("No hay token disponible");
            
            const response = await axios.post(`${API_URL}/detalleAreaTrabajo/crear`,{nomArea, codigoPedido}, {
                headers: {Authorization: `Bearer ${token}`}
            });

            return response.data;
        }catch(error){
            console.error("Error al crear detalle de área de trabajo: ", error.response?.data || error.message);
            throw error;
        }
    },
    obtenerTodos : async (codigoPedido) =>{
        try{
            const token = await AuthService.getToken();
            if(!token) throw new Error("No hay token disponible");
            
            const response = await axios.get(`${API_URL}/detalleAreaTrabajo/todos/${codigoPedido}`,{
                headers: {Authorization: `Bearer ${token}`}
            });

            return response.data;
        } catch(error){
            console.error("Error al obtener los detallles: ", error.response?.data || error.message);
            throw error;
        }
    },
    updatePedido : async (idCaracteristicas,datos) =>{
        try{
            const token = await AuthService.getToken();
            if(!token) throw new Error("No hay token disponible");
            
            const response = await axios.put(`${API_URL}/detalleAreaTrabajo/actualizar/${idCaracteristicas}`,datos,{
                headers: {Authorization: `Bearer ${token}`}
            });

            return response.data;
        } catch(error){
            console.error("Error al actualizar detalle del area de trabajo: ", error.response?.data || error.message);
            throw error;
        }
    },
    actualizarAreaTrabajo : async (codigoPedido) =>{        
        try{
            const token = await AuthService.getToken();
            if(!token) throw new Error("No hay token disponible");
            
            const response = await axios.put(`${API_URL}/detalleAreaTrabajo/actualizarAreaTrabajo/${codigoPedido}`,null,{
                headers: {Authorization: `Bearer ${token}`}
            });

            return response.data;
        } catch(error){
            console.error("Error al actualizar area de trabajo: ", error.response?.data || error.message);
            throw error;
        }
    }
}
export default DetalleAreaTrabajoService;