import React, { useEffect } from 'react';
import { Pressable, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import {useFonts} from "expo-font";


import ComboBox from '@/components/ComboBox';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon2 from 'react-native-vector-icons/MaterialIcons';

SplashScreen.preventAutoHideAsync();

export default function Menu() {
    const route = useRouter();
    const [loaded, error] = useFonts({
        'Inter-Black': require('../../assets/fonts/DMSans-Regular.ttf'),
    });

    useEffect(() => {
        if (loaded || error) {
            SplashScreen.hideAsync();
        }
    }, [loaded, error]);
    
    if (!loaded && !error) {
    return null;
    }
    return (
        <View className="h-full bg-white flex">
            <View className='w-full m-4 mt-8 flex flex-row gap-4'>
                <Pressable className='bg-gray-50 rounded-md p-4 w-[45%] gap-4' onPress={()=>route.push("/(menu)/ordenes_produccion/(tabs)/crear")}>
                    <View>
                        <Icon name="list" size={24} color="#634AFF" />
                    </View>
                    <View>
                        <Text style={{ fontFamily:'Inter-Black', fontSize:16 }} className='text-[#000111]'>Ordenes de Producción</Text>
                    </View>
                </Pressable>
                <Pressable className='bg-gray-50 rounded-md p-4 w-[45%] gap-4' onPress={()=>route.push("/almacen")}>
                    <View>
                        <Icon name="warehouse" size={24} color="#634AFF" />
                    </View>
                    <View>
                        <Text style={{ fontFamily:'Inter-Black', fontSize:16 }} className='text-[#000111]'>Almacenes</Text>
                    </View>
                </Pressable>
            </View>
            <View className='w-full m-4 mt-4 flex flex-row gap-4'>
                <Pressable className='bg-gray-50 rounded-md p-4 w-[45%] gap-4' onPress={()=>route.push("/inventariado")}>
                        <View>
                            <Icon2 name="inventory" size={24} color="#634AFF" />
                        </View>
                        <View>
                            <Text style={{ fontFamily:'Inter-Black', fontSize:16 }} className='text-[#000111]'>Inventario</Text>
                        </View>
                    </Pressable>
                    <Pressable className='bg-gray-50 rounded-md p-4 w-[45%] gap-4' onPress={()=>route.push("/")}>
                        <View>
                            <Icon name="history" size={24} color="#634AFF" />
                        </View>
                        <View>
                            <Text style={{ fontFamily:'Inter-Black', fontSize:16 }} className='text-[#000111]'>Historial de Pedidos</Text>
                        </View>
                    </Pressable>
            </View>
        </View>
    );
}
