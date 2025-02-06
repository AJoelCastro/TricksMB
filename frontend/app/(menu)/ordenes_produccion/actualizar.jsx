import {SafeAreaView, View, Image, Text, TouchableOpacity} from 'react-native';

import React, { useEffect } from 'react';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useFocusEffect } from '@react-navigation/native';
import CustomButtom from '@/components/customButtom';
import Input from '@/components/input';

import "../../../global.css";

export default function actualizar() {
    const lockOrientation = async () => {
        await ScreenOrientation.lockAsync(
            ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT
        );
    };
    
      // Función para restablecer la orientación al salir
    const resetOrientation = async () => {
        await ScreenOrientation.unlockAsync();
    };
    
      // Efecto al enfocar la pestaña
    useFocusEffect(
        React.useCallback(() => {
            lockOrientation();
    
            // Resetear al salir de la pestaña
            return () => {
            resetOrientation();
            };
        }, [])
    );
    return (
        <SafeAreaView>
            <View>
                <Text className='text-black text-4xl font-bold text-center mt-10 mb-10'>Actualización de orden</Text>
            </View>
            <View className="flex-row justify-center items-center mt-5 mb-8">
                <Text className="text-black text-2xl font-bold mr-4 mt-2">Código:</Text>
                <Input placeholder="Digite su código"></Input>
                <TouchableOpacity className=" p-2 rounded-lg border border-black mt-2 flex items-center justify-center" title=''>
                    <Image 
                        source={{uri: 'https://w7.pngwing.com/pngs/697/690/png-transparent-black-magnifying-glass-illustration-magnifying-glass-computer-icons-simple-magnifying-glass-glass-magnifier-brand.png'}} 
                        style={{width: 16, height: 16}} 
                    />
                </TouchableOpacity>
            </View>
            <View className="items-center mx-6">
                <CustomButtom title={"Corte"}></CustomButtom>
                <CustomButtom title={"Perfilado"}></CustomButtom>
                <CustomButtom title={"Armado"}></CustomButtom>
                <CustomButtom title={"Alistado"}></CustomButtom>
            </View>
        </SafeAreaView>
    );
}