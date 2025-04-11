import axios from 'axios';
import AuthService from './AuthService';

const API_URL = process.env.EXPO_PUBLIC_API_URL;

const SalidaService = {
    createSalida: async (idCaja, codigoPedido) => {
        const token = await AuthService.getToken();
        if (!token) {
        throw new Error('No hay token disponible');
        }
        try {
        const response = await axios.post(
            `${API_URL}/salida/crear`,
            { idCaja, codigoPedido },
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
                `Error en la creación de un detalle Salida Service ${error.response.status}`
            );
        } else if (error.request) {
            console.log('error.request', error.request);
            // No hubo respuesta del servidor
            throw new Error(
            'No se recibió respuesta del servidor. Verifique su conexión.'
            );
        } else {
            // Otro tipo de error
            throw new Error('Ocurrió un error inesperado al crear un detalle salida.');
        }
        }
    }
};

export default SalidaService;
