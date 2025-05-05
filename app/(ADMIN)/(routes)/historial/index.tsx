import { View, Text } from 'react-native'
import React from 'react'
import Dashboard from '@/components/Dashboard'
import HistorialPedidosAdmin from '@/components/historial/HistorialPedidos'
import DashboardSinScroll from '@/components/DashBoardSinScroll'

const IndexHistorialAdmin = () => {
  return (
    <DashboardSinScroll>
        <HistorialPedidosAdmin></HistorialPedidosAdmin>
    </DashboardSinScroll>
  )
}

export default IndexHistorialAdmin