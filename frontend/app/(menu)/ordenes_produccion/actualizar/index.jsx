import { View, Text} from 'react-native';
import { TextInput } from 'react-native-paper';
import React, { useEffect, useState } from 'react';


import { useRouter } from 'expo-router';

import "../../../../global.css";

export default function index() {
    const router = useRouter();
    const[codigoCorte, setCodigoCorte]= useState("");
    return (
        <View className='p-2'>
            <View>
                <Text className='text-black text-4xl font-bold text-center mt-8'>Actualización de orden</Text>
            </View>
            <TextInput
                label={"Corte"}
                mode='outlined'
                placeholder='Ingrese el codigo de orden'
                onChange={setCodigoCorte}
                right={<TextInput.Icon icon={"magnify"}/>}
            />
        </View>
    );
}