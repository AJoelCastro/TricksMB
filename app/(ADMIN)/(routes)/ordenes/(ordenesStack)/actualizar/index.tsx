import { View, Text } from 'react-native'
import React from 'react'
import Dashboard from '@/components/Dashboard'
import IndexActualizarOrden from '@/components/ordenes/Actualizar'
import DashboardSinScroll from '@/components/DashBoardSinScroll'

const IndexActualizarAdmin = () => {
  return (
    <DashboardSinScroll>
        <IndexActualizarOrden></IndexActualizarOrden>
    </DashboardSinScroll>
  )
}

export default IndexActualizarAdmin