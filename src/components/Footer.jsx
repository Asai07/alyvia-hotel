import React from 'react';
import { Instagram, Facebook, Twitter } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-[#2C342C] text-cream pt-24 pb-12 px-6 border-t border-white/5">
            <div className="max-w-[1400px] mx-auto">

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">

                    {/* Columna 1: Brand */}
                    <div>
                        <h2 className="font-serif text-4xl mb-8">Alyvia.</h2>
                        <p className="text-white/40 text-sm leading-relaxed mb-8">
                            Un santuario para el alma, donde la naturaleza y el lujo convergen en perfecta armonía.
                        </p>
                        <div className="flex gap-6">
                            <a href="#" className="opacity-50 hover:opacity-100 hover:text-olive-accent transition-all"><Instagram size={20} /></a>
                            <a href="#" className="opacity-50 hover:opacity-100 hover:text-olive-accent transition-all"><Facebook size={20} /></a>
                            <a href="#" className="opacity-50 hover:opacity-100 hover:text-olive-accent transition-all"><Twitter size={20} /></a>
                        </div>
                    </div>

                    {/* Columna 2: Explore */}
                    <div>
                        <h4 className="font-bold uppercase tracking-widest text-xs mb-8 text-olive-accent">Explorar</h4>
                        <ul className="space-y-4 text-sm text-white/60">
                            <li><a href="#" className="hover:text-white transition-colors">Alojamiento</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Gastronomía y Bares</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Spa y Bienestar</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Experiencias</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Eventos</a></li>
                        </ul>
                    </div>

                    {/* Columna 3: Legal */}
                    <div>
                        <h4 className="font-bold uppercase tracking-widest text-xs mb-8 text-olive-accent">Info</h4>
                        <ul className="space-y-4 text-sm text-white/60">
                            <li><a href="#" className="hover:text-white transition-colors">Nosotros</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Talento y Carreras</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Prensa</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Política de Privacidad</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Términos de Servicio</a></li>
                        </ul>
                    </div>

                    {/* Columna 4: Newsletter */}
                    <div>
                        <h4 className="font-bold uppercase tracking-widest text-xs mb-8 text-olive-accent">Newsletter</h4>
                        <p className="text-white/40 text-xs mb-6">
                            Suscríbete para recibir ofertas de temporada e invitaciones exclusivas.
                        </p>
                        <div className="flex border-b border-white/20 pb-2">
                            <input
                                type="email"
                                placeholder="Correo Electrónico"
                                className="bg-transparent w-full outline-none text-white placeholder:text-white/20 text-sm"
                            />
                            <button className="text-xs font-bold uppercase text-white/60 hover:text-white transition-colors">
                                Unirme
                            </button>
                        </div>
                    </div>

                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-widest text-white/30">
                    <span>© 2026 Alyvia Hotels & Resorts. Todos los derechos reservados.</span>
                    <span>Diseñado con intención.</span>
                </div>

            </div>
        </footer>
    );
};

export default Footer;