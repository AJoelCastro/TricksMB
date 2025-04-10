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
import { Card, Divider } from 'react-native-paper';
import { useFocusEffect, useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { useFonts } from 'expo-font';

import * as SplashScreen from 'expo-splash-screen';

// Cargar la fuente (Font Awesome 5 y Material Community Icons)
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import Icon3 from 'react-native-vector-icons/MaterialCommunityIcons';
import DetallePedidoService from '@/services/DetallePedidoService';
import ModeloService from '@/services/ModeloService';

SplashScreen.preventAutoHideAsync();

const Historial = () => {
  const router = useRouter();
  const [estado, setEstado] = useState(null);
  const [mostrarPedidos, setMostrarPedidos] = useState(false);
  const [data, setData] = useState(null);
  const [historial, setHistorial] = useState(null);
  const [showCardDetail, setShowCardDetail] = useState(false);
  const [codigoPedido, setCodigoPedido] = useState(null);
  const [dataModelo, setdataModelo] = useState(null);
  const [modelImage, setModelImage] = useState(null);
  const [nameModel, setNameModel] = useState(null);
  const [loaded, error] = useFonts({
    'Inter-Black': require('../../../assets/fonts/DMSans-Regular.ttf'),
    'Inter-Light': require('../../../assets/fonts/DMSans-Light.ttf'),
  });

  useFocusEffect(
    useCallback(() => {
      const obtenerHistorial = async () => {
        try {
          const historial = await DetallePedidoService.getHistorialPedidos();
          setHistorial(historial.historialPedidos);
        } catch (error) {
          mostrarError(error);
        }
      };
      obtenerHistorial();
    }, [])
  );

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  useEffect(() => {
    setdataModelo(null);
    setModelImage(null);
    setNameModel(null);
    if (historial === null) return;
    const dataHistorial = historial.filter(item => item.Estado === estado);
    setData(dataHistorial);
    if (dataHistorial.length === 0) {
      Alert.alert(
        'Error',
        `No hay pedidos para este estado`,
        [{ text: 'OK' }] // Botón requerido
      );
      setMostrarPedidos(false);
    } else {
      setMostrarPedidos(true);
    }
  }, [estado]);
  useEffect(() => {
    if(data===null) return;
    if (codigoPedido === null) return;
    const obtenerDetallePedido = async () => {
      try {
        const dataPedido = await DetallePedidoService.obtenerDetallePedido(codigoPedido);
        console.log(dataPedido);
        // Actualizar el estado con los datos del detalle del pedido
        setdataModelo(dataPedido.detallePedido);
        const model = await ModeloService.getModeloByCodigoPedido(codigoPedido);
        console.log(model);
        setNameModel(model.modelo.Nombre);
        let idModelo = dataPedido.detallePedido.Modelo_idModelo;
        const imagenModelo = await ModeloService.getImagenById(idModelo);
        setModelImage(imagenModelo.imagen[0].Url);
      } catch (error) {
        mostrarError(error);
      }
    };
    obtenerDetallePedido();
  }, [codigoPedido])
  

  if (!loaded && !error) {
    return null;
  }

  const mostrarError = error => {
    Alert.alert(
      'Error',
      `${error.message}`,
      [{ text: 'OK' }] // Botón requerido
    );
  };

  return (
    <View className='bg-white flex-1 p-2 gap-4'>
      <Text
        style={{ fontFamily: 'Inter-Light', fontSize: 28 }}
        className='text-gray-600 my-4'
      >
        Historial de pedidos
      </Text>
      <View className='flex-col gap-2 '>
        <View className='flex-row  justify-between'>
          <View className='items-center gap-2'>
            <Pressable
              className='bg-gray-100 rounded-full p-4'
              onPress={() => setEstado('Editable')}
            >
              <Icon name='square-o' size={20} color='#634AFF' />
            </Pressable>
            <View>
              <Text
                style={{ fontFamily: 'Inter-Light', fontSize: 15 }}
                className='text-gray-800'
              >
                Pendientes
              </Text>
            </View>
          </View>

          <View className='items-center gap-2'>
            <Pressable
              className='bg-gray-100 rounded-full p-4'
              onPress={() => setEstado('Finalizado')}
            >
              <Icon name='check' size={20} color='green' />
            </Pressable>
            <View>
              <Text
                style={{ fontFamily: 'Inter-Light', fontSize: 15 }}
                className='text-gray-800'
              >
                Completadas
              </Text>
            </View>
          </View>
          <View className='items-center gap-2'>
            <Pressable
              className='bg-gray-100 rounded-full p-4'
              onPress={() => setEstado('Vencido')}
            >
              <Icon name='exclamation-circle' size={20} color='yellow' />
            </Pressable>
            <View>
              <Text
                style={{ fontFamily: 'Inter-Light', fontSize: 15 }}
                className='text-gray-800'
              >
                Vencidas
              </Text>
            </View>
          </View>
        </View>
        <Divider style={{ marginVertical: 5, backgroundColor: '#634AFF' }} />
        <View className='flex-row  justify-center gap-[15%]'>
          <View className='items-center gap-2'>
            <Pressable
              className='bg-gray-100 rounded-full p-4'
              onPress={() => setEstado('Proceso')}
            >
              <Icon2 name='check-square' size={20} color='blue' />
            </Pressable>
            <View>
              <Text
                style={{ fontFamily: 'Inter-Light', fontSize: 15 }}
                className='text-gray-800'
              >
                En Proceso
              </Text>
            </View>
          </View>
          <View className='items-center gap-2'>
            <Pressable
              className='bg-gray-100 rounded-full p-4'
              onPress={() => setEstado('Cancelado')}
            >
              <Icon name='times' size={20} color='red' />
            </Pressable>
            <View>
              <Text
                style={{ fontFamily: 'Inter-Light', fontSize: 15 }}
                className='text-gray-800'
              >
                Canceladas
              </Text>
            </View>
          </View>
        </View>
      </View>
      {mostrarPedidos ? (
        <SafeAreaView className='flex-1 mt-4 bg-white'>
          <FlatList
            data={data}
            keyExtractor={item => item.Codigo_pedido}
            renderItem={({ item }) => (
              <Card
                className='p-2 gap-4 my-2'
                style={{ backgroundColor: 'white' }}
              >
                <Pressable
                  className='flex-row gap-2 justify-between items-center'
                  onPress={() => {
                    setShowCardDetail(!showCardDetail);
                    setCodigoPedido(item.Codigo_pedido);
                    
                  }}
                >
                  <View className='bg-gray-100 rounded-full p-4'>
                    <Icon name='shopping-cart' size={20} color='#634AFF' />
                  </View>
                  <View>
                    <Text
                      style={{ fontFamily: 'Inter-Light', fontSize: 15 }}
                      className='text-gray-800'
                    >
                      {item.Codigo_pedido}
                    </Text>
                    <Text
                      style={{ fontFamily: 'Inter-Light', fontSize: 15 }}
                      className='text-gray-800 '
                    >
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
      ) : null}
      <Modal visible={showCardDetail} transparent={true} animationType='fade'>
        <SafeAreaView className='flex-1 bg-gray-100/10 justify-center items-center'>
          <View
            className='p-2 gap-4 my-2  w-full h-full'
            style={{ backgroundColor: 'white' }}
          >
            <Card>
              <Card.Content style={{ alignItems: 'center', backgroundColor: 'white' }}>
                <Text
                  style={{ fontFamily: 'Inter-Light', fontSize: 18 }}
                  className='text-gray-800'
                >
                  Modelo: {nameModel}
                </Text>
              </Card.Content>
            </Card>
            <View className='items-center my-2'>
              <Image
                source={{ uri: modelImage }}
                style={{ width: 300, height: 300 }}
                contentFit='cover'
                className='rounded-lg'
              />
            </View>
            <Card>
              <Card.Content>
                <Text
                  style={{ fontFamily: 'Inter-Light', fontSize: 16 }}
                  className='text-gray-800'
                >
                  Codigo: {codigoPedido}
                </Text>
                <Text
                  style={{ fontFamily: 'Inter-Light', fontSize: 16 }}
                  className='text-gray-800'
                >
                  Estado: {estado}
                </Text>
                <Text
                  style={{ fontFamily: 'Inter-Light', fontSize: 16 }}
                  className='text-gray-800'
                >
                  Fecha de creacion: {dataModelo?.Fecha_creacion.slice(0, 10)}
                </Text>
              </Card.Content>
            </Card>
            <View>
              <Pressable
                className='bg-gray-100 items-center rounded-full p-4'
                onPress={() => setShowCardDetail(!showCardDetail)}
              >
                <Text 
                  style={{ fontFamily: 'Inter-Regular', fontSize: 16 }}
                  className='text-[#634AFF]'
                >
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
export default Historial;
