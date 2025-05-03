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
import { Card, Divider, Icon } from 'react-native-paper';
import { useFocusEffect, useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Colors } from '@/constants/Colors';

import * as SplashScreen from 'expo-splash-screen';

import DetallePedidoService from '@/services/DetallePedidoService';
import ModeloService from '@/services/ModeloService';

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
    <View className='bg-white flex-1 p-2 gap-4'>
      <Text style={{ fontFamily: 'Inter-Light', fontSize: 28 }} className='text-gray-600 my-4'>
        HISTORIAL DE PEDIDOS
      </Text>
      
      <View className='flex-col gap-2'>
        <View className='flex-row justify-between'>
          <View className='items-center gap-2'>
            <Pressable
              className='bg-gray-100 rounded-full p-4'
              onPress={() => setEstado('Editable')}
            >
              <Icon source='square-o' size={20} color='#634AFF' />
            </Pressable>
            <Text style={{ fontFamily: 'Inter-Light', fontSize: 15 }} className='text-gray-800'>
              Pendientes
            </Text>
          </View>

          <View className='items-center gap-2'>
            <Pressable
              className='bg-gray-100 rounded-full p-4'
              onPress={() => setEstado('Finalizado')}
            >
              <Icon source='check' size={20} color={iconColor} />
            </Pressable>
            <Text style={{ fontFamily: 'Inter-Light', fontSize: 15 }} className='text-gray-800'>
              Completadas
            </Text>
          </View>
          
          <View className='items-center gap-2'>
            <Pressable
              className='bg-gray-100 rounded-full p-4'
              onPress={() => setEstado('Vencido')}
            >
              <Icon source='exclamation-circle' size={20} color={iconColor} />
            </Pressable>
            <Text style={{ fontFamily: 'Inter-Light', fontSize: 15 }} className='text-gray-800'>
              Vencidas
            </Text>
          </View>
        </View>
        
        <Divider style={{ marginVertical: 5, backgroundColor: '#634AFF' }} />
        
        <View className='flex-row justify-center gap-[15%]'>
          <View className='items-center gap-2'>
            <Pressable
              className='bg-gray-100 rounded-full p-4'
              onPress={() => setEstado('Proceso')}
            >
              <Icon source='check-square' size={20} color={iconColor} />
            </Pressable>
            <Text style={{ fontFamily: 'Inter-Light', fontSize: 15 }} className='text-gray-800'>
              En Proceso
            </Text>
          </View>
          
          <View className='items-center gap-2'>
            <Pressable
              className='bg-gray-100 rounded-full p-4'
              onPress={() => setEstado('Cancelado')}
            >
              <Icon source='times' size={20} color={iconColor} />
            </Pressable>
            <Text style={{ fontFamily: 'Inter-Light', fontSize: 15 }} className='text-gray-800'>
              Canceladas
            </Text>
          </View>
        </View>
      </View>
      
      {mostrarPedidos && data && (
        <SafeAreaView className='flex-1 mt-4 bg-white'>
          <Text 
            style={{ fontFamily: 'Inter-Regular', fontSize: 20, textAlign: 'center' }} 
            className='text-gray-600 my-2'
          >
            PEDIDOS
          </Text>
          
          <FlatList
            data={data}
            keyExtractor={item => item.Codigo_pedido}
            renderItem={({ item }) => (
              <Card className='p-2 gap-4 my-2' style={{ backgroundColor: 'white' }}>
                <Pressable
                  className='flex-row gap-2 justify-between items-center'
                  onPress={() => {
                    setShowCardDetail(true);
                    setCodigoPedido(item.Codigo_pedido);
                  }}
                >
                  <View className='bg-gray-100 rounded-full p-4'>
                    <Icon source='shopping-cart' size={20} color={iconColor} />
                  </View>
                  <View>
                    <Text style={{ fontFamily: 'Inter-Light', fontSize: 15 }} className='text-gray-800'>
                      {item.Codigo_pedido}
                    </Text>
                    <Text style={{ fontFamily: 'Inter-Light', fontSize: 15 }} className='text-gray-800'>
                      Entrega: {item.Fecha_entrega}
                    </Text>
                  </View>
                  <View>
                    <Image
                      source={{ uri: item.Imagenes[0] }}
                      style={{ width: 100, height: 100 }}
                      contentFit='cover'
                      className='rounded-lg'
                    />
                  </View>
                </Pressable>
              </Card>
            )}
          />
        </SafeAreaView>
      )}
      
      <Modal visible={showCardDetail} transparent={true} animationType='fade'>
        <SafeAreaView className='flex-1 bg-gray-100/10 justify-center items-center'>
          <View className='p-2 gap-4 my-2 w-full h-full' style={{ backgroundColor: 'white' }}>
            <Card>
              <Card.Content style={{ alignItems: 'center', backgroundColor: 'white' }}>
                <Text style={{ fontFamily: 'Inter-Light', fontSize: 18 }} className='text-gray-800'>
                  Modelo: {nameModel}
                </Text>
              </Card.Content>
            </Card>
            
            <View className='items-center my-2'>
              <Image
                source={{ uri: modelImage || undefined }}
                style={{ width: 300, height: 300 }}
                contentFit='cover'
                className='rounded-lg'
              />
            </View>
            
            <Card>
              <Card.Content>
                <Text style={{ fontFamily: 'Inter-Light', fontSize: 16 }} className='text-gray-800'>
                  Codigo: {codigoPedido}
                </Text>
                <Text style={{ fontFamily: 'Inter-Light', fontSize: 16 }} className='text-gray-800'>
                  Estado: {estado}
                </Text>
                <Text style={{ fontFamily: 'Inter-Light', fontSize: 16 }} className='text-gray-800'>
                  Fecha de creación: {dataModelo?.Fecha_creacion.slice(0, 10)}
                </Text>
              </Card.Content>
            </Card>
            
            <View>
              <Pressable
                className='bg-gray-100 items-center rounded-full p-4'
                onPress={() => setShowCardDetail(false)}
              >
                <Text style={{ fontFamily: 'Inter-Regular', fontSize: 16 }} className='text-[#634AFF]'>
                  Cerrar
                </Text>
              </Pressable>
            </View>
          </View>
        </SafeAreaView>
      </Modal>
    </View>
  );
};

export default HistorialPedidosAdmin;