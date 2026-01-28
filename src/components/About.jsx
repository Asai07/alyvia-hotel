import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const img1 = "/imagenes-hotel/vista-pool.webp";
const img2 = "/imagenes-hotel/vista-mar.webp";

const About = () => {
    const navigate = useNavigate();
    return (
        <section id="nosotros" className="bg-cream py-32 relative overflow-hidden">
            {/* Elemento Decorativo SVG */}
            <div className="absolute top-20 left-10 md:left-1/4 opacity-10 pointer-events-none">
                <svg width="300" height="300" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <path fill="#5A6C57" d="M45.7,-76.3C58.9,-69.3,69.1,-58.3,77.3,-46.3C85.5,-34.3,91.7,-21.3,90.3,-8.8C88.9,3.7,79.9,15.7,70.8,26.4C61.7,37.1,52.5,46.5,42.2,53.2C31.9,59.9,20.5,63.9,8.7,65.3C-3.1,66.7,-15.3,65.5,-26.1,60.6C-36.9,55.7,-46.3,47.1,-55.1,37.3C-63.9,27.5,-72.1,16.5,-73.9,4.7C-75.7,-7.1,-71.1,-19.7,-63.3,-30.3C-55.5,-40.9,-44.5,-49.5,-32.8,-57.2C-21.1,-64.9,-8.7,-71.7,2.8,-76.1C14.3,-80.5,28.6,-82.5,45.7,-76.3Z" transform="translate(100 100) scale(1.1)" />
                </svg>
            </div>

            <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                {/* COLUMNA IZQUIERDA: Texto y Narrativa */}
                <div className="relative z-10">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-sm font-bold tracking-[0.2em] text-gray-500 uppercase mb-4 block"
                    >
                        Nuestra Filosofía
                    </motion.span>

                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="font-serif text-5xl md:text-6xl text-gray-900 leading-[1.1] mb-8"
                    >
                        Entre horizontes <br />
                        <span className="italic text-gray-600">infinitos</span>, <br />
                        explora con libertad.
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="text-gray-600 text-lg leading-relaxed mb-10 max-w-md"
                    >
                        Alyvia no es solo un lugar para alojarse; es un santuario tallado por la naturaleza.
                        Creemos en el lujo del silencio, la belleza de los materiales auténticos y el arte de no hacer absolutamente nada.
                    </motion.p>

                    <motion.button
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        // 3. CAMBIAR LA ACCIÓN DEL BOTÓN
                        onClick={() => navigate('/about')}
                        className="group flex items-center gap-3 text-black font-semibold border-b border-black pb-1 hover:text-gray-600 hover:border-gray-600 transition-all"
                    >
                        Descubre Nuestra Historia
                        <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform duration-300" />
                    </motion.button>
                </div>

                {/* COLUMNA DERECHA: Composición de Imágenes */}
                <div className="relative h-[600px] w-full hidden md:block">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="absolute top-0 right-0 w-4/5 h-[450px] overflow-hidden rounded-[2rem]"
                    >
                        <img src={img1} alt="Pool" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 100 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="absolute bottom-10 left-0 w-3/5 h-[350px] overflow-hidden rounded-[2rem] border-8 border-cream shadow-2xl"
                    >
                        <img src={img2} alt="Nature" className="w-full h-full object-cover" />
                    </motion.div>
                </div>

                {/* Versión Móvil */}
                <div className="block md:hidden mt-8">
                    <div className="rounded-[2rem] overflow-hidden h-[400px] shadow-lg">
                        <img src={img1} alt="Resort" className="w-full h-full object-cover" />
                    </div>
                </div>

            </div>
        </section>
    );
};

export default About;