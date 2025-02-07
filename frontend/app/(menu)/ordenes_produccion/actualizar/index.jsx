import {SafeAreaView, View, Image, Text, TouchableOpacity, TextInput} from 'react-native';

import React, { useEffect, useState } from 'react';

import CustomButtom from '@/components/customButtom';
import Input from '@/components/input';
import { useRouter } from 'expo-router';

import "../../../../global.css";

export default function actualizar() {
    const router = useRouter();
    const[codigo, setCodigo]= useState("");
    return (
        <View>
            <View>
                <Text className='text-black text-4xl font-bold text-center mt-8'>Actualización de orden</Text>
            </View>
            <Text className="text-black text-2xl font-bold mt-4">Código:</Text>
            <View className="flex-row justify-center items-center mt-2 mb-4 gap-2">
                <TextInput
                    className='text-black border w-[85%] rounded-lg'
                    placeholder='Ingrese el codigo de orden'
                    secureTextEntry
                    onChange={setCodigo}
                />
                <TouchableOpacity className=" p-2 rounded-lg border border-black " title=''>
                    <Image 
                        source={{uri: 'https://w7.pngwing.com/pngs/697/690/png-transparent-black-magnifying-glass-illustration-magnifying-glass-computer-icons-simple-magnifying-glass-glass-magnifier-brand.png'}} 
                        style={{width: 16, height: 16}} 
                    />
                </TouchableOpacity>
            </View>
            <View className="items-center mx-6">
                <CustomButtom title={"Corte"} touch={()=>router.push("/ordenes_produccion/actualizar/corte")}></CustomButtom>
                <CustomButtom title={"Perfilado"}></CustomButtom>
                <CustomButtom title={"Armado"}></CustomButtom>
                <CustomButtom title={"Alistado"}></CustomButtom>
            </View>
        </View>
    );
}