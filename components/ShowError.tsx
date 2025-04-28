import { View, Text, Alert } from 'react-native'
import React from 'react'

const ShowError = (error : Error) => {
    return (
        Alert.alert("Error", error.message)
    )
}

export default ShowError