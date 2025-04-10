import axios from 'axios';
import AuthService from './AuthService';

const API_URL = process.env.EXPO_PUBLIC_API_URL;

const AlmacenService = {
    getAllAlmacenes: async () => {
        try {
            const token = await AuthService.getToken();
            if (!token) {
                throw new Error('No hay token disponible');
            }
            const response = await axios.get(
                `${API_URL}/almacen/obtenerTodos`,
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
};

export default AlmacenService;
