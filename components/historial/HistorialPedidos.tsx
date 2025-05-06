import React, { useCallback, useEffect, useState } from 'react';
import {
  ScrollView,
  Text,
  View,
  Pressable,
  Alert,
  FlatList,
  SafeAreaView,
  Modal,
} from 'react-native';
import { Divider, Icon } from 'react-native-paper';
import { useFocusEffect, useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Colors } from '@/constants/Colors';
import { ThemedView } from '@/components/ThemedView';

import * as SplashScreen from 'expo-splash-screen';

import DetallePedidoService from '@/services/DetallePedidoService';
import ModeloService from '@/services/ModeloService';
import { ThemedText } from '../ThemedText';

// Type definitions
type EstadoPedido = 'Editable' | 'Finalizado' | 'Proceso' | 'Cancelado' | 'Vencido' | null;
type Pedido = {
  Codigo_pedido: string;
  Fecha_entrega: string;
  Estado: string;
  Imagenes: string[];
};
type DetallePedido = {
  Modelo_idModelo: string;
  Fecha_creacion: string;
  // Add other properties as needed
};
type Modelo = {
  Nombre: string;
  // Add other properties as needed
};

SplashScreen.preventAutoHideAsync();

const HistorialPedidosAdmin = () => {
  const router = useRouter();
  const [estado, setEstado] = useState<EstadoPedido>(null);
  const [mostrarPedidos, setMostrarPedidos] = useState<boolean>(false);
  const [data, setData] = useState<Pedido[] | null>(null);
  const [historial, setHistorial] = useState<Pedido[] | null>(null);
  const [showCardDetail, setShowCardDetail] = useState<boolean>(false);
  const [codigoPedido, setCodigoPedido] = useState<string | null>(null);
  const [dataModelo, setDataModelo] = useState<DetallePedido | null>(null);
  const [modelImage, setModelImage] = useState<string | null>(null);
  const [nameModel, setNameModel] = useState<string | null>(null);
  
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

  useFocusEffect(
    useCallback(() => {
      const obtenerHistorial = async () => {
        try {
          const historial = await DetallePedidoService.getHistorialPedidos();
          setHistorial(historial.historialPedidos);
        } catch (error) {
          mostrarError(error as Error);
        }
      };
      obtenerHistorial();
    }, [])
  );


  useEffect(() => {
    setDataModelo(null);
    setModelImage(null);
    setNameModel(null);
    setData(null);
    
    if (historial === null) return;
    
    if (estado === 'Vencido') {
      const hoy = new Date();
      const dataVencidos = historial.filter(item => {
        const [dia, mes, anio] = item.Fecha_entrega.split('/');
        const fechaEntrega = new Date(Number(anio), Number(mes) - 1, Number(dia));
        return fechaEntrega <= hoy;
      });
      
      if (dataVencidos.length === 0) {
        Alert.alert('Error', 'No hay pedidos vencidos', [{ text: 'OK' }]);
        setMostrarPedidos(false);
        return;
      }
      
      setData(dataVencidos);
    } else if (estado) {
      const dataHistorial = historial.filter(item => item.Estado === estado);
      
      if (dataHistorial.length === 0) {
        Alert.alert('Error', 'No hay pedidos para este estado', [{ text: 'OK' }]);
        setMostrarPedidos(false);
        return;
      }
      
      setData(dataHistorial);
    }
    
    setMostrarPedidos(true);
  }, [estado, historial]);

  useEffect(() => {
    if (!data || !codigoPedido) return;
    
    const obtenerDetallePedido = async () => {
      try {
        const dataPedido = await DetallePedidoService.obtenerDetallePedido(codigoPedido);
        setDataModelo(dataPedido.detallePedido);
        
        const model = await ModeloService.getModeloByCodigoPedido(codigoPedido);
        setNameModel(model.modelo.Nombre);
        
        const idModelo = dataPedido.detallePedido.Modelo_idModelo;
        const imagenModelo = await ModeloService.getImagenById(idModelo);
        setModelImage(imagenModelo.imagen[0].Url);
      } catch (error) {
        mostrarError(error as Error);
      }
    };
    
    obtenerDetallePedido();
  }, [codigoPedido, data]);


  const mostrarError = (error: Error) => {
    Alert.alert('Error', error.message, [{ text: 'OK' }]);
  };

  return (
    <SafeAreaView style={{flex: 1, padding: 8}}>
      <ThemedText type='title' style={{marginVertical:16}}>
        HISTORIAL DE PEDIDOS
      </ThemedText>
      
      <View className='flex-col gap-2 '>
        <View className='flex-row justify-between'>
          <View className='items-center gap-2'>
            <Pressable
              className='bg-gray-100 rounded-full p-4'
              onPress={() => setEstado('Editable')}
            >
              <Icon source='clock-outline' size={20} color='#FFA500' />
            </Pressable>
            <ThemedText style={{ fontFamily: 'Inter-Light', fontSize: 15 }} >
              Pendientes
            </ThemedText>
          </View>

          <View className='items-center gap-2'>
            <Pressable
              className='bg-gray-100 rounded-full p-4'
              onPress={() => setEstado('Finalizado')}
            >
              <Icon source='check' size={20} color="#10B981" />
            </Pressable>
            <ThemedText style={{ fontFamily: 'Inter-Light', fontSize: 15 }}>
              Completadas
            </ThemedText>
          </View>
          
          <View className='items-center gap-2'>
            <Pressable
              className='bg-gray-100 rounded-full p-4'
              onPress={() => setEstado('Vencido')}
            >
              <Icon source='alert-circle-outline' size={20} color="#FF0000" />
            </Pressable>
            <ThemedText style={{ fontFamily: 'Inter-Light', fontSize: 15 }}>
              Vencidas
            </ThemedText>
          </View>
        </View>
        
        <Divider style={{ marginVertical: 5, backgroundColor: '#634AFF' }} />
        
        <View className='flex-row justify-center gap-[15%]'>
          <View className='items-center gap-2'>
            <Pressable
              className='bg-gray-100 rounded-full p-4'
              onPress={() => setEstado('Proceso')}
            >
              <Icon source='sync' size={20} color="#3B82F6" />
            </Pressable>
            <ThemedText style={{ fontFamily: 'Inter-Light', fontSize: 15 }}>
              En Proceso
            </ThemedText>
          </View>
          
          <View className='items-center gap-2'>
            <Pressable
              className='bg-gray-100 rounded-full p-4'
              onPress={() => setEstado('Cancelado')}
            >
              <Icon source='close-circle-outline' size={20} color="#808080" />
            </Pressable>
            <ThemedText style={{ fontFamily: 'Inter-Light', fontSize: 15 }} >
              Canceladas
            </ThemedText>
          </View>
        </View>
      </View>
      {mostrarPedidos && data && (
        <SafeAreaView style={{flex: 1, marginTop: 16}} >
          <View style={{backgroundColor: contentColor, padding:2}}>
            <ThemedText 
              style={{ fontFamily: 'Inter-Regular', fontSize: 20, textAlign: 'center' }} 
            >
              PEDIDOS
            </ThemedText>
          </View>
          <FlatList
            data={data}
            keyExtractor={item => item.Codigo_pedido}
            renderItem={({ item }) => (
              <View style={{
                padding: 8, // Equivalente a p-2
                gap: 16, // Equivalente a gap-4 (1 gap unit = 4px)
                marginVertical: 4, // Equivalente a my-2
                backgroundColor: contentColor,
                borderRadius: 8,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 3
              }}>
                <Pressable
                  style={{
                    flexDirection: 'row',
                    gap: 8, // Equivalente a gap-2
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                  onPress={() => {
                    setShowCardDetail(true);
                    setCodigoPedido(item.Codigo_pedido);
                  }}
                >
                  <View style={{
                    borderRadius: 100, // rounded-full
                    padding: 16 // p-4
                  }}>
                    <Icon source='cart' size={20} color={iconColor} />
                  </View>
                  
                  <View>
                    <ThemedText style={{ 
                      fontFamily: 'Inter-Light', 
                      fontSize: 15, 
                    }}>
                      {item.Codigo_pedido}
                    </ThemedText>
                    <ThemedText style={{ 
                      fontFamily: 'Inter-Light', 
                      fontSize: 15, 
                    }}>
                      Entrega: {item.Fecha_entrega}
                    </ThemedText>
                  </View>
                  
                  <View>
                    <Image
                      source={{ uri: item.Imagenes[0] }}
                      style={{ 
                        width: 100, 
                        height: 100,
                        borderRadius: 8 // rounded-lg
                      }}
                      contentFit='cover'
                    />
                  </View>
                </Pressable>
              </View>
            )}
            style={{flex: 1}}
          /> 
          
        </SafeAreaView>
        
      )}
      
      <Modal visible={showCardDetail} animationType='fade'>
        <SafeAreaView className='flex-1 justify-center items-center'>
          <ThemedView className='p-2 gap-4 my-2 w-full h-full'>
            <ThemedView style={{
              borderRadius: 8,
              padding: 16,
              alignItems: 'center',
              backgroundColor: contentColor,
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 3,
              marginVertical: 8
            }}>
              <ThemedText style={{ 
                fontFamily: 'Inter-Light', 
                fontSize: 18, 
              }}>
                Modelo: {nameModel}
              </ThemedText>
            </ThemedView>
            
            <View className='items-center my-2'>
              <Image
                source={{ uri: modelImage || undefined }}
                style={{ width: 300, height: 300 }}
                contentFit='cover'
                className='rounded-lg'
              />
            </View>
            
            <ThemedView style={{
              borderRadius: 8,
              padding: 16,
              shadowColor: '#000',
              backgroundColor: contentColor,
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 3,
              marginVertical: 8
            }}>
              <View style={{ gap: 8 }}> {/* Equivalente al espaciado entre textos en Card.Content */}
                <ThemedText style={{ 
                  fontFamily: 'Inter-Light', 
                  fontSize: 16, 
                }}>
                  Codigo: {codigoPedido}
                </ThemedText>
                <ThemedText style={{ 
                  fontFamily: 'Inter-Light', 
                  fontSize: 16, 
                }}>
                  Estado: {estado}
                </ThemedText>
                <ThemedText style={{ 
                  fontFamily: 'Inter-Light', 
                  fontSize: 16, 
                }}>
                  Fecha de creación: {dataModelo?.Fecha_creacion.slice(0, 10)}
                </ThemedText>
              </View>
            </ThemedView>
            
            <View style={{backgroundColor:contentColor}}>
              <Pressable
                className='items-center rounded-full p-4'
                onPress={() => setShowCardDetail(false)}
              >
                <ThemedText style={{ fontFamily: 'Inter-Regular', fontSize: 16, color: "#634AFF" }} >
                  Cerrar
                </ThemedText>
              </Pressable>
            </View>
          </ThemedView>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
};

export default HistorialPedidosAdmin;