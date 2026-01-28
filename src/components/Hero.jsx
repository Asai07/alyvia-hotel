import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CalendarCheck, ArrowDown } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { useLenis } from 'lenis/react';

// 1. Definimos las imágenes del carrusel.
// Puedes aumentar 'imageCount' si tienes hotel-hero-4.webp, etc.
const imageCount = 3;
const heroImages = Array.from(
    { length: imageCount },
    (_, i) => `/hero-images/hotel-hero-${i + 1}.webp`
);

const Hero = () => {
    const { openBooking } = useBooking();
    const lenis = useLenis();

    // 2. Estado para controlar el índice de la imagen actual
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // 3. Efecto para cambiar la imagen automáticamente cada 5 segundos
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
        }, 5000); // Cambia cada 5000ms (5 segundos)

        // Limpiamos el intervalo cuando el componente se desmonta
        return () => clearInterval(interval);
    }, []);

    const handleScrollDown = () => {
        lenis?.scrollTo('#nosotros', {
            offset: -100,
            duration: 1.5,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
        });
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.3, delayChildren: 0.5 }
        }
    };

    const itemVariants = {
        hidden: { y: 50, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: "spring", stiffness: 100, damping: 20 }
        }
    };

    return (
        <section id="top" className="relative h-screen w-full overflow-hidden bg-[#2C342C]">

            {/* 4. AnimatePresence permite animar componentes cuando se montan y desmontan.
                 Usamos 'mode="popLayout"' para que las imágenes se superpongan durante la transición,
                 creando un efecto de "crossfade" más fluido.
            */}
            <AnimatePresence mode="popLayout">
                <motion.img
                    key={currentImageIndex} // La 'key' es crucial para que Framer Motion detecte el cambio
                    src={heroImages[currentImageIndex]}
                    alt={`Vista del hotel ${currentImageIndex + 1}`}
                    className="absolute inset-0 w-full h-full object-cover"

                    // Definimos las animaciones de entrada y salida
                    initial={{ opacity: 0, scale: 1.1 }} // Entra transparente y un poco más grande
                    animate={{ opacity: 1, scale: 1.05 }} // Se vuelve opaca y hace un zoom suave
                    exit={{ opacity: 0 }} // Sale desvaneciéndose

                    transition={{
                        opacity: { duration: 1.5, ease: "easeInOut" }, // Transición de opacidad suave
                        scale: { duration: 6, ease: "linear" } // Zoom lento y constante mientras está visible
                    }}
                />
            </AnimatePresence>

            {/* Overlay oscuro para mejorar la legibilidad del texto */}
            <div className="absolute inset-0 bg-black/30 mix-blend-multiply pointer-events-none"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#2C342C]/80 via-transparent to-[#2C342C]/20 pointer-events-none"></div>

            {/* Contenido Principal */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4"
            >
                <motion.div variants={itemVariants} className="flex items-center gap-3 mb-6 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/20">
                    <span className="text-[#C5A880]">★★★★★</span>
                    <span className="text-xs font-bold tracking-[0.2em] text-white uppercase">
                        Santuario de Lujo
                    </span>
                </motion.div>

                <motion.h1
                    variants={itemVariants}
                    className="font-serif text-6xl md:text-8xl lg:text-9xl text-[#F2F0E9] leading-none mb-8 tracking-tight drop-shadow-lg"
                >
                    Redefine <br />
                    <span className="italic font-light text-white">tu Escapada</span>
                </motion.h1>

                <motion.p
                    variants={itemVariants}
                    className="max-w-2xl text-lg md:text-xl text-[#F2F0E9]/90 mb-12 font-light leading-relaxed drop-shadow-md"
                >
                    Donde la naturaleza virgen abraza la arquitectura consciente.
                    Un refugio exclusivo para quienes buscan paz, diseño y reconexión.
                </motion.p>

                <motion.button
                    variants={itemVariants}
                    whileHover={{ scale: 1.05, backgroundColor: "#C5A880" }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => openBooking()}
                    className="group flex items-center gap-4 bg-[#2C342C] text-white px-10 py-5 rounded-full font-bold text-xs uppercase tracking-[0.2em] transition-all duration-300 border border-[#C5A880] hover:border-[#2C342C] shadow-xl hover:shadow-[#C5A880]/20"
                >
                    Reservar Ahora
                    <CalendarCheck size={18} className="text-[#C5A880] group-hover:text-white transition-colors" />
                </motion.button>
            </motion.div>

            {/* Botón de Scroll */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2, duration: 1 }}
                className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20"
            >
                <button
                    onClick={handleScrollDown}
                    className="flex flex-col items-center gap-2 text-white/60 hover:text-[#C5A880] transition-colors group"
                >
                    <span className="text-[10px] font-bold uppercase tracking-widest">Explorar</span>
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                        className="bg-white/10 p-2 rounded-full group-hover:bg-[#C5A880]/20 transition-colors border border-white/10"
                    >
                        <ArrowDown size={20} />
                    </motion.div>
                </button>
            </motion.div>
        </section>
    );
};

export default Hero;