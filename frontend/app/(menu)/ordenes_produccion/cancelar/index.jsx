import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import { Link } from 'expo-router';
import Icon from 'react-native-vector-icons/FontAwesome';

import "../../../../global.css";

export default function cancelar() {
    return (
        <View className='p-2 gap-2'>
            <Text className='text-lg font-bold'>Codigo</Text>
            <View className='flex-row gap-4 items-center'>
                <TextInput
                    className='border rounded-lg w-[85%]'
                    placeholder=''
                >
                </TextInput>
                <Icon name="search" size={20} color="black"/>
            </View>
                <TouchableOpacity
                    className='bg-red-500 w-[30%] mx-auto'
                >
                    <Link href={"../../modal"} >
                        <Text className='text-lg font-bold text-white text-center'>Cancelar</Text>
                    </Link>
                </TouchableOpacity>
        </View>
    );
}