'use client';
import { useEffect, useState } from 'react';
import { MovieCard, TextInput } from '@/components';
import { searchMoviesService } from '@/services';
import Link from 'next/link';

export default function AdminPage() {

    const [allMovies, setAllMovies] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        // Fetch all movies
        searchMoviesService(search)
        .then(data => setAllMovies(data))
        .catch(error => console.error(error));
    }, [search]);

    return (
        <div className="container mx-auto py-4">
            <h1 className="text-3xl font-bold text-center mb-8">Listado de películas</h1>

            <label htmlFor="search" className="font-semibold text-lg mr-4">Buscar</label>
            <TextInput
                type="text"
                id="search"
                name="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="mb-8 max-w-[300px]"
                placeholder="Ingrese el nombre de la película"
            />
            <div className="flex justify-center flex-wrap px-4 gap-6">
                {allMovies.map((movie, index) => (
                    <Link href={`/inicio/peliculas/${movie.id}`} key={index}>
                        <MovieCard movie={movie} />
                    </Link>
                ))}
            </div>
        </div>
    )
}