import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const faqs = [
    { q: "¿A qué hora es el Check-in y Check-out?", a: "El Check-in es a partir de las 3:00 PM y el Check-out es a las 12:00 PM. Ofrecemos Late Check-out sujeto a disponibilidad." },
    { q: "¿Ofrecen transporte desde el aeropuerto?", a: "Sí, disponemos de servicio de transporte privado en SUV de lujo o helicóptero. Puede coordinarlo con nuestro equipo de Concierge." },
    { q: "¿El hotel es Pet Friendly?", a: "Amamos a los animales. Admitimos mascotas de hasta 10kg en nuestras Villas con Jardín Privado, con un cargo adicional de limpieza." },
    { q: "¿Hay opciones veganas o sin gluten?", a: "Absolutamente. Todos nuestros restaurantes ofrecen menús adaptados a restricciones dietéticas. Por favor informe al chef a su llegada." },
    { q: "¿Tienen código de vestimenta?", a: "Nuestro ambiente es 'Casual Elegante'. No se requiere etiqueta formal, pero solicitamos no usar ropa de baño en los restaurantes durante la cena." },
];

const FaqPage = () => {
    useEffect(() => { window.scrollTo(0, 0); }, []);
    const [activeIndex, setActiveIndex] = useState(null);

    return (
        <div className="bg-[#F9F9F7] min-h-screen font-sans">
            <div className="bg-white shadow-sm sticky top-0 z-40"><Navbar /></div>

            <div className="max-w-3xl mx-auto px-6 py-24">
                <h1 className="font-serif text-4xl md:text-5xl text-[#2C342C] mb-4 text-center">Preguntas Frecuentes</h1>
                <p className="text-gray-500 text-center mb-16">Todo lo que necesitas saber antes de tu llegada.</p>

                <div className="space-y-4">
                    {faqs.map((item, i) => (
                        <div key={i} className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
                            <button
                                onClick={() => setActiveIndex(activeIndex === i ? null : i)}
                                className="w-full flex justify-between items-center p-6 text-left hover:bg-gray-50 transition-colors"
                            >
                                <span className="font-serif text-xl text-[#2C342C]">{item.q}</span>
                                {activeIndex === i ? <Minus size={20} className="text-[#C5A880]" /> : <Plus size={20} className="text-gray-400" />}
                            </button>
                            <AnimatePresence>
                                {activeIndex === i && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="p-6 pt-0 text-gray-600 leading-relaxed border-t border-gray-100 mt-2">
                                            {item.a}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default FaqPage;