import { View, Text } from 'react-native';
import React from 'react';
import { useLocalSearchParams } from 'expo-router';

import DashboardSinDrawerNiScroll from '@/components/DashboardSinDrawerNiScroll';

import EtapaCorte from '@/components/etapas/Corte';
import EtapaPerfilado from '@/components/etapas/Perfilado';
import EtapaArmado from '@/components/etapas/Armado';
import EtapaAlistado from '@/components/etapas/Alistado';

const IndexEtapaOrdenAdmin = () => {
  const { etapa } = useLocalSearchParams();
  const etapaComponents: Record<string, React.ReactNode> = {
    corte: <EtapaCorte />,
    perfilado: <EtapaPerfilado />,
    armado: <EtapaArmado />,
    alistado: <EtapaAlistado />,
  };

  const contenido = etapaComponents[etapa as string] ?? <Text>Etapa no válida</Text>;

  return <DashboardSinDrawerNiScroll>{contenido}</DashboardSinDrawerNiScroll>;
};

export default IndexEtapaOrdenAdmin;
