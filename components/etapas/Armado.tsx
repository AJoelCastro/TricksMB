import React, { useEffect, useState } from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Alert,
  Platform,
  KeyboardAvoidingView,
  SafeAreaView,
  Pressable,
} from 'react-native';
import { Button, Card, Icon, TextInput } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useRouter, useLocalSearchParams } from 'expo-router';

import ClienteService from '@/services/ClienteService';
import ModeloService from '@/services/ModeloService';
import DetallePedidoService from '@/services/DetallePedidoService';
import TipoCalzadoService from '@/services/TipoCalzadoService';
import CaracteristicasService from '@/services/CaracteristicasService';
import PedidoService from '@/services/PedidoService';
import DetalleAreaTrabajoService from '@/services/DetalleAreaTrabajoService';
import EmpleadoService from '@/services/EmpleadoService';
import { Image } from 'expo-image';
import { Colors } from '@/constants/Colors';
import { ThemedText } from '../ThemedText';
import CajaService from '@/services/CajaService';

// Type definitions
type Cliente = {
  nombre: string;
  Dni?: string;
  Ruc?: string;
  Tipo_cliente?: string;
};

type Modelo = {
  modelo?: {
    Nombre: string;
    idModelo: string;
  };
  imagenes?: string[];
  status?: number;
};

type Fila = {
  id: string;
  talla: string;
  pares: string;
  color: string;
};

type DetalleAreaTrabajo = {
  id: string;
  avance: string;
  comentario: string;
  terminado: string;
};

type Empleado = {
  Nombres: string;
  DNI: string;
};

type Imagen = {
    Url: string;
    // Add other image properties if they exist
  };
  
  type Caracteristica = {
    idCaracteristicas: string | number;
    Talla: string | number;
    Cantidad: string | number;
    Color: string;
    Estado?: number;
    // Add other properties if they exist
  };
  
  type DetalleAreaTrabajoItem = {
    Caracteristicas_idCaracteristicas: string | number;
    Comentario?: string;
    Cantidad_avance?: string | number;
    terminado?: string | number;
    // Add other properties if they exist
  };
  type DetalleAreaTrabajoResponse = {
    Caracteristicas_idCaracteristicas: string | number;
    Comentario?: string;
    Cantidad_avance: number;
    Estado?: number;
  };
  
  type CaracteristicaResponse = {
    idCaracteristicas: string | number;
    Talla: number;
    Cantidad: number;
    Color: string;
    Estado?: number;
  };

const EtapaArmado = () => {
  const { codigoOrden } = useLocalSearchParams<{ codigoOrden: string }>();

  const router = useRouter();
  const [cliente, setCliente] = useState<Cliente | null>(null);
  const [modelo, setModelo] = useState<Modelo | null>(null);
  const [tipoCliente, setTipoCliente] = useState<string>('');
  const [dni, setDni] = useState<string>('');
  const [ruc, setRuc] = useState<string>('');
  const [tipoCalzado, setTipoCalzado] = useState<string>('');
  const [fechaEntrega, setFechaEntrega] = useState<Date>(new Date());
  const [idDetallePedido, setIdDetallePedido] = useState<string>('');
  const [dataDetalleAreaTrabajo, setDataDetalleAreaTrabajo] = useState<DetalleAreaTrabajo[]>([]);
  const [empleados, setEmpleados] = useState<Empleado[]>([]);
  const [filas, setFilas] = useState<Fila[]>([]);
  const [currentDate, setCurrentDate] = useState<string>('');


  const lockOrientation = async () => {
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT
    );
  };

  const resetOrientation = async () => {
    await ScreenOrientation.unlockAsync();
  };

  useFocusEffect(
    React.useCallback(() => {
      lockOrientation();
      return () => {
        resetOrientation();
      };
    }, [])
  );

  const mostrarError = (error: Error) => {
    Alert.alert('Error', error.message || 'Error interno del servidor', [
      { text: 'OK' },
    ]);
  };

  const cargarClienteNatural = async () => {
    try {
      const identificador = dni;
      const cliente = await ClienteService.buscarCliente(
        tipoCliente,
        identificador
      );
      if (!cliente) {
        console.error('No se encontró el cliente');
        return;
      }
      setCliente(cliente);
    } catch (error) {
      console.error('Error cargando cliente:', error);
    }
  };

  const cargarClienteJuridico = async () => {
    try {
      const identificador = ruc;
      const cliente = await ClienteService.buscarCliente(
        tipoCliente,
        identificador
      );
      if (!cliente) {
        console.error('No se encontró el cliente');
        return;
      }
      setCliente(cliente);
    } catch (error) {
      console.error('Error cargando cliente:', error);
    }
  };

  useEffect(() => {
    if (tipoCliente === 'natural' && dni) {
      cargarClienteNatural();
    } else if (tipoCliente === 'juridico' && ruc) {
      cargarClienteJuridico();
    }
  }, [tipoCliente, dni, ruc]);

  const resetearCampos = () => {
    setCliente(null);
    setModelo(null);
    setTipoCliente('');
    setDni('');
    setRuc('');
    setTipoCalzado('');
    setFechaEntrega(new Date());
    setFilas([]);
    setDataDetalleAreaTrabajo([]);
  };

  const transformarDatos = (data: any[]): Fila[] => {
    return data.map(item => ({
      id: item.idCaracteristicas.toString(),
      talla: item.Talla.toString(),
      pares: item.Cantidad.toString(),
      color: item.Color.toString(),
    }));
  };

  const transformarDatosDetalleAreaTrabajo = (data: any[]): DetalleAreaTrabajo[] => {
    return data.map(item => ({
      id: item.Caracteristicas_idCaracteristicas.toString(),
      avance: '',
      comentario: item.Comentario || '',
      terminado: item.Cantidad_avance?.toString() || '0',
    }));
  };

  useEffect(() => {
    const cargarDetallePedido = async () => {
      try {
        const codigoPedido = codigoOrden;
        const data = await DetallePedidoService.obtenerDetallePedido(codigoPedido);
        setIdDetallePedido(data.detallePedido.idDetalle_pedido);
        const fecha = new Date(data.detallePedido.Fecha_creacion);
        setCurrentDate(fecha.toISOString().split('T')[0]);
        
        const dataTipoCalzado = await TipoCalzadoService.getTipoCalzadoByCodigoPedido(codigoPedido);
        setTipoCalzado(dataTipoCalzado.tipoCalzado.Nombre);
        
        const dataModelo = await ModeloService.getModeloByCodigoPedido(codigoPedido);
        if (dataModelo.status === 200) {
          const idModelo = dataModelo.modelo.idModelo;
          const imagen = await ModeloService.getImagenById(idModelo);
          if (imagen.status !== 200) {
            Alert.alert(
              'Error al obtener información',
              'No se encontraron las imagenes',
              [{ text: 'OK' }]
            );
            return;
          }
          const dataImagenes = {
            ...dataModelo,
            imagenes: imagen.imagen.map((img: Imagen) => img.Url),
          };
          setModelo(dataImagenes);
        }

        const dataPedido = await PedidoService.getPedidoByCodigoPedido(codigoPedido);
        setFechaEntrega(new Date(dataPedido.pedido.Fecha_entrega));
        
        const dataCliente = await ClienteService.getClienteByCodigoPedido(codigoPedido);
        setTipoCliente(dataCliente.cliente.Tipo_cliente);
        setCliente(dataCliente.cliente);
        
        const idDetallePedido = data.detallePedido.idDetalle_pedido;
        const dataCaracteristicas = await CaracteristicasService.getAllCaracteristicasById(idDetallePedido);
        const dataNueva = dataCaracteristicas.caracteristicas.filter((item: Caracteristica) => item.Estado === 1);
        const filasTransformadas = transformarDatos(dataCaracteristicas.caracteristicas);
        setFilas(filasTransformadas);
        
        const nomArea = 'Armado';
        const dataEmpleados = await EmpleadoService.obtenerAllDetalleEmpleadoPedido(nomArea, codigoPedido);
        if (!dataEmpleados) {
          return;
        }
        setEmpleados(dataEmpleados.detalleEmpleadoPedido);
      } catch (error) {
        mostrarError(error as Error);
      }
    };
    
    cargarDetallePedido();
  }, [codigoOrden]);

  const updatePedido = async () => {
    try {
      for (const fila of dataDetalleAreaTrabajo) {
        let state = null;
        const idCaracteristicas = Number(fila.id);
        const data = await CaracteristicasService.getCaracteristicaByIdCaracteristicas(idCaracteristicas);
        
        if (Number(fila.avance) + Number(fila.terminado) === Number(data.caracteristica.Cantidad)) {
          state = 1;
        } else {
          state = 0;
        }
        
        const datos = {
          cantidadAvance: Number(fila.avance) + Number(fila.terminado),
          comentario: fila.comentario,
          estado: state,
        };
        
        const editarDAT = await DetalleAreaTrabajoService.updatePedido(idCaracteristicas, datos);
        if (editarDAT.status !== 200) {
          throw new Error('Error al actualizar el pedido');
        }
      }
      obtenerEstadosDetalleAreaTrabajo();
      router.back();
    } catch (error) {
      mostrarError(error as Error);
      router.back();
    }
  };

  useEffect(() => {
    const obtenerDetalleAreaTrab = async () => {
      try {
        const codigoPedido = codigoOrden;
        const data = await DetalleAreaTrabajoService.obtenerTodos(codigoPedido);
        const dataExtra = data.detallesAreaTrabajo.map((item: DetalleAreaTrabajoItem)=> ({
          ...item,
          terminado: item.Cantidad_avance?.toString(),
        }));
        const filasTransformadas = transformarDatosDetalleAreaTrabajo(dataExtra);
        setDataDetalleAreaTrabajo(filasTransformadas);
      } catch (error) {
        mostrarError(error as Error);
      }
    };
    obtenerDetalleAreaTrab();
  }, [codigoOrden]);

  const obtenerEstadosDetalleAreaTrabajo = async () => {
    try {
      const codigoPedido = codigoOrden;
      const data = await DetalleAreaTrabajoService.obtenerTodos(codigoPedido);
      let actualizar = true;
      
      data.detallesAreaTrabajo.forEach((item: DetalleAreaTrabajoResponse) => {
        if (item.Estado === 0) {
          actualizar = false;
        }
      });
      
      if (actualizar) {
        const nomArea = 'Alistado';
        const updateAreaTrabajo = await DetalleAreaTrabajoService.createDetalleAreaTrabajo(nomArea, codigoPedido);
        // Alert.alert(`${updateAreaTrabajo.detallesAreaTrabajo.message}`); aqui ira una notificacion
      }else{
        // Alert.alert('No se actualizó el estado del pedido'); aqui ira una notificacion
      }
      
    } catch (error) {
      mostrarError(error as Error);
      router.back();
    }
  };

  return (
      <ScrollView className='mx-4 gap-2'>
        <SafeAreaView>
          {tipoCliente === 'natural' && cliente && (
            <View className='mb-2'>
              <View className='flex-row justify-between gap-4'>
                <View className='w-[65%]'>
                  <TextInput
                    value={cliente.nombre}
                    mode='outlined'
                    label={'Cliente'}
                    editable={false}
                  />
                </View>
                <View className='flex-1'>
                  <TextInput
                    value={cliente.Dni}
                    mode='outlined'
                    label={'DNI'}
                    editable={false}
                  />
                </View>
              </View>
            </View>
          )}
          
          {tipoCliente === 'juridico' && cliente && (
            <View className='mb-2'>
              <View className='flex-row justify-between gap-8'>
                <View className='w-[65%]'>
                  <TextInput
                    value={cliente.nombre}
                    mode='outlined'
                    label={'Cliente'}
                    editable={false}
                  />
                </View>
                <View className='flex-1'>
                  <TextInput
                    value={cliente.Ruc}
                    mode='outlined'
                    label={'RUC'}
                    editable={false}
                  />
                </View>
              </View>
            </View>
          )}
          
          <View className='mb-3'>
            {empleados.map((empleado, index) => (
              <View key={index} className='flex-row justify-between gap-4 mb-4'>
                <View className='w-[65%]'>
                  <TextInput
                    value={empleado.Nombres}
                    mode='outlined'
                    label={'Trabajador'}
                    editable={false}
                  />
                </View>
                <View className='flex-1'>
                  <TextInput
                    value={empleado.DNI}
                    mode='outlined'
                    label={'DNI'}
                    editable={false}
                  />
                </View>
              </View>
            ))}
          </View>
          
          <View className="gap-4 mb-4">
            <View className="flex-row justify-between items-stretch">
              {/* Contenedor de la imagen */}
              <View className="w-[45%] h-[250] rounded-xl overflow-hidden justify-center items-center" >
                <Image
                  style={{  width: '100%', height: '100%' }}
                  contentFit="contain"
                  source={{ uri: modelo?.imagenes?.[0] }}
                />
              </View>

              {/* Contenedor de formulario */}
              <View className="flex-1 gap-2 justify-center">
                <TextInput
                  mode="outlined"
                  label="Tipo de calzado"
                  value={tipoCalzado}
                  editable={false}
                />
                
                <TextInput
                  mode="outlined"
                  label="Modelo"
                  value={modelo?.modelo?.Nombre}
                  editable={false}
                />
                
                <TextInput
                  mode="outlined"
                  label="Fecha creación"
                  value={currentDate}
                  editable={false}
                  right={<TextInput.Icon icon="calendar" />}
                />
                <TextInput
                  mode="outlined"
                  label="Fecha entrega"
                  value={fechaEntrega.toISOString().split('T')[0]}
                  editable={false}
                  right={<TextInput.Icon icon="calendar" />}
                />
              </View>
            </View>
          </View>
          
          <View className='flex-row gap-3'>
            <View className='flex-1'>
              {filas.map((fila, index) => (
                <View key={fila.id} className='flex-row gap-2 mb-2'>
                  <View className='w-[24%]'>
                    <TextInput
                      label='Talla'
                      keyboardType='numeric'
                      placeholder='Talla'
                      style={{ height: 40 }}
                      mode='outlined'
                      value={fila.talla}
                      editable={false}
                    />
                  </View>
                  <View className='w-[24%]'>
                    <TextInput
                      label='Pares'
                      placeholder='Pares'
                      style={{ height: 40 }}
                      mode='outlined'
                      keyboardType='numeric'
                      value={fila.pares}
                      editable={false}
                    />
                  </View>
                  <View className='flex-1'>
                    <TextInput
                      label='Color'
                      placeholder='Color'
                      style={{ height: 40 }}
                      mode='outlined'
                      value={fila.color}
                      editable={false}
                    />
                  </View>
                </View>
              ))}
            </View>
            <View className='flex-1 mb-4'>
              {dataDetalleAreaTrabajo.map((fila, index) => (
                <View key={fila.id} className='flex-row gap-2 mb-2'>
                  <View className='w-[25%]'>
                    <TextInput
                      label={'Terminado'}
                      placeholder='Color'
                      style={{ height: 40 }}
                      mode='outlined'
                      value={fila.terminado}
                      editable={false}
                    />
                  </View>
                  <View className='w-[25%]'>
                    <TextInput
                      label={'Avance'}
                      placeholder='Avance'
                      style={{ height: 40 }}
                      mode='outlined'
                      value={fila.avance}
                      keyboardType='numeric'
                      onChangeText={text => {
                        const nuevasFilas = [...dataDetalleAreaTrabajo];
                        if (Number(text) + Number(nuevasFilas[index].terminado) > Number(filas[index]?.pares || 0)) {
                          alert('El total no puede ser mayor a la cantidad de pares');
                          nuevasFilas[index].avance = '';
                        } else {
                          nuevasFilas[index].avance = text;
                        }
                        setDataDetalleAreaTrabajo(nuevasFilas);
                      }}
                    />
                  </View>
                  <View className='flex-1'>
                    <TextInput
                      label={'Comentario'}
                      placeholder='Comentario'
                      style={{ height: 40 }}
                      mode='outlined'
                      value={fila.comentario}
                      onChangeText={text => {
                        const nuevasFilas = [...dataDetalleAreaTrabajo];
                        nuevasFilas[index].comentario = text;
                        setDataDetalleAreaTrabajo(nuevasFilas);
                      }}
                    />
                  </View>
                </View>
              ))}
            </View>
          </View>
          
          <Pressable
            onPress={updatePedido}
            className='flex-row gap-2 items-center justify-center rounded-lg py-2'
            style={{ backgroundColor: "#634AFF" }}
          >
            <ThemedText style={{color:"white" }}>
              Actualizar Avance
            </ThemedText>
            <Icon source='check' size={20} color="white"  />
          </Pressable>
        </SafeAreaView>
      </ScrollView>
  );
};

const styles = StyleSheet.create({
  cancelButton: {
    backgroundColor: '#ff4444',
    padding: 10,
    borderRadius: 5,
  },
  cancelText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
});

export default EtapaArmado;