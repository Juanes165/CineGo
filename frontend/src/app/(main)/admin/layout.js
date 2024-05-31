'use client';
import { redirect } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export default function AdminLayout({ children }) {

    const { user } = useAuth();

    if (!user) {
        redirect('/login');
    }
    if (!user.is_admin) {

        redirect('/inicio');
    }

    return (
        <>
            {children}
        </>
    );
}