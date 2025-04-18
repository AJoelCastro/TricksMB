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
} from 'react-native';
import { useRouter } from 'expo-router';
import { Card, Checkbox, Divider, TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon1 from 'react-native-vector-icons/FontAwesome';
import DetallePedidoService from '@/services/DetallePedidoService';
import DetalleAreaTrabajoService from '@/services/DetalleAreaTrabajoService';
import EmpleadoService from '@/services/EmpleadoService';

const Actualizar = () => {
  const route = useRouter();
  const [codigoOrden, setCodigoOrden] = useState('');
  const [estado, setEstado] = useState('');
  const [areaTrabajo, setAreaTrabajo] = useState('');
  const [empleados, setEmpleados] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [dataEmpleados, setDataEmpleados] = useState([]);
  const [checkedEmpleados, setCheckedEmpleados] = useState({});
  const [empleadosAsignados, setEmpleadosAsignados] = useState([]);
  const [showEmpleadosAsignados, setShowEmpleadosAsignados] = useState(false);
  const [pedidos, setPedidos] = useState([]);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showTextInputCodigoOrden, setShowTextInputCodigoOrden] =
    useState(false);

  useEffect(() => {
    const obtenerPedidos = async () => {
      try {
        const pedidos = await DetallePedidoService.obtenerTodosLosPedidos();
        setPedidos(pedidos.detallesPedidos);
      } catch (error) {
        mostrarError(error);
      }
    };
    obtenerPedidos();
  }, []);

  function capitalizarPrimeraLetra(palabra) {
    return palabra.charAt(0).toUpperCase() + palabra.slice(1);
  }
  const handleOptionPress = async option => {
    // Lógica para manejar la selección de la opción de asignar empleados sino no puede ser redirigido a la pestaña
    if (empleadosAsignados.length > 0) {
      try {
        const data =
          await DetallePedidoService.obtenerDetallePedido(codigoOrden);
        if (data) {
          route.push(
            `/ordenes_produccion/actualizar/${option.title}?codigoOrden=${codigoOrden}`
          );
        }
      } catch (error) {
        error('Error al obtener el pedido', error);
      }
    } else {
      alert('Asigne empleados primero');
    }
  };

  const mostrarError = error => {
    Alert.alert(
      'Error',
      `${error.message}`,
      [{ text: 'OK' }] // Botón requerido
    );
  };

  const iniciarProceso = async () => {
    try {
      let estado = 'Proceso';
      const dataIniciar = await DetallePedidoService.updateEstado(
        codigoOrden,
        estado
      );
      console.log('dataIniciar', dataIniciar);
      if (dataIniciar.status !== 200) {
        throw new Error('Error al iniciar el proceso');
      }
      setEstado('Proceso'); // Actualiza el estado después de que se complete la operación
      alert(`${dataIniciar.detallePedido.detalleAreaTrabajo.message}`);
    } catch (error) {
      mostrarError(error);
    }
  };

  useEffect(() => {
    const obtenerAreaTrabajo = async () => {
      if (estado === 'Proceso') {
        try {
          let codigoPedido = codigoOrden;
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
          console.error('Error al obtener el area de trabajo.');
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
      console.log('codigoOrden', codigoOrden);
      setShowSuggestions(false);
      const data = await DetallePedidoService.obtenerDetallePedido(codigoOrden);
      let codigoPedido = codigoOrden;
      setEstado(data.detallePedido.Estado);
      if (data.detallePedido.Estado === 'Proceso') {
        const dataDetalleAreaTrabajo =
          await DetalleAreaTrabajoService.obtenerTodos(codigoPedido);
        console.log('dataDetalleAreaTrabajo', dataDetalleAreaTrabajo);
        let mayor = 0;
        for (const item of dataDetalleAreaTrabajo.detallesAreaTrabajo) {
          if (item.Area_trabajo_idArea_trabajo > mayor) {
            mayor = item.Area_trabajo_idArea_trabajo;
          }
        }
        let nomArea;
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
      mostrarError(error);
    }
  };
  useEffect(() => {
    const obtenerEmpleadosPorArea = async () => {
      setDataEmpleados([]);
      if (showModal === true) {
        try {
          let nomArea = capitalizarPrimeraLetra(areaTrabajo);
          const dataEmpleados =
            await EmpleadoService.obtenerEmpleadosPorArea(nomArea);
          if (dataEmpleados.status !== 200) {
            throw new Error('Error al obtener empleados');
          }
          setDataEmpleados(dataEmpleados.empleados);
        } catch (error) {
          alert('Error al obtener empleados', error);
        }
      }
    };
    obtenerEmpleadosPorArea();
  }, [showModal]);

  const agregarOQuitarEmpleado = item => {
    setCheckedEmpleados(prev => {
      const newChecked = { ...prev, [item.idEmpleado]: !prev[item.idEmpleado] };
      return newChecked;
    });

    if (
      Array.isArray(empleados) &&
      empleados.some(e => e.idEmpleado === item.idEmpleado)
    ) {
      // Si el empleado ya está en la lista, lo quitamos
      setEmpleados(empleados.filter(e => e.idEmpleado !== item.idEmpleado));
    } else {
      // Si el empleado no está en la lista, lo agregamos
      setEmpleados([...empleados, item]);
    }
  };

  const asignarEmpleados = async () => {
    try {
      let codigoPedido = codigoOrden;
      for (const empleado of empleados) {
        let dni = empleado.Dni;
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
      mostrarError(error);
    }
  };

  const handleSearch = text => {
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

  const options = [
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
        <View className='gap-1 mt-2'>
          <View className=' p-2 bg-white border-b border-gray-300 items-center'>
            <Text className='text-lg font-bold text-black'>
              Empleados Asignados
            </Text>
          </View>
          <View className='bg-white p-4 rounded-lg w-[100%]'>
            <FlatList
              data={empleadosAsignados}
              keyExtractor={item => item.Empleado_idEmpleado}
              renderItem={({ item }) => (
                <Card
                  style={{ marginBottom: 10, borderRadius: 10, elevation: 5 }}
                >
                  <View className='flex-row p-2'>
                    <Card.Content>
                      <View className='gap-1'>
                        <Text variant='titleMedium'>
                          Nombres: {item.Nombres}
                        </Text>
                        <Text variant='titleMedium'>DNI: {item.DNI}</Text>
                      </View>
                    </Card.Content>
                  </View>
                </Card>
              )}
            />
          </View>
        </View>
      );
    }

    if (empleados.length > 0) {
      return (
        <View className='gap-1 mt-2'>
          <View className=' p-2 bg-white border-b border-gray-300 items-center'>
            <Text className='text-lg font-bold text-black'>
              Empleados Asignados
            </Text>
          </View>
          <View className='bg-white p-4 rounded-lg w-[100%]'>
            <FlatList
              data={empleados}
              keyExtractor={item => item.idEmpleado}
              renderItem={({ item }) => (
                <Card
                  style={{ marginBottom: 10, borderRadius: 10, elevation: 5 }}
                >
                  <View className='flex-row p-2'>
                    <Card.Content>
                      <View className='gap-1'>
                        <Text variant='titleMedium'>
                          Nombres: {item.Nombres}
                        </Text>
                        <Text variant='titleMedium'>DNI: {item.Dni}</Text>
                      </View>
                    </Card.Content>
                  </View>
                </Card>
              )}
            />
          </View>
          <View className='flex-row gap-4 justify-center'>
            <Pressable onPress={() => setShowModal(!showModal)}>
              <View className='flex-row justify-center items-center gap-2 mt-2 bg-[#15a1ff] rounded-xl p-2 mx-auto'>
                <Text className='text-xl font-bold text-white'>Agregar</Text>
                <Icon1 name='plus' size={20} color='#fff' />
              </View>
            </Pressable>
            <Pressable onPress={asignarEmpleados}>
              <View className='flex-row justify-center items-center gap-2 mt-2 bg-[#13bf1e] px-6 rounded-xl p-2 mx-auto'>
                <Text className='text-xl font-bold text-white'>Asignar</Text>
              </View>
            </Pressable>
          </View>
        </View>
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
      style={{ flex: 1 }}
    >
      <View className='flex-1 p-4 bg-gray-100'>
        <View className='relative mb-4'>
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
              // Al tocar fuera
              setTimeout(() => setShowSuggestions(false), 1200);
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
                    <Card.Content className='p-2'>
                      <Text>{item.Codigo_pedido}</Text>
                    </Card.Content>
                    <Divider></Divider>
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
        </View>
        {estado === 'Editable' && (
          <TouchableOpacity
            onPress={iniciarProceso}
            activeOpacity={0.8}
            className={`h-[15%]  justify-center items-center rounded-2xl ${estado === 'Editable' ? 'bg-blue-500' : 'bg-gray-700'} mt-4`}
            disabled={estado === 'Editable' ? false : true}
          >
            <Icon1 name='play-circle' size={40} color='#FFF' />
            <Text className='mt-2 text-white text-lg font-bold'>
              Iniciar proceso
            </Text>
          </TouchableOpacity>
        )}
        {estado === 'Proceso' && (
          <View className='mt-4 gap-2'>
            <View className='gap-4'>
              {options
                .filter(option => option.title === areaTrabajo)
                .map(option => (
                  <TouchableOpacity
                    key={option.id}
                    onPress={() => handleOptionPress(option)}
                    activeOpacity={0.8}
                    disabled={estado === 'Editable'}
                  >
                    <View
                      className={`justify-center items-center rounded-2xl p-2 ${option.color}`}
                    >
                      <Icon name={option.icon} size={40} color='#FFF' />
                      <Text className='mt-2 text-white text-lg font-bold'>
                        {option.title}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
            </View>
            {renderEmpleadosSection()}
          </View>
        )}
        <Modal
          visible={showModal}
          onRequestClose={() => setShowModal(!showModal)}
          animationType='fade'
          transparent={true}
        >
          <SafeAreaView className='flex-1 justify-center items-center bg-gray-900/50 '>
            <View className='bg-white p-4 rounded-lg w-[90%] '>
              <FlatList
                data={dataEmpleados}
                keyExtractor={item => item.idEmpleado}
                renderItem={({ item }) => (
                  <Card
                    style={{ marginBottom: 10, borderRadius: 10, elevation: 5 }}
                  >
                    <View className='flex-row p-2'>
                      <View className='bg-white rounded-full'>
                        <Checkbox
                          status={
                            checkedEmpleados[item.idEmpleado]
                              ? 'checked'
                              : 'unchecked'
                          }
                          onPress={() => {
                            agregarOQuitarEmpleado(item);
                          }}
                          color='#3B82F6'
                        />
                      </View>
                      <Card.Content>
                        <View className='gap-1'>
                          <Text variant='titleMedium'>
                            Nombres: {item.Nombres}
                          </Text>
                          <Text variant='titleMedium'>DNI: {item.Dni}</Text>
                        </View>
                      </Card.Content>
                    </View>
                  </Card>
                )}
              />
              <Pressable
                onPress={() => setShowModal(!showModal)}
                className='bg-blue-500 px-4 py-2 rounded-lg'
              >
                <Text className='text-white text-center'>Cerrar</Text>
              </Pressable>
            </View>
          </SafeAreaView>
        </Modal>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Actualizar;
