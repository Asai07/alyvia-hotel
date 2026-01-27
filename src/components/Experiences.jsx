import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

// DATOS
const experiencesData = {
    Adventure: {
        id: "01",
        title: "Salto de Acantilado",
        subtitle: "El Salto Atlántico",
        description: "Una experiencia de pura adrenalina. Salta desde formaciones volcánicas milenarias hacia el azul profundo del océano, guiado por expertos locales.",
        price: "$85 / persona",
        img: "/imagenes-hotel/diving.webp", // Ruta intacta
        details: [
            { label: "Duración", value: "3 Horas" },
            { label: "Dificultad", value: "Alta" },
            { label: "Grupo", value: "Max 6" }
        ]
    },
    Wellness: {
        id: "02",
        title: "Yoga al Amanecer",
        subtitle: "Flow Frente al Océano",
        description: "Conecta con los elementos. Practica Vinyasa flow al amanecer en nuestro deck privado, sintiendo la brisa marina y escuchando el ritmo de las olas.",
        price: "$40 / sesión",
        img: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?q=80&w=2070&auto=format&fit=crop", // Ruta intacta
        details: [
            { label: "Hora", value: "06:30 AM" },
            { label: "Nivel", value: "Todos" },
            { label: "Instructor", value: "Sarah J." }
        ]
    },
    Culture: {
        id: "03",
        title: "Masterclass Cerámica",
        subtitle: "Estudio Artesanal",
        description: "Manos en la tierra. Aprende las técnicas ancestrales de la cerámica local con maestros artesanos en un taller al aire libre bañado por el sol.",
        price: "$120 / persona",
        img: "https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?q=80&w=2069&auto=format&fit=crop", // Ruta intacta
        details: [
            { label: "Duración", value: "2.5 Horas" },
            { label: "Incluye", value: "Materiales" },
            { label: "Te llevas", value: "1 Pieza" }
        ]
    },
    Social: {
        id: "04",
        title: "Fogata de Medianoche",
        subtitle: "Reunión en la Playa",
        description: "Magia nocturna. Reúnete alrededor del fuego para disfrutar de música acústica en vivo, vinos locales y la inmensidad del cielo estrellado.",
        price: "Cortesía",
        img: "/imagenes-hotel/midnight.webp", // Ruta intacta
        details: [
            { label: "Inicio", value: "22:00 PM" },
            { label: "Bebidas", value: "Incluidas" },
            { label: "Acceso", value: "Huéspedes" }
        ]
    }
};

const categories = [
    { id: "Adventure", label: "Aventura" },
    { id: "Wellness", label: "Bienestar" },
    { id: "Culture", label: "Cultura" },
    { id: "Social", label: "Social" },
];

const Experiences = () => {
    const [activeTab, setActiveTab] = useState("Adventure");
    const activeData = experiencesData[activeTab];

    return (
        <section id="actividades" className="bg-white py-24 px-6 md:px-12 border-t border-forest/5">
            <div className="max-w-[1400px] mx-auto">

                {/* HEADER & MENÚ */}
                <div className="flex flex-col lg:flex-row justify-between items-end mb-20 gap-10">

                    <div>
                        <span className="block text-xs font-bold uppercase tracking-[0.3em] text-olive-accent mb-4">
                            Actividades de Alyvia
                        </span>
                        <h2 className="font-serif text-5xl md:text-7xl text-forest leading-none">
                            Descubre <span className="italic text-olive-light">Alyvia</span>
                        </h2>
                    </div>

                    {/* Menú de Pestañas */}
                    <div className="flex flex-wrap gap-8 md:gap-12 border-b border-forest/10 pb-4 w-full lg:w-auto">
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setActiveTab(cat.id)}
                                className={`
                                    text-xs md:text-sm font-bold uppercase tracking-[0.15em] transition-colors relative pb-2
                                    ${activeTab === cat.id ? 'text-forest' : 'text-forest/30 hover:text-forest/60'}
                                `}
                            >
                                {cat.label}
                                {activeTab === cat.id && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute bottom-[-17px] left-0 right-0 h-[2px] bg-forest"
                                    />
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* CONTENIDO PRINCIPAL */}
                <div className="min-h-[600px] relative">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                            className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start"
                        >

                            {/* COLUMNA IZQUIERDA */}
                            <div className="order-2 lg:order-1 relative w-full aspect-[4/5] lg:aspect-square bg-cream overflow-hidden">
                                <motion.img
                                    initial={{ scale: 1.1 }}
                                    animate={{ scale: 1 }}
                                    transition={{ duration: 1.5 }}
                                    src={activeData.img}
                                    alt={activeData.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* COLUMNA DERECHA */}
                            <div className="order-1 lg:order-2 flex flex-col justify-center h-full py-4">

                                <div className="flex items-center gap-4 mb-6">
                                    <span className="text-xs font-mono text-olive-light">
                                        {activeData.id}
                                    </span>
                                    <span className="h-px w-10 bg-olive-light/30"></span>
                                    <span className="text-xs font-bold uppercase tracking-widest text-olive-accent">
                                        {activeData.subtitle}
                                    </span>
                                </div>

                                <h3 className="font-serif text-5xl md:text-6xl lg:text-7xl text-forest mb-8 leading-[1.1]">
                                    {activeData.title}
                                </h3>

                                <p className="text-forest/70 text-lg leading-relaxed font-light mb-12 max-w-md">
                                    {activeData.description}
                                </p>

                                {/* Detalles */}
                                <div className="grid grid-cols-2 gap-y-8 gap-x-12 border-t border-forest/10 pt-10 mb-12">
                                    {activeData.details.map((item, idx) => (
                                        <div key={idx}>
                                            <span className="block text-[10px] font-bold uppercase tracking-widest text-olive-light mb-1">
                                                {item.label}
                                            </span>
                                            <span className="block text-xl font-serif text-forest">
                                                {item.value}
                                            </span>
                                        </div>
                                    ))}
                                    <div>
                                        <span className="block text-[10px] font-bold uppercase tracking-widest text-olive-light mb-1">
                                            Precio
                                        </span>
                                        <span className="block text-xl font-serif text-forest">
                                            {activeData.price}
                                        </span>
                                    </div>
                                </div>

                                <button className="self-start group flex items-center gap-2 text-forest font-bold uppercase text-xs tracking-[0.2em] hover:text-olive-accent transition-colors duration-300">
                                    Reservar Experiencia
                                    <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform duration-300" />
                                </button>

                            </div>

                        </motion.div>
                    </AnimatePresence>
                </div>

            </div>
        </section>
    );
};

export default Experiences;