import React from 'react';
import { Button, Alert } from 'react-native';

function Post() {
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;

  async function onPress() {
    try {
      const response = await fetch(`${apiUrl}/ruta`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: 'ejemplo' }),
      });

      if (!response.ok) {
        throw new Error('Error al realizar la solicitud');
      }

      const result = await response.json();
      Alert.alert('Éxito', `Respuesta: ${JSON.stringify(result)}`);
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  }

  return <Button onPress={onPress} title='Post' />;
}

export default Post;
