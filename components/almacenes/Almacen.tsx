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
import { Switch, Card, Divider, Icon } from 'react-native-paper';
import { useFonts } from 'expo-font';
import { CameraView, useCameraPermissions, CameraType } from 'expo-camera';
import { Image } from 'expo-image';


import CajaService from '@/services/CajaService';
import IngresoService from '@/services/IngresoService';
import DetalleAlmacenService from '@/services/DetalleAlmacenService';
import AlmacenService from '@/services/AlmacenService';
import SalidaService from '@/services/SalidaService';
import { ThemedView } from '../ThemedView';
import { ThemedText } from '../ThemedText';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Colors } from '@/constants/Colors';
// Type definitions
type TipoFlujo = 'Ingreso' | 'Salida' | null;
type Almacen = {
  nombre: string;
  stock: number;
  imagen: string;
};
type Caja = {
  idCaja: number;
  codigoPedido: string;
  tipoCalzado: string;
  modelo: string;
  talla: string;
  color: string;
  fechaCreacion: string;
  imagenUrl: string;
};

SplashScreen.preventAutoHideAsync();

export default function AlmacenAdmin() {

  const router = useRouter();

  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [qrLeido, setQrLeido] = useState<boolean>(false);
  const [showCamera, setShowCamera] = useState<boolean>(false);
  const [showRegisters, setShowRegisters] = useState<boolean>(true);
  const [idCaja, setIdCaja] = useState<number | null>(null);
  const [almacenes, setAlmacenes] = useState<Almacen[] | null>(null);
  const [almacenSeleccionado, setAlmacenSeleccionado] = useState<string>('');
  const [caja, setCaja] = useState<Caja[]>([]);
  const [tipoFlujo, setTipoFlujo] = useState<TipoFlujo>(null);
  

  useEffect(() => {
    if (idCaja !== null) {
      const handleVerificarIngreso = async () => {
        try {
          if (tipoFlujo === 'Ingreso') {
            const verificarIngreso = await IngresoService.obtenerIngreso(idCaja);
            if (verificarIngreso.ingreso === null) {
              const Datacaja = await cargarCajaPorId(idCaja);
              const exists = caja.some(
                item =>
                  item.idCaja === Datacaja.caja.idCaja ||
                  item.codigoPedido !== Datacaja.caja.codigoPedido
              );
              if (!exists) {
                setCaja(prev => [...prev, Datacaja.caja]);
              } else {
                Alert.alert('Error', 'La caja ya ha sido leida anteriormente');
              }
            } else {
              Alert.alert('Error', 'La caja ya ha sido ingresada al almacén');
            }
          } else if (tipoFlujo === 'Salida') {
            const verificarSalida = await SalidaService.obtenerSalida(idCaja);
            if (verificarSalida.salida === null) {
              const Datacaja = await cargarCajaPorId(idCaja);
              const exists = caja.some(
                item =>
                  item.idCaja === Datacaja.caja.idCaja ||
                  item.codigoPedido !== Datacaja.caja.codigoPedido
              );
              if (!exists) {
                setCaja(prev => [...prev, Datacaja.caja]);
              } else {
                Alert.alert('Error', 'La caja ya ha sido leida anteriormente');
              }
            } else {
              Alert.alert('Error', 'La caja ya ha sido retirada del almacén');
            }
          }
          setIdCaja(null);
        } catch (error) {
          mostrarError(error as Error);
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
          mostrarError(error as Error);
        }
      };
      obtenerAlmacenes();
    }, [])
  );

  const mostrarError = (error: Error) => {
    Alert.alert(
      'Error',
      `${error.message}`,
      [{ text: 'OK' }]
    );
  };

  const cargarCajaPorId = async (idCaja: number) => {
    try {
      return await CajaService.getCajaById(idCaja);
    } catch (error) {
      mostrarError(error as Error);
      throw error;
    }
  };

    const backgroundColor = useThemeColor(
        { light: Colors.light.background, dark: Colors.dark.background },
        'background'
    );
    const textColor = useThemeColor(
        { light: Colors.light.text, dark: Colors.dark.text },
        'text'
    );
    const iconColor = useThemeColor(
        { light: Colors.light.icon, dark: Colors.dark.icon },
        'icon'
    );
    const tabColor = useThemeColor(
        { light: Colors.light.tabIconSelected, dark: Colors.dark.tabIconSelected },
        'tabIconSelected'
    );
    const backIconColor = useThemeColor(
        { light: Colors.light.backIcon, dark: Colors.dark.backIcon },
        'backIcon'
    );
    const contentColor = useThemeColor(
        { light: Colors.light.content, dark: Colors.dark.content },
        'content'
    );

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <ThemedView className='h-full p-2' style={{backgroundColor: backIconColor}}>
        <View className='mx-2 mt-8'>
          <ThemedText style={{ fontFamily: 'Inter-Black', fontSize: 26 }}>
            Permisos a Camara
          </ThemedText>
        </View>
        <View className='items-center mt-8'>
          <Icon source='camera-off-outline' size={80} color='#634AFF' />
        </View>
        <View className='mx-4 mt-8'>
          <ThemedText style={{ fontFamily: 'Inter-Light', fontSize: 16 }}>
            Se requiere permisos para acceder a la camara
          </ThemedText>
        </View>
        <Pressable
          onPress={requestPermission}
          className='p-4 rounded-md w-[45%] mx-auto'
          style={{ backgroundColor: backIconColor, borderColor: backIconColor, borderWidth: 1  }}
        >
          <ThemedText
            style={{
              fontFamily: 'Inter-Light',
              fontSize: 16,
            }}
          >
            Grant permission
          </ThemedText>
        </Pressable>
      </ThemedView>
    );
  }

  const toggleCameraFacing = () => {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  };

  const handleBarcodeScanned = async ({ data }: { data: string }) => {
    if (qrLeido) {
      const numeroCaja = parseInt(data.split('/').pop() || '0', 10);
      setIdCaja(numeroCaja);
      setQrLeido(false);
    }
  };

  const actualizarCajaIngreso = async () => {
    try {
      const codigoPedido = caja[0].codigoPedido;
      const nombreAlmacen = almacenSeleccionado;
      await DetalleAlmacenService.updateAlmacen(codigoPedido, nombreAlmacen);
      
      for (const caj of caja) {
        await IngresoService.createIngreso(caj.idCaja, codigoPedido);
      }
      
      const cantidad = caja.length;
      await DetalleAlmacenService.updateCantidadIngreso(codigoPedido, cantidad);
      
      Alert.alert(
        'Ingreso exitoso',
        'Las cajas han sido ingresadas al almacén correctamente'
      );
      resetState();
    } catch (error) {
      mostrarError(error as Error);
      resetState();
    }
  };

  const actualizarCajaSalida = async () => {
    try {
      const codigoPedido = caja[0].codigoPedido;
      const nombreAlmacen = almacenSeleccionado;
      await DetalleAlmacenService.updateAlmacen(codigoPedido, nombreAlmacen);
      
      for (const caj of caja) {
        await SalidaService.createSalida(caj.idCaja, codigoPedido);
      }
      
      const cantidad = caja.length;
      await DetalleAlmacenService.updateCantidadSalida(codigoPedido, cantidad);
      
      Alert.alert(
        'Retiro exitoso',
        'Las cajas han sido retiradas del almacén correctamente'
      );
      resetState();
    } catch (error) {
      mostrarError(error as Error);
      resetState();
    }
  };

  const actualizarCaja = async () => {
    try {
      if (tipoFlujo === 'Ingreso') {
        await actualizarCajaIngreso();
      } else if (tipoFlujo === 'Salida') {
        await actualizarCajaSalida();
      }
    } catch (error) {
      mostrarError(error as Error);
    }
  };

  const resetState = () => {
    setShowCamera(false);
    setShowRegisters(true);
    setQrLeido(false);
    setIdCaja(null);
    setCaja([]);
  };

  return (
    <ThemedView>
        <ScrollView className='h-full'>
        {/* SELECCIONAR ALMACEN */}
        {almacenSeleccionado === '' ? (
            <>
            <ThemedView className='mx-4 mt-8'>
                <ThemedText style={{ fontFamily: 'Inter-Light', fontSize: 24 }} >
                SELECCIONA UN ALMACEN
                </ThemedText>
            </ThemedView>
            <ScrollView className='w-full mt-4 gap-4'>
                {almacenes?.map((almacen, index) => (
                  <View key={index} style={{ 
                    padding: 4, 
                    marginTop: 4, 
                    backgroundColor: contentColor,
                    borderRadius: 8, // Añadido para simular el estilo de Card
                    shadowColor: '#000', // Opcional: para efecto de sombra similar a Card
                    shadowOffset: { width: 0, height: 2 }, // Opcional
                    shadowOpacity: 0.1, // Opcional
                    shadowRadius: 4, // Opcional
                    elevation: 3, // Opcional (para Android)
                  }}>
                    <Pressable
                      style={{ 
                        padding: 16, 
                        borderRadius: 8,
                        flexDirection: 'row',
                        gap: 16,
                        justifyContent: 'space-between'
                      }}
                      onPress={() => setAlmacenSeleccionado(almacen.nombre)}
                    >
                      <View style={{ flex: 1, justifyContent: 'center' }}>
                        <ThemedText style={{ 
                          marginTop: 8,
                          fontFamily: 'Inter-SemiBold', 
                          fontSize: 16 
                        }}>
                          Nombre: {almacen.nombre}
                        </ThemedText>
                        <ThemedText style={{ 
                          marginTop: 8,
                          fontFamily: 'Inter-Regular', 
                          fontSize: 16 
                        }}>
                          Stock total: {almacen.stock}
                        </ThemedText>
                      </View>
                      <View>
                        <Image
                          source={{ uri: almacen.imagen }}
                          style={{ width: 180, height: 180, borderRadius: 10 }}
                        />
                      </View>
                    </Pressable>
                  </View>
                ))}
            </ScrollView>
            </>
        ) : (
            <View className='flex-1'>
            <View>
                {!showCamera && (
                <View className='mx-4 mt-6'>
                    <ThemedText type='subtitle' style={{fontSize:24}}>
                    Almacén {almacenSeleccionado}
                    </ThemedText>
                </View>
                )}
            </View>
            
            <View className='flex-row justify-between p-4'>
                <ThemedText className='font-normal text-2xl'>Camara</ThemedText>
                <Switch
                value={showCamera}
                onValueChange={setShowCamera}
                disabled={true}
                />
            </View>
            
            {/* CAMARA */}
            {showCamera && (
                <View className='p-4'>
                <View style={{ position: 'relative' }}>
                  <CameraView
                    facing={facing}
                    onBarcodeScanned={qrLeido ? handleBarcodeScanned : undefined}
                    style={{
                      flex: 1,
                      height: 300,
                      width: 300,
                      alignSelf: 'center',
                    }}
                  />
                  
                  {/* Botón de refrescar posicionado absolutamente */}
                  <View style={{ 
                    position: 'absolute', 
                    bottom: 20, 
                    alignSelf: 'center',
                    width: 300, // Mismo ancho que la cámara para centrar correctamente
                    alignItems: 'center'
                  }}>
                    <Pressable onPress={toggleCameraFacing}>
                      <Icon source='refresh' size={32} color={iconColor} />
                    </Pressable>
                  </View>
                </View>
                
                <View className='flex-row justify-center gap-4 mt-8'>
                    <Pressable
                        className=' p-4 rounded-lg w-[45%]'
                        onPress={() => setQrLeido(!qrLeido)}
                        style={{ backgroundColor: backIconColor }}
                    >
                      <ThemedText className='text-center' style={{ fontFamily: 'Inter-Light', fontSize: 16 }}>
                          Scanear QR
                      </ThemedText>
                    </Pressable>
                    <Pressable
                        className=' p-4 rounded-lg w-[45%]'
                        onPress={() => {
                          setQrLeido(false)
                          setShowCamera(false)
                          setAlmacenSeleccionado('')
                          setShowRegisters(true)
                        }}
                    >
                      <ThemedText className='text-center' style={{ fontFamily: 'Inter-Light', fontSize: 16 }}>
                          Cancelar
                      </ThemedText>
                    </Pressable>
                </View>
                
                {caja.length > 0 && (
                    <View className='mt-4'>
                    <Card style={{ borderRadius: 10, elevation: 5, backgroundColor: backIconColor }}>
                        <View className='p-2'>
                        <View className='items-center'>
                            <ThemedText style={{ fontFamily: 'Inter-Black', fontSize: 18 }}>
                            Ultimos QR leidos
                            </ThemedText>
                        </View>
                        {caja.map(item => (
                            <View key={item.idCaja}>
                            <View className='m-2'>
                                <Card.Content className='flex-row gap-4 justify-between'>
                                <View>
                                    <ThemedText style={{ fontFamily: 'Inter-Black', fontSize: 18 }}>
                                    {item.tipoCalzado} {item.modelo}
                                    </ThemedText>
                                    <ThemedText style={{ fontFamily: 'Inter-Light', fontSize: 15 }}>
                                    Caja: {item.idCaja}
                                    </ThemedText>
                                    <ThemedText style={{ fontFamily: 'Inter-Light', fontSize: 15 }}>
                                    Talla: {item.talla}
                                    </ThemedText>
                                    <ThemedText style={{ fontFamily: 'Inter-Light', fontSize: 15 }}>
                                    Color: {item.color}
                                    </ThemedText>
                                    <ThemedText style={{ fontFamily: 'Inter-Light', fontSize: 15 }}>
                                    Creada: {item.fechaCreacion}
                                    </ThemedText>
                                </View>
                                <Image source={item.imagenUrl} style={{ width: 100, height: 100 }} />
                                </Card.Content>
                                <Divider />
                            </View>
                            </View>
                        ))}
                        </View>
                    </Card>
                    
                    <View className='flex-row justify-center gap-4 my-6'>
                        <Pressable
                            className=' p-4 rounded-lg w-[45%] justify-center'
                            onPress={actualizarCaja}
                            style={{ backgroundColor: backIconColor }}
                        >
                            <ThemedText className=' text-center' style={{ fontFamily: 'Inter-Light', fontSize: 16 }}>
                                {tipoFlujo === 'Ingreso' ? 'Ingresar' : 'Retirar'}
                            </ThemedText>
                        </Pressable>
                        <Pressable
                            className=' p-4 rounded-lg w-[45%] justify-center'
                            onPress={resetState}
                            style={{ backgroundColor: backIconColor }}
                        >
                            <ThemedText className='text-center' style={{ fontFamily: 'Inter-Light', fontSize: 16 }}>
                                Cancelar
                            </ThemedText>
                        </Pressable>
                    </View>
                    </View>
                )}
                </View>
            )}
            
            {showRegisters && (
                <View className='flex-row justify-center gap-4'>
                <Pressable
                    className='p-4 rounded-lg w-[45%] gap-1'
                    onPress={() => {
                        setShowRegisters(false);
                        setShowCamera(true);
                        setTipoFlujo('Ingreso');
                    }}
                    style={{ backgroundColor: backIconColor }}
                >
                    <Icon source='plus' size={24} color={iconColor} />
                    <ThemedText style={{ fontFamily: 'Inter-Light', fontSize: 16 }}>
                        Registrar Ingreso
                    </ThemedText>
                </Pressable>
                <Pressable
                    className='p-4 rounded-lg w-[45%] gap-1'
                    onPress={() => {
                        setShowRegisters(false);
                        setShowCamera(true);
                        setTipoFlujo('Salida');
                    }}
                    style={{ backgroundColor: backIconColor }}
                >
                    <Icon source='minus' size={24} color={iconColor} />
                    <ThemedText  style={{ fontFamily: 'Inter-Light', fontSize: 16 }}>
                    Registrar Salida
                    </ThemedText>
                </Pressable>
                </View>
            )}
            </View>
        )}
        </ScrollView>
    </ThemedView>
  );
}