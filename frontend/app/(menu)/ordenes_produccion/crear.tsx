import {View, Text} from 'react-native';
import "../../../global.css";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';


export default function crear() {
    return (
        <SafeAreaView>
            <Link href={"/"} className='text-white'>
                <Text>Home</Text>
            </Link>
        </SafeAreaView>
    );
}