import axios from 'axios';
import AuthService from './AuthService';

const API_URL = process.env.EXPO_PUBLIC_API_URL;

const UserService = {
  getPerfil: async () => {
    const token = await AuthService.getToken();
    if (!token) throw new Error('No hay token disponible');

    try {
      const response = await axios.get(`${API_URL}/usuario/perfil`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      if (error.response) {
        throw new Error(
          error.response.data.error ||
            `Error al obtener el perfil: ${error.response.status}`
        );
      } else if (error.request) {
        throw new Error(
          'No se recibió respuesta del servidor. Verifique su conexión.'
        );
      } else {
        throw new Error('Ocurrió un error inesperado al obtener el perfil.');
      }
    }
  },
};

export default UserService;
