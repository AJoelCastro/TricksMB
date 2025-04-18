import axios from 'axios';
import AuthService from './AuthService';

const API_URL = process.env.EXPO_PUBLIC_API_URL;

const CaracteristicasService = {
  crearCaracteristicas: async datosCaracteristicas => {
    const token = await AuthService.getToken();
    if (!token) throw new Error('No hay token disponible');
    try {
      const response = await axios.post(
        `${API_URL}/caracteristicas/crear`,
        datosCaracteristicas,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      console.error(
        '(CaracteristicasService)Error al crear caracteristicas: ',
        error.response?.data || error.message
      );
      throw error;
    }
  },
  getAllCaracteristicasById: async idDetallePedido => {
    const token = await AuthService.getToken();
    if (!token) throw new Error('No hay token disponible');
    try {
      const response = await axios.get(
        `${API_URL}/caracteristicas/todos/${idDetallePedido}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      console.error(
        '(CaracteristicasService) Error al obtener caracteristicas: ',
        error.response?.data || error.message
      );
      throw error;
    }
  },
  editCaracteristicas: async datosCaracteristicas => {
    const token = await AuthService.getToken();
    if (!token) throw new Error('No hay token disponible');
    try {
      const response = await axios.put(
        `${API_URL}/caracteristicas/editar`,
        datosCaracteristicas,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      console.error(
        '(CaracteristicasService) Error al editar caracteristicas: ',
        error.response?.data || error.message
      );
      throw error;
    }
  },
  deleteCaracteristicas: async idCaracteristicas => {
    const token = await AuthService.getToken();
    if (!token) throw new Error('No hay token disponible');
    try {
      const response = await axios.delete(
        `${API_URL}/caracteristicas/eliminar/${idCaracteristicas}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      console.error(
        '(CaracteristicasService) Error al eliminar caracteristicas: ',
        error.response?.data || error.message
      );
      throw error;
    }
  },
  getCaracteristicaByIdCaracteristicas: async idCaracteristicas => {
    const token = await AuthService.getToken();
    if (!token) throw new Error('No hay token disponible');
    try {
      const response = await axios.get(
        `${API_URL}/caracteristicas/buscar/${idCaracteristicas}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      console.error(
        '(CaracteristicasService) Error al obtener caracteristicas: ',
        error.response?.data || error.message
      );
      throw error;
    }
  },
};
export default CaracteristicasService;
