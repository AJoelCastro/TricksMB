import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
  Modal,
  FlatList,
  Platform,
  ScaledSize,
  Pressable,
  SafeAreaView,
} from 'react-native';
import { Button, Card, Divider, TextInput, Icon } from 'react-native-paper';
import { useRouter } from 'expo-router';
import ModalSelector from 'react-native-modal-selector';
import DateTimePicker from '@react-native-community/datetimepicker';

// Services
import ClienteService from '@/services/ClienteService';
import ModeloService from '@/services/ModeloService';
import DetallePedidoService from '@/services/DetallePedidoService';
import TipoCalzadoService from '@/services/TipoCalzadoService';
import CaracteristicasService from '@/services/CaracteristicasService';
import PedidoService from '@/services/PedidoService';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Colors } from '@/constants/Colors';

import { ThemedView } from '../ThemedView';
import { ThemedText } from '../ThemedText';

import ShowError from '../ShowError';
import * as ScreenOrientation from 'expo-screen-orientation';
// Types
type Cliente = {
  id: number;
  nombre: string;
  Dni?: string;
  Ruc?: string;
  Tipo_cliente?: 'natural' | 'juridico';
};

type Modelo = {
  idModelo: number;
  Nombre: string;
  imagenes: string[];
};

type TipoCalzado = {
  idTipo: number;
  Nombre: string;
};

type Pedido = {
  Codigo_pedido: string;
  Serie_inicio: string;
  Serie_final: string;
  Fecha_entrega: string;
};

type Caracteristica = {
  id: number;
  talla: string;
  pares: string;
  color: string;
};

type OpcionSelector = {
  key: string;
  label: string;
};

const EditarOrden: React.FC = () => {
  // Opciones de selectores
  const opcionesTaco: OpcionSelector[] = [
    { key: '3', label: 'Talla 3' },
    { key: '4', label: 'Talla 4' },
    { key: '5', label: 'Talla 5' },
    { key: '7', label: 'Talla 7' },
    { key: '9', label: 'Talla 9' },
    { key: '12', label: 'Talla 12' },
    { key: '15', label: 'Talla 15' },
  ];

  const opcionesMaterial: OpcionSelector[] = [
    { key: '1', label: 'sintetico' },
    { key: '2', label: 'sintetico' },
    { key: '3', label: 'sintetico' },
    { key: '4', label: 'sintetico' },
    { key: '5', label: 'sintetico' },
    { key: '6', label: 'sintetico' },
    { key: '7', label: 'sintetico' },
  ];

  const opcionesTipoMaterial: OpcionSelector[] = [
    { key: '1', label: 'sintetico' },
    { key: '2', label: 'sintetico' },
    { key: '3', label: 'sintetico' },
    { key: '4', label: 'sintetico' },
    { key: '5', label: 'sintetico' },
    { key: '6', label: 'sintetico' },
    { key: '7', label: 'sintetico' },
  ];

  const opcionesSerieInicio: OpcionSelector[] = [
    { key: '31', label: 'Talla 31' },
    { key: '32', label: 'Talla 32' },
    { key: '33', label: 'Talla 33' },
    { key: '34', label: 'Talla 34' },
    { key: '35', label: 'Talla 35' },
    { key: '36', label: 'Talla 36' },
    { key: '37', label: 'Talla 37' },
    { key: '38', label: 'Talla 38' },
    { key: '39', label: 'Talla 39' },
  ];

  const opcionesSerieFin: OpcionSelector[] = [
    { key: '32', label: 'Talla 32' },
    { key: '33', label: 'Talla 33' },
    { key: '34', label: 'Talla 34' },
    { key: '35', label: 'Talla 35' },
    { key: '36', label: 'Talla 36' },
    { key: '37', label: 'Talla 37' },
    { key: '38', label: 'Talla 38' },
    { key: '39', label: 'Talla 39' },
    { key: '40', label: 'Talla 40' },
  ];

  // Estados
  const router = useRouter();
  const [codigoPedido, setCodigoPedido] = useState<string>('');
  const [cliente, setCliente] = useState<Cliente | null>(null);
  const [modelo, setModelo] = useState<string>('');
  const [selectSerieInicio, setSelectSerieInicio] = useState<string>('');
  const [selectSerieFin, setSelectSerieFin] = useState<string>('');
  const [tipoCliente, setTipoCliente] = useState<'natural' | 'juridico' | ''>('');
  const [dni, setDni] = useState<string>('');
  const [ruc, setRuc] = useState<string>('');
  const [nombreTaco, setNombreTaco] = useState<string>('');
  const [tallaTaco, setTallaTaco] = useState<string>('');
  const [documento, setDocumento] = useState<string>('');
  const [material, setMaterial] = useState<string>('');
  const [tipoMaterial, setTipoMaterial] = useState<string>('');
  const [accesorios, setAccesorios] = useState<string>('');
  const [suela, setSuela] = useState<string>('');
  const [forro, setForro] = useState<string>('');
  const [dataModelos, setDataModelos] = useState<Modelo[]>([]);
  const [dataTipoCalzado, setDataTipoCalzado] = useState<TipoCalzado[]>([]);
  const [tipoCalzado, setTipoCalzado] = useState<TipoCalzado | null>(null);
  const [fechaEntrega, setFechaEntrega] = useState<Date>(new Date());
  const [openDatePicker, setOpenDatePicker] = useState<boolean>(false);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [filteredSuggestions, setFilteredSuggestions] = useState<Pedido[]>([]);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [showTextInputCodigoPedido, setShowTextInputCodigoPedido] = useState<boolean>(false);
  const [idDetallePedido, setIdDetallePedido] = useState<number | null>(null);
  const [filas, setFilas] = useState<Caracteristica[]>([]);
  const [filasEliminadas, setFilasEliminadas] = useState<Caracteristica[]>([]);
  const [filasCreadas, setFilasCreadas] = useState<Caracteristica[]>([]);
  const [fechaCreacion, setFechaCreacion] = useState<Date>(new Date());
  const [width, setWidth] = useState(Dimensions.get('window').width);
  const [typeScreen, setTypeScreen] = useState<string>('');


  useEffect(() => {
    // Convertir el valor numérico a un nombre legible
    const getOrientationName = (orientation: ScreenOrientation.Orientation) => {
      switch (orientation) {
        case ScreenOrientation.Orientation.PORTRAIT_UP:
          return 'Portrait Up';
        case ScreenOrientation.Orientation.PORTRAIT_DOWN:
          return 'Portrait Down';
        case ScreenOrientation.Orientation.LANDSCAPE_LEFT:
          return 'Landscape Left';
        case ScreenOrientation.Orientation.LANDSCAPE_RIGHT:
          return 'Landscape Right';
        default:
          return 'Unknown';
      }
    };

    // Se ejecuta cada vez que cambia la orientación
    const subscription = ScreenOrientation.addOrientationChangeListener(event => {
      const orientation = event.orientationInfo.orientation;
      setTypeScreen(getOrientationName(orientation));
    });

    // Obtiene la orientación inicial
    (async () => {
      const orientation = await ScreenOrientation.getOrientationAsync();
      setTypeScreen(getOrientationName(orientation));
    })();

    // Limpia el listener al desmontar
    return () => {
      ScreenOrientation.removeOrientationChangeListener(subscription);
    };
  }, []);

  useEffect(() => {
    // Se ejecuta cada vez que cambia la orientación o tamaño de la pantala
    const handleChange = ({ window }: { window: ScaledSize }) => {
      setWidth(window.width);
    };

    // Escucha algun cambio de dimensiones
    const subscription = Dimensions.addEventListener('change', handleChange);

    // Se elimina el listener cuando el componente se desmonta
    return () => {
      subscription?.remove?.();
    };
  }, []);
  // Estilos
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

  // Handlers
  const mostrarError = (error: Error) => {
    Alert.alert('Error', error.message, [{ text: 'OK' }]);
  };

  const handleSearch = (text: string) => {
    setCodigoPedido(text);
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

  const handleAgregarFila = () => {
    const nuevaFila: Caracteristica = {
      id: filas.length + 1,
      talla: '',
      pares: '',
      color: '',
    };
    setFilas([...filas, nuevaFila]);
    setFilasCreadas([...filasCreadas, nuevaFila]);
  };

  const handleEliminarFila = (id: number) => {
    const filaEliminada = filas.find(fila => fila.id === id);
    if (filaEliminada) {
      setFilasEliminadas([...filasEliminadas, filaEliminada]);
    }
    setFilas(filas.filter(fila => fila.id !== id));
  };

  // Funciones de servicio
  const cargarClienteNatural = async () => {
    try {
      const cliente = await ClienteService.buscarCliente('natural', dni);
      if (cliente.status === 404) {
        setTipoCliente('');
        Alert.alert('Error al buscar cliente', cliente.error, [{ text: 'OK' }]);
      }
      if (cliente.status === 200) {
        setCliente(cliente.cliente);
      }
    } catch (error) {
      mostrarError(error as Error);
    }
  };

  const cargarClienteJuridico = async () => {
    try {
      const cliente = await ClienteService.buscarCliente('juridico', ruc);
      if (cliente.status === 404) {
        setTipoCliente('');
        Alert.alert('Error al buscar cliente', cliente.error, [{ text: 'OK' }]);
      }
      if (cliente.status === 200) {
        setCliente(cliente.cliente);
      }
    } catch (error) {
      mostrarError(error as Error);
    }
  };

  const cargarModelosPorId = async () => {
    try {
      setDataModelos([]);
      if (!tipoCalzado) return;
      
      const modelos = await ModeloService.getAllModeloById(tipoCalzado.idTipo);
      const modelosConImagenes = await Promise.all(
        modelos.modelo.map(async (modelo: any) => {
          const imagen = await ModeloService.getImagenById(modelo.idModelo);
          return {
            ...modelo,
            imagenes: imagen?.imagen?.map((img: any) => img.Url) || []
          };
        })
      );
      setDataModelos(modelosConImagenes);
    } catch (error) {
      mostrarError(error as Error);
    }
  };

  const cargarDetallePedido = async () => {
    try {
      const data = await DetallePedidoService.obtenerDetallePedido(codigoPedido);
      setIdDetallePedido(data.detallePedido.idDetalle_pedido);
      setAccesorios(data.detallePedido.Accesorios);
      setTallaTaco(data.detallePedido.Altura_taco);
      setForro(data.detallePedido.Forro);
      setMaterial(data.detallePedido.Material);
      setNombreTaco(data.detallePedido.Nombre_taco);
      setSuela(data.detallePedido.Suela);
      setTipoMaterial(data.detallePedido.Tipo_material);
      setFechaCreacion(new Date(data.detallePedido.Fecha_creacion));

      const dataTipoCalzado = await TipoCalzadoService.getTipoCalzadoByCodigoPedido(codigoPedido);
      setTipoCalzado({ idTipo: dataTipoCalzado.tipoCalzado.idTipo, Nombre: dataTipoCalzado.tipoCalzado.Nombre });

      const dataModelo = await ModeloService.getModeloByCodigoPedido(codigoPedido); 
      setModelo(dataModelo.modelo.Nombre);

      const dataPedido = await PedidoService.getPedidoByCodigoPedido(codigoPedido);
      setSelectSerieInicio(dataPedido.pedido.Serie_inicio);
      setSelectSerieFin(dataPedido.pedido.Serie_final);
      setFechaEntrega(new Date(dataPedido.pedido.Fecha_entrega));

      const dataCliente = await ClienteService.getClienteByCodigoPedido(codigoPedido);
      setTipoCliente(dataCliente.cliente.Tipo_cliente);
      setCliente(dataCliente.cliente);

      const dataCaracteristicas = await CaracteristicasService.getAllCaracteristicasById(data.detallePedido.idDetalle_pedido);
      const filasTransformadas = dataCaracteristicas.caracteristicas.map((car: any) => ({
        id: car.idCaracteristicas,
        talla: car.Talla.toString(),
        pares: car.Cantidad.toString(),
        color: car.Color.toString(),
      }));
      setFilas(filasTransformadas);
    } catch (error) {
      ShowError(error as Error);
    }
  };

  const updatePedido = async () => {
    try {
      if (!idDetallePedido) {
        Alert.alert('Error', 'No se ha cargado un pedido válido');
        return;
      }

      const datosPedido = {
        nombreTaco,
        alturaTaco: tallaTaco,
        material,
        tipoMaterial,
        suela,
        accesorios,
        forro,
      };

      // Validar campos obligatorios
      if (!Object.values(datosPedido).every(valor => valor && valor.trim() !== '')) {
        Alert.alert('Error', 'Por favor, completa todos los campos del pedido.');
        return;
      }

      // Procesar filas eliminadas
      for (const fila of filasEliminadas) {
        await CaracteristicasService.deleteCaracteristicas(fila.id);
      }

      // Procesar filas existentes
      for (const fila of filas) {
        const datosCaracteristicas = {
          idCaracteristicas: fila.id,
          talla: Number(fila.talla),
          cantidad: Number(fila.pares),
          color: fila.color,
        };

        if (!Object.values(datosCaracteristicas).every(valor => valor !== null && valor !== undefined)) {
          Alert.alert('Error', 'Por favor, completa todos los campos de las características.');
          return;
        }

        await CaracteristicasService.editCaracteristicas(datosCaracteristicas);
      }

      // Procesar filas nuevas
      for (const fila of filasCreadas) {
        if (!fila.id || filas.some(f => f.id === fila.id)) continue;

        const datosCaracteristicas = {
          idDetallePedido: idDetallePedido,
          talla: fila.talla,
          cantidad: fila.pares,
          color: fila.color,
        };

        if (!Object.values(datosCaracteristicas).every(valor => valor && valor.toString().trim() !== '')) {
          Alert.alert('Error', 'Por favor, completa todos los campos de las nuevas características.');
          return;
        }

        await CaracteristicasService.crearCaracteristicas(datosCaracteristicas);
      }

      // Actualizar pedido principal
      const actualizar = await DetallePedidoService.updateDetallePedido(
        codigoPedido,
        datosPedido
      );

      if (actualizar) {
        Alert.alert(
          'Pedido actualizado',
          'El pedido se ha actualizado correctamente.'
        );
        resetearCampos();
      } else {
        Alert.alert('Error', 'Hubo un problema al actualizar el pedido.');
      }
    } catch (error) {
      ShowError(error as Error);
    }
  };

  const resetearCampos = () => {
    setCliente(null);
    setModelo('');
    setSelectSerieInicio('');
    setSelectSerieFin('');
    setTipoCliente('');
    setDni('');
    setRuc('');
    setNombreTaco('');
    setTallaTaco('');
    setDocumento('');
    setMaterial('');
    setTipoMaterial('');
    setAccesorios('');
    setSuela('');
    setForro('');
    setTipoCalzado(null);
    setFechaEntrega(new Date());
    setFilas([]);
    setFilasEliminadas([]);
    setFilasCreadas([]);
    setIdDetallePedido(null);
    setCodigoPedido('');
  };

  // Efectos
  useEffect(() => {
    const obtenerClientes = async () => {
      try {
        const clientes = await ClienteService.getClientesById();
        setClientes(clientes.cliente);
      } catch (error) {
        mostrarError(error as Error);
      }
    };
    obtenerClientes();
  }, []);

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

  useEffect(() => {
    if (tipoCliente === 'natural' && dni) {
      cargarClienteNatural();
    } else if (tipoCliente === 'juridico' && ruc) {
      cargarClienteJuridico();
    }
  }, [tipoCliente, dni, ruc]);

  useEffect(() => {
    if (codigoPedido && showTextInputCodigoPedido) {
      cargarDetallePedido();
    }
  }, [codigoPedido, showTextInputCodigoPedido]);
  const textColor = useThemeColor(
    { light: Colors.light.text, dark: Colors.dark.text },
    'text'
  );
  const iconColor = useThemeColor(
      { light: Colors.light.icon, dark: Colors.dark.icon },
      'icon'
  );
  const backIconColor = useThemeColor(
      { light: Colors.light.backIcon, dark: Colors.dark.backIcon },
      'backIcon'
  );
  const contentColor = useThemeColor(
      { light: Colors.light.content, dark: Colors.dark.content },
      'content'
  );
  return (
    <SafeAreaView className='mx-4 gap-2 flex-1' >
      
        {/* Búsqueda de pedido */}
        <View className='relative'>
          <TextInput
            label='Código de orden'
            mode='outlined'
            placeholder='Ingresa el código'
            value={codigoPedido}
            onChangeText={handleSearch}
            onPressIn={() => setShowTextInputCodigoPedido(false)}
            disabled={showTextInputCodigoPedido}
            onFocus={() => {
              if (codigoPedido.length > 0) {
                setShowSuggestions(true);
              }
            }}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 1200)}
            right={
              <TextInput.Icon
                icon='magnify'
                onPress={() => {
                  cargarDetallePedido();
                  setShowTextInputCodigoPedido(true);
                }}
              />
            }
          />

          {showSuggestions && filteredSuggestions.length > 0 && (
            <View className='absolute z-10 top-16 w-full rounded-md shadow-md max-h-80 right-0 left-0' style={{backgroundColor:contentColor, flex:1}}>
              <FlatList
                data={filteredSuggestions}
                keyExtractor={item => item.Codigo_pedido}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => {
                      setCodigoPedido(item.Codigo_pedido);
                      setShowSuggestions(false);
                    }}
                  >
                    <Card.Content className='p-2'>
                      <ThemedText>{item.Codigo_pedido}</ThemedText>
                    </Card.Content>
                    <Divider />
                  </TouchableOpacity>
                )}
              />
            </View>
          )}

          <Pressable
            onPress={() => setShowSuggestions(false)}
            className={!showSuggestions ? 'opacity-0 h-0' : 'absolute inset-0 z-5 bg-transparent'}
          />
        </View>
        <ScrollView>
          {/* Información del cliente */}
          {tipoCliente === 'natural' && cliente && (
            <View className='gap-2 mb-2'>
              <View className='flex-col'>
                <TextInput
                  value={cliente.nombre}
                  mode='outlined'
                  label='Nombre'
                  editable={false}
                />
                <TextInput
                  value={cliente.Dni || ''}
                  mode='outlined'
                  label='DNI'
                  editable={false}
                />
              </View>
            </View>
          )}

          {tipoCliente === 'juridico' && cliente && (
            <View className='gap-2 mb-2'>
              <View className='flex-col'>
                <TextInput
                  value={cliente.nombre}
                  mode='outlined'
                  label='Razón Social'
                  editable={false}
                />
                <TextInput
                  value={cliente.Ruc || ''}
                  mode='outlined'
                  label='RUC'
                  editable={false}
                />
              </View>
            </View>
          )}

          {/* Selectores principales */}
          <View className='gap-2'>
            <ModalSelector
              data={dataTipoCalzado}
              keyExtractor={(item: TipoCalzado) => item.idTipo.toString()}
              labelExtractor={(item: TipoCalzado) => item.Nombre}
              onChange={(item: TipoCalzado) => setTipoCalzado(item)}
              cancelText='Cancelar'
              cancelStyle={styles.cancelButton}
              cancelTextStyle={styles.cancelText}
            >
              <TextInput
                editable={false}
                mode='outlined'
                label='Tipo de calzado'
                placeholder='Tipo de calzado'
                value={tipoCalzado?.Nombre || ''}
              />
            </ModalSelector>

            
            <TextInput
              label='Modelo'
              mode='outlined'
              value={modelo}
              editable={false}
            />

            <TextInput
              mode='outlined'
              label='Fecha de creación'
              value={fechaCreacion.toISOString().split('T')[0] || ''}
              editable={false}
              right={<TextInput.Icon icon='calendar' />}
            />

            <TextInput
              label='Fecha de entrega'
              mode='outlined'
              value={fechaEntrega.toISOString().split('T')[0]}
              editable={false}
              right={
                <TextInput.Icon
                  icon='calendar'
                  onPress={() => setOpenDatePicker(!openDatePicker)}
                />
              }
            />

            {openDatePicker && (
              <View style={{backgroundColor:contentColor}}>
                <DateTimePicker
                  value={fechaEntrega}
                  mode='date'
                  display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                  onChange={(event, selectedDate) => {
                    setOpenDatePicker(false);
                    if (selectedDate) setFechaEntrega(selectedDate);
                  }}
                />
              </View>
            )}
          </View>

          {/* Series */}
          <View className='flex mt-4 mb-4 gap-5'>
            <View className='flex-row items-center gap-4'>
              <ThemedText className='font-bold'>Serie Inicio</ThemedText>
              <View className='h-8 border-l-2 items-center justify-center w-[30%]'>
                <ModalSelector
                  data={opcionesSerieInicio}
                  onChange={(talla: OpcionSelector) => setSelectSerieInicio(talla.key)}
                  cancelText='Cancelar'
                  cancelStyle={styles.cancelButton}
                  cancelTextStyle={styles.cancelText}
                >
                  <TextInput
                    editable={false}
                    style={{ height: 40 }}
                    placeholder='Talla'
                    value={selectSerieInicio.toString()}
                    className='rounded-lg font-bold w-full'
                  />
                </ModalSelector>
              </View>
            </View>

            <View className='flex-row items-center gap-4'>
              <ThemedText className='font-bold'>Serie Fin</ThemedText>
              <View className='h-8  border-l-2 items-center justify-center w-[30%]'>
                <ModalSelector
                  data={opcionesSerieFin}
                  onChange={(talla: OpcionSelector) => setSelectSerieFin(talla.key)}
                  cancelText='Cancelar'
                  cancelStyle={styles.cancelButton}
                  cancelTextStyle={styles.cancelText}
                >
                  <TextInput
                    editable={false}
                    style={{ height: 40 }}
                    placeholder='Talla'
                    value={selectSerieFin.toString()}
                    className='rounded-lg font-bold w-full'
                  />
                </ModalSelector>
              </View>
            </View>
          </View>

          {/* Filas de características */}
          {filas.map((fila, index) => (
            <View key={fila.id} className='flex-row justify-between items-center mb-2'>
              <TextInput
                label='Talla'
                className='rounded flex-1'
                keyboardType='numeric'
                placeholder='Talla'
                style={{ height: 40, width: typeScreen ==='Portrait Up'? width * 0.25 : width /4.2 }} 
                mode='outlined'
                value={fila.talla}
                onChangeText={(text) => {
                  const nuevasFilas = [...filas];
                  nuevasFilas[index].talla = text;
                  setFilas(nuevasFilas);
                }}
              />
              
              <TextInput
                label='Pares'
                className='rounded flex-1'
                placeholder='Pares'
                style={{ height: 40, width: typeScreen ==='Portrait Up'? width * 0.25 : width /4.2 }}
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
                label='Color'
                className='rounded flex-1'
                placeholder='Color'
                style={{ height: 40, width: typeScreen ==='Portrait Up'? width * 0.25 : width /4.2 }}
                mode='outlined'
                value={fila.color}
                onChangeText={(text) => {
                  const nuevasFilas = [...filas];
                  nuevasFilas[index].color = text;
                  setFilas(nuevasFilas);
                }}
              />
              
              <TouchableOpacity onPress={() => handleEliminarFila(fila.id)}>
                <Icon source='delete' size={20} color='red' />
              </TouchableOpacity>
            </View>
          ))}

          <TouchableOpacity
            className='flex-row gap-2 justify-center items-center mt-2'
            onPress={handleAgregarFila}
          >
            <ThemedText className='text-lg'>Agregar</ThemedText>
            <Icon source='plus-circle' size={20} color={iconColor}/>
          </TouchableOpacity>

          {/* Detalle de la orden */}
          <ThemedText className='font-bold mt-4 text-lg mx-auto'>Detalle de la orden</ThemedText>
          
          <View className='mt-2 gap-2'>
            <TextInput
              label='Taco'
              mode='outlined'
              placeholder='Nombre de taco'
              value={nombreTaco}
              onChangeText={setNombreTaco}
              className='rounded-lg h-10'
            />
          </View>

          <View className='mt-2 flex-row items-center gap-8'>
            <ThemedText className='font-bold'>Altura de taco:</ThemedText>
            <ModalSelector
              data={opcionesTaco}
              onChange={(talla: OpcionSelector) => setTallaTaco(talla.key)}
              cancelText='Cancelar'
              cancelStyle={styles.cancelButton}
              cancelTextStyle={styles.cancelText}
            >
              <TextInput
                editable={false}
                placeholder='Seleccione una talla'
                style={{ height: 40 }}
                value={tallaTaco.toString()}
                className='rounded-lg font-bold'
              />
            </ModalSelector>
          </View>

          <View className='gap-2 mt-2 mb-4'>
            <ModalSelector
              data={opcionesMaterial}
              onChange={(material: OpcionSelector) => setMaterial(material.label)}
              cancelText='Cancelar'
            >
              <TextInput
                label='Material'
                mode='outlined'
                editable={false}
                value={material}
              />
            </ModalSelector>

            <ModalSelector
              data={opcionesTipoMaterial}
              onChange={(tipoMaterial: OpcionSelector) => setTipoMaterial(tipoMaterial.label)}
              cancelText='Cancelar'
            >
              <TextInput
                label='Tipo de Material'
                mode='outlined'
                editable={false}
                value={tipoMaterial}
              />
            </ModalSelector>

            <TextInput
              label='Suela'
              mode='outlined'
              value={suela}
              placeholder='Suela'
              onChangeText={setSuela}
            />

            <TextInput
              label='Accesorios'
              mode='outlined'
              multiline
              numberOfLines={1}
              value={accesorios}
              placeholder='Digite los accesorios'
              onChangeText={setAccesorios}
            />

            <TextInput
              label='Forro'
              mode='outlined'
              value={forro}
              onChangeText={setForro}
              placeholder='Forro'
            />
          </View>
          <Pressable
            onPress={updatePedido}
            className='flex-row gap-2 items-center justify-center rounded-lg py-2'
            style={{ backgroundColor: "#634AFF" }}
          >
            <ThemedText style={{color:"white"}}>
            Actualizar Pedido
            </ThemedText>
            <Icon source='check' size={20} color="white" />
          </Pressable>
        </ScrollView>
    </SafeAreaView>
  );
};

export default EditarOrden;