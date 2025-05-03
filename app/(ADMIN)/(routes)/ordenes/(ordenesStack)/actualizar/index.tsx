import { View, Text } from 'react-native'
import React from 'react'
import Dashboard from '@/components/Dashboard'
import IndexActualizarOrden from '@/components/ordenes/Actualizar'

const IndexActualizarAdmin = () => {
  return (
    <Dashboard>
        <IndexActualizarOrden></IndexActualizarOrden>
    </Dashboard>
  )
}

export default IndexActualizarAdmin