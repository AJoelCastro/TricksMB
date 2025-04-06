import "react-native-reanimated";
import React, { useState, useEffect } from 'react';
import { Pressable, Text, View, Dimensions, KeyboardAvoidingView, Platform } from 'react-native';
import {useFonts} from "expo-font";
import Carousel from 'react-native-reanimated-carousel';
import * as SplashScreen from 'expo-splash-screen';
import { FlatList, GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import { Image } from "expo-image";
import { TextInput } from "react-native-paper";

SplashScreen.preventAutoHideAsync();

const {width, height} = Dimensions.get('window');

const Inventario=() =>{

  const [loaded, error] = useFonts({
    'Inter-Black': require('../../../assets/fonts/DMSans-Regular.ttf'),
  });
  const [busqueda, setBusqueda] = useState(null);
  const images = [
    { id: "1", url: "https://r-charts.com/es/miscelanea/procesamiento-imagenes-magick_files/figure-html/color-fondo-imagen-r.png" },
    { id: "2", url: "https://r-charts.com/es/miscelanea/procesamiento-imagenes-magick_files/figure-html/color-fondo-imagen-r.png" },
    { id: "3", url: "https://r-charts.com/es/miscelanea/procesamiento-imagenes-magick_files/figure-html/color-fondo-imagen-r.png" },
  ];

  useEffect(() => {
      if (loaded || error) {
          SplashScreen.hideAsync();
      }
  }, [loaded, error]);

  if (!loaded && !error) {
  return null;
  }


  return (
    <GestureHandlerRootView >
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"} 
        keyboardVerticalOffset={80}
        className="flex-1"
      >
        <View 
          className=" bg-white h-full p-2 flex-1"
        >
          <View 
            className="p-2"
          >
            <Text 
              style={{fontFamily: 'Inter-Black', fontSize: 28}}
            >
              Inventario
            </Text>
          </View>
          <View className="items-center">
            <Carousel
              loop
              width={width * 0.9}
              height={300}
              autoPlay
              data={images}
              scrollAnimationDuration={2000}
              mode="parallax"
              // modeConfig={{
              //   snapDirection: "left", // Dirección del stack (izquierda o derecha)
              //   showLength: 1, // Número de elementos visibles en el stack
              // }}
              renderItem={({ item }) => (
                <View >
                  <Image
                    source={item.url}
                    style={{width: '100%', height: '100%'}}
                  />
                </View>
              )}
            />
          </View>
          <View >
            <TextInput
              label="Buscar Modelo"
              mode="outlined"
              style={{width: '100%', height: 40}}
              left={<TextInput.Icon icon="magnify" color="black" />}
              value={busqueda}
              onChangeText={setBusqueda}
            />
          </View>
          <View className=" h-full flex-1 mb-10 mt-4">
            <FlatList
              data={images}
              renderItem={({ item }) => (
                <View className="gap-2 mt-2">
                  <View >
                    <Image
                      source={item.url}
                      style={{width: '50%', height: 200}}
                    />
                  </View>
                  <Text>{item.name}</Text>
                </View>
              )}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </GestureHandlerRootView>
  );
}
export default Inventario;
