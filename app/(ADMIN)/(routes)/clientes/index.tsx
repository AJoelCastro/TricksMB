import { View, Text } from 'react-native'
import React from 'react'
import Dashboard from '@/components/Dashboard'
import ClienteAdmin from '@/components/clientes/cliente'

const IndexClientesAdmin = () => {
  return (
    <Dashboard>
        <ClienteAdmin></ClienteAdmin>
    </Dashboard>
  )
}

export default IndexClientesAdmin