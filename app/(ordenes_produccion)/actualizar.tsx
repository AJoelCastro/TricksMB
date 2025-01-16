import {View, Text} from 'react-native';
import "../../global.css";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';


export default function actualizar() {
    return (
        <SafeAreaView>
            <Text className='text-white'>a</Text>
            <Link href={"/"}>Home</Link>
        </SafeAreaView>
    );
}