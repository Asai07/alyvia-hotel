import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Camera, Heart, GlassWater, Crown, ArrowUpRight, Users, Music, Sun } from 'lucide-react';

const events = [
    {
        id: "01",
        title: "Uniones Eternas",
        category: "Bodas y Capilla",
        icon: Heart,
        desc: "Desde nuestra capilla de cristal en el acantilado hasta recepciones bajo las estrellas. Diseñamos bodas que trascienden el tiempo.",
        longDesc: "Imagina decir 'Sí, acepto' suspendido entre el cielo y el mar. Nuestra capilla de cristal ofrece una vista panorámica ininterrumpida del océano, creando un telón de fondo etéreo para tu ceremonia. Nos encargamos de cada detalle, desde el diseño floral hasta la coordinación del día, para que tú solo te preocupes de vivir el momento.",
        features: [
            { title: "Capacidad", desc: "Hasta 200 invitados", icon: <Users size={18} /> },
            { title: "Locaciones", desc: "Capilla, Playa o Jardín", icon: <Sun size={18} /> },
            { title: "Banquete", desc: "Menú de autor por Chef Pierre", icon: <GlassWater size={18} /> },
            { title: "Coordinación", desc: "Wedding Planner dedicada", icon: <Heart size={18} /> }
        ],
        img: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop"
    },
    {
        id: "02",
        title: "La Propuesta",
        category: "Momentos Románticos",
        icon: GlassWater,
        desc: "El 'Sí' más importante. Organizamos cenas privadas en la playa, decoración floral oculta y música de violín en vivo.",
        longDesc: "Diseñamos la atmósfera perfecta para la pregunta más importante de tu vida. Ya sea una cena privada en una cueva iluminada por velas, o un picnic de lujo en una playa virgen al atardecer. Nuestro equipo de 'Cómplices' te ayudará a planear la sorpresa perfecta sin levantar sospechas.",
        features: [
            { title: "Privacidad", desc: "Zonas exclusivas reservadas", icon: <Crown size={18} /> },
            { title: "Música", desc: "Violinista o Trío en vivo", icon: <Music size={18} /> },
            { title: "Fotografía", desc: "Fotógrafo oculto incluido", icon: <Camera size={18} /> },
            { title: "Decoración", desc: "Floral y pirotecnia fría", icon: <Heart size={18} /> }
        ],
        img: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=2070&auto=format&fit=crop"
    },
    {
        id: "03",
        title: "Legado Visual",
        category: "Estudio Fotográfico",
        icon: Camera,
        desc: "No dejes que el momento se desvanezca. Nuestro equipo in-house de fotógrafos editoriales captura tu historia con estética de cine.",
        longDesc: "No dejes que tus recuerdos se desvanezcan. Aprovecha la arquitectura impresionante de Alyvia y la luz dorada de nuestros atardeceres. Sesiones editoriales para parejas, familias o maternidad, dirigidas por fotógrafos de moda y estilo de vida.",
        features: [
            { title: "Entrega", desc: "Galería digital en 48 hrs", icon: <ArrowUpRight size={18} /> },
            { title: "Drone", desc: "Tomas aéreas 4K incluidas", icon: <Camera size={18} /> },
            { title: "Estilismo", desc: "Asesoría de vestuario", icon: <Crown size={18} /> },
            { title: "Edición", desc: "Retoque estilo Fine Art", icon: <Sun size={18} /> }
        ],
        img: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=2000&auto=format&fit=crop"
    },
    {
        id: "04",
        title: "Grandes Salones",
        category: "Sedes y Galas",
        icon: Crown,
        desc: "Espacios versátiles de arquitectura impresionante para lanzamientos de marca, galas benéficas o celebraciones privadas.",
        longDesc: "La sofisticación se encuentra con la tecnología. Nuestros salones 'Grand Horizon' ofrecen techos de doble altura, acústica perfecta y ventanales de piso a techo. Ideales para conferencias corporativas de alto nivel, lanzamientos de productos o galas benéficas.",
        features: [
            { title: "Aforo", desc: "Hasta 500 personas", icon: <Users size={18} /> },
            { title: "Tecnología", desc: "Pantallas LED y Sonido Bose", icon: <Music size={18} /> },
            { title: "Catering", desc: "Coffee Break a Cena de Gala", icon: <GlassWater size={18} /> },
            { title: "Logística", desc: "Acceso independiente", icon: <ArrowUpRight size={18} /> }
        ],
        img: "https://images.unsplash.com/photo-1769374071909-c2a0595553ae?q=80&w=687&auto=format&fit=crop"
    }
];

const Events = () => {
    const [activeId, setActiveId] = useState("01");
    const navigate = useNavigate();

    return (
        <section className="bg-[#2C342C] py-12 md:py-24 px-4 md:px-12 w-full md:min-h-screen flex flex-col justify-center relative overflow-hidden">

            <div className="absolute inset-0 opacity-[0.15] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] mix-blend-overlay"></div>

            <div className="max-w-[1600px] mx-auto w-full relative z-10">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-10 md:mb-16 text-cream">
                    <div>
                        <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-olive-accent mb-3 block">
                            Celebraciones y Eventos
                        </span>
                        <h2 className="font-serif text-4xl md:text-5xl lg:text-7xl leading-none">
                            Momentos <span className="italic text-white/50">Inolvidables</span>
                        </h2>
                    </div>
                    <p className="hidden md:block text-white/60 max-w-sm text-sm leading-relaxed text-right">
                        Creamos el escenario para los capítulos más importantes de tu vida.
                        Ejecución impecable, diseño a medida.
                    </p>
                </div>

                {/* ACORDEÓN */}
                <div className="flex flex-col lg:flex-row gap-3 md:gap-4 h-auto lg:h-[600px]">
                    {events.map((event) => {
                        const isActive = activeId === event.id;

                        return (
                            <motion.div
                                key={event.id}
                                layout
                                onClick={() => setActiveId(event.id)}
                                className={`relative rounded-2xl md:rounded-[2rem] overflow-hidden cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]
                                    ${isActive
                                        ? 'h-[450px] lg:h-full lg:flex-[3]'
                                        : 'h-[80px] lg:h-full lg:flex-[1] opacity-60 hover:opacity-100 hover:lg:flex-[1.2]'
                                    }
                                `}
                            >
                                <motion.img
                                    layoutId={`img-${event.id}`}
                                    src={event.img}
                                    alt={event.title}
                                    className="absolute inset-0 w-full h-full object-cover filter brightness-[0.7]"
                                />

                                <div className={`absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/90 transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-60'}`}></div>

                                <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between">

                                    {/* Top */}
                                    <div className={`flex justify-between items-start transition-all duration-500 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-100 translate-y-0 lg:opacity-0 lg:-translate-y-4'}`}>
                                        <div className="bg-white/10 backdrop-blur-md p-2 md:p-3 rounded-full text-white border border-white/20 scale-90 md:scale-100 origin-top-left">
                                            <event.icon size={20} />
                                        </div>

                                        <span className="hidden lg:block text-[10px] font-bold uppercase tracking-[0.2em] text-white/80 rotate-180 lg:rotate-0 [writing-mode:vertical-lr] lg:[writing-mode:horizontal-tb]">
                                            {isActive ? "" : event.category}
                                        </span>
                                    </div>

                                    {/* Bottom */}
                                    <div className="relative overflow-hidden w-full">
                                        {!isActive && (
                                            <>
                                                <h3 className="hidden lg:block absolute bottom-0 left-0 text-3xl font-serif text-white origin-bottom-left -rotate-90 translate-x-8 w-[400px]">
                                                    {event.title}
                                                </h3>
                                                <div className="lg:hidden absolute bottom-0 left-0">
                                                    <h3 className="text-xl font-serif text-white/90">
                                                        {event.title}
                                                    </h3>
                                                </div>
                                            </>
                                        )}

                                        <AnimatePresence mode="popLayout">
                                            {isActive && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: 0.2, duration: 0.5 }}
                                                >
                                                    <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-olive-accent mb-2 block">
                                                        {event.category}
                                                    </span>
                                                    <h3 className="font-serif text-3xl md:text-4xl lg:text-6xl text-white mb-4 md:mb-6 leading-none">
                                                        {event.title}
                                                    </h3>
                                                    <p className="text-white/80 text-sm leading-relaxed max-w-md mb-6 md:mb-8 line-clamp-3 md:line-clamp-none">
                                                        {event.desc}
                                                    </p>

                                                    {/* BOTÓN CORREGIDO */}
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            // SOLUCIÓN: Limpiamos los iconos antes de enviar los datos
                                                            const eventToSend = {
                                                                ...event,
                                                                icon: null, // Quitamos el icono principal (Componente)
                                                                features: event.features.map(f => ({
                                                                    ...f,
                                                                    icon: null // Quitamos los iconos de las características
                                                                }))
                                                            };
                                                            navigate('/events/plan', { state: { event: eventToSend } });
                                                        }}
                                                        className="group flex items-center gap-3 text-white font-bold uppercase text-[10px] md:text-xs tracking-[0.2em] border-b border-white/30 pb-2 hover:border-white transition-all"
                                                    >
                                                        Ver Detalles
                                                        <ArrowUpRight size={16} className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                                                    </button>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
};

export default Events;