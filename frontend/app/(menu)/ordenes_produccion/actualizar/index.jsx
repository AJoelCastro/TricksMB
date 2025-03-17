import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import {Checkbox, TextInput} from 'react-native-paper';
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
    const [empleados, setEmpleados] = useState("");
    const [showModal, setShowModal] = useState(false);
    const data = [
        { id: 1, label: 'Opción 1', selected: false },
        { id: 2, label: 'Opción 2', selected: false },
        { id: 3, label: 'Opción 3', selected: false },
        { id: 4, label: 'Opción 4', selected: false }
    ];
    const handleOptionPress = async (option) => {
        try {
            const data = await DetallePedidoService.obtenerDetallePedido(codigoOrden);
            if (data) {
                route.push(`/ordenes_produccion/actualizar/${option.title}?codigoOrden=${codigoOrden}`);
            }
        } catch (error) {
            error("Error al obtener el pedido", error);
        }
    };
    const iniciarProceso = async () => {
        try {
            let estado = "Proceso"
            const data = await DetallePedidoService.updateEstado(codigoOrden, estado);
            setEstado("Proceso");
            if (!data) {
                console.error('Error al obtener el pedido, verifique que el código sea correcto.');
            }
        } catch (error) {
            alert("Error al iniciar el proceso", error);
        }
    }
    const verificarProceso = async () => {
        try {
            setEmpleados("");
            setAreaTrabajo("");
            setEstado("");
            const data = await DetallePedidoService.obtenerDetallePedido(codigoOrden);
            console.log("data", data);
            let codigoPedido = codigoOrden
            setEstado(data.Estado);
            if (data.Estado === "Proceso") {
                const dataDetalleAreaTrabajo = await DetalleAreaTrabajoService.obtenerTodos(codigoPedido);
                let nomArea;
                switch (dataDetalleAreaTrabajo[0].Area_trabajo_idArea_trabajo) {
                    case 1:
                        nomArea = "corte";
                        console.log(nomArea);
                        setAreaTrabajo("corte");
                        const dataDetalleEmpleadoPedido1 = await EmpleadoService.obtenerAllDetalleEmpleadoPedido(nomArea, codigoPedido);
                        if (!dataDetalleEmpleadoPedido1) {
                            return;
                        }
                        if(dataDetalleEmpleadoPedido1.detalleEmpleadoPedido.length === 0){
                            alert("No hay empleados asignados a esta área de trabajo");
                        }else{
                            setEmpleados(dataDetalleEmpleadoPedido1.detalleEmpleadoPedido);
                        }
                        console.log("Empleados",dataDetalleEmpleadoPedido1);
                        break;
                    case 2:
                        nomArea = "perfilado";
                        console.log(nomArea);
                        setAreaTrabajo("perfilado");
                        const dataDetalleEmpleadoPedido2 = await EmpleadoService.obtenerAllDetalleEmpleadoPedido(nomArea, codigoPedido);
                        console.log("Empleados",dataDetalleEmpleadoPedido2);
                        break;
                    case 3:
                        nomArea = "armado";
                        setAreaTrabajo("armado");
                        console.log(nomArea);
                        const dataDetalleEmpleadoPedido3 = await EmpleadoService.obtenerAllDetalleEmpleadoPedido(nomArea, codigoPedido);
                        console.log("Empleados",dataDetalleEmpleadoPedido3);
                        break;
                    case 4:
                        nomArea = "alistado";
                        setAreaTrabajo("alistado");
                        console.log(nomArea);
                        const dataDetalleEmpleadoPedido4 = await EmpleadoService.obtenerAllDetalleEmpleadoPedido(nomArea, codigoPedido);
                        console.log("Empleados",dataDetalleEmpleadoPedido4);
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
                        {empleados !== "" ?(
                            <View className='gap-4'>
                                <Text className='text-lg font-bold text-black'>Empleados asignados:</Text>
                                <View className='gap-2'>
                                    {empleados.map((empleado) => (
                                        <View key={empleado.idEmpleado} className='flex-row items-center'>
                                            <Icon name="account" size={20} color="black" />
                                            <Text className='text-black'>{empleado.empleado}</Text>
                                        </View>
                                    ))}
                                </View>
                            </View>
                        )
                        :
                        (
                            <Pressable onPress={setShowModal(!showModal)}  className='rounded-xl p-3 bg-gray-700 mt-3'>
                                <Text className='text-white mx-auto text-lg font-semibold'>No hay empleados asignados</Text>
                            </Pressable>
                        )}
                    </View>
                    
                )
            }
        </View>
    );
};

export default Actualizar;