import axios from 'axios';
import AuthService from './AuthService';

const API_URL = process.env.EXPO_PUBLIC_API_URL;

const DetalleAlmacenService = {
  createDetalleAlmacen: async (nombreAlmacen, codigoPedido) => {
    try {
      const token = await AuthService.getToken();
      if (!token) {
        throw new Error('No hay token disponible');
      }
      const response = await axios.post(
        `${API_URL}/detalleAlmacen/crear`,
        {
          nombreAlmacen,
          codigoPedido,
        },
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
            `Error en la creacion del detalle almacen: ${error.response.status}`
        );
      } else if (error.request) {
        console.log('error.request', error.request);
        // No hubo respuesta del servidor
        throw new Error(
          'No se recibió respuesta del servidor. Verifique su conexión.'
        );
      } else {
        // Otro tipo de error
        throw new Error(
          'Ocurrió un error inesperado al crear el detalle almacen.'
        );
      }
    }
  },
  updateCantidadIngreso: async (codigoPedido, cantidad) => {
    try {
      const token = await AuthService.getToken();
      if (!token) {
        throw new Error('No hay token disponible');
      }
      const response = await axios.put(
        `${API_URL}/detalleAlmacen/actualizarCantidadIngreso/${codigoPedido}`,
        {
          cantidad,
        },
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
            `Error en la actualización de la cantidad: ${error.response.status}`
        );
      } else if (error.request) {
        console.log('error.request', error.request);
        // No hubo respuesta del servidor
        throw new Error(
          'No se recibió respuesta del servidor. Verifique su conexión.'
        );
      } else {
        // Otro tipo de error
        throw new Error(
          'Ocurrió un error inesperado al actualizar la cantidad.'
        );
      }
    }
  },
  updateCantidadSalida: async (codigoPedido, cantidad) => {
    try {
      const token = await AuthService.getToken();
      if (!token) {
        throw new Error('No hay token disponible');
      }
      const response = await axios.put(
        `${API_URL}/detalleAlmacen/actualizarCantidadSalida/${codigoPedido}`,
        {
          cantidad,
        },
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
            `Error en la actualización de la cantidad: ${error.response.status}`
        );
      } else if (error.request) {
        console.log('error.request', error.request);
        // No hubo respuesta del servidor
        throw new Error(
          'No se recibió respuesta del servidor. Verifique su conexión.'
        );
      } else {
        // Otro tipo de error
        throw new Error(
          'Ocurrió un error inesperado al actualizar la cantidad.'
        );
      }
    }
  },
  updateAlmacen: async (codigoPedido, nombreAlmacen) => {
    try {
      const token = await AuthService.getToken();
      if (!token) {
        throw new Error('No hay token disponible');
      }
      const response = await axios.put(
        `${API_URL}/detalleAlmacen/actualizar/${codigoPedido}`,
        {
          nombreAlmacen,
        },
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
            `Error en la actualización del almacen: ${error.response.status}`
        );
      } else if (error.request) {
        console.log('error.request', error.request);
        // No hubo respuesta del servidor
        throw new Error(
          'No se recibió respuesta del servidor. Verifique su conexión.'
        );
      } else {
        // Otro tipo de error
        throw new Error(
          'Ocurrió un error inesperado al actualizar el almacen.'
        );
      }
    }
  }
};

export default DetalleAlmacenService;
