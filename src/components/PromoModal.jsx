import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, Check } from 'lucide-react';
// 1. IMPORTAR EL CONTEXTO
import { useBooking } from '../context/BookingContext';

const PromoModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [copied, setCopied] = useState(false);

    // 2. OBTENER LA FUNCIÓN PARA ABRIR EL WIDGET
    const { openBooking } = useBooking();

    useEffect(() => {
        // Mostrar el modal después de 3 segundos
        const timer = setTimeout(() => {
            setIsOpen(true);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    const handleClose = () => {
        setIsOpen(false);
    };

    const copyCode = () => {
        navigator.clipboard.writeText("WELCOME2026");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    // 3. FUNCIÓN QUE CONECTA AMBOS MUNDOS
    const handleReservePromo = () => {
        handleClose(); // Primero cerramos este modal

        // Pequeño timeout para que la transición sea suave (opcional, pero se ve mejor)
        setTimeout(() => {
            openBooking(); // Abrimos el widget de reserva (sin argumentos = "Cualquier Suite")
        }, 300);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 md:px-0">

                    {/* BACKDROP */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
                    />

                    {/* MODAL CARD */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="
        relative w-full max-w-4xl bg-[#2C342C] rounded-[2rem] shadow-2xl overflow-hidden flex flex-col md:flex-row
        /* CAMBIOS CLAVE AQUÍ: */
        max-h-[85dvh]  /* Usar dvh (Dynamic Viewport Height) evita problemas con la barra de URL */
        h-auto         /* Altura automática basada en contenido */
        mx-4           /* Margen lateral para que no toque los bordes */
    "
                    >

                        <button
                            onClick={handleClose}
                            className="absolute top-4 right-4 z-20 w-10 h-10 bg-black/20 hover:bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-colors"
                        >
                            <X size={20} />
                        </button>

                        {/* COLUMNA IMAGEN */}
                        <div className="w-full md:w-5/12 relative min-h-[250px] md:min-h-full">
                            <img
                                src="https://images.unsplash.com/photo-1549294413-26f195200c16?q=80&w=1964&auto=format&fit=crop"
                                alt="Regalo de Bienvenida"
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#2C342C] via-transparent to-transparent opacity-90"></div>
                        </div>

                        {/* COLUMNA CONTENIDO */}
                        <div className="w-full md:w-7/12 p-8 md:p-12 text-cream flex flex-col justify-center text-center md:text-left">

                            <span className="text-xs font-bold uppercase tracking-[0.3em] text-olive-accent mb-4">
                                Invitación Exclusiva
                            </span>

                            <h2 className="font-serif text-4xl md:text-5xl mb-4 leading-tight">
                                ¿Primera Vez <br /><span className="italic opacity-50">Aquí?</span>
                            </h2>

                            <p className="text-white/60 text-sm leading-relaxed mb-8 max-w-md mx-auto md:mx-0">
                                Experimenta el santuario de Alyvia con un privilegio especial de bienvenida. Disfruta un <strong>15% OFF</strong> en tu primera reserva + desayuno de cortesía.
                            </p>

                            {/* Código */}
                            <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
                                <div className="text-left">
                                    <span className="block text-[10px] font-bold uppercase tracking-widest text-white/40 mb-1">Código Promo</span>
                                    <span className="font-mono text-xl md:text-2xl text-olive-accent tracking-widest">WELCOME2026</span>
                                </div>

                                <button
                                    onClick={copyCode}
                                    className="group flex items-center gap-2 bg-cream text-[#2C342C] px-5 py-3 rounded-lg font-bold text-xs uppercase tracking-wider hover:bg-olive-accent hover:text-white transition-all min-w-[140px] justify-center"
                                >
                                    {copied ? (
                                        <>Copiado <Check size={14} /></>
                                    ) : (
                                        <>Copiar Código <Copy size={14} className="opacity-50 group-hover:opacity-100 transition-opacity" /></>
                                    )}
                                </button>
                            </div>

                            {/* CTA ACTUALIZADO */}
                            <button
                                onClick={handleReservePromo} // <--- AQUÍ LLAMAMOS A LA NUEVA FUNCIÓN
                                className="text-xs font-bold uppercase tracking-[0.2em] border-b border-white/30 pb-1 self-center md:self-start hover:text-olive-accent hover:border-olive-accent transition-colors"
                            >
                                Reservar Ahora
                            </button>
                        </div>

                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default PromoModal;