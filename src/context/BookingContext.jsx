// src/context/BookingContext.jsx
import React, { createContext, useContext, useState } from 'react';

const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
    const [isBookingOpen, setIsBookingOpen] = useState(false);
    const [initialRoom, setInitialRoom] = useState(null); // Para saber si eligieron una room específica

    const openBooking = (roomName = null) => {
        setInitialRoom(roomName);
        setIsBookingOpen(true);
    };

    const closeBooking = () => {
        setIsBookingOpen(false);
        setInitialRoom(null);
    };

    return (
        <BookingContext.Provider value={{ isBookingOpen, openBooking, closeBooking, initialRoom }}>
            {children}
        </BookingContext.Provider>
    );
};

export const useBooking = () => useContext(BookingContext);