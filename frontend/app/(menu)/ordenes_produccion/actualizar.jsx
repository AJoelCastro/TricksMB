import {View,Image,Text, TouchableOpacity} from 'react-native';
import "../../../global.css";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';
import CustomButtom from '@/components/customButtom';
import Input from '@/components/input';


export default function actualizar() {
    return (
        <View>
            <SafeAreaView>
                <Text className='text-black text-4xl font-bold text-center mt-10 mb-10'>Actualización de orden</Text>
            </SafeAreaView>
            <SafeAreaView className="flex-row justify-center items-center mt-5 mb-8">
                <Text className="text-black text-2xl font-bold mr-4 mt-2">Código:</Text>
                <Input placeholder="Digite su código"></Input>
                <TouchableOpacity className=" p-2 rounded-lg border border-black mt-2 flex items-center justify-center" title=''>
                    <Image 
                        source={{uri: 'https://w7.pngwing.com/pngs/697/690/png-transparent-black-magnifying-glass-illustration-magnifying-glass-computer-icons-simple-magnifying-glass-glass-magnifier-brand.png'}} 
                        style={{width: 16, height: 16}} 
                    />
                </TouchableOpacity>
            </SafeAreaView>
            <SafeAreaView className="items-center mx-6">
                <CustomButtom title={"Corte"}></CustomButtom>
                <CustomButtom title={"Perfilado"}></CustomButtom>
                <CustomButtom title={"Armado"}></CustomButtom>
                <CustomButtom title={"Alistado"}></CustomButtom>
            </SafeAreaView>
        </View>
    );
}