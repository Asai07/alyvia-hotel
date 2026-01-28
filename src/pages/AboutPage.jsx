import React, { useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, Compass, Sun, Snowflake, MapPin } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const AboutPage = () => {
    const navigate = useNavigate();
    const { scrollYProgress } = useScroll();
    const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

    // Scroll al inicio al cargar
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="bg-[#F9F9F7] min-h-screen font-sans selection:bg-[#2C342C] selection:text-white">
            <Navbar />

            {/* --- HERO SECTION: EL LEGADO --- */}
            <header className="relative h-[80vh] overflow-hidden flex items-center justify-center">
                <motion.div style={{ scale }} className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1534234828563-0253173e344d?q=80&w=2070&auto=format&fit=crop"
                        alt="Alyvia Origins"
                        className="w-full h-full object-cover filter brightness-50 sepia-[0.2]"
                    />
                </motion.div>

                <div className="relative z-10 text-center px-6 max-w-4xl mx-auto text-[#F2F0E9]">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                        className="block text-xs font-bold tracking-[0.3em] uppercase mb-6 text-[#C5A880]"
                    >
                        Nuestra Historia
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}
                        className="font-serif text-5xl md:text-7xl lg:text-8xl leading-none mb-8"
                    >
                        No construimos hoteles, <br /> <span className="italic text-[#C5A880]">coleccionamos</span> refugios.
                    </motion.h1>
                </div>
            </header>

            {/* --- CAPÍTULO 1: EL ORIGEN (1985) --- */}
            <section className="py-24 md:py-32 px-6">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <div className="aspect-[4/5] rounded-[2rem] overflow-hidden rotate-[-2deg] border-8 border-white shadow-2xl">
                            <img src="https://images.unsplash.com/photo-1548962077-2244249be449?q=80&w=1974&auto=format&fit=crop" alt="Old Cabin" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" />
                        </div>
                        <div className="absolute -bottom-10 -right-10 bg-[#F2F0E9] p-6 rounded-xl shadow-lg border border-[#2C342C]/10 max-w-xs rotate-[2deg]">
                            <p className="font-serif text-xl italic text-[#2C342C]">"Todo comenzó con una pequeña cabaña y el deseo de escuchar el silencio."</p>
                            <p className="text-xs font-bold uppercase tracking-widest text-[#C5A880] mt-4 text-right">— Alessandro & Livia, 1985</p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}
                        className="space-y-8"
                    >
                        <h2 className="font-serif text-4xl md:text-5xl text-[#2C342C]">El nacimiento de <span className="italic text-[#C5A880]">Alyvia</span></h2>
                        <p className="text-gray-600 text-lg leading-relaxed">
                            No éramos hoteleros. Alessandro era arquitecto; Livia, botánica. Cansados del ruido de la ciudad, buscamos un lugar donde el mundo dejara de girar tan rápido.
                        </p>
                        <p className="text-gray-600 text-lg leading-relaxed">
                            Encontramos una costa olvidada. Allí, construimos nuestra primera casa, no para impresionar, sino para desaparecer. Amigos venían a visitarnos y decían lo mismo: <strong>"Aquí, vuelvo a respirar"</strong>.
                        </p>
                        <p className="text-gray-600 text-lg leading-relaxed">
                            Alyvia es la unión de nuestros nombres y nuestra promesa: crear santuarios donde la arquitectura abrace a la naturaleza, no la invada.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* --- CAPÍTULO 2: DE LA ARENA A LA NIEVE --- */}
            <section className="bg-[#2C342C] py-32 px-6 text-[#F2F0E9] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#C5A880] rounded-full blur-[150px] opacity-20 pointer-events-none"></div>

                <div className="max-w-7xl mx-auto text-center mb-20">
                    <span className="text-xs font-bold tracking-[0.3em] uppercase text-[#C5A880] mb-4 block">Nuestra Expansión</span>
                    <h2 className="font-serif text-4xl md:text-6xl">Un solo alma, <br /> <span className="italic opacity-70">múltiples horizontes</span>.</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {/* Card 1: Playa */}
                    <motion.div
                        whileHover={{ y: -10 }}
                        className="bg-white/5 border border-white/10 p-8 rounded-[2rem] hover:bg-white/10 transition-colors"
                    >
                        <div className="w-12 h-12 bg-[#C5A880] rounded-full flex items-center justify-center text-[#2C342C] mb-6">
                            <Sun size={24} />
                        </div>
                        <h3 className="font-serif text-2xl mb-4">Alyvia Costa</h3>
                        <p className="text-white/60 text-sm leading-relaxed mb-6">
                            Donde todo comenzó. Villas abiertas al mar, brisa salada y el ritmo eterno de las olas. Nuestro homenaje al verano eterno.
                        </p>
                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#C5A880]">
                            <MapPin size={12} /> Tulum & Costa Amalfitana
                        </div>
                    </motion.div>

                    {/* Card 2: Montaña */}
                    <motion.div
                        whileHover={{ y: -10 }}
                        className="bg-white/5 border border-white/10 p-8 rounded-[2rem] hover:bg-white/10 transition-colors"
                    >
                        <div className="w-12 h-12 bg-[#F2F0E9] rounded-full flex items-center justify-center text-[#2C342C] mb-6">
                            <Snowflake size={24} />
                        </div>
                        <h3 className="font-serif text-2xl mb-4">Alyvia Cumbre</h3>
                        <p className="text-white/60 text-sm leading-relaxed mb-6">
                            El silencio blanco. Refugios alpinos de madera y piedra donde el fuego de la chimenea es el centro de la conversación.
                        </p>
                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#F2F0E9]">
                            <MapPin size={12} /> Aspen & Patagonia
                        </div>
                    </motion.div>

                    {/* Card 3: Bosque */}
                    <motion.div
                        whileHover={{ y: -10 }}
                        className="bg-white/5 border border-white/10 p-8 rounded-[2rem] hover:bg-white/10 transition-colors"
                    >
                        <div className="w-12 h-12 bg-[#4A5D4F] rounded-full flex items-center justify-center text-[#F2F0E9] mb-6">
                            <Compass size={24} />
                        </div>
                        <h3 className="font-serif text-2xl mb-4">Alyvia Bosque</h3>
                        <p className="text-white/60 text-sm leading-relaxed mb-6">
                            Inmersión total. Cabañas suspendidas entre árboles centenarios, diseñadas para reconectar con la tierra y el origen.
                        </p>
                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#4A5D4F]">
                            <MapPin size={12} /> Kyoto & Selva Valdiviana
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* --- CARTA DE LA FAMILIA --- */}
            <section className="py-24 md:py-32 px-6 bg-white relative">
                <div className="max-w-3xl mx-auto text-center">
                    <Heart className="mx-auto text-[#C5A880] mb-8" size={40} />

                    <h2 className="font-serif text-3xl md:text-5xl text-[#2C342C] mb-10 leading-tight">
                        "Creemos que el lujo moderno no es el exceso, sino la capacidad de estar presente."
                    </h2>

                    <div className="prose prose-lg mx-auto text-gray-500 italic">
                        <p>
                            Hoy, Alyvia sigue siendo una empresa familiar. Aunque hemos crecido, cada nueva ubicación se elige con el mismo criterio que usamos en 1985: ¿Podemos sentir paz aquí?
                        </p>
                        <p>
                            Te invitamos a ser parte de nuestra historia, a escribir tus propios recuerdos en nuestros refugios y a descubrir que, a veces, para encontrarse, hay que perderse un poco.
                        </p>
                    </div>

                    <div className="mt-12 pt-12 border-t border-gray-100">
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/e/e4/Signature_sample.svg"
                            alt="Firmas"
                            className="h-16 mx-auto opacity-40 mb-4"
                        />
                        <p className="text-xs font-bold uppercase tracking-widest text-[#2C342C]">Familia Alyvia</p>
                    </div>

                    <div className="mt-16">
                        <button
                            onClick={() => navigate('/booking')}
                            className="bg-[#2C342C] text-white px-10 py-4 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-[#1A211B] transition-all shadow-xl hover:shadow-2xl"
                        >
                            Reserva tu Capítulo
                        </button>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default AboutPage;