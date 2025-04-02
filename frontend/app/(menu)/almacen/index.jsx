import React, { useEffect, useState } from 'react'
import { ScrollView, Text, View, Pressable,Alert, FlatList } from 'react-native'
import { useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { Switch, Card, Divider } from 'react-native-paper';
import {useFonts} from "expo-font";
import { CameraView, useCameraPermissions } from 'expo-camera';

import CajaService from '@/services/CajaService';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import Icon3 from 'react-native-vector-icons/MaterialCommunityIcons';
import { Image } from 'expo-image';
import IngresoService from '@/services/IngresoService';

SplashScreen.preventAutoHideAsync();

export default function Almacen(){

  const router = useRouter();
  const [facing, setFacing] = useState('back');
  const [permission, requestPermission]=useCameraPermissions();
  const [qrLeido, setQrLeido] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [showRegisters, setShowRegisters] = useState(true);
  const [idCaja, setIdCaja] = useState(null);
  const [almacenSeleccionado, setAlmacenSeleccionado] = useState("");
  const [caja, setCaja] = useState([]);
  const [loaded, error] = useFonts({
      'Inter-Black': require('../../../assets/fonts/DMSans-Regular.ttf'),
      'Inter-Light': require('../../../assets/fonts/DMSans-Light.ttf'),
  });

  useEffect(() => {
    if(idCaja!==null){
      const handleVerificarIngreso = async () => {
        try {
          const verificarIngreso = await IngresoService.obtenerIngreso(idCaja);
          console.log("verificarIngreso", verificarIngreso);
          if(verificarIngreso.ingreso===null){
            const Datacaja = await cargarCajaPorId(idCaja);
            console.log("Datacaja", Datacaja);
            caja.push(Datacaja.caja);
          }
          else{
            Alert.alert("Caja ya ingresada", "La caja ya ha sido ingresada al almacén");
          }
          setIdCaja(null);
        } catch (error) {
          mostrarError(error);
        }
      }
      handleVerificarIngreso();
    }
  }, [idCaja]);

  useEffect(() => {
      if (loaded || error) {
          SplashScreen.hideAsync();
      }
  }, [loaded, error]);

  const mostrarError = (error) => {
    Alert.alert(
        "Error",
        `${error.message}`,
        [{ text: "OK" }] // Botón requerido
    );
};

  const cargarCajaPorId = async (idCaja) => {
    try {
      let id = idCaja;
      return await CajaService.getCajaById(id);
    } catch (error) {
      mostrarError(error);
    }
  }

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
          <Text style={{fontFamily:'Inter-Black', fontSize:26 }}>Permisos a Camara</Text>
        </View>
        <View className='items-center mt-8'>
          <Icon3 name="camera-off-outline" size={80} color="#634AFF" />
        </View>
        <View className='mx-4 mt-8'>
          <Text style={{fontFamily:'Inter-Light', fontSize:16}}>Se requiere permisos para acceder a la camara</Text>
        </View>
        <Pressable onPress={requestPermission} className='bg-gray-100 p-4 rounded-md w-[45%] mx-auto'>
          <Text style={{fontFamily:'Inter-Light', fontSize:16 , color:'#634AFF'}}>Grant permission</Text>
        </Pressable>
      </View>
    );
  }

  const toggleCameraFacing = () => {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  const handleBarcodeScanned = async ({ data }) => {
    if(qrLeido===true){
      const numeroCaja = await data.split('/').pop();
      setIdCaja(numeroCaja);
      setQrLeido(false);
    }
  };
  

  const actualizarCaja = async () => {
    try {
      let codigoPedido = caja?.codigoPedido;
      console.log("codigoPedido", codigoPedido);
      const ingreso = await IngresoService.createIngreso(idCaja, codigoPedido);
      console.log("ingreso", ingreso);
        Alert.alert("Caja actualizada", "La caja ha sido ingresada al almacén correctamente");
        setShowCamera(false);
        setShowRegisters(true);
        setQrLeido(false);
        setIdCaja(null)
        setCaja(null)
      
    } catch (error) {
      mostrarError(error);
      setShowCamera(false);
      setShowRegisters(true);
      setQrLeido(false);
      setIdCaja(null)
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
        <View className='flex-1'>
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
                <View className='p-4'>
                  <CameraView 
                    facing={facing}
                    onBarcodeScanned={qrLeido?handleBarcodeScanned:null}
                    style={{flex:1, height: [300], width: [300] }}
                    
                  >
                    <View style={{ position: 'absolute', bottom: 20, alignSelf: 'center' }}>
                      <Pressable onPress={toggleCameraFacing}>
                        <Icon name="refresh" size={32} color="white" />
                      </Pressable>
                    </View>
                  </CameraView> 
                  <View className='flex-row justify-center gap-4 mt-8'>
                      <Pressable
                        className='bg-[#3f76f5] p-4 rounded-lg'
                        onPress={()=>setQrLeido(!qrLeido)}
                      >
                        <Text className='text-white'>
                          Scanear QR
                        </Text>
                      </Pressable>
                      <Pressable
                        className='bg-[#f62e2a] p-4 rounded-lg' 
                        onPress={()=>{
                          setShowCamera(false);
                          setShowRegisters(true);
                          setQrLeido(false);
                          setIdCaja(null);
                          setCaja([]);
                        }}
                      >
                        <Text className='text-white'>
                          Cancelar
                        </Text>
                      </Pressable>
                  </View>
                  <View className='mt-4'>
                    <Card style={{ borderRadius: 10, elevation: 5, backgroundColor: 'white' }}>
                        <View className='p-2 '>
                            <View className='items-center'>
                              <Text style={{fontFamily:'Inter-Black', fontSize:18}} >Ultimo QR leido: {idCaja}</Text>
                            </View>
                            {
                              caja.length>0?(
                                <FlatList
                                  data={caja}
                                  keyExtractor={(item, index) => index}
                                  renderItem={({item}) => (
                                    <Card.Content className='flex-row gap-4 justify-between'>
                                      <View>
                                        <Text style={{fontFamily:'Inter-Black', fontSize:18}}>{item.tipoCalzado} {item.modelo}</Text>
                                        <Text style={{fontFamily:'Inter-Light', fontSize:15}}>Talla: {item.talla}</Text>
                                        <Text style={{fontFamily:'Inter-Light', fontSize:15}}>Color: {item.color}</Text>
                                        <Text style={{fontFamily:'Inter-Light', fontSize:15}}>Creada: {item.fechaCreacion}</Text>
                                      </View>
                                      <Image source={item.imagenUrl} style={{width: 100, height: 100}}/>
                                    </Card.Content>
                                  )}
                                />
                              ):null
                            }
                        </View>
                        
                    </Card>
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
