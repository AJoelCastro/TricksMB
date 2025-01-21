import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import "../global.css";
import Icon from 'react-native-vector-icons/FontAwesome'; // Usa FontAwesome o la librería que necesites

const Header = ({ title, LeftIcon, RightIcon, onLeftPress, onRightPress }) => {
    return (
        <View className="flex-row items-center justify-between p-4 bg-white border-b border-gray-300">
            {/* Botón izquierdo (ícono opcional) */}
            <TouchableOpacity onPress={onLeftPress}>
                {LeftIcon && <LeftIcon size={24} color="black" />}
            </TouchableOpacity>

            {/* Título central */}
            <Text className="text-lg font-bold text-black">
                {title}
            </Text>

            {/* Botón derecho (ícono opcional) */}
            <TouchableOpacity onPress={onRightPress}>
                {RightIcon && <RightIcon size={24} color="black" />}
            </TouchableOpacity>
        </View>
    );
};

export default Header;


