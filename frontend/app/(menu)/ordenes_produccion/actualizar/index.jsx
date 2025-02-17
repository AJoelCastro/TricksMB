import { View, Text} from 'react-native';
import { TextInput } from 'react-native-paper';
import React, { useEffect, useState } from 'react';

import CustomButtom from '@/components/customButtom';
import Input from '@/components/input';
import { useRouter } from 'expo-router';

import "../../../../global.css";

export default function index() {
    const router = useRouter();
    const[codigo, setCodigo]= useState("");
    return (
        <View className='p-2'>
            <View>
                <Text className='text-black text-4xl font-bold text-center mt-8'>Actualización de orden</Text>
            </View>
            <TextInput
                label={"Codigo"}
                mode='outlined'
                placeholder='Ingrese el codigo de orden'
                onChange={setCodigo}
                right={<TextInput.Icon icon={"magnify"}/>}
            />
            <View className="items-center mx-6">
                <CustomButtom title={"Corte"} touch={()=>router.push("/(menu)/ordenes_produccion/actualizar/(etapas)/corte")}></CustomButtom>
                <CustomButtom title={"Perfilado"}></CustomButtom>
                <CustomButtom title={"Armado"}></CustomButtom>
                <CustomButtom title={"Alistado"}></CustomButtom>
            </View>
        </View>
    );
}