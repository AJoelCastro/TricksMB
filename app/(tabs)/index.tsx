import {View, Text} from 'react-native';
import "../../global.css";
import { Link } from 'expo-router';


export default function HomeScreen() {
    return (
        <View className ="text-white">
            Arturo cabezon
            <Link href={'/(tabs)/crear'}>crear</Link>
        </View>
    );
}


