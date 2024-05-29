'use client';
import { useEffect, useState } from 'react';
import { TextInput, MultilineTextInput, DragAndDrop } from '@/components';
import { addMovieService } from '@/services';

export default function CreateMoviePage() {

    const [movie, setMovie] = useState({ title: '', description: '', duration: '', price: '' });
    const [file, setFile] = useState(null);

    const [selectedGenre, setSelectedGenre] = useState('Acción');
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        // Fetch genres
        setGenres(['Acción', 'Aventura', 'Comedia', 'Drama', 'Fantasía', 'Terror', 'Ciencia Ficción']);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        for (let key in movie) {
            formData.append(key, movie[key]);
        }
        formData.append('genre', selectedGenre);
        formData.append('image', file);

        await addMovieService(formData);
    }

    const handleMovieChange = (e) => {
        console.log(e.target.name);
        console.log(e.target.value);
        console.log({ ...movie, [e.target.name]: e.target.value })
        setMovie({ ...movie, [e.target.name]: e.target.value });
    }

    const handleRemoveFile = (index) => {
        setFile(null);
    }


    return (
        <main className="px-8 sm:px-16 py-8 xl:min-w-[40%] sm:shadow-gray-500 rounded-3xl bg-white dark:bg-gray-900">
            <p className='text-[56px] font-bold text-center mb-10'>Cine<span className='text-red-500'>Go</span></p>
            <h1 className="text-4xl font-bold mb-6">Añadir película</h1>
            <form className='mb-8' onSubmit={handleSubmit}>

                {/* Title */}
                <label htmlFor="title" className="block mb-2 font-medium">Título</label>
                <TextInput
                    type="text"
                    id="title"
                    name="title"
                    placeholder='Título'
                    value={movie.title}
                    onChange={handleMovieChange}
                    className={` mb-4`}
                />

                {/* Description */}
                <label htmlFor="description" className="block mb-2 font-medium">Descripción</label>
                <MultilineTextInput
                    id="description"
                    name="description"
                    placeholder='Descripción'
                    value={movie.description}
                    onChange={handleMovieChange}
                    className={` mb-4`}
                />

                {/* Duration */}
                <label htmlFor="duration" className="block mb-2 font-medium">Duración</label>
                <TextInput
                    type="number"
                    id="duration"
                    name="duration"
                    placeholder='Duración'
                    value={movie.duration}
                    onChange={handleMovieChange}
                    className={` mb-4`}
                />

                {/* Duration */}
                <label htmlFor="price" className="block mb-2 font-medium">Precio</label>
                <TextInput
                    type="number"
                    id="price"
                    name="price"
                    placeholder='Precio de la boleta'
                    value={movie.price}
                    onChange={handleMovieChange}
                    className={` mb-4`}
                />

                {/* Genre */}
                <label htmlFor="genre" className="block mb-2 font-medium">Género</label>
                <select
                    id="genre"
                    name="genre"
                    value={selectedGenre}
                    onChange={(e) => setSelectedGenre(e.target.value)}
                    className={`w-full py-2.5 px-4 mb-4 rounded-lg text-lg bg-gray-100 dark:bg-gray-700 dark:placeholder-gray-400 outline-none`}
                >
                    {genres.map((genre, index) => (
                        <option key={index} value={genre}>{genre}</option>
                    ))}
                </select>

                {/* Image */}
                <DragAndDrop file={file} setFile={setFile} />

                {file && (
                    <div className="flex flex-row gap-5 w-full h-full mb-2">
                            <div className="flex flex-col justify-between items-center p-4 border rounded-lg h-40 w-40 relative">
                                {/* {returnIcon(file.type)} */}
                                <div className='w-32'>
                                    <p className='truncate'>{file.name}</p>
                                </div>
                                <div className="cursor-pointer absolute -top-4 -right-4 ">
                                    {/* <CancelIcon className="h-8 w-8 text-red-500" onClick={() => handleRemoveFile()} >X</CancelIcon> */}
                                    X
                                </div>
                            </div>

                    </div>
                )}

                {/* Submit */}
                <button
                    type="submit"
                    // disabled={isLoading}
                    className={`w-full flex items-center justify-center px-4 py-2.5 mb-2 text-white text-lg font-semibold rounded-lg
                            bg-red-500 hover:bg-red-600 disabled:bg-red-400 transition-all duration-300`}
                >
                    {/* <LoadingIcon className={`h-6 w-6 mr-2 animate-spin ${isLoading ? '' : 'hidden'}`} /> */}
                    <span>Añadir película</span>
                </button>
            </form>
        </main>
    );
}