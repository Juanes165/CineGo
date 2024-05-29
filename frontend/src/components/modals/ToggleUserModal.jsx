export default function ToggleUserModal({ isActive, setShowModal, handleToggle }) {
    return (
        <div className='fixed inset-0 duration-300 bg-black/50 flex justify-center items-center'>
            <div className='bg-white dark:bg-gray-800 py-6 px-8 rounded-xl mx-4 max-w-96 animate-show-modal'>
                <h2 className='text-2xl font-bold text-center mb-4'>
                    {isActive ? 'Inhabilitar' : 'Habilitar'} usuario
                </h2>
                <p className='text-lg text-center mb-8 text-balance'>
                    ¿Estás seguro de que quieres {isActive ? 'inhabilitar' : 'habilitar'} este usuario?
                </p>
                <div className='flex justify-center gap-x-6'>
                    <button
                        className='py-2 text-gray-900/50 dark:text-white/50 rounded-md'
                        onClick={() => setShowModal(false)}
                    >
                        Cancelar
                    </button>
                    <button
                        className={`px-4 py-2 text-white rounded-md font-semibold ${isActive ? 'bg-red-500' : 'bg-green-500'}`}
                        onClick={handleToggle}
                    >
                        {isActive ? 'Inhabilitar' : 'Habilitar'}
                    </button>
                </div>
            </div>
        </div>
    );
}