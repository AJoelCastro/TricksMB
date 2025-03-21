import React, { useEffect, useState, useRef, useCallback } from 'react';
import { View, Text, TouchableOpacity, Pressable, Modal, FlatList,KeyboardAvoidingView, Platform, SafeAreaView } from 'react-native';
import { useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';
import {Card, Checkbox, TextInput} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon1 from 'react-native-vector-icons/FontAwesome';
import DetallePedidoService from '@/services/DetallePedidoService';
import DetalleAreaTrabajoService from '@/services/DetalleAreaTrabajoService';
import EmpleadoService from '@/services/EmpleadoService';

const Actualizar = () => {
    const route = useRouter();
    const [codigoOrden, setCodigoOrden] = useState('');
    const [estado, setEstado] = useState("");
    const [areaTrabajo, setAreaTrabajo] = useState("");
    const [empleados, setEmpleados] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [dataEmpleados, setDataEmpleados] = useState([]);
    const [checkedEmpleados, setCheckedEmpleados] = useState({});
    const [empleadosAsignados, setEmpleadosAsignados] = useState([]);
    const [showEmpleadosAsignados, setShowEmpleadosAsignados] = useState(false);
    function capitalizarPrimeraLetra(palabra) {
        return palabra.charAt(0).toUpperCase() + palabra.slice(1);
    }
    const handleOptionPress = async (option) => {
        // Lógica para manejar la selección de la opción de asignar empleados sino no puede ser redirigido a la pestaña
        if (empleadosAsignados.length > 0) {
            try {
                const data = await DetallePedidoService.obtenerDetallePedido(codigoOrden);
                if (data) {
                    route.push(`/ordenes_produccion/actualizar/${option.title}?codigoOrden=${codigoOrden}`); 
                }
            } catch (error) {
                error("Error al obtener el pedido", error);
            }
        }
        else {
            alert("Asigne empleados primero");
        }
    };
    const iniciarProceso = async () => {
        try {
            let estado = "Proceso";
            const dataIniciar = await DetallePedidoService.updateEstado(codigoOrden, estado);
            console.log("dataIniciar",dataIniciar);
            if (dataIniciar) {
                setEstado("Proceso"); // Actualiza el estado después de que se complete la operación
                alert(`${dataIniciar.detalleAreaTrabajo.message}`);
            } else {
                console.error('Error al obtener el pedido, verifique que el código sea correcto.');
            }
        } catch (error) {
            alert("Error al iniciar el proceso", error);
        }
    };
    
    useEffect(() => {
        const obtenerAreaTrabajo = async () => {
            if (estado === "Proceso") {
                try {
                    let codigoPedido = codigoOrden
                    const dataDetalleAreaTrabajo = await DetalleAreaTrabajoService.obtenerTodos(codigoPedido);
                    switch (dataDetalleAreaTrabajo[0].Area_trabajo_idArea_trabajo) {
                        case 1:
                            setAreaTrabajo("corte");
                            break;
                        case 2:
                            setAreaTrabajo("perfilado");
                            break;
                        case 3:
                            setAreaTrabajo("armado");
                            break;
                        case 4:
                            setAreaTrabajo("alistado");
                            break;
                    }
                }catch (error) {
                    console.error("Error al obtener el area de trabajo.");
                }
            }
            
        };
        obtenerAreaTrabajo();
    },[estado])
    const verificarProceso = async () => {
        try {
            setCheckedEmpleados({});
            setEmpleadosAsignados([]);
            setShowEmpleadosAsignados(false);
            setEmpleados([]);
            setAreaTrabajo("");
            setEstado("");
            const data = await DetallePedidoService.obtenerDetallePedido(codigoOrden);
            let codigoPedido = codigoOrden
            setEstado(data.Estado);
            if (data.Estado === "Proceso") {
                const dataDetalleAreaTrabajo = await DetalleAreaTrabajoService.obtenerTodos(codigoPedido);
                let nomArea;
                switch (dataDetalleAreaTrabajo[0].Area_trabajo_idArea_trabajo) {
                    case 1:
                        nomArea = "Corte";
                        setAreaTrabajo("corte");
                        const dataDetalleEmpleadoPedido1 = await EmpleadoService.obtenerAllDetalleEmpleadoPedido(nomArea, codigoPedido);
                        if (!dataDetalleEmpleadoPedido1) {
                            return;
                        }
                        if(dataDetalleEmpleadoPedido1.detalleEmpleadoPedido.length === 0){
                            alert("No hay empleados asignados a esta área de trabajo");
                            
                        }else{
                            setEmpleadosAsignados(dataDetalleEmpleadoPedido1.detalleEmpleadoPedido);
                            setShowEmpleadosAsignados(true);
                        }
                        break;
                    case 2:
                        nomArea = "Perfilado";
                        setAreaTrabajo("perfilado");
                        const dataDetalleEmpleadoPedido2 = await EmpleadoService.obtenerAllDetalleEmpleadoPedido(nomArea, codigoPedido);
                        if (!dataDetalleEmpleadoPedido2) {
                            return;
                        }
                        if(dataDetalleEmpleadoPedido2.detalleEmpleadoPedido.length === 0){
                            alert("No hay empleados asignados a esta área de trabajo");
                            
                        }else{
                            setEmpleadosAsignados(dataDetalleEmpleadoPedido2.detalleEmpleadoPedido);
                            setShowEmpleadosAsignados(true);
                        }
                        break;
                    case 3:
                        nomArea = "Armado";
                        setAreaTrabajo("armado");
                        const dataDetalleEmpleadoPedido3 = await EmpleadoService.obtenerAllDetalleEmpleadoPedido(nomArea, codigoPedido);
                        if (!dataDetalleEmpleadoPedido3) {
                            return;
                        }
                        if(dataDetalleEmpleadoPedido3.detalleEmpleadoPedido.length === 0){
                            alert("No hay empleados asignados a esta área de trabajo");
                            
                        }else{
                            setEmpleadosAsignados(dataDetalleEmpleadoPedido3.detalleEmpleadoPedido);
                            setShowEmpleadosAsignados(true);
                        }
                        break;
                    case 4:
                        nomArea = "Alistado";
                        setAreaTrabajo("alistado");
                        const dataDetalleEmpleadoPedido4 = await EmpleadoService.obtenerAllDetalleEmpleadoPedido(nomArea, codigoPedido);
                        if (!dataDetalleEmpleadoPedido4) {
                            return;
                        }
                        if(dataDetalleEmpleadoPedido4.detalleEmpleadoPedido.length === 0){
                            alert("No hay empleados asignados a esta área de trabajo");
                            
                        }else{
                            setEmpleadosAsignados(dataDetalleEmpleadoPedido4.detalleEmpleadoPedido);
                            setShowEmpleadosAsignados(true);
                        }
                        break;
                }
            }
            if (!data) {
                console.error('Error al obtener el detalle del pedido');
            }
        } catch (error) {
            alert("Error al obtener el pedido", error);
        }
    }
    useEffect(() => {
        const obtenerEmpleadosPorArea = async () => {
            setDataEmpleados([]);
            if(showModal===true){
                try {
                    let nomArea = capitalizarPrimeraLetra(areaTrabajo);
                    const dataEmpleados = await EmpleadoService.obtenerEmpleadosPorArea(nomArea);
                    setDataEmpleados(dataEmpleados);
                } catch (error) {
                    alert("Error al obtener empleados", error);
                }
            }
        }
        obtenerEmpleadosPorArea();
    }, [showModal])
    
    const agregarOQuitarEmpleado = (item) => {
        setCheckedEmpleados((prev) => {
            const newChecked = { ...prev, [item.idEmpleado]: !prev[item.idEmpleado] };
            return newChecked;
        });

        if (Array.isArray(empleados) && empleados.some(e => e.idEmpleado === item.idEmpleado)) {
            // Si el empleado ya está en la lista, lo quitamos
            setEmpleados(empleados.filter(e => e.idEmpleado !== item.idEmpleado));
        } else {
            // Si el empleado no está en la lista, lo agregamos
            setEmpleados([...empleados, item]);
        }
    };

    const asignarEmpleados = async () => {
        try {
            let bandera= true;
            let codigoPedido = codigoOrden;
            for (const empleado of empleados) {
                console.log(empleado, codigoPedido);
                let dni = empleado.Dni
                const dataAsignar = await EmpleadoService.crearDetalleEmpleadoPedido(dni, codigoPedido);
                console.log("Data Asignar",dataAsignar);
                if(!dataAsignar){
                    bandera = false;
                    console.error("Error al asignar empleados", dataAsignar);
                }
            }
            if(bandera){
                alert("Empleados asignados exitosamente");
                setEmpleados([]);
                verificarProceso();
            }
        }catch(error){
            alert("Error al asignar empleados", error);
        }
    }

    const options = [
        { id: 1, title: 'corte', icon: 'content-cut', color: estado==='Editable' ? 'bg-gray-700' : 'bg-red-500' },
        { id: 2, title: 'perfilado', icon: 'brush', color: estado==='Editable' ? 'bg-gray-700' : 'bg-sky-700' },
        { id: 3, title: 'armado', icon: 'build', color: estado==='Editable' ? 'bg-gray-700' : 'bg-amber-500' },
        { id: 4, title: 'alistado', icon: 'check-circle', color: estado==='Editable' ? 'bg-gray-700' : 'bg-green-600' },
    ];

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
        >
            <View className="flex-1 p-4 bg-gray-100">
                <TextInput
                    label={"Codigo de orden"}
                    mode="outlined"
                    placeholder="Ingresa el código"
                    value={codigoOrden}
                    onChangeText={setCodigoOrden}
                    right={<TextInput.Icon icon="magnify" onPress={verificarProceso}/>}
                />
                { estado === "Editable" &&
                        <TouchableOpacity
                            onPress={iniciarProceso}
                            activeOpacity={0.8}
                            className={`h-[15%]  justify-center items-center rounded-2xl ${estado === "Editable" ? "bg-blue-500" : "bg-gray-700"} mt-4`}
                            disabled={estado === "Editable" ? false : true}
                        >
                            <Icon1 name="play-circle" size={40} color="#FFF" />
                            <Text className="mt-2 text-white text-lg font-bold">Iniciar proceso</Text>
                        </TouchableOpacity>
                }
                { estado === "Proceso" &&
                    (
                        <View className=' mt-4 gap-2 ' >
                            <View className='gap-4'>
                                {options.filter((option) => option.title === areaTrabajo).map((option) => (
                                    <TouchableOpacity
                                        key={option.id}
                                        onPress={() => handleOptionPress(option)}
                                        activeOpacity={0.8}
                                        disabled={estado === "Editable"}
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
                            {
                                showEmpleadosAsignados ===true? (
                                    <View className='gap-1 mt-2'>
                                    <View className=' p-2 bg-white border-b border-gray-300 items-center'>
                                        <Text  className='text-lg font-bold text-black '>Empleados Asignados</Text>
                                    </View>
                                    <View className="bg-white p-4 rounded-lg w-[100%]">
                                        <FlatList 
                                            data={empleadosAsignados}
                                            keyExtractor={(item) => item.Empleado_idEmpleado}
                                            renderItem={({ item }) => (
                                                <Card style={{ marginBottom: 10, borderRadius: 10, elevation: 5 }}>
                                                    <View className='flex-row p-2'>
                                                        <Card.Content>
                                                            <View className='gap-1'>
                                                                <Text variant="titleMedium">Nombres: {item.Nombres}</Text>
                                                                <Text variant="titleMedium">DNI: {item.DNI}</Text>
                                                            </View>
                                                        </Card.Content>
                                                    </View>
                                                    
                                                </Card>
                                                
                                            )}
                                        />
                                        
                                    </View>
                                </View>
                                )
                                :
                                (
                                    empleados.length > 0 ?(
                                        <View className='gap-1 mt-2'>
                                            <View className=' p-2 bg-white border-b border-gray-300 items-center'>
                                                <Text  className='text-lg font-bold text-black '>Empleados Asignados</Text>
                                            </View>
                                            <View className="bg-white p-4 rounded-lg w-[100%]">
                                                <FlatList 
                                                    data={empleados}
                                                    keyExtractor={(item) => item.idEmpleado}
                                                    renderItem={({ item }) => (
                                                        <Card style={{ marginBottom: 10, borderRadius: 10, elevation: 5 }}>
                                                            <View className='flex-row p-2'>
                                                                <Card.Content>
                                                                    <View className='gap-1'>
                                                                        <Text variant="titleMedium">Nombres: {item.Nombres}</Text>
                                                                        <Text variant="titleMedium">DNI: {item.Dni}</Text>
                                                                    </View>
                                                                </Card.Content>
                                                            </View>
                                                            
                                                        </Card>
                                                        
                                                    )}
                                                />
                                                
                                            </View>
                                            <View className='flex-row gap-4 justify-center'>
                                                <Pressable onPress={() => {
                                                    setShowModal(!showModal);
                                                    }
                                                }>
                                                    <View className='flex-row justify-center items-center gap-2 mt-2 bg-[#15a1ff] rounded-xl p-2 mx-auto'>
                                                        <Text className='text-xl font-bold text-white '>Agregar</Text>
                                                        <Icon1 name="plus" size={20} color="#fff" />
                                                    </View>
                                                </Pressable>
                                                
                                                <Pressable onPress={asignarEmpleados}>
                                                    <View className='flex-row justify-center items-center gap-2 mt-2 bg-[#13bf1e] px-6 rounded-xl p-2 mx-auto'>
                                                        <Text className='text-xl font-bold text-white '>Asignar</Text>
                                                    </View>
                                                </Pressable>
                                                    
                                            </View>
                                        </View>
                                    )
                                    :
                                    (
                                        <Pressable onPress={() => setShowModal(!showModal)} className='rounded-xl p-3 bg-gray-700 mt-3'>
                                            <Text className='text-white mx-auto text-lg font-semibold'>Asignar Empleados</Text>
                                        </Pressable>
                                    )
                                )
                            }
                            
                        </View>
                        
                    )
                }
                    <Modal
                        visible={showModal}
                        onRequestClose={() => setShowModal(!showModal)}
                        animationType="fade"
                        transparent={true}
                    >
                        <SafeAreaView className="flex-1 justify-center items-center bg-gray-900/50 ">
                            <View className="bg-white p-4 rounded-lg w-[90%] ">
                                <FlatList 
                                    data={dataEmpleados}
                                    keyExtractor={(item) => item.idEmpleado}
                                    renderItem={({ item }) => (
                                        <Card style={{ marginBottom: 10, borderRadius: 10, elevation: 5 }}>
                                            <View className='flex-row p-2'>
                                                <Checkbox
                                                    status={checkedEmpleados[item.idEmpleado] ? 'checked' : 'unchecked'}
                                                    onPress={() => {
                                                        agregarOQuitarEmpleado(item);
                                                    }}
                                                    color='#3B82F6'
                                                />
                                                <Card.Content>
                                                    <View className='gap-1'>
                                                        <Text variant="titleMedium">Nombres: {item.Nombres}</Text>
                                                        <Text variant="titleMedium">DNI: {item.Dni}</Text>
                                                    </View>
                                                </Card.Content>
                                            </View>
                                            
                                        </Card>
                                        
                                    )}
                                />
                                <Pressable
                                    onPress={() => setShowModal(!showModal)}
                                    className="bg-blue-500 px-4 py-2 rounded-lg"
                                    >
                                    <Text className="text-white text-center">Cerrar</Text>
                                </Pressable>
                            </View>
                        </SafeAreaView>
                    </Modal>
            </View>
        </KeyboardAvoidingView>
    );
};

export default Actualizar;