import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, ArrowLeft, ArrowRight } from 'lucide-react';

const reviews = [
    {
        id: 1,
        text: "Alyvia redefine el lujo silencioso. No es solo un hotel, es un estado mental donde el tiempo parece detenerse entre los olivos y el mar.",
        author: "Isabella Rossellini",
        role: "Editor at Vogue Living"
    },
    {
        id: 2,
        text: "La arquitectura desaparece para dejar que la naturaleza sea la protagonista. Una clase maestra de diseño sostenible y hospitalidad honesta.",
        author: "Marcus Fairs",
        role: "Dezeen Founder"
    },
    {
        id: 3,
        text: "El servicio es telepático. Sabían lo que necesitaba antes de que yo lo supiera. Una experiencia culinaria y sensorial sin precedentes.",
        author: "Chef Massimo Bottura",
        role: "Guest"
    }
];

const Reviews = () => {
    const [index, setIndex] = useState(0);

    const nextReview = () => setIndex((prev) => (prev + 1) % reviews.length);
    const prevReview = () => setIndex((prev) => (prev - 1 + reviews.length) % reviews.length);

    // AUTO-PLAY: Cambia cada 6 segundos
    useEffect(() => {
        const timer = setInterval(() => {
            nextReview();
        }, 6000);
        return () => clearInterval(timer); // Limpia el intervalo al desmontar o cambiar index
    }, [index]);

    return (
        <section className="bg-cream py-32 px-6 relative overflow-hidden">
            {/* Icono de Comillas Gigante */}
            <div className="absolute top-10 left-10 md:left-32 text-olive-light/10 pointer-events-none">
                <Quote size={200} />
            </div>

            <div className="max-w-5xl mx-auto relative z-10">
                <div className="min-h-[400px] flex flex-col justify-center text-center">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                        >
                            <h3 className="font-serif text-3xl md:text-5xl lg:text-6xl text-forest leading-tight mb-10 italic">
                                "{reviews[index].text}"
                            </h3>

                            <div className="flex flex-col items-center">
                                <span className="text-sm font-bold uppercase tracking-[0.2em] text-olive-accent mb-2">
                                    {reviews[index].author}
                                </span>
                                <span className="text-xs font-mono text-forest/50">
                                    {reviews[index].role}
                                </span>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Controles */}
                <div className="flex justify-center gap-12 mt-12">
                    <button onClick={prevReview} className="group p-4 rounded-full border border-forest/10 hover:border-forest hover:bg-forest hover:text-white transition-all">
                        <ArrowLeft size={20} />
                    </button>
                    <button onClick={nextReview} className="group p-4 rounded-full border border-forest/10 hover:border-forest hover:bg-forest hover:text-white transition-all">
                        <ArrowRight size={20} />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Reviews;