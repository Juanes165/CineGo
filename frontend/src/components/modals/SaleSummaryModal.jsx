'use client';
import { priceParse } from "@/utils/priceParse";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { CreditCardForm } from "@/components";
import { createSaleService } from "@/services";
import { validateLuhnAlgorithm, validateExpirationDate, validateCVV } from "@/utils/creditCardValidator";

export default function SaleSummaryModal({ isOpen, onClose, movie, tickets }) {

    const { user } = useAuth();
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(0);

    const [cardNumber, setCardNumber] = useState('');
    const [cardHolder, setCardHolder] = useState('');
    const [expirationDate, setExpirationDate] = useState('');
    const [cvv, setCvv] = useState('');

    const [error, setError] = useState('');

    if (!movie) return (
        <main className='container mx-auto flex justify-center items-center h-screen'>
            <h1 className='text-3xl font-bold text-center text-balance'>Cargando...</h1>
        </main>
    );

    const handleSubmit = () => {
        setError('');
        const expirationMonth = parseInt(expirationDate.split('/')[0]);
        const expirationYear = parseInt('20'+expirationDate.split('/')[1]);

        let payment_method = '';
        if (selectedPaymentMethod === 0) {
            // Credit Card
            if (!validateLuhnAlgorithm(cardNumber)) {
                setError('Número de tarjeta inválido');
                return;
            }
            console.log(expirationDate)
            console.log(expirationDate.split('/'))
            if (!validateExpirationDate(expirationMonth, expirationYear)) {
                setError('Fecha de expiración inválida');
                return;
            }
            if (!validateCVV(cvv)) {
                setError('CVV inválido');
                return;
            }

            payment_method = 'credit_card'
        }
        else {
            payment_method = 'bank_transfer'
        }

        // Send payment
        const data = {
            user_id: user.id,
            movie_id: movie.id,
            ticket_quantity: tickets,
            payment_method: payment_method,
            total_price: movie.price*tickets,
        };
        createSaleService(data)
            .then(response => {
                console.log(response);
                onClose();
            })
            .catch(error => {
                console.error(error);
                setError('Ocurrió un error al procesar la compra');
            });
    }


    return (
        <div className={`fixed z-10 inset-0 overflow-y-auto ${isOpen ? 'block' : 'hidden'}`}>
            <div className='flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
                <div className='fixed inset-0 transition-opacity' aria-hidden='true'>
                    <div className='absolute inset-0 bg-black opacity-75'></div>
                </div>
                <span className='hidden sm:inline-block sm:align-middle sm:h-screen' aria-hidden='true'>&#8203;</span>

                <div
                    className="animate-show-modal inline-block align-bottom bg-white rounded-lg
                text-left overflow-hidden shadow-xl transform transition-all sm:my-8 
                sm:align-middle w-full max-w-[50%]">

                    <div className='bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>

                        <div className='sm:flex sm:items-center'>
                            <div className="flex flex-col gap-4 w-1/2">
                                <div onClick={() => setSelectedPaymentMethod(0)} 
                                className={`border rounded-lg p-4 ${selectedPaymentMethod === 0 ? 'ring-red-500 ring-4' : ''}`}>
                                    Tarjeta de crédito
                                    {selectedPaymentMethod === 0 && 
                                    <CreditCardForm
                                        cardNumber={cardNumber}
                                        setCardNumber={setCardNumber}
                                        cardHolder={cardHolder}
                                        setCardHolder={setCardHolder}
                                        expirationDate={expirationDate}
                                        setExpirationDate={setExpirationDate}
                                        cvv={cvv}
                                        setCvv={setCvv}
                                        error={error}
                                    />
                                    }

                                </div>

                                <div onClick={() => setSelectedPaymentMethod(1)} 
                                className={`border rounded-lg p-4 ${selectedPaymentMethod === 1 ? 'ring-red-500 ring-4' : ''}`}>
                                    Transferencia bancaria
                                </div>
                            </div>

                            <div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left'>
                                <h3 className='text-lg leading-6 font-medium text-gray-900' id='modal-headline'>
                                    {movie.title}
                                </h3>
                                <img src={movie.image_url} alt={movie.title} className='h-40 mt-4' />
                                <div className='mt-2'>
                                    <p className='text-sm text-gray-500'>
                                        Duración: {movie.duration} minutos
                                    </p>
                                </div>
                                <div className='mt-2'>
                                    <p className='text-sm text-gray-500'>
                                        Precio total: $ {priceParse(movie.price*tickets)}
                                    </p>
                                </div>
                                <div className='mt-2'>
                                    <p className='text-sm text-gray-500'>
                                        Cantidad de tickets: {tickets}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse'>
                        <button
                            type='button'
                            onClick={handleSubmit}
                            className='w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-500 text-base font-medium text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm'
                        >
                            Comprar
                        </button>
                        <button
                            type='button'
                            onClick={onClose}
                            className='mt-3 w-full inline-flex justify-center rounded-md border text-gray-900/50 dark:text-white/50 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:mt-0 sm:w-auto sm:text-sm'
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

