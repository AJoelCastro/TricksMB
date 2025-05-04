import axios from 'axios';
import AuthService from './AuthService';

const API_URL = process.env.EXPO_PUBLIC_API_URL;

const ImagenService = {
    createImagen: async (idModelo, url) => {
    try {
      const token = await AuthService.getToken();
      if (!token)
        throw new Error(
          '⚠️ No se recibió un token en la respuesta del servidor.'
        );
      const response = await axios.post(`${API_URL}/imagen/crear`,{idModelo,url}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    }catch (error) {
      throw error;
    }
  },
  getImagenById: async idModelo => {
    try {
      const token = await AuthService.getToken();
      if (!token)
        throw new Error(
          '⚠️ No se recibió un token en la respuesta del servidor.'
        );
      const response = await axios.get(`${API_URL}/modelo/imagen/${idModelo}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      if (error.response) {
        // El servidor respondió con un código de error
        throw new Error(
          error.response.data.error ||
            `Error en obtener imagen: ${error.response.status}`
        );
      } else if (error.request) {
        console.log('error.request', error.request);
        // No hubo respuesta del servidor
        throw new Error(
          'No se recibió respuesta del servidor. Verifique su conexión.'
        );
      } else {
        // Otro tipo de error
        throw new Error('Ocurrió un error inesperado al obtener imagen.');
      }
    }
  },
};

export default ImagenService;
