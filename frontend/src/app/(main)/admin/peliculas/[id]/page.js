'use client';
import { useEffect, useState } from 'react';
import { ActivatableTextInput, ActivatableTextArea, ToggleMovieModal } from '@/components';
import { priceParse } from '@/utils/priceParse';
import { getMovieByIdService, toggleMovieService, updateMovieInfoService, updateMovieImageService } from '@/services';

export default function MoviePage({ params }) {

    const [movie, setMovie] = useState(null);
    const [movieData, setMovieData] = useState({ title: '', description: '', duration: '', price: '' });
    const [newImage, setNewImage] = useState(null);
    const [genres, setGenres] = useState([]);

    const [editing, setEditing] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const { id } = params;

    useEffect(() => {
        // Fetch movie by id
        getMovieByIdService(id)
            .then(data => {
                setMovie(data);
                setMovieData({
                    title: data.title,
                    description: data.description,
                    duration: data.duration,
                    price: data.price,
                    genre: data.genre
                });
            });
    }, [id]);

    useEffect(() => {
        // Fetch genres
        setGenres(['Acción', 'Aventura', 'Comedia', 'Drama', 'Fantasía', 'Terror', 'Ciencia Ficción']);
    }, []);

    const handleChange = (e) => {
        setMovieData({ ...movieData, [e.target.name]: e.target.value });
    }

    const handleImageChange = (e) => {
        if (e.target.files) {
            console.log(e.target.files[0]);
            setNewImage(e.target.files[0]);
        }
    }

    const cancelEdit = () => {
        setEditing(false);
        setMovieData({
            title: movie.title,
            description: movie.description,
            duration: movie.duration,
            price: movie.price,
            genre: movie.genre
        });
    }

    const handleToggleMovie = () => {
        // Toggle movie
        toggleMovieService(id)
            .then(() => {
                setMovie({ ...movie, is_active: !movie.is_active });
                setShowModal(false);
            });
    }

    const handleUpdateInfo = (e) => {
        e.preventDefault();
        // Update movie info
        updateMovieInfoService({ id, ...movieData })
            .then(() => {
                setMovieData({ ...movieData });
                setEditing(false);
            });
    }

    const handleUpdateImage = () => {
        // Update movie image
        const formData = new FormData();
        formData.append('image', newImage);
        updateMovieImageService(id, formData)
            .then((data) => {
                setMovie({ ...movie, image_url: data.image_url });
                setNewImage(null);
            });
    }


    if (!movie) {
        return <h1>Loading...</h1>
    }

    return (
        <main className='container mx-auto p-8'>
            <h1 className='text-3xl font-semibold mb-8 text-center'>Información de la película</h1>
            <div className='flex justify-center gap-x-12 gap-y-8 flex-wrap'>
                <section className={`xl:w-1/2 py-4 px-2 sm:px-8 rounded-xl border-2 ${editing ? 'border-gray-900/25 dark:border-white/25' : 'border-white/25 dark:border-gray-900/25'}`}>

                    <div className='grid grid-cols-3 mb-4 gap-2'>
                        {/* Title */}
                        <div className={`col-span-3 ${editing ? `sm:col-span-3` : 'sm:col-span-2'}`}>
                            <label htmlFor='title' className={`block sm:text-xl font-semibold ${editing ? '' : 'hidden'}`}>Título</label>
                            <ActivatableTextInput
                                type='text'
                                id='title'
                                name='title'
                                value={movieData.title}
                                onChange={handleChange}
                                className='disabled:text-3xl sm:disabled:text-4xl disabled:truncate'
                                disabled={!editing}
                            />
                        </div>

                        <div className={`flex items-center justify-end ${editing ? 'hidden' : 'col-span-3 sm:col-span-1'}`}>
                            <span className={`h-3 w-3 rounded-full ${movie.is_active ? 'bg-green-600' : 'bg-gray-400'}`} />
                            <span className={`ml-2 text-xl font-semibold ${movie.is_active ? 'text-green-600' : 'text-gray-400'}`}>{movie.is_active ? 'Activa' : 'Inactiva'}</span>
                        </div>
                    </div>

                    {/* Description */}
                    <label htmlFor='description' className={`block text-xl font-semibold ${editing ? '' : 'text-red-500'}`}>Descripción</label>
                    <ActivatableTextArea
                        type='text'
                        id='description'
                        name='description'
                        value={movieData.description}
                        onChange={handleChange}
                        className='mb-4'
                        disabled={!editing}
                    />
                    <div className='grid grid-cols-2 gap-8'>

                        {/** Duration */}
                        <div className='col-span-1'>
                            <label htmlFor='duration' className={`block text-xl font-semibold ${editing ? '' : 'text-red-500'}`}>Duración</label>
                            <ActivatableTextInput
                                type={editing ? 'number' : 'text'}
                                id='duration'
                                name='duration'
                                value={editing ? movieData.duration : movieData.duration + ' minutos'}
                                onChange={handleChange}
                                className='mb-4 max-w-1/2'
                                disabled={!editing}
                            />
                        </div>

                        {/* Price */}
                        <div className='col-span-1'>
                            <label htmlFor='price' className={`block text-xl font-semibold ${editing ? '' : 'text-red-500'}`}>Precio</label>
                            <ActivatableTextInput
                                type={editing ? 'number' : 'text'}
                                id='price'
                                name='price'
                                value={editing ? movieData.price : "$ " + priceParse(movieData.price)}
                                onChange={handleChange}
                                className='mb-4 max-w-1/2'
                                disabled={!editing}
                            />
                        </div>

                    </div>

                    {/* Genre */}
                    <label htmlFor='genres' className={`block text-xl font-semibold ${editing ? '' : 'text-red-500'}`}>Género</label>
                    <select
                        id='genre'
                        name='genre'
                        disabled={!editing}
                        value={movieData.genre}
                        onChange={handleChange}
                        className={`w-full py-4 px-4 mb-4 rounded-lg text-lg 
                    bg-gray-100 dark:bg-gray-700 dark:placeholder-gray-400 outline-none
                    disabled:bg-transparent disabled:appearance-none disabled:px-0`}
                    >
                        {genres.map((genre, index) => (
                            <option key={index} value={genre}>{genre}</option>
                        ))}
                    </select>


                    {/* Buttons for deactivate movie */}
                    <div className='flex justify-end mt-2'>
                        {editing ? (
                            // Cancel button for EDITING MODE / Deactivate button for VIEW MODE
                            <button
                                type='button'
                                className='py-2 px-4 text-gray-900/50 dark:text-white/50 rounded-lg'
                                onClick={cancelEdit}
                            >
                                Cancelar
                            </button>
                        ) : (
                            <button
                                type='button'
                                onClick={() => setShowModal(true)}
                                className={`py-2 px-6 rounded-lg text-gray-900/50 dark:text-white/50`}
                            >
                                {movie.is_active ? 'Deshabilitar' : 'Habilitar'}
                            </button>
                        )
                        }
                        {/* Edit button for VIEW MODE / Save button for Edit Mode */}
                        <button
                            type='button'
                            className='py-2 px-4 bg-red-500 text-white rounded-lg font-semibold'
                            onClick={(e) => { if (editing) handleUpdateInfo(e); else setEditing(true) }}
                        >
                            {editing ? 'Guardar' : 'Editar'}
                        </button>
                    </div>
                </section>

                {/* Image */}
                <section className="justify-center mb-4">

                    <img src={newImage ? URL.createObjectURL(newImage) : movie.image_url} alt={movie.title} className="object-contain w-full max-w-96 h-[480px]" />


                    {/* Change image button */}
                    <div className='py-2 flex justify-center items-center'>
                        {newImage ? (
                            <div>
                                <h1 className='block text-xl text-center mb-2'>Vista previa</h1>
                                {/* Cancel button */}
                                <button
                                    type='button'
                                    className='py-2 px-4 text-gray-900/50 dark:text-white/50 font-semibold mx-2'
                                    onClick={() => setNewImage(null)}
                                >
                                    Cancelar
                                </button>
                                {/* Save button */}
                                <button
                                    type='button'
                                    className='py-2 px-4 border text-red-500 rounded-lg font-semibold mx-2'
                                    onClick={handleUpdateImage}
                                >
                                    Guardar
                                </button>

                            </div>
                        ) : (
                            <>
                                <input
                                    type="file"
                                    id="image"
                                    name="image"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleImageChange}
                                />
                                <label htmlFor="image" className="text-red-500 border py-2 px-4 rounded-lg cursor-pointer">Cambiar imagen</label>
                            </>
                        )}
                    </div>

                </section>

            </div>
            {showModal && <ToggleMovieModal isActive={movie.is_active} setShowModal={setShowModal} handleToggle={handleToggleMovie} />}
        </main>
    )
}