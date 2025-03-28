import React, { useEffect, useState } from 'react'
import { Text, View, Pressable,Alert } from 'react-native'
import { useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { Switch, Card, Divider } from 'react-native-paper';
import {useFonts} from "expo-font";
import { CameraView, useCameraPermissions } from 'expo-camera';

import CajaService from '@/services/CajaService';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import { Image } from 'expo-image';

SplashScreen.preventAutoHideAsync();

export default function Almacen(){

  const router = useRouter();
  const [facing, setFacing] = useState('back');
  const [permission, requestPermission]=useCameraPermissions();
  const [qrLeido, setQrLeido] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [showRegisters, setShowRegisters] = useState(true);
  const [scannedData, setScannedData] = useState(null);
  const [almacenSeleccionado, setAlmacenSeleccionado] = useState("");
  const [caja, setCaja] = useState(null);
  const [loaded, error] = useFonts({
      'Inter-Black': require('../../../assets/fonts/DMSans-Regular.ttf'),
      'Inter-Light': require('../../../assets/fonts/DMSans-Light.ttf'),
  });

  const mostrarError = (error) => {
    Alert.alert(
        "Error",
        `${error.message}`,
        [{ text: "OK" }] // Botón requerido
    );
};
  useEffect(() => {
    if(scannedData !== null){
      const cargarCajaPorId = async () => {
        try {
          let id = Number(scannedData);
          const caja = await CajaService.getCajaById(id);
          setCaja(caja.caja);
        } catch (error) {
          mostrarError(error);
        }
      }
      cargarCajaPorId();
    }
  }, [scannedData])

  useEffect(() => {
      if (loaded || error) {
          SplashScreen.hideAsync();
      }
  }, [loaded, error]);
  
  if (!loaded && !error) {
    return null;
  }
  


  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View>
        <Text>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  const toggleCameraFacing = () => {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  const handleBarcodeScanned = async ({ data }) => {
    const numeroCaja = await data.split('/').pop();

    setScannedData(numeroCaja);
    setQrLeido(true);
    // Aquí puedes agregar cualquier lógica adicional que necesites después de escanear el código QR
  };

  const actualizarCaja = async () => {
    try {
      let id = Number(scannedData);
      const caja = await CajaService.updateCaja(id);
      if(caja.status === 200){
        Alert.alert("Caja actualizada", "La caja ha sido actualizada correctamente");
        setShowCamera(false);
        setShowRegisters(true);
        setQrLeido(false);
        setScannedData(null)
        setCaja(null)
      }
    } catch (error) {
      mostrarError(error);
      setShowCamera(false);
      setShowRegisters(true);
      setQrLeido(false);
      setScannedData(null)
      setCaja(null)
    }
  }

  return (
    <View className='bg-white h-full'>
      {/* SELECCIONAR ALMACEN */}
      { almacenSeleccionado===""?(
        <>
          <View className='mx-4 mt-8'>
            <Text style={{fontFamily:'Inter-Light', fontSize:28 }} className='text-black'>Selecciona un almacen</Text>
          </View>
          <View className='w-full m-4 mt-4 flex flex-row gap-4'>
              <Pressable className='bg-gray-50 rounded-md p-4 w-[45%] gap-4' onPress={()=>setAlmacenSeleccionado("fabrica")}>
                  <View>
                      <Icon2 name="warehouse" size={24} color="#634AFF" />
                  </View>
                  <View>
                      <Text style={{ fontFamily:'Inter-Black', fontSize:16 }} className='text-[#000111]'>Almacén Fábrica</Text>
                  </View>
              </Pressable>
              <Pressable className='bg-gray-50 rounded-md p-4 w-[45%] gap-4' onPress={()=>setAlmacenSeleccionado("trujillo")}>
                  <View>
                      <Icon2 name="warehouse" size={24} color="#634AFF" />
                  </View>
                  <View>
                      <Text style={{ fontFamily:'Inter-Black', fontSize:16 }} className='text-[#000111]'>Almacén Trujillo</Text>
                  </View>
              </Pressable>
          </View>
        </>
      )
      :
      (
        <View className='h-full'>
          <View>
          {
            !showCamera?(
              <View className='mx-4 mt-6 '>
                <Text style={{fontFamily:'Inter-Black', fontSize:26 }}>Almacén {almacenSeleccionado}</Text>
              </View>
            ):null
          }
          </View>
          <View className='flex-row justify-between p-4'>
            <Text className='font-normal text-2xl'>Camara</Text>
            <Switch value={showCamera} onValueChange={setShowCamera} disabled={true}/>
          </View>
          {/* CAMARA */}
            {
              showCamera&&(
                <View className='p-4 h-[70%]'>
                  <CameraView 
                    facing={facing}
                    onBarcodeScanned={qrLeido?null:handleBarcodeScanned}
                    style={{flex:1 }}
                  >
                    <View style={{ position: 'absolute', bottom: 20, alignSelf: 'center' }}>
                      <Pressable onPress={toggleCameraFacing}>
                        <Icon name="refresh" size={32} color="white" />
                      </Pressable>
                    </View>
                  </CameraView> 
                  {scannedData && (
                    <View className='mt-4'>
                      <Card style={{ borderRadius: 10, elevation: 5, backgroundColor: 'white' }}>
                          <View className='p-2 '>
                              <View className='items-center'>
                                <Text style={{fontFamily:'Inter-Black', fontSize:18}} >N° QR: {scannedData}</Text>
                              </View>
                              {
                                caja!==null?(
                                  <Card.Content className='flex-row gap-4 justify-between'>
                                    <View>
                                      <Text style={{fontFamily:'Inter-Black', fontSize:18}}>{caja.tipoCalzado} {caja.modelo}</Text>
                                      <Text style={{fontFamily:'Inter-Light', fontSize:15}}>Talla: {caja.talla}</Text>
                                      <Text style={{fontFamily:'Inter-Light', fontSize:15}}>Color: {caja.color}</Text>
                                      <Text style={{fontFamily:'Inter-Light', fontSize:15}}>Creada: {caja.fechaCreacion}</Text>
                                    </View>
                                    <Image source={caja.imagenUrl} style={{width: 100, height: 100}}/>
                                  </Card.Content>
                                ):null
                              }
                          </View>
                          
                      </Card>
                    </View>
                  )}
                  <View className='flex-row justify-center gap-4 mt-8'>
                      <Pressable
                        className='bg-[#3f76f5] p-4 rounded-lg'
                        onPress={actualizarCaja}
                      >
                        <Text className='text-white'>
                          Ingresar
                        </Text>
                      </Pressable>
                      <Pressable
                        className='bg-[#f62e2a] p-4 rounded-lg' 
                        onPress={()=>{
                          setShowCamera(false);
                          setShowRegisters(true);
                          setQrLeido(false);
                          setScannedData(null);
                          setCaja(null)
                        }}
                      >
                        <Text className='text-white'>
                          Cancelar
                        </Text>
                      </Pressable>
                  </View>
                  
                </View>
                
              )
              
            }
          {
            showRegisters?(
              <View className='flex-row justify-center gap-4'>
                  <Pressable
                    className='bg-[#634AFF] p-4 rounded-lg w-[45%] gap-1'
                    onPress={()=>{
                    setShowRegisters(false);
                    setShowCamera(true);}}
                  >
                    <Icon2 name="plus" size={24} color="white" />
                    <Text className='text-white' style={{fontFamily:'Inter-Light', fontSize:16}}>
                      Registrar Ingreso
                    </Text>
                  </Pressable>
                  <Pressable
                    className='bg-gray-100 p-4 rounded-lg w-[45%] gap-1' 
                    onPress={()=>{
                    setShowRegisters(false);
                    setShowCamera(true);}}
                  >
                    <Icon2 name="minus" size={24} color="#634AFF" />
                    <Text className='text-[#634AFF]' style={{fontFamily:'Inter-Light', fontSize:16}}>
                      Registrar Salida
                    </Text>
                  </Pressable>
              </View>
            ):null
          }
        </View>
      )}
      
    </View>
    
  )
}
