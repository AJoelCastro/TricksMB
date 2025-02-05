import {View, Text, TouchableOpacity, Platform, TextInput, FlatList} from 'react-native';

import { useState } from 'react';

import { useRouter } from 'expo-router';

import FormFieldOrden from '@/components/formFieldOrden';
import ComboBox from '@/components/ComboBox';
import Icon from 'react-native-vector-icons/FontAwesome';

import "../../../global.css";

const data = [
    { id: '1', name: 'Talla 31' },
    { id: '2', name: 'Talla 32' },
    { id: '3', name: 'Talla 33' },
    { id: '4', name: 'Talla 34' },
    { id: '5', name: 'Talla 35' },
    { id: '6', name: 'Talla 36' },
    { id: '7', name: 'Talla 37' },
    { id: '8', name: 'Talla 38' },
    // Más elementos...
];

export default function crear() {
        const [cliente, setCliente] = useState("");
        const [modelo, setModelo] = useState("");
        const route = useRouter();
        const getCurrentDate = () => {
            const date = new Date();
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0'); // Meses van de 0 a 11
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`; // Formato: YYYY-MM-DD
        };
        const [currentDate] = useState(getCurrentDate()); // Estado para almacenar la fecha formateada
        const [selectSerieInicio, setSelectSerieInicio] = useState("");
        const [selectSerieFin, setSelectSerieFin] = useState("");
        const handleSelectSerie = (type, item) => {
            if (type === 'inicio') {
                setSelectSerieInicio(item.name);
            } else if (type === 'fin') {
                setSelectSerieFin(item.name);
            }
        };
        const [agregarFila, setAgregarFila] = useState(true);
        
    return (
        <View className='mx-6 gap-2 '>
            <ComboBox 
                data={[ {label:"Juan Buendia", value:"Juan Buendia"}, {label:"Alvaro gay",value:"Alvaro gay"}]}
                onChange={setCliente}
                placeholder="Cliente" 
            />
            <FormFieldOrden
                title={"Codigo"}
                value={""}
            />
            <FormFieldOrden
                title={"Modelo"}
                value={modelo}
                onChangeText={setModelo}
            />
            <View className='gap-2'>
                <Text className='font-bold'>Fecha de creacion</Text>
                <TextInput
                    className='border h-10 rounded-lg'
                    title={"Fecha de creacion"}
                    value={currentDate}
                    editable={false}
                />
            </View>
            <ComboBox
                data={[ {label:"Juan Buendia", value:"Juan Buendia"}, {label:"Alvaro gay",value:"Alvaro gay"}]}
                onChange={setCliente}
                placeholder="Asignar trabajador" 
            />
            <View className='flex-row justify-between mt-1'>
                <View className='flex-row items-center gap-2'>
                    <Text className='font-bold'>Serie Inicio</Text>
                    <View className='w-22 h-8 bg-gray-100 border-l-2 items-center'>
                        <FlatList
                            data={data}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    className={`p-2 ${selectSerieInicio === item.name ? 'bg-blue-200' : ''} rounded`}
                                    onPress={() => handleSelectSerie('inicio', item)}
                                >
                                    <Text className='text-lg'>{item.name}</Text>
                                </TouchableOpacity>
                            )}
                            keyExtractor={(item) => item.id}
                            showsVerticalScrollIndicator={false}
                        />
                        
                    </View>
                    
                </View>
                <View className='flex-row items-center gap-2'>
                    <Text className='font-bold'>Serie Fin</Text>
                    <View className='w-22 h-8 bg-gray-100 border-l-2 items-center'>
                        <FlatList
                            data={data}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    className={`p-2 ${selectSerieFin === item.name ? 'bg-blue-200' : ''} rounded`}
                                    onPress={() => handleSelectSerie('fin', item)}
                                >
                                    <Text className='text-lg'>{item.name}</Text>
                                </TouchableOpacity>
                            )}
                            keyExtractor={(item) => item.id}
                            showsVerticalScrollIndicator={false}
                        />
                    </View>
                </View>
            </View>
            <View className='flex-row justify-between mt-3'>
                <Text className='font-bold'>Talla</Text>
                <Text className='font-bold'>Pares</Text>
                <Text className='font-bold'>Color</Text>
            </View>
            {agregarFila && (
                <View>
                    
                </View>
            )}
            <TouchableOpacity 
            className='flex-row gap-2 justify-center items-center'
            onPress={()=>{
                <View>ana carepotito</View>
            }}
            >
                <Text>
                    Agregar
                </Text>
                    <Icon
                        name="plus-circle" size="20"
                    />
            </TouchableOpacity>
        </View>
    );
}