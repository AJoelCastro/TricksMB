import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useState } from 'react';
import { Button, Text, TouchableOpacity, View } from 'react-native';

const Inventario=() =>{
  const [facing, setFacing] = useState('back');
  console.log("facing");
  const [permission, requestPermission]=useCameraPermissions();
  console.log("permission", permission);
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

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  return (
    <View className='flex-1'>
      <View>
        <CameraView 
          facing={facing}
          onBarcodeScanned={({data}) => console.log(data)}
        >
          <View className='h-[70%]'>
            <TouchableOpacity  onPress={toggleCameraFacing}>
              <Text>Flip Camera</Text>
            </TouchableOpacity>
          </View>
        </CameraView>
      </View>
    </View>
  );
}
export default Inventario;
