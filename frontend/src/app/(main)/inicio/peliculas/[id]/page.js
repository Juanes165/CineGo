'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { getMovieByIdService } from '@/services';
import { priceParse } from '@/utils/priceParse';
import { PlusIcon, MinusIcon } from '@/utils/icons';
import { SaleSummaryModal } from '@/components';

export default function MoviePage({ params }) {

    const [movie, setMovie] = useState(null);
    const [tickets, setTickets] = useState(1);

    const [isOpen, setIsOpen] = useState(false);

    const { isLogged } = useAuth();

    useEffect(() => {
        // Fetch movie by id
        getMovieByIdService(params.id)
            .then(data => setMovie(data))
            .catch(error => console.error(error));
    }, []);

    const handleChange = (e) => {
        if (e.target.value < 1) {
            setTickets(1);
        }
        else if (e.target.value > 99) {
            setTickets(99);
        }
        else {
            setTickets(e.target.value);
        }
    }

    const handlePlus = () => {
        setTickets(tickets + 1);
    }

    const handleMinus = () => {
        if (tickets > 1) {
            setTickets(tickets - 1);
        }
    }

    if (!movie) return (
        <main className='container mx-auto flex justify-center items-center h-screen'>
            <h1 className='text-3xl font-bold text-center text-balance'>Cargando...</h1>
        </main>
    );

    return (
        <main className='container mx-auto md:flex pb-8 md:pt-8 md:px-12 xl:px-20 md:justify-between'>
            <section className='flex justify-center relative mb-8 md:mb-0 w-full'>
                <img src={movie?.image_url} alt={movie?.title} className='h-80 w-full md:hidden absolute -z-10 blur-2xl' />
                <img src={movie?.image_url} alt={movie?.title} className='h-80 md:h-[500px] shadow-lg shadow-red-500' />
            </section>

            <section className='flex justify-center flex-col pl-8 pr-8 md:pr-0 w-full max-w-2xl'>
                <h1 className='text-3xl lg:text-5xl font-bold text-center md:text-start text-balance mb-4 lg:mb-8'>{movie?.title}</h1>
                <p className='md:text-lg text-center md:text-start text-balance mb-4'>{movie?.description}</p>

                <div className='flex justify-center w-full mb-4'>
                    <span className='text-lg w-fit text-center text-gray-900 font-semibold py-2.5 px-10 rounded-lg bg-gray-200 text-balance'>{movie?.genre}</span>
                </div>

                <div className='text-xl text-balance font-semibold mb-2'>Duración: <span className='font-normal'>{movie?.duration} minutos</span></div>
                <div className='text-xl text-balance font-semibold mb-2'>Precio: <span className='font-normal'>$ {priceParse(movie?.price)}</span></div>

                <div className='flex flex-row w-full justify-center md:justify-start max-w-2xl mt-8'>
                    {isLogged ? (
                        <div className='w-full flex flex-row justify-between'>
                            <div className='w-fit flex flex-row items-center rounded-lg border'>
                                <button
                                    onClick={handleMinus}
                                    className='px-2'
                                >
                                    <MinusIcon className='w-6 h-6'/>
                                </button>
                                <input 
                                type='number' 
                                value={tickets}
                                onChange={handleChange}
                                className='text-2xl text-gray-900 text-center font-semibold py-2 px-3 h-12 w-14 outline-none' />
                                <button
                                    onClick={handlePlus}
                                    className='px-2'
                                >
                                    <PlusIcon className='w-6 h-6'/>
                                </button>
                                </div>
                            <button 
                                onClick={() => setIsOpen(true)}
                            className='w-1/2 bg-balance text-lg text-white bg-red-500 font-semibold py-2.5 px-4 rounded-lg'>Comprar</button>
                        </div>
                    ) : (
                        <Link
                            href={'../../ingreso'}
                            className='text-center w-fit text-xl text-red-500 font-semibold mb-4 relative transition-all ease-in-out
                                    before:transition-[width] before:ease-in-out before:duration-300 before:absolute before:bg-red-500 before:origin-center before:h-[2px] before:w-0 hover:before:w-[50%] before:-bottom-1 before:left-[50%]
                                    after:transition-[width] after:ease-in-out after:duration-300 after:absolute after:bg-red-500 after:origin-center after:h-[2px] after:w-0 hover:after:w-[50%] after:-bottom-1 after:right-[50%]'
                        >
                            Inicia sesión para comprar
                        </Link>
                    )}
                </div>
            </section>
            <SaleSummaryModal isOpen={isOpen} onClose={() => setIsOpen(false)} movie={movie} tickets={tickets} />
        </main>
    );
}