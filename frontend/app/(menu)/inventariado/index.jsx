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
        <Switch value={showCamera} onValueChange={setShowCamera} />
      </View>
      <View>
        {
          showCamera&&(
            <CameraView 
              facing={facing}
              onBarcodeScanned={qrLeido ? undefined : handreLeerQr}
            >
              <View className='h-[70%]'>
                <TouchableOpacity  onPress={toggleCameraFacing}>
                  <Text>Flip Camera</Text>
                </TouchableOpacity>
              </View>
            </CameraView>
          )
          
        }
      </View>
      {
        showRegisters?(
          <View className='flex-row justify-center gap-4'>
            <View className="bg-[#634AFF] p-4 rounded-lg">
              <Pressable onPress={()=>setShowRegisters(false)}>
                <Text className='text-white'>
                  Registrar Ingreso
                </Text>
              </Pressable>
            </View>
            <View className="bg-[#634AFF] p-4 rounded-lg">
              <Pressable>
                <Text className='text-white'>
                  Registrar Salida
                </Text>
              </Pressable>
            </View>
          </View>
        ):null
      }
      
    </View>
  );
}
export default Inventario;
