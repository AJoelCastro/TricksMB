import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import  { React,useState } from 'react'

import "../global.css"

const CustomButtom = ({title}) =>{
    return(
        <TouchableOpacity className='bg-black p-2 rounded-lg mt-6 mb-4 mx-32'>
            <Text className='text-center text-white'>
                {title}
            </Text>
        </TouchableOpacity>
    )
}
export default CustomButtom;