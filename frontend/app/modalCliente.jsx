import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import React, { useState } from 'react'
import ClienteService from '../services/ClienteService';
import { Alert } from 'react-native';
import "../global.css"


const Modal = () => {
  const [btnActivo, setBtnActivo] = useState(null);
  const [clienteNatural, setclienteNatural] = useState("");
  const [representanteLegal, setrepresentanteLegal] = useState("");
  const [dni, setdni] = useState("");
  const [ruc, setruc] = useState("");
  const [telefonoNatural, settelefonoNatural] = useState("");
  const [telefonoJuridico, settelefonoJuridico] = useState("");
  const [razonSocial, setrazonSocial] = useState("");

   const handleCrearCliente = async () => {
        try {
            let datosCliente = {};
            let tipo = btnActivo;

            if (tipo === "Natural") {
                datosCliente = { dni, nombre: clienteNatural, telefono: telefonoNatural };
            } else if (tipo === "Juridico") {
                datosCliente = { ruc, razonSocial, representanteLegal, telefono: telefonoJuridico };
            }

            if (!Object.values(datosCliente).every(valor => valor.trim() !== "")) {
                Alert.alert("Error", "Por favor, completa todos los campos.");
                return;
            }

            const respuesta = await ClienteService.crearCliente(datosCliente, tipo);
            Alert.alert("Éxito", `Cliente ${tipo} creado correctamente`);
            
            // Reiniciar los campos
            setDni("");
            setClienteNatural("");
            setTelefonoNatural("");
            setRuc("");
            setRazonSocial("");
            setRepresentanteLegal("");
            setTelefonoJuridico("");
        } catch (error) {
            Alert.alert("Error", "No se pudo crear el cliente.");
        }
    };
  
  return (
    <View className='p-2'>
        <Text className='mx-auto font-bold text-xl'>Seleccionar tipo de cliente</Text>
        <View className='flex-row justify-between mx-10 mt-4'>
          <View className='bg-[#62d139] p-4 rounded-lg'>
            <TouchableOpacity onPress={()=>setBtnActivo('Natural')}>
              <Text className='text-white'>
                Cliente Natural
              </Text>
            </TouchableOpacity>
          </View>
          <View className='bg-[#62d139] p-4 rounded-lg'>
            <TouchableOpacity onPress={()=>setBtnActivo('Juridico')}>
              <Text className='text-white'>  
                Cliente Juridico
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {
          btnActivo==='Natural'&&(
            <View className='mt-4'>
              <Text className='mx-auto text-lg font-semibold'>
                Datos del cliente Natural
              </Text>
              <View>
                <View>
                  <Text className='mt-2 font-semibold'>
                    Documento de identidad (DNI)
                  </Text>
                  <TextInput placeholder='DNI' value={dni} onChangeText={setdni} className='border p-2 mt-2 rounded-lg'/>
                </View>
                <View>
                  <Text className='mt-2 font-semibold'>
                    Nombres y Apellidos
                  </Text>
                  <TextInput placeholder='Ingrese sus nombres y apellidos' value={clienteNatural} onChangeText={setclienteNatural} className='border p-2 mt-2 rounded-lg'/>
                </View>
                <View>
                  <Text className='mt-2 font-semibold'>
                    Numero de contacto
                  </Text>
                  <TextInput placeholder='Numero de telefono' value={telefonoNatural} onChangeText={settelefonoNatural} className='border p-2 mt-2 rounded-lg'/>
                </View>
              </View>
            </View>
          )
        }
        {
          btnActivo==='Juridico'&&(
            <View className='mt-4'>
              <Text className='mx-auto text-lg font-semibold'>
                Datos del cliente Juridico
              </Text>
              <View>
                <View>
                  <Text className='mt-2 font-semibold'>
                    Ingrese RUC
                  </Text>
                  <TextInput placeholder='Numero RUC' value={ruc} onChangeText={setruc} className='border p-2 mt-2 rounded-lg'/>
                </View>
                <View>
                  <Text className='mt-2 font-semibold'>
                    Razon social
                  </Text>
                  <TextInput placeholder='Razon social' value={razonSocial} onChangeText={setrazonSocial} className='border p-2 mt-2 rounded-lg'/>
                </View>
                <View>
                  <Text className='mt-2 font-semibold'>
                    Representante Legal
                  </Text>
                  <TextInput placeholder='Datos del RL' value={representanteLegal} onChangeText={setrepresentanteLegal} className='border p-2 mt-2 rounded-lg'/>
                </View>
                <View>
                  <Text className='mt-2 font-semibold'>
                    Numero de contacto
                  </Text>
                  <TextInput placeholder='Numero de telefono' value={telefonoJuridico} onChangeText={settelefonoJuridico} className='border p-2 mt-2 rounded-lg'/>
                </View>
              </View>
            </View>
          )
        }
        {/* Botón para registrar el cliente */}
            {btnActivo && (
                <TouchableOpacity className="bg-blue-500 p-4 rounded-lg mt-4" onPress={handleCrearCliente}>
                    <Text className="text-white text-center font-bold">Registrar Cliente</Text>
                </TouchableOpacity>
            )}
    </View>
)
}

export default Modal