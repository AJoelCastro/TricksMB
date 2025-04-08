import { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { TextInput } from 'react-native-paper';

import Icon from 'react-native-vector-icons/FontAwesome';

import '../../../../../global.css';

export default function cancelar() {
  const [codigo, setCodigo] = useState('');
  const [resultado, setResultado] = useState(null);
  const mostrarAlerta = () => {
    Alert.alert(
      'Confirmar acción', // Título de la alerta
      '¿Estás seguro de que deseas cancelar la orden?', // Mensaje de la alerta
      [
        {
          text: 'No',
          onPress: () => setResultado('No'),
          style: 'cancel', // Estilo del botón (opcional)
        },
        {
          text: 'Sí',
          onPress: () => setResultado('Sí'),
        },
      ],
      { cancelable: false } // Evita que la alerta se cierre al tocar fuera de ella
    );
  };
  return (
    <View className='p-2 gap-4'>
      <Text className='text-lg font-bold'>Codigo</Text>
      <TextInput
        mode='outlined'
        placeholder='Ingrese el codigo de orden'
        value={codigo}
        onChangeText={setCodigo}
        right={<TextInput.Icon icon={'magnify'} />}
      ></TextInput>
      <TouchableOpacity
        className='bg-red-500 w-[50%] mx-auto'
        onPress={mostrarAlerta}
      >
        <Text className='text-lg font-bold text-white text-center'>
          Cancelar Orden
        </Text>
      </TouchableOpacity>
    </View>
  );
}
