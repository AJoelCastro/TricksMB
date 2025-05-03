import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, Alert, KeyboardAvoidingView, Platform } from 'react-native'; 
import { TextInput, Icon } from 'react-native-paper';
import { useFonts } from 'expo-font';

import ClienteService from '@/services/ClienteService';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Colors } from '@/constants/Colors';

import * as SplashScreen from 'expo-splash-screen';
import { ThemedView } from '../ThemedView';
import { ThemedText } from '../ThemedText';
import TipoCalzadoService from '@/services/TipoCalzadoService';
  
type Tipo = 'tipoCalzado' | 'juridico' | '';

interface DatosCliente {
    tipoCliente: Tipo;
    nombre?: string;
    dni?: string;
    telefono?: string;
    razonSocial?: string;
    ruc?: string;
    representanteLegal?: string;
}

SplashScreen.preventAutoHideAsync();
const DatosAdmin = () => {
    const [tipo, setTipo] = useState<Tipo>('');
    const [clienteNatural, setClienteNatural] = useState<string>('');
    const [representanteLegal, setRepresentanteLegal] = useState<string>('');
    const [dni, setDni] = useState<string>('');
    const [ruc, setRuc] = useState<string>('');
    const [telefonoNatural, setTelefonoNatural] = useState<string>('');
    const [telefonoJuridico, setTelefonoJuridico] = useState<string>('');
    const [razonSocial, setRazonSocial] = useState<string>('');
    const [tipoCalzado, setTipoCalzado] = useState<string>('');

    const validarDatosCliente = (
      tipoCliente: TipoCliente,
      dni: string,
      ruc: string,
      telefonoNatural: string,
      telefonoJuridico: string
    ): boolean => {
      if (tipoCliente === 'natural') {
        if (!dni || dni.length !== 8) {
          Alert.alert('Error', 'El DNI debe tener 8 dígitos');
          return false;
        }
        if (!telefonoNatural || telefonoNatural.length !== 9) {
          Alert.alert('Error', 'El teléfono debe tener 9 dígitos');
          return false;
        }
      } else if (tipoCliente === 'juridico') {
        if (!ruc || ruc.length !== 11) {
          Alert.alert('Error', 'El RUC debe tener 11 dígitos');
          return false;
        }
        if (!telefonoJuridico || telefonoJuridico.length !== 9) {
          Alert.alert('Error', 'El teléfono debe tener 9 dígitos');
          return false;
        }
      }
      return true;
    };
  
    const handleCrearTipoCalzado = async () => {
      if (!tipoCalzado) {
        Alert.alert('Error', 'Debe ingresar el tipo de calzado');
        return;
      }
      try {
        const dataTipoCalzado = await TipoCalzadoService.createTipoCalzado(tipoCalzado);
        if (dataTipoCalzado.status === 201) {
            setTipoCalzado('');
            setTipo('');
            Alert.alert('Éxito', 'Tipo de calzado creado exitosamente');
        }
      } catch (error) {
        mostrarError(error as Error);
      }
    }
  
    const mostrarError = (error: Error): void => {
      Alert.alert(
        'Error',
        `${error.message}`,
        [{ text: 'OK' }]
      );
    };
  
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
        <ThemedView>
            <KeyboardAvoidingView 
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
                className='p-2 h-full'
            >
                <ThemedView className='flex-row justify-center gap-4 mt-4'>
                    <Pressable
                        onPress={() => setTipo('tipoCalzado')}
                        className={`px-4 py-2 rounded-md w-[45%] gap-2 ${
                        tipo === 'tipoCalzado' ? 'border border-[#634AFF]' : ''
                        }`}
                        style={{ backgroundColor: contentColor }}
                    >
                        <Icon source='shoe-heel' size={20} color={iconColor} />
                        <ThemedText >Tipo de Calzado</ThemedText>
                    </Pressable>
                    <Pressable
                        onPress={() => setTipo('juridico')}
                        className={`px-4 py-2 rounded-md w-[45%] gap-2 ${
                        tipo === 'juridico' ? 'border border-[#634AFF]' : ''
                        }`}
                        style={{ backgroundColor: contentColor }}
                    >
                        <Icon source='office-building' size={20} color={iconColor} />
                        <ThemedText className='text-[#634AFF]'>Cliente Juridico</ThemedText>
                    </Pressable>
                </ThemedView>
        
                {tipo === 'tipoCalzado' && (
                    <ThemedView className='mt-4 gap-2'>
                        <ThemedText style={{ fontFamily: 'Inter-Black', fontSize: 18 }} className='mx-auto'>
                            Datos del Tipo de Calzado
                        </ThemedText>
                        <ThemedView className='gap-2'>
                            <TextInput
                                placeholder='Botin'
                                value={tipoCalzado}
                                onChangeText={setTipoCalzado}
                                label='Tipo de Calzado'
                                mode='outlined'
                            />
                        </ThemedView>
                        <Pressable
                            className='bg-[#634AFF] p-4 rounded-lg mt-4'
                            onPress={handleCrearTipoCalzado}
                        >
                            <Text className='text-white text-center font-bold'>
                                Registrar Datos
                            </Text>
                        </Pressable>
                    </ThemedView>
                )}
        
                {tipo === 'juridico' && (
                <ThemedView className='mt-4 gap-2'>
                    <ThemedText style={{ fontFamily: 'Inter-Black', fontSize: 18 }} className='mx-auto'>
                        Datos del cliente Jurídico
                    </ThemedText>
                    <ThemedView className='gap-2'>
                        <TextInput
                            placeholder='10345678901'
                            value={ruc}
                            onChangeText={setRuc}
                            keyboardType='numeric'
                            maxLength={11}
                            label='RUC'
                            mode='outlined'
                        />
                        <TextInput
                            placeholder='Razón social'
                            value={razonSocial}
                            onChangeText={setRazonSocial}
                            label='Razón social'
                            mode='outlined'
                        />
                        <TextInput
                            placeholder='Datos del RL'
                            value={representanteLegal}
                            onChangeText={setRepresentanteLegal}
                            label='Representante Legal'
                            mode='outlined'
                        />
                        <TextInput
                            placeholder='999999999'
                            value={telefonoJuridico}
                            onChangeText={setTelefonoJuridico}
                            keyboardType='numeric'
                            maxLength={9}
                            label='Número de contacto'
                            mode='outlined'
                        />
                    </ThemedView>
                </ThemedView>
                )}

            </KeyboardAvoidingView>
        </ThemedView>
    );
  };
  
  export default DatosAdmin;