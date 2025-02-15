import {View, ScrollView, Text, TouchableOpacity, TextInput, FlatList, Button} from 'react-native';

import { useState, useEffect } from 'react';

import { useRouter } from 'expo-router';
import ClienteService from '@/services/ClienteService';
import FormFieldOrden from '@/components/formFieldOrden';
import ComboBox from '@/components/ComboBox';
import Icon from 'react-native-vector-icons/FontAwesome';

import "../../../../global.css";

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
        const router = useRouter();
        const [cliente, setCliente] = useState("");
        const [modelo, setModelo] = useState("");
        const [selectSerieInicio, setSelectSerieInicio] = useState("");
        const [selectSerieFin, setSelectSerieFin] = useState("");
        const [trabajador, setTrabajador] = useState("");
        const [tipoCliente, setTipoCliente] = useState("");
        const [dni, setDni] = useState("");
        const [ruc, setRuc] = useState("");
        const [nombreTaco, setNombreTaco] = useState("");

        const getCurrentDate = () => {
            const date = new Date();
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0'); // Meses van de 0 a 11
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`; // Formato: YYYY-MM-DD
        };
        const [currentDate] = useState(getCurrentDate()); // Estado para almacenar la fecha formateada

        const handleSelectSerie = (type, item) => {
            if (type === 'inicio') {
                setSelectSerieInicio(item.name);
            } else if (type === 'fin') {
                setSelectSerieFin(item.name);
            }
        };
        const [filas, setFilas] = useState([]);

        const handleAgregarFila = () => {
            // Agregar nueva fila con valores iniciales
            setFilas([...filas, { 
                id: Date.now().toString(), 
                talla: '', 
                pares: '', 
                color: '' 
            }]);
        };

        const handleEliminarFila = (id) => {
            // Filtrar las filas para eliminar la seleccionada
            setFilas(filas.filter(fila => fila.id !== id));
        };

        const cargarClienteNatural = async () => {
            try {
                let identificador = dni;
                const cliente = await ClienteService.buscarCliente(tipoCliente, identificador);
                if (!cliente) {
                    console.error("No se encontró el cliente");
                    return;
                }
                
                setCliente(cliente);
            } catch (error) {
                console.error("Error cargando cliente:", error);
            }
        };
        const cargarClienteJuridico = async () => {
            try {
                let identificador= ruc;
                const cliente = await ClienteService.buscarCliente(tipoCliente, identificador);
                if (!cliente) {
                    console.error("No se encontró el cliente");
                    return;
                }
                
                setCliente(cliente);
            } catch (error) {
                console.error("Error cargando cliente:", error);
            }
        };
            
    return (
        <ScrollView className='mx-6 gap-2 '>
            
            <Text className='font-bold mx-auto mt-2 mb-3 text-lg'>
                Buscar Cliente por Tipo:
            </Text>
            <View className='flex-row gap-6 items-center justify-center mb-4'>
                    <TouchableOpacity className='bg-[#62d139] p-2' onPress={()=>setTipoCliente("natural")}>
                        <Text>
                            Cliente Natural
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity className='bg-[#62d139] p-2' onPress={()=>setTipoCliente("juridico")}>
                        <Text>
                            Cliente Juridico
                        </Text>
                    </TouchableOpacity>
            </View>
            { tipoCliente==="natural" &&(
                <View className='gap-2 mb-2'>
                    <Text className='font-bold'>DNI</Text>
                    <TextInput 
                        className='h-10 rounded-lg border' 
                        value={dni} 
                        onChangeText={setDni} 
                        keyboardType='numeric' 
                        maxLength={8}
                    />
                    <Button title='Buscar Cliente' onPress={(tipoCliente, dni)=>cargarClienteNatural(tipoCliente, dni)}></Button>
                    <View className='flex-row gap-6'>
                        <Text className='text-black text-lg font-bold'>Nombre: {cliente.Nombre}</Text>
                        <Text className='text-black text-lg font-bold'>DNI: {cliente.Dni}</Text>
                    </View>
                    
                </View>
                )
            }
            { tipoCliente==="juridico" &&(
                <View className='gap-2 mb-2'>
                    <Text className='font-bold'>
                        RUC
                    </Text>
                    <TextInput 
                        className='h-10 rounded-lg border' 
                        value={ruc} 
                        onChangeText={setRuc} 
                        keyboardType='numeric' 
                        maxLength={11}
                    />
                    <Button 
                        title='Buscar Cliente' 
                        onPress={(tipoCliente, ruc)=>cargarClienteJuridico(tipoCliente, ruc)}
                    />
                    <View className='flex-row gap-6'>
                        <Text className='text-black text-lg font-bold'>Razon Social: {cliente.Razon_social}</Text>
                        <Text className='text-black text-lg font-bold'>RUC: {cliente.Ruc}</Text>
                    </View>
                </View>
                )
            }
            <FormFieldOrden
                title={"Codigo"}
                value={""}
            />
            <FormFieldOrden
                title={"Modelo"}
                value={modelo}
                placeholder="Nombre del modelo"
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
                onChange={setTrabajador}
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
                <Text className='font-bold w-6'>   </Text> {/* Espacio para el botón eliminar */}
            </View>

            {filas.map((fila, index) => (
                <View key={fila.id} className='flex-row justify-between items-center gap-2 mb-2'>
                    <TextInput
                        className='border p-2 rounded flex-1'
                        placeholder='Talla'
                        placeholderTextColor={"gray"}
                        value={fila.talla}
                        onChangeText={(text) => {
                            const nuevasFilas = [...filas];
                            nuevasFilas[index].talla = text;
                            setFilas(nuevasFilas);
                        }}
                    />
                    
                    <TextInput
                        className='border p-2 rounded flex-1'
                        placeholder='Pares'
                        placeholderTextColor={"gray"}
                        keyboardType='numeric'
                        value={fila.pares}
                        onChangeText={(text) => {
                            const nuevasFilas = [...filas];
                            nuevasFilas[index].pares = text;
                            setFilas(nuevasFilas);
                        }}
                    />
                    
                    <TextInput
                        className='border p-2 rounded flex-1'
                        placeholder='Color'
                        placeholderTextColor={"gray"}
                        value={fila.color}
                        onChangeText={(text) => {
                            const nuevasFilas = [...filas];
                            nuevasFilas[index].color = text;
                            setFilas(nuevasFilas);
                        }}
                    />
                    
                    <TouchableOpacity 
                        onPress={() => handleEliminarFila(fila.id)}
                        className='p-2'
                    >
                        <Icon name="trash" size={20} color="red" />
                    </TouchableOpacity>
                </View>
            ))}

            <TouchableOpacity 
                className='flex-row gap-2 justify-center items-center mt-2'
                onPress={handleAgregarFila}
            >
                <Text>Agregar</Text>
                <Icon name="plus-circle" size={20} />
            </TouchableOpacity>
            <Text className='font-bold mt-4 text-lg mx-auto'>
                Detalle de la orden
            </Text>
            <View className='mt-2 gap-2'>
                <Text className='font-bold'>
                    Taco
                </Text>
                <TextInput
                    placeholder='Nombre de taco'
                    placeholderTextColor={"gray"}
                    value={nombreTaco}
                    onChangeText={setNombreTaco}
                    className='rounded-lg border h-10'
                />
            </View>
        </ScrollView>
    );
}