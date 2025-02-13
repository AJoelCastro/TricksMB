import { Redirect } from 'expo-router';
import { ActivityIndicator, Text } from 'react-native';
import { useAuth } from '../contexts/AuthContext';

export default function ProtectedRoute({ children }) {
    const { userToken, isLoading } = useAuth();

    if (isLoading) {
        return <ActivityIndicator size="large" />; // Spinner de carga
    }

    if (!userToken) {
        return <Redirect href="/login" />;
    }

    return children;
}