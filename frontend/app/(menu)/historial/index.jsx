import React, { useCallback, useEffect, useState } from 'react'
import { ScrollView, Text, View, Pressable,Alert, FlatList } from 'react-native'
import { useFocusEffect, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { Switch, Card, Divider } from 'react-native-paper';
import {useFonts} from "expo-font";


import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import Icon3 from 'react-native-vector-icons/MaterialCommunityIcons';
import DetallePedidoService from '@/services/DetallePedidoService';


SplashScreen.preventAutoHideAsync();

export default function Historial(){

    const router = useRouter();
    
    const [loaded, error] = useFonts({
        'Inter-Black': require('../../../assets/fonts/DMSans-Regular.ttf'),
        'Inter-Light': require('../../../assets/fonts/DMSans-Light.ttf'),
    });


    useEffect(() => {
        if (loaded || error) {
            SplashScreen.hideAsync();
        }
    }, [loaded, error]);

    
    if (!loaded && !error) {
        return null;
    }
    
    useFocusEffect(
        useCallback(() => {
            const obtenerHistorial = async () => {
                try {
                    const historial = await DetallePedidoService.getHistorialPedidos();
                    console.log(historial.historialPedidos);
                } catch (error) {
                    mostrarError(error);
                }
            }
            obtenerHistorial();
        }, [])
    )

    const mostrarError = (error) => {
        Alert.alert(
            "Error",
            `${error.message}`,
            [{ text: "OK" }] // Botón requerido
        );
    };

    return (
        <ScrollView className='bg-white h-full'>
        <Text>Historial de pedidos</Text>
        </ScrollView>
        
    )
}
