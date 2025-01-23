import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import  { React,useState } from 'react'

import "../global.css"

const CustomButtom = ({title, touch}) =>{
    return(
        <TouchableOpacity className='bg-black p-2 rounded-lg mt-4 mb-4 w-full' onPress={touch}>
            <Text className='text-center text-white'>
                {title}
            </Text>
        </TouchableOpacity>
    )
}
export default CustomButtom;