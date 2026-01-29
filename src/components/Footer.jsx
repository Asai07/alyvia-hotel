import React from 'react';
import { Instagram, Facebook, Twitter, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLenis } from 'lenis/react';

const Footer = () => {
    const lenis = useLenis();

    const handleScroll = (id) => {
        if (lenis) {
            lenis.scrollTo(id, { offset: -50, duration: 1.5 });
        }
    };

    return (
        <footer className="bg-[#2C342C] text-cream pt-24 pb-12 px-6 border-t border-white/5 relative z-10">
            <div className="max-w-[1400px] mx-auto">

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">

                    {/* Columna 1: Marca */}
                    <div>
                        <Link to="/" onClick={() => lenis?.scrollTo(0)} className="inline-block">
                            <h2 className="font-serif text-4xl mb-8 hover:text-olive-accent transition-colors">Alyvia.</h2>
                        </Link>
                        <p className="text-white/40 text-sm leading-relaxed mb-8">
                            Un santuario para el alma, donde la naturaleza y el lujo convergen en perfecta armonía.
                        </p>
                        <div className="flex gap-6">
                            <a href="#" className="opacity-50 hover:opacity-100 hover:text-olive-accent transition-all"><Instagram size={20} /></a>
                            <a href="#" className="opacity-50 hover:opacity-100 hover:text-olive-accent transition-all"><Facebook size={20} /></a>
                            <a href="#" className="opacity-50 hover:opacity-100 hover:text-olive-accent transition-all"><Twitter size={20} /></a>
                        </div>
                    </div>

                    {/* Columna 2: Mapa del Sitio (Enlaces Reales) */}
                    <div>
                        <h4 className="font-bold uppercase tracking-widest text-xs mb-8 text-olive-accent">Descubre</h4>
                        <ul className="space-y-4 text-sm text-white/60">
                            <li>
                                <Link to="/about" className="hover:text-white transition-colors flex items-center gap-2 group">
                                    Nuestra Historia <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                </Link>
                            </li>
                            <li>
                                <Link to="/#habitaciones" onClick={() => handleScroll('#habitaciones')} className="hover:text-white transition-colors">
                                    Suites & Villas
                                </Link>
                            </li>
                            <li>
                                <Link to="/#servicios" onClick={() => handleScroll('#servicios')} className="hover:text-white transition-colors">
                                    Servicios Exclusivos
                                </Link>
                            </li>
                            <li>
                                <Link to="/#actividades" onClick={() => handleScroll('#actividades')} className="hover:text-white transition-colors">
                                    Experiencias
                                </Link>
                            </li>
                            <li>
                                <Link to="/#events" onClick={() => handleScroll('#events')} className="hover:text-white transition-colors">
                                    Eventos y Bodas
                                </Link>
                            </li>
                            <li>
                                <Link to="/#membresia" onClick={() => handleScroll('#membresia')} className="hover:text-white transition-colors">
                                    Membresía
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Columna 3: Legal & Info */}
                    <div>
                        <h4 className="font-bold uppercase tracking-widest text-xs mb-8 text-olive-accent">Legal</h4>
                        <ul className="space-y-4 text-sm text-white/60">
                            <li><Link to="/privacy" className="hover:text-white transition-colors">Política de Privacidad</Link></li>
                            <li><Link to="/terms" className="hover:text-white transition-colors">Términos y Condiciones</Link></li>
                            <li><Link to="/cancellation" className="hover:text-white transition-colors">Política de Cancelación</Link></li>
                            <li><Link to="/faq" className="hover:text-white transition-colors">Preguntas Frecuentes</Link></li>
                            <li>
                                <button onClick={() => handleScroll('#contacto')} className="hover:text-white transition-colors text-left">
                                    Contacto
                                </button>
                            </li>
                        </ul>
                    </div>

                    {/* Columna 4: Newsletter */}
                    <div>
                        <h4 className="font-bold uppercase tracking-widest text-xs mb-8 text-olive-accent">Mantente al día</h4>
                        <p className="text-white/40 text-xs mb-6">
                            Recibe invitaciones a eventos privados y ofertas de temporada antes que nadie.
                        </p>
                        <div className="flex border-b border-white/20 pb-2 focus-within:border-olive-accent transition-colors">
                            <input
                                type="email"
                                placeholder="Correo Electrónico"
                                className="bg-transparent w-full outline-none text-white placeholder:text-white/20 text-sm"
                            />
                            <button className="text-xs font-bold uppercase text-white/60 hover:text-olive-accent transition-colors">
                                Suscribirme
                            </button>
                        </div>
                    </div>

                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-widest text-white/30">
                    <span>© 2026 Alyvia Hotels & Resorts. Todos los derechos reservados.</span>

                    {/* CRÉDITO DEL DESARROLLADOR */}
                    <span className="flex items-center gap-1">
                        Diseñado por
                        <a
                            href="https://somosmada.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white hover:text-olive-accent transition-colors border-b border-white/10 hover:border-olive-accent pb-0.5"
                        >
                            somosmada.com
                        </a>
                    </span>
                </div>

            </div>
        </footer>
    );
};

export default Footer;