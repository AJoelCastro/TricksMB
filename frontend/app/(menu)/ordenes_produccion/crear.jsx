import {View, Text} from 'react-native';
import "../../../global.css";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';

import { useRouter } from 'expo-router';

import FormFieldOrden from '@/components/formFieldOrden';
import ComboBox from '@/components/ComboBox';

import DateTimePicker from "@react-native-community/datetimepicker";

export default function crear() {
        const [cliente, setCliente] = useState("");
        const [modelo, setModelo] = useState("");
        const route = useRouter();
    return (
        <View className='mx-6 gap-2'>
            <ComboBox 
                data={[ {label:"Juan Buendia", value:"Juan Buendia"}, {label:"Alvaro gay",value:"Alvaro gay"}]}
                onChange={setCliente}
                placeholder="Cliente" 
            >
            </ComboBox>
            <FormFieldOrden
                title="Codigo"
                value={""}
            />
            <FormFieldOrden
                title="Modelo"
                value={modelo}
                onChangeText={setModelo}
            />
            <FormFieldOrden
                title="Fecha de creacion"
                value={""}
            />            
        </View>
    );
}