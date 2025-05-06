import 'react-native-reanimated';
import React, { useState, useEffect, useCallback } from 'react';
import {
  Alert,
  Text,
  View,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useFonts } from 'expo-font';
import Carousel from 'react-native-reanimated-carousel';
import * as SplashScreen from 'expo-splash-screen';
import {
  FlatList,
  GestureHandlerRootView,
  ScrollView,
} from 'react-native-gesture-handler';
import { Image } from 'expo-image';
import { TextInput, Divider } from 'react-native-paper';
import { useFocusEffect } from 'expo-router';
import ModeloService from '@/services/ModeloService';

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
  
  const images: CarouselImage[] = [
    {
      id: '1',
      url: 'https://r-charts.com/es/miscelanea/procesamiento-imagenes-magick_files/figure-html/color-fondo-imagen-r.png',
    },
    {
      id: '2',
      url: 'https://r-charts.com/es/miscelanea/procesamiento-imagenes-magick_files/figure-html/color-fondo-imagen-r.png',
    },
    {
      id: '3',
      url: 'https://r-charts.com/es/miscelanea/procesamiento-imagenes-magick_files/figure-html/color-fondo-imagen-r.png',
    },
  ];

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

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={80}
        style={{ flex: 1 }}
      >
        <View style={{ backgroundColor: 'white', height: '100%', padding: 8, flex: 1 }}>
          <View style={{ padding: 8 }}>
            <Text style={{ fontFamily: 'Inter-Black', fontSize: 28 }}>
              Inventario
            </Text>
          </View>
          
          <View style={{ alignItems: 'center' }}>
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
                    backgroundColor: 'white',
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
                      <Text style={{ fontSize: 20, fontFamily: 'Inter-Black' }}>
                        Modelo: {item.nombreModelo}
                      </Text>
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
          
          <View style={{ height: '100%', flex: 1, marginBottom: 40, marginTop: 16 }}>
            <FlatList
              data={inventario}
              keyExtractor={(item) => item.idModelo}
              renderItem={({ item }) => (
                <View key={item.idModelo} style={{ 
                  gap: 16, 
                  marginTop: 8, 
                  paddingHorizontal: 16, 
                  flexDirection: 'row',
                  backgroundColor: 'white',
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
                    <Text style={{ fontSize: 20, fontFamily: 'Inter-Black' }}>
                      Modelo: {item.nombreModelo}
                    </Text>
                    <Text style={{ fontSize: 16, fontFamily: 'Inter-Black' }}>
                      Stock: {item.stockDisponible}
                    </Text>
                    <Text style={{ fontSize: 16, fontFamily: 'Inter-Black' }}>
                      Almacen(es): {item.nombreAlmacen}
                    </Text>
                  </View>
                </View>
              )}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </GestureHandlerRootView>
  );
};

export default InventariadoAdmin;