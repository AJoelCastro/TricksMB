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
  KeyboardAvoidingView, 
  Pressable 
} from 'react-native';
import { Button, Card, Divider, TextInput } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { Icon } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import ModalSelector from 'react-native-modal-selector';

// Services
import ClienteService from '@/services/ClienteService';
import ModeloService from '@/services/ModeloService';
import DetallePedidoService from '@/services/DetallePedidoService';
import TipoCalzadoService from '@/services/TipoCalzadoService';
import CaracteristicasService from '@/services/CaracteristicasService';

// Components
import { ThemedView } from '../ThemedView';

// Types
type Cliente = {
  identificador: string;
  Nombre?: string;
  Razon_social?: string;
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

type FilaDetalle = {
  id: number;
  talla: string;
  pares: string;
  color: string;
};

type OpcionSelector = {
  key: string;
  label: string;
};

const { width } = Dimensions.get('window');

const CrearOrden: React.FC = () => {
  // Estados
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
  const [modalModeloVisible, setModalModeloVisible] = useState<boolean>(false);
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
  const [showTextInputDocumento, setShowTextInputDocumento] = useState<boolean>(false);
  const [filteredClientes, setFilteredClientes] = useState<Cliente[]>([]);
  const [showFilteredClientes, setshowFilteredClientes] = useState<boolean>(false);
  const [filas, setFilas] = useState<FilaDetalle[]>([]);
  const [currentDate] = useState<string>(new Date().toISOString().split('T')[0]);

  const router = useRouter();

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

  // Estilos
  const styles = StyleSheet.create({
    cancelButton: {
      backgroundColor: '#ccc',
      borderRadius: 5,
    },
    cancelText: {
      color: '#333',
    },
  });

  // Handlers
  const mostrarError = (error: Error) => {
    Alert.alert('Error', error.message, [{ text: 'OK' }]);
  };

  const handleSearch = (text: string) => {
    setDocumento(text);
    if (text.length > 0) {
      const filtered = clientes.filter(cliente =>
        cliente.identificador.includes(text)
      );
      setFilteredClientes(filtered);
      setshowFilteredClientes(true);
    } else {
      setFilteredClientes([]);
      setshowFilteredClientes(false);
    }
  };

  const handleAgregarFila = () => {
    setFilas([
      ...filas,
      {
        id: filas.length + 1,
        talla: '',
        pares: '',
        color: '',
      },
    ]);
  };

  const handleEliminarFila = (id: number) => {
    setFilas(filas.filter(fila => fila.id !== id));
  };

  const verificarDocumento = () => {
    setTipoCliente('');
    setDni('');
    setRuc('');
    
    try {
      if (documento.length === 8) {
        setDni(documento);
        setTipoCliente('natural');
      } else if (documento.length === 11) {
        setRuc(documento);
        setTipoCliente('juridico');
      } else {
        Alert.alert(
          'Ingrese un documento válido',
          'Debe ser un número de DNI o RUC',
          [{ text: 'OK' }]
        );
      }
    } catch (error) {
      mostrarError(new Error('Error al validar documento'));
    }
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

  const crearPedido = async () => {
    try {
      if (!tipoCliente || !modelo || !selectSerieInicio || !selectSerieFin || 
          !nombreTaco || !tallaTaco || !material || !tipoMaterial || !suela || !forro) {
        Alert.alert('Error', 'Por favor, completa todos los campos.');
        return null;
      }

      const datosPedido = {
        clienteTipo: tipoCliente === 'natural' ? dni : ruc,
        fechaEntrega: fechaEntrega.toISOString().split('T')[0],
        serieInicio: selectSerieInicio,
        serieFinal: selectSerieFin,
        nomModelo: modelo,
        nombreTaco,
        alturaTaco: tallaTaco,
        material,
        tipoMaterial,
        suela,
        accesorios,
        forro,
      };

      return await DetallePedidoService.crearPedido(datosPedido);
    } catch (error) {
      mostrarError(error as Error);
      return null;
    }
  };

  const crearCaracteristicas = async (idDetallePedido: number) => {
    try {
      const resultados = [];
      
      for (const fila of filas) {
        if (!fila.talla || !fila.pares || !fila.color) {
          Alert.alert('Error', 'Por favor, completa todos los campos de las filas.');
          return null;
        }

        const datos = {
          idDetallePedido,
          talla: fila.talla,
          cantidad: fila.pares,
          color: fila.color,
        };

        const resultado = await CaracteristicasService.crearCaracteristicas(datos);
        resultados.push(resultado.caracteristica);
      }

      return resultados;
    } catch (error) {
      mostrarError(error as Error);
      return null;
    }
  };

  const handleCrearPedido = async () => {
    try {
      const pedido = await crearPedido();
      if (!pedido) return;

      const caracteristicas = await crearCaracteristicas(pedido.detallePedido.idDetallePedido);
      if (!caracteristicas) return;

      await DetallePedidoService.updateCantidadPedido(pedido.detallePedido.codigoPedido);
      
      Alert.alert(
        'Éxito', 
        `Pedido ${pedido.detallePedido.codigoPedido} creado con éxito`,
        [{ text: 'OK', onPress: resetearCampos }]
      );
    } catch (error) {
      mostrarError(error as Error);
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
  };

  // Efectos
  useEffect(() => {
    const obtenerClientes = async () => {
      try {
        const response = await ClienteService.getClientesById();
        setClientes(response.cliente);
      } catch (error) {
        mostrarError(error as Error);
      }
    };
    obtenerClientes();
  }, []);

  useEffect(() => {
    const cargarTipoCalzado = async () => {
      try {
        const tipos = await TipoCalzadoService.getAllTipoCalzado();
        setDataTipoCalzado(tipos.tipoCalzado);
      } catch (error) {
        console.error('Error cargando tipos de calzado:', error);
      }
    };
    cargarTipoCalzado();
  }, []);

  useEffect(() => {
    if (tipoCliente === 'natural' && dni) {
      cargarClienteNatural();
    } else if (tipoCliente === 'juridico' && ruc) {
      cargarClienteJuridico();
    }
  }, [tipoCliente, dni, ruc]);

  return (
    <ThemedView>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView className='mx-4 gap-2'>
          {/* Sección Cliente */}
          <Text className='font-bold mt-2 mb-3 text-lg'>Buscar Cliente por Tipo</Text>
          
          <View className='relative'>
            <TextInput
              label='DNI O RUC'
              placeholder='Ingrese un número de DNI o RUC'
              mode='outlined'
              className='h-10 rounded-lg'
              value={documento}
              onChangeText={handleSearch}
              keyboardType='numeric'
              maxLength={11}
              onPressIn={() => setShowTextInputDocumento(false)}
              disabled={showTextInputDocumento}
              right={
                <TextInput.Icon
                  icon='magnify'
                  onPress={() => {
                    verificarDocumento();
                    setShowTextInputDocumento(true);
                  }}
                />
              }
              onBlur={() => setTimeout(() => setshowFilteredClientes(false), 1200)}
            />

            {showFilteredClientes && filteredClientes.length > 0 && (
              <View className='absolute z-10 top-16 w-full bg-white rounded-lg shadow-md max-h-80 right-0 left-0 shadow-black/20'>
                {filteredClientes.map(item => (
                  <View key={item.identificador}>
                    <Pressable
                      onPress={() => {
                        setDocumento(item.identificador);
                        setshowFilteredClientes(false);
                      }}
                    >
                      <Card.Content style={{ padding: 10 }}>
                        <Text>{item.identificador}</Text>
                      </Card.Content>
                      <Divider />
                    </Pressable>
                  </View>
                ))}
              </View>
            )}

            <Pressable
              onPress={() => setshowFilteredClientes(false)}
              className={!showFilteredClientes ? 'opacity-0 h-0' : 'absolute inset-0 z-5 bg-transparent'}
            />
          </View>

          {/* Info Cliente */}
          {tipoCliente === 'natural' && cliente?.Nombre && (
            <View className='gap-2 mb-2'>
              <Text className='text-black text-lg font-bold'>Nombre: {cliente.Nombre}</Text>
            </View>
          )}

          {tipoCliente === 'juridico' && cliente?.Razon_social && (
            <View className='gap-2 mb-2'>
              <Text className='text-black text-lg font-bold'>Razón Social: {cliente.Razon_social}</Text>
            </View>
          )}

          {/* Selectores */}
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

            <TouchableOpacity onPress={() => {
              setModalModeloVisible(true);
              cargarModelosPorId();
            }}>
              <TextInput
                label='Modelo'
                mode='outlined'
                value={modelo}
                editable={false}
              />
            </TouchableOpacity>

            <Modal visible={modalModeloVisible} transparent animationType='slide'>
              <View className='flex-1 my-6 pb-6 px-2'>
                <View className='flex-row justify-end p-3'>
                  <TouchableOpacity
                    onPress={() => setModalModeloVisible(false)}
                    className='bg-black/50 rounded-full p-2'
                  >
                    <Icon source='close' size={22} color='white' />
                  </TouchableOpacity>
                </View>
                
                <FlatList
                  data={dataModelos}
                  keyExtractor={(item: Modelo) => item.idModelo.toString()}
                  renderItem={({ item }: { item: Modelo }) => (
                    <Card style={{ marginBottom: 10, borderRadius: 10, elevation: 5 }}>
                      <Card.Cover 
                        source={{ uri: item.imagenes[0] }} 
                        style={{ height: 350, resizeMode: 'cover' }} 
                      />
                      <Card.Content>
                        <TouchableOpacity
                          onPress={() => {
                            setModelo(item.Nombre);
                            setModalModeloVisible(false);
                          }}
                        >
                          <Text className='titleMedium'>{item.Nombre}</Text>
                        </TouchableOpacity>
                      </Card.Content>
                    </Card>
                  )}
                />
              </View>
            </Modal>

            <TextInput
              mode='outlined'
              label='Fecha de creación'
              value={currentDate}
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
              <View className='bg-[#151718]'>
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
              <Text className='font-bold'>Serie Inicio</Text>
              <View className='h-8 bg-gray-100 border-l-2 items-center justify-center w-[30%]'>
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
                    value={selectSerieInicio}
                    className='bg-gray-200 rounded-lg font-bold w-full'
                  />
                </ModalSelector>
              </View>
            </View>

            <View className='flex-row items-center gap-4'>
              <Text className='font-bold'>Serie Fin</Text>
              <View className='h-8 bg-gray-100 border-l-2 items-center justify-center w-[30%]'>
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
                    value={selectSerieFin}
                    className='bg-gray-200 rounded-lg font-bold w-full'
                  />
                </ModalSelector>
              </View>
            </View>
          </View>

          {/* Filas de detalles */}
          {filas.map((fila, index) => (
            <View key={fila.id} className='flex-row justify-between items-center mb-2'>
              <TextInput
                label='Talla'
                className='rounded flex-1'
                keyboardType='numeric'
                placeholder='Talla'
                style={{ height: 40, width: width * 0.25 }}
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
                style={{ height: 40, width: width * 0.25 }}
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
                style={{ height: 40, width: width * 0.25 }}
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
            <Text className='text-lg'>Agregar</Text>
            <Icon source='plus-circle' size={20} />
          </TouchableOpacity>

          {/* Detalle de la orden */}
          <Text className='font-bold mt-4 text-lg mx-auto'>Detalle de la orden</Text>
          
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
            <Text className='font-bold'>Altura de taco:</Text>
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
                value={tallaTaco}
                className='bg-gray-200 rounded-lg font-bold'
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

          <Button
            mode='contained-tonal'
            icon='note'
            buttonColor='#6969'
            textColor='#000'
            onPress={handleCrearPedido}
          >
            Crear Pedido
          </Button>

          <View className='mb-32' />
        </ScrollView>
      </KeyboardAvoidingView>
    </ThemedView>
  );
};

export default CrearOrden;