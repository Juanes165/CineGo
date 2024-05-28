'use client';
import Link from 'next/link';
import { useState } from 'react';
import { redirect } from 'next/navigation';
import { TextInput } from '@/components';
import { useAuth } from '@/hooks/useAuth';
import { EyeIcon, ClosedEyeIcon, LoadingIcon } from '@/utils/icons';

export default function SignInPage() {

    const [user, setUser] = useState({ email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);

    const { signIn, isLogged, isLoading, error } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();

        await signIn(user);
    }

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    // if (isLogged) {
    //     redirect('/');
    // }

    return (
        <main className="px-8 sm:px-16 py-8 xl:min-w-[40%] sm:shadow-gray-500 rounded-3xl bg-white dark:bg-gray-900">
            <p className='text-[56px] font-bold text-center mb-10'>Cine<span className='text-red-500'>Go</span></p>
            <h1 className="text-4xl font-bold mb-6">Iniciar sesión</h1>
            <form className='mb-8' onSubmit={handleSubmit}>

                {/* Email */}
                <label htmlFor="email" className="block mb-2 font-medium">Correo electrónico</label>
                <TextInput
                    type="email"
                    id="email"
                    name="email"
                    placeholder='Correo electrónico'
                    value={user.email}
                    onChange={handleChange}
                    className={` mb-4`}
                />

                {/* Password */}
                <div className='relative mb-8'>
                    <label htmlFor="password" className='block mb-2 font-medium'>Contraseña</label>
                    <TextInput
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        name="password"
                        placeholder='Contraseña'
                        value={user.password}
                        onChange={handleChange}
                    />
                    {/* Show password eye */}
                    <span className='absolute bottom-3 right-3 cursor-pointer' onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <EyeIcon className='text-gray-900/25 dark:text-gray-900/75' /> : <ClosedEyeIcon className='text-gray-900/25 dark:text-gray-900/75' />}
                    </span>
                </div>

                {/* Error */}
                {error && <p className='text-red-500 text-center text-base mb-4 transform -translate-y-2'>{error}</p>}

                {/* Submit */}
                <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full flex items-center justify-center px-4 py-2.5 mb-2 text-white text-lg font-semibold rounded-lg
                            bg-red-500 hover:bg-red-600 disabled:bg-red-400 transition-all duration-300`}
                >
                    <LoadingIcon className={`h-6 w-6 mr-2 animate-spin ${isLoading ? '' : 'hidden'}`} />
                    <span>Iniciar sesión</span>
                </button>
            </form>

            {/* redirect to sign up */}
            <span className='block text-center font-light mb-16 sm:mb-0'>¿No tienes cuenta?&nbsp;
                <Link href="/signup" className='text-red-500 font-semibold relative
                    transition-all ease-in-out before:transition-[width] before:ease-in-out before:duration-300 before:absolute before:bg-red-500 before:origin-center before:h-[2px] before:w-0 hover:before:w-[50%] before:-bottom-1 before:left-[50%]
                    after:transition-[width] after:ease-in-out after:duration-300 after:absolute after:bg-red-500 after:origin-center after:h-[2px] after:w-0 hover:after:w-[50%] after:-bottom-1 after:right-[50%]'>
                    Regístrate
                </Link>
            </span>
        </main>
    );
}