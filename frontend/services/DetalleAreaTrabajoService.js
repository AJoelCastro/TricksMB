import axios from 'axios';
import AuthService from './AuthService'

const API_URL = process.env.EXPO_PUBLIC_API_URL;

const DetalleAreaTrabajoService= {
    
    crearPedido : async (datos) =>{
        try{
            const token = await AuthService.getToken();
            if(!token) throw new Error("No hay token disponible");
            
            const response = await axios.post(`${API_URL}/actualizarPorArea/crear`,datos,{
                headers: {Authorization: `Bearer${token}`}
            });

            return response.data;
        } catch(error){
            console.error("Error al crear detalleArea: ", error.response?.data || error.message);
            throw error;
        }
    }
}