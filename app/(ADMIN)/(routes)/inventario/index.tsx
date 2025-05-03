import { View, Text } from 'react-native'
import React from 'react'
import Dashboard from '@/components/Dashboard'
import InventariadoAdmin from '@/components/inventariado/Inventariado'

const IndexInventarioAdmin = () => {
  return (
    <Dashboard>
        <InventariadoAdmin></InventariadoAdmin>
    </Dashboard>
  )
}

export default IndexInventarioAdmin