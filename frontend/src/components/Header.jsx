'use client';
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";

export default function Header() {

    const { user, signOut } = useAuth();
    
    return (
        <header className="bg-gray-900 dark:border-b-2 border-white/25 sticky top-0 h-fit w-full py-3 px-16 flex flex-row justify-between items-center bg-main-light z-50 transition-all duration-300">
            {/* logo */}
            <div className="flex">
                <Link href={'/'} className="flex flex-row items-center">
                    <p className='text-5xl font-bold text-center text-white'>Cine<span className='text-red-500'>Go</span></p>
                </Link>
            </div>
            <nav className="mr-10 flex flex-row items-center w-fit">
                {user && user.is_admin && (
                    <div>
                        <Link href={'/admin'} className="mr-3 text-xl hidden md:inline-block text-white">Panel Admin</Link>
                        <Link href={'/admin/usuarios'} className="mr-3 text-xl hidden md:inline-block text-white">Usuarios</Link>
                        <Link href={'/admin/usuarios/registrar'} className="mr-3 text-xl hidden md:inline-block text-white">Registrar Admin</Link>
                        <Link href={'/admin/peliculas/crear'} className="mr-3 text-xl hidden md:inline-block text-white">Añadir película</Link>
                    </div>
                )}

                {user.id ? (
                    <button type="button" aria-label="salir" className="flex flex-row items-center" onClick={signOut}>
                        <span className="mr-3 text-xl hidden md:inline-block text-white">Salir</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 0 24 24">
                            <g fill="none" stroke="#FF0000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                                <path d="M14 8V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2v-2" />
                                <path d="M9 12h12l-3-3m0 6l3-3" />
                            </g>
                        </svg>
                    </button>
                ) : (
                    <Link 
                        href={'/ingreso'} 
                        className="mr-3 text-lg text-white font-semibold bg-red-500 rounded-full px-5 py-1  hidden md:inline-block">Ingresar</Link>
                )}
            </nav>
        </header>
    )
}