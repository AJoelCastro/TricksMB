import {View, Text} from 'react-native';
import "../../global.css";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';

import React from 'react';

import FormFieldOrden from '../../components/formFieldOrden';

export default function editar() {
    return (
        <SafeAreaView>
            <Link href={"/"} className=''>Home</Link>
            <FormFieldOrden
            className='h-24'
            title="Codigo"
            value=""
            handleChangeText
            otherStyles="mt-7"
            />
        </SafeAreaView>
    );
}