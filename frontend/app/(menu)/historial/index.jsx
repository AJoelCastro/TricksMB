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
    const [estado, setEstado] = useState(null);
    const [loaded, error] = useFonts({
        'Inter-Black': require('../../../assets/fonts/DMSans-Regular.ttf'),
        'Inter-Light': require('../../../assets/fonts/DMSans-Light.ttf'),
    });

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

    useEffect(() => {
        if (loaded || error) {
            SplashScreen.hideAsync();
        }
    }, [loaded, error]);

    
    if (!loaded && !error) {
        return null;
    }
    

    const mostrarError = (error) => {
        Alert.alert(
            "Error",
            `${error.message}`,
            [{ text: "OK" }] // Botón requerido
        );
    };

    return (
        <View 
            className='bg-white flex-1 p-2 gap-4'
        >
            <Text 
                style={{fontFamily:'Inter-Light', fontSize:28 }} 
                className='text-gray-600 my-4'>
                    Historial de pedidos
                </Text>
            <View 
                className='flex-1 flex-row gap-2 justify-between'
            >
                <View className='items-center gap-2'>
                    <Pressable className='bg-gray-100 rounded-full p-4' onPress={()=>setEstado("pendiente")}>
                        <Icon 
                            name='square-o' 
                            size={20} 
                            color='#634AFF' 
                        />
                    </Pressable>
                    <View>
                        <Text style={{fontFamily:'Inter-Light', fontSize:15 }} className='text-gray-800'>
                            Pendiente
                        </Text>
                    </View>
                </View>
                <View className='items-center gap-2'>
                    <Pressable className='bg-gray-100 rounded-full p-4' onPress={()=>setEstado("procesando")}>
                        <Icon2 
                            name='check-square' 
                            size={20} 
                            color='#634AFF' 
                        />
                    </Pressable>
                    <View>
                        <Text style={{fontFamily:'Inter-Light', fontSize:15 }} className='text-gray-800'>
                            Procesando
                        </Text>
                    </View>
                </View>
                <View className='items-center gap-2'>
                    <Pressable className='bg-gray-100 rounded-full p-4' onPress={()=>setEstado("completado")}>
                        <Icon 
                            name='check' 
                            size={20} 
                            color='#634AFF' 
                        />
                    </Pressable>
                    <View>
                        <Text style={{fontFamily:'Inter-Light', fontSize:15 }} className='text-gray-800'>
                            Completado
                        </Text>
                    </View>
                </View>
                <View className='items-center gap-2'>
                    <Pressable className='bg-gray-100 rounded-full p-4' onPress={()=>setEstado("cancelado")}>
                        <Icon 
                            name='times' 
                            size={20} 
                            color='#634AFF' 
                        />
                    </Pressable>
                    <View>
                        <Text style={{fontFamily:'Inter-Light', fontSize:15 }} className='text-gray-800'>
                            Cancelado
                        </Text>
                    </View>
                </View>
            </View>
        </View>
        
    )
}
