import { View, Text } from 'react-native'
import React from 'react'
import Dashboard from '@/components/Dashboard'
import DatosAdmin from '@/components/datos/Datos'

const IndexDatosAdmin = () => {
  return (
    <Dashboard>
        <DatosAdmin></DatosAdmin>
    </Dashboard>
  )
}

export default IndexDatosAdmin