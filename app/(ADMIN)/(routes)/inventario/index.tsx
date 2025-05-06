import { View, Text } from 'react-native'
import React from 'react'
import Dashboard from '@/components/Dashboard'
import InventariadoAdmin from '@/components/inventariado/Inventariado'
import DashboardSinScroll from '@/components/DashBoardSinScroll'

const IndexInventarioAdmin = () => {
  return (
    <DashboardSinScroll>
        <InventariadoAdmin></InventariadoAdmin>
    </DashboardSinScroll>
  )
}

export default IndexInventarioAdmin