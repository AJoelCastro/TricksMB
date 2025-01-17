import { View, Text, TextInput } from 'react-native'
import  { React,useState } from 'react'

import "../global.css"

const FormFieldOrden = ({title, value, placeholder, handleChangeText, otherStyles, ...props }) =>{

    const [showComponent, setshowComponent] = useState(false)

    return(
        <View>
            <Text>
                {title}
            </Text>
            <View>
                <TextInput
                className='text-black bg-black h-24 '
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