import axios from 'axios';
import AuthService from './AuthService';

const API_URL = process.env.EXPO_PUBLIC_API_URL;

const PedidoService = {
  getPedidoByCodigoPedido: async codigoPedido => {
    const token = await AuthService.getToken();
    if (!token) throw new Error('No hay token disponible');
    try {
      const response = await axios.get(
        `${API_URL}/pedido/obtener/${codigoPedido}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      console.error(
        '(TipoCalzadoService) Error al obtener el pedido: ',
        error.response?.data || error.message
      );
      throw error;
    }
  },
};

export default PedidoService;
