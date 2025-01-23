import {View, Text} from 'react-native';
import "../../../global.css";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';

import React from 'react';

import FormFieldOrden from '../../../components/formFieldOrden';

export default function editar() {
    return (
        <SafeAreaView className=' gap-3'>
            <View className=' justify-center h-8 w-24  bg-red-500 items-center rounded-lg'>
                <Link href={"/"} className=''>
                    <Text className='flex'>Inicio</Text>
                </Link>
            </View>
            <FormFieldOrden
            className='h-24 mx-5 '
            title="Codigo"
            value="Codigo"
            handleChangeText
            otherStyles=""
            />
            <FormFieldOrden
            className='h-24 mx-5 '
            title="Cliente"
            value=""
            handleChangeText
            otherStyles=""
            />
            <FormFieldOrden
            className='h-24 mx-5 '
            title="Modelo"
            value="Modelo"
            handleChangeText={()=>{}}
            otherStyles=""
            />
            
        </SafeAreaView>
    );
}