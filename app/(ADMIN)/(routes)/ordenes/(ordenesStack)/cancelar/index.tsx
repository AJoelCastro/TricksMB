import { View, Text } from 'react-native'
import React from 'react'
import Dashboard from '@/components/Dashboard'
import CancelarOrden from '@/components/ordenes/Cancelar'

const IndexCancelarAdmin = () => {
  return (
    <Dashboard>
        <CancelarOrden></CancelarOrden>
    </Dashboard>
  )
}

export default IndexCancelarAdmin