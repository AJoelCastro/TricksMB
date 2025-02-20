import axios from 'axios';
import AuthService from './AuthService'

const API_URL = process.env.EXPO_PUBLIC_API_URL;

const PedidoService = {
    
    crearPedido : async (datosPedido) =>{
        const token = await AuthService.getToken();
        console.log("Datos")
        if(!token) throw new Error("No hay token disponible");
        try{
            const response = await axios.post(`${API_URL}/pedido/crear`,datosPedido,{
                headers: {Authorization: `Bearer ${token}`}
            });
            return response.data;

        } catch(error){
            console.error("(pedidoService)Error al crear pedido: ", error.response?.data || error.message);
            throw error;
        }
    }
}
export default PedidoService;
