import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import  { React,useState } from 'react'

import "../global.css"

const Input = ({placeholder}) =>{
    return(
        <View>
            <TextInput placeholder={placeholder}>
            </TextInput>
        </View>
    )
}
export default Input;