import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Sun, Snowflake, MapPin, Compass, ArrowRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const AboutPage = () => {
    const navigate = useNavigate();

    // Scroll al inicio al cargar
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Variantes de animación para texto (Fade Up sutil)
    const fadeUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
    };

    return (
        <div className="bg-[#F9F9F7] min-h-screen font-sans selection:bg-[#2C342C] selection:text-white">
            <div className="bg-white shadow-sm sticky top-0 z-40">
                <Navbar />
            </div>

            {/* --- SECCIÓN 1: MANIFIESTO (Texto limpio, sin imagen de fondo para máxima legibilidad) --- */}
            <section className="pt-24 pb-12 md:pt-32 md:pb-20 px-6 max-w-[1400px] mx-auto">
                <motion.div
                    initial="hidden" animate="visible" variants={fadeUp}
                    className="text-center max-w-4xl mx-auto"
                >
                    <span className="block text-xs font-bold tracking-[0.3em] uppercase mb-6 text-[#C5A880]">
                        Nuestra Historia
                    </span>
                    <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-[#2C342C] leading-[1.1] mb-8">
                        No construimos hoteles, <br className="hidden md:block" />
                        <span className="italic text-gray-400">coleccionamos</span> refugios.
                    </h1>
                    <p className="text-gray-500 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
                        Alyvia nació de una búsqueda personal: encontrar lugares donde el ruido del mundo se apaga y solo queda la naturaleza y el diseño honesto.
                    </p>
                </motion.div>
            </section>

            {/* --- SECCIÓN 2: IMAGEN CINEMÁTICA (Full width) --- */}
            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="w-full h-[50vh] md:h-[70vh] overflow-hidden"
            >
                <img
                    src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070&auto=format&fit=crop"
                    alt="Paisaje Alyvia"
                    className="w-full h-full object-cover parallax-img"
                />
            </motion.div>

            {/* --- SECCIÓN 3: EL ORIGEN (Layout Editorial: Texto Izq / Imagen Der) --- */}
            <section className="py-24 px-6 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

                    {/* Texto */}
                    <motion.div
                        initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                        className="order-2 md:order-1"
                    >
                        <div className="flex items-center gap-4 mb-6">
                            <span className="h-px w-12 bg-[#C5A880]"></span>
                            <span className="text-xs font-bold uppercase tracking-widest text-gray-400">1985 • El Comienzo</span>
                        </div>
                        <h2 className="font-serif text-4xl md:text-5xl text-[#2C342C] mb-6">
                            Alessandro & Livia
                        </h2>
                        <div className="space-y-6 text-gray-600 leading-relaxed text-lg">
                            <p>
                                No éramos hoteleros. Alessandro era arquitecto obsesionado con la luz; Livia, botánica enamorada de la tierra. Cansados del ritmo frenético de la ciudad, buscamos un lugar donde el tiempo se sintiera diferente.
                            </p>
                            <p>
                                Encontramos una cabaña olvidada frente al mar. La restauramos no para impresionar, sino para desaparecer. Cuando nuestros amigos nos visitaban, todos decían lo mismo: <strong>"Aquí, por fin, puedo respirar".</strong>
                            </p>
                            <p>
                                Ese sentimiento se convirtió en nuestra misión. Alyvia es la unión de nuestros nombres y nuestra promesa de crear espacios que sanan.
                            </p>
                        </div>
                    </motion.div>

                    {/* Imagen (Recta y Elegante) */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="order-1 md:order-2 h-[600px] bg-gray-100 rounded-[2rem] overflow-hidden shadow-xl"
                    >
                        <img
                            src="https://images.unsplash.com/photo-1510798831971-661eb04b3739?q=80&w=1974&auto=format&fit=crop"
                            alt="Los Fundadores o Cabaña Original"
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-[1.5s]"
                        />
                    </motion.div>
                </div>
            </section>

            {/* --- SECCIÓN 4: LA COLECCIÓN (Dark Mode para contraste) --- */}
            <section className="bg-[#1A211B] py-32 px-6 text-[#F2F0E9] overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-24">
                        <h2 className="font-serif text-4xl md:text-6xl mb-6">De la Arena a la Nieve</h2>
                        <p className="text-white/60 max-w-xl mx-auto text-lg">
                            Nuestra colección ha crecido, pero el criterio sigue siendo el mismo: ubicaciones remotas, diseño impecable y respeto absoluto por el entorno.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: <Sun size={24} />,
                                title: "Alyvia Costa",
                                desc: "Villas abiertas al mar, brisa salada y el ritmo eterno de las olas. Nuestro homenaje al verano eterno.",
                                loc: "Tulum & Amalfi"
                            },
                            {
                                icon: <Snowflake size={24} />,
                                title: "Alyvia Cumbre",
                                desc: "El silencio blanco. Refugios alpinos de madera y piedra donde el fuego es el centro de la conversación.",
                                loc: "Aspen & Patagonia"
                            },
                            {
                                icon: <Compass size={24} />,
                                title: "Alyvia Bosque",
                                desc: "Inmersión total. Cabañas suspendidas entre árboles centenarios, diseñadas para reconectar con la tierra.",
                                loc: "Kyoto & Valdivia"
                            }
                        ].map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.2 }}
                                className="bg-white/5 border border-white/10 p-10 rounded-[2rem] hover:bg-white/10 transition-colors group"
                            >
                                <div className="w-12 h-12 bg-[#C5A880] rounded-full flex items-center justify-center text-[#1A211B] mb-8 group-hover:scale-110 transition-transform">
                                    {item.icon}
                                </div>
                                <h3 className="font-serif text-2xl mb-4">{item.title}</h3>
                                <p className="text-white/60 text-sm leading-relaxed mb-8 min-h-[80px]">
                                    {item.desc}
                                </p>
                                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#C5A880]">
                                    <MapPin size={14} /> {item.loc}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- SECCIÓN 5: FILOSOFÍA FINAL (Sin firmas, puro texto emotivo) --- */}
            <section className="py-32 px-6 bg-white">
                <div className="max-w-4xl mx-auto text-center">

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="bg-[#F9F9F7] p-12 md:p-16 rounded-[3rem]"
                    >
                        <h2 className="font-serif text-3xl md:text-5xl text-[#2C342C] mb-8 leading-tight">
                            "El verdadero lujo moderno no es el exceso, sino la capacidad de estar presente."
                        </h2>

                        <div className="w-16 h-1 bg-[#C5A880] mx-auto mb-8"></div>

                        <p className="text-gray-500 text-lg leading-relaxed italic mb-10">
                            Te invitamos a ser parte de nuestra historia, a escribir tus propios recuerdos en nuestros refugios y a descubrir que, a veces, para encontrarse, hay que perderse un poco.
                        </p>

                        <button
                            onClick={() => navigate('/booking')}
                            className="inline-flex items-center gap-2 bg-[#2C342C] text-white px-10 py-4 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-[#1A211B] transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1"
                        >
                            Reserva tu Capítulo <ArrowRight size={16} />
                        </button>
                    </motion.div>

                </div>
            </section>

            <Footer />
        </div>
    );
};

export default AboutPage;