import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useFocusEffect } from '@react-navigation/native';
import { TextInput } from 'react-native-paper';
import "../../../../../global.css";

const corte = () => {
  const getFechaActualizacion= () => {
            const date = new Date();
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0'); // Meses van de 0 a 11
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`; // Formato: YYYY-MM-DD
        };
  const [fechaActualizacion] = useState(getFechaActualizacion());
  
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
    <View className='p-2'>
      <View className='flex-row items-center gap-2'>
        <TextInput label={"Codigo"} mode='outlined' style={{width: '50%'}}>
        </TextInput>
        <TextInput label={"Modelo" } mode='outlined' style={{width: '48%'}}>
        </TextInput>
      </View>
      <View className='flex-row items-center gap-2'>
        <TextInput label={"Fecha creación"} mode='outlined' style={{width: '50%'}} editable={false}>
        </TextInput>
        <TextInput label={"Fecha de actualizacion"} mode='outlined' style={{width:'48%'}} editable={false} value={fechaActualizacion}>
        </TextInput>
      </View>
    </View>
  )
}

export default corte