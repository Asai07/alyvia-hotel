import React from 'react';
import { motion } from 'framer-motion';

const galleryImages = [
    {
        id: 1,
        src: "/gallery/gallery-beach.webp",
        title: "Serenidad Costera",
        category: "Paisaje",
        height: "h-64 md:h-80"
    },
    {
        id: 2,
        src: "/gallery/gallery-people.webp",
        title: "Momentos Compartidos",
        category: "Social",
        height: "h-96"
    },
    {
        id: 3,
        src: "/gallery/gallery-beer.webp",
        title: "Deleite Vespertino",
        category: "Estilo de Vida",
        height: "h-72"
    },
    {
        id: 4,
        src: "/gallery/gallery-surf.webp",
        title: "Aventura Oceánica",
        category: "Actividades",
        height: "h-[30rem]"
    },
    {
        id: 5,
        src: "/gallery/gallery-palm.webp",
        title: "Sombra Tropical",
        category: "Naturaleza",
        height: "h-64"
    },
    {
        id: 6,
        src: "/gallery/gallery-pelican.webp",
        title: "Fauna Local",
        category: "Naturaleza",
        height: "h-80"
    },
    {
        id: 7,
        src: "/gallery/gallery-water.webp",
        title: "Aguas Cristalinas",
        category: "Detalles",
        height: "h-72"
    },
    {
        id: 8,
        src: "/gallery/gallery-sky.webp",
        title: "Horizonte Infinito",
        category: "Atmósfera",
        height: "h-96"
    },
    {
        id: 9,
        src: "/gallery/gallery-sunset.webp",
        title: "Atardecer",
        category: "Atmósfera",
        height: "h-64"
    }
];

const Gallery = () => {
    return (
        <section className="bg-[#2C342C] py-24 px-6 md:px-12 relative overflow-hidden">

            {/* Decoración Fondo optimizada */}
            <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none will-change-transform">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-white blur-[150px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[#C5A880] blur-[150px]" />
            </div>

            <div className="max-w-[1600px] mx-auto relative z-10">

                {/* HEADER SECCIÓN */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
                    <div>
                        <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#C5A880] mb-4 block">
                            Narrativa Visual
                        </span>
                        <h2 className="font-serif text-5xl md:text-7xl text-[#F2F0E9] leading-none">
                            Un Vistazo al <br /><span className="italic text-white/30">Paraíso</span>
                        </h2>
                    </div>

                    <div className="max-w-xs text-white/60 text-sm leading-relaxed text-right hidden md:block">
                        <p>Cada rincón de Alyvia está diseñado para inspirar. Explora las texturas, la luz y la atmósfera de nuestro santuario.</p>
                    </div>
                </div>

                {/* MASONRY GRID */}
                <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
                    {galleryImages.map((item, index) => (
                        <GalleryItem key={item.id} item={item} index={index} />
                    ))}
                </div>

            </div>
        </section>
    );
};

// Componente individual OPTIMIZADO
const GalleryItem = ({ item, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }} // Movimiento reducido para menos carga
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{
                once: true,
                margin: "50px" // Empieza a animar 50px antes de entrar
            }}
            transition={{
                duration: 0.6,
                ease: "easeOut"
                // Eliminamos el delay secuencial (index * 0.1) para evitar que el navegador acumule cálculos
            }}
            className="break-inside-avoid relative group overflow-hidden rounded-lg mb-8 bg-[#2C342C]" // bg para evitar flash blanco
        >
            <img
                src={item.src}
                alt={item.title}
                loading="lazy"
                decoding="async" // ESENCIAL para scroll fluido
                className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-105 will-change-transform"
            />

            {/* Efecto Hover Simplificado */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="absolute inset-0 p-8 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#C5A880] mb-2">
                    {item.category}
                </span>
                <h3 className="font-serif text-2xl text-white italic">
                    {item.title}
                </h3>
            </div>
        </motion.div>
    );
};

export default Gallery;