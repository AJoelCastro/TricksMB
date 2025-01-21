import Header from '@/components/Header'
import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/FontAwesome'

export default function Almacen(){
    return (
      <SafeAreaView>
        <Header title={"Almacén Seleccionado"}
          LeftIcon = {() => <Icon name ="cog" size = {24} color="black"/>}
          RightIcon= { () => <Icon name ="user" size = {24} color="black"/>}
          onLeftPress={ () => console.log("Configuración presionada")}
          onRightPress={() => console.log("Perfil Seleccionado")} 
        ></Header>
      </SafeAreaView>
      
    )
}
