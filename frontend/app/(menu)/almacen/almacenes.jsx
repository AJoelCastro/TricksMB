import Header from '@/components/Header'
import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/FontAwesome'
import CustomButtom from '../../../components/customButtom'

import './../../../global.css';

export default function Almacen(){
    return (
      <View>
        <View>
          <Header title={"Almacén Seleccionado"}
            LeftIcon = {() => <Icon name ="cog" size = {24} color="black"/>}
            RightIcon= { () => <Icon name ="user" size = {24} color="black"/>}
            onLeftPress={ () => console.log("Configuración presionada")}
            onRightPress={() => console.log("Perfil Seleccionado")} 
          ></Header>
          <CustomButtom title={"Ingresar Productos"} ></CustomButtom>
          <CustomButtom title={"Registrar Venta"}></CustomButtom>
        </View>
        <View className= 'mt-5'>
          <Text className='text-center text-black font-bold text-xl'>Tipo de movimiento</Text>
        </View>
        <View>
          <CustomButtom title={"Translado"} ></CustomButtom>
          <CustomButtom title={"Devolución"}></CustomButtom>
        </View>
      </View>
      


    )
}
