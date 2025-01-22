import React from 'react';
import { SafeAreaView, Text, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import CustomButtom from '@/components/customButtom';
import Header from '@/components/Header';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Home() {
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
            <TouchableOpacity className="bg-black h-8 w-32 mt-5">
                <Link href="/editar">
                    <Text className="text-white">Editar</Text>
                </Link>
            </TouchableOpacity>

            <CustomButtom title="Ordenes de Producción" />
        </SafeAreaView>
    );
}
