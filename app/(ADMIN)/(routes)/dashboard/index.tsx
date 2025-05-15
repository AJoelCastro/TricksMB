import React, { useEffect } from 'react';
import {View, Pressable} from 'react-native';
import { Icon } from 'react-native-paper';
import { useRouter } from 'expo-router';

import Dashboard from '@/components/Dashboard';

const IndexDashboardAdmin =()=> {

    const router = useRouter();

    return (
        <Dashboard>
            <></>
        </Dashboard>
    );
}

export default IndexDashboardAdmin;