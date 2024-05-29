'use client';
import { useEffect, useState } from 'react';
import { AdminMovieCard, TextInput } from '@/components';
import { getActiveMoviesService } from '@/services';
import Link from 'next/link';

export default function AdminPage() {

    const [allMovies, setAllMovies] = useState([]);

    useEffect(() => {
        // Fetch all movies
        getActiveMoviesService().then(data => setAllMovies(data));
    }, []);

    console.log(allMovies);

    return (
        <div className="container mx-auto py-4">
            <h1 className="text-3xl font-bold text-center mb-8">Listado de películas</h1>

            <label htmlFor="search" className="font-semibold">Buscar</label>
            <TextInput
                type="text"
                id="search"
                name="search"
                className="mb-8 max-w-[200px]"
                placeholder="Buscar película"
            />
            <div className="flex justify-center flex-wrap px-4 gap-6">
                {allMovies.map((movie, index) => (
                    <Link href={`/admin/peliculas/${movie.id}`} key={index}>
                        <AdminMovieCard movie={movie} />
                    </Link>
                ))}
            </div>
        </div>
    )
}