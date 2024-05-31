'use client';
import { useEffect, useState, createContext } from "react";
import { parseJwt } from "@/utils/parseJwt";

export const AuthContext = createContext();

export function AuthContextProvider({ children }) {
    
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(
        typeof window !== 'undefined' ? window.localStorage.getItem('token') : null
    );

    useEffect(() => {
        if (!token) {
            setUser(null);
            return;
        }
        try {
            parseJwt(token);
            setUser(parseJwt(token).sub);
        }
        catch (error) {
            window.localStorage.removeItem('token');
            setUser(null);
        }
    }, [token]);

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                setToken,
                setUser
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext