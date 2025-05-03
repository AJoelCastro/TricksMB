import ShowError from '@/components/ShowError';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SplashScreen, useRouter } from 'expo-router';
import { createContext, PropsWithChildren, useEffect, useState } from 'react';

type User ={
    token: string,
    name: string;
    email: string;
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
            const name = await AsyncStorage.getItem('name');
            const email = await AsyncStorage.getItem('email');
            const role = await AsyncStorage.getItem('role');
            if (token&& name && email && role) {
                setUser({ token, role, name, email });
                setisReady(true);
            }
            else {
                logOut();
            }  
        };
        init();
    }, []);

    const logIn = async (userData: User) => {
        try {
            setUser({
                token: userData.token,
                role: userData.role,
                name: userData.name,
                email: userData.email
            } as User);
            setisReady(true);
        } catch (error) {
            ShowError(error as Error);
        }
    };
    const logOut = async () => {
        try {
            await AsyncStorage.removeItem('token');
            await AsyncStorage.removeItem('name');
            await AsyncStorage.removeItem('email');
            await AsyncStorage.removeItem('role');
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