import React from 'react';
import { SafeAreaView, Text, TouchableOpacity } from 'react-native';
import { Link, useRouter } from 'expo-router';
import CustomButtom from '@/components/customButtom';
import Header from '@/components/Header';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Menu() {
    const route = useRouter();
    return (
        <SafeAreaView className="h-full bg-white flex">
            {/* Componente Header */}
            <Header
                title="Menu"
                LeftIcon={() => <Icon name ="cog" size = {24} color="black"/>} // Pasas el componente Icon como LeftIcon
                RightIcon={() => <Icon name="user-circle" size={24} color="black" />} // Ícono derecho
                onLeftPress={() => console.log("Configuración presionada")}
                onRightPress={() => console.log("Perfil presionado")}
            />

            {/* Contenido principal */}
            <CustomButtom title="Ordenes de Producción" touch={()=>route.push("/(ordenes_produccion)/crear")} />
        </SafeAreaView>
    );
}
