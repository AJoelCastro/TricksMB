import {View, ScrollView, Text, TouchableOpacity, StyleSheet, Dimensions, Alert, Modal, FlatList, Platform , KeyboardAvoidingView } from 'react-native';
import { Card, TextInput } from 'react-native-paper';
import React,{ useState, useEffect } from 'react';
import { useRouter } from 'expo-router';

import ModalSelector from "react-native-modal-selector";
import ClienteService from '@/services/ClienteService';
import ComboBox from '@/components/ComboBox';
import Icon from 'react-native-vector-icons/FontAwesome';

import "../../../../../global.css";

const { width } = Dimensions.get('window');

export default function crear() {
    
    const modelos = [
        { id: "1", nombre: "Modelo A", imagen: "https://d3fvqmu2193zmz.cloudfront.net/items_2/uid_commerces.1/uid_items_2.FDM0F4F95X84/500x500/66E97FA5CC14B-Zapatilla-Urbana-Mujer-574.webp" },
        { id: "2", nombre: "Modelo B", imagen: "https://d3fvqmu2193zmz.cloudfront.net/items_2/uid_commerces.1/uid_items_2.FDM0F4F95X84/500x500/66E97FA5CC14B-Zapatilla-Urbana-Mujer-574.webp" },
        { id: "3", nombre: "Modelo C", imagen: "https://d3fvqmu2193zmz.cloudfront.net/items_2/uid_commerces.1/uid_items_2.FDM0F4F95X84/500x500/66E97FA5CC14B-Zapatilla-Urbana-Mujer-574.webp" },
        { id: "4", nombre: "Modelo D", imagen: "https://d3fvqmu2193zmz.cloudfront.net/items_2/uid_commerces.1/uid_items_2.FDM0F4F95X84/500x500/66E97FA5CC14B-Zapatilla-Urbana-Mujer-574.webp" }
    ];

    const opcionesTaco = [
        { key: "3", label: "Talla 3" },
        { key: "4", label: "Talla 4" },
        { key: "5", label: "Talla 5" },
        { key: "7", label: "Talla 7" },
        { key: "9", label: "Talla 9" },
        { key: "12", label: "Talla 12" },
        { key: "15", label: "Talla 15" },
    ];

    const opcionesMaterial = [
        { key: "1", label: "sintetico" },
        { key: "2", label: "sintetico" },
        { key: "3", label: "sintetico" },
        { key: "4", label: "sintetico" },
        { key: "5", label: "sintetico" },
        { key: "6", label: "sintetico" },
        { key: "7", label: "sintetico" },
    ];

    const opcionesTipoMaterial = [
        { key: "1", label: "sintetico" },
        { key: "2", label: "sintetico" },
        { key: "3", label: "sintetico" },
        { key: "4", label: "sintetico" },
        { key: "5", label: "sintetico" },
        { key: "6", label: "sintetico" },
        { key: "7", label: "sintetico" },
    ];

    const opcionesSerieInicio = [
        { key: "1", label: "Talla 1" },
        { key: "2", label: "Talla 2" },
        { key: "3", label: "Talla 3" },
        { key: "4", label: "Talla 4" },
        { key: "5", label: "Talla 5" },
        { key: "6", label: "Talla 6" },
        { key: "7", label: "Talla 7" },
        { key: "8", label: "Talla 8" },
        { key: "9", label: "Talla 9" },
    ];
    const opcionesSerieFin = [
        { key: "2", label: "Talla 2" },
        { key: "3", label: "Talla 3" },
        { key: "4", label: "Talla 4" },
        { key: "5", label: "Talla 5" },
        { key: "6", label: "Talla 6" },
        { key: "7", label: "Talla 7" },
        { key: "8", label: "Talla 8" },
        { key: "9", label: "Talla 9" },
        { key: "0", label: "Talla 0" },
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
    const [documento, setDocumento] = useState("");
    const [modalModeloVisible, setModalModeloVisible] = useState(false);
    const [material, setMaterial] = useState("");
    const [tipoMaterial, setTipoMaterial] = useState("");
    const [accesorios, setAccesorios] = useState("");
    const [suela, setSuela] = useState("");
    const [forro, setForro] = useState("");

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

    const verificarDocumento=()=>{
        try {
            if(documento.length===8){
                setDni(documento);
                setTipoCliente("natural");
            }else if(documento.length===11){
                setRuc(documento);
                setTipoCliente("juridico");
            }else{
                Alert.alert("Ingrese un documento valido")
            }
        } catch (error) {
            Error.error(error);
        }
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
    useEffect(() => {
        if (tipoCliente === "natural" && dni) {
            cargarClienteNatural();
        } else if (tipoCliente === "juridico" && ruc) {
            cargarClienteJuridico();
        }
    }, [tipoCliente, dni, ruc]);

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
        >
            <ScrollView className='mx-6 gap-2 '>
                
                <Text className='font-bold mt-2 mb-3 text-lg'>
                    Buscar Cliente por Tipo
                </Text>
                <TextInput 
                    label="DNI O RUC"
                    placeholder='Ingrese un numero de DNI o RUC'
                    mode='outlined'
                    className='h-10 rounded-lg' 
                    value={documento} 
                    onChangeText={setDocumento} 
                    keyboardType='numeric' 
                    maxLength={11}
                    right={<TextInput.Icon icon="magnify" onPress={()=>verificarDocumento()}/>}
                />
                { tipoCliente==="natural" &&(
                    <View className='gap-2 mb-2'>
                        <View className='flex-row gap-6'>
                            <Text className='text-black text-lg font-bold'>Nombre: {cliente.Nombre}</Text>
                            <Text className='text-black text-lg font-bold'>DNI: {cliente.Dni}</Text>
                        </View>
                        
                    </View>
                    )
                }
                { tipoCliente==="juridico" &&(
                    <View className='gap-2 mb-2'>
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
                        editable={false}
                        onPressIn={() => setModalModeloVisible(true)}
                    />
                    <Modal visible={modalModeloVisible} transparent animationType="slide">
                        <View className='flex-1 py-14 px-2'>
                            <FlatList
                                data={modelos}
                                keyExtractor={(item) => item.id}
                                renderItem={({ item }) => (
                                    <Card style={{ marginBottom: 10 }}>
                                        <Card.Cover source={{ uri: item.imagen }} />
                                        <Card.Content>
                                            <TouchableOpacity onPress={()=>{setModelo(item.nombre); setModalModeloVisible(false);}}>
                                                <Text variant="titleMedium">{item.nombre}</Text>
                                            </TouchableOpacity>
                                        </Card.Content>
                                    </Card>
                                )}
                            >

                            </FlatList>
                        </View>
                    </Modal>
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
                <View className='gap-2 mt-2'>
                    <ModalSelector
                        data={opcionesMaterial}
                        accessible={true}
                        onChange={(material)=>{setMaterial(material.label)}}
                        supportedOrientations={['landscape']}
                        cancelText='Cancelar'
                    >
                        <TextInput
                            label={"Material"}
                            mode='outlined'
                            editable={false}
                            value={material}
                        />
                    </ModalSelector>
                    <ModalSelector
                        data={opcionesTipoMaterial}
                        accessible={true}
                        onChange={(tipoMaterial)=>{setTipoMaterial(tipoMaterial.label)}}
                        supportedOrientations={['landscape']}
                        cancelText='Cancelar'
                    >
                        <TextInput
                            label={"Tipo de Material"}
                            mode='outlined'
                            editable={false}
                            value={tipoMaterial}
                        />
                    </ModalSelector>
                    <TextInput
                        label={"Suela"}
                        mode='outlined'
                        value={suela}
                        placeholder='Suela'
                        onChangeText={setSuela}
                    />
                    <TextInput
                        label={"Accesorios"}
                        mode='outlined'
                        multiline={true}
                        numberOfLines={1}
                        value={accesorios}
                        placeholder='Digite los accesorios'
                        onChangeText={setAccesorios}
                    />
                    <TextInput
                        label={"Forro"}
                        mode='outlined'
                        value={forro}
                        onChangeText={setForro}
                        placeholder='Forro'
                    />
                </View>
                
                <View className='mb-32'>

                </View>
            </ScrollView>
        </KeyboardAvoidingView>
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
