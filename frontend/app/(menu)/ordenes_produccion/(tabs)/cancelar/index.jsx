import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import { Link } from 'expo-router';
import { useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Alert } from 'react-native';

import "../../../../../global.css";

export default function cancelar() {
    const [codigo, setCodigo] = useState("");
    const [resultado, setResultado] = useState(null);
    const mostrarAlerta = () => {
        Alert.alert(
          "Confirmar acción", // Título de la alerta
          "¿Estás seguro de que deseas cancelar la orden?", // Mensaje de la alerta
          [
            {
              text: "No", 
              onPress: () => setResultado("No"), 
              style: "cancel", // Estilo del botón (opcional)
            },
            {
              text: "Sí", 
              onPress: () => setResultado("Sí"), 
            },
          ],
          { cancelable: false } // Evita que la alerta se cierre al tocar fuera de ella
        );
      };
    return (
        <View className='p-2 gap-4'>
            <Text className='text-lg font-bold'>Codigo</Text>
            <View className='flex-row gap-4 items-center'>
                <TextInput
                    className='border rounded-lg w-[85%]'
                    placeholder=''
                    value={codigo}
                    onChangeText={setCodigo}
                >
                </TextInput>
                <Icon name="search" size={20} color="black"/>
            </View>
            <TouchableOpacity
                className='bg-red-500 w-[30%] mx-auto'
                onPress={mostrarAlerta}
            >
                <Text className='text-lg font-bold text-white text-center'>Cancelar</Text>
            </TouchableOpacity>
        </View>
    );
}