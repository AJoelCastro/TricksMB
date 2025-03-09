import React, { useEffect, useState } from 'react';
import {View, ScrollView, Text, TouchableOpacity, StyleSheet, Dimensions, Alert, Modal, FlatList, Platform , KeyboardAvoidingView, SafeAreaView} from 'react-native'
import { Button, Card, TextInput } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useRouter, useLocalSearchParams } from 'expo-router';

import ModalSelector from "react-native-modal-selector";
import ClienteService from '@/services/ClienteService';
import ModeloService from '@/services/ModeloService';
import Icon from 'react-native-vector-icons/FontAwesome';
import DateTimePicker from "@react-native-community/datetimepicker";
import DetallePedidoService from "../../../../../frontend/services/DetallePedidoService";

import TipoCalzadoService from '@/services/TipoCalzadoService';
import CaracteristicasService from '@/services/CaracteristicasService';
import PedidoService from '@/services/PedidoService';
import DetalleAreaTrabajoService from '@/services/DetalleAreaTrabajoService';

const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');
const Corte = () => {
    const {codigoOrden} = useLocalSearchParams();
    const getFechaActualizacion= () => {
                const date = new Date();
                const year = date.getFullYear();
                const month = String(date.getMonth() + 1).padStart(2, '0'); // Meses van de 0 a 11
                const day = String(date.getDate()).padStart(2, '0');
                return `${year}-${month}-${day}`; // Formato: YYYY-MM-DD
            };
    const [fechaActualizacion] = useState(getFechaActualizacion());
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
        { key: "2", label: "sintetico1" },
        { key: "3", label: "sintetico2" },
        { key: "4", label: "sintetico3" },
        { key: "5", label: "sintetico4" },
        { key: "6", label: "sintetico5" },
        { key: "7", label: "sintetico6" },
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
        { key: "31", label: "Talla 31" },
        { key: "32", label: "Talla 32" },
        { key: "33", label: "Talla 33" },
        { key: "34", label: "Talla 34" },
        { key: "35", label: "Talla 35" },
        { key: "36", label: "Talla 36" },
        { key: "37", label: "Talla 37" },
        { key: "38", label: "Talla 38" },
        { key: "39", label: "Talla 39" },
    ];
    const opcionesSerieFin = [
        { key: "32", label: "Talla 32" },
        { key: "33", label: "Talla 33" },
        { key: "34", label: "Talla 34" },
        { key: "35", label: "Talla 35" },
        { key: "36", label: "Talla 36" },
        { key: "37", label: "Talla 37" },
        { key: "38", label: "Talla 38" },
        { key: "39", label: "Talla 39" },
        { key: "40", label: "Talla 40" },
    ];
    const [cliente, setCliente] = useState("");
    const [modelo, setModelo] = useState([]);
    const [selectSerieInicio, setSelectSerieInicio] = useState("");
    const [selectSerieFin, setSelectSerieFin] = useState("");
    const [tipoCliente, setTipoCliente] = useState("");
    const [dni, setDni] = useState("");
    const [ruc, setRuc] = useState("");
    const [nombreTaco, setNombreTaco] = useState("");
    const [tallaTaco, setTallaTaco] = useState("");
    const [modalModeloVisible, setModalModeloVisible] = useState(false);
    const [material, setMaterial] = useState("");
    const [tipoMaterial, setTipoMaterial] = useState("");
    const [accesorios, setAccesorios] = useState("");
    const [suela, setSuela] = useState("");
    const [forro, setForro] = useState("");
    const [dataModelos, setDataModelos] = useState([]);
    const [dataTipoCalzado, setDataTipoCalzado] = useState([]);
    const [tipoCalzado, setTipoCalzado] = useState("");
    const [fechaEntrega, setFechaEntrega] = useState(new Date());
    const [openDatePicker, setOpenDatePicker] = useState(false);
    const [idDetallePedido, setIdDetallePedido] = useState();
    const [dataDetalleAreaTrabajo, setDataDetalleAreaTrabajo] = useState([]);
    const getCurrentDate = () => {
        const date = new Date();
        return date.toISOString().split("T")[0]; // Formato: YYYY-MM-DD
    };

    const [currentDate, setCurrentDate] = useState(getCurrentDate()); // Estado para almacenar la fecha formateada

    const [filas, setFilas] = useState([]);
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

    const cargarModelosPorId = async () => {
        try {
            let id = tipoCalzado.idTipo;
            const modelos = await ModeloService.getAllModeloById(id);
            
            if (!modelos) {
                console.error("No se encontraron los modelos por ID");
                return;
            }
            setDataModelos(modelos);
        } catch (error) {
            console.error("Error cargando modelos por ID:", error);
        }
    };
        
    useEffect(() => {
        const cargarTipoCalzado = async () => {
            try {
                const tipos = await TipoCalzadoService.getAllTipoCalzado();
                if (!tipos) {
                    console.error("No se encontraron los tipos de calzado");
                    return;
                }
                
                setDataTipoCalzado(tipos);
            } catch (error) {
                console.error("Error cargando tipos de calzado:", error);
            }
        }
        cargarTipoCalzado();
    }, [])

    useEffect(() => {
        if (tipoCliente === "natural" && dni) {
            cargarClienteNatural();
        } else if (tipoCliente === "juridico" && ruc) {
            cargarClienteJuridico();
        }
    }, [tipoCliente, dni, ruc]);

    const resetearCampos = () => {
        setCliente("");
        setModelo([]);
        setSelectSerieInicio("");
        setSelectSerieFin("");
        setTipoCliente("");
        setDni("");
        setRuc("");
        setNombreTaco("");
        setTallaTaco("");
        setMaterial("");
        setTipoMaterial("");
        setAccesorios("");
        setSuela("");
        setForro("");
        setTipoCalzado("");
        setFechaEntrega(new Date());
        setFilas([]);
        setDataDetalleAreaTrabajo([]);
    };
    const transformarDatos = (data) => {
        return data.map((item) => ({
            id: item.idCaracteristicas, // Generar un ID único
            talla: item.Talla.toString(), // Convertir a string
            pares: item.Cantidad.toString(), // Convertir a string
            color: item.Color,
        }));
    };
    const transformarDatosDetalleAreaTrabajo = (data) => {
        return data.map((item) => ({
            id: item.Caracteristicas_idCaracteristicas, // Generar un ID único
            avance: "", 
            comentario: item.Comentario,
            terminado: item.terminado.toString(),
        }));
    };
    useEffect(() => {
        const cargarDetallePedido = async () => {
            try {
                let codigoPedido = codigoOrden
                const data = await DetallePedidoService.obtenerDetallePedido(codigoPedido);
                setIdDetallePedido(data.idDetalle_pedido);
                setAccesorios(data.Accesorios);
                setTallaTaco(data.Altura_taco);
                let fecha = new Date(data.Fecha_creacion);
                setCurrentDate(fecha.toISOString().split("T")[0]);
                setForro(data.Forro);
                setMaterial(data.Material);
                setNombreTaco(data.Nombre_taco);
                setSuela(data.Suela);
                setTipoMaterial(data.Tipo_material);
                const dataTipoCalzado = await TipoCalzadoService.getTipoCalzadoByCodigoPedido(codigoPedido);
                setTipoCalzado(dataTipoCalzado.Nombre);
                const dataModelo = await ModeloService.getModeloByCodigoPedido(codigoPedido);
                if (dataModelo) {
                        let idModelo = dataModelo.idModelo;
                        const imagen = await ModeloService.getImagenById(idModelo);
                        if (!imagen) {
                            console.error("No se encontraron las imagenes");
                            return {...dataModelo, imagenes:[]};
                        }
                        const dataImagenes = {
                            ...dataModelo,
                            imagenes: imagen.map(img => img.Url)
                        }
                        setModelo(dataImagenes);
                }
                const dataPedido = await PedidoService.getPedidoByCodigoPedido(codigoPedido);
                setSelectSerieInicio(dataPedido.Serie_inicio);
                setSelectSerieFin(dataPedido.Serie_final);
                setFechaEntrega(new Date(dataPedido.Fecha_entrega));
                const dataCliente = await ClienteService.getClienteByCodigoPedido(codigoPedido);
                setTipoCliente(dataCliente.Tipo_cliente);
                setCliente(dataCliente);
                let idDetallePedido=data.idDetalle_pedido;
                const dataCaracteristicas = await CaracteristicasService.getAllCaracteristicasById(idDetallePedido);
                const filasTransformadas = transformarDatos(dataCaracteristicas);
                setFilas(filasTransformadas);
            } catch (error) {
                console.error("Error al obtener el pedido:", error);
                set
                Alert.alert("Error", "Hubo un problema al obtener el pedido.");
            }
        };
        cargarDetallePedido();
    }, [])
    
    
    const updatePedido = async () =>{
        try {
            let info=true;

            for (const fila of dataDetalleAreaTrabajo) {
                let state = null;
                let idCaracteristicas = Number(fila.id);
                const data = await CaracteristicasService.getCaracteristicaByIdCaracteristicas(idCaracteristicas);
                if((Number(fila.avance)+Number(fila.terminado)) === Number(data[0].Cantidad)){
                    state = 1;
                }
                else {
                    state = 0;
                }
                let datos = {
                    cantidadAvance: (Number(fila.avance)+Number(fila.terminado)),
                    comentario: fila.comentario,
                    estado : state
                }
                const editarDAT= await DetalleAreaTrabajoService.updatePedido(idCaracteristicas, datos);
                if (!editarDAT) {
                    console.error("Característica vacias o nulas:", datos);
                    info = false;
                    return;
                }  
            }
            if (info === false) {
                Alert.alert("Error", "Hubo un problema al actualizar el pedido.");
                return ;
            }
            else {
                Alert.alert("Pedido actualizado", "El pedido se ha actualizado correctamente.");
                resetearCampos();
            }
        }catch (error) {
            console.error("Error al actualizar pedido:", error);
        }
    }
    useEffect(() => {
        const obtenerDetalleAreaTrab = async () => {
            try {
                let codigoPedido = codigoOrden
                const data = await DetalleAreaTrabajoService.obtenerTodos(codigoPedido);
                const dataExtra = data.map((item) => ({
                    ...item,
                    terminado: item.Cantidad_avance // Agrega la propiedad "terminado"
                }));
                const filasTransformadas = transformarDatosDetalleAreaTrabajo(dataExtra);
                setDataDetalleAreaTrabajo(filasTransformadas);
            }
            catch (error) {
                console.error("Error al obtener los detalles del area de trabajo:", error);
            }
        };
        obtenerDetalleAreaTrab();
    }, []);
return (
    <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
    >
        <ScrollView className='mx-4 gap-2'>
            <SafeAreaView>
                
                { tipoCliente==="natural" &&(
                    <View className='gap-2 mb-2'>
                        <View className='flex-col'>
                            <TextInput 
                                value={cliente.nombre}
                                mode='outlined'
                                label={"Nombre"}
                                editable={false}
                            >
                            </TextInput>
                            <TextInput 
                                value={cliente.Dni}
                                mode='outlined'
                                label={"DNI"}
                                editable={false}
                            >
                            </TextInput>
                        </View>
                        
                    </View>
                    )
                }
                { tipoCliente==="juridico" &&(
                    <View className='gap-2 mb-2'>
                        <View className='flex-col'>
                            <TextInput 
                                value={cliente.nombre}
                                mode='outlined'
                                label={"Razon Social"}
                                editable={false}
                            >
                            </TextInput>
                            <TextInput 
                                value={cliente.Ruc}
                                mode='outlined'
                                label={"RUC"}
                                editable={false}
                            >
                            </TextInput>
                        </View>
                    </View>
                    )
                }
                <View className='gap-2'>
                    <View className='flex-row justify-between'>
                        {/* IMAGEN */}
                        <View className='w-[30%]'>
                            <Card style={{ borderRadius: 10 }}>
                                <Card.Cover
                                    style={{ height: height*0.6, resizeMode: 'contain' }}
                                    source={{ uri: modelo?.imagenes?.[0] }} />
                                <Card.Content>
                                    <Text variant="titleMedium">{modelo.Nombre}</Text>
                                </Card.Content> 
                            </Card>
                        </View>
                        <View className='w-[48%] '>
                            <View className=' '>
                                <TextInput
                                    editable={false}
                                    mode='outlined'
                                    label={"Tipo de calzado"}
                                    value={tipoCalzado} 
                                />
                            </View>
                            <View className=' '>
                                <TextInput
                                    label="Modelo"
                                    mode="outlined"
                                    value={modelo.Nombre}
                                    editable={false}
                                />
                            </View>
                        </View>
                    </View>
                    <TextInput
                        mode='outlined'
                        label="Fecha de creacion"
                        value={currentDate}
                        editable={false}
                        right={<TextInput.Icon icon="calendar" />}
                    />
                    <TextInput
                        label="Fecha de entrega"
                        mode='outlined'
                        value={fechaEntrega.toISOString().split("T")[0]}
                        editable={false}
                        right={<TextInput.Icon icon="calendar" />}
                    />
                </View>
                <View className='flex mt-4 mb-4 gap-5'>
                    <View className='flex-row items-center gap-4'>
                        <Text className='font-bold'>Serie Inicio</Text>
                        <View className='h-8 bg-gray-100 border-l-2 items-center justify-center w-[30%]'>

                            <TextInput
                            editable={false}
                            style={{ height: 40 }} 
                            placeholder="Talla"
                            placeholderTextColor={"black"}
                            value={selectSerieInicio? `${selectSerieInicio}`: selectSerieInicio} 
                            className='bg-gray-200 rounded-lg font-bold w-full'
                            />
                            
                        </View>
                        
                    </View>
                    <View className='flex-row items-center gap-4'>
                        <Text className='font-bold'>Serie Fin     </Text>
                        <View className='h-8 bg-gray-100 border-l-2 items-center justify-center w-[30%]'>
                            <TextInput
                                editable={false}
                                style={{ height: 40 }} 
                                placeholder="Talla"
                                placeholderTextColor={"black"}
                                value={selectSerieFin? `${selectSerieFin}`: selectSerieFin} 
                                className='bg-gray-200 rounded-lg font-bold w-full'
                            />
                            
                        </View>
                    </View>
                </View>
                <View className='flex-row w-[92%]'>
                    <View className='flex-1 w'>
                        {filas.map((fila, index) => (
                            <View key={fila.id} className='flex-row gap-2 mb-2 '>
                                <TextInput
                                    label="Talla"
                                    className='rounded flex-1'
                                    keyboardType='numeric'
                                    placeholder='Talla'
                                    style={{ height:40, width: width * 0.10 }}
                                    mode='outlined'
                                    value={fila.talla}
                                    onChangeText={(text) => {
                                        const nuevasFilas = [...filas];
                                        nuevasFilas[index].talla = text;
                                        setFilas(nuevasFilas);
                                    }}
                                    editable={false}
                                />
                                
                                <TextInput
                                    label="Pares"
                                    className='rounded flex-1'
                                    placeholder='Pares'
                                    style={{ height:40, width: width * 0.10 }}
                                    mode='outlined'
                                    keyboardType='numeric'
                                    value={fila.pares}
                                    onChangeText={(text) => {
                                        const nuevasFilas = [...filas];
                                        nuevasFilas[index].pares = text;
                                        setFilas(nuevasFilas);
                                    }}
                                    editable={false}
                                />
                                
                                <TextInput
                                    label="Color"
                                    className='rounded flex-1'
                                    placeholder='Color'
                                    style={{ height:40, width: width * 0.18 }}
                                    mode='outlined'
                                    value={fila.color}
                                    onChangeText={(text) => {
                                        const nuevasFilas = [...filas];
                                        nuevasFilas[index].color = text;
                                        setFilas(nuevasFilas);
                                    }}
                                    editable={false}
                                />
                            </View>
                        ))}
                    </View>
                    <View className='flex-1'>
                        {dataDetalleAreaTrabajo.map((fila, index) => (
                            
                            <View key={fila.id} className='flex-row justify-between gap-2 mb-2 w-full'>
                                <TextInput
                                    label={"Terminado"}
                                    placeholder='Color'
                                    style={{ height:40, width: width * 0.10 }}
                                    mode='outlined'
                                    value={fila.terminado}
                                    editable={false}
                                />
                                <TextInput
                                    label={"Avance"}
                                    placeholder='Avance'
                                    style={{ height:40, width: width * 0.10 }}
                                    mode='outlined'
                                    value={fila.avance}
                                    keyboardType='numeric'
                                    onChangeText={(text) => {
                                        const nuevasFilas = [...dataDetalleAreaTrabajo];
                                        
                                        if((Number(text) +Number(nuevasFilas[index].terminado)) > filas[index].pares){
                                            alert("El  total no puede ser mayor a la cantidad de pares");
                                            nuevasFilas[index].avance = "";
                                        }
                                        else{
                                            nuevasFilas[index].avance = text;
                                        }
                                        
                                        setDataDetalleAreaTrabajo(nuevasFilas);
                                    }}
                                />
                                <TextInput
                                    label={"Comentario"}
                                    placeholder='Comentario'
                                    style={{ height:40, width: width * 0.30 }}
                                    mode='outlined'
                                    value={fila.comentario}
                                    onChangeText={(text) => {
                                        const nuevasFilas = [...dataDetalleAreaTrabajo];
                                        nuevasFilas[index].comentario = text;
                                        setDataDetalleAreaTrabajo(nuevasFilas);
                                    }}
                                />
                            </View>
                        ))}
                    </View>
                </View>
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
                        editable={false}
                        
                    />
                </View>
                <View className='mt-2 flex-row items-center gap-8'>
                    <Text className='font-bold'>
                        Altura de taco:
                    </Text>
                    <TextInput
                        editable={false}
                        style={{ height:40 }}
                        value={tallaTaco ? `Talla ${tallaTaco}` : 'Seleccione una talla'} 
                        className='bg-gray-200 rounded-lg font-bold '
                    />
                </View>
                <View className='gap-2 mt-2 mb-4'>
                    <TextInput
                        label={"Material"}
                        mode='outlined'
                        editable={false}
                        value={material}
                    />
                    
                    <TextInput
                        label={"Tipo de Material"}
                        mode='outlined'
                        editable={false}
                        value={tipoMaterial}
                    />
                    
                    <TextInput
                        label={"Suela"}
                        mode='outlined'
                        value={suela}
                        placeholder='Suela'
                        onChangeText={setSuela}
                        editable={false}
                    />
                    <TextInput
                        label={"Accesorios"}
                        mode='outlined'
                        multiline={true}
                        numberOfLines={1}
                        value={accesorios}
                        placeholder='Digite los accesorios'
                        onChangeText={setAccesorios}
                        editable={false}
                    />
                    <TextInput
                        label={"Forro"}
                        mode='outlined'
                        value={forro}
                        onChangeText={setForro}
                        placeholder='Forro'
                        editable={false}
                    />
                </View>
                <Button mode='contained-tonal'icon="note" buttonColor='#6969' textColor='#000' onPress={updatePedido}>
                    Actualizar Avance
                </Button>
                <View className='mb-32'>

                </View>
            </SafeAreaView>
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

export default Corte;