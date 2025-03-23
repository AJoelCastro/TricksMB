import { CameraView, useCameraPermissions } from 'expo-camera';
import { Image } from 'expo-image';
import { useState } from 'react';
import { Button, Pressable, Text, TouchableOpacity, View } from 'react-native';
import { Switch, Card } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
const Inventario=() =>{
  const [facing, setFacing] = useState('back');
  const [permission, requestPermission]=useCameraPermissions();
  console.log("permission", permission);
  const [qrLeido, setQrLeido] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [showRegisters, setShowRegisters] = useState(true);
  const [scannedData, setScannedData] = useState(null);
  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View >
        <Text >We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  const toggleCameraFacing = () => {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  const handleBarcodeScanned = ({ data }) => {
    const numeroCaja = data.split('/').pop();
    setScannedData(numeroCaja);
    setQrLeido(true);
    // Aquí puedes agregar cualquier lógica adicional que necesites después de escanear el código QR
  };
  return (
    <View className='flex-1'>
      <View className='flex-row justify-between p-4'>
        <Text className='font-normal text-2xl'>Camara</Text>
        <Switch value={showCamera} onValueChange={setShowCamera} disabled={showRegisters?true: true}/>
      </View>
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
                    onPress={()=>{
                    }}
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
  );
}
export default Inventario;
