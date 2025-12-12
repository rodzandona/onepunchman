'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import {useRouter} from 'next/navigation';
import {environment} from '@/environments/environment';

interface User {
    token: any;
    id: number;
    username: string;
    email: any;
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({children} : {children: ReactNode}) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const API_URL = environment.apiUrl;

    useEffect(() => {
        async function checkAuth() {
            try{
                const storedUser = localStorage.getItem('user');
                if (storedUser) {
                    setUser(JSON.parse(storedUser));
                }
                const res = await fetch (`${API_URL}/auth/me`, {
                    method: 'POST',
                    credentials: 'include',
                });

                if(!res.ok) throw new Error ('Unauthorized');

                if(res.ok) {
                    const data = await res.json();
                    setUser(data);
                    localStorage.setItem('user', JSON.stringify(data));

                    if (window.location.pathname === '/login'){
                        router.push('/home');
                    }
                } else {
                    handleLogout(false);
                }
            } catch (err) {
                console.error('Erro ao validar token:', err);
                handleLogout(false);
            } finally {
                setLoading(false);
            }
        }

        checkAuth();
    }, []);

    async function login(username: string, password: string){
        const res = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify({usuario: username, senha: password}),
        });

        const data = await res.json();
        if (!data.succes) throw new Error(data.message || 'Erro ao fazer o Login');

        if (data.success) {
            setUser(data.data.usuario);
            localStorage.setItem('user', JSON.stringify(data.data.usuario));
            router.push('/home')
        }
    }
    function handleLogout(redirect = true) {
        fetch(`${API_URL}/auth/logout`,{
            method: 'POST',
            credentials: 'include',
        });

        setUser(null);
        localStorage.removeItem('user');

        if (redirect) router.push('/login');
    }

    const logout = () => handleLogout(true);

    return (
        <AuthContext.Provider value={{user, loading, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);

function handleLogout(arg0: boolean) {
    throw new Error("Function not implemented.");
}


