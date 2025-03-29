import { View, Text, Pressable, Alert, KeyboardAvoidingView } from 'react-native'
import { TextInput } from 'react-native-paper';
import React, { useEffect, useState } from 'react'
import ClienteService from '../services/ClienteService';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as SplashScreen from 'expo-splash-screen';
import {useFonts} from "expo-font";

SplashScreen.preventAutoHideAsync();
const Modal = () => {

  const [tipoCliente, setTipoCliente] = useState(""); // Estado para el tipo de cliente
  const [clienteNatural, setClienteNatural] = useState("");
  const [representanteLegal, setRepresentanteLegal] = useState("");
  const [dni, setDni] = useState("");
  const [ruc, setRuc] = useState("");
  const [telefonoNatural, setTelefonoNatural] = useState("");
  const [telefonoJuridico, setTelefonoJuridico] = useState("");
  const [razonSocial, setRazonSocial] = useState("");
  
  const [loaded, error] = useFonts({
    'Inter-Black': require('../assets/fonts/DMSans-Regular.ttf'),
  });

  useEffect(() => {
      if (loaded || error) {
          SplashScreen.hideAsync();
      }
  }, [loaded, error]);
  
  if (!loaded && !error) {
  return null;
  }
  
  const validarDatosCliente = (tipoCliente, dni, ruc, telefonoNatural, telefonoJuridico) => {
    if (tipoCliente === "natural") {
        if (!dni || dni.length !== 8) {
            Alert.alert("Error", "El DNI debe tener 8 dígitos");
            return false;
        }
        if (!telefonoNatural || telefonoNatural.length !== 9) {
            Alert.alert("Error", "El teléfono debe tener 9 dígitos");
            return false;
        }
    } else if (tipoCliente === "juridico") {
        if (!ruc || ruc.length !== 11) {
            Alert.alert("Error", "El RUC debe tener 11 dígitos");
            return false;
        }
        if (!telefonoJuridico || telefonoJuridico.length !== 9) {
            Alert.alert("Error", "El teléfono debe tener 9 dígitos");
            return false;
        }
    }
    return true; // Si pasa todas las validaciones
  };

  const handleCrearCliente = async () => {
    try {
        let datosCliente = { tipoCliente }; // Agregar el tipo de cliente
      
        if (tipoCliente === "natural") {
              datosCliente = { ...datosCliente, nombre: clienteNatural, dni, telefono: telefonoNatural }

        } else if (tipoCliente === "juridico") {
              datosCliente = { ...datosCliente, razonSocial, ruc, representanteLegal, telefono: telefonoJuridico }
        }

        if (!validarDatosCliente(tipoCliente, dni, ruc, telefonoNatural, telefonoJuridico)) {
            return; // Si hay error, no se ejecuta la petición
        }

        // Verificar que todos los campos estén llenos
        if (!Object.values(datosCliente).every(valor => valor && valor.trim() !== "")) {
            Alert.alert("Error", "Por favor, completa todos los campos.");
            return;
        }

        await ClienteService.crearCliente(datosCliente,tipoCliente);
        Alert.alert("Éxito", `Cliente ${tipoCliente} creado correctamente`);
        
        // Reiniciar los campos
        setTipoCliente("");
        setDni("");
        setClienteNatural("");
        setTelefonoNatural("");
        setRuc("");
        setRazonSocial("");
        setRepresentanteLegal("");
        setTelefonoJuridico("");
    } catch (error) {
        mostrarError(error);
    }
  };

  const mostrarError = (error) => {
    Alert.alert(
        "Error",
        `${error.message}`,
        [{ text: "OK" }] // Botón requerido
    );
  };
  return (
    <KeyboardAvoidingView 
      behavior='padding' 
      className='p-2 bg-white'
    >
        <Text 
          style={{ fontFamily:'Inter-Black', fontSize:20 }}
        >
          Seleccionar tipo de cliente
        </Text>
        <View 
          className='flex-row justify-center gap-4 mt-4'
        >
          <Pressable 
            onPress={()=>setTipoCliente('natural')} 
            className='bg-gray-100 px-4 py-2 rounded-md w-[45%] gap-2'
          >
            <Icon 
              name='person' 
              size={20} 
              color='#634AFF'
            />
            <Text 
              className='text-[#634AFF]'
            >
              Cliente Natural
            </Text>
          </Pressable>
          <Pressable 
            onPress={()=>setTipoCliente('juridico')} 
            className='bg-gray-100 px-4 py-2 rounded-md w-[45%] gap-2'
          >
            <Icon 
              name='business' 
              size={20} 
              color='#634AFF'
            />
            <Text 
            className='text-[#634AFF]'
            >  
              Cliente Juridico
            </Text>
          </Pressable>
        </View>
        {
          tipoCliente==='natural'&&(
            <View 
              className='mt-4 gap-2'
            >
              <Text 
                style={{ fontFamily:'Inter-Black', fontSize:18 }}
                className='mx-auto '
              >
                Datos del cliente Natural
              </Text>
              <View className='gap-2'>
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
                  label='Numero de telefono'
                  mode='outlined'
                />
              </View>
            </View>
          )
        }
        {
          tipoCliente==='juridico'&&(
            <View 
              className='mt-4 gap-2'
            >
              <Text 
                style={{ fontFamily:'Inter-Black', fontSize:18 }}
                className='mx-auto '
              >
                Datos del cliente Juridico
              </Text>
              <View className='gap-2'>
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
                  placeholder='Razon social' 
                  value={razonSocial} 
                  onChangeText={setRazonSocial} 
                  label='Razon social'
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
                  label='Numero de contacto'
                  mode='outlined'
                />
              </View>
            </View>
          )
        }
        {/* Botón para registrar el cliente */}
        {tipoCliente !== "" && (
            <Pressable className="bg-blue-500 p-4 rounded-lg mt-4" onPress={handleCrearCliente}>
                <Text className="text-white text-center font-bold">Registrar Cliente</Text>
            </Pressable>
        )}
    </KeyboardAvoidingView>
  )
}

export default Modal