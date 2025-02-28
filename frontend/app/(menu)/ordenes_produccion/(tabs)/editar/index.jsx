import React, {useState, useEffect} from 'react';
import {View, ScrollView, Text, TouchableOpacity, StyleSheet, Dimensions, Alert, Modal, FlatList, Platform , KeyboardAvoidingView} from 'react-native';
import { Button, Card, TextInput } from 'react-native-paper';
import { useRouter } from 'expo-router';

import ModalSelector from "react-native-modal-selector";
import ClienteService from '@/services/ClienteService';
import ModeloService from '@/services/ModeloService';
import Icon from 'react-native-vector-icons/FontAwesome';
import DateTimePicker from "@react-native-community/datetimepicker";
import DetallePedidoService from "../../../../../services/DetallePedidoService";

import TipoCalzadoService from '@/services/TipoCalzadoService';
import CaracteristicasService from '@/services/CaracteristicasService';
import PedidoService from '@/services/PedidoService';

const { width } = Dimensions.get('window');


export default function editar() {
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
    const router = useRouter();
    const [cliente, setCliente] = useState("");
    const [modelo, setModelo] = useState("");
    const [selectSerieInicio, setSelectSerieInicio] = useState("");
    const [selectSerieFin, setSelectSerieFin] = useState("");
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
    const [dataModelos, setDataModelos] = useState([]);
    const [dataTipoCalzado, setDataTipoCalzado] = useState([]);
    const [tipoCalzado, setTipoCalzado] = useState("");
    const [fechaEntrega, setFechaEntrega] = useState(new Date());
    const [openDatePicker, setOpenDatePicker] = useState(false);
    const [codigoPedido, setCodigoPedido] = useState("");
    const getCurrentDate = () => {
        const date = new Date();
        return date.toISOString().split("T")[0]; // Formato: YYYY-MM-DD
    };
    
    const [currentDate, setCurrentDate] = useState(getCurrentDate()); // Estado para almacenar la fecha formateada

    const [filas, setFilas] = useState([]);
    const [filasEliminadas, setFilasEliminadas] = useState([]);
    const handleAgregarFila = () => {
        // Agregar nueva fila con valores iniciales
        setFilas([...filas, { 
            id: filas.length + 1,
            talla: '', 
            pares: '', 
            color: '' 
        }]);
    };
    const handleEliminarFila = (id) => {
        // Filtrar las filas para eliminar la seleccionada
        setFilas(filas.filter(fila => fila.id !== id));
        const filaEliminada = filas.filter(fila => fila.id === id);
        setFilasEliminadas([...filasEliminadas, ...filaEliminada]);
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
        setModelo("");
        setSelectSerieInicio("");
        setSelectSerieFin("");
        setTipoCliente("");
        setDni("");
        setRuc("");
        setNombreTaco("");
        setTallaTaco("");
        setDocumento("");
        setMaterial("");
        setTipoMaterial("");
        setAccesorios("");
        setSuela("");
        setForro("");
        setTipoCalzado("");
        setFechaEntrega(new Date());
        setFilas([]);
    };
    const transformarDatos = (data) => {
        return data.map((item) => ({
            id: item.idCaracteristicas, // Generar un ID único
            talla: item.Talla.toString(), // Convertir a string
            pares: item.Cantidad.toString(), // Convertir a string
            color: item.Color,
        }));
    };
    const cargarDetallePedido = async () => {
        try {
            const data = await DetallePedidoService.obtenerDetallePedido(codigoPedido);
            console.log(data);
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
            setModelo(dataModelo.Nombre);
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
            console.log(filas)
        } catch (error) {
            console.error("Error al obtener el pedido:", error);
            set
            Alert.alert("Error", "Hubo un problema al obtener el pedido.");
        }
    };
    const updatePedido = async () =>{
        try {
            let estado = true;
            let datosPedido = {
                nombreTaco, alturaTaco: tallaTaco, material, tipoMaterial, suela, accesorios, forro
            }
            for (const fila of filas) {
                let datosCaracteristicas = {
                    idCaracteristicas: fila.id,
                    talla: Number(fila.talla),
                    cantidad: Number(fila.pares),
                    color: fila.color
                }
                const editarCaracteristicas = await CaracteristicasService.editCaracteristicas(datosCaracteristicas);
                console.log(editarCaracteristicas)
                if (!editarCaracteristicas) {
                    console.error("Característica vacias o nulas:", datosCaracteristicas);
                    estado = false;
                    return;
                }
            }
            for (const fila of filasEliminadas) {
                let datosCaracteristicas = {
                    idCaracteristicas: fila.id,
                }
                const editarCaracteristicas = await CaracteristicasService.deleteCaracteristicas(datosCaracteristicas);
                console.log(editarCaracteristicas)
                if (!editarCaracteristicas) {
                    console.error("Característica vacias o nulas:", datosCaracteristicas);
                    estado = false;
                    return;
                }
            }
            if (estado === false) {
                console.log("Error al editar pedido");
                return ;
            }
            const actualizar = await DetallePedidoService.updateDetallePedido(codigoPedido, datosPedido);
            
            if (actualizar) {
                Alert.alert("Pedido actualizado", "El pedido se ha actualizado correctamente.");
                resetearCampos();
            }else{
                Alert.alert("Error", "Hubo un problema al actualizar el pedido.");
            }
        }catch (error) {
            console.error("Error al actualizar pedido:", error);
        }
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
        >
            <ScrollView className='mx-4 gap-2'>
                <TextInput
                    label={"Codigo de Pedido"}
                    value={codigoPedido}
                    onChangeText={setCodigoPedido}
                    right={
                        <TextInput.Icon size={22} icon={"magnify"} onPress={cargarDetallePedido}/>
                    }
                    placeholder='Ingrese el codigo de pedido'
                    mode='outlined'
                >
                </TextInput>
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
                    
                    <ModalSelector
                        data={dataTipoCalzado}
                        keyExtractor={item => item.idTipo}
                        labelExtractor={item => item.Nombre}
                        accessible={true}
                        onChange={(item)=>setTipoCalzado(item.Nombre)}
                        supportedOrientations={['landscape']}
                        cancelText='Cancelar'
                        cancelStyle={styles.cancelButton}
                        cancelTextStyle={styles.cancelText}
                    >
                        <TextInput
                            editable={false}
                            mode='outlined'
                            label={"Tipo de calzado"}
                            placeholder="Tipo de calzado"
                            placeholderTextColor={"black"}
                            value={tipoCalzado} 
                        />
                    </ModalSelector>
                    <TouchableOpacity onPress={() => {setModalModeloVisible(true); cargarModelosPorId()}}>
                        <TextInput
                            label="Modelo"
                            mode="outlined"
                            value={modelo}
                            editable={false}
                        />
                    </TouchableOpacity>
                    <Modal visible={modalModeloVisible} transparent animationType="slide">
                            
                        {/* <Pressable onPress={()=>setModalModeloVisible(false)}> */}
                            <View className='flex-1 my-6 pb-6 px-2'>
                                <View className='flex-row justify-end p-3'>
                                    <TouchableOpacity 
                                        onPress={()=>setModalModeloVisible(false)}
                                        className="bg-black/50 rounded-full p-2"
                                    >
                                        <Icon
                                            name="close"
                                            size={22}
                                            color={"white"}
                                        />
                                    </TouchableOpacity>
                                </View>
                                <FlatList
                                    data={dataModelos}
                                    keyExtractor={(item) => item.idModelo}
                                    renderItem={({ item }) => (
                                        <Card style={{ marginBottom: 10, borderRadius: 10, elevation: 5 }}>
                                            <Card.Cover
                                                style={{ height: 350, resizeMode: 'cover' }}
                                                source={{ uri: item.Imagen }} />
                                            <Card.Content>
                                                <TouchableOpacity onPress={()=>{setModelo(item.Nombre); setModalModeloVisible(false)}}>
                                                    <Text variant="titleMedium">{item.Nombre}</Text>
                                                </TouchableOpacity>
                                            </Card.Content>
                                        </Card>
                                    )}
                                />
                            </View>
                        {/* </Pressable> */}
                    </Modal>
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
                        right={<TextInput.Icon icon="calendar" onPress={() => setOpenDatePicker(!openDatePicker)}/>}
                    />
                    {openDatePicker && (
                        <View className='bg-[#151718]'>
                            <DateTimePicker
                                value={fechaEntrega}
                                mode="date"
                                display={Platform.OS === "ios" ? "spinner" : "default"}
                                onChange={(event, selectedDate) => {
                                    setOpenDatePicker(false);
                                    if (selectedDate) setFechaEntrega(selectedDate);
                                }}
                            />
                        </View>
                        )
                    }
                </View>
                <View className='flex mt-4 mb-4 gap-5'>
                    <View className='flex-row items-center gap-4'>
                        <Text className='font-bold'>Serie Inicio</Text>
                        <View className='h-8 bg-gray-100 border-l-2 items-center justify-center w-[30%]'>
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
                                value={selectSerieInicio? `${selectSerieInicio}`: selectSerieInicio} 
                                className='bg-gray-200 rounded-lg font-bold w-full'
                                />
                            </ModalSelector>
                            
                        </View>
                        
                    </View>
                    <View className='flex-row items-center gap-4'>
                        <Text className='font-bold'>Serie Fin     </Text>
                        <View className='h-8 bg-gray-100 border-l-2 items-center justify-center w-[30%]'>
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
                                    value={selectSerieFin? `${selectSerieFin}`: selectSerieFin} 
                                    className='bg-gray-200 rounded-lg font-bold w-full'
                                />
                            </ModalSelector>
                            
                        </View>
                    </View>
                </View>
                {filas.map((fila, index) => (
                    <View key={fila.id} className='flex-row justify-between items-center  mb-2 w-full'>
                        <TextInput
                            label="Talla"
                            className='rounded flex-1'
                            keyboardType='numeric'
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
                            style={{ height:40 }}
                            value={tallaTaco ? `Talla ${tallaTaco}` : 'Seleccione una talla'} 
                            className='bg-gray-200 rounded-lg font-bold '
                        />
                    </ModalSelector>
                </View>
                <View className='gap-2 mt-2 mb-4'>
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
                <Button mode='contained-tonal'icon="note" buttonColor='#6969' textColor='#000' onPress={updatePedido}>
                    Editar Pedido
                </Button>
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
