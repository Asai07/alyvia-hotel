import React from 'react';
import { motion } from 'framer-motion';
import { Crown, Star, Infinity, Check, ArrowRight, Mail } from 'lucide-react';
import { useBooking } from '../context/BookingContext';

const Membership = () => {
    const { openBooking } = useBooking();

    const handleAction = (tier) => {
        if (tier.actionType === 'booking') {
            openBooking();
        } else if (tier.actionType === 'email') {
            window.location.href = `mailto:concierge@alyvia.com?subject=Solicitud de Membresía ${tier.name}&body=Hola, estoy interesado en unirme al nivel ${tier.name}.`;
        }
    };

    const tiers = [
        {
            name: "Essence",
            subtitle: "El inicio del viaje",
            price: "Gratis",
            period: "siempre",
            icon: Star,
            features: ["Wi-Fi de Alta Velocidad", "Acceso a Ofertas Flash", "Bebida de Bienvenida"],
            cta: "Reservar y Unirme",
            actionType: "booking",
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
            actionType: "email",
            highlight: true // Tarjeta oscura (Forest Green)
        },
        {
            name: "Legacy",
            subtitle: "Solo por invitación",
            price: "Exclusive",
            period: "members",
            icon: Infinity,
            features: ["Mayordomo Privado 24/7", "Villas Secretas 'Off-Market'", "Traslados en Helicóptero", "Experiencias a Medida"],
            cta: "Contactar Concierge",
            actionType: "email",
            highlight: false
        }
    ];

    return (
        <section id="membresia" className="bg-[#F9F9F7] py-32 px-6 relative overflow-hidden">

            {/* Fondo Sutil */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-30">
                <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-[#C5A880]/10 rounded-full blur-[100px]"></div>
                <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-[#2C342C]/5 rounded-full blur-[100px]"></div>
            </div>

            <div className="max-w-7xl mx-auto relative z-10">

                {/* Header */}
                <div className="text-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#2C342C]/10 bg-white text-[#2C342C] text-[10px] font-bold uppercase tracking-[0.2em] mb-6 shadow-sm"
                    >
                        <Crown size={12} className="text-[#C5A880]" /> Alyvia Club
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="font-serif text-4xl md:text-6xl text-[#2C342C] mb-6"
                    >
                        Pertenecer tiene sus <br /> <span className="italic text-[#C5A880]">Privilegios.</span>
                    </motion.h2>
                </div>

                {/* Grid de Tarjetas */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-center">
                    {tiers.map((tier, index) => (
                        <Card
                            key={index}
                            tier={tier}
                            index={index}
                            onAction={() => handleAction(tier)}
                        />
                    ))}
                </div>

            </div>
        </section>
    );
};

// Componente Tarjeta Optimizado (CSS Transitions > JS Animations para evitar lag)
const Card = ({ tier, index, onAction }) => {
    const isHighlight = tier.highlight;

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "50px" }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            // CLAVE: Usamos clases CSS estándar para el hover, no motion values. Esto elimina el parpadeo.
            className={`
                relative flex flex-col p-8 md:p-10 rounded-[2.5rem] transition-all duration-300 ease-out
                ${isHighlight
                    ? 'bg-[#2C342C] text-[#F2F0E9] shadow-2xl shadow-[#2C342C]/20 scale-100 lg:scale-105 z-10 border border-[#2C342C] hover:shadow-3xl hover:-translate-y-1'
                    : 'bg-white text-[#2C342C] border border-[#2C342C]/5 hover:border-[#C5A880]/30 hover:shadow-xl hover:shadow-[#C5A880]/5 hover:-translate-y-1'
                }
            `}
        >
            {/* Badge */}
            {isHighlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#C5A880] text-[#2C342C] text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg z-20">
                    Más Solicitado
                </div>
            )}

            {/* Icono */}
            <div className="mb-8">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110
                    ${isHighlight ? 'bg-white/10 text-[#C5A880]' : 'bg-[#F9F9F7] text-[#2C342C]'}
                `}>
                    <tier.icon size={24} />
                </div>
                <h3 className="font-serif text-3xl mb-1">{tier.name}</h3>
                <p className={`text-xs uppercase tracking-wider font-bold ${isHighlight ? 'text-white/40' : 'text-gray-400'}`}>
                    {tier.subtitle}
                </p>
            </div>

            {/* Precio */}
            <div className={`mb-8 pb-8 border-b ${isHighlight ? 'border-white/10' : 'border-gray-100'}`}>
                <div className="flex items-baseline gap-1">
                    <span className={`text-4xl font-serif ${isHighlight ? 'text-[#C5A880]' : 'text-[#2C342C]'}`}>
                        {tier.price}
                    </span>
                    <span className={`text-sm ${isHighlight ? 'text-white/40' : 'text-gray-400'}`}>
                        {tier.period}
                    </span>
                </div>
            </div>

            {/* Lista */}
            <ul className="space-y-4 mb-10 flex-grow">
                {tier.features.map((feat, i) => (
                    <li key={i} className={`flex items-start gap-3 text-sm ${isHighlight ? 'text-white/80' : 'text-gray-600'}`}>
                        <div className={`mt-0.5 rounded-full p-0.5 shrink-0
                            ${isHighlight ? 'bg-[#C5A880] text-[#2C342C]' : 'bg-[#2C342C]/10 text-[#2C342C]'}
                        `}>
                            <Check size={10} strokeWidth={3} />
                        </div>
                        {feat}
                    </li>
                ))}
            </ul>

            {/* Botón */}
            <button
                onClick={onAction}
                className={`
                    w-full py-4 rounded-xl font-bold uppercase text-xs tracking-[0.2em] flex items-center justify-center gap-2 transition-all duration-300
                    ${isHighlight
                        ? 'bg-[#C5A880] text-[#2C342C] hover:bg-white hover:text-[#2C342C]'
                        : 'bg-[#2C342C] text-white hover:bg-[#C5A880] hover:text-[#2C342C]'
                    }
                `}
            >
                {tier.cta}
                {isHighlight ? <ArrowRight size={14} /> : <Mail size={14} />}
            </button>

        </motion.div>
    );
};

export default Membership;