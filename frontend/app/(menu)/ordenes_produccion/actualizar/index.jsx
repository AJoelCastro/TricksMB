import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import {TextInput} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon1 from 'react-native-vector-icons/FontAwesome';
import DetallePedidoService from '@/services/DetallePedidoService';

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
            const data = await DetallePedidoService.obtenerDetallePedido(codigoOrden);
            console.log(data);
            if (data) {
                route.push(`/ordenes_produccion/actualizar/${option.title}?codigoOrden=${codigoOrden}`);
            }
        } catch (error) {
            console.log(error);
            alert(`Error al obtener el pedido, verifique que el código "${codigoOrden}" sea correcto.`);
        }
    };
    const iniciarProceso = async () => {
        
    }

    return (
        <View className="flex-1 p-4 bg-gray-100">
            <TextInput
                label={"Codigo de orden"}
                mode="outlined"
                placeholder="Ingresa el código"
                value={codigoOrden}
                onChangeText={setCodigoOrden}
            />
            <TouchableOpacity
                className="h-[15%]  justify-center items-center rounded-2xl bg-blue-500 mt-4"
            >
                <Icon1 name="play-circle" size={40} color="#FFF" />
                <Text className="mt-2 text-white text-lg font-bold">Iniciar proceso</Text>
            </TouchableOpacity>
            <View className='grid grid-cols-2 mt-4' >
                {options.map((option) => (
                    <TouchableOpacity
                        key={option.id}
                        onPress={() => handleOptionPress(option)}
                        activeOpacity={0.8}
                        className='grid col-span-1 m-2'
                    >
                        <View
                            className={`w-full h-full  justify-center items-center rounded-2xl ${option.color}`}
                            
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