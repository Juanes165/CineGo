'use client';
import { redirect } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export default function AdminLayout({ children }) {

    const { isLogged, isAdmin } = useAuth();

    console.log(isLogged, isAdmin);



    if (isAdmin === undefined || isLogged === undefined) {
        return <div>Cargando...</div>
    }

    if (!isLogged) {
        return redirect('/ingreso');
    }

    if (!isAdmin) {
        return redirect('/inicio');
    }

    return (
        <>
            {children}
        </>
    );
}