import React from 'react';
import { motion } from 'framer-motion';
import BookingWidget from './BookingWidget';

const bgImage = "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop";

const Hero = () => {
    return (
        <div className="w-full bg-white pb-20 pt-24">

            <div className="relative mx-4 md:mx-6 lg:mx-8 rounded-[2.5rem] overflow-hidden h-[480px] md:h-[600px] shadow-2xl shadow-gray-200">

                {/* Imagen de Fondo con Overlay Oscuro Mejorado */}
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${bgImage})` }}
                >
                    {/* CAMBIO AQUÍ: Overlay mucho más oscuro para que el texto blanco resalte */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30"></div>
                </div>

                {/* CAMBIO AQUÍ: Se eliminó la sección del botón "Tour Virtual" */}

                <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4 pt-8">
                    <motion.h1
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        // Añadí drop-shadow-lg para un extra de definición
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

            <div className="relative z-20 -mt-16 md:-mt-20 px-4">
                <BookingWidget />
            </div>

        </div>
    );
};

export default Hero;