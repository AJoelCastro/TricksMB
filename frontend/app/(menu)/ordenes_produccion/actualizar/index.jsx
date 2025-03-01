import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import {TextInput} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

const options = [
    { id: 1, title: 'corte', icon: 'content-cut', color: 'bg-red-500' },
    { id: 2, title: 'perfilado', icon: 'brush', color: 'bg-sky-700' },
    { id: 3, title: 'armado', icon: 'build', color: 'bg-amber-500' },
    { id: 4, title: 'alistado', icon: 'check-circle', color: 'bg-green-600' },
];

const Actualizar = () => {
    const route = useRouter();
    const [codigoOrden, setCodigoOrden] = useState('');

    const handleOptionPress = async (option) => {
        try {

            if (codigoOrden) {
                route.push(`/ordenes_produccion/actualizar/${option.title}?codigoOrden=${codigoOrden}`);
            } else {
                alert("Error", "Por favor, ingresa el código de la orden.");
            }
        } catch (error) {
            error("Error al procesar la solicitud",error);
        }
    };

    return (
        <View className="flex-1 p-4 bg-gray-100">
            <TextInput
                label={"Codigo de orden"}
                mode="outlined"
                placeholder="Ingresa el código"
                value={codigoOrden}
                onChangeText={setCodigoOrden}
            />
            <View className=' mt-4' >
                {options.map((option) => (
                    <TouchableOpacity
                        key={option.id}
                        onPress={() => handleOptionPress(option)}
                        activeOpacity={0.8}
                    >
                        <View
                            className={`w-full h-32  justify-center items-center rounded-2xl mb-4 ${option.color}`}
                            
                        >
                            <Icon name={option.icon} size={40} color="#FFF" />
                            <Text className="mt-2 text-white text-lg font-bold">{option.title}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

export default Actualizar;