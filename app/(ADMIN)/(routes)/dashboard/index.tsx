import React, { useEffect } from 'react';
import {View, Pressable} from 'react-native';
import { Icon } from 'react-native-paper';
import { useRouter } from 'expo-router';

import Dashboard from '@/components/Dashboard';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Colors } from '@/constants/Colors';

const IndexDashboardAdmin =()=> {

    const router = useRouter();
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
        <Dashboard>
            <ThemedView className='w-full m-4 mt-8 flex flex-row gap-4'>
                <Pressable
                    className='rounded-md p-4 w-[45%] gap-4'
                    onPress={() => router.push('/(menu)/ordenes_produccion/(tabs)/crear')}
                    style={{ backgroundColor: backIconColor}}
                >
                    <View>
                        <Icon source='file-cog' size={24} color='#634AFF' />
                    </View>
                    <View>
                        <ThemedText
                            style={{ fontFamily: 'Inter-Black', fontSize: 16 }}
                        >
                            Ordenes de Producción
                        </ThemedText>
                    </View>
                </Pressable>
                <Pressable
                    className='rounded-md p-4 w-[45%] gap-4'
                    onPress={() => router.push('/almacen')}
                    style={{ backgroundColor: backIconColor}}
                >
                    <View>
                        <Icon source='warehouse' size={24} color='#634AFF' />
                    </View>
                    <View>
                        <ThemedText
                            style={{ fontFamily: 'Inter-Black', fontSize: 16 }}
                        >
                            Almacenes
                        </ThemedText>
                    </View>
                </Pressable>
            </ThemedView>
            <ThemedView className='w-full m-4 mt-4 flex flex-row gap-4'>
                <Pressable
                    className='rounded-md p-4 w-[45%] gap-4'
                    onPress={() => router.push('/inventariado')}
                    style={{ backgroundColor: backIconColor}}
                >
                    <View>
                        <Icon source='package-variant' size={24} color='#634AFF' />
                    </View>
                    <View>
                        <ThemedText
                            style={{ fontFamily: 'Inter-Black', fontSize: 16 }}
                        >
                            Inventario
                        </ThemedText>
                    </View>
                </Pressable>
                <Pressable
                    className='rounded-md p-4 w-[45%] gap-4'
                    onPress={() => router.push('/historial')}
                    style={{ backgroundColor: backIconColor}}
                >
                    <View>
                        <Icon source='history' size={24} color='#634AFF' />
                    </View>
                    <View>
                        <ThemedText
                            style={{ fontFamily: 'Inter-Black', fontSize: 16 }}
                        >
                            Historial de Pedidos
                        </ThemedText>
                    </View>
                </Pressable>
            </ThemedView>
        </Dashboard>
    );
}

export default IndexDashboardAdmin;