import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Calendar, Users, Music, Wine, CheckCircle, Sparkles, Mail, Phone, Heart } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const EventPlanningPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const eventData = location.state?.event;

    // Scroll Top
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Redirección segura
    useEffect(() => {
        if (!eventData) navigate('/#events');
    }, [eventData, navigate]);

    // Estados del Formulario
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        date: '',
        guests: '',
        details: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setStep(2);
        }, 1500);
    };

    if (!eventData) return null;

    return (
        <div className="bg-[#F9F9F7] min-h-screen font-sans selection:bg-[#2C342C] selection:text-white">
            <div className="bg-white shadow-sm sticky top-0 z-40">
                <Navbar />
            </div>

            {/* HERO VISUAL */}
            <div className="relative h-[40vh] md:h-[50vh] overflow-hidden">
                <img src={eventData.img} alt={eventData.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div className="text-center text-white p-6">
                        <span className="text-xs font-bold uppercase tracking-[0.3em] mb-4 block text-[#C5A880]">
                            {eventData.category}
                        </span>
                        <h1 className="font-serif text-5xl md:text-7xl">{eventData.title}</h1>
                    </div>
                </div>
                <button
                    onClick={() => navigate(-1)}
                    className="absolute top-8 left-8 text-white flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:text-[#C5A880] transition-colors"
                >
                    <ArrowLeft size={16} /> Volver
                </button>
            </div>

            <div className="max-w-6xl mx-auto px-6 py-16 md:py-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

                    {/* COLUMNA IZQUIERDA: DETALLES E INSPIRACIÓN */}
                    <div>
                        <h2 className="font-serif text-3xl md:text-4xl text-[#2C342C] mb-6">
                            La Visión
                        </h2>
                        <p className="text-gray-600 text-lg leading-relaxed mb-10">
                            {eventData.longDesc || eventData.desc}
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                            {eventData.features?.map((feature, idx) => (
                                <div key={idx} className="flex gap-4 items-start p-4 rounded-xl bg-white border border-[#2C342C]/5 shadow-sm">
                                    <div className="text-[#C5A880] bg-[#F9F9F7] p-2 rounded-full">
                                        {feature.icon || <Sparkles size={18} />}
                                    </div>
                                    <div>
                                        <h4 className="font-serif text-[#2C342C] text-lg">{feature.title}</h4>
                                        <p className="text-xs text-gray-500 mt-1">{feature.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="bg-[#2C342C] text-[#F2F0E9] p-8 rounded-[2rem] relative overflow-hidden">
                            <div className="relative z-10">
                                <h3 className="font-serif text-2xl mb-2">¿Necesitas inspiración?</h3>
                                <p className="text-white/60 text-sm mb-6">Descarga nuestro Lookbook 2026 con montajes reales en Alyvia.</p>
                                <button className="text-xs font-bold uppercase tracking-widest border-b border-[#C5A880] pb-1 text-[#C5A880] hover:text-white hover:border-white transition-colors">
                                    Descargar PDF
                                </button>
                            </div>
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#C5A880] rounded-full blur-[50px] opacity-20"></div>
                        </div>
                    </div>

                    {/* COLUMNA DERECHA: PLANIFICADOR (FORMULARIO) */}
                    <div className="relative">
                        <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-xl border border-[#2C342C]/5 sticky top-32">

                            <AnimatePresence mode="wait">
                                {step === 1 ? (
                                    <motion.div
                                        key="form"
                                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                    >
                                        <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#C5A880] mb-2 block">
                                            Comencemos
                                        </span>
                                        <h3 className="font-serif text-3xl text-[#2C342C] mb-6">Diseña tu Evento</h3>

                                        <form onSubmit={handleSubmit} className="space-y-6">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div>
                                                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2 block">Nombre</label>
                                                    <input required type="text" className="w-full bg-[#F9F9F7] border border-gray-200 rounded-xl p-3 focus:outline-none focus:border-[#C5A880]"
                                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2 block">Email</label>
                                                    <input required type="email" className="w-full bg-[#F9F9F7] border border-gray-200 rounded-xl p-3 focus:outline-none focus:border-[#C5A880]"
                                                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                                                    />
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div>
                                                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2 block">Fecha Tentativa</label>
                                                    <div className="relative">
                                                        <Calendar size={16} className="absolute left-3 top-3.5 text-gray-400" />
                                                        <input type="date" className="w-full bg-[#F9F9F7] border border-gray-200 rounded-xl py-3 pl-10 pr-3 focus:outline-none focus:border-[#C5A880] text-sm text-gray-600"
                                                            onChange={e => setFormData({ ...formData, date: e.target.value })}
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2 block">Invitados Aprox.</label>
                                                    <div className="relative">
                                                        <Users size={16} className="absolute left-3 top-3.5 text-gray-400" />
                                                        <select className="w-full bg-[#F9F9F7] border border-gray-200 rounded-xl py-3 pl-10 pr-3 focus:outline-none focus:border-[#C5A880] text-sm text-gray-600 appearance-none"
                                                            onChange={e => setFormData({ ...formData, guests: e.target.value })}
                                                        >
                                                            <option>Seleccionar...</option>
                                                            <option>Solo pareja</option>
                                                            <option>10 - 30</option>
                                                            <option>30 - 100</option>
                                                            <option>100+</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>

                                            <div>
                                                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2 block">Cuéntanos tu idea</label>
                                                <textarea rows="4" className="w-full bg-[#F9F9F7] border border-gray-200 rounded-xl p-4 focus:outline-none focus:border-[#C5A880] text-sm resize-none" placeholder="Estilo, colores, requerimientos especiales..."
                                                    onChange={e => setFormData({ ...formData, details: e.target.value })}
                                                ></textarea>
                                            </div>

                                            <button
                                                type="submit"
                                                disabled={loading}
                                                className="w-full bg-[#2C342C] text-white py-4 rounded-xl font-bold uppercase text-xs tracking-[0.2em] hover:bg-[#1A211B] transition-all flex justify-center shadow-lg"
                                            >
                                                {loading ? "Enviando..." : "Solicitar Cotización"}
                                            </button>
                                        </form>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="success"
                                        initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                                        className="text-center py-10"
                                    >
                                        <div className="w-20 h-20 bg-[#C5A880] rounded-full flex items-center justify-center text-white mx-auto mb-6 shadow-xl">
                                            <CheckCircle size={40} />
                                        </div>
                                        <h3 className="font-serif text-3xl text-[#2C342C] mb-4">¡Solicitud Recibida!</h3>
                                        <p className="text-gray-500 mb-8 max-w-sm mx-auto">
                                            Gracias, <strong>{formData.name}</strong>. Nuestro equipo de eventos especializados ya está revisando tus ideas. Te contactaremos en menos de 24 horas.
                                        </p>
                                        <div className="flex justify-center gap-4 text-xs font-bold uppercase tracking-widest text-[#2C342C]">
                                            <a href="#" className="flex items-center gap-2 hover:text-[#C5A880]"><Mail size={16} /> Email</a>
                                            <span className="opacity-20">|</span>
                                            <a href="#" className="flex items-center gap-2 hover:text-[#C5A880]"><Phone size={16} /> +52 (998) 123 4567</a>
                                        </div>
                                        <button onClick={() => navigate('/')} className="mt-12 text-xs text-gray-400 hover:text-[#C5A880] underline">
                                            Volver al Inicio
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                        </div>
                    </div>

                </div>
            </div>
            <Footer />
        </div>
    );
};

export default EventPlanningPage;