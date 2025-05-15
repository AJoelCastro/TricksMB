import { View, Text } from 'react-native'
import React from 'react'
import Dashboard from '@/components/Dashboard'
import IndexActualizarOrden from '@/components/ordenes/Actualizar'
import DashboardSinScroll from '@/components/DashBoardSinScroll'
import DashboardSinDrawer from '@/components/DashboardSinDrawer'

const IndexActualizarAdmin = () => {
  return (
    <DashboardSinDrawer>
        <IndexActualizarOrden></IndexActualizarOrden>
    </DashboardSinDrawer>
  )
}

export default IndexActualizarAdmin