import axios from 'axios';
import AuthService from './AuthService';

const API_URL = process.env.EXPO_PUBLIC_API_URL;

const DetallePedidoService = {
  crearPedido: async datosPedido => {
    const token = await AuthService.getToken();
    if (!token) throw new Error('No hay token disponible');
    try {
      const response = await axios.post(
        `${API_URL}/detallePedido/crear`,
        datosPedido,
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
            `Error al crear el pedido: ${error.response.status}`
        );
      } else if (error.request) {
        console.log('error.request', error.request);
        // No hubo respuesta del servidor
        throw new Error(
          'No se recibió respuesta del servidor. Verifique su conexión.'
        );
      } else {
        // Otro tipo de error
        throw new Error('Ocurrió un error inesperado al crear el pedido.');
      }
    }
  },
  obtenerDetallePedido: async codigoPedido => {
    const token = await AuthService.getToken();
    if (!token) throw new Error('No hay token disponible');
    try {
      const response = await axios.get(
        `${API_URL}/detallePedido/obtener/${codigoPedido}`,
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
            `Error al obtener el detalle del pedido: ${error.response.status}`
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
          'Ocurrió un error inesperado al obtener el detalle del pedido.'
        );
      }
    }
  },
  updateDetallePedido: async (codigoPedido, datosPedido) => {
    const token = await AuthService.getToken();
    if (!token) throw new Error('No hay token disponible');
    try {
      const response = await axios.put(
        `${API_URL}/detallePedido/actualizar/${codigoPedido}`,
        datosPedido,
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
            `Error al actualizar el pedido: ${error.response.status}`
        );
      } else if (error.request) {
        console.log('error.request', error.request);
        // No hubo respuesta del servidor
        throw new Error(
          'No se recibió respuesta del servidor. Verifique su conexión.'
        );
      } else {
        // Otro tipo de error
        throw new Error('Ocurrió un error inesperado al actualizar el pedido.');
      }
    }
  },
  updateEstado: async (codigoPedido, estado) => {
    const token = await AuthService.getToken();
    if (!token) throw new Error('No hay token disponible');
    try {
      const response = await axios.put(
        `${API_URL}/detallePedido/actualizarEstado/${codigoPedido}`,
        { estado },
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
            `Error al actualizar el estado del pedido: ${error.response.status}`
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
          'Ocurrió un error inesperado al actualizar el estado del pedido.'
        );
      }
    }
  },
  obtenerTodosLosPedidos: async () => {
    try {
      const token = await AuthService.getToken();
      if (!token) throw new Error('No hay token disponible');
      const response = await axios.get(`${API_URL}/detallePedido/todos`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      if (error.response) {
        // El servidor respondió con un código de error
        throw new Error(
          error.response.data.error ||
            `Error al obtener todos los pedidos: ${error.response.status}`
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
          'Ocurrió un error inesperado al obtener todos los pedidos.'
        );
      }
    }
  },
  updateCantidadPedido: async codigoPedido => {
    const token = await AuthService.getToken();
    if (!token) throw new Error('No hay token disponible');
    try {
      const response = await axios.put(
        `${API_URL}/detallePedido/actualizarCantidad/${codigoPedido}`,
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
            `Error al actualizar la cantidad del pedido: ${error.response.status}`
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
          'Ocurrió un error inesperado al actualizar la cantidad del pedido.'
        );
      }
    }
  },
  getHistorialPedidos: async () => {
    try {
      const token = await AuthService.getToken();
      if (!token) throw new Error('No hay token disponible');
      const response = await axios.get(`${API_URL}/detallePedido/historial`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      if (error.response) {
        // El servidor respondió con un código de error
        throw new Error(
          error.response.data.error ||
            `Error al obtener el historial de pedidos: ${error.response.status}`
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
          'Ocurrió un error inesperado al obtener el historial de pedidos.'
        );
      }
    }
  },
};
export default DetallePedidoService;
