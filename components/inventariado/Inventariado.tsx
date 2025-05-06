import 'react-native-reanimated';
import React, { useState, useEffect, useCallback } from 'react';
import {
  Alert,
  Text,
  View,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { FlatList, GestureHandlerRootView } from 'react-native-gesture-handler';
import { Image } from 'expo-image';
import { TextInput } from 'react-native-paper';
import { useFocusEffect } from 'expo-router';

import ModeloService from '@/services/ModeloService';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Colors } from '@/constants/Colors';

import { ThemedText } from '../ThemedText';

import * as SplashScreen from 'expo-splash-screen';
// Type definitions
type InventoryItem = {
  idModelo: string;
  nombreModelo: string;
  imagen: string;
  stockDisponible: number;
  nombreAlmacen: string;
};

type CarouselImage = {
  id: string;
  url: string;
};

SplashScreen.preventAutoHideAsync();

const { width, height } = Dimensions.get('window');

const InventariadoAdmin = () => {

  const [inventario, setInventario] = useState<InventoryItem[]>([]);
  const [busqueda, setBusqueda] = useState<string | null>(null);

  useFocusEffect(
    useCallback(() => {
      const obtenerInventario = async () => {
        try {
          const inventario = await ModeloService.getInventario();
          setInventario(inventario.stock);
        } catch (error) {
          mostrarError(error as Error);
        }
      };
      obtenerInventario();
    }, [])
  );

  const mostrarError = (error: Error) => {
    Alert.alert(
      'Error',
      `${error.message}`,
      [{ text: 'OK' }]
    );
  };

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


  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={80}
        style={{ flex: 1 }}
      >
        <View style={{ backgroundColor: backgroundColor, height: '100%', padding: 8, flex: 1 }}>
          
          <View style={{ alignItems: 'center',backgroundColor: contentColor, }}>
            <Carousel
              loop
              width={width * 0.98}
              height={height * 0.3}
              autoPlay
              data={inventario}
              scrollAnimationDuration={2000}
              mode='parallax'
              renderItem={({ item }) => (
                <View key={item.idModelo} style={{ flex: 1 }}>
                  <View style={{ 
                    width: '100%', 
                    height: '100%',
                    borderRadius: 10,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 4,
                    elevation: 3,
                    overflow: 'hidden'
                  }}>
                    <Image
                      source={{ uri: item.imagen }}
                      style={{
                        height: '80%',
                        width: '100%',
                        backgroundColor: 'white',
                      }}
                      contentFit='contain'
                    />
                    <View style={{ alignItems: 'center', padding: 8 }}>
                      <ThemedText style={{ fontSize: 22, fontFamily: 'Inter-ligth' }}>
                        Modelo: {item.nombreModelo}
                      </ThemedText>
                    </View>
                  </View>
                </View>
              )}
            />
          </View>
          
          <View style={{ marginTop: 8 }}>
            <TextInput
              label='Buscar Modelo'
              mode='outlined'
              style={{ width: '100%', height: 40 }}
              left={<TextInput.Icon icon='magnify' color='black' />}
              value={busqueda || ''}
              onChangeText={setBusqueda}
            />
          </View>
          
          <SafeAreaView style={{ height: '100%', flex: 1, marginTop: 16 }}>
            <FlatList
              data={inventario}
              keyExtractor={(item) => item.idModelo}
              renderItem={({ item }) => (
                <View key={item.idModelo} style={{ 
                  gap: 16, 
                  marginTop: 8, 
                  paddingHorizontal: 2, 
                  flexDirection: 'row',
                  backgroundColor: contentColor,
                  borderRadius: 8,
                  padding: 12,
                  marginHorizontal: 8,
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 4,
                  elevation: 2
                }}>
                  <View style={{ 
                    shadowColor: 'gray',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.2,
                    shadowRadius: 4,
                    borderRadius: 10
                  }}>
                    <Image
                      source={{ uri: item.imagen }}
                      style={{ width: 150, height: 150, borderRadius: 10 }}
                      contentFit='contain'
                    />
                  </View>
                  <View style={{ flex: 1, gap: 8, justifyContent: 'center' }}>
                    <ThemedText style={{ fontSize: 20, fontFamily: 'Inter-ligth' }}>
                      Modelo: {item.nombreModelo}
                    </ThemedText>
                    <ThemedText style={{ fontSize: 16, fontFamily: 'Inter-ligth' }}>
                      Stock: {item.stockDisponible}
                    </ThemedText>
                    <ThemedText style={{ fontSize: 16, fontFamily: 'Inter-ligth' }}>
                      Almacen(es): {item.nombreAlmacen}
                    </ThemedText>
                  </View>
                </View>
              )}
            />
          </SafeAreaView>
        </View>
      </KeyboardAvoidingView>
    </GestureHandlerRootView>
  );
};

export default InventariadoAdmin;