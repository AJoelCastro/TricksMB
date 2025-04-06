import axios from 'axios';
import AuthService from './AuthService';

const API_URL = process.env.EXPO_PUBLIC_API_URL;

const ModeloService = {
    getAllModelo: async () => {
        try {
            const token = await AuthService.getToken();
            if(!token) throw new Error("⚠️ No se recibió un token en la respuesta del servidor.");
            const response = await axios.get(`${API_URL}/modelo/todos`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (error) {
            if (error.response) {
                // El servidor respondió con un código de error
                throw new Error(error.response.data.error || `Error en la creación de la caja: ${error.response.status}`);
            } else if (error.request) {
                console.log("error.request",error.request);
                // No hubo respuesta del servidor
                throw new Error("No se recibió respuesta del servidor. Verifique su conexión.");
            } else {
                // Otro tipo de error
                throw new Error("Ocurrió un error inesperado al crear la caja.");
            }
        }
    },
    getAllModeloById: async (id) => {
        try {
            const token = await AuthService.getToken();
            if(!token) throw new Error("⚠️ No se recibió un token en la respuesta del servidor.");
            const response = await axios.get(`${API_URL}/modelo/id`, {
                headers: { Authorization: `Bearer ${token}` },
                params:{id}
            });
            return response.data;
        } catch (error) {
            if (error.response) {
                // El servidor respondió con un código de error
                throw new Error(error.response.data.error || `Error en la creación de la caja: ${error.response.status}`);
            } else if (error.request) {
                console.log("error.request",error.request);
                // No hubo respuesta del servidor
                throw new Error("No se recibió respuesta del servidor. Verifique su conexión.");
            } else {
                // Otro tipo de error
                throw new Error("Ocurrió un error inesperado al crear la caja.");
            }
        }
        
    },
    getModeloByCodigoPedido: async (codigoPedido) => {
        try {
            const token = await AuthService.getToken();
            if(!token) throw new Error("⚠️ No se recibió un token en la respuesta del servidor.");
            const response = await axios.get(`${API_URL}/modelo/obtener/${codigoPedido}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (error) {
            if (error.response) {
                // El servidor respondió con un código de error
                throw new Error(error.response.data.error || `Error en la creación de la caja: ${error.response.status}`);
            } else if (error.request) {
                console.log("error.request",error.request);
                // No hubo respuesta del servidor
                throw new Error("No se recibió respuesta del servidor. Verifique su conexión.");
            } else {
                // Otro tipo de error
                throw new Error("Ocurrió un error inesperado al crear la caja.");
            }
        }
    },
    getImagenById: async (idModelo) => {
        try {
            const token = await AuthService.getToken();
            if(!token) throw new Error("⚠️ No se recibió un token en la respuesta del servidor.");
            const response = await axios.get(`${API_URL}/modelo/imagen/${idModelo}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (error) {
            if (error.response) {
                // El servidor respondió con un código de error
                throw new Error(error.response.data.error || `Error en la creación de la caja: ${error.response.status}`);
            } else if (error.request) {
                console.log("error.request",error.request);
                // No hubo respuesta del servidor
                throw new Error("No se recibió respuesta del servidor. Verifique su conexión.");
            } else {
                // Otro tipo de error
                throw new Error("Ocurrió un error inesperado al crear la caja.");
            }
        }
    },
    getInventario: async () => {
        try {
            const token = await AuthService.getToken();
            if(!token) throw new Error("⚠️ No se recibió un token en la respuesta del servidor.");
            const response = await axios.get(`${API_URL}/modelo/stock`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (error) {
            if (error.response) {
                // El servidor respondió con un código de error
                throw new Error(error.response.data.error || `Error en la creación de la caja: ${error.response.status}`);
            } else if (error.request) {
                console.log("error.request",error.request);
                // No hubo respuesta del servidor
                throw new Error("No se recibió respuesta del servidor. Verifique su conexión.");
            } else {
                // Otro tipo de error
                throw new Error("Ocurrió un error inesperado al crear la caja.");
            }
        }
    }
};

export default ModeloService;
