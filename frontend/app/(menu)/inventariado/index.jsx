import "react-native-reanimated";
import React, { useState, useEffect } from 'react';
import { Button, Pressable, Text, View, Dimensions } from 'react-native';
import {useFonts} from "expo-font";
import Carousel from 'react-native-reanimated-carousel';
import * as SplashScreen from 'expo-splash-screen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Image } from "expo-image";
SplashScreen.preventAutoHideAsync();

const {width, height} = Dimensions.get('window');
const Inventario=() =>{
  const [loaded, error] = useFonts({
    'Inter-Black': require('../../../assets/fonts/DMSans-Regular.ttf'),
  });
  
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
    <GestureHandlerRootView className="flex-1">
      <View className="flex-1 bg-white">
        <View className="p-4">
          <Text style={{fontFamily: 'Inter-Black', fontSize: 28}}>Inventario</Text>
        </View>
        <View className="flex-1 items-center">
          <Carousel
            loop
            width={width * 0.9}
            height={300}
            autoPlay
            data={images}
            scrollAnimationDuration={2000}
            mode="parallax"
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
      </View>
    </GestureHandlerRootView>
  );
}
export default Inventario;
