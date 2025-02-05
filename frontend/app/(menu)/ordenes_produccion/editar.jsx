import {View, Text} from 'react-native';
import "../../../global.css";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';

import React, {useState, useEffect} from 'react';

import FormFieldOrden from '../../../components/formFieldOrden';
import ComboBox from '@/components/ComboBox';

export default function editar() {
    const [cliente, setCliente] = useState("");
    const [modelo, setModelo] = useState("");
    return (
        <SafeAreaView className=''>
            
        </SafeAreaView>
    );
}