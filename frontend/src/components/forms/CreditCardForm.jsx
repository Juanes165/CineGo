'use client';
import { useState } from "react";
import { CardIcon } from "@/utils/icons";

export default function CreditCardForm(props) {

    const { cardNumber, setCardNumber, cardHolder, setCardHolder, expirationDate, setExpirationDate, cvv, setCvv, error } = props;

    return (
        <div className="w-full mx-auto">
            <form className="flex flex-col flex-wrap gap-3 w-full rounded-lg">
                <label className="relative w-full flex flex-col">

                    {/* Card number */}
                    <span className="font-bold mb-3">Número de la tarjeta</span>
                    <input value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} className="rounded-md peer pl-12 pr-2 py-2 border-2 border-gray-200 placeholder-gray-300" type="text"
                        name="card_number" placeholder="0000 0000 0000 0000" id="cardNumber" />

                    <CardIcon className="absolute bottom-0 left-0 -mb-0.5 transform translate-x-1/2 -translate-y-1/2 text-gray-900 peer-placeholder-shown:text-gray-300 h-6 w-6" />

                </label>

                {/* Expiration date */}
                <label className="relative flex-1 flex flex-col">
                    <span className="font-bold mb-3">Expiración</span>
                    <input value={expirationDate} onChange={(e) => setExpirationDate(e.target.value)} className="rounded-md peer pl-12 pr-2 py-2 border-2 border-gray-200 placeholder-gray-300" type="text"
                        name="expire_date" placeholder="MM/YY" id="expireDate" />
                    <svg xmlns="http://www.w3.org/2000/svg"
                        className="absolute bottom-0 left-0 -mb-0.5 transform translate-x-1/2 -translate-y-1/2 text-black peer-placeholder-shown:text-gray-300 h-6 w-6"
                        fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                </label>

                {/* CVV */}
                <label className="relative flex-1 flex flex-col">
                    <span className="font-bold flex items-center gap-3 mb-3">
                        CVC/CVV
                        <span className="relative group">
                            <span
                                className="hidden group-hover:flex justify-center items-center px-2 py-1 text-xs absolute -right-2 transform translate-x-full -translate-y-1/2 w-max top-1/2 bg-black text-white">
                                Ingresa un CVV de tres dígitos</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                    d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </span>
                    </span>

                    <input value={cvv} onChange={(e) => setCvv(e.target.value)} className="rounded-md peer pl-12 pr-2 py-2 border-2 border-gray-200 placeholder-gray-300" type="text"
                        name="card_cvc" placeholder="&bull;&bull;&bull;" id="cvv" />
                    <svg xmlns="http://www.w3.org/2000/svg"
                        className="absolute bottom-0 left-0 -mb-0.5 transform translate-x-1/2 -translate-y-1/2 text-black peer-placeholder-shown:text-gray-300 h-6 w-6"
                        fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                </label>
                {error && <p className="mt-0 text-red-500">{error}</p>}
            </form>
        </div>
    );
}