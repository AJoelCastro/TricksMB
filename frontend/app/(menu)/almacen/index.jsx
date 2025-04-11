import React, { useCallback, useEffect, useState } from 'react';
import {
  ScrollView,
  Text,
  View,
  Pressable,
  Alert,
  FlatList,
} from 'react-native';
import { useFocusEffect, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { Switch, Card, Divider } from 'react-native-paper';
import { useFonts } from 'expo-font';
import { CameraView, useCameraPermissions } from 'expo-camera';

import CajaService from '@/services/CajaService';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import Icon3 from 'react-native-vector-icons/MaterialCommunityIcons';
import { Image } from 'expo-image';
import IngresoService from '@/services/IngresoService';
import DetalleAlmacenService from '@/services/DetalleAlmacenService';
import AlmacenService from '@/services/AlmacenService';

SplashScreen.preventAutoHideAsync();

export default function Almacen() {
  const router = useRouter();
  const [facing, setFacing] = useState('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [qrLeido, setQrLeido] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [showRegisters, setShowRegisters] = useState(true);
  const [idCaja, setIdCaja] = useState(null);
  const [almacenes, setAlmacenes] = useState(null);
  const [almacenSeleccionado, setAlmacenSeleccionado] = useState('');
  const [caja, setCaja] = useState([]);
  const [loaded, error] = useFonts({
    'Inter-Black': require('../../../assets/fonts/DMSans-Regular.ttf'),
    'Inter-Light': require('../../../assets/fonts/DMSans-Light.ttf'),
  });

  useEffect(() => {
    if (idCaja !== null) {
      const handleVerificarIngreso = async () => {
        try {
          const verificarIngreso = await IngresoService.obtenerIngreso(idCaja);
          if (verificarIngreso.ingreso === null) {
            const Datacaja = await cargarCajaPorId(idCaja);
            const exists = caja.some(
              item =>
                item.idCaja === Datacaja.caja.idCaja ||
                item.codigoPedido !== Datacaja.caja.codigoPedido
            );
            if (!exists) {
              caja.push(Datacaja.caja);
            } else {
              Alert.alert('Error', 'La caja ya ha sido leida anteriormente');
            }
          } else {
            Alert.alert('Error', 'La caja ya ha sido ingresada al almacén');
          }
          setIdCaja(null);
        } catch (error) {
          mostrarError(error);
        }
      };
      handleVerificarIngreso();
    }
  }, [idCaja]);

  useFocusEffect(
    useCallback(() => {
      const obtenerAlmacenes = async () => {
        try {
          const dataAlmacenes = await AlmacenService.getAllAlmacenes();
          setAlmacenes(dataAlmacenes.almacen);
        } catch (error) {
          mostrarError(error);
        }
      };
      obtenerAlmacenes();
    },[])
    
  )
  

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  const mostrarError = error => {
    Alert.alert(
      'Error',
      `${error.message}`,
      [{ text: 'OK' }] // Botón requerido
    );
  };

  const cargarCajaPorId = async idCaja => {
    try {
      let id = idCaja;
      return await CajaService.getCajaById(id);
    } catch (error) {
      mostrarError(error);
    }
  };

  if (!loaded && !error) {
    return null;
  }

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View className='bg-white h-full p-2'>
        <View className='mx-2 mt-6'>
          <Text style={{ fontFamily: 'Inter-Black', fontSize: 26 }}>
            Permisos a Camara
          </Text>
        </View>
        <View className='items-center mt-8'>
          <Icon3 name='camera-off-outline' size={80} color='#634AFF' />
        </View>
        <View className='mx-4 mt-8'>
          <Text style={{ fontFamily: 'Inter-Light', fontSize: 16 }}>
            Se requiere permisos para acceder a la camara
          </Text>
        </View>
        <Pressable
          onPress={requestPermission}
          className='bg-gray-100 p-4 rounded-md w-[45%] mx-auto'
        >
          <Text
            style={{
              fontFamily: 'Inter-Light',
              fontSize: 16,
              color: '#634AFF',
            }}
          >
            Grant permission
          </Text>
        </Pressable>
      </View>
    );
  }

  const toggleCameraFacing = () => {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  };

  const handleBarcodeScanned = async ({ data }) => {
    if (qrLeido === true) {
      const numeroCaja = await data.split('/').pop();
      setIdCaja(numeroCaja);
      setQrLeido(false);
    }
  };

  const actualizarCaja = async () => {
    try {
      let codigoPedido = caja[0].codigoPedido;
      let nombreAlmacen = almacenSeleccionado;
      const actualizarAlmacen = await DetalleAlmacenService.updateAlmacen(codigoPedido, nombreAlmacen);
      console.log(actualizarAlmacen);
      for (const caj of caja) {
        let idCaja = caj.idCaja;
        await IngresoService.createIngreso(idCaja, codigoPedido);
      }
      let cantidad = caja.length;
      const actualizar = await DetalleAlmacenService.updateCantidadIngreso(codigoPedido, cantidad);
      console.log(actualizar);
      Alert.alert(
        'Ingreso exitoso',
        'Las cajas han sido ingresadas al almacén correctamente'
      );
      setShowCamera(false);
      setShowRegisters(true);
      setQrLeido(false);
      setIdCaja(null);
      setCaja([]);
    } catch (error) {
      mostrarError(error);
      setShowCamera(false);
      setShowRegisters(true);
      setQrLeido(false);
      setIdCaja(null);
      setCaja([]);
    }
  };

  return (
    <ScrollView className='bg-white h-full'>
      {/* SELECCIONAR ALMACEN */}
      {almacenSeleccionado === '' ? (
        <>
          <View className='mx-4 mt-8'>
            <Text
              style={{ fontFamily: 'Inter-Light', fontSize: 24 }}
              className='text-black'
            >
              SELECCIONA UN ALMACEN
            </Text>
          </View>
          <ScrollView className=' w-full mt-4 gap-4'>
            {
              almacenes?.map((almacen, index) => (
                <Card key={index} style={{ padding:4, marginTop:4, backgroundColor:'white' }}>
                  <Pressable
                    className=' p-4 rounded-lg flex-row gap-4 justify-between'
                    onPress={() => setAlmacenSeleccionado(almacen.nombre)}
                  >
                    <View className='flex-1 justify-center'>
                      <Text
                        className='text-black mt-2'
                        style={{ fontFamily: 'Inter-SemiBold', fontSize: 16 }}
                      >
                        Nombre: {almacen.nombre}
                      </Text>
                      <Text
                        className='text-black mt-2'
                        style={{ fontFamily: 'Inter-Regular', fontSize: 16 }}
                      >
                        Stock total: {almacen.stock}
                      </Text>
                    </View>
                    <View>
                      <Image
                        source={{ uri: almacen.imagen }}
                        style={{ width: 180, height: 180, borderRadius: 10  }}
                      />
                    </View>
                  </Pressable>
                </Card>
              ))
            }
          </ScrollView>
        </>
      ) : (
        <View className='flex-1'>
          <View>
            {!showCamera ? (
              <View className='mx-4 mt-6 '>
                <Text style={{ fontFamily: 'Inter-Black', fontSize: 26 }}>
                  Almacén {almacenSeleccionado}
                </Text>
              </View>
            ) : null}
          </View>
          <View className='flex-row justify-between p-4'>
            <Text className='font-normal text-2xl'>Camara</Text>
            <Switch
              value={showCamera}
              onValueChange={setShowCamera}
              disabled={true}
            />
          </View>
          {/* CAMARA */}
          {showCamera && (
            <View className='p-4'>
              <CameraView
                facing={facing}
                onBarcodeScanned={qrLeido ? handleBarcodeScanned : null}
                style={{
                  flex: 1,
                  height: 300,
                  width: 300,
                  alignSelf: 'center',
                }}
              >
                <View
                  style={{
                    position: 'absolute',
                    bottom: 20,
                    alignSelf: 'center',
                  }}
                >
                  <Pressable onPress={toggleCameraFacing}>
                    <Icon name='refresh' size={32} color='white' />
                  </Pressable>
                </View>
              </CameraView>
              <View className='flex-row justify-center gap-4 mt-8'>
                <Pressable
                  className='bg-[#634AFF] p-4 rounded-lg w-[45%]'
                  onPress={() => setQrLeido(!qrLeido)}
                >
                  <Text
                    className='text-white text-center'
                    style={{ fontFamily: 'Inter-Light', fontSize: 16 }}
                  >
                    Scanear QR
                  </Text>
                </Pressable>
              </View>
              {caja.length > 0 ? (
                <View className='mt-4'>
                  <Card
                    style={{
                      borderRadius: 10,
                      elevation: 5,
                      backgroundColor: 'white',
                    }}
                  >
                    <View className='p-2 '>
                      <View className='items-center'>
                        <Text
                          style={{ fontFamily: 'Inter-Black', fontSize: 18 }}
                        >
                          Ultimos QR leidos
                        </Text>
                      </View>
                      {caja.map(item => (
                        <View key={item.idCaja}>
                          <View className='m-2'>
                            <Card.Content className='flex-row gap-4 justify-between'>
                              <View>
                                <Text
                                  style={{
                                    fontFamily: 'Inter-Black',
                                    fontSize: 18,
                                  }}
                                >
                                  {item.tipoCalzado} {item.modelo}
                                </Text>
                                <Text
                                  style={{
                                    fontFamily: 'Inter-Light',
                                    fontSize: 15,
                                  }}
                                >
                                  Caja: {item.idCaja}
                                </Text>
                                <Text
                                  style={{
                                    fontFamily: 'Inter-Light',
                                    fontSize: 15,
                                  }}
                                >
                                  Talla: {item.talla}
                                </Text>
                                <Text
                                  style={{
                                    fontFamily: 'Inter-Light',
                                    fontSize: 15,
                                  }}
                                >
                                  Color: {item.color}
                                </Text>
                                <Text
                                  style={{
                                    fontFamily: 'Inter-Light',
                                    fontSize: 15,
                                  }}
                                >
                                  Creada: {item.fechaCreacion}
                                </Text>
                              </View>
                              <Image
                                source={item.imagenUrl}
                                style={{ width: 100, height: 100 }}
                              />
                            </Card.Content>
                            <Divider />
                          </View>
                        </View>
                      ))}
                    </View>
                  </Card>
                  <View className='flex-row justify-center gap-4 my-6'>
                    <Pressable
                      className='bg-[#634AFF] p-4 rounded-lg w-[45%] justify-center'
                      onPress={actualizarCaja}
                    >
                      <Text
                        className='text-white text-center'
                        style={{ fontFamily: 'Inter-Light', fontSize: 16 }}
                      >
                        Ingresar
                      </Text>
                    </Pressable>
                    <Pressable
                      className='bg-[#f62e2a] p-4 rounded-lg w-[45%] justify-center'
                      onPress={() => {
                        setShowCamera(false);
                        setShowRegisters(true);
                        setQrLeido(false);
                        setIdCaja(null);
                        setCaja([]);
                      }}
                    >
                      <Text
                        className='text-white text-center '
                        style={{ fontFamily: 'Inter-Light', fontSize: 16 }}
                      >
                        Cancelar
                      </Text>
                    </Pressable>
                  </View>
                </View>
              ) : null}
            </View>
          )}
          {showRegisters ? (
            <View className='flex-row justify-center gap-4'>
              <Pressable
                className='bg-[#634AFF] p-4 rounded-lg w-[45%] gap-1'
                onPress={() => {
                  setShowRegisters(false);
                  setShowCamera(true);
                }}
              >
                <Icon2 name='plus' size={24} color='white' />
                <Text
                  className='text-white'
                  style={{ fontFamily: 'Inter-Light', fontSize: 16 }}
                >
                  Registrar Ingreso
                </Text>
              </Pressable>
              <Pressable
                className='bg-gray-100 p-4 rounded-lg w-[45%] gap-1'
                onPress={() => {
                  setShowRegisters(false);
                  setShowCamera(true);
                }}
              >
                <Icon2 name='minus' size={24} color='#634AFF' />
                <Text
                  className='text-[#634AFF]'
                  style={{ fontFamily: 'Inter-Light', fontSize: 16 }}
                >
                  Registrar Salida
                </Text>
              </Pressable>
            </View>
          ) : null}
        </View>
      )}
    </ScrollView>
  );
}
