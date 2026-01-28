import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, CalendarCheck } from 'lucide-react';
// 1. IMPORTAR EL HOOK DEL CONTEXTO
import { useBooking } from '../context/BookingContext';

const rooms = [
    {
        id: 1,
        title: "The Ocean Suite",
        price: "$450",
        period: "/ night",
        desc: "Vista frontal al océano con terraza privada y acabados en mármol.",
        features: ["65m²", "King Bed", "Ocean View"],
        img: "/imagenes-hotel/vista-oceano.webp" // Asegúrate que estas rutas sean reales en tu carpeta public
    },
    {
        id: 2,
        title: "Forest Hideaway",
        price: "$320",
        period: "/ night",
        desc: "Inmersión total en la naturaleza. Silencio, pinos y diseño sostenible.",
        features: ["45m²", "Queen Bed", "Private Garden"],
        img: "/imagenes-hotel/vista-pinos.webp"
    },
    {
        id: 3,
        title: "Royal Penthouse",
        price: "$1,200",
        period: "/ night",
        desc: "La joya de la corona. Piscina infinita, mayordomo y privacidad absoluta.",
        features: ["120m²", "2 Bedrooms", "Infinity Pool"],
        img: "/imagenes-hotel/penthouse.webp"
    }
];

const Rooms = () => {
    // 2. OBTENER LA FUNCIÓN DEL CONTEXTO
    const { openBooking } = useBooking();

    // DETECTAR MÓVIL PARA AJUSTAR ANIMACIÓN
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 1024); // lg breakpoint
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
        <section id="habitaciones" className="bg-olive py-32 px-6 relative overflow-hidden">

            {/* Fondo decorativo sutil */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white/5 to-transparent opacity-40 pointer-events-none"></div>

            <div className="max-w-7xl mx-auto relative z-10">

                {/* Header Editorial */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8 border-b border-white/10 pb-10">
                    <div>
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="flex items-center gap-2 text-olive-accent mb-4"
                        >
                            <Sparkles size={16} />
                            <span className="text-xs font-bold tracking-[0.3em] uppercase">Alojamiento</span>
                        </motion.div>

                        <h2 className="font-serif text-5xl md:text-7xl text-cream leading-tight">
                            Estancia en <span className="italic opacity-80">Armonía</span>.
                        </h2>
                    </div>
                </div>

                {/* Grid de Cards */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    {rooms.map((room, index) => (
                        <motion.div
                            key={room.id}
                            // ANIMACIÓN OPTIMIZADA
                            initial={{ opacity: 0, y: 40, scale: 0.95 }} // Añadimos escala pequeña inicial
                            whileInView={{ opacity: 1, y: 0, scale: 1 }} // Al entrar, crece suavemente
                            viewport={{
                                once: true,
                                amount: 0.2, // Se activa cuando el 20% de la tarjeta es visible
                                margin: "0px 0px -50px 0px" // Margen de seguridad inferior
                            }}
                            transition={{
                                duration: 0.8,
                                // CLAVE: En móvil delay casi cero. En PC mantenemos el efecto cascada.
                                delay: isMobile ? 0.05 : index * 0.15,
                                ease: [0.22, 1, 0.36, 1] // Curva "Bezier de lujo"
                            }}
                            className="group relative bg-cream rounded-[2.5rem] p-3 shadow-2xl hover:-translate-y-2 transition-transform duration-500 flex flex-col"
                        >

                            {/* Imagen Enmarcada */}
                            <div className="relative h-[380px] overflow-hidden rounded-[2rem] bg-gray-200">
                                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors z-10 duration-500"></div>
                                <img
                                    src={room.img}
                                    alt={room.title}
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-[1.5s] ease-in-out"
                                />

                                {/* Etiqueta de Precio */}
                                <div className="absolute top-4 right-4 z-20 bg-forest/90 backdrop-blur text-cream px-4 py-2 rounded-full flex items-baseline gap-1 shadow-lg">
                                    <span className="font-serif text-lg">{room.price}</span>
                                    <span className="text-[10px] opacity-70 tracking-wider uppercase">{room.period}</span>
                                </div>
                            </div>

                            {/* Contenido Editorial */}
                            <div className="pt-8 pb-6 px-4 flex flex-col flex-grow">

                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="font-serif text-3xl text-forest group-hover:text-olive transition-colors duration-300">
                                        {room.title}
                                    </h3>
                                </div>

                                {/* Features */}
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {room.features.map((feature, i) => (
                                        <span key={i} className="text-[10px] font-bold uppercase tracking-wider text-forest/60 border border-forest/10 px-3 py-1 rounded-full">
                                            {feature}
                                        </span>
                                    ))}
                                </div>

                                <p className="text-forest/70 text-sm leading-relaxed mb-8">
                                    {room.desc}
                                </p>

                                {/* Botón */}
                                <div className="mt-auto">
                                    <button
                                        // 3. AQUÍ ESTÁ LA MAGIA: Pasamos el título de la habitación
                                        onClick={() => openBooking(room.title)}
                                        className="w-full bg-forest text-cream py-4 rounded-xl font-bold uppercase text-xs tracking-[0.15em] hover:bg-olive transition-colors duration-300 shadow-lg flex items-center justify-center gap-3"
                                    >
                                        <CalendarCheck size={16} />
                                        Reservar Suite
                                    </button>
                                </div>

                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Rooms;