import { Tabs } from 'expo-router';
import React from 'react';
import { Platform,View } from 'react-native';


import { IconSymbol } from '@/components/ui/IconSymbol';

import { useColorScheme } from '@/hooks/useColorScheme';
import Almacen from './almacenes';

export default function AlmacenLayout() {
    const colorScheme = useColorScheme();

    return (
        <View>
            <Almacen/>
        </View>
    );
}