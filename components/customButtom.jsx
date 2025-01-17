import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import  { React,useState } from 'react'

import "../global.css"

const CustomButtom = ({title}) =>{
    return(
        <TouchableOpacity style={{width:'10%'}} onPress={()=>{}} className='bg-black p-4 rounded-md mt-5 mb-4'>
            <Text className='text-center text-white'>
                {title}
            </Text>
        </TouchableOpacity>
    )
}
export default CustomButtom;