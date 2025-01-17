import {View, Text} from 'react-native';
import "../global.css";

import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, Redirect } from 'expo-router';


export default function index() {
    return (
        <SafeAreaView>
            
            <Link href={"/(ordenes_produccion)/crear"} className='text-black bg-white'>crear</Link>
        </SafeAreaView>
    );
}