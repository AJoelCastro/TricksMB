import React from 'react';
import { View, Text } from 'react-native'
import { useFocusEffect } from '@react-navigation/native';
import { useLocalSearchParams } from 'expo-router';
import * as ScreenOrientation from 'expo-screen-orientation';
const Perfilado = () => {
  const {codigoOrden} = useLocalSearchParams();
  console.log(codigoOrden);
  const lockOrientation = async () => {
    await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT
    );
  };

  // Función para restablecer la orientación al salir
  const resetOrientation = async () => {
      await ScreenOrientation.unlockAsync();
  };

    // Efecto al enfocar la pestaña
  useFocusEffect(
      React.useCallback(() => {
          lockOrientation();
          // Resetear al salir de la pestaña
          return () => {
          resetOrientation();
          };
      }, [])
  );
  return (
    <View>
      <Text>perfilado</Text>
    </View>
  )
}

export default Perfilado;