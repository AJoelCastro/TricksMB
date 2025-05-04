import axios from 'axios';
import AuthService from './AuthService';

const API_URL = process.env.EXPO_PUBLIC_API_URL;

const TipoAlmacenService = {
  createTipoAlmacen: async (nombre) => {
    try {
      const token = await AuthService.getToken();
      if (!token) throw new Error('No hay token disponible');
      const response = await axios.post(`${API_URL}/tipoAlmacen/crear`,{nombre},
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
  
};

export default TipoAlmacenService;
