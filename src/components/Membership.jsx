import React from 'react';
import { motion } from 'framer-motion';
import { Crown, Star, Infinity, Check, ArrowRight } from 'lucide-react';

const tiers = [
    {
        name: "Essence",
        subtitle: "El inicio del viaje",
        price: "Gratis",
        period: "siempre",
        icon: Star,
        features: ["Wi-Fi de Alta Velocidad", "Acceso a Ofertas Flash", "Bebida de Bienvenida"],
        cta: "Unirme Gratis",
        gradient: "from-white/5 to-white/0", // Sutil
        highlight: false
    },
    {
        name: "Prestige",
        subtitle: "La elección del viajero",
        price: "$299",
        period: "/ año",
        icon: Crown,
        features: ["Upgrade de Suite (Sujeto a disp.)", "Late Check-out 14:00 hrs", "15% OFF en Gastronomía", "Desayuno Diario Incluido"],
        cta: "Solicitar Acceso",
        gradient: "from-[#C5A880]/20 to-[#C5A880]/5", // Dorado sutil
        highlight: true // Tarjeta destacada
    },
    {
        name: "Legacy",
        subtitle: "Solo por invitación",
        price: "Exclusive",
        period: "members",
        icon: Infinity,
        features: ["Mayordomo Privado 24/7", "Villas Secretas 'Off-Market'", "Traslados en Helicóptero", "Experiencias a Medida"],
        cta: "Contactar Concierge",
        gradient: "from-white/10 to-white/5",
        highlight: false
    }
];

const Membership = () => {
    return (
        <section id="membresia" className="bg-[#0A0A0A] py-32 px-6 relative overflow-hidden">

            {/* Fondo Ambiental Estático (Para evitar consumo de GPU) */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-[#C5A880] opacity-[0.03] blur-[120px] rounded-full pointer-events-none"></div>

            <div className="max-w-7xl mx-auto relative z-10">

                {/* HEADER */}
                <div className="text-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#C5A880]/30 bg-[#C5A880]/10 text-[#C5A880] text-[10px] font-bold uppercase tracking-[0.2em] mb-6"
                    >
                        <Crown size={12} /> Alyvia Club
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="font-serif text-4xl md:text-6xl text-white mb-6"
                    >
                        Pertenecer tiene sus <br /> <span className="italic text-white/50">Privilegios.</span>
                    </motion.h2>
                </div>

                {/* GRID DE TARJETAS */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-center">
                    {tiers.map((tier, index) => (
                        <Card key={index} tier={tier} index={index} />
                    ))}
                </div>

            </div>
        </section>
    );
};

// Componente Tarjeta Extraído para mejor rendimiento y limpieza
const Card = ({ tier, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            // CLAVE ANTI-PARPADEO: transform-gpu fuerza la aceleración de hardware
            className={`
                relative group flex flex-col p-8 md:p-10 rounded-[2rem] border transition-all duration-500 transform-gpu will-change-transform
                ${tier.highlight
                    ? 'bg-[#1A1A1A] border-[#C5A880]/40 shadow-2xl shadow-[#C5A880]/10 scale-100 lg:scale-110 z-10'
                    : 'bg-[#111] border-white/5 hover:border-white/10'
                }
            `}
        >
            {/* Gradiente de Fondo */}
            <div className={`absolute inset-0 rounded-[2rem] bg-gradient-to-b ${tier.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`}></div>

            {/* Badge Popular */}
            {tier.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#C5A880] text-[#0A0A0A] text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg z-20">
                    Más Solicitado
                </div>
            )}

            {/* Encabezado */}
            <div className="relative z-10 mb-8">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-6 text-white bg-white/5 border border-white/10 group-hover:scale-110 transition-transform duration-500`}>
                    <tier.icon size={20} />
                </div>
                <h3 className="font-serif text-3xl text-white mb-1">{tier.name}</h3>
                <p className="text-white/40 text-xs uppercase tracking-wider font-medium">{tier.subtitle}</p>
            </div>

            {/* Precio */}
            <div className="relative z-10 mb-8 pb-8 border-b border-white/5">
                <div className="flex items-baseline gap-1">
                    <span className={`text-4xl font-serif ${tier.highlight ? 'text-[#C5A880]' : 'text-white'}`}>
                        {tier.price}
                    </span>
                    <span className="text-white/40 text-sm">{tier.period}</span>
                </div>
            </div>

            {/* Lista de Beneficios */}
            <ul className="relative z-10 space-y-4 mb-10 flex-grow">
                {tier.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-white/70 group-hover:text-white transition-colors duration-300">
                        <div className={`mt-0.5 p-0.5 rounded-full ${tier.highlight ? 'bg-[#C5A880] text-black' : 'bg-white/20 text-white'}`}>
                            <Check size={10} strokeWidth={3} />
                        </div>
                        {feat}
                    </li>
                ))}
            </ul>

            {/* Botón CTA */}
            <button className={`
                relative z-10 w-full py-4 rounded-xl font-bold uppercase text-xs tracking-[0.2em] flex items-center justify-center gap-2 transition-all duration-300
                ${tier.highlight
                    ? 'bg-[#C5A880] text-[#0A0A0A] hover:bg-white'
                    : 'bg-transparent border border-white/20 text-white hover:bg-white hover:text-black hover:border-white'
                }
            `}>
                {tier.cta}
                <ArrowRight size={14} />
            </button>

        </motion.div>
    );
};

export default Membership;