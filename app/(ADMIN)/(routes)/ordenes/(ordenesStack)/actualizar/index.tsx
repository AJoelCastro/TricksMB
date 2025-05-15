import { View, Text } from 'react-native'
import React from 'react'
import Dashboard from '@/components/Dashboard'
import IndexActualizarOrden from '@/components/ordenes/Actualizar'
import DashboardSinScroll from '@/components/DashBoardSinScroll'
import DashboardSinDrawer from '@/components/DashboardSinDrawer'
import DashboardSinDrawerNiScroll from '@/components/DashboardSinDrawerNiScroll'

const IndexActualizarAdmin = () => {
  return (
    <DashboardSinDrawerNiScroll>
        <IndexActualizarOrden></IndexActualizarOrden>
    </DashboardSinDrawerNiScroll>
  )
}

export default IndexActualizarAdmin