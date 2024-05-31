'use client';
import Link from 'next/link';
import { useState } from 'react';
import { redirect } from 'next/navigation';
import { TextInput } from '@/components';
import { useAuth } from '@/hooks/useAuth';
import { EyeIcon, ClosedEyeIcon, LoadingIcon, ColombiaFlag } from '@/utils/icons';

export default function SignUpPage() {

    const [user, setUser] = useState({ name: '', last_name: '', phone: '', email: '', password: '', comfirm_password: '' });
    const [showPassword, setShowPassword] = useState(false);

    const { signUp, isLogged, isLoading, error, isAdmin } = useAuth();

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        await signUp(user);
    }

    if (isAdmin) {
        return redirect('/admin');
    }

    if (isLogged) {
        return redirect('/inicio');
    }

    return (
        <main className="px-8 sm:px-16 py-8 xl:max-w-[60%] sm:shadow-gray-500 rounded-3xl bg-white dark:bg-gray-900">
            {/* Title */}
            <p className='text-[56px] font-bold text-center mb-4'>Cine<span className='text-red-500'>Go</span></p>
            <h1 className="text-4xl font-bold mb-6">Registro</h1>
            
            <form className='mb-6' onSubmit={handleSubmit}>
                <div className='grid grid-cols-2 gap-x-6'>

                    {/* Name */}
                    <div className='col-span-2 md:col-span-1 mb-4'>
                        <label htmlFor="name" className="block mb-2 font-medium">Nombre</label>
                        <TextInput
                            type="text"
                            id="name"
                            name="name"
                            placeholder='Nombre'
                            value={user.name}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Last name */}
                    <div className='col-span-2 md:col-span-1 mb-4'>
                        <label htmlFor="last_name" className="block mb-2 font-medium">Apellido</label>
                        <TextInput
                            type="text"
                            id="last_name"
                            name="last_name"
                            placeholder='Apellido'
                            value={user.last_name}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Phone */}
                    <div className='col-span-2 md:col-span-1'>
                        <label htmlFor="phone" className="block mb-2 font-medium">Teléfono</label>
                        <div className='flex justify-between items-center mb-4 '>
                            <ColombiaFlag className='w-8 h-8' />
                            <span className="text-lg font-semibold px-1">(+ 57)</span>
                            <TextInput
                                type="text"
                                id="phone"
                                name="phone"
                                value={user.phone}
                                onChange={handleChange}
                                placeholder='(312)-345-6789'
                                className="max-w-[70%]"
                            />
                        </div>
                    </div>

                    {/* Email */}
                    <div className='col-span-2 md:col-span-1 mb-4'>
                        <label htmlFor="email" className="block mb-2 font-medium">Correo electrónico</label>
                        <TextInput
                            type="email"
                            id="email"
                            name="email"
                            placeholder='Correo electrónico'
                            value={user.email}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Password */}
                    <div className='relative mb-4 md:mb-8 col-span-2 md:col-span-1'>
                        <label htmlFor="password" className='block mb-2 font-medium'>Contraseña</label>
                        <TextInput
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            name="password"
                            placeholder='Contraseña'
                            value={user.password}
                            onChange={handleChange}
                        />
                        <span className='absolute bottom-3 right-3 cursor-pointer' onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <EyeIcon className='text-gray-900/25 dark:text-gray-900/75' /> : <ClosedEyeIcon className='text-gray-900/25 dark:text-gray-900/75' />}
                        </span>
                    </div>

                    {/* Confirm password */}
                    <div className='relative mb-8 col-span-2 md:col-span-1'>
                        <label htmlFor="comfirm_password" className='block mb-2 font-medium'>Confirmar contraseña</label>
                        <TextInput
                            type={showPassword ? 'text' : 'password'}
                            id="comfirm_password"
                            name="comfirm_password"
                            placeholder='Confirmar contraseña'
                            value={user.comfirm_password}
                            onChange={handleChange}
                        />
                        <span className='absolute bottom-3 right-3 cursor-pointer' onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <EyeIcon className='text-gray-900/25 dark:text-gray-900/75' /> : <ClosedEyeIcon className='text-gray-900/25 dark:text-gray-900/75' />}
                        </span>
                    </div>
                </div>

                {/* Error */}
                {error && <p className='text-red-500 text-center text-base mb-4 transform -translate-y-2'>{error}</p>}

                {/* Submit */}
                <div className='flex w-full justify-center'>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full md:w-1/2 flex items-center justify-center px-4 py-2.5 mb-2 text-white text-lg font-semibold rounded-lg
                                bg-red-500 hover:bg-red-600 disabled:bg-red-400 transition-all duration-300`}
                    >
                        <LoadingIcon className={`h-6 w-6 mr-2 animate-spin ${isLoading ? '' : 'hidden'}`} />
                        <span>Registrarse</span>
                    </button>
                </div>
            </form>

            {/* Redirect to sign in */}
            <span className='block text-center font-light'>¿Ya tienes cuenta?&nbsp;
                <Link href="/ingreso" className='text-red-500 font-semibold relative
                    transition-all ease-in-out before:transition-[width] before:ease-in-out before:duration-300 before:absolute before:bg-red-500 before:origin-center before:h-[2px] before:w-0 hover:before:w-[50%] before:-bottom-1 before:left-[50%]
                    after:transition-[width] after:ease-in-out after:duration-300 after:absolute after:bg-red-500 after:origin-center after:h-[2px] after:w-0 hover:after:w-[50%] after:-bottom-1 after:right-[50%]'>
                    Inicia sesión
                </Link>
            </span>
        </main>
    );
}
