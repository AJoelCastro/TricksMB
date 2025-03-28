import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import {useFonts} from "expo-font";


import CustomButtom from '@/components/customButtom';


import ComboBox from '@/components/ComboBox';
import Icon from 'react-native-vector-icons/FontAwesome';

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
            <View className='w-full m-4 mt-8'>
                <View className='bg-[#f7f2f7] rounded-md p-4 w-[50%]'>
                    <View>
                        <Icon name="list" size={24} color="#634AFF" />
                    </View>
                    <View>
                        <Text style={{ fontFamily:'Inter-Black', fontSize:16 }}>Ordenes de Producción</Text>
                    </View>
                </View>
                <View>
                    <View>

                    </View>
                    <View>

                    </View>
                </View>
            </View>
            {/* Contenido principal */}
            <View className='mx-6'>
                <CustomButtom title="Ordenes de Producción" touch={()=>route.push("/(menu)/ordenes_produccion/(tabs)/crear")} />
            </View>
            <View className='mx-6'>
                <ComboBox 
                    data={[ {label:"Almacen Trujillo Centro", value:"Almacen Trujillo Centro"}, {label:"Almacen de Fabrica",value:"Almacen de Fabrica"} ]}
                    onChange={()=>route.push("/almacen")}
                    placeholder="Almacenes" 
                />
            </View>
            <View className='mx-6'>
                <CustomButtom title="Inventario" touch={()=>route.push("/inventariado")} />
            </View>
        </View>
    );
}
