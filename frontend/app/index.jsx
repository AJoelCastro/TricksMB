import { React, useState } from 'react';
import { SafeAreaView, Text, View } from 'react-native';

import { Link, useRouter } from 'expo-router';

import { Image } from 'expo-image';

import Icon from 'react-native-vector-icons/FontAwesome';

import Input from '@/components/input';

import "../global.css"

import CustomButtom from '@/components/customButtom';


const Home=()=> {
    const router = useRouter();
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
            <View className=' flex items-center justify-center mt-16 '>
                <Image source={require('@/assets/images/namiTest.jpg')} style={{ width: 168, height: 168, borderRadius:84 }}></Image>
                
            </View>
            <View>
                <View>
                    <Input placeholder={"Usuario"}></Input>
                </View>
                <View >
                    <Input
                        placeholder={"Contraseña"}
                        RightIcon={() => <Icon name="eye" size={16} color="black" />}
                        >
                    </Input>
                </View>
                <View className='flex-row items-center gap-4 mt-6 ml-16'>
                    <Icon name="check" size={16} color="black">    
                    </Icon>
                    <Text>Recordar Contraseña</Text>
                </View>
                <View className='mx-16 mt-2'>
                    <CustomButtom 
                    title={"Iniciar Sesión"}
                    touch={() => {
                        router.push("/menu");
                    }}
                    
                    >
                    </CustomButtom>
                </View>
            </View>
        </SafeAreaView>
    )
}
export default Home;