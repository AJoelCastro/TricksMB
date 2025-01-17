import {View,Image, Text} from 'react-native';
import "../../global.css";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';


export default function actualizar() {
    return (
        <View>
            <SafeAreaView>
                <Text className='text-black text-4xl font-bold text-center mt-10 mb-10'>Actualización de orden</Text>
            </SafeAreaView>
            <SafeAreaView className="flex-row justify-center items-center mt-5 mb-8">
                <Text className="text-black text-2xl font-bold mr-4 mt-2">Código:</Text>
                <button style={{width:'20%'}} className="bg-white text-gray-300 p-2 rounded-lg border border-black mr-4 mt-2">Digite el código</button>
                <button className="bg-whitefont-bold p-2 rounded-lg border border-black mt-2 flex items-center justify-center">
                    <Image 
                        source={{uri: 'https://w7.pngwing.com/pngs/697/690/png-transparent-black-magnifying-glass-illustration-magnifying-glass-computer-icons-simple-magnifying-glass-glass-magnifier-brand.png'}} 
                        style={{width: 20, height: 20}} 
                    />
                </button>
            </SafeAreaView>
            <SafeAreaView className="items-center mt-6">
                <button style={{width:'10%'}} className="bg-black text-white p-2 font-bold rounded-lg border border-black mb-6">Corte</button>
                <button style={{width:'10%'}} className="bg-black text-white p-2 font-bold rounded-lg border border-black mb-6">Perfilado</button>
                <button style={{width:'10%'}} className="bg-black text-white p-2 font-bold rounded-lg border border-black mb-6">Armado</button>
                <button style={{width:'10%'}} className="bg-black text-white p-2 font-bold rounded-lg border border-black mb-6">Alistado</button>
            </SafeAreaView>
        </View>
    );
}