import React, { useRef, useState, useContext, useEffect } from 'react';
import { View, Text, Modal, Pressable, TouchableWithoutFeedback, Dimensions, ScaledSize, SafeAreaView, ScrollView } from 'react-native';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { ThemedView } from '@/components/ThemedView';
import TopBar from '@/components/TopBar';
import { AuthContext } from '@/contexts/AuthContext';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Colors } from '@/constants/Colors';
import { Divider, Icon } from 'react-native-paper';

import * as ScreenOrientation from 'expo-screen-orientation';
type Props = {
  children: React.ReactNode;
};

const DashboardSinDrawerNiScroll = ({ children }: Props) => {

  const [height, setHeight] = useState(Dimensions.get('window').height);
  const [typeScreen, setTypeScreen] = useState<string>('');
  const authContext = useContext(AuthContext);
  const [showActions, setShowActions] = useState(false);
  const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const settingsButtonRef = useRef<View>(null);
  const name = authContext.user?.name;
  const email = authContext.user?.email;
  const navigation = useNavigation();

  const backgroundColor = useThemeColor({ light: Colors.light.background, dark: Colors.dark.background }, 'background');
  const textColor = useThemeColor({ light: Colors.light.text, dark: Colors.dark.text }, 'text');
  const iconColor = useThemeColor({ light: Colors.light.icon, dark: Colors.dark.icon }, 'icon');
  const backIconColor = useThemeColor({ light: Colors.light.backIcon, dark: Colors.dark.backIcon }, 'backIcon');

  const openActions = () => {
    requestAnimationFrame(() => {
      if (settingsButtonRef.current?.measureInWindow) {
        settingsButtonRef.current.measureInWindow((x, y, width, height) => {
          setButtonPosition({ x, y, width, height });
          setShowActions(true);
        });
      }
    });
  };
  useEffect(() => {
    // Se ejecuta cada vez que cambia la orientación o tamaño de la pantala
    const handleChange = ({ window }: { window: ScaledSize }) => {
      setHeight(window.height);
    };

    // Escucha algun cambio de dimensiones
    const subscription = Dimensions.addEventListener('change', handleChange);

    // Se elimina el listener cuando el componente se desmonta
    return () => {
      subscription?.remove?.();
    };
  }, []);

  useEffect(() => {
    // Convertir el valor numérico a un nombre legible
    const getOrientationName = (orientation: ScreenOrientation.Orientation) => {
      switch (orientation) {
        case ScreenOrientation.Orientation.PORTRAIT_UP:
          return 'Portrait Up';
        case ScreenOrientation.Orientation.PORTRAIT_DOWN:
          return 'Portrait Down';
        case ScreenOrientation.Orientation.LANDSCAPE_LEFT:
          return 'Landscape Left';
        case ScreenOrientation.Orientation.LANDSCAPE_RIGHT:
          return 'Landscape Right';
        default:
          return 'Unknown';
      }
    };

    // Se ejecuta cada vez que cambia la orientación
    const subscription = ScreenOrientation.addOrientationChangeListener(event => {
      const orientation = event.orientationInfo.orientation;
      setTypeScreen(getOrientationName(orientation));
    });

    // Obtiene la orientación inicial
    (async () => {
      const orientation = await ScreenOrientation.getOrientationAsync();
      setTypeScreen(getOrientationName(orientation));
    })();

    // Limpia el listener al desmontar
    return () => {
      ScreenOrientation.removeOrientationChangeListener(subscription);
    };
  }, []);

  return (
    <ThemedView className='h-full' style={{ backgroundColor }}>
      <TopBar
        icon1="arrow-left"
        onPress1={() => navigation.goBack()}
        icon2="bell"
        icon3="cog"
        onPress3={openActions}
        pressed={showActions}
        settingsButtonRef={settingsButtonRef}
      />
      {/* seccion en donde debe de ir el children */}
        <View style={{marginBottom:32, flex:1}}>{children}</View>

      {/* Modal de acciones */}
      <Modal
        visible={showActions}
        transparent
        animationType="fade"
        onRequestClose={() => setShowActions(false)}
      >
        <TouchableWithoutFeedback onPress={() => setShowActions(false)}>
          <View style={{ flex: 1, backgroundColor: 'transparent' }}>
            <TouchableWithoutFeedback>
              <View
                style={{
                  top: buttonPosition.y + buttonPosition.height + 10,
                  right: 5,
                  position: 'absolute',
                  backgroundColor: backIconColor,
                  paddingVertical: 20,
                  paddingHorizontal: 25,
                  width: '70%',
                  height: typeScreen === 'Portrait Up' ? height / 4 : height / 2,
                  borderRadius: 8,
                  borderColor: textColor,
                  borderWidth: 1,
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.3,
                  shadowRadius: 5,
                  elevation: 5,
                }}
                className='justify-between'
              >
                <View className='flex-col gap-3'>
                  <Text style={{ color: textColor, fontSize: 19, fontWeight: 'bold' }}>
                    {name?.toUpperCase()}
                  </Text>
                  <Text style={{ color: textColor, fontSize: 14 }}>{email?.toUpperCase()}</Text>
                </View>
                <Divider style={{ backgroundColor: textColor, height: 0.3 }} />
                <Pressable onPress={() => setShowActions(false)} className='flex-row items-center gap-4'>
                  <Icon source="cog" size={20} color={iconColor} />
                  <Text style={{ color: textColor, fontSize: 16 }}>Configuración</Text>
                </Pressable>
                <Pressable onPress={() => authContext.logOut()} className='flex-row items-center gap-4'>
                  <Icon source="logout" size={20} color={iconColor} />
                  <Text style={{ color: textColor, fontSize: 16 }}>Cerrar sesión</Text>
                </Pressable>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </ThemedView>
  );
};

export default DashboardSinDrawerNiScroll;