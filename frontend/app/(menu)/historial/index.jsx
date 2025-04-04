import React, { useEffect, useState } from 'react'
import { ScrollView, Text, View, Pressable,Alert, FlatList } from 'react-native'
import { useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { Switch, Card, Divider } from 'react-native-paper';
import {useFonts} from "expo-font";


import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import Icon3 from 'react-native-vector-icons/MaterialCommunityIcons';


SplashScreen.preventAutoHideAsync();

export default function Historial(){

    const router = useRouter();
    
    const [loaded, error] = useFonts({
        'Inter-Black': require('../../../assets/fonts/DMSans-Regular.ttf'),
        'Inter-Light': require('../../../assets/fonts/DMSans-Light.ttf'),
    });


    useEffect(() => {
        if (loaded || error) {
            SplashScreen.hideAsync();
        }
    }, [loaded, error]);

    const mostrarError = (error) => {
        Alert.alert(
            "Error",
            `${error.message}`,
            [{ text: "OK" }] // Botón requerido
        );
    };

    if (!loaded && !error) {
        return null;
    }
    

    return (
        <ScrollView className='bg-white h-full'>
        <Text>Historial de pedidos</Text>
        </ScrollView>
        
    )
}
