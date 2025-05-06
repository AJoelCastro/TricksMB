import { View, Text } from 'react-native'
import React from 'react'
import Dashboard from '@/components/Dashboard'
import { useLocalSearchParams } from 'expo-router'
import DashboardSinScroll from '@/components/DashBoardSinScroll'
import EtapaCorte from '@/components/etapas/Corte'

const IndexEtapaOrdenAdmin = () => {
  const data = useLocalSearchParams();
  console.log(data);
  const codigoOrden = useLocalSearchParams().codigoOrden;
  const etapa = useLocalSearchParams().etapa;
  if(etapa === "corte"){
    return (
      <DashboardSinScroll>
          <EtapaCorte></EtapaCorte>
      </DashboardSinScroll>
    )
  }
  return (
    <Dashboard>
        <></>
    </Dashboard>
  )
}

export default IndexEtapaOrdenAdmin