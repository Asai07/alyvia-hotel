import React from 'react';
import { motion } from 'framer-motion';
import { Snowflake, ArrowRight, Star, Sparkles, Tag } from 'lucide-react';

const offers = [
    {
        id: 1,
        title: "Solsticio de Invierno",
        subtitle: "Quédate 4, Paga 3",
        desc: "El refugio perfecto. Reserva 4 noches y la última corre por nuestra cuenta. Despierta con vistas a la niebla invernal.",
        code: "WINTER26",
        img: "https://images.unsplash.com/photo-1516641396056-0ce60a85d49f?q=80&w=2070&auto=format&fit=crop"
    },
    {
        id: 2,
        title: "Cálido y Acogedor",
        subtitle: "$100 Crédito Spa",
        desc: "Combate el frío. Incluye acceso ilimitado a las aguas termales y un crédito para masajes con piedras calientes.",
        code: "WARMTH",
        img: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=2070&auto=format&fit=crop"
    },
    {
        id: 3,
        title: "Exclusivo Miembros",
        subtitle: "Upgrade de Suite",
        desc: "Solo para miembros. Reserva directo y obtén un upgrade garantizado a una suite con chimenea.",
        code: "MEMBERS",
        img: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=2070&auto=format&fit=crop"
    }
];

const Marquee = ({ text }) => {
    return (
        <div className="overflow-hidden whitespace-nowrap border-y border-forest/10 py-6 mb-12 bg-white/50">
            <motion.div
                className="flex gap-20"
                animate={{ x: [0, -1000] }}
                transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
            >
                {[...Array(4)].map((_, i) => (
                    <h3 key={i} className="text-6xl md:text-8xl font-serif text-forest/5 italic font-medium flex items-center gap-10">
                        {text} <Sparkles size={40} className="opacity-30" />
                    </h3>
                ))}
            </motion.div>
        </div>
    );
};

const Promotions = () => {
    return (
        <section className="bg-cream py-24 relative overflow-hidden">

            <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

            {/* Header */}
            <div className="max-w-[1400px] mx-auto px-6 mb-4 relative z-10">
                <div className="flex flex-col items-center text-center">
                    <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.3em] text-olive-accent mb-6">
                        <Snowflake size={14} /> Promociones Invernales
                    </span>
                    <h2 className="font-serif text-5xl md:text-7xl text-forest leading-none mb-6">
                        Santuario de <span className="italic text-olive-light">Invierno</span>
                    </h2>
                    <p className="text-forest/60 max-w-lg text-sm leading-relaxed">
                        Abraza la temporada del silencio. Beneficios exclusivos diseñados para calentar tu alma durante los meses más fríos.
                    </p>
                </div>
            </div>

            <Marquee text="Temporada Invernal • Ofertas Limitadas • Escapa del Frío" />

            {/* CARRUSEL */}
            <div className="w-full overflow-x-auto hide-scrollbar pt-4 pb-16 px-6">
                <div className="flex justify-center gap-8 w-max mx-auto min-w-full md:min-w-0">

                    {offers.map((offer) => (
                        <motion.div
                            key={offer.id}
                            whileHover={{ y: -15 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            className="relative w-[320px] md:w-[400px] aspect-[3/4] group cursor-pointer"
                        >
                            <div className="w-full h-full rounded-[2rem] overflow-hidden shadow-xl shadow-forest/5 relative">
                                <img
                                    src={offer.img}
                                    alt={offer.title}
                                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 filter brightness-[0.9]"
                                />

                                <div className="absolute inset-0 bg-gradient-to-t from-[#0f2f18] via-[#0f2f18]/50 to-[#0f2f18]/20 mix-blend-multiply opacity-90"></div>
                                <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-[#0f2f18] to-transparent opacity-80"></div>

                                <div className="absolute inset-0 p-8 flex flex-col justify-between items-center text-center text-cream">

                                    <div className="opacity-0 group-hover:opacity-100 transform -translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">
                                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] bg-white text-forest px-3 py-1 rounded-full">
                                            {offer.title}
                                        </span>
                                    </div>

                                    <div className="flex flex-col items-center w-full z-10">
                                        <h3 className="font-serif text-4xl md:text-5xl mb-4 leading-none italic text-[#F2F0E9]">
                                            {offer.subtitle}
                                        </h3>
                                        <div className="w-8 h-px bg-cream/50 mx-auto mb-4"></div>
                                        <p className="text-sm font-light text-cream/90 leading-relaxed mb-6 line-clamp-3">
                                            {offer.desc}
                                        </p>

                                        <div className="flex items-center gap-3 bg-[#F2F0E9] text-[#1C1C1C] px-5 py-3 rounded-lg mb-6 shadow-lg transform group-hover:scale-105 transition-transform duration-300">
                                            <Tag size={14} />
                                            <span className="text-xs font-bold tracking-widest uppercase">
                                                Código: {offer.code}
                                            </span>
                                        </div>
                                    </div>

                                    <button className="text-xs font-bold uppercase tracking-[0.2em] flex items-center gap-2 group-hover:gap-4 transition-all hover:text-olive-accent text-cream/80">
                                        Reservar Oferta <ArrowRight size={14} />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}

                    {/* Tarjeta Club */}
                    <motion.div
                        whileHover={{ y: -15 }}
                        className="relative w-[320px] md:w-[400px] aspect-[3/4] rounded-[2rem] bg-[#2C342C] text-cream flex flex-col items-center justify-center p-10 text-center border border-forest/5 shadow-xl"
                    >
                        <div className="mb-6 p-4 rounded-full border border-cream/20 text-olive-accent">
                            <Star size={32} />
                        </div>
                        <h3 className="font-serif text-4xl mb-4">Alyvia Club</h3>
                        <p className="text-cream/60 text-sm mb-8 leading-relaxed">
                            Únete a nuestra comunidad y recibe acceso anticipado a las ofertas de invierno.
                        </p>
                        <button className="bg-cream text-forest px-8 py-4 rounded-full font-bold uppercase text-xs tracking-widest hover:bg-olive-accent hover:text-white transition-colors shadow-lg">
                            Unirme Ahora
                        </button>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default Promotions;