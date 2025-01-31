import React from 'react';
import { SafeAreaView, View, TouchableOpacity } from 'react-native';
import { Link, useRouter } from 'expo-router';
import CustomButtom from '@/components/customButtom';
import Header from '@/components/Header';
import Icon from 'react-native-vector-icons/FontAwesome';
import ComboBox from '@/components/ComboBox';

export default function Menu() {
    const route = useRouter();
    return (
        <SafeAreaView className="h-full bg-white flex">
            {/* Componente Header */}
            <View>
                <Header
                title={"Menu"}
                LeftIcon={() => <Icon name ="cog" size = {24} color="black"/>} // Pasas el componente Icon como LeftIcon
                RightIcon={() => <Icon name="user-circle" size={24} color="black" />} // Ícono derecho
                onLeftPress={() => console.log("Configuración presionada")}
                onRightPress={() => console.log("Perfil presionado")}
                />
            </View>

            {/* Contenido principal */}
            <View className='mx-6'>
                <CustomButtom title={"Ordenes de Producción"} touch={()=>route.push("/ordenes_produccion/crear")} />
            </View>
            <View className='mx-6'>
                <ComboBox 
                    data={[ {label:"Almacen Trujillo Centro", value:"Almacen Trujillo Centro"}, {label:"Almacen de Fabrica",value:"Almacen de Fabrica"} ]}
                    onChange={console.log}
                    placeholder="Almacenes" 
                />
            </View>
            <View className='mx-6'>
                <CustomButtom title={"Usuarios"} touch={()=>route.push("/usuarios")} />
            </View>
        </SafeAreaView>
    );
}
