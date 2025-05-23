import React from 'react'
import { View, Text, Pressable } from 'react-native'
import { useRouter } from 'expo-router'

import Dashboard from '@/components/Dashboard'
import { ThemedView } from '@/components/ThemedView'
import { ThemedText } from '@/components/ThemedText'
import { Icon } from 'react-native-paper'
import { useAppColors } from '@/hooks/useAppColors'

const IndexOrdenesAdmin = () => {
    const router = useRouter();
    const {background, backIcon} = useAppColors();
  return (
    <Dashboard>
        <ThemedView className='w-full m-4 mt-8 flex flex-row gap-4'>
                <Pressable
                    className='rounded-md p-4 w-[45%] gap-4'
                    onPress={() => router.push('/(ADMIN)/(routes)/ordenes/(ordenesStack)/crear')}
                    style={{ backgroundColor: backIcon}}
                >
                    <View>
                        <Icon source='file-cog' size={24} color='#634AFF' />
                    </View>
                    <View>
                        <ThemedText
                            style={{ fontFamily: 'Inter-ligth', fontSize: 16 }}
                        >
                            Crear Orden
                        </ThemedText>
                    </View>
                </Pressable>
                <Pressable
                    className='rounded-md p-4 w-[45%] gap-4'
                    onPress={() => router.push('/(ADMIN)/(routes)/ordenes/(ordenesStack)/editar')}
                    style={{ backgroundColor: backIcon}}
                >
                    <View>
                        <Icon source='warehouse' size={24} color='#634AFF' />
                    </View>
                    <View>
                        <ThemedText
                            style={{ fontFamily: 'Inter-ligth', fontSize: 16 }}
                        >
                            Editar Orden
                        </ThemedText>
                    </View>
                </Pressable>
            </ThemedView>
            <ThemedView className='w-full m-4 mt-4 flex flex-row gap-4'>
                <Pressable
                    className='rounded-md p-4 w-[45%] gap-4'
                    onPress={() => router.push('/(ADMIN)/(routes)/ordenes/(ordenesStack)/cancelar')}
                    style={{ backgroundColor: backIcon}}
                >
                    <View>
                        <Icon source='package-variant' size={24} color='#634AFF' />
                    </View>
                    <View>
                        <ThemedText
                            style={{ fontFamily: 'Inter-ligth', fontSize: 16 }}
                        >
                            Cancelar Orden
                        </ThemedText>
                    </View>
                </Pressable>
                <Pressable
                    className='rounded-md p-4 w-[45%] gap-4'
                    onPress={() => router.push('/(ADMIN)/(routes)/ordenes/(ordenesStack)/actualizar')}
                    style={{ backgroundColor: backIcon}}
                >
                    <View>
                        <Icon source='history' size={24} color='#634AFF' />
                    </View>
                    <View>
                        <ThemedText
                            style={{ fontFamily: 'Inter-ligth', fontSize: 16 }}
                        >
                            Actualizar Estado
                        </ThemedText>
                    </View>
                </Pressable>
            </ThemedView>
    </Dashboard>
  )
}

export default IndexOrdenesAdmin