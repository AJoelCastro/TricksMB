import { View, TextInput, TouchableOpacity } from 'react-native'
import  { React } from 'react'

import "../global.css"

const Input = ({placeholder, RightIcon}) =>{
    return(
        <View className=' border mx-16 mt-6 rounded-xl flex-row justify-between items-center '>
            <TextInput className='w-[90%]' placeholder={placeholder}>
            </TextInput>
            <TouchableOpacity className='mr-2' onPress={()=>{}}>
                {RightIcon && <RightIcon size={16} color="black" />}
            </TouchableOpacity>
            
        </View>
    )
}
export default Input;