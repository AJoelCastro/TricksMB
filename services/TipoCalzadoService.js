import axios from 'axios';
import AuthService from './AuthService';

const API_URL = process.env.EXPO_PUBLIC_API_URL;

const TipoCalzadoService = {
  createTipoCalzado: async (tipoCalzado) => {
    try {
      const token = await AuthService.getToken();
      let nombre = tipoCalzado;
      const response = await axios.post(`${API_URL}/tipoCalzado/crear`,{nombre},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      return response.data;
    }
    catch (error) {
      throw error;
    }
  },
  
  getAllTipoCalzado: async () => {
    try {
      const token = await AuthService.getToken();
      const response = await axios.get(`${API_URL}/tipoCalzado/todos`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getTipoCalzadoByCodigoPedido: async codigoPedido => {
    const token = await AuthService.getToken();
    if (!token) throw new Error('No hay token disponible');
    try {
      const response = await axios.get(
        `${API_URL}/tipoCalzado/obtener/${codigoPedido}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default TipoCalzadoService;
