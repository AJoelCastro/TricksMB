import {View, Text} from 'react-native';
import "../global.css";

import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, Redirect } from 'expo-router';


export default function index() {
    return (
        <SafeAreaView>
            <Text className='text-white'>a</Text>
            <Link href={"/(ordenes_produccion)/crear"} className='text-white bg-white'>crear</Link>
        </SafeAreaView>
    );
}