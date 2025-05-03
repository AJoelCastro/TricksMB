import * as React from 'react';
import { Appbar, Avatar } from 'react-native-paper';
import { useColorScheme, View } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Colors } from '@/constants/Colors';
type Props = {
    title?: string;
    icon1?: string;
    onPress1?: () => void;
    icon2?: string;
    onPress2?: () => void;
    icon3?: string;
    onPress3?: () => void;
    pressed?: boolean;
    settingsButtonRef?: React.RefObject<any>; // Cambia el tipo según lo que necesites
};
const TopBar = ({title, icon1, onPress1, icon2, onPress2, icon3, onPress3, pressed, settingsButtonRef }:Props) => {
    const backgroundColor = useThemeColor(
        { light: Colors.light.background, dark: Colors.dark.background },
        'background'
    );
    const textColor = useThemeColor(
        { light: Colors.light.text, dark: Colors.dark.text },
        'text'
    );
    const iconColor = useThemeColor(
        { light: Colors.light.icon, dark: Colors.dark.icon },
        'icon'
    );
    const tabColor = useThemeColor(
        { light: Colors.light.tabIconSelected, dark: Colors.dark.tabIconSelected },
        'tabIconSelected'
    );
    const backIconColor = useThemeColor(
        { light: Colors.light.backIcon, dark: Colors.dark.backIcon },
        'backIcon'
    );
    const contentColor = useThemeColor(
        { light: Colors.light.content, dark: Colors.dark.content },
        'content'
    );
    return(
        <Appbar.Header style={{backgroundColor: backgroundColor, borderBottomWidth: 1, borderBottomColor: tabColor}}>
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: backIconColor, 
                    borderRadius: 20, 
                    paddingHorizontal: 2,
                    paddingVertical: 1,}}
            >
                <Appbar.Action icon={icon1!} onPress={onPress1} color={iconColor}/>
            </View>
            <Appbar.Content title={title} color={iconColor}/>
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: backIconColor,
                    borderRadius: 20, 
                    paddingHorizontal: 2,
                    paddingVertical: 1,}}
            >
                <Appbar.Action icon={icon2!} onPress={onPress2} color={iconColor}/>
            </View>
            <View 
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: pressed ? textColor : backIconColor, 
                    borderRadius: 20, 
                    paddingHorizontal: 2,
                    paddingVertical: 1,
                    marginLeft: 10
                    
                }}
                collapsable={false}
                ref={settingsButtonRef}
            >
                <Avatar.Text size={40} label='J' style={{ marginLeft: 10 }} />
                <Appbar.Action icon={icon3!} onPress={onPress3} color={iconColor}/>
            </View>
        </Appbar.Header>
    )
};

export default TopBar;