import {View, Text, TouchableOpacity} from 'react-native';
import "../global.css";

import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, Redirect } from 'expo-router';
import CustomButtom from '@/components/customButtom';


export default function index() {
    return (
        <SafeAreaView className='h-full bg-white flex items-center'>

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