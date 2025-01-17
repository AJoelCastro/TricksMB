import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import  { React,useState } from 'react'

import "../global.css"
import Icon from 'react-native-vector-icons/FontAwesome'; // O cualquier otra librería de íconos

const Header = ({ title, onLeftPress, onRightPress }) => {
    return (
        <View className='w-full '>
            <View 
            className='h-16 items-center'>
                {/* Botón izquierdo (icono opcional) */}
                <TouchableOpacity onPress={onLeftPress}>
                
                </TouchableOpacity>

                {/* Título */}
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'black' }}>
                    {title}
                </Text>

                {/* Botón derecho (icono opcional) */}
                <TouchableOpacity onPress={onRightPress}>
                
                </TouchableOpacity>
            </View>
        </View>
        
    );
};
export default Header;

