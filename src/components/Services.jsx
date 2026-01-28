import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, X, ArrowRight } from 'lucide-react';

const services = [
    {
        id: 1,
        title: "Bienestar y Spa",
        category: "Relajación",
        img: "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?q=80&w=2070&auto=format&fit=crop",
        description: "Desconecta del mundo en nuestro santuario subterráneo. Nuestros tratamientos fusionan técnicas ancestrales con ingredientes orgánicos para restaurar tu equilibrio interior.",
        details: { time: "Diario: 8am - 9pm", price: "desde $120" }
    },
    {
        id: 2,
        title: "Cena Michelin",
        category: "Gastronomía",
        img: "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1974&auto=format&fit=crop",
        description: "Un viaje culinario guiado por el Chef Marco Pierre. Experimenta un menú degustación de 7 tiempos que celebra los sabores locales con un toque moderno.",
        details: { time: "Cena: 7pm - 11pm", price: "desde $250" }
    },
    {
        id: 3,
        title: "Yate Privado",
        category: "Aventura",
        img: "https://plus.unsplash.com/premium_photo-1682377521541-36f0ccecd189?q=80&w=1332&auto=format&fit=crop",
        description: "Explora calas ocultas y playas vírgenes a bordo de nuestro yate privado de 60 pies. Incluye servicio de champaña y capitán privado.",
        details: { time: "Duración: 4 Horas", price: "desde $800" }
    },
    {
        id: 4,
        title: "Cine de Medianoche",
        category: "Entretenimiento",
        img: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2070&auto=format&fit=crop",
        description: "Disfruta de películas clásicas bajo las estrellas en nuestro anfiteatro al aire libre. Palomitas gourmet y mantas de cortesía incluidas.",
        details: { time: "Vie y Sáb: 10pm", price: "Cortesía" }
    },
];

const modalContentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const Services = () => {
    const [activeImg, setActiveImg] = useState(null);
    const [selectedService, setSelectedService] = useState(null);
    const [hoveredIndex, setHoveredIndex] = useState(null);

    return (
        <section id="servicios" className="py-32 bg-[#Eae8e4] min-h-screen relative flex items-center justify-center overflow-hidden">

            {/* FONDO DECORATIVO */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/noise-lines.png')]"></div>

            {/* FONDO IMAGEN CAMBIANTE (Optimizado: Sin mode='wait' para evitar parpadeo) */}
            <AnimatePresence>
                {activeImg && !selectedService && (
                    <motion.div
                        key={activeImg}
                        initial={{ opacity: 0 }} // Entrada suave
                        animate={{ opacity: 0.15 }} // Opacidad final
                        exit={{ opacity: 0 }} // Salida suave
                        transition={{ duration: 0.6 }} // Transición fluida
                        className="absolute inset-0 z-0 pointer-events-none"
                    >
                        <img src={activeImg} alt="bg" className="w-full h-full object-cover filter grayscale contrast-125" />
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="max-w-7xl w-full px-6 z-10">
                <div className="mb-20 border-b border-black/10 pb-6 flex justify-between items-end">
                    <h2 className="text-sm font-bold tracking-[0.2em] uppercase text-black/40 flex items-center gap-2">
                        Servicios de Alyvia
                    </h2>
                    <span className="hidden md:block text-[10px] font-bold tracking-widest uppercase opacity-40">01 — 04</span>
                </div>

                {/* LISTA DE SERVICIOS */}
                <div className="flex flex-col" onMouseLeave={() => setHoveredIndex(null)}>
                    {services.map((service, index) => (
                        <motion.div
                            key={service.id}
                            // 1. CORRECCIÓN PRINCIPAL: Eliminamos el delay secuencial
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }} // Margen para que no aparezca tan al borde
                            transition={{ duration: 0.5, ease: "easeOut" }} // Sin delay = Sin efecto "uno por uno"

                            onMouseEnter={() => { setActiveImg(service.img); setHoveredIndex(index); }}
                            onMouseLeave={() => setActiveImg(null)}
                            onClick={() => setSelectedService(service)}

                            // 2. CORRECCIÓN HOVER: Quitamos 'blur' para mejor rendimiento y menos parpadeo
                            className={`group relative border-b border-black/10 py-12 cursor-pointer flex justify-between items-center transition-all duration-500
                                ${hoveredIndex !== null && hoveredIndex !== index ? 'opacity-30' : 'opacity-100'}
                            `}
                        >
                            <div className="flex items-baseline gap-8 md:gap-16">
                                <span className="text-xs font-mono text-black/40 group-hover:text-black transition-colors">0{service.id}</span>
                                <h3 className="font-serif text-3xl md:text-5xl lg:text-7xl text-[#1C1C1C] group-hover:italic group-hover:translate-x-4 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]">
                                    {service.title}
                                </h3>
                            </div>

                            <div className="flex items-center gap-6">
                                <span className="hidden md:inline-block text-[10px] font-bold tracking-[0.2em] uppercase text-black/40 group-hover:text-black transition-colors">
                                    {service.category}
                                </span>
                                <div className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center group-hover:bg-[#1C1C1C] group-hover:text-white group-hover:border-transparent transition-all duration-500">
                                    <ArrowUpRight size={20} className="transform group-hover:rotate-45 transition-transform duration-500" />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* MODAL (Sin cambios funcionales, solo estética) */}
            <AnimatePresence>
                {selectedService && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
                    >
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-[#1C1C1C]/60 backdrop-blur-xl transition-all"
                            onClick={() => setSelectedService(null)}
                        />

                        <motion.div
                            layoutId={`modal-${selectedService.id}`}
                            initial={{ scale: 0.9, opacity: 0, y: 50 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="bg-[#F2F0E9] w-full max-w-6xl rounded-[2.5rem] overflow-hidden shadow-2xl relative z-10 flex flex-col md:flex-row h-[85vh] md:h-[650px]"
                        >

                            <button
                                onClick={() => setSelectedService(null)}
                                className="absolute top-6 right-6 z-30 group w-12 h-12 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md hover:bg-[#1C1C1C] hover:text-white transition-all duration-300 shadow-lg border border-white/20"
                            >
                                <X size={20} className="group-hover:rotate-90 transition-transform duration-300" />
                            </button>

                            {/* Columna Izquierda */}
                            <div className="w-full md:w-[55%] h-[40%] md:h-full relative overflow-hidden bg-black">
                                <motion.img
                                    initial={{ scale: 1.2 }}
                                    animate={{ scale: 1 }}
                                    transition={{ duration: 10, ease: "linear" }}
                                    src={selectedService.img}
                                    alt={selectedService.title}
                                    className="w-full h-full object-cover opacity-90"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:bg-gradient-to-r"></div>

                                <div className="absolute top-8 left-8">
                                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/80 border border-white/20 px-4 py-2 rounded-full backdrop-blur-md">
                                        {selectedService.category}
                                    </span>
                                </div>
                            </div>

                            {/* Columna Derecha */}
                            <motion.div
                                className="w-full md:w-[45%] p-8 md:p-16 flex flex-col justify-between bg-[#F2F0E9] overflow-y-auto"
                                initial="hidden"
                                animate="visible"
                                variants={{
                                    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
                                }}
                            >
                                <div>
                                    <motion.div variants={modalContentVariants} className="mb-2">
                                        <span className="text-xs font-bold tracking-[0.3em] uppercase text-[#4A5D4F]">Experiencia</span>
                                    </motion.div>

                                    <motion.h3 variants={modalContentVariants} className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#1C1C1C] mb-6 md:mb-8 leading-[1.1]">
                                        {selectedService.title}
                                    </motion.h3>

                                    <motion.p variants={modalContentVariants} className="text-gray-600 leading-relaxed text-sm md:text-base font-medium max-w-sm mb-12">
                                        {selectedService.description}
                                    </motion.p>

                                    <motion.div variants={modalContentVariants} className="grid grid-cols-2 gap-8 border-t border-black/10 pt-8">
                                        <div>
                                            <span className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Disponibilidad</span>
                                            <span className="block font-serif text-xl text-[#1C1C1C]">{selectedService.details.time}</span>
                                        </div>
                                        <div>
                                            <span className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Costo</span>
                                            <span className="block font-serif text-xl text-[#1C1C1C]">{selectedService.details.price}</span>
                                        </div>
                                    </motion.div>
                                </div>

                                <motion.button
                                    variants={modalContentVariants}
                                    className="w-full bg-[#1C1C1C] text-[#F2F0E9] py-5 rounded-2xl flex items-center justify-between px-8 hover:bg-[#4A5D4F] transition-colors duration-500 group mt-8 md:mt-0 shadow-xl"
                                >
                                    <span className="font-bold uppercase text-xs tracking-[0.2em]">Reservar Ahora</span>
                                    <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform duration-300" />
                                </motion.button>
                            </motion.div>

                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Services;