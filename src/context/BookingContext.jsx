// src/context/BookingContext.jsx
import React, { createContext, useContext, useState } from 'react';

const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
    const [isBookingOpen, setIsBookingOpen] = useState(false);
    const [initialRoom, setInitialRoom] = useState(null);

    // 1. NUEVO ESTADO PARA EL CUPÓN
    const [promoCode, setPromoCode] = useState(null);

    // 2. ACTUALIZAR LA FUNCIÓN OPEN
    const openBooking = (roomName = null, code = null) => {
        setInitialRoom(roomName);
        setPromoCode(code); // Guardamos el código si existe
        setIsBookingOpen(true);
    };
    const closeBooking = () => {
        setIsBookingOpen(false);
        setInitialRoom(null);
        setPromoCode(null);
    };

    return (
        <BookingContext.Provider value={{
            isBookingOpen,
            openBooking,
            closeBooking,
            initialRoom,
            promoCode // 3. EXPORTAR EL VALOR
        }}>
            {children}
        </BookingContext.Provider>
    );
};

export const useBooking = () => useContext(BookingContext);