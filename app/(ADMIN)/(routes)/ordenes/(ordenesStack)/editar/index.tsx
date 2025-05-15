import { View, Text } from 'react-native'
import React from 'react'
import Dashboard from '@/components/Dashboard'
import EditarOrden from '@/components/ordenes/Editar'
import DashboardSinScroll from '@/components/DashBoardSinScroll'
import DashboardSinDrawer from '@/components/DashboardSinDrawer'
import DashboardSinDrawerNiScroll from '@/components/DashboardSinDrawerNiScroll'

const IndexEditarAdmin = () => {
  return (
    <DashboardSinDrawerNiScroll>
        <EditarOrden></EditarOrden>
    </DashboardSinDrawerNiScroll>
  )
}

export default IndexEditarAdmin