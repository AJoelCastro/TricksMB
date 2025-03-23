import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/FontAwesome'
import CustomButtom from '../../../components/customButtom'


export default function Almacen(){
    return (
      <View className='mx-4 mt-2'>
        <View>
          
          <CustomButtom 
            title="Ingresar Productos"
          />
          <CustomButtom 
            title="Registrar Venta"
          />
        </View>
        <View className= 'mt-5'>
          <Text className='text-center text-black font-bold text-xl'>Tipo de movimiento</Text>
        </View>
        <View>
          <CustomButtom title="Translado" />
          <CustomButtom title="Devolución"/>
        </View>
      </View>
      


    )
}
