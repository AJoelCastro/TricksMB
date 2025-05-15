import { View, Text } from 'react-native'
import React from 'react'
import Dashboard from '@/components/Dashboard'
import CancelarOrden from '@/components/ordenes/Cancelar'
import DashboardSinDrawerNiScroll from '@/components/DashboardSinDrawerNiScroll'

const IndexCancelarAdmin = () => {
  return (
    <DashboardSinDrawerNiScroll>
        <CancelarOrden></CancelarOrden>
    </DashboardSinDrawerNiScroll>
  )
}

export default IndexCancelarAdmin