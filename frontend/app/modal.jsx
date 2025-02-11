import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import "../global.css"
const Modal = () => {
  return (
    <View className='h-[30%]'>
      <Text>Crear Cliente Nuevo</Text>
      <TouchableOpacity>
        <Text>Si</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text>No</Text>
      </TouchableOpacity>
    </View>
)
}

export default Modal