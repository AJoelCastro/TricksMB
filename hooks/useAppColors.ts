// hooks/useAppColors.ts
import { useThemeColor } from './useThemeColor';
import {Colors} from '../constants/Colors'; // Ajusta la ruta si es necesario

export const useAppColors = () => {
  const content = useThemeColor({ light: Colors.light.content, dark: Colors.dark.content }, 'content');
  const icon = useThemeColor({ light: Colors.light.icon, dark: Colors.dark.icon }, 'icon');
  const backIcon = useThemeColor({ light: Colors.light.backIcon, dark: Colors.dark.backIcon }, 'backIcon');
  
  return {
    content,
    icon,
    backIcon,
  };
};
