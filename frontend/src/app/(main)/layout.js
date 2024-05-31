'use client';
import { useAuth } from "@/hooks/useAuth";
import { Header } from '@/components';
import { redirect } from "next/navigation";

export default function HomeLayout({ children }) {

    const { user } = useAuth();

    if (!user) {
        redirect('/ingreso');
    }

    return (
        <div className="min-h-screen">
            <Header />
            {children}
        </div>
    );
}