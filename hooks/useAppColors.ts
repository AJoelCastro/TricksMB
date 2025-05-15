// hooks/useAppColors.ts
import { useThemeColor } from './useThemeColor';
import {Colors} from '../constants/Colors'; // Ajusta la ruta si es necesario

export const useAppColors = () => {
  const content = useThemeColor({ light: Colors.light.content, dark: Colors.dark.content }, 'content');
  const icon = useThemeColor({ light: Colors.light.icon, dark: Colors.dark.icon }, 'icon');
  const backIcon = useThemeColor({ light: Colors.light.backIcon, dark: Colors.dark.backIcon }, 'backIcon');
  const background = useThemeColor({ light: Colors.light.background, dark: Colors.dark.background },'background');
  const text = useThemeColor({ light: Colors.light.text, dark: Colors.dark.text }, 'text');
  return {
    content,
    icon,
    backIcon,
    background,
  };
};
