import React from 'react';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { Link } from 'expo-router';
import CustomButtom from '@/components/customButtom';
import Header from '@/components/Header';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Image } from 'expo-image';

export default function Home() {
    return (
        <SafeAreaView className="h-full bg-white flex">
            {/*Este es el header*/}
            <View className='h-16 bg-gray-800 flex flex-row justify-between p-4 px-8'>
                <View>
                    <Icon name="cog" size={20} color="white"></Icon>
                </View>
                <View>
                    <Link href={""}>
                        <Text className='text-white'>Registrarse</Text>
                    </Link>
                </View>
            </View>
            <View className=' flex items-center justify-center mt-16'>
                <Image className='h-32 w-32  rounded-full' source="https://imgcdn.stablediffusionweb.com/2024/11/10/cb8425d9-0d81-4075-8f4d-91dfe3267ff4.jpg">

                </Image>
            </View>
            <View>
                
            </View>
        </SafeAreaView>
    );
}
