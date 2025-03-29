import axios from 'axios';
import AuthService from './AuthService';

const API_URL = process.env.EXPO_PUBLIC_API_URL;

const ClienteService = {
    crearCliente: async (datosCliente, tipo) => {
        try {
            const token = await AuthService.getToken();
            if (!token) throw new Error("No hay token disponible");

            const endpoint = tipo === "natural" ? "cliente/natural" : "cliente/juridico";

            const response = await axios.post(`${API_URL}/${endpoint}`, datosCliente, {
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
    obtenerClientes: async () => {
        try {
            const token = await AuthService.getToken();
            const response = await axios.get(`${API_URL}/cliente/obtenerTodo`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (error) {
            if (error.response) {
                // El servidor respondió con un código de error
                throw new Error(error.response.data.error || `Error al obtener todos los clientes: ${error.response.status}`);
            } else if (error.request) {
                console.log("error.request",error.request);
                // No hubo respuesta del servidor
                throw new Error("No se recibió respuesta del servidor. Verifique su conexión.");
            } else {
                // Otro tipo de error
                throw new Error("Ocurrió un error inesperado al obtener todos los clientes.");
            }
        }
    },
    buscarCliente: async (tipoCliente, identificador) => {
        try {
            const token = await AuthService.getToken();
            if (!token) throw new Error("No hay token disponible");
    
            // Definir el endpoint según el tipo de cliente
            const endpoint = tipoCliente === "natural" 
                ? `buscar/natural` 
                : `buscar/juridico`;
    
            // Hacer la solicitud al backend
            const response = await axios.get(`${API_URL}/cliente/${endpoint}`,{
                headers: { Authorization: `Bearer ${token}` },
                params: { tipoCliente, identificador }
            });
            return response.data; // Retorna los datos del cliente encontrado
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
    getClienteByCodigoPedido: async (codigoPedido) => {
        try {
            const token = await AuthService.getToken();
            const response = await axios.get(`${API_URL}/cliente/cliente/${codigoPedido}`, {
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
    getClientesById: async () => {
        try {
            const token = await AuthService.getToken();
            if (!token) throw new Error("No hay token disponible");
            
            const response = await axios.get(`${API_URL}/cliente/clientesId`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        }catch(error){
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

export default ClienteService;
