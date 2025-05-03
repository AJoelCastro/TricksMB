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
  Pressable,
} from 'react-native';
import { Button, Card, Divider, TextInput } from 'react-native-paper';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';

import ModalSelector from 'react-native-modal-selector';
import ClienteService from '@/services/ClienteService';
import ModeloService from '@/services/ModeloService';
import Icon from 'react-native-vector-icons/FontAwesome';
import DateTimePicker from '@react-native-community/datetimepicker';
import DetallePedidoService from '../../../../../services/DetallePedidoService';

import TipoCalzadoService from '@/services/TipoCalzadoService';
import CaracteristicasService from '@/services/CaracteristicasService';

const { width } = Dimensions.get('window');

export default function Crear() {
  const opcionesTaco = [
    { key: '3', label: 'Talla 3' },
    { key: '4', label: 'Talla 4' },
    { key: '5', label: 'Talla 5' },
    { key: '7', label: 'Talla 7' },
    { key: '9', label: 'Talla 9' },
    { key: '12', label: 'Talla 12' },
    { key: '15', label: 'Talla 15' },
  ];

  const opcionesMaterial = [
    { key: '1', label: 'sintetico' },
    { key: '2', label: 'sintetico' },
    { key: '3', label: 'sintetico' },
    { key: '4', label: 'sintetico' },
    { key: '5', label: 'sintetico' },
    { key: '6', label: 'sintetico' },
    { key: '7', label: 'sintetico' },
  ];

  const opcionesTipoMaterial = [
    { key: '1', label: 'sintetico' },
    { key: '2', label: 'sintetico' },
    { key: '3', label: 'sintetico' },
    { key: '4', label: 'sintetico' },
    { key: '5', label: 'sintetico' },
    { key: '6', label: 'sintetico' },
    { key: '7', label: 'sintetico' },
  ];

  const opcionesSerieInicio = [
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
  const opcionesSerieFin = [
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
  const router = useRouter();
  const [cliente, setCliente] = useState('');
  const [modelo, setModelo] = useState('');
  const [selectSerieInicio, setSelectSerieInicio] = useState('');
  const [selectSerieFin, setSelectSerieFin] = useState('');
  const [tipoCliente, setTipoCliente] = useState('');
  const [dni, setDni] = useState('');
  const [ruc, setRuc] = useState('');
  const [nombreTaco, setNombreTaco] = useState('');
  const [tallaTaco, setTallaTaco] = useState('');
  const [documento, setDocumento] = useState('');
  const [modalModeloVisible, setModalModeloVisible] = useState(false);
  const [material, setMaterial] = useState('');
  const [tipoMaterial, setTipoMaterial] = useState('');
  const [accesorios, setAccesorios] = useState('');
  const [suela, setSuela] = useState('');
  const [forro, setForro] = useState('');
  const [dataModelos, setDataModelos] = useState([]);
  const [dataTipoCalzado, setDataTipoCalzado] = useState([]);
  const [tipoCalzado, setTipoCalzado] = useState('');
  const [fechaEntrega, setFechaEntrega] = useState(new Date());
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [clientes, setClientes] = useState([]);
  const [showTextInputDocumento, setShowTextInputDocumento] = useState(false);
  const [filteredClientes, setFilteredClientes] = useState([]);
  const [showFilteredClientes, setshowFilteredClientes] = useState(false);
  const mostrarError = error => {
    Alert.alert(
      'Error',
      `${error.message}`,
      [{ text: 'OK' }] // Botón requerido
    );
  };

  useEffect(() => {
    const obtenerClientes = async () => {
      try {
        const clientes = await ClienteService.getClientesById();
        setClientes(clientes.cliente);
      } catch (error) {
        mostrarError(error);
      }
    };
    obtenerClientes();
  }, []);

  const handleSearch = text => {
    setDocumento(text);
    if (text.length > 0) {
      const filteredClientes = clientes.filter(cliente =>
        cliente.identificador.includes(text)
      );
      setFilteredClientes(filteredClientes);
      setshowFilteredClientes(true);
    } else {
      setFilteredClientes([]);
      setshowFilteredClientes(false);
    }
  };

  const getCurrentDate = () => {
    const date = new Date();
    return date.toISOString().split('T')[0]; // Formato: YYYY-MM-DD
  };

  const [currentDate] = useState(getCurrentDate()); // Estado para almacenar la fecha formateada

  const [filas, setFilas] = useState([]);
  const handleAgregarFila = () => {
    // Agregar nueva fila con valores iniciales
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
  const handleEliminarFila = id => {
    // Filtrar las filas para eliminar la seleccionada
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
          'Ingrese un documento valido',
          'Debe ser un numero de DNI o RUC',
          [{ text: 'OK' }]
        );
      }
    } catch (error) {
      const errorMessage = new Error('Ingrese al validar documento');
      mostrarError(errorMessage);
    }
  };

  const cargarClienteNatural = async () => {
    try {
      let identificador = dni;
      const cliente = await ClienteService.buscarCliente(
        tipoCliente,
        identificador
      );
      if (cliente.status === 404) {
        setTipoCliente('');
        Alert.alert('Error al buscar cliente', cliente.error, [{ text: 'OK' }]);
      }
      if (cliente.status === 200) {
        setCliente(cliente.cliente);
      }
    } catch (error) {
      mostrarError(error.error);
    }
  };

  const cargarClienteJuridico = async () => {
    try {
      let identificador = ruc;
      const cliente = await ClienteService.buscarCliente(
        tipoCliente,
        identificador
      );
      if (cliente.status === 404) {
        setTipoCliente('');
        Alert.alert('Error al buscar cliente', cliente.error, [{ text: 'OK' }]);
      }
      if (cliente.status === 200) {
        setCliente(cliente.cliente);
      }
    } catch (error) {
      mostrarError(error.error);
    }
  };

  const cargarModelosPorId = async () => {
    try {
      setDataModelos([]);
      let id = Number(tipoCalzado.idTipo);
      const modelos = await ModeloService.getAllModeloById(id);
      const obteniendoImagenes = await Promise.all(
        modelos.modelo.map(async modelo => {
          let idModelo = modelo.idModelo;
          const imagen = await ModeloService.getImagenById(idModelo);
          if (!imagen) {
            return { ...modelo, imagenes: [] };
          }
          return { ...modelo, imagenes: imagen.imagen.map(img => img.Url) };
        })
      );
      setDataModelos(obteniendoImagenes);
    } catch (error) {
      mostrarError(error);
    }
  };

  useEffect(() => {
    const cargarTipoCalzado = async () => {
      try {
        const tipos = await TipoCalzadoService.getAllTipoCalzado();
        if (!tipos) {
          console.error('No se encontraron los tipos de calzado');
          return;
        }

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

  const crearPedido = async () => {
    try {
      let fechaEntregaFormateada = fechaEntrega.toISOString().split('T')[0];
      const datosPedido = {
        clienteTipo: tipoCliente === 'natural' ? dni : ruc,
        fechaEntrega: fechaEntregaFormateada,
        serieInicio: selectSerieInicio,
        serieFinal: selectSerieFin,
        nomModelo: modelo,
        nombreTaco: nombreTaco,
        alturaTaco: tallaTaco,
        material,
        tipoMaterial,
        suela,
        accesorios,
        forro,
      };
      if (
        !Object.values(datosPedido).every(valor => valor && valor.trim() !== '')
      ) {
        Alert.alert('Error', 'Por favor, completa todos los campos.');
        return;
      }
      const pedido = await DetallePedidoService.crearPedido(datosPedido);
      if (!pedido) {
        return;
      }
      return pedido;
    } catch (error) {
      mostrarError(error);
    }
  };
  const resetearCampos = () => {
    setCliente('');
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
    setTipoCalzado('');
    setFechaEntrega(new Date());
    setFilas([]);
  };
  const crearCaracteristicas = async idDetallePedido => {
    try {
      let dataCaracteristicas = [];
      for (const fila of filas) {
        // ✅ Usar for...of en lugar de map
        const datosCaracteristicas = {
          idDetallePedido,
          talla: fila.talla,
          cantidad: fila.pares,
          color: fila.color,
        };
        // ✅ Verifica si algún valor es vacío
        if (
          !Object.values(datosCaracteristicas).every(
            valor => valor && valor.toString().trim() !== ''
          )
        ) {
          Alert.alert('Error', 'Por favor, completa todos los campos.');
          return;
        }
        // ✅ Llamada a la API con `await`
        const caracteristicas =
          await CaracteristicasService.crearCaracteristicas(
            datosCaracteristicas
          );
        dataCaracteristicas.push(caracteristicas.caracteristica);
        if (!caracteristicas) {
          console.error(
            'Error al crear característica para:',
            dataCaracteristicas
          );
          return;
        }
      }
      return dataCaracteristicas;
    } catch (error) {
      mostrarError(error);
    }
  };
  const handleCrearPedido = async () => {
    try {
      const pedido = await crearPedido();
      if (!pedido) {
        return;
      }
      let idDetallePedido = pedido.detallePedido.idDetallePedido;
      const caracteristicas = await crearCaracteristicas(idDetallePedido);
      if (!caracteristicas) {
        return;
      }
      let codigoPedido = pedido.detallePedido.codigoPedido;
      await DetallePedidoService.updateCantidadPedido(codigoPedido);
      alert(
        `Pedido ${pedido.detallePedido.codigoPedido} creado con exito y cantidad actualizada`
      );
      resetearCampos();
    } catch (error) {
      mostrarError(error);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView className='mx-4 gap-2 '>
        <Text className='font-bold mt-2 mb-3 text-lg'>
          Buscar Cliente por Tipo
        </Text>
        <View className='relative '>
          <TextInput
            label='DNI O RUC'
            placeholder='Ingrese un numero de DNI o RUC'
            mode='outlined'
            className='h-10 rounded-lg'
            value={documento}
            onChangeText={handleSearch}
            keyboardType='numeric'
            maxLength={11}
            onPressIn={() => {
              setShowTextInputDocumento(false);
            }}
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
            onBlur={() => {
              setTimeout(() => setshowFilteredClientes(false), 1200);
            }}
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
                    <Divider></Divider>
                  </Pressable>
                </View>
              ))}
            </View>
          )}
          <Pressable
            onPress={() => setshowFilteredClientes(false)}
            className={
              !showFilteredClientes
                ? 'opacity-0 h-0'
                : 'absolute inset-0 z-5 bg-transparent'
            }
          />
        </View>
        {tipoCliente === 'natural' && (
          <View className='gap-2 mb-2'>
            <View className='flex-col'>
              <Text className='text-black text-lg font-bold'>
                Nombre: {cliente.Nombre}
              </Text>
            </View>
          </View>
        )}
        {tipoCliente === 'juridico' && (
          <View className='gap-2 mb-2'>
            <View className='flex-row gap-6'>
              <Text className='text-black text-lg font-bold'>
                Razon Social: {cliente.Razon_social}
              </Text>
            </View>
          </View>
        )}
        <View className='gap-2'>
          <ModalSelector
            data={dataTipoCalzado}
            keyExtractor={item => item.idTipo}
            labelExtractor={item => item.Nombre}
            accessible={true}
            onChange={item => setTipoCalzado(item)}
            supportedOrientations={['landscape']}
            cancelText='Cancelar'
            cancelStyle={styles.cancelButton}
            cancelTextStyle={styles.cancelText}
          >
            <TextInput
              editable={false}
              mode='outlined'
              label={'Tipo de calzado'}
              placeholder='Tipo de calzado'
              placeholderTextColor={'black'}
              value={tipoCalzado.Nombre}
            />
          </ModalSelector>
          <TouchableOpacity
            onPress={() => {
              setModalModeloVisible(true);
              cargarModelosPorId();
            }}
          >
            <TextInput
              label='Modelo'
              mode='outlined'
              value={modelo}
              editable={false}
            />
          </TouchableOpacity>
          <Modal visible={modalModeloVisible} transparent animationType='slide'>
            {/* <Pressable onPress={()=>setModalModeloVisible(false)}> */}
            <View className='flex-1 my-6 pb-6 px-2'>
              <View className='flex-row justify-end p-3'>
                <TouchableOpacity
                  onPress={() => setModalModeloVisible(false)}
                  className='bg-black/50 rounded-full p-2'
                >
                  <Icon name='close' size={22} color={'white'} />
                </TouchableOpacity>
              </View>
              <FlatList
                data={dataModelos}
                keyExtractor={item => item.idModelo}
                renderItem={({ item }) => (
                  <Card
                    style={{ marginBottom: 10, borderRadius: 10, elevation: 5 }}
                  >
                    <Card.Cover
                      style={{ height: 350, resizeMode: 'cover' }}
                      source={{ uri: item.imagenes[0] }}
                    />
                    <Card.Content>
                      <TouchableOpacity
                        onPress={() => {
                          setModelo(item.Nombre);
                          setModalModeloVisible(false);
                        }}
                      >
                        <Text variant='titleMedium'>{item.Nombre}</Text>
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
            label='Fecha de creacion'
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
        <View className='flex mt-4 mb-4 gap-5'>
          <View className='flex-row items-center gap-4'>
            <Text className='font-bold'>Serie Inicio</Text>
            <View className='h-8 bg-gray-100 border-l-2 items-center justify-center w-[30%]'>
              <ModalSelector
                data={opcionesSerieInicio}
                accessible={true}
                onChange={talla => setSelectSerieInicio(talla.key)}
                supportedOrientations={['landscape']}
                cancelText='Cancelar'
                cancelStyle={styles.cancelButton}
                cancelTextStyle={styles.cancelText}
              >
                <TextInput
                  editable={false}
                  style={{ height: 40 }}
                  placeholder='Talla'
                  placeholderTextColor={'black'}
                  value={selectSerieInicio}
                  className='bg-gray-200 rounded-lg font-bold w-full'
                />
              </ModalSelector>
            </View>
          </View>
          <View className='flex-row items-center gap-4'>
            <Text className='font-bold'>Serie Fin </Text>
            <View className='h-8 bg-gray-100 border-l-2 items-center justify-center w-[30%]'>
              <ModalSelector
                data={opcionesSerieFin}
                accessible={true}
                onChange={talla => setSelectSerieFin(talla.key)}
                supportedOrientations={['landscape']}
                cancelText='Cancelar'
                cancelStyle={styles.cancelButton}
                cancelTextStyle={styles.cancelText}
              >
                <TextInput
                  editable={false}
                  style={{ height: 40 }}
                  placeholder='Talla'
                  placeholderTextColor={'black'}
                  value={selectSerieFin}
                  className='bg-gray-200 rounded-lg font-bold w-full'
                />
              </ModalSelector>
            </View>
          </View>
        </View>
        {filas.map((fila, index) => (
          <View
            key={fila.id}
            className='flex-row justify-between items-center  mb-2'
          >
            <TextInput
              label='Talla'
              className='rounded flex-1'
              keyboardType='numeric'
              placeholder='Talla'
              style={{ height: 40, width: width * 0.25 }}
              mode='outlined'
              value={fila.talla}
              onChangeText={text => {
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
              onChangeText={text => {
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
              onChangeText={text => {
                const nuevasFilas = [...filas];
                nuevasFilas[index].color = text;
                setFilas(nuevasFilas);
              }}
            />

            <TouchableOpacity onPress={() => handleEliminarFila(fila.id)}>
              <Icon name='trash' size={20} color='red' />
            </TouchableOpacity>
          </View>
        ))}

        <TouchableOpacity
          className='flex-row gap-2 justify-center items-center mt-2'
          onPress={handleAgregarFila}
        >
          <Text className='text-lg'>Agregar</Text>
          <Icon name='plus-circle' size={20} />
        </TouchableOpacity>
        <Text className='font-bold mt-4 text-lg mx-auto'>
          Detalle de la orden
        </Text>
        <View className='mt-2 gap-2'>
          <TextInput
            label='Taco'
            mode='outlined'
            placeholder='Nombre de taco'
            placeholderTextColor={'gray'}
            value={nombreTaco}
            onChangeText={setNombreTaco}
            className='rounded-lg h-10'
          />
        </View>
        <View className='mt-2 flex-row items-center gap-8'>
          <Text className='font-bold'>Altura de taco:</Text>
          <ModalSelector
            data={opcionesTaco}
            accessible={true}
            onChange={talla => setTallaTaco(talla.key)}
            supportedOrientations={['landscape']}
            cancelText='Cancelar'
            cancelStyle={styles.cancelButton}
            cancelTextStyle={styles.cancelText}
          >
            <TextInput
              editable={false}
              placeholder='Seleccione una talla'
              placeholderTextColor={'black'}
              style={{ height: 40 }}
              value={tallaTaco}
              className='bg-gray-200 rounded-lg font-bold'
            />
          </ModalSelector>
        </View>
        <View className='gap-2 mt-2 mb-4'>
          <ModalSelector
            data={opcionesMaterial}
            accessible={true}
            onChange={material => {
              setMaterial(material.label);
            }}
            supportedOrientations={['landscape']}
            cancelText='Cancelar'
          >
            <TextInput
              label={'Material'}
              mode='outlined'
              editable={false}
              value={material}
            />
          </ModalSelector>
          <ModalSelector
            data={opcionesTipoMaterial}
            accessible={true}
            onChange={tipoMaterial => {
              setTipoMaterial(tipoMaterial.label);
            }}
            supportedOrientations={['landscape']}
            cancelText='Cancelar'
          >
            <TextInput
              label={'Tipo de Material'}
              mode='outlined'
              editable={false}
              value={tipoMaterial}
            />
          </ModalSelector>
          <TextInput
            label={'Suela'}
            mode='outlined'
            value={suela}
            placeholder='Suela'
            onChangeText={setSuela}
          />
          <TextInput
            label={'Accesorios'}
            mode='outlined'
            multiline={true}
            numberOfLines={1}
            value={accesorios}
            placeholder='Digite los accesorios'
            onChangeText={setAccesorios}
          />
          <TextInput
            label={'Forro'}
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
        <View className='mb-32'></View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  cancelButton: {
    backgroundColor: '#ff4444', // Rojo
    padding: 10,
    borderRadius: 5,
  },
  cancelText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
});
