import 'react-native-reanimated';
import React, { useState, useEffect, useCallback } from 'react';
import {
  Pressable,
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
import { TextInput, Card, Divider } from 'react-native-paper';
import { useFocusEffect } from 'expo-router';
import ModeloService from '@/services/ModeloService';

SplashScreen.preventAutoHideAsync();

const { width, height } = Dimensions.get('window');

const Inventario = () => {
  const [inventario, setInventario] = useState([]);
  const [loaded, error] = useFonts({
    'Inter-Black': require('../../../assets/fonts/DMSans-Regular.ttf'),
  });
  const [busqueda, setBusqueda] = useState(null);
  const images = [
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
          mostrarError(error);
        }
      };
      obtenerInventario();
    }, [])
  );

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <GestureHandlerRootView>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={80}
        className='flex-1'
      >
        <View className=' bg-white h-full p-2 flex-1'>
          <View className='p-2'>
            <Text style={{ fontFamily: 'Inter-Black', fontSize: 28 }}>
              Inventario
            </Text>
          </View>
          <View className='items-cente'>
            <Carousel
              loop
              width={width * 0.98}
              height={height * 0.3}
              autoPlay
              data={inventario}
              scrollAnimationDuration={2000}
              mode='parallax'
              // modeConfig={{
              //   snapDirection: "left", // Dirección del stack (izquierda o derecha)
              //   showLength: 1, // Número de elementos visibles en el stack
              // }}
              renderItem={({ item }) => (
                <View key={item.idModelo} className='flex-1 '>
                  <Card className='w-full h-full '>
                    <Image
                      source={{ uri: item.imagen }}
                      style={{
                        height: '100%',
                        width: '100%',
                        borderRadius: 10,
                        backgroundColor: 'white',
                      }}
                      contentFit='contain'
                    />
                    <View className='items-center '>
                      <Text style={{ fontSize: 20, fontFamily: 'Inter-Black' }}>
                        Modelo: {item.nombreModelo}
                      </Text>
                    </View>
                  </Card>
                </View>
              )}
            />
          </View>
          <View className='mt-2'>
            <TextInput
              label='Buscar Modelo'
              mode='outlined'
              style={{ width: '100%', height: 40 }}
              left={<TextInput.Icon icon='magnify' color='black' />}
              value={busqueda}
              onChangeText={setBusqueda}
            />
          </View>
          <View className=' h-full flex-1 mb-10 mt-4'>
            <FlatList
              data={inventario}
              renderItem={({ item }) => (
                <View key={item.idModelo} className='gap-4 mt-2 px-4 flex-row '>
                  <View className='shadow-md shadow-gray-200 rounded-md'>
                    <Image
                      source={item.imagen}
                      style={{ width: 150, height: 150, borderRadius: 10 }}
                      contentFit='contain'
                    />
                  </View>
                  <View className='flex-1 gap-2 justify-center'>
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
export default Inventario;
