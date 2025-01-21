import { View, Text, TextInput } from 'react-native'
import  { React,useState } from 'react'

import "../global.css"

const FormFieldOrden = ({title, value, placeholder, handleChangeText, otherStyles, ...props }) =>{

    const [showComponent, setshowComponent] = useState(false)

    return(
        <View className='flex gap-2'>
            <Text className='mx-5'>
                {title}
            </Text>
            <View>
                <TextInput
                className='text-black border border-black rounded-lg h-10 mx-5'
                value={value}
                placeholder={placeholder}
                placeholderTextColor="#7b7b8b"
                onChangeText={handleChangeText}
                secureTextEntry={title==='Component' && !showComponent}
                >
                </TextInput>
            </View>
        </View>
    )
}
export default FormFieldOrden;