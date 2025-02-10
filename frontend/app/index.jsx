import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, View, Alert } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { Image } from 'expo-image';
import Icon from 'react-native-vector-icons/FontAwesome';
import Input from '@/components/input';
import CustomButtom from '../components/customButtom'
import AuthService from '@/services/AuthService'; // Importar servicio de autenticación

import "../global.css"

const Home = () => {
    const router = useRouter();
    const [correo, setCorreo] = useState(""); // Estado para el email
    const [contrasenia, setContrasenia] = useState(""); // Estado para la contraseña
    const [loading, setLoading] = useState(true); // Estado para indicar si está cargando

    const isFormValid = correo.trim() !== "" && contrasenia.trim() !== ""; // Validación de campos llenos

    const handleLogin = async () => {
        if (!isFormValid) {
            Alert.alert("Error", "Todos los campos son obligatorios.");
            return;
        }

        setLoading(true);
        try {
            await AuthService.login(correo, contrasenia);
            router.replace("/menu"); // Redirigir después de actualizar el estado
        } catch (error) {
            Alert.alert("Error", "Credenciales incorrectas");
        }
        setLoading(false);
    };
    useEffect(() => {
        const checkAuth = async () => {
            const token = await AuthService.getToken();
            console.log("Token en Home.js:", token);

            if (token) {
                router.replace("/menu"); 
            } else {
                setLoading(false);
            }
        };
        
        checkAuth();
    }, []);

    
    return (
        <SafeAreaView className="h-full bg-white flex">
            {/* Header */}
            <View className='h-16 bg-gray-700 flex flex-row justify-between p-4 px-8'>
                <View>
                    <Icon name="cog" size={20} color="white" />
                </View>
                <View>
                    <Link href={"/register"}>
                        <Text className='text-white'>Registrarse</Text>
                    </Link>
                </View>
            </View>

            {/* Logo */}
            <View className='flex items-center justify-center mt-16 '>
                <Image source={require('@/assets/images/namiTest.jpg')} style={{ width: 168, height: 168, borderRadius: 84 }} />
            </View>

            {/* Inputs */}
            <View>
                <View>
                    <Input placeholder="Correo electrónico" value={correo} onChangeText={setCorreo} />
                </View>
                <View>
                    <Input placeholder="Contraseña" value={contrasenia} onChangeText={setContrasenia} secure={true} />
                </View>
                
                <View className='flex-row items-center gap-4 mt-6 ml-16'>
                    <Icon name="check" size={16} color="black" />
                    <Text>Recordar Contraseña</Text>
                </View>

                {/* Botón de Iniciar Sesión */}
                <View className='mx-16 mt-2'>
                    <CustomButtom 
                        title={loading ? "Cargando..." : "Iniciar Sesión"}
                        touch={() => {
                            console.log("Botón presionado");
                            handleLogin();
                        }}
                        disabled={!isFormValid} 
                    />
                </View>
            </View>
        </SafeAreaView>
    );
}

export default Home;
