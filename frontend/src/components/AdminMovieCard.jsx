export default function AdminMovieCard({ movie }) {
    return (
        <div className="w-72 h-fit bg-white dark:bg-gray-800 rounded-lg group
        shadow-xl hover:shadow-2xl shadow-gray-900/15 hover:shadow-gray-900/35 dark:shadow-white/15 dark:hover:shadow-white/15 transition-all duration-200">
            <div className="relative overflow-hidden flex justify-center h-96 mb-4 rounded-t-lg">
            <img src={movie.image_url} alt={movie.title} className="object-fill absolute max-w-72 h-96 w-full rounded-t-lg z-1 blur-lg" />
            <img src={movie.image_url} alt={movie.title} className="object-contain absolute max-w-72 h-96 w-full rounded-t-lg z-2 group-hover:scale-[1.03] transition-all duration-200" />
            </div>
            <div className="px-4 pb-2">
                <h2 className="font-bold text-xl truncate mb-3">{movie.title}</h2>
                <div className="w-full flex justify-center">
                    <span className="py-2 px-6 text-gray-900 text-center bg-gray-200 rounded-lg">{movie.genre}</span>
                </div>
                <div className=" mt-3">
                    <span className="text-md text-gray-900/60 dark:text-white/60">Duración: {movie.duration} minutos</span>
                </div>
            </div>
        </div>
    );
}