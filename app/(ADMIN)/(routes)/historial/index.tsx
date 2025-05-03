import { View, Text } from 'react-native'
import React from 'react'
import Dashboard from '@/components/Dashboard'
import HistorialPedidosAdmin from '@/components/historial/HistorialPedidos'

const IndexHistorialAdmin = () => {
  return (
    <Dashboard>
        <HistorialPedidosAdmin></HistorialPedidosAdmin>
    </Dashboard>
  )
}

export default IndexHistorialAdmin