'use client';
import { redirect } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export default function Home() {

    const { isLogged, signOut } = useAuth();

    return (
        <main className="">
            <h1>Home</h1>
            {isLogged ? <p>Welcome</p> : <p>Not logged in</p>}
            <button onClick={signOut}>Sign out</button>
        </main>
    );
}
