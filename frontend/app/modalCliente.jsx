import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import React, { useState } from 'react'
import "../global.css"
const Modal = () => {
  const [btnActivo, setBtnActivo] = useState(null);
  const [clienteNatural, setclienteNatural] = useState("");
  const [representanteLegal, setrepresentanteLegal] = useState("");
  const [dni, setdni] = useState("");
  const [ruc, setruc] = useState("");
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
                  <TextInput placeholder='Ingrese sus nombres y apellidos' value={dni} onChangeText={setdni} className='border p-2 mt-2 rounded-lg'/>
                </View>
                <View>
                  <Text className='mt-2 font-semibold'>
                    Nombres y Apellidos
                  </Text>
                  <TextInput placeholder='Ingrese sus nombres y apellidos' value={clienteNatural} onChangeText={setclienteNatural} className='border p-2 mt-2 rounded-lg'/>
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
                  <TextInput placeholder='Ingrese sus nombres y apellidos' value={ruc} onChangeText={setruc} className='border p-2 mt-2 rounded-lg'/>
                </View>
                <View>
                  <Text className='mt-2 font-semibold'>
                    Representante Legal
                  </Text>
                  <TextInput placeholder='Ingrese sus nombres y apellidos' value={representanteLegal} onChangeText={setrepresentanteLegal} className='border p-2 mt-2 rounded-lg'/>
                </View>
              </View>
            </View>
          )
        }
    </View>
)
}

export default Modal