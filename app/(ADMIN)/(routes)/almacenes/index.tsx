import { View, Text } from 'react-native'
import React from 'react'
import Dashboard from '@/components/Dashboard'
import AlmacenAdmin from '@/components/almacenes/Almacen'

const IndexAlmacenesAdmin = () => {
  return (
    <Dashboard>
        <AlmacenAdmin></AlmacenAdmin>
    </Dashboard>
  )
}

export default IndexAlmacenesAdmin