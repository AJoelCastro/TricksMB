import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import ClienteService from '../services/ClienteService';
import { Alert } from 'react-native';
import "../global.css"


const Modal = () => {
    const [tipoCliente, setTipoCliente] = useState(""); // Estado para el tipo de cliente
    const [clienteNatural, setClienteNatural] = useState("");
    const [representanteLegal, setRepresentanteLegal] = useState("");
    const [dni, setDni] = useState("");
    const [ruc, setRuc] = useState("");
    const [telefonoNatural, setTelefonoNatural] = useState("");
    const [telefonoJuridico, setTelefonoJuridico] = useState("");
    const [razonSocial, setRazonSocial] = useState("");
    
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
            Alert.alert("Error", "No se pudo crear el cliente.");
        }
    };

  
  return (
    <View className='p-2'>
        <Text className='mx-auto font-bold text-xl'>Seleccionar tipo de cliente</Text>
        <View className='flex-row justify-between mx-10 mt-4'>
          <View className='bg-[#62d139] p-4 rounded-lg'>
            <TouchableOpacity onPress={()=>setTipoCliente('natural')}>
              <Text className='text-white'>
                Cliente Natural
              </Text>
            </TouchableOpacity>
          </View>
          <View className='bg-[#62d139] p-4 rounded-lg'>
            <TouchableOpacity onPress={()=>setTipoCliente('juridico')}>
              <Text className='text-white'>  
                Cliente Juridico
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {
          tipoCliente==='natural'&&(
            <View className='mt-4'>
              <Text className='mx-auto text-lg font-semibold'>
                Datos del cliente Natural
              </Text>
              <View>
                <View>
                  <Text className='mt-2 font-semibold'>
                    Documento de identidad (DNI)
                  </Text>
                  <TextInput placeholder='DNI' value={dni} onChangeText={setDni} keyboardType='numeric' maxLength={8} className='border p-2 mt-2 rounded-lg'/>
                  
                </View>
                <View>
                  <Text className='mt-2 font-semibold'>
                    Nombres y Apellidos
                  </Text>
                  <TextInput placeholder='Ingrese sus nombres y apellidos' value={clienteNatural} onChangeText={setClienteNatural} className='border p-2 mt-2 rounded-lg'/>
                </View>
                <View>
                  <Text className='mt-2 font-semibold'>
                    Numero de contacto
                  </Text>
                  <TextInput placeholder='Numero de telefono' value={telefonoNatural} onChangeText={setTelefonoNatural} keyboardType='numeric' maxLength={9} className='border p-2 mt-2 rounded-lg'/>
                </View>
              </View>
            </View>
          )
        }
        {
          tipoCliente==='juridico'&&(
            <View className='mt-4'>
              <Text className='mx-auto text-lg font-semibold'>
                Datos del cliente Juridico
              </Text>
              <View>
                <View>
                  <Text className='mt-2 font-semibold'>
                    Ingrese RUC
                  </Text>
                  <TextInput placeholder='Numero RUC' value={ruc} onChangeText={setRuc} keyboardType='numeric' maxLength={11}  className='border p-2 mt-2 rounded-lg'/>
                </View>
                <View>
                  <Text className='mt-2 font-semibold'>
                    Razon social
                  </Text>
                  <TextInput placeholder='Razon social' value={razonSocial} onChangeText={setRazonSocial} className='border p-2 mt-2 rounded-lg'/>
                </View>
                <View>
                  <Text className='mt-2 font-semibold'>
                    Representante Legal
                  </Text>
                  <TextInput placeholder='Datos del RL' value={representanteLegal} onChangeText={setRepresentanteLegal} className='border p-2 mt-2 rounded-lg'/>
                </View>
                <View>
                  <Text className='mt-2 font-semibold'>
                    Numero de contacto
                  </Text>
                  <TextInput placeholder='Numero de telefono' value={telefonoJuridico} onChangeText={setTelefonoJuridico} keyboardType='numeric' maxLength={9} className='border p-2 mt-2 rounded-lg'/>
                </View>
              </View>
            </View>
          )
        }
        {/* Botón para registrar el cliente */}
            {tipoCliente && (
                <TouchableOpacity className="bg-blue-500 p-4 rounded-lg mt-4" onPress={handleCrearCliente}>
                    <Text className="text-white text-center font-bold">Registrar Cliente</Text>
                </TouchableOpacity>
            )}
    </View>
)
}

export default Modal