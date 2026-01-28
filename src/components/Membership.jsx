import React from 'react';
import { motion } from 'framer-motion';
import { Crown, Star, Shield, Check, ArrowRight, Infinity } from 'lucide-react';

const tiers = [
    {
        name: "Essence",
        price: "Gratis",
        desc: "El primer paso hacia el paraíso. Acceso a ofertas exclusivas.",
        icon: Star,
        features: ["Early Access a Promociones", "Wi-Fi Premium", "Bebida de Bienvenida"],
        color: "from-gray-800 to-gray-900",
        border: "border-gray-700",
        text: "text-gray-400",
        button: "Unirme Gratis"
    },
    {
        name: "Prestige",
        price: "$299/año",
        desc: "Para el viajero frecuente que busca confort sin límites.",
        icon: Crown,
        features: ["Upgrade de Habitación (Sujeto a Disp.)", "Late Check-out 2pm", "10% OFF en Restaurantes", "Desayuno Continental Incluido"],
        color: "from-[#2C342C] to-[#1A211B]",
        border: "border-[#C5A880]/50",
        text: "text-[#C5A880]",
        popular: true,
        button: "Solicitar Acceso"
    },
    {
        name: "Legacy",
        price: "Invite Only",
        desc: "El círculo interior. Acceso total, privacidad absoluta.",
        icon: Infinity,
        features: ["Mayordomo Privado 24/7", "Acceso a Villas Secretas", "Traslado en Helicóptero", "Eventos Privados con el Chef"],
        color: "from-black to-gray-900",
        border: "border-white/20",
        text: "text-white",
        button: "Contactar Concierge"
    }
];

const Membership = () => {
    return (
        <section id="membresia" className="bg-[#0F0F0F] py-32 px-6 relative overflow-hidden">

            {/* Fondo Abstracto Animado (GPU Optimizado) */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#C5A880]/10 rounded-full blur-[120px] will-change-transform"></div>
            </div>

            <div className="max-w-7xl mx-auto relative z-10">

                {/* Header */}
                <div className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[#C5A880] text-xs font-bold uppercase tracking-widest mb-6"
                    >
                        <Crown size={14} /> Alyvia Club
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="font-serif text-4xl md:text-6xl text-white mb-6"
                    >
                        No solo te alojes. <br /> <span className="italic text-white/40">Pertenece.</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-white/50 max-w-lg mx-auto text-lg leading-relaxed"
                    >
                        Desbloquea un mundo de privilegios diseñados para elevar tu experiencia. Desde mejoras garantizadas hasta experiencias que el dinero no puede comprar.
                    </motion.p>
                </div>

                {/* Grid de Tarjetas */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {tiers.map((tier, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ delay: index * 0.15, duration: 0.6 }}
                            whileHover={{ y: -10 }}
                            className={`relative rounded-[2rem] p-8 md:p-10 border ${tier.border} bg-gradient-to-b ${tier.color} flex flex-col group transition-all duration-500 hover:shadow-2xl hover:shadow-[#C5A880]/10`}
                        >
                            {/* Badge "Popular" */}
                            {tier.popular && (
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#C5A880] text-black text-[10px] font-bold uppercase tracking-widest px-4 py-1 rounded-full shadow-lg">
                                    Recomendado
                                </div>
                            )}

                            {/* Icono */}
                            <div className={`w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center ${tier.text} mb-8 group-hover:scale-110 transition-transform duration-500`}>
                                <tier.icon size={28} />
                            </div>

                            <h3 className={`font-serif text-3xl text-white mb-2`}>{tier.name}</h3>
                            <p className="text-white/40 text-sm mb-8 min-h-[40px]">{tier.desc}</p>

                            <div className="text-2xl font-bold text-white mb-8">
                                {tier.price}
                            </div>

                            {/* Lista de Features */}
                            <ul className="space-y-4 mb-10 flex-grow">
                                {tier.features.map((feat, i) => (
                                    <li key={i} className="flex items-start gap-3 text-sm text-white/70">
                                        <Check size={16} className={`mt-0.5 ${tier.text}`} />
                                        {feat}
                                    </li>
                                ))}
                            </ul>

                            <button className={`w-full py-4 rounded-xl font-bold uppercase text-xs tracking-[0.2em] border transition-all duration-300 flex items-center justify-center gap-2
                                ${tier.popular
                                    ? 'bg-[#C5A880] text-black border-[#C5A880] hover:bg-white hover:border-white'
                                    : 'bg-transparent text-white border-white/20 hover:bg-white hover:text-black'
                                }
                            `}>
                                {tier.button}
                            </button>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default Membership;