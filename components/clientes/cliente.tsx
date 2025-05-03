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
  
type TipoCliente = 'natural' | 'juridico' | '';

interface DatosCliente {
    tipoCliente: TipoCliente;
    nombre?: string;
    dni?: string;
    telefono?: string;
    razonSocial?: string;
    ruc?: string;
    representanteLegal?: string;
}

SplashScreen.preventAutoHideAsync();
const ClienteAdmin = () => {
    const [tipoCliente, setTipoCliente] = useState<TipoCliente>('');
    const [clienteNatural, setClienteNatural] = useState<string>('');
    const [representanteLegal, setRepresentanteLegal] = useState<string>('');
    const [dni, setDni] = useState<string>('');
    const [ruc, setRuc] = useState<string>('');
    const [telefonoNatural, setTelefonoNatural] = useState<string>('');
    const [telefonoJuridico, setTelefonoJuridico] = useState<string>('');
    const [razonSocial, setRazonSocial] = useState<string>('');

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
  
    const handleCrearCliente = async (): Promise<void> => {
      try {
        let datosCliente: DatosCliente = { tipoCliente };
  
        if (tipoCliente === 'natural') {
          datosCliente = {
            ...datosCliente,
            nombre: clienteNatural,
            dni,
            telefono: telefonoNatural,
          };
        } else if (tipoCliente === 'juridico') {
          datosCliente = {
            ...datosCliente,
            razonSocial,
            ruc,
            representanteLegal,
            telefono: telefonoJuridico,
          };
        }
  
        if (!validarDatosCliente(tipoCliente, dni, ruc, telefonoNatural, telefonoJuridico)) {
          return;
        }
  
        if (!Object.values(datosCliente).every(valor => valor && valor.toString().trim() !== '')) {
          Alert.alert('Error', 'Por favor, completa todos los campos.');
          return;
        }
  
        await ClienteService.crearCliente(datosCliente, tipoCliente);
        Alert.alert('Éxito', `Cliente ${tipoCliente} creado correctamente`);
  
        // Reset form
        setTipoCliente('');
        setDni('');
        setClienteNatural('');
        setTelefonoNatural('');
        setRuc('');
        setRazonSocial('');
        setRepresentanteLegal('');
        setTelefonoJuridico('');
      } catch (error) {
        mostrarError(error as Error);
      }
    };
  
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
                        onPress={() => setTipoCliente('natural')}
                        className={`px-4 py-2 rounded-md w-[45%] gap-2 ${
                        tipoCliente === 'natural' ? 'border border-[#634AFF]' : ''
                        }`}
                        style={{ backgroundColor: contentColor }}
                    >
                        <Icon source='account' size={20} color={iconColor} />
                        <ThemedText >Cliente Natural</ThemedText>
                    </Pressable>
                    <Pressable
                        onPress={() => setTipoCliente('juridico')}
                        className={`px-4 py-2 rounded-md w-[45%] gap-2 ${
                        tipoCliente === 'juridico' ? 'border border-[#634AFF]' : ''
                        }`}
                        style={{ backgroundColor: contentColor }}
                    >
                        <Icon source='office-building' size={20} color={iconColor} />
                        <ThemedText className='text-[#634AFF]'>Cliente Juridico</ThemedText>
                    </Pressable>
                </ThemedView>
        
                {tipoCliente === 'natural' && (
                <ThemedView className='mt-4 gap-2'>
                    <ThemedText style={{ fontFamily: 'Inter-Black', fontSize: 18 }} className='mx-auto'>
                        Datos del cliente Natural
                    </ThemedText>
                    <ThemedView className='gap-2'>
                        <TextInput
                            placeholder='10101010'
                            value={dni}
                            onChangeText={setDni}
                            keyboardType='numeric'
                            maxLength={8}
                            label='DNI'
                            mode='outlined'
                        />
                        <TextInput
                            placeholder='Juan Perez'
                            value={clienteNatural}
                            onChangeText={setClienteNatural}
                            label='Nombres y Apellidos'
                            mode='outlined'
                        />
                        <TextInput
                            placeholder='999999999'
                            value={telefonoNatural}
                            onChangeText={setTelefonoNatural}
                            keyboardType='numeric'
                            maxLength={9}
                            label='Número de teléfono'
                            mode='outlined'
                        />
                    </ThemedView>
                </ThemedView>
                )}
        
                {tipoCliente === 'juridico' && (
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
        
                {tipoCliente !== '' && (
                <Pressable
                    className='bg-[#634AFF] p-4 rounded-lg mt-4'
                    onPress={handleCrearCliente}
                >
                    <Text className='text-white text-center font-bold'>
                    Registrar Cliente
                    </Text>
                </Pressable>
                )}
            </KeyboardAvoidingView>
        </ThemedView>
    );
  };
  
  export default ClienteAdmin;