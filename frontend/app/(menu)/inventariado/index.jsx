import { CameraView, useCameraPermissions } from 'expo-camera';
import { Image } from 'expo-image';
import { useState } from 'react';
import { Button, Pressable, Text, TouchableOpacity, View } from 'react-native';
import { Switch } from 'react-native-paper';

const Inventario=() =>{
  const [facing, setFacing] = useState('back');
  const [permission, requestPermission]=useCameraPermissions();
  console.log("permission", permission);
  const [qrLeido, setQrLeido] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [showRegisters, setShowRegisters] = useState(true);
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

  const handreLeerQr = () => {
    
  }
  return (
    <View className='flex-1'>
      <View className='flex-row justify-between p-4'>
        <Text className='font-normal text-2xl'>Abrir camara</Text>
        <Switch value={showCamera} onValueChange={setShowCamera} disabled={!showRegisters}/>
      </View>
        {
          showCamera&&(
            <View className='p-4 h-[50%]'>
              <CameraView 
                facing={facing}
                onBarcodeScanned={qrLeido ? undefined : handreLeerQr}
                style={{flex:1, justifyContent:'center', alignItems:'center', }}
              >
              </CameraView>
              <View className='flex-row justify-center gap-4 mt-8'>
                  <Pressable
                    className='bg-[#3f76f5] p-4 rounded-lg'
                    onPress={()=>{
                    setShowRegisters(false);
                    setShowCamera(true);}}
                  >
                    <Text className='text-white'>
                      Capturar
                    </Text>
                  </Pressable>
                  <Pressable
                    className='bg-[#f62e2a] p-4 rounded-lg' 
                    onPress={()=>{
                    setShowRegisters(false);
                    setShowCamera(true);}}
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
