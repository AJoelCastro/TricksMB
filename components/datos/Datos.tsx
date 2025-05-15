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
import ModalSelector from 'react-native-modal-selector';
import ModeloService from '@/services/ModeloService';
import ImagenService from '@/services/ImagenService';
import AlmacenService from '@/services/AlmacenService';
import { useAppColors } from '@/hooks/useAppColors';
  
type Tipo = 'tipoCalzado' | 'modelo' | 'imagenModelo' | 'almacen' | '';
type TipoCalzado = {
    idTipo: number;
    Nombre: string;
};
type TipoModelo= {
    idModelo: number;
    idTipo: number;
    Nombre: string;
};

SplashScreen.preventAutoHideAsync();
const DatosAdmin = () => {

    const { content, icon } = useAppColors();
    const [tipo, setTipo] = useState<Tipo>('');
    const [modelo, setModelo] = useState<string>('');

    const [tipoCalzado, setTipoCalzado] = useState<string>('');
    const [tipoCalzadoModal, setTipoCalzadoModal] = useState<number>(0);
    const [dataTipoCalzado, setDataTipoCalzado] = useState<TipoCalzado[]>([]);

    const [imagenModelo, setImagenModelo] = useState<string>('');
    const [dataModelo, setDataModelo] = useState<TipoModelo[]>([]);
    const [imagenModeloModal, setImagenModeloModal] = useState<number>(0);

    const [nombreAlmacen, setNombreAlmacen] = useState<string>('');
    const [imagenAlmacen, setImagenAlmacen] = useState<string>('');
    const [direccionAlmacen, setDireccionAlmacen] = useState<string>('');

    useEffect(() => {
        const cargarTipoCalzado = async () => {
          try {
            const tipos = await TipoCalzadoService.getAllTipoCalzado();
            setDataTipoCalzado(tipos.tipoCalzado);
          } catch (error) {
            mostrarError(error as Error);
          }
        };
        cargarTipoCalzado();
    }, [tipoCalzado]);
    useEffect(() => {
        const cargarIdModelo = async () => {
          try {
            const dataModel = await ModeloService.getAllModelo();
            setDataModelo(dataModel.modelos);
          } catch (error) {
            mostrarError(error as Error);
          }
        };
        cargarIdModelo();
    }, [modelo]);

    
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
  
    const handleCrearModelo = async () => {
      if (!modelo || !tipoCalzadoModal) {
        Alert.alert('Error', 'Debe ingresar el modelo y el tipo de calzado');
        return;
      }
      try {
        let idTipo = tipoCalzadoModal;
        let nombre = modelo;
        const dataModelo = await ModeloService.createModelo(idTipo, nombre);
        if (dataModelo.status === 201) {
            setModelo('');
            setTipo('');
            setTipoCalzadoModal(0);
            Alert.alert('Éxito', 'Modelo creado exitosamente');
        }
      }catch (error) {
        mostrarError(error as Error);
      }
    }
    const handleCrearImagenModelo = async () => {
      if (!imagenModelo ||!imagenModeloModal) {
        Alert.alert('Error', 'Debe ingresar la URL y el modelo');
        return;
      }
      try {
        let idModelo = imagenModeloModal;
        let url = imagenModelo;
        const dataImagen = await ImagenService.createImagen(idModelo, url);
        if (dataImagen.status === 201) {
            setImagenModelo('');
            setTipo('');
            setImagenModeloModal(0);
            Alert.alert('Éxito', 'Imagen creada exitosamente');
        }
      }catch (error) {
        mostrarError(error as Error);
      }
    }
    const handleCrearAlmacen = async () => {
      if (!nombreAlmacen ||!imagenAlmacen ||!direccionAlmacen) {
        Alert.alert('Error', 'Debe ingresar los datos del almacen');
        return;
      }
      try {
        let nombre = nombreAlmacen;
        let imagen = imagenAlmacen;
        let direccion = direccionAlmacen;
        const dataAlmacen = await AlmacenService.crearAlmacen(nombre, imagen, direccion);
        if (dataAlmacen.status === 201) {
            setNombreAlmacen('');
            setImagenAlmacen('');
            setDireccionAlmacen('');
            setTipo('');
            Alert.alert('Éxito', 'Almacen creado exitosamente');
        }
      }catch (error) {
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
  

    return (
        <ThemedView>
            <KeyboardAvoidingView 
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
                className='p-2 h-full'
            >
                {/* PRIMERA SECCION */}
                <ThemedView className='flex-row justify-center gap-4 mt-4'>
                    <Pressable
                        onPress={() => setTipo('tipoCalzado')}
                        className={`px-4 py-2 rounded-md w-[45%] gap-2 ${
                        tipo === 'tipoCalzado' ? 'border border-[#634AFF]' : ''
                        }`}
                        style={{ backgroundColor: content}}
                    >
                        <Icon source='shoe-print' size={20} color={icon} />
                        <ThemedText >Tipo de Calzado</ThemedText>
                    </Pressable>
                    <Pressable
                        onPress={() => setTipo('modelo')}
                        className={`px-4 py-2 rounded-md w-[45%] gap-2 ${
                        tipo === 'modelo' ? 'border border-[#634AFF]' : ''
                        }`}
                        style={{ backgroundColor: content }}
                    >
                        <Icon source='shoe-heel' size={20} color={icon} />
                        <ThemedText className='text-[#634AFF]'>Modelo</ThemedText>
                    </Pressable>
                </ThemedView>
                {/* SEGUNDA SECCION */}
                <ThemedView className='flex-row justify-center gap-4 mt-4'>
                    <Pressable
                        onPress={() => setTipo('imagenModelo')}
                        className={`px-4 py-2 rounded-md w-[45%] gap-2 ${
                            tipo === 'imagenModelo' ? 'border border-[#634AFF]' : ''
                        }`}
                        style={{ backgroundColor: content }}
                    >
                        <Icon source='image' size={20} color={icon} />
                        <ThemedText >Imagen de Modelo</ThemedText>
                    </Pressable>
                    <Pressable
                        onPress={() => setTipo('almacen')}
                        className={`px-4 py-2 rounded-md w-[45%] gap-2 ${
                            tipo === 'almacen' ? 'border border-[#634AFF]' : ''
                        }`}
                        style={{ backgroundColor: content }}
                    >
                        <Icon source='warehouse' size={20} color={icon} />
                        <ThemedText >Almacen</ThemedText>
                    </Pressable>
                </ThemedView>

                {/* TERCERA SECCION */}
                <ThemedView className='flex-row justify-center gap-4 mt-4'>
                    {/* <Pressable
                        onPress={() => setTipo('almacen')}
                        className={`px-4 py-2 rounded-md w-[45%] gap-2 ${
                            tipo === 'almacen' ? 'border border-[#634AFF]' : ''
                        }`}
                        style={{ backgroundColor: contentColor }}
                    >
                        <Icon source='warehouse' size={20} color={iconColor} />
                        <ThemedText >Almacen</ThemedText>
                    </Pressable> */}
                    {/* <Pressable
                        onPress={() => setTipo('tipoAlmacen')}
                        className={`px-4 py-2 rounded-md w-[45%] gap-2 ${
                        tipo === 'tipoAlmacen' ? 'border border-[#634AFF]' : ''
                        }`}
                        style={{ backgroundColor: contentColor }}
                    >
                        <Icon source='warehouse' size={20} color={iconColor} />
                        <ThemedText className='text-[#634AFF]'>Tipo de Almacen</ThemedText>
                    </Pressable> */}
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
        
                {tipo === 'modelo' && (
                <ThemedView className='mt-4 gap-2'>
                    <ThemedText style={{ fontFamily: 'Inter-Black', fontSize: 18 }} className='mx-auto'>
                        Datos del Modelo
                    </ThemedText>
                    <ThemedView className='gap-2'>
                        <TextInput
                            placeholder='Primavera'
                            value={modelo}
                            onChangeText={setModelo}
                            label='Modelo'
                            mode='outlined'
                        />
                        <ModalSelector
                            data={dataTipoCalzado}
                            keyExtractor={(item: TipoCalzado) => item.idTipo.toString()}
                            labelExtractor={(item: TipoCalzado) => item.Nombre}
                            onChange={(item: TipoCalzado) => setTipoCalzadoModal(item.idTipo)}
                            cancelText='Cancelar'
                        >
                            <TextInput
                                label='Tipos de Calzado'
                                mode='outlined'
                                editable={false}
                                value={`${tipoCalzadoModal}`}
                            />
                        </ModalSelector>
                    </ThemedView>
                    <Pressable
                        className='bg-[#634AFF] p-4 rounded-lg mt-4'
                        onPress={handleCrearModelo}
                    >
                        <Text className='text-white text-center font-bold'>
                            Registrar Datos
                        </Text>
                    </Pressable>
                </ThemedView>
                )}

                {tipo === 'imagenModelo' && (
                <ThemedView className='mt-4 gap-2'>
                    <ThemedText style={{ fontFamily: 'Inter-Black', fontSize: 18 }} className='mx-auto'>
                        Datos de la Imagen Modelo
                    </ThemedText>
                    <ThemedView className='gap-2'>
                        <TextInput
                            placeholder='URL de la Imagen'
                            value={imagenModelo}
                            onChangeText={setImagenModelo}
                            label='URL'
                            mode='outlined'
                        />
                        <ModalSelector
                            data={dataModelo}
                            keyExtractor={(item: TipoModelo) => item.idModelo.toString()}
                            labelExtractor={(item: TipoModelo) => item.Nombre}
                            onChange={(item: TipoModelo) => setImagenModeloModal(item.idModelo)}
                            cancelText='Cancelar'
                        >
                            <TextInput
                                label='Tipos de Modelo'
                                mode='outlined'
                                editable={false}
                                value={`${imagenModeloModal}`}
                            />
                        </ModalSelector>
                    </ThemedView>
                    <Pressable
                        className='bg-[#634AFF] p-4 rounded-lg mt-4'
                        onPress={handleCrearImagenModelo}
                    >
                        <Text className='text-white text-center font-bold'>
                            Registrar Datos
                        </Text>
                    </Pressable>
                </ThemedView>
                )}
                
                {tipo === 'almacen' && (
                <ThemedView className='mt-4 gap-2'>
                    <ThemedText style={{ fontFamily: 'Inter-Black', fontSize: 18 }} className='mx-auto'>
                        Datos del Almacen
                    </ThemedText>
                    <ThemedView className='gap-2'>
                        <TextInput
                            placeholder='Trujillo'
                            value={nombreAlmacen}
                            onChangeText={setNombreAlmacen}
                            label='Nombre del Almacen'
                            mode='outlined'
                        />
                        <TextInput
                            placeholder='https://URL_ADDRESS'
                            value={imagenAlmacen}
                            onChangeText={setImagenAlmacen}
                            label='Imagen del Almacen'
                            mode='outlined'
                        />
                        <TextInput
                            placeholder='Av España 123'
                            value={direccionAlmacen}
                            onChangeText={setDireccionAlmacen}
                            label='Dirección del Almacen'
                            mode='outlined'
                        />
                    </ThemedView>
                    <Pressable
                        className='bg-[#634AFF] p-4 rounded-lg mt-4'
                        onPress={handleCrearAlmacen}
                    >
                        <Text className='text-white text-center font-bold'>
                            Registrar Datos
                        </Text>
                    </Pressable>
                </ThemedView>
                )}

            </KeyboardAvoidingView>
        </ThemedView>
    );
  };
  
  export default DatosAdmin;