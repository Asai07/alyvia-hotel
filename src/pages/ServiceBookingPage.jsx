import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, User, Key, Calendar, Clock, CheckCircle, AlertCircle, Sparkles } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ServiceBookingPage = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const serviceData = location.state?.service;

    // 1. SOLUCIÓN AL PROBLEMA DEL SCROLL:
    // Forzamos que la vista empiece arriba al cargar la página
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Redirigir si alguien entra directo sin seleccionar servicio
    useEffect(() => {
        if (!serviceData) {
            navigate('/#servicios');
        }
    }, [serviceData, navigate]);

    // --- ESTADOS ---
    const [step, setStep] = useState(1); // 1: Auth, 2: Booking, 3: Success
    const [guestInfo, setGuestInfo] = useState({ lastName: '', roomNumber: '' });
    const [bookingDetails, setBookingDetails] = useState({ date: '', time: '', notes: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // --- LÓGICA PASO 1: VALIDACIÓN ---
    const handleAuth = (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        setTimeout(() => {
            if (guestInfo.roomNumber === '101') {
                setLoading(false);
                setStep(2);
            } else {
                setLoading(false);
                setError('No encontramos una reserva activa para esa habitación. Intenta con la habitación demo: 101');
            }
        }, 1000);
    };

    // --- LÓGICA PASO 2: RESERVA ---
    const handleBooking = (e) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setStep(3);
        }, 1500);
    };

    if (!serviceData) return null;

    return (
        <div className="bg-[#F9F9F7] min-h-screen font-sans selection:bg-[#2C342C] selection:text-white">
            <div className="bg-white shadow-sm sticky top-0 z-40">
                <Navbar />
            </div>

            <div className="max-w-4xl mx-auto px-6 py-12">

                {/* Botón Volver */}
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-gray-400 hover:text-[#2C342C] mb-8 text-xs font-bold uppercase tracking-widest transition-colors"
                >
                    <ArrowLeft size={16} /> Volver a Servicios
                </button>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    {/* COLUMNA IZQUIERDA: RESUMEN */}
                    <div className="md:col-span-1">
                        <div className="bg-white p-6 rounded-[2rem] shadow-lg border border-[#2C342C]/5 sticky top-32">
                            <div className="aspect-square rounded-2xl overflow-hidden mb-6 relative">
                                <img src={serviceData.img} alt={serviceData.title} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/20"></div>
                                <div className="absolute bottom-4 left-4">
                                    <span className="bg-white/90 backdrop-blur text-[#2C342C] text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                                        {serviceData.category}
                                    </span>
                                </div>
                            </div>
                            <h2 className="font-serif text-2xl text-[#2C342C] mb-2">{serviceData.title}</h2>
                            <p className="text-sm text-gray-500 mb-4 border-b border-gray-100 pb-4">
                                {serviceData.description}
                            </p>

                            <div className="space-y-2">
                                <div className="flex justify-between text-xs">
                                    <span className="text-gray-400 font-bold uppercase tracking-wider">Horario</span>
                                    <span className="text-[#2C342C] font-medium">{serviceData.details.time}</span>
                                </div>
                                <div className="flex justify-between text-xs">
                                    <span className="text-gray-400 font-bold uppercase tracking-wider">Costo</span>
                                    <span className="text-[#2C342C] font-medium">{serviceData.details.price}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* COLUMNA DERECHA: FORMULARIOS */}
                    <div className="md:col-span-2">
                        <AnimatePresence mode="wait">

                            {/* --- PASO 1: VERIFICACIÓN --- */}
                            {step === 1 && (
                                <motion.div
                                    key="step1"
                                    initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                                    className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-xl border border-[#2C342C]/5"
                                >
                                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#C5A880] mb-2 block">Paso 1 de 2</span>
                                    <h1 className="font-serif text-3xl md:text-4xl text-[#2C342C] mb-4">Acceso a Huéspedes</h1>
                                    <p className="text-gray-500 mb-8 leading-relaxed">
                                        Para reservar experiencias exclusivas, necesitamos verificar tu estancia actual en Alyvia.
                                    </p>

                                    {/* ALERTA DEMO */}
                                    <div className="bg-[#F2F0E9] border border-[#C5A880]/30 p-4 rounded-xl mb-8 flex gap-3 items-start">
                                        <Sparkles className="text-[#C5A880] shrink-0 mt-1" size={18} />
                                        <div>
                                            <p className="text-xs font-bold uppercase tracking-widest text-[#2C342C] mb-1">Modo Demo Activo</p>
                                            <p className="text-xs text-gray-600">Para probar este flujo, usa la habitación <strong>101</strong>.</p>
                                        </div>
                                    </div>

                                    <form onSubmit={handleAuth} className="space-y-6">
                                        <div>
                                            <label className="text-xs font-bold uppercase tracking-widest text-gray-400 block mb-2">Apellido del Titular</label>
                                            <div className="relative">
                                                <User className="absolute left-4 top-3.5 text-gray-300" size={18} />
                                                <input
                                                    type="text"
                                                    required
                                                    className="w-full bg-[#F9F9F7] border border-gray-200 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-[#C5A880] transition-colors"
                                                    placeholder="Ej: Smith"
                                                    value={guestInfo.lastName}
                                                    onChange={e => setGuestInfo({ ...guestInfo, lastName: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="text-xs font-bold uppercase tracking-widest text-gray-400 block mb-2">Número de Habitación</label>
                                            <div className="relative">
                                                <Key className="absolute left-4 top-3.5 text-gray-300" size={18} />
                                                <input
                                                    type="text"
                                                    required
                                                    className="w-full bg-[#F9F9F7] border border-gray-200 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-[#C5A880] transition-colors"
                                                    placeholder="Ej: 101"
                                                    value={guestInfo.roomNumber}
                                                    onChange={e => setGuestInfo({ ...guestInfo, roomNumber: e.target.value })}
                                                />
                                            </div>
                                        </div>

                                        {error && (
                                            <div className="flex items-center gap-2 text-red-500 text-xs font-medium bg-red-50 p-3 rounded-lg">
                                                <AlertCircle size={14} /> {error}
                                            </div>
                                        )}

                                        <div className="pt-4 flex flex-col gap-4">
                                            <button
                                                type="submit"
                                                disabled={loading}
                                                className="w-full bg-[#2C342C] text-white py-4 rounded-xl font-bold uppercase text-xs tracking-[0.2em] hover:bg-[#1A211B] transition-all disabled:opacity-70 flex justify-center"
                                            >
                                                {loading ? <span className="animate-spin h-4 w-4 border-2 border-white/30 border-t-white rounded-full"></span> : "Verificar Estancia"}
                                            </button>

                                            <button type="button" onClick={() => navigate('/booking')} className="text-xs text-gray-400 hover:text-[#C5A880] underline text-center">
                                                ¿Aún no eres huésped? Reserva una suite aquí.
                                            </button>
                                        </div>
                                    </form>
                                </motion.div>
                            )}

                            {/* --- PASO 2: DETALLES --- */}
                            {step === 2 && (
                                <motion.div
                                    key="step2"
                                    initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                                    className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-xl border border-[#2C342C]/5"
                                >
                                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#C5A880] mb-2 block">Paso 2 de 2</span>
                                    <h1 className="font-serif text-3xl md:text-4xl text-[#2C342C] mb-2">Configura tu Experiencia</h1>
                                    <p className="text-gray-500 mb-8 text-sm">
                                        Hola, <strong>Familia {guestInfo.lastName || "Huésped"}</strong> (Hab. {guestInfo.roomNumber}). Estás a un paso de confirmar.
                                    </p>

                                    <form onSubmit={handleBooking} className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="text-xs font-bold uppercase tracking-widest text-gray-400 block mb-2">Fecha Deseada</label>
                                                <div className="relative">
                                                    <Calendar className="absolute left-4 top-3.5 text-gray-300" size={18} />
                                                    <input
                                                        type="date"
                                                        required
                                                        className="w-full bg-[#F9F9F7] border border-gray-200 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-[#C5A880] text-sm text-gray-600"
                                                        onChange={e => setBookingDetails({ ...bookingDetails, date: e.target.value })}
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="text-xs font-bold uppercase tracking-widest text-gray-400 block mb-2">Hora Preferida</label>
                                                <div className="relative">
                                                    <Clock className="absolute left-4 top-3.5 text-gray-300" size={18} />
                                                    <select
                                                        required
                                                        className="w-full bg-[#F9F9F7] border border-gray-200 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-[#C5A880] text-sm text-gray-600 appearance-none"
                                                        onChange={e => setBookingDetails({ ...bookingDetails, time: e.target.value })}
                                                    >
                                                        <option value="">Selecciona hora...</option>
                                                        <option value="09:00">09:00 AM</option>
                                                        <option value="11:00">11:00 AM</option>
                                                        <option value="16:00">04:00 PM</option>
                                                        <option value="19:00">07:00 PM</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="text-xs font-bold uppercase tracking-widest text-gray-400 block mb-2">Notas Especiales (Alergias, preferencias...)</label>
                                            <textarea
                                                rows="3"
                                                className="w-full bg-[#F9F9F7] border border-gray-200 rounded-xl p-4 focus:outline-none focus:border-[#C5A880] text-sm text-gray-600 resize-none"
                                                placeholder="Opcional..."
                                                onChange={e => setBookingDetails({ ...bookingDetails, notes: e.target.value })}
                                            ></textarea>
                                        </div>

                                        <div className="bg-[#F2F0E9] p-4 rounded-xl flex justify-between items-center">
                                            <span className="text-xs font-bold uppercase tracking-widest text-[#2C342C]">Cargo a la habitación</span>
                                            <span className="font-serif text-lg text-[#2C342C]">{serviceData.details.price}</span>
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="w-full bg-[#2C342C] text-white py-4 rounded-xl font-bold uppercase text-xs tracking-[0.2em] hover:bg-[#1A211B] transition-all flex justify-center mt-4 shadow-lg"
                                        >
                                            {loading ? <span className="animate-spin h-4 w-4 border-2 border-white/30 border-t-white rounded-full"></span> : "Confirmar Reserva"}
                                        </button>
                                    </form>
                                </motion.div>
                            )}

                            {/* --- PASO 3: ÉXITO --- */}
                            {step === 3 && (
                                <motion.div
                                    key="step3"
                                    initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                                    className="bg-white p-12 rounded-[2.5rem] shadow-xl border border-[#2C342C]/5 text-center flex flex-col items-center justify-center min-h-[400px]"
                                >
                                    <div className="w-20 h-20 bg-[#2C342C] rounded-full flex items-center justify-center text-[#C5A880] mb-6 shadow-xl">
                                        <CheckCircle size={40} />
                                    </div>
                                    <h2 className="font-serif text-4xl text-[#2C342C] mb-4">¡Disfruta!</h2>
                                    <p className="text-gray-500 max-w-md mb-8 leading-relaxed">
                                        Tu experiencia <strong>{serviceData.title}</strong> ha sido agendada. Hemos enviado un pase digital a la recepción y a tu correo.
                                    </p>
                                    <div className="bg-[#F9F9F7] px-6 py-3 rounded-lg mb-8 border border-dashed border-gray-300">
                                        <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Código de Confirmación</p>
                                        <p className="font-mono text-lg text-[#2C342C]">ALY-{Math.floor(Math.random() * 10000)}</p>
                                    </div>
                                    <button
                                        onClick={() => navigate('/')}
                                        className="text-xs font-bold uppercase tracking-widest text-[#C5A880] hover:text-[#2C342C] underline"
                                    >
                                        Volver al Inicio
                                    </button>
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

export default ServiceBookingPage;