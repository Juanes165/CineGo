'use client';
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";

export default function Header() {

    const { signOut } = useAuth();
    return (
        <header className="bg-gray-900 dark:border-b-2 border-white/25 sticky top-0 h-fit w-full py-3 px-16 flex flex-row justify-between items-center bg-main-light z-50 transition-all duration-300">
            {/* logo */}
            <div className="flex">
                <Link href={'/'} className="flex flex-row items-center">
                    <p className='text-5xl font-bold text-center text-white'>Cine<span className='text-red-500'>Go</span></p>
                </Link>
            </div>
            <nav className="mr-10 flex flex-row items-center w-fit">
                <span className="mr-3 text-xl hidden md:inline-block">Inicio</span>
                <span className="mr-3 text-xl hidden md:inline-block">Foro</span>
                {/* <DarkModeToggle handleDarkMode={handleDarkMode} /> */}
                <button type="button" aria-label="salir" className="flex flex-row items-center" onClick={signOut}>
                    <span className="mr-3 text-xl hidden md:inline-block text-white">Salir</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 0 24 24">
                        <g fill="none" stroke="#FF0000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                            <path d="M14 8V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2v-2" />
                            <path d="M9 12h12l-3-3m0 6l3-3" />
                        </g>
                    </svg>
                </button>
            </nav>
        </header>
    )
}