import { Stack, Tabs } from 'expo-router';
import React from 'react';
import { Platform,View } from 'react-native';


import { IconSymbol } from '@/components/ui/IconSymbol';

import { useColorScheme } from '@/hooks/useColorScheme';

export default function InventarioLayout() {
    const colorScheme = useColorScheme();

    return (
        <Stack>
            <Stack.Screen name="inventario" options={{ headerShown: false }} />
        </Stack>
    );
}