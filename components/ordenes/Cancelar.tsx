import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { TextInput, Icon } from 'react-native-paper';

import { ThemedView } from '../ThemedView';
import { ThemedText } from '../ThemedText';

import { useThemeColor } from '@/hooks/useThemeColor';
import { Colors } from '@/constants/Colors';

export default function Cancelar() {
    const [codigo, setCodigo] = useState<string>('');
    const [resultado, setResultado] = useState<string | null>(null);
    const backgroundColor = useThemeColor(
    { light: Colors.light.background, dark: Colors.dark.background },
    'background'
    );
    const textColor = useThemeColor(
        { light: Colors.light.text, dark: Colors.dark.text },
        'text'
    );
    const iconColor = useThemeColor(
        { light: Colors.light.icon, dark: Colors.dark.icon },
        'icon'
    );
    const tabColor = useThemeColor(
        { light: Colors.light.tabIconSelected, dark: Colors.dark.tabIconSelected },
        'tabIconSelected'
    );
    const backIconColor = useThemeColor(
        { light: Colors.light.backIcon, dark: Colors.dark.backIcon },
        'backIcon'
    );
    const contentColor = useThemeColor(
        { light: Colors.light.content, dark: Colors.dark.content },
        'content'
    );

  const mostrarAlerta = () => {
    Alert.alert(
      'Confirmar acción',
      '¿Estás seguro de que deseas cancelar la orden?',
      [
        {
          text: 'No',
          onPress: () => setResultado('No'),
          style: 'cancel',
        },
        {
          text: 'Sí',
          onPress: () => setResultado('Sí'),
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <ThemedView className="justify-center items-center p-4" >
      <ThemedView className="w-full max-w-md p-6 rounded-2xl shadow-sm" style={{ backgroundColor: contentColor }}>
        <ThemedText className="text-2xl font-semibold text-center">
          Cancelar Orden
        </ThemedText>

        <ThemedText className="font-medium my-2">Código de Orden</ThemedText>

        <TextInput
          mode="outlined"
          placeholder="Ingrese el código de orden"
          value={codigo}
          onChangeText={setCodigo}
          right={<TextInput.Icon icon="magnify" color={iconColor} />}
          style={{ backgroundColor: backgroundColor, marginVertical: 10 }}
        />

        <TouchableOpacity
          className="flex-row items-center justify-center py-3 rounded-xl shadow-md my-2"
          onPress={mostrarAlerta}
          style={{ backgroundColor: backIconColor }}
        >
          <Icon source="close-circle" size={20} color={iconColor} />
          <ThemedText className="text-lg font-bold">Cancelar Orden</ThemedText>
        </TouchableOpacity>

        {resultado && (
          <ThemedText className="text-center">Respuesta: {resultado}</ThemedText>
        )}
      </ThemedView>
    </ThemedView>
  );
}
