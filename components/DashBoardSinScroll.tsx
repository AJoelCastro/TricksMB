import React, { useRef, useState, useContext } from 'react';
import { View, Text, Modal, Pressable, TouchableWithoutFeedback, findNodeHandle, UIManager, SafeAreaView, ScrollView } from 'react-native';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { ThemedView } from './ThemedView';
import TopBar from '@/components/TopBar';
import { AuthContext } from '@/contexts/AuthContext';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Colors } from '@/constants/Colors';
import { Divider, Icon } from 'react-native-paper';

type Props = {
  children: React.ReactNode;
};

const DashboardSinScroll = ({ children }: Props) => {
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
  const contentColor = useThemeColor({ light: Colors.light.content, dark: Colors.dark.content }, 'content');

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

  return (
    <ThemedView className='h-full'>
      <TopBar
        icon1="menu"
        onPress1={() => navigation.dispatch(DrawerActions.openDrawer())}
        icon2="bell"
        icon3="cog"
        onPress3={openActions}
        pressed={showActions}
        settingsButtonRef={settingsButtonRef}
      />
      {/* seccion en donde debe de ir el children */}
      <SafeAreaView>
        <View style={{marginBottom:32}}>{children}</View>
      </SafeAreaView>

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
                  height: '25%',
                  borderRadius: 8,
                  borderColor: textColor,
                  borderWidth: 1,
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.3,
                  shadowRadius: 5,
                  elevation: 5,
                }}
              >
                <View className='flex-col gap-3 mb-4'>
                  <Text style={{ color: textColor, fontSize: 19, fontWeight: 'bold' }}>
                    {name?.toUpperCase()}
                  </Text>
                  <Text style={{ color: textColor, fontSize: 14 }}>{email?.toUpperCase()}</Text>
                </View>
                <Divider style={{ backgroundColor: textColor, height: 0.3 }} className='mt-3 mb-4' />
                <Pressable onPress={() => setShowActions(false)} className='flex-row items-center mt-4 gap-4'>
                  <Icon source="cog" size={20} color={iconColor} />
                  <Text style={{ color: textColor, fontSize: 16 }}>Configuración</Text>
                </Pressable>
                <Pressable onPress={() => authContext.logOut()} className='flex-row items-center mt-6 gap-4'>
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

export default DashboardSinScroll;