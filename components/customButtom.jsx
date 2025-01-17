import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import  { React,useState } from 'react'

import "../global.css"

const CustomButtom = ({title}) =>{
    return(
        <TouchableOpacity onPress={()=>{}} className='bg-black rounded-md mt-5'>
            <Text className='text-white'>
                {title}
            </Text>
        </TouchableOpacity>

    )
}
export default CustomButtom;