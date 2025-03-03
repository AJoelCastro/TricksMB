import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import {TextInput} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon1 from 'react-native-vector-icons/FontAwesome';
import DetallePedidoService from '@/services/DetallePedidoService';

const Actualizar = () => {
    const route = useRouter();
    const [codigoOrden, setCodigoOrden] = useState('');
    const [estado, setEstado] = useState("");
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
        try {
            let estado = "Proceso"
            const data = await DetallePedidoService.updateEstado(codigoOrden, estado);
            console.log(data);
            if (!data) {
                console.error('Error al obtener el pedido, verifique que el código sea correcto.');
            }
        } catch (error) {
            alert(`Error al iniciar el proceso, verifique que el código "${codigoOrden}" sea correcto.`);
        }
    }
    const verificarProceso = async () => {
        try {
            const data = await DetallePedidoService.obtenerDetallePedido(codigoOrden);
            console.log(data);
            setEstado(data.Estado);
            if (!data) {
                console.error('Error al obtener el pedido, verifique que el código sea correcto.');
            }
        } catch (error) {
            alert(`Error al iniciar el proceso, verifique que el código "${codigoOrden}" sea correcto.`);
        }
    }
    const options = [
        { id: 1, title: 'corte', icon: 'content-cut', color: estado==='Editable' ? 'bg-gray-700' : 'bg-red-500' },
        { id: 2, title: 'perfilado', icon: 'brush', color: estado==='Editable' ? 'bg-gray-700' : 'bg-sky-700' },
        { id: 3, title: 'armado', icon: 'build', color: estado==='Editable' ? 'bg-gray-700' : 'bg-amber-500' },
        { id: 4, title: 'alistado', icon: 'check-circle', color: estado==='Editable' ? 'bg-gray-700' : 'bg-green-600' },
    ];
    return (
        <View className="flex-1 p-4 bg-gray-100">
            <TextInput
                label={"Codigo de orden"}
                mode="outlined"
                placeholder="Ingresa el código"
                value={codigoOrden}
                onChangeText={setCodigoOrden}
                right={<TextInput.Icon icon="magnify" onPress={verificarProceso}/>}
            />
            <TouchableOpacity
                onPress={iniciarProceso}
                activeOpacity={0.8}
                className={`h-[15%]  justify-center items-center rounded-2xl ${estado === "Editable" ? "bg-blue-500" : "bg-gray-700"} mt-4`}
                disabled={estado === "Editable" ? false : true}
            >
                <Icon1 name="play-circle" size={40} color="#FFF" />
                <Text className="mt-2 text-white text-lg font-bold">Iniciar proceso</Text>
            </TouchableOpacity>
            <View className=' mt-4 gap-4 ' >
                {options.map((option) => (
                    <TouchableOpacity
                        key={option.id}
                        onPress={() => handleOptionPress(option)}
                        activeOpacity={0.8}
                        disabled={estado === "Editable" ? true : false}
                    >
                        <View
                            className={`justify-center items-center rounded-2xl p-2 ${option.color}`}
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