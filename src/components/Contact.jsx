import React from 'react';
import { ArrowRight, MapPin, Phone, Mail } from 'lucide-react';

const Contact = () => {
    return (
        <section id="contacto" className="flex flex-col lg:flex-row min-h-screen">

            {/* COLUMNA IZQUIERDA */}
            <div className="w-full lg:w-1/2 bg-[#2C342C] text-cream px-8 py-20 md:p-24 flex flex-col justify-center relative overflow-hidden">

                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none"></div>

                <div className="relative z-10 max-w-xl mx-auto lg:mx-0">
                    <span className="text-xs font-bold uppercase tracking-[0.3em] text-olive-accent mb-6 block">
                        Contáctanos
                    </span>
                    <h2 className="font-serif text-5xl md:text-7xl mb-6">
                        Iniciemos una <br /><span className="italic text-white/50">Conversación</span>
                    </h2>
                    <p className="text-white/60 mb-12 leading-relaxed">
                        Ya sea para planear tu estancia, un evento especial o simplemente resolver una duda, nuestro equipo de concierge está a tu disposición.
                    </p>

                    {/* Formulario */}
                    <form className="space-y-8 mb-16">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="relative">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-olive-accent mb-2 block">Nombre</label>
                                <input
                                    type="text"
                                    className="w-full bg-transparent border-b border-white/20 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-olive-accent transition-colors"
                                />
                            </div>
                            <div className="relative">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-olive-accent mb-2 block">Correo</label>
                                <input
                                    type="email"
                                    className="w-full bg-transparent border-b border-white/20 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-olive-accent transition-colors"
                                />
                            </div>
                        </div>

                        <div className="relative">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-olive-accent mb-2 block">Mensaje</label>
                            <textarea
                                rows="3"
                                className="w-full bg-transparent border-b border-white/20 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-olive-accent transition-colors resize-none"
                            ></textarea>
                        </div>

                        <button className="bg-cream text-[#2C342C] px-10 py-4 rounded-full font-bold uppercase text-xs tracking-[0.2em] hover:bg-olive-accent hover:text-white transition-colors flex items-center gap-4 shadow-lg">
                            Enviar Solicitud <ArrowRight size={16} />
                        </button>
                    </form>

                    {/* Datos de Contacto Rápidos */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-white/10 pt-8">
                        <div className="flex gap-4">
                            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                                <Phone size={18} className="text-olive-accent" />
                            </div>
                            <div>
                                <h4 className="font-bold uppercase text-xs tracking-wider mb-1">Teléfono</h4>
                                <p className="text-white/60 text-sm font-mono">+52 (624) 123 4567</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                                <Mail size={18} className="text-olive-accent" />
                            </div>
                            <div>
                                <h4 className="font-bold uppercase text-xs tracking-wider mb-1">Email</h4>
                                <p className="text-white/60 text-sm font-mono">concierge@alyvia.com</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* COLUMNA DERECHA: Mapa */}
            <div className="w-full lg:w-1/2 min-h-[500px] lg:min-h-full relative bg-gray-200">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3675.244368945828!2d-109.702166684488!3d23.051083984936!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x86af4af3897b09bf%3A0x26c04f981454655f!2sSan%20Jos%C3%A9%20del%20Cabo%2C%20B.C.S.!5e0!3m2!1sen!2smx!4v1646764835462!5m2!1sen!2smx"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    title="Ubicación Alyvia"
                    className="absolute inset-0 w-full h-full filter grayscale contrast-[1.1] opacity-90"
                ></iframe>

                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="relative">
                        <span className="absolute -top-3 -right-3 flex h-6 w-6">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-olive-accent opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-6 w-6 bg-olive-accent"></span>
                        </span>
                        <div className="bg-[#2C342C] text-white px-6 py-3 rounded-lg shadow-2xl flex items-center gap-3 transform -translate-y-12">
                            <MapPin size={20} className="text-olive-accent" />
                            <span className="font-serif italic text-lg pr-2">Alyvia Resort</span>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    );
};

export default Contact;