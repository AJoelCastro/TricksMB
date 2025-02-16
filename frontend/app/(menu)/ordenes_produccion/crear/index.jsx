import {View, ScrollView, Text, TouchableOpacity, Button, StyleSheet, Dimensions} from 'react-native';
import {TextInput} from 'react-native-paper';
import { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';

import ModalSelector from "react-native-modal-selector";
import ClienteService from '@/services/ClienteService';
import FormFieldOrden from '@/components/formFieldOrden';
import ComboBox from '@/components/ComboBox';
import Icon from 'react-native-vector-icons/FontAwesome';

import "../../../../global.css";

const { width } = Dimensions.get('window');

export default function crear() {
        const opcionesTaco = [
            { key: "3", label: "Talla 3" },
            { key: "4", label: "Talla 4" },
            { key: "5", label: "Talla 5" },
            { key: "7", label: "Talla 7" },
            { key: "9", label: "Talla 9" },
            { key: "12", label: "Talla 12" },
            { key: "15", label: "Talla 15" },
        ];
        const opcionesSerieInicio = [
            { key: "0", label: "Talla 0" },
            { key: "1", label: "Talla 1" },
            { key: "2", label: "Talla 2" },
            { key: "3", label: "Talla 3" },
            { key: "4", label: "Talla 4" },
            { key: "5", label: "Talla 5" },
            { key: "6", label: "Talla 6" },
        ];
        const opcionesSerieFin = [
            { key: "1", label: "Talla 1" },
            { key: "2", label: "Talla 2" },
            { key: "3", label: "Talla 3" },
            { key: "4", label: "Talla 4" },
            { key: "5", label: "Talla 5" },
            { key: "6", label: "Talla 6" },
            { key: "7", label: "Talla 7" },
        ];
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
        const [tallaTaco, setTallaTaco] = useState("");

        const getCurrentDate = () => {
            const date = new Date();
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0'); // Meses van de 0 a 11
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`; // Formato: YYYY-MM-DD
        };
        const [currentDate] = useState(getCurrentDate()); // Estado para almacenar la fecha formateada

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
            <View className='gap-2'>
                <TextInput
                    label="Codigo"
                    mode='outlined'
                    value={""}
                    editable={false}
                />
                <TextInput
                    label="Modelo"
                    mode="outlined"
                    value={modelo}
                    placeholder="Nombre del modelo"
                    onChangeText={setModelo}
                />
                <TextInput
                    mode='outlined'
                    label="Fecha de creacion"
                    value={currentDate}
                    editable={false}
                />
            </View>
            <ComboBox
                data={[ {label:"Juan Buendia", value:"Juan Buendia"}, {label:"Alvaro gay",value:"Alvaro gay"}]}
                onChange={setTrabajador}
                placeholder="Asignar trabajador" 
            />
            <View className='flex-row justify-between mt-4 mb-4'>
                <View className='flex-row items-center gap-2'>
                    <Text className='font-bold'>Serie Inicio</Text>
                    <View className='w-22 h-8 bg-gray-100 border-l-2 items-center justify-center'>
                        <ModalSelector
                            data={opcionesSerieInicio}
                            accessible={true}
                            onChange={(talla)=>setSelectSerieInicio(talla.key)}
                            supportedOrientations={['landscape']}
                            cancelText='Cancelar'
                            cancelStyle={styles.cancelButton}
                            cancelTextStyle={styles.cancelText}
                        >
                            <TextInput
                            editable={false}
                            style={{ height: 40 }} 
                            placeholder="Talla"
                            placeholderTextColor={"black"}
                            value={selectSerieInicio} 
                            className='bg-gray-200 rounded-lg font-bold w-full'
                            />
                        </ModalSelector>
                        
                    </View>
                    
                </View>
                <View className='flex-row items-center gap-2 justify-center'>
                    <Text className='font-bold'>Serie Fin</Text>
                    <View className='w-22 h-8 bg-gray-100 border-l-2 items-center justify-center'>
                        <ModalSelector
                            data={opcionesSerieFin}
                            accessible={true}
                            onChange={(talla)=>setSelectSerieFin(talla.key)}
                            supportedOrientations={['landscape']}
                            cancelText='Cancelar'
                            cancelStyle={styles.cancelButton}
                            cancelTextStyle={styles.cancelText}
                        >
                            <TextInput
                                editable={false}
                                style={{ height: 40 }} 
                                placeholder="Talla"
                                placeholderTextColor={"black"}
                                value={selectSerieFin} 
                                className='bg-gray-200 rounded-lg font-bold w-full'
                            />
                        </ModalSelector>
                        
                    </View>
                </View>
            </View>
            {filas.map((fila, index) => (
                <View key={fila.id} className='flex-row justify-between items-center  mb-2'>
                    <TextInput
                        label="Talla"
                        className='rounded flex-1'
                        placeholder='Talla'
                        style={{ height:40, width: width * 0.25 }}
                        mode='outlined'
                        value={fila.talla}
                        onChangeText={(text) => {
                            const nuevasFilas = [...filas];
                            nuevasFilas[index].talla = text;
                            setFilas(nuevasFilas);
                        }}
                    />
                    
                    <TextInput
                        label="Pares"
                        className='rounded flex-1'
                        placeholder='Pares'
                        style={{ height:40, width: width * 0.25 }}
                        mode='outlined'
                        keyboardType='numeric'
                        value={fila.pares}
                        onChangeText={(text) => {
                            const nuevasFilas = [...filas];
                            nuevasFilas[index].pares = text;
                            setFilas(nuevasFilas);
                        }}
                    />
                    
                    <TextInput
                        label="Color"
                        className='rounded flex-1'
                        placeholder='Color'
                        style={{ height:40, width: width * 0.25 }}
                        mode='outlined'
                        value={fila.color}
                        onChangeText={(text) => {
                            const nuevasFilas = [...filas];
                            nuevasFilas[index].color = text;
                            setFilas(nuevasFilas);
                        }}
                    />
                    
                    <TouchableOpacity 
                        onPress={() => handleEliminarFila(fila.id)}
                    >
                        <Icon name="trash" size={20} color="red" />
                    </TouchableOpacity>
                </View>
            ))}

            <TouchableOpacity 
                className='flex-row gap-2 justify-center items-center mt-2'
                onPress={handleAgregarFila}
            >
                <Text className='text-lg'>Agregar</Text>
                <Icon name="plus-circle" size={20} />
            </TouchableOpacity>
            <Text className='font-bold mt-4 text-lg mx-auto'>
                Detalle de la orden
            </Text>
            <View className='mt-2 gap-2'>
                
                <TextInput
                    label="Taco"
                    mode="outlined"
                    placeholder='Nombre de taco'
                    placeholderTextColor={"gray"}
                    value={nombreTaco}
                    onChangeText={setNombreTaco}
                    className='rounded-lg h-10'
                    
                />
            </View>
            <View className='mt-2 flex-row items-center gap-8'>
                <Text className='font-bold'>
                    Altura de taco:
                </Text>
                <ModalSelector
                    data={opcionesTaco}
                    accessible={true}
                    onChange={(talla)=>setTallaTaco(talla.key)}
                    supportedOrientations={['landscape']}
                    cancelText='Cancelar'
                    cancelStyle={styles.cancelButton}
                    cancelTextStyle={styles.cancelText}
                >
                    <TextInput
                        editable={false}
                        placeholder="Seleccione una talla"
                        placeholderTextColor={"black"}
                        style={{ height:40 }}
                        value={tallaTaco} 
                        className='bg-gray-200 rounded-lg font-bold'
                    />
                </ModalSelector>
            </View>
            <View className='mb-32'>

            </View>
        </ScrollView>
    );
}
const styles = StyleSheet.create({
    cancelButton: {
        backgroundColor: "#ff4444",  // Rojo
        padding: 10,
        borderRadius: 5,
    },
    cancelText: {
        color: "#fff",
        fontSize: 15,
        fontWeight: "bold",
    },
});
