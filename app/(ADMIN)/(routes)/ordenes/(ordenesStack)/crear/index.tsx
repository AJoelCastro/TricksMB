import { View, Text } from 'react-native'
import React from 'react'
import Dashboard from '@/components/Dashboard'
import CrearOrden from '@/components/ordenes/Crear'
import DashboardSinDrawer from '@/components/DashboardSinDrawer'

const IndexCrearAdmin = () => {
  return (
    <DashboardSinDrawer>
        <CrearOrden></CrearOrden>
    </DashboardSinDrawer>
  )
}

export default IndexCrearAdmin