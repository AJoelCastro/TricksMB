import React from 'react';
import { SafeAreaView, View, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import CustomButtom from '@/components/customButtom';

import ComboBox from '@/components/ComboBox';

export default function Menu() {
    const route = useRouter();
    return (
        <SafeAreaView className="h-full bg-white flex">

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
        </SafeAreaView>
    );
}
