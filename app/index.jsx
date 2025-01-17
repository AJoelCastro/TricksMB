import {View, Text, TouchableOpacity} from 'react-native';
import "../global.css";

import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, Redirect } from 'expo-router';
import CustomButtom from '@/components/customButtom';
import Header from '@/components/Header';

export default function index() {
    return (
        <SafeAreaView className='h-full bg-white flex items-center'>
            <Header className = "w-full "
                title="Almacén seleccionado"
                //leftIcon=""
                //rightIcon=""
                onLeftPress={() => console.log("Configuración presionada")}
                onRightPress={() => console.log("Perfil presionado")}
            />
            <TouchableOpacity  className=' bg-black h-8 w-32'>
                <Link href={"/editar"}>
                    <Text className='text-white'>Editar</Text>
                </Link>
            </TouchableOpacity>
            <CustomButtom
            title="Ordenes de Produccion"
            >

            </CustomButtom>
        </SafeAreaView>
    );
}