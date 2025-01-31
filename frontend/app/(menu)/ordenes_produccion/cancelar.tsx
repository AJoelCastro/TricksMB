import {View, Text} from 'react-native';
import "../../../global.css";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';


export default function cancelar() {
    return (
        <SafeAreaView>
            <Link href={"../../modal"} >
                <Text className='text-black'>Modal</Text>
            </Link>
        </SafeAreaView>
    );
}