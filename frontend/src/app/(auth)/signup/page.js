'use client';
import Link from 'next/link';
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';

export default function SignUpPage() {

    const [user, setUser] = useState({ name: '', last_name: '', phone: '', email: '', password: '', comfirm_password: '' });
    const [showPassword, setShowPassword] = useState(false);

    const { signUp } = useAuth();

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(user)

        await signUp(user);
    }

    return (
        <main className="px-8 sm:px-16 py-4 xl:max-w-[60%] sm:shadow-gray-500 rounded-3xl bg-white dark:bg-gray-900">
            <p className='text-[56px] font-bold text-center mb-4'>Cine<span className='text-red-500'>Go</span></p>
            <h1 className="text-4xl font-bold mb-6">Registro</h1>
            <form className='mb-6' onSubmit={handleSubmit}>
                <div className='grid grid-cols-2 gap-x-6'>
                    <div className='col-span-2 md:col-span-1'>
                        <label htmlFor="name" className="block mb-2 font-medium">Nombre</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder='Nombre'
                            value={user.name}
                            onChange={handleChange}
                            className={`focus:ring-red-500 focus:border-red-500 focus:ring-4 
                            bg-gray-100 dark:bg-gray-700 dark:placeholder-gray-400 outline-none
                            w-full py-2.5 px-4 rounded-lg text-lg mb-4`}
                        />
                    </div>
                    <div className='col-span-2 md:col-span-1'>
                        <label htmlFor="last_name" className="block mb-2 font-medium">Apellido</label>
                        <input
                            type="text"
                            id="last_name"
                            name="last_name"
                            placeholder='Apellido'
                            value={user.last_name}
                            onChange={handleChange}
                            className={`focus:ring-red-500 focus:border-red-500 focus:ring-4 
                            bg-gray-100 dark:bg-gray-700 dark:placeholder-gray-400 outline-none
                            w-full py-2.5 px-4 rounded-lg text-lg mb-4`}
                        />
                    </div>

                    <div className='col-span-2 md:col-span-1'>
                        <label htmlFor="phone" className="block mb-2 font-medium">Teléfono</label>
                        <div className='flex justify-between items-center mb-4 '>
                            <ColombiaFlag className='w-8 h-8' />
                            <span className="text-lg font-semibold px-1">(+ 57)</span>
                            <input
                                type="text"
                                id="phone"
                                name="phone"
                                value={user.phone}
                                onChange={handleChange}
                                placeholder='(312)-345-6789'
                                className={`focus:ring-red-500 focus:border-red-500 focus:ring-4 
                            bg-gray-100 dark:bg-gray-700 dark:placeholder-gray-400 outline-none
                            w-[70%] py-2.5 px-4 rounded-lg text-lg`}
                            />
                        </div>
                    </div>
                    <div className='col-span-2 md:col-span-1'>
                        <label htmlFor="email" className="block mb-2 font-medium">Correo electrónico</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder='Correo electrónico'
                            value={user.email}
                            onChange={handleChange}
                            className={`focus:ring-red-500 focus:border-red-500 focus:ring-4 
                            bg-gray-100 dark:bg-gray-700 dark:placeholder-gray-400 outline-none
                            w-full py-2.5 px-4 rounded-lg text-lg mb-4`}
                        />
                    </div>

                    <div className='relative mb-4 md:mb-8 col-span-2 md:col-span-1'>
                        <label htmlFor="password" className='block mb-2 font-medium'>Contraseña</label>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            name="password"
                            placeholder='Contraseña'
                            value={user.password}
                            onChange={handleChange}
                            className={`focus:ring-red-500 focus:border-red-500 focus:ring-4 
                            bg-gray-100 dark:bg-gray-700 dark:placeholder-gray-400 outline-none
                            w-full py-2.5 px-4 rounded-lg text-lg`}
                        />
                        <span className='absolute bottom-3 right-3 cursor-pointer' onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <EyeIcon className='text-gray-900/25 dark:text-gray-900/75' /> : <ClosedEyeIcon className='text-gray-900/25 dark:text-gray-900/75' />}
                        </span>
                    </div>

                    <div className='relative mb-8 col-span-2 md:col-span-1'>
                        <label htmlFor="comfirm_password" className='block mb-2 font-medium'>Confirmar contraseña</label>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="comfirm_password"
                            name="comfirm_password"
                            placeholder='Confirmar contraseña'
                            value={user.comfirm_password}
                            onChange={handleChange}
                            className={`focus:ring-red-500 focus:border-red-500 focus:ring-4 
                            bg-gray-100 dark:bg-gray-700 dark:placeholder-gray-400 outline-none
                            w-full py-2.5 px-4 rounded-lg text-lg`}
                        />
                        <span className='absolute bottom-3 right-3 cursor-pointer' onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <EyeIcon className='text-gray-900/25 dark:text-gray-900/75' /> : <ClosedEyeIcon className='text-gray-900/25 dark:text-gray-900/75' />}
                        </span>
                    </div>
                </div>

                <div className='flex w-full justify-center'>
                    <button type="submit" className={`w-full md:w-1/2 bg-red-500 text-white text-lg font-semibold px-4 py-2.5 rounded-lg hover:bg-red-600 mb-2 transition-all duration-300`}>Iniciar sesión</button>
                </div>
            </form>

            <span className='block text-center font-light'>¿Ya tienes cuenta?&nbsp;
                <Link href="/signin" className='text-red-500 font-semibold relative
                    transition-all ease-in-out before:transition-[width] before:ease-in-out before:duration-300 before:absolute before:bg-red-500 before:origin-center before:h-[2px] before:w-0 hover:before:w-[50%] before:-bottom-1 before:left-[50%]
                    after:transition-[width] after:ease-in-out after:duration-300 after:absolute after:bg-red-500 after:origin-center after:h-[2px] after:w-0 hover:after:w-[50%] after:-bottom-1 after:right-[50%]'>
                    Inicia sesión
                </Link>
            </span>
        </main>
    );
}

export function EyeIcon(props) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="1.50em" viewBox="0 0 576 512" {...props}>
            <path fill="currentColor" d="M288 80c-65.2 0-118.8 29.6-159.9 67.7C89.6 183.5 63 226 49.4 256C63 286 89.6 328.5 128 364.3c41.2 38.1 94.8 67.7 160 67.7s118.8-29.6 159.9-67.7C486.4 328.5 513 286 526.6 256c-13.6-30-40.2-72.5-78.6-108.3C406.8 109.6 353.2 80 288 80M95.4 112.6C142.5 68.8 207.2 32 288 32s145.5 36.8 192.6 80.6c46.8 43.5 78.1 95.4 93 131.1c3.3 7.9 3.3 16.7 0 24.6c-14.9 35.7-46.2 87.7-93 131.1C433.5 443.2 368.8 480 288 480s-145.5-36.8-192.6-80.6C48.6 356 17.3 304 2.5 268.3c-3.3-7.9-3.3-16.7 0-24.6C17.3 208 48.6 156 95.4 112.6M288 336c44.2 0 80-35.8 80-80s-35.8-80-80-80h-2c1.3 5.1 2 10.5 2 16c0 35.3-28.7 64-64 64c-5.5 0-10.9-.7-16-2v2c0 44.2 35.8 80 80 80m0-208a128 128 0 1 1 0 256a128 128 0 1 1 0-256" />
        </svg>
    )
}

export function ClosedEyeIcon(props) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="1.50em" viewBox="0 0 640 512" {...props}>
            <path fill="currentColor" d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2s-6.3 25.5 4.1 33.7l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7l-105.2-82.4c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8zm151 118.3C226 97.7 269.5 80 320 80c65.2 0 118.8 29.6 159.9 67.7C518.4 183.5 545 226 558.6 256c-12.6 28-36.6 66.8-70.9 100.9l-53.8-42.2c9.1-17.6 14.2-37.5 14.2-58.7c0-70.7-57.3-128-128-128c-32.2 0-61.7 11.9-84.2 31.5zm205.1 160.8l-81.5-63.9c4.2-8.5 6.6-18.2 6.6-28.3c0-5.5-.7-10.9-2-16h2c44.2 0 80 35.8 80 80c0 9.9-1.8 19.4-5.1 28.2m51.3 163.3l-41.9-33C378.8 425.4 350.7 432 320 432c-65.2 0-118.8-29.6-159.9-67.7C121.6 328.5 95 286 81.4 256c8.3-18.4 21.5-41.5 39.4-64.8l-37.7-29.7c-22.8 29.7-39.1 59.3-48.6 82.2c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1c47 43.8 111.7 80.6 192.5 80.6c47.8 0 89.9-12.9 126.2-32.5m-88-69.3L302 334c-23.5-5.4-43.1-21.2-53.7-42.3l-56.1-44.2c-.2 2.8-.3 5.6-.3 8.5c0 70.7 57.3 128 128 128c13.3 0 26.1-2 38.2-5.8z" />
        </svg>
    )
}

export function ColombiaFlag(props) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 36 36" {...props}>
            <path fill="#FBD116" d="M32 5H4a4 4 0 0 0-4 4v9h36V9a4 4 0 0 0-4-4" />
            <path fill="#22408C" d="M0 18h36v7H0z" />
            <path fill="#CE2028" d="M0 27a4 4 0 0 0 4 4h28a4 4 0 0 0 4-4v-2H0z" />
        </svg>
    )
}