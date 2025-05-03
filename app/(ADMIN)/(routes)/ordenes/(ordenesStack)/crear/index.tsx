import { View, Text } from 'react-native'
import React from 'react'
import Dashboard from '@/components/Dashboard'
import CrearOrden from '@/components/ordenes/Crear'

const IndexCrearAdmin = () => {
  return (
    <Dashboard>
        <CrearOrden></CrearOrden>
    </Dashboard>
  )
}

export default IndexCrearAdmin