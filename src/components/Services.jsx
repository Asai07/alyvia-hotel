import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, X, ArrowRight } from 'lucide-react';

const services = [
    {
        id: 1,
        title: "Bienestar y Spa",
        category: "Relajación",
        img: "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?q=80&w=2070&auto=format&fit=crop",
        description: "Desconecta del mundo en nuestro santuario subterráneo. Nuestros tratamientos fusionan técnicas ancestrales con ingredientes orgánicos.",
        details: { time: "Diario: 8am - 9pm", price: "desde $120" }
    },
    {
        id: 2,
        title: "Cena Michelin",
        category: "Gastronomía",
        img: "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1974&auto=format&fit=crop",
        description: "Un viaje culinario guiado por el Chef Marco Pierre. Experimenta un menú degustación de 7 tiempos que celebra los sabores locales.",
        details: { time: "Cena: 7pm - 11pm", price: "desde $250" }
    },
    {
        id: 3,
        title: "Yate Privado",
        category: "Aventura",
        img: "https://plus.unsplash.com/premium_photo-1682377521541-36f0ccecd189?q=80&w=1332&auto=format&fit=crop",
        description: "Explora calas ocultas y playas vírgenes a bordo de nuestro yate privado de 60 pies. Incluye servicio de champaña.",
        details: { time: "Duración: 4 Horas", price: "desde $800" }
    },
    {
        id: 4,
        title: "Cine de Medianoche",
        category: "Entretenimiento",
        img: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2070&auto=format&fit=crop",
        description: "Disfruta de películas clásicas bajo las estrellas en nuestro anfiteatro al aire libre. Palomitas gourmet incluidas.",
        details: { time: "Vie y Sáb: 10pm", price: "Cortesía" }
    },
];

const modalContentVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
};

const Services = () => {
    const [activeImg, setActiveImg] = useState(null);
    const [selectedService, setSelectedService] = useState(null);
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [isMobile, setIsMobile] = useState(false);

    // Detectar móvil para desactivar efectos hover pesados
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
        <section id="servicios" className="py-24 md:py-32 bg-[#Eae8e4] min-h-screen relative flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/noise-lines.png')]"></div>

            {/* FONDO IMAGEN CAMBIANTE (Solo en Desktop para evitar parpadeo móvil) */}
            {!isMobile && (
                <AnimatePresence>
                    {activeImg && !selectedService && (
                        <motion.div
                            key={activeImg}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.15 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.6 }}
                            className="absolute inset-0 z-0 pointer-events-none"
                        >
                            <img src={activeImg} alt="bg" className="w-full h-full object-cover filter grayscale contrast-125" />
                        </motion.div>
                    )}
                </AnimatePresence>
            )}

            <div className="max-w-7xl w-full px-6 z-10">
                <div className="mb-12 md:mb-20 border-b border-black/10 pb-6 flex justify-between items-end">
                    <h2 className="text-sm font-bold tracking-[0.2em] uppercase text-black/40 flex items-center gap-2">
                        Servicios de Alyvia
                    </h2>
                    <span className="hidden md:block text-[10px] font-bold tracking-widest uppercase opacity-40">01 — 04</span>
                </div>

                <div className="flex flex-col" onMouseLeave={() => !isMobile && setHoveredIndex(null)}>
                    {services.map((service, index) => (
                        <motion.div
                            key={service.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-10%" }}
                            transition={{ duration: 0.5, ease: "easeOut" }}

                            // Logica Hover solo si NO es móvil
                            onMouseEnter={() => {
                                if (!isMobile) { setActiveImg(service.img); setHoveredIndex(index); }
                            }}
                            onMouseLeave={() => !isMobile && setActiveImg(null)}
                            onClick={() => setSelectedService(service)}

                            className={`group relative border-b border-black/10 py-8 md:py-12 cursor-pointer flex justify-between items-center transition-all duration-500
                                ${!isMobile && hoveredIndex !== null && hoveredIndex !== index ? 'opacity-30' : 'opacity-100'}
                            `}
                        >
                            <div className="flex items-baseline gap-6 md:gap-16">
                                <span className="text-xs font-mono text-black/40 group-hover:text-black transition-colors">0{service.id}</span>
                                <h3 className="font-serif text-2xl md:text-5xl lg:text-7xl text-[#1C1C1C] group-hover:italic md:group-hover:translate-x-4 transition-all duration-500">
                                    {service.title}
                                </h3>
                            </div>
                            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-black/10 flex items-center justify-center group-hover:bg-[#1C1C1C] group-hover:text-white transition-all">
                                <ArrowUpRight size={18} className="transform group-hover:rotate-45 transition-transform" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* MODAL AJUSTADO PARA MÓVIL */}
            <AnimatePresence>
                {selectedService && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    >
                        <div className="absolute inset-0 bg-[#1C1C1C]/60 backdrop-blur-xl" onClick={() => setSelectedService(null)} />

                        <motion.div
                            layoutId={`modal-${selectedService.id}`}
                            className="bg-[#F2F0E9] w-full max-w-5xl rounded-[2rem] overflow-hidden shadow-2xl relative z-10 flex flex-col md:flex-row max-h-[85dvh] md:h-[600px]"
                        >
                            <button
                                onClick={() => setSelectedService(null)}
                                className="absolute top-4 right-4 z-30 w-10 h-10 flex items-center justify-center rounded-full bg-white/30 backdrop-blur-md hover:bg-black hover:text-white transition-all"
                            >
                                <X size={18} />
                            </button>

                            {/* Imagen: Más pequeña en móvil (h-48) para dejar espacio al texto */}
                            <div className="w-full md:w-1/2 h-48 md:h-full relative shrink-0">
                                <img src={selectedService.img} alt={selectedService.title} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/20" />
                                <span className="absolute bottom-4 left-4 text-[10px] font-bold uppercase tracking-widest text-white/90 border border-white/30 px-3 py-1 rounded-full backdrop-blur-sm">
                                    {selectedService.category}
                                </span>
                            </div>

                            {/* Contenido: Scrollable y compacto */}
                            <div className="w-full md:w-1/2 p-6 md:p-12 flex flex-col justify-between overflow-y-auto">
                                <div>
                                    <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#4A5D4F] block mb-2">Experiencia</span>
                                    {/* Texto ajustado para móvil */}
                                    <h3 className="font-serif text-3xl md:text-5xl text-[#1C1C1C] mb-4 leading-tight">
                                        {selectedService.title}
                                    </h3>
                                    <p className="text-gray-600 text-sm leading-relaxed mb-8">
                                        {selectedService.description}
                                    </p>

                                    <div className="grid grid-cols-2 gap-4 border-t border-black/10 pt-6 mb-6">
                                        <div>
                                            <span className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Horario</span>
                                            <span className="block font-serif text-lg text-[#1C1C1C]">{selectedService.details.time}</span>
                                        </div>
                                        <div>
                                            <span className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Inversión</span>
                                            <span className="block font-serif text-lg text-[#1C1C1C]">{selectedService.details.price}</span>
                                        </div>
                                    </div>
                                </div>

                                <button className="w-full bg-forest text-[#F2F0E9] py-4 rounded-xl flex items-center justify-between px-6 hover:bg-[#4A5D4F] transition-colors group mt-auto shadow-lg">
                                    <span className="font-bold uppercase text-[10px] tracking-[0.2em]">Reservar Ahora</span>
                                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Services;