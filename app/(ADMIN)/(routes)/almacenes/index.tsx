import { View, Text } from 'react-native'
import React from 'react'
import Dashboard from '@/components/Dashboard'
import AlmacenAdmin from '@/components/almacenes/Almacen'
import DashboardSinScroll from '@/components/DashBoardSinScroll'

const IndexAlmacenesAdmin = () => {
  return (
    <DashboardSinScroll>
        <AlmacenAdmin></AlmacenAdmin>
    </DashboardSinScroll>
  )
}

export default IndexAlmacenesAdmin