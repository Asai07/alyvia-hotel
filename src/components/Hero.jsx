import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// 1. RECUPERAMOS EL WIDGET
import BookingWidget from './BookingWidget';

const heroImages = [
    "/hero-images/hotel-hero-1.webp",
    "/hero-images/hotel-hero-2.webp",
    "/hero-images/hotel-hero-3.webp"
];

const Hero = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-full bg-white pb-20 pt-24">

            {/* Contenedor de la Imagen (Tarjeta Flotante) */}
            <div className="relative mx-4 md:mx-6 lg:mx-8 rounded-[2.5rem] overflow-hidden h-[480px] md:h-[600px] shadow-2xl shadow-gray-200">

                {/* CARRUSEL DE IMÁGENES */}
                <AnimatePresence mode="popLayout">
                    <motion.img
                        key={currentImageIndex}
                        src={heroImages[currentImageIndex]}
                        alt="Hero Alyvia"
                        className="absolute inset-0 w-full h-full object-cover"
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1.05 }}
                        exit={{ opacity: 0 }}
                        transition={{
                            opacity: { duration: 1.5 },
                            scale: { duration: 6, ease: "linear" }
                        }}
                    />
                </AnimatePresence>

                {/* Overlay Oscuro */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30 pointer-events-none"></div>

                {/* Texto Central */}
                <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4 pt-8">
                    <motion.h1
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-3xl md:text-5xl lg:text-6xl font-bold text-white max-w-5xl leading-[1.1] tracking-tight drop-shadow-lg"
                    >
                        Descubre el Lujo en Alyvia, <br /> Tu Santuario Exclusivo.
                    </motion.h1>

                    <motion.p
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="mt-6 text-base md:text-lg text-gray-100 max-w-xl font-medium drop-shadow-md"
                    >
                        Confort de clase mundial, elegancia y un servicio hecho a tu medida. Reserva hoy una estancia inolvidable.
                    </motion.p>
                </div>
            </div>

            {/* 2. AQUÍ ESTÁ EL WIDGET RESTAURADO */}
            <div className="relative z-20 -mt-16 md:-mt-24 px-6 max-w-6xl mx-auto">
                <BookingWidget />
            </div>

        </div>
    );
};

export default Hero;