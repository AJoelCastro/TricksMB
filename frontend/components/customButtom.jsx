import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import  { React,useState } from 'react'

import "../global.css"

const CustomButtom = ({title, touch, disabled}) =>{
    return(
        <TouchableOpacity className='bg-gray-800 p-2 rounded-lg mt-4 mb-4 w-full' onPress={() => touch?.()} disabled={disabled}>
            <Text className='text-center text-white'>
                {title}
            </Text>
        </TouchableOpacity>
    )
}
export default CustomButtom;