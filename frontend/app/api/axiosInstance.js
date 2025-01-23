import axios from 'axios';
import {BACKEND_URL} from '@env';

const api = axios.create({
    baseURL: BACKEND_URL, // URL de tu backend
});

export default api;
