'use client';
import { useEffect, useState, createContext } from "react";
// import { parseJwt } from "@/utils";

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
            console.log(token)
        }
        catch (error) {
            console.log(error)
        }
    }, [token]);

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                setToken,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext