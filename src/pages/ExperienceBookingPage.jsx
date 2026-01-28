import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, User, Key, Calendar, Clock, CheckCircle, AlertCircle, Compass, Users, MapPin } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ExperienceBookingPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const experienceData = location.state?.experience;

    useEffect(() => { window.scrollTo(0, 0); }, []);
    useEffect(() => { if (!experienceData) navigate('/#actividades'); }, [experienceData, navigate]);

    const [step, setStep] = useState(1);
    const [guestInfo, setGuestInfo] = useState({ lastName: '', roomNumber: '' });
    const [bookingDetails, setBookingDetails] = useState({ date: '', time: '', participants: '2', notes: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleAuth = (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        setTimeout(() => {
            if (guestInfo.roomNumber === '101') { setLoading(false); setStep(2); }
            else { setLoading(false); setError('Habitación no encontrada. Usa la 101.'); }
        }, 1000);
    };

    const handleBooking = (e) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => { setLoading(false); setStep(3); }, 1500);
    };

    if (!experienceData) return null;

    return (
        <div className="bg-[#F9F9F7] min-h-screen font-sans selection:bg-[#2C342C] selection:text-white">
            <div className="bg-white shadow-sm sticky top-0 z-40">
                <Navbar />
            </div>

            {/* 1. ANCHO AMPLIADO */}
            <div className="max-w-6xl mx-auto px-6 py-12">
                <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-400 hover:text-[#2C342C] mb-8 text-xs font-bold uppercase tracking-widest transition-colors"><ArrowLeft size={16} /> Volver a Experiencias</button>

                {/* 2. GRID 50/50 */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

                    {/* COLUMNA IZQUIERDA */}
                    <div>
                        <div className="bg-white p-6 md:p-8 rounded-[2rem] shadow-lg border border-[#2C342C]/5 sticky top-32">
                            {/* 3. IMAGEN CONTROLADA */}
                            <div className="w-full h-64 md:h-auto md:aspect-video rounded-2xl overflow-hidden mb-8 relative">
                                <img src={experienceData.img} alt={experienceData.title} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/20"></div>
                                <div className="absolute bottom-4 left-4">
                                    <span className="bg-white/90 backdrop-blur text-[#2C342C] text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">{experienceData.price}</span>
                                </div>
                            </div>
                            <h2 className="font-serif text-3xl text-[#2C342C] mb-2">{experienceData.title}</h2>
                            <p className="text-xs text-[#C5A880] font-bold uppercase tracking-widest mb-6">{experienceData.subtitle}</p>
                            <p className="text-gray-500 mb-6 border-b border-gray-100 pb-6 text-sm">{experienceData.description}</p>

                            <div className="space-y-3">
                                {experienceData.details.map((item, idx) => (
                                    <div key={idx} className="flex justify-between text-sm">
                                        <span className="text-gray-400 font-bold uppercase tracking-wider">{item.label}</span>
                                        <span className="text-[#2C342C] font-medium">{item.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* COLUMNA DERECHA */}
                    <div>
                        <AnimatePresence mode="wait">
                            {step === 1 && (
                                <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-xl border border-[#2C342C]/5">
                                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#C5A880] mb-2 block">Paso 1 de 2</span>
                                    <h1 className="font-serif text-3xl md:text-4xl text-[#2C342C] mb-4">Verificar Huésped</h1>
                                    <p className="text-gray-500 mb-8 leading-relaxed">Las experiencias son exclusivas.</p>

                                    <div className="bg-[#F2F0E9] border border-[#C5A880]/30 p-4 rounded-xl mb-8 flex gap-3 items-start">
                                        <Compass className="text-[#C5A880] shrink-0 mt-1" size={18} />
                                        <div><p className="text-xs font-bold uppercase tracking-widest text-[#2C342C] mb-1">Demo Experiencias</p><p className="text-xs text-gray-600">Usa la <strong>101</strong>.</p></div>
                                    </div>

                                    <form onSubmit={handleAuth} className="space-y-6">
                                        <div><label className="text-xs font-bold uppercase tracking-widest text-gray-400 block mb-2">Apellido</label><div className="relative"><User className="absolute left-4 top-3.5 text-gray-300" size={18} /><input type="text" required className="w-full bg-[#F9F9F7] border border-gray-200 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-[#C5A880]" placeholder="Ej: Smith" value={guestInfo.lastName} onChange={e => setGuestInfo({ ...guestInfo, lastName: e.target.value })} /></div></div>
                                        <div><label className="text-xs font-bold uppercase tracking-widest text-gray-400 block mb-2">Habitación</label><div className="relative"><Key className="absolute left-4 top-3.5 text-gray-300" size={18} /><input type="text" required className="w-full bg-[#F9F9F7] border border-gray-200 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-[#C5A880]" placeholder="Ej: 101" value={guestInfo.roomNumber} onChange={e => setGuestInfo({ ...guestInfo, roomNumber: e.target.value })} /></div></div>
                                        {error && <div className="flex items-center gap-2 text-red-500 text-xs font-medium bg-red-50 p-3 rounded-lg"><AlertCircle size={14} /> {error}</div>}
                                        <button type="submit" disabled={loading} className="w-full bg-[#2C342C] text-white py-4 rounded-xl font-bold uppercase text-xs tracking-[0.2em] hover:bg-[#1A211B] transition-all flex justify-center mt-4">{loading ? "Verificando..." : "Continuar"}</button>
                                    </form>
                                </motion.div>
                            )}

                            {step === 2 && (
                                <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-xl border border-[#2C342C]/5">
                                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#C5A880] mb-2 block">Paso 2 de 2</span>
                                    <h1 className="font-serif text-3xl md:text-4xl text-[#2C342C] mb-2">Detalles</h1>
                                    <p className="text-gray-500 mb-8 text-sm">Personalizando para <strong>Familia {guestInfo.lastName}</strong>.</p>
                                    <form onSubmit={handleBooking} className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div><label className="text-xs font-bold uppercase tracking-widest text-gray-400 block mb-2">Fecha</label><div className="relative"><Calendar className="absolute left-4 top-3.5 text-gray-300" size={18} /><input type="date" required className="w-full bg-[#F9F9F7] border border-gray-200 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-[#C5A880] text-sm text-gray-600" onChange={e => setBookingDetails({ ...bookingDetails, date: e.target.value })} /></div></div>
                                            <div><label className="text-xs font-bold uppercase tracking-widest text-gray-400 block mb-2">Horario</label><div className="relative"><Clock className="absolute left-4 top-3.5 text-gray-300" size={18} /><select required className="w-full bg-[#F9F9F7] border border-gray-200 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-[#C5A880] text-sm text-gray-600 appearance-none" onChange={e => setBookingDetails({ ...bookingDetails, time: e.target.value })}><option value="">Seleccionar...</option><option value="09:00">09:00 AM</option><option value="17:00">05:00 PM</option></select></div></div>
                                        </div>
                                        <div><label className="text-xs font-bold uppercase tracking-widest text-gray-400 block mb-2">Participantes</label><div className="relative"><Users className="absolute left-4 top-3.5 text-gray-300" size={18} /><select className="w-full bg-[#F9F9F7] border border-gray-200 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-[#C5A880] text-sm text-gray-600 appearance-none" value={bookingDetails.participants} onChange={e => setBookingDetails({ ...bookingDetails, participants: e.target.value })}>{[1, 2, 3, 4, 5, 6].map(n => (<option key={n} value={n}>{n} Personas</option>))}</select></div></div>
                                        <div><label className="text-xs font-bold uppercase tracking-widest text-gray-400 block mb-2">Notas</label><textarea rows="2" className="w-full bg-[#F9F9F7] border border-gray-200 rounded-xl p-4 focus:outline-none focus:border-[#C5A880] text-sm text-gray-600 resize-none" placeholder="Opcional..." onChange={e => setBookingDetails({ ...bookingDetails, notes: e.target.value })}></textarea></div>
                                        <button type="submit" disabled={loading} className="w-full bg-[#2C342C] text-white py-4 rounded-xl font-bold uppercase text-xs tracking-[0.2em] hover:bg-[#1A211B] transition-all flex justify-center mt-4">{loading ? "Agendando..." : "Confirmar"}</button>
                                    </form>
                                </motion.div>
                            )}

                            {step === 3 && (
                                <motion.div key="step3" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-white p-12 rounded-[2.5rem] shadow-xl border border-[#2C342C]/5 text-center flex flex-col items-center justify-center min-h-[400px]">
                                    <div className="w-20 h-20 bg-[#2C342C] rounded-full flex items-center justify-center text-[#C5A880] mb-6 shadow-xl"><CheckCircle size={40} /></div>
                                    <h2 className="font-serif text-4xl text-[#2C342C] mb-4">¡Todo Listo!</h2>
                                    <p className="text-gray-500 max-w-md mb-8">Tu experiencia ha sido programada.</p>
                                    <button onClick={() => navigate('/')} className="text-xs font-bold uppercase tracking-widest text-[#C5A880] hover:text-[#2C342C] underline">Volver al Inicio</button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ExperienceBookingPage;