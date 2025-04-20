import axios from 'axios';
import AuthService from './AuthService';

const API_URL = process.env.EXPO_PUBLIC_API_URL;

const CajaService = {
  createCaja: async codigoPedido => {
    const token = await AuthService.getToken();
    if (!token) {
      throw new Error('No hay token disponible');
    }
    try {
      const response = await axios.post(
        `${API_URL}/caja/crear/${codigoPedido}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      if (error.response) {
        // El servidor respondió con un código de error
        throw new Error(
          error.response.data.error ||
            `Error en la creación de la caja: ${error.response.status}`
        );
      } else if (error.request) {
        console.log('error.request', error.request);
        // No hubo respuesta del servidor
        throw new Error(
          'No se recibió respuesta del servidor. Verifique su conexión.'
        );
      } else {
        // Otro tipo de error
        throw new Error('Ocurrió un error inesperado al crear la caja.');
      }
    }
  },

  /*getAllCajaByPedido: async (codigoPedido) => {
        try {
            const token = await AuthService.getToken();
            if (!token) throw new Error("No hay token disponible");

            const response = await axios.get(`${API_URL}/caja/obtener/${codigoPedido}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (error) {
            console.error("Error al obtener cajas en CS FRONT:", error.response?.data || error.message);
            throw error;
        }
    },*/

  getCajaById: async id => {
    try {
      const token = await AuthService.getToken();
      if (!token) throw new Error('No hay token disponible');

      const response = await axios.get(`${API_URL}/caja/obtener/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      if (error.response) {
        // El servidor respondió con un código de error
        throw new Error(
          error.response.data.error ||
            `Error en obtener la caja por ID: ${error.response.status}`
        );
      } else if (error.request) {
        console.log('error.request', error.request);
        // No hubo respuesta del servidor
        throw new Error(
          'No se recibió respuesta del servidor. Verifique su conexión.'
        );
      } else {
        // Otro tipo de error
        throw new Error('Ocurrió un error inesperado al obtener la caja.');
      }
    }
  },
};

export default CajaService;
