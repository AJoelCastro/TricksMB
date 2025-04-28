import ShowError from '@/components/ShowError';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SplashScreen, useRouter } from 'expo-router';
import { createContext, PropsWithChildren, useEffect, useState } from 'react';

type User ={
    token: string,
    role: string,
}
type AuthState = {
    user : User | null,
    isReady: boolean,
    logIn : (user: User) => void,
    logOut: () => void,
};
SplashScreen.preventAutoHideAsync();
export const AuthContext = createContext<AuthState>({
    user: null,
    isReady: false,
    logIn: () => {},
    logOut: () => {}
});

export const AuthProvider = ({ children } : PropsWithChildren) => {
    const [user, setUser] = useState<User | null>(null);
    const [isReady, setisReady] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const init = async () => {
            const token = await AsyncStorage.getItem('token');
            if (token) {
                setisReady(true);
                setUser({ token, role: 'user' }); // Assuming role is 'user' for now
                router.replace('/menu');
            }
        };

        init();
    }, []);

    const logIn = async (userData: User) => {
        try {
            setUser(userData);
            setisReady(true);
            router.replace('/menu');
        } catch (error) {
            ShowError(error as Error);
        }
    };
    const logOut = async () => {
        try {
            await AsyncStorage.removeItem('token');
            setUser(null);
            setisReady(false);
            router.replace('/');
        } catch (error) {
            ShowError(error as Error);
        }
    };

    useEffect(() => {
        if(isReady){
            SplashScreen.hideAsync();
        }
    }, [isReady])
    

    return (
        <AuthContext.Provider value={{ user, isReady, logIn, logOut}}>
            {children}
        </AuthContext.Provider>
    );
};