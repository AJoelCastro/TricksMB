// contexts/AuthContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {jwtDecode} from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userToken, setUserToken] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // Verificar token al cargar la app
    useEffect(() => {
        const loadToken = async () => {
        //     await AsyncStorage.removeItem('token'); // Elimina el token
        // console.log("Token eliminado correctamente.");
            const token = await AsyncStorage.getItem('token');
            console.log("Token cargado desde AsyncStorage:", token);
            if (token) {
                try {
                    const decoded = jwtDecode(token);
                    if (decoded.exp * 1000 > Date.now()) {
                        console.log(decoded.exp*1000);
                        console.log(Date.now())
                        setUserToken(token);
                    } else {
                        await logout(); // Token , elimínalo
                    }
                } catch (error) {
                    await logout(); // Token inválido
                }
            }
            setIsLoading(false);
        };
        loadToken();
    }, []);

    const login = async (token) => {
        await AsyncStorage.setItem('token', token);
        setUserToken(token);
    };

    const logout = async () => {
        await AsyncStorage.removeItem('token');
        setUserToken(null);
    };

    return (
        <AuthContext.Provider value={{ userToken, isLoading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);