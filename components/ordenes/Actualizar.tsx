import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  Modal,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Alert,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Card, Checkbox, Divider, TextInput, Icon } from 'react-native-paper';
import DetallePedidoService from '@/services/DetallePedidoService';
import DetalleAreaTrabajoService from '@/services/DetalleAreaTrabajoService';
import EmpleadoService from '@/services/EmpleadoService';
import { ThemedText } from '../ThemedText';
import { ThemedView } from '../ThemedView';
import ShowError from '../ShowError';

interface Empleado {
  idEmpleado: number;
  Dni: string;
  Nombres: string;
}

interface DetalleEmpleadoPedido {
  Empleado_idEmpleado: number;
  Nombres: string;
  DNI: string;
}

interface Pedido {
  Codigo_pedido: string;
}

interface Option {
  id: number;
  title: string;
  icon: string;
  color: string;
}
type EstadoPedido = 'Editable' | 'Proceso' | 'Finalizado' | ''; // Add any other possible states

const height = Dimensions.get('window').height;
const IndexActualizarOrden = () => {
  const route = useRouter();
  const [codigoOrden, setCodigoOrden] = useState<string>('');
  const [estado, setEstado] = useState<EstadoPedido>('');
  const [areaTrabajo, setAreaTrabajo] = useState<string>('');
  const [empleados, setEmpleados] = useState<Empleado[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [dataEmpleados, setDataEmpleados] = useState<Empleado[]>([]);
  const [checkedEmpleados, setCheckedEmpleados] = useState<Record<number, boolean>>({});
  const [empleadosAsignados, setEmpleadosAsignados] = useState<DetalleEmpleadoPedido[]>([]);
  const [showEmpleadosAsignados, setShowEmpleadosAsignados] = useState<boolean>(false);
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [filteredSuggestions, setFilteredSuggestions] = useState<Pedido[]>([]);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [showTextInputCodigoOrden, setShowTextInputCodigoOrden] = useState<boolean>(false);

  useEffect(() => {
    const obtenerPedidos = async () => {
      try {
        const pedidos = await DetallePedidoService.obtenerTodosLosPedidos();
        setPedidos(pedidos.detallesPedidos);
      } catch (error) {
        mostrarError(error as Error);
      }
    };
    obtenerPedidos();
  }, []);

  function capitalizarPrimeraLetra(palabra: string): string {
    return palabra.charAt(0).toUpperCase() + palabra.slice(1);
  }

  const handleOptionPress = async (option: Option) => {
    if (empleadosAsignados.length > 0) {
      try {
        const data = await DetallePedidoService.obtenerDetallePedido(codigoOrden);
        if (data) {
          route.push(
            '/(ADMIN)/(routes)/ordenes/(ordenesStack)/actualizar/etapa'
            // `/ordenes_produccion/actualizar/${option.title}?codigoOrden=${codigoOrden}`
          );
        }
      } catch (error) {
        ShowError(error as Error);
      }
    } else {
      alert('Asigne empleados primero');
    }
  };

  const mostrarError = (error: Error) => {
    Alert.alert(
      'Error',
      `${error.message}`,
      [{ text: 'OK' }]
    );
  };

  const iniciarProceso = async () => {
    try {
      const estado = 'Proceso';
      const dataIniciar = await DetallePedidoService.updateEstado(
        codigoOrden,
        estado
      );
      if (dataIniciar.status !== 200) {
        throw new Error('Error al iniciar el proceso');
      }
      setEstado('Proceso');
      alert(`${dataIniciar.detallePedido.detalleAreaTrabajo.message}`);
    } catch (error) {
      mostrarError(error as Error);
    }
  };

  useEffect(() => {
    const obtenerAreaTrabajo = async () => {
      if (estado === 'Proceso') {
        try {
          const codigoPedido = codigoOrden;
          const dataDetalleAreaTrabajo =
            await DetalleAreaTrabajoService.obtenerTodos(codigoPedido);
          let mayor = 0;
          for (const item of dataDetalleAreaTrabajo.detallesAreaTrabajo) {
            if (item.Area_trabajo_idArea_trabajo > mayor) {
              mayor = item.Area_trabajo_idArea_trabajo;
            }
          }
          switch (mayor) {
            case 1:
              setAreaTrabajo('corte');
              break;
            case 2:
              setAreaTrabajo('perfilado');
              break;
            case 3:
              setAreaTrabajo('armado');
              break;
            case 4:
              setAreaTrabajo('alistado');
              break;
          }
        } catch (error) {
          ShowError(error as Error);
        }
      }
    };
    obtenerAreaTrabajo();
  }, [estado]);

  const verificarProceso = async () => {
    try {
      setCheckedEmpleados({});
      setEmpleadosAsignados([]);
      setShowEmpleadosAsignados(false);
      setEmpleados([]);
      setAreaTrabajo('');
      setEstado('');
      const data = await DetallePedidoService.obtenerDetallePedido(codigoOrden);
      const codigoPedido = codigoOrden;
      setEstado(data.detallePedido.Estado);
      if (data.detallePedido.Estado === 'Proceso') {
        const dataDetalleAreaTrabajo =
          await DetalleAreaTrabajoService.obtenerTodos(codigoPedido);
        let mayor = 0;
        for (const item of dataDetalleAreaTrabajo.detallesAreaTrabajo) {
          if (item.Area_trabajo_idArea_trabajo > mayor) {
            mayor = item.Area_trabajo_idArea_trabajo;
          }
        }
        let nomArea: string;
        switch (mayor) {
          case 1:
            nomArea = 'Corte';
            setAreaTrabajo('corte');
            const dataDetalleEmpleadoPedido1 =
              await EmpleadoService.obtenerAllDetalleEmpleadoPedido(
                nomArea,
                codigoPedido
              );
            if (dataDetalleEmpleadoPedido1.detalleEmpleadoPedido.length === 0) {
              alert('No hay empleados asignados a esta área de trabajo');
            } else {
              setEmpleadosAsignados(
                dataDetalleEmpleadoPedido1.detalleEmpleadoPedido
              );
              setShowEmpleadosAsignados(true);
            }
            break;
          case 2:
            nomArea = 'Perfilado';
            setAreaTrabajo('perfilado');
            const dataDetalleEmpleadoPedido2 =
              await EmpleadoService.obtenerAllDetalleEmpleadoPedido(
                nomArea,
                codigoPedido
              );
            if (dataDetalleEmpleadoPedido2.detalleEmpleadoPedido.length === 0) {
              alert('No hay empleados asignados a esta área de trabajo');
            } else {
              setEmpleadosAsignados(
                dataDetalleEmpleadoPedido2.detalleEmpleadoPedido
              );
              setShowEmpleadosAsignados(true);
            }
            break;
          case 3:
            nomArea = 'Armado';
            setAreaTrabajo('armado');
            const dataDetalleEmpleadoPedido3 =
              await EmpleadoService.obtenerAllDetalleEmpleadoPedido(
                nomArea,
                codigoPedido
              );
            if (dataDetalleEmpleadoPedido3.detalleEmpleadoPedido.length === 0) {
              alert('No hay empleados asignados a esta área de trabajo');
            } else {
              setEmpleadosAsignados(
                dataDetalleEmpleadoPedido3.detalleEmpleadoPedido
              );
              setShowEmpleadosAsignados(true);
            }
            break;
          case 4:
            nomArea = 'Alistado';
            setAreaTrabajo('alistado');
            const dataDetalleEmpleadoPedido4 =
              await EmpleadoService.obtenerAllDetalleEmpleadoPedido(
                nomArea,
                codigoPedido
              );
            if (dataDetalleEmpleadoPedido4.detalleEmpleadoPedido.length === 0) {
              alert('No hay empleados asignados a esta área de trabajo');
            } else {
              setEmpleadosAsignados(
                dataDetalleEmpleadoPedido4.detalleEmpleadoPedido
              );
              setShowEmpleadosAsignados(true);
            }
            break;
        }
      }
    } catch (error) {
      mostrarError(error as Error);
    }
  };

  useEffect(() => {
    const obtenerEmpleadosPorArea = async () => {
      setDataEmpleados([]);
      if (showModal) {
        try {
          const nomArea = capitalizarPrimeraLetra(areaTrabajo);
          const dataEmpleados = await EmpleadoService.obtenerEmpleadosPorArea(nomArea);
          if (dataEmpleados.status !== 200) {
            throw new Error('Error al obtener empleados');
          }
          setDataEmpleados(dataEmpleados.empleados);
        } catch (error) {
          alert('Error al obtener empleados');
        }
      }
    };
    obtenerEmpleadosPorArea();
  }, [showModal]);
  const agregarOQuitarEmpleado = (item: Empleado) => {
    setCheckedEmpleados(prev => ({
      ...prev,
      [item.idEmpleado]: !prev[item.idEmpleado]
    }));

    if (empleados.some(e => e.idEmpleado === item.idEmpleado)) {
      setEmpleados(empleados.filter(e => e.idEmpleado !== item.idEmpleado));
    } else {
      setEmpleados([...empleados, item]);
    }
  };

  const asignarEmpleados = async () => {
    try {
      const codigoPedido = codigoOrden;
      for (const empleado of empleados) {
        const dni = empleado.Dni;
        const dataAsignar = await EmpleadoService.crearDetalleEmpleadoPedido(
          dni,
          codigoPedido
        );
        if (dataAsignar.status !== 201) {
          throw new Error('Error al asignar empleados');
        }
      }
      alert('Empleados asignados exitosamente');
      setEmpleados([]);
      verificarProceso();
    } catch (error) {
      mostrarError(error as Error);
    }
  };

  const handleSearch = (text: string) => {
    setCodigoOrden(text);
    if (text.length > 0) {
      const filteredPedidos = pedidos.filter(pedido =>
        pedido.Codigo_pedido.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredSuggestions(filteredPedidos);
      setShowSuggestions(true);
    } else {
      setFilteredSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const options: Option[] = [
    {
      id: 1,
      title: 'corte',
      icon: 'content-cut',
      color: estado === 'Editable' ? 'bg-gray-700' : 'bg-red-500',
    },
    {
      id: 2,
      title: 'perfilado',
      icon: 'brush',
      color: estado === 'Editable' ? 'bg-gray-700' : 'bg-sky-700',
    },
    {
      id: 3,
      title: 'armado',
      icon: 'build',
      color: estado === 'Editable' ? 'bg-gray-700' : 'bg-amber-500',
    },
    {
      id: 4,
      title: 'alistado',
      icon: 'check-circle',
      color: estado === 'Editable' ? 'bg-gray-700' : 'bg-green-600',
    },
  ];

  const renderEmpleadosSection = () => {
    if (showEmpleadosAsignados) {
      return (
        <ThemedView className='gap-1 mt-2'>
          <ThemedView className='p-2 bg-white border-b border-gray-300 items-center'>
            <Text className='text-lg font-bold text-black'>
              Empleados Asignados
            </Text>
          </ThemedView>
          <View>
            <FlatList
              data={empleadosAsignados}
              keyExtractor={item => item.Empleado_idEmpleado.toString()}
              renderItem={({ item }) => (
                <View style={{
                  marginBottom: 10,
                  borderRadius: 10,
                  backgroundColor: '#fff',
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 4,
                  elevation: 5, // Para Android
                }}>
                  <View style={{
                    flexDirection: 'row',
                    padding: 8,
                    alignItems: 'center'
                  }}>
                    <View style={{ padding: 16 }}>
                      <View style={{ gap: 4 }}>
                        <Text style={{
                          fontSize: 16,
                          fontWeight: '600',
                          color: '#1a1a1a'
                        }}>
                          Nombres: {item.Nombres}
                        </Text>
                        <Text style={{
                          fontSize: 16,
                          color: '#4d4d4d'
                        }}>
                          DNI: {item.DNI}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              )}
            />
          </View>
        </ThemedView>
      );
    }

    if (empleados.length > 0) {
      return (
        <ThemedView className='gap-1 mt-2'>
          <View className='p-2 bg-white border-b border-gray-300 items-center'>
            <Text className='text-lg font-bold text-black'>
              Empleados Asignados
            </Text>
          </View>
          <View className='bg-white p-4 rounded-lg w-[100%]'>
            <FlatList
              data={empleados}
              keyExtractor={item => item.idEmpleado.toString()}
              renderItem={({ item }) => (
                <View style={{
                  marginBottom: 10,
                  borderRadius: 10,
                  backgroundColor: 'white',
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 4,
                  elevation: 3, // Para Android
                }}>
                  <View style={{
                    flexDirection: 'row',
                    padding: 12,
                    alignItems: 'center'
                  }}>
                    <View style={{ flex: 1 }}>
                      <View style={{ gap: 6 }}>
                        <Text style={{
                          fontSize: 16,
                          fontWeight: '600',
                          color: '#333'
                        }}>
                          Nombres: {item.Nombres}
                        </Text>
                        <Text style={{
                          fontSize: 14,
                          color: '#666'
                        }}>
                          DNI: {item.Dni}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              )}
            />
          </View>
          <View className='flex-row gap-4 justify-center'>
            <Pressable onPress={() => setShowModal(!showModal)}>
              <View className='flex-row justify-center items-center gap-2 mt-2 bg-[#15a1ff] rounded-xl p-2 mx-auto'>
                <ThemedText className='text-xl font-bold'>Agregar</ThemedText>
                <Icon source='plus' size={20} color='#fff' />
              </View>
            </Pressable>
            <Pressable onPress={asignarEmpleados}>
              <View className='flex-row justify-center items-center gap-2 mt-2 bg-[#13bf1e] px-6 rounded-xl p-2 mx-auto'>
                <ThemedText className='text-xl font-bold '>Asignar</ThemedText>
              </View>
            </Pressable>
          </View>
        </ThemedView>
      );
    }

    return (
      <Pressable
        onPress={() => setShowModal(!showModal)}
        className='rounded-xl p-3 bg-gray-700 mt-3'
      >
        <Text className='text-white mx-auto text-lg font-semibold'>
          Asignar Empleados
        </Text>
      </Pressable>
    );
  };

  return (
    <KeyboardAvoidingView
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    style={{ flex: 1, padding:8 }}
    keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
        <View style={{ height: height }}>
            <ThemedView className='relative mb-4'>
                <TextInput
                    label={'Codigo de orden'}
                    mode='outlined'
                    placeholder='Ingresa el código'
                    value={codigoOrden}
                    onChangeText={handleSearch}
                    onPressIn={() => {
                      setShowTextInputCodigoOrden(false);
                    }}
                    disabled={showTextInputCodigoOrden}
                    onFocus={() => {
                      if (codigoOrden.length > 0) {
                          setShowSuggestions(true);
                      }
                      }}
                    onBlur={() => {
                      
                    }}
                    right={
                    <TextInput.Icon
                        icon='magnify'
                        onPressIn={() => {
                        verificarProceso();
                        setShowTextInputCodigoOrden(true);
                        }}
                    />
                    }
                />
                {showSuggestions && filteredSuggestions.length > 0 && (
                    <View className='absolute z-10 top-16 w-full bg-white rounded-lg shadow-md max-h-80 right-0 left-0'>
                      <FlatList
                        data={filteredSuggestions}
                        keyExtractor={item => item.Codigo_pedido}
                        renderItem={({ item }) => (
                          <TouchableOpacity
                              onPress={() => {
                              setCodigoOrden(item.Codigo_pedido);
                              setShowSuggestions(false);
                              }}
                          >
                            <View style={{
                              padding: 8,
                              borderRadius: 6,
                              marginVertical: 4
                            }}>
                              <Text style={{
                                fontSize: 14,
                                fontWeight: '500',
                                color: '#333'
                              }}>
                                {item.Codigo_pedido}
                              </Text>
                            </View>
                            <Divider/>
                          </TouchableOpacity>
                        )}
                      />
                    </View>
                )}
                <Pressable
                    onPress={() => setShowSuggestions(false)}
                    className={
                    !showSuggestions
                        ? 'opacity-0 h-0'
                        : 'absolute inset-0 z-5 bg-transparent'
                    }
                />
            </ThemedView>
            {estado === 'Editable' && (
              <TouchableOpacity
                  onPress={iniciarProceso}
                  activeOpacity={0.8}
                  className={`h-[10%] justify-center items-center rounded-2xl ${estado === 'Editable' ? 'bg-blue-500' : 'bg-gray-700'} mt-4`}
                  disabled={estado !== 'Editable'}
              >
                  <Icon source='play-circle' size={40} color='#FFF' />
                  <Text className='mt-2 text-white text-lg font-bold'>
                  Iniciar proceso
                  </Text>
              </TouchableOpacity>
            )}
            {estado === 'Proceso' && (
                <ThemedView className='mt-4 gap-2'>
                    <View className='gap-4'>
                    {options
                        .filter(option => option.title === areaTrabajo)
                        .map(option => (
                        <TouchableOpacity
                            key={option.id}
                            onPress={() => handleOptionPress(option)}
                            activeOpacity={0.8}
                            disabled={estado!== 'Proceso'}
                        >
                            <View
                            className={`justify-center items-center rounded-2xl p-2 ${option.color}`}
                            >
                            <Icon source={option.icon} size={40} color='#FFF' />
                            <Text className='mt-2 text-white text-lg font-bold'>
                                {option.title}
                            </Text>
                            </View>
                        </TouchableOpacity>
                        ))}
                    </View>
                    {renderEmpleadosSection()}
                </ThemedView>
            )}
            <Modal
              visible={showModal}
              onRequestClose={() => setShowModal(!showModal)}
              animationType='fade'
              transparent={true}
            >
              <View style={{ 
                flex: 1,
                backgroundColor: 'rgba(0,0,0,0.5)', // Fondo semitransparente
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <SafeAreaView style={{ width: '90%', maxHeight: '80%' }}>
                  <View style={{ 
                    backgroundColor: 'white',
                    borderRadius: 10,
                    padding: 16,
                    maxHeight: '100%'
                  }}>
                    <FlatList
                      data={dataEmpleados}
                      keyExtractor={item => item.idEmpleado.toString()}
                      renderItem={({ item }) => (
                        <View style={{
                          marginBottom: 10,
                          borderRadius: 10,
                          backgroundColor: 'white',
                          shadowColor: '#000',
                          shadowOffset: { width: 0, height: 2 },
                          shadowOpacity: 0.1,
                          shadowRadius: 4,
                          elevation: 5,
                          padding: 12
                        }}>
                          {/* Checkbox y contenido del empleado */}
                          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <TouchableOpacity onPress={() => agregarOQuitarEmpleado(item)}>
                              <View style={{
                                width: 24,
                                height: 24,
                                borderRadius: 12,
                                borderWidth: 2,
                                borderColor: '#3B82F6',
                                backgroundColor: checkedEmpleados[item.idEmpleado] ? '#3B82F6' : 'transparent',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginRight: 12
                              }}>
                                {checkedEmpleados[item.idEmpleado] && (
                                  <Text style={{ color: 'white' }}>✓</Text>
                                )}
                              </View>
                            </TouchableOpacity>
                            
                            <View>
                              <Text style={{ fontSize: 16, fontWeight: '600' }}>
                                {item.Nombres}
                              </Text>
                              <Text style={{ color: '#666' }}>DNI: {item.Dni}</Text>
                            </View>
                          </View>
                        </View>
                      )}
                      ListEmptyComponent={
                        <Text style={{ textAlign: 'center', padding: 20 }}>
                          No hay empleados disponibles
                        </Text>
                      }
                    />
                    
                    <Pressable
                      onPress={() => setShowModal(false)}
                      style={{
                        backgroundColor: '#3B82F6',
                        padding: 12,
                        borderRadius: 8,
                        marginTop: 10
                      }}
                    >
                      <Text style={{ color: 'white', textAlign: 'center' }}>Cerrar</Text>
                    </Pressable>
                  </View>
                </SafeAreaView>
              </View>
            </Modal>
        </View>
    </KeyboardAvoidingView>
  );
};

export default IndexActualizarOrden;