import { View, Text } from 'react-native'
import React from 'react'
import Dashboard from '@/components/Dashboard'
import EditarOrden from '@/components/ordenes/Editar'
import DashboardSinScroll from '@/components/DashBoardSinScroll'

const IndexEditarAdmin = () => {
  return (
    <DashboardSinScroll>
        <EditarOrden></EditarOrden>
    </DashboardSinScroll>
  )
}

export default IndexEditarAdmin