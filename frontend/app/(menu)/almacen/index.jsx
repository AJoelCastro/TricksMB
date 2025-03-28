import React, { useEffect, useState } from 'react'
import { Text, View, Pressable,Alert } from 'react-native'
import { useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { Switch, Card } from 'react-native-paper';
import {useFonts} from "expo-font";
import { CameraView, useCameraPermissions } from 'expo-camera';

import CajaService from '@/services/CajaService';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/FontAwesome5';

SplashScreen.preventAutoHideAsync();

export default function Almacen(){

  const route = useRouter();
  const [facing, setFacing] = useState('back');
  const [permission, requestPermission]=useCameraPermissions();
  const [qrLeido, setQrLeido] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [showRegisters, setShowRegisters] = useState(true);
  const [scannedData, setScannedData] = useState(null);
  const [almacenSeleccionado, setAlmacenSeleccionado] = useState("");
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
          console.log("caja", caja);
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
          <View className='flex-row justify-between p-4'>
            <Text className='font-normal text-2xl'>Camara</Text>
            <Switch value={showCamera} onValueChange={setShowCamera} disabled={true}/>
          </View>
          {/* CAMARA */}
            {
              showCamera&&(
                <View className='p-4 h-[50%]'>
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
                      <Card style={{ borderRadius: 10, elevation: 5 }}>
                          <View className='p-2'>
                              <Card.Content>
                                <Text className='text-center' variant="titleMedium">QR LEIDO: {scannedData}</Text>
                              </Card.Content>
                          </View>
                          
                      </Card>
                    </View>
                  )}
                  <View className='flex-row justify-center gap-4 mt-8'>
                      <Pressable
                        className='bg-[#3f76f5] p-4 rounded-lg'
                        onPress={null}
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
                          setScannedData(null)
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
                    className='bg-[#634AFF] p-4 rounded-lg'
                    onPress={()=>{
                    setShowRegisters(false);
                    setShowCamera(true);}}
                  >
                    <Text className='text-white'>
                      Registrar Ingreso
                    </Text>
                  </Pressable>
                  <Pressable
                    className='bg-[#634AFF] p-4 rounded-lg' 
                    onPress={()=>{
                    setShowRegisters(false);
                    setShowCamera(true);}}
                  >
                    <Text className='text-white'>
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
