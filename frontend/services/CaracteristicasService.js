import axios from 'axios';
import AuthService from './AuthService'
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

const API_URL = process.env.EXPO_PUBLIC_API_URL;

const CaracteristicasService = {
    
    crearCaracteristicas : async (datosCaracteristicas) =>{
        console.log(datosCaracteristicas)
        const token = await AuthService.getToken();
        if(!token) throw new Error("No hay token disponible");
        try{
            const response = await axios.post(`${API_URL}/caracteristicas/crear`,datosCaracteristicas,{
                headers: {Authorization: `Bearer ${token}`}
            });
            return response.data;

        } catch(error){
            console.error("(CaracteristicasService)Error al crear caracteristicas: ", error.response?.data || error.message);
            throw error;
        }
    },
    getAllCaracteristicasById : async (idDetallePedido) => {
        const token = await AuthService.getToken();
        if (!token) throw new Error("No hay token disponible");
        try {
            const response = await axios.get(`${API_URL}/caracteristicas/todos/${idDetallePedido}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error("(CaracteristicasService) Error al obtener caracteristicas: ", error.response?.data || error.message);
            throw error;
        }
    }
}
export default CaracteristicasService;