import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Clock } from 'lucide-react';

const restaurants = [
    {
        id: 1,
        name: "Terra",
        cuisine: "De la Granja a la Mesa",
        chef: "Elena Arzak",
        desc: "Celebrando los ingredientes locales. Cocina de autor en un entorno orgánico y sostenible, conectado directamente con nuestros huertos privados.",
        open: "Cena: 7pm - 11pm",
        img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070&auto=format&fit=crop"
    },
    {
        id: 2,
        name: "Azure Coast",
        cuisine: "Mariscos Mediterráneos",
        chef: "Marco Pierre",
        desc: "Pescado fresco del día y mariscos a la parrilla frente al mar. Un ambiente relajado, vibrante y bañado por el sol mediterráneo.",
        open: "Almuerzo y Cena",
        img: "https://images.unsplash.com/photo-1544148103-0773bf10d330?q=80&w=2070&auto=format&fit=crop"
    },
    {
        id: 3,
        name: "The Library Bar",
        cuisine: "Coctelería de Autor",
        chef: "David Roth",
        desc: "Un espacio íntimo para conversaciones nocturnas. Coctelería clásica reinventada y una selección de licores raros junto a la chimenea.",
        open: "Noche: 8pm - 2am",
        img: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2070&auto=format&fit=crop"
    },
    {
        id: 4,
        name: "Sakura Pavilion",
        cuisine: "Japonés Omakase",
        chef: "Kenjiro Sato",
        desc: "Una experiencia silenciosa y precisa. Sushi tradicional preparado al momento en nuestra barra exclusiva de ciprés hinoki para solo 8 comensales.",
        open: "Cena: 8pm (Un Turno)",
        img: "https://images.unsplash.com/photo-1579027989536-b7b1f875659b?q=80&w=2070&auto=format&fit=crop"
    },
    {
        id: 5,
        name: "Fuego & Brasa",
        cuisine: "Parrilla a Fuego Abierto",
        chef: "Estilo Francis Mallmann",
        desc: "Cocina primitiva a fuego abierto bajo las estrellas. Cortes de carne premium y vegetales asados lentamente en nuestro patio exterior.",
        open: "Cena: 7:30pm - 11:30pm",
        img: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1974&auto=format&fit=crop"
    }
];

const RestaurantItem = ({ data, index }) => {
    const ref = useRef(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
    const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
    const isEven = index % 2 === 0;

    return (
        <div ref={ref} className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 lg:gap-24 mb-32 lg:mb-48 last:mb-0`}>

            {/* CONTENEDOR DE IMAGEN */}
            <div className="w-full lg:w-3/5 h-[500px] md:h-[650px] relative overflow-hidden rounded-[2.5rem] shadow-2xl">
                <motion.div style={{ y, scale }} className="w-full h-[120%] relative -top-[10%]">
                    <img
                        src={data.img}
                        alt={data.name}
                        className="w-full h-full object-cover filter brightness-90 transition-all duration-700"
                    />
                </motion.div>

                <div className="absolute top-8 left-8 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full">
                    <span className="text-white text-xs font-bold tracking-widest uppercase">{data.cuisine}</span>
                </div>
            </div>

            {/* CONTENIDO TEXTO */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20%" }}
                transition={{ duration: 0.8 }}
                className="w-full lg:w-2/5 px-4 lg:px-0"
            >
                <div className="flex items-center gap-3 mb-6 text-olive-accent">
                    <span className="h-px w-8 bg-olive-accent/50"></span>
                    <span className="text-xs font-bold uppercase tracking-[0.2em]">{data.chef}</span>
                </div>

                <h3 className="font-serif text-5xl md:text-7xl text-cream mb-8 leading-[1.1]">
                    {data.name}
                </h3>

                <p className="text-cream/70 text-lg leading-relaxed mb-10 font-light">
                    {data.desc}
                </p>

                <div className="flex flex-col sm:flex-row gap-8 sm:items-center border-t border-white/10 pt-8">
                    <div className="flex items-center gap-3 text-cream/60">
                        <Clock size={18} />
                        <span className="text-sm font-medium tracking-wide">{data.open}</span>
                    </div>

                    <button className="group flex items-center gap-2 text-cream font-bold uppercase text-xs tracking-[0.2em] hover:text-olive-accent transition-colors">
                        Reservar Mesa
                        <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform duration-300" />
                    </button>
                </div>

            </motion.div>
        </div>
    );
};

const Restaurants = () => {
    return (
        <section className="bg-[#141814] py-32 lg:py-40 px-6 relative overflow-hidden">

            <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/noise-lines.png')] pointer-events-none"></div>

            <div className="max-w-[1400px] mx-auto relative z-10">

                <div className="text-center mb-32">
                    <span className="text-xs font-bold tracking-[0.3em] uppercase text-cream/40 block mb-4">
                        Colección Culinaria
                    </span>
                    <h2 className="font-serif text-5xl md:text-7xl text-cream">
                        Sabor y <span className="italic text-olive-accent">Excelencia</span>
                    </h2>
                </div>

                <div className="flex flex-col">
                    {restaurants.map((item, index) => (
                        <RestaurantItem key={item.id} data={item} index={index} />
                    ))}
                </div>

            </div>
        </section>
    );
};

export default Restaurants;