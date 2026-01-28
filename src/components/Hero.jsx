import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BookingWidget from './BookingWidget';

const heroImages = [
    "/hero-images/hotel-hero-1.webp",
    "/hero-images/hotel-hero-2.webp",
    "/hero-images/hotel-hero-3.webp"
];

const Hero = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        // Cambiamos cada 5 segundos (5000ms)
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    // LÓGICA KEN BURNS:
    // Determinamos si el índice es par o impar para alternar la dirección del zoom/paneo.
    // Esto evita que el efecto se sienta repetitivo.
    const isEven = currentImageIndex % 2 === 0;

    return (
        <div className="w-full bg-white pb-20 pt-24">

            {/* Contenedor de la Tarjeta */}
            <div className="relative mx-4 md:mx-6 lg:mx-8 rounded-[2.5rem] overflow-hidden h-[480px] md:h-[600px] shadow-2xl shadow-gray-200">

                <AnimatePresence mode="popLayout">
                    <motion.img
                        key={currentImageIndex}
                        src={heroImages[currentImageIndex]}
                        alt="Hero Alyvia"
                        className="absolute inset-0 w-full h-full object-cover will-change-transform"

                        // --- CONFIGURACIÓN DEL EFECTO KEN BURNS ---

                        // 1. Estado Inicial (Cuando la imagen entra)
                        // Si es par: Empieza ligeramente zoomeada (1.1) y desplazada a la izquierda (-2%)
                        // Si es impar: Empieza muy zoomeada (1.25) y desplazada a la derecha (2%)
                        initial={{
                            opacity: 0,
                            scale: isEven ? 1.1 : 1.25,
                            x: isEven ? '-2%' : '2%',
                        }}

                        // 2. Estado Final (Hacia donde se mueve mientras está visible)
                        // Si es par: Hace zoom IN (a 1.25) y se mueve al centro (0%)
                        // Si es impar: Hace zoom OUT (a 1.1) y se mueve al centro (0%)
                        animate={{
                            opacity: 1,
                            scale: isEven ? 1.25 : 1.1,
                            x: '0%',
                        }}

                        // 3. Estado de Salida
                        exit={{ opacity: 0 }}

                        // 4. Transiciones (La magia está aquí)
                        transition={{
                            // El cruce de opacidad (fade) es relativamente rápido (2s)
                            opacity: { duration: 2, ease: "easeInOut" },

                            // IMPORTANTE: El movimiento (escala y X) debe ser LENTO, LINEAL y durar MÁS
                            // que el intervalo del carrusel (7s vs 5s) para que nunca pare de moverse.
                            scale: { duration: 7, ease: "linear" },
                            x: { duration: 7, ease: "linear" }
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

            {/* Widget de Reservas */}
            <div className="relative z-20 -mt-16 md:-mt-24 px-6 max-w-6xl mx-auto">
                <BookingWidget />
            </div>

        </div>
    );
};

export default Hero;