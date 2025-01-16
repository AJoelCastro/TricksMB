import { Image, StyleSheet, Platform } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import {View} from 'react-native'
import {Text} from 'react-native'
import "../../global.css";
import 'nativewind';

export default function HomeScreen() {
  return (
    <View >
      <Text className ="text-white">Arturo cabezon</Text>
    </View>
  );
}


