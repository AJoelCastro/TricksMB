import { View, Text, TextInput } from 'react-native'
import  { React,useState } from 'react'

import "../global.css"

const FormFieldOrden = ({title, value, onChangeText, otherStyles, ...props }) =>{

    const [showComponent, setshowComponent] = useState(false)

    return(
        <View className=' '>
            <Text className=''>
                {title}
            </Text>
            <View className='my-1'>
                <TextInput
                className='text-black border border-black rounded-lg h-10'
                value={value}
                onChangeText={onChangeText}
                secureTextEntry={title==='Component' && !showComponent}
                >
                </TextInput>
            </View>
        </View>
    )
}
export default FormFieldOrden;