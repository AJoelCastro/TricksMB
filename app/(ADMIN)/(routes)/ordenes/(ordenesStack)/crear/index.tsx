import { View, Text } from 'react-native'
import React from 'react'
import Dashboard from '@/components/Dashboard'
import CrearOrden from '@/components/ordenes/Crear'
import DashboardSinDrawer from '@/components/DashboardSinDrawer'
import DashboardSinDrawerNiScroll from '@/components/DashboardSinDrawerNiScroll'

const IndexCrearAdmin = () => {
  return (
    <DashboardSinDrawerNiScroll>
        <CrearOrden></CrearOrden>
    </DashboardSinDrawerNiScroll>
  )
}

export default IndexCrearAdmin