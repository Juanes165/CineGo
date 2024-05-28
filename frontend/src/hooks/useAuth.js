import { AuthContext } from "@/context/AuthContext";
import { useContext, useCallback, useState } from "react";
import { signInService, signUpService } from "@/services";

export const useAuth = () => {
    const { token, setToken, user } = useContext(AuthContext);
    const [ status, setStatus ] = useState({ loading: false, error: null });


    const signIn = useCallback(async (email, password) => {
        setStatus({ loading: true, error: null });
        try {
            const { token } = await signInService(email, password);
            window.localStorage.setItem('token', token);
            setToken(token);
            setStatus({ loading: false, error: null });
        } catch (error) {
            setStatus({ loading: false, error: error.message });
        }
    }, [setToken]);


    const signUp = useCallback(async (data) => {
        setStatus({ loading: true, error: null });
        try {
            const { token } = await signUpService(data);
            window.localStorage.setItem('token', token);
            setToken(token);
            setStatus({ loading: false, error: null });
        } catch (error) {
            setStatus({ loading: false, error: error.message });
        }
    }, []);


    const signOut = useCallback(() => {
        window.localStorage.removeItem('token');
        setToken(null);
    }, [setToken]);

    return {
        user: {...user},
        isLogged: Boolean(token),
        isLoading: status.loading,
        error: status.error,
        signIn,
        signUp,
        signOut,
    };
};