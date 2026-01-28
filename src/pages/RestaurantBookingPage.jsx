import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, User, Key, Calendar, Clock, CheckCircle, AlertCircle, Utensils, Users } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const RestaurantBookingPage = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // Recuperamos los datos del restaurante
    const restaurantData = location.state?.restaurant;

    // Scroll arriba al cargar
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Redirigir si no hay datos
    useEffect(() => {
        if (!restaurantData) {
            navigate('/#gastronomia'); // O la ruta donde tengas los restaurantes
        }
    }, [restaurantData, navigate]);

    // --- ESTADOS ---
    const [step, setStep] = useState(1);
    const [guestInfo, setGuestInfo] = useState({ lastName: '', roomNumber: '' });
    const [bookingDetails, setBookingDetails] = useState({ date: '', time: '', diners: '2', notes: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // --- LÓGICA VALIDACIÓN ---
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
                setError('Habitación no encontrada. Usa la 101 para probar la Demo.');
            }
        }, 1000);
    };

    // --- LÓGICA RESERVA ---
    const handleBooking = (e) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setStep(3);
        }, 1500);
    };

    if (!restaurantData) return null;

    return (
        <div className="bg-[#F9F9F7] min-h-screen font-sans selection:bg-[#2C342C] selection:text-white">
            <div className="bg-white shadow-sm sticky top-0 z-40">
                <Navbar />
            </div>

            <div className="max-w-4xl mx-auto px-6 py-12">

                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-gray-400 hover:text-[#2C342C] mb-8 text-xs font-bold uppercase tracking-widest transition-colors"
                >
                    <ArrowLeft size={16} /> Volver a Restaurantes
                </button>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    {/* COLUMNA IZQUIERDA: INFO RESTAURANTE */}
                    <div className="md:col-span-1">
                        <div className="bg-white p-6 rounded-[2rem] shadow-lg border border-[#2C342C]/5 sticky top-32">
                            <div className="aspect-[4/5] rounded-2xl overflow-hidden mb-6 relative">
                                <img src={restaurantData.img} alt={restaurantData.name} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/20"></div>
                                <div className="absolute bottom-4 left-4">
                                    <span className="bg-white/90 backdrop-blur text-[#2C342C] text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                                        {restaurantData.cuisine}
                                    </span>
                                </div>
                            </div>
                            <h2 className="font-serif text-2xl text-[#2C342C] mb-1">{restaurantData.name}</h2>
                            <p className="text-xs text-[#C5A880] font-bold uppercase tracking-widest mb-4">Chef {restaurantData.chef}</p>

                            <p className="text-sm text-gray-500 mb-4 border-b border-gray-100 pb-4">
                                {restaurantData.desc}
                            </p>

                            <div className="space-y-2">
                                <div className="flex justify-between text-xs">
                                    <span className="text-gray-400 font-bold uppercase tracking-wider">Horario</span>
                                    <span className="text-[#2C342C] font-medium">{restaurantData.open}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* COLUMNA DERECHA: FORMULARIOS */}
                    <div className="md:col-span-2">
                        <AnimatePresence mode="wait">

                            {/* --- PASO 1: LOGIN --- */}
                            {step === 1 && (
                                <motion.div
                                    key="step1"
                                    initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                                    className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-xl border border-[#2C342C]/5"
                                >
                                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#C5A880] mb-2 block">Paso 1 de 2</span>
                                    <h1 className="font-serif text-3xl md:text-4xl text-[#2C342C] mb-4">Verificar Estancia</h1>
                                    <p className="text-gray-500 mb-8 leading-relaxed">
                                        Las reservas en <strong>{restaurantData.name}</strong> son exclusivas para huéspedes o socios del club.
                                    </p>

                                    <div className="bg-[#F2F0E9] border border-[#C5A880]/30 p-4 rounded-xl mb-8 flex gap-3 items-start">
                                        <Utensils className="text-[#C5A880] shrink-0 mt-1" size={18} />
                                        <div>
                                            <p className="text-xs font-bold uppercase tracking-widest text-[#2C342C] mb-1">Demo Restaurante</p>
                                            <p className="text-xs text-gray-600">Usa la habitación <strong>101</strong> para acceder.</p>
                                        </div>
                                    </div>

                                    <form onSubmit={handleAuth} className="space-y-6">
                                        <div>
                                            <label className="text-xs font-bold uppercase tracking-widest text-gray-400 block mb-2">Apellido</label>
                                            <div className="relative">
                                                <User className="absolute left-4 top-3.5 text-gray-300" size={18} />
                                                <input
                                                    type="text" required
                                                    className="w-full bg-[#F9F9F7] border border-gray-200 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-[#C5A880]"
                                                    placeholder="Ej: Smith"
                                                    value={guestInfo.lastName}
                                                    onChange={e => setGuestInfo({ ...guestInfo, lastName: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="text-xs font-bold uppercase tracking-widest text-gray-400 block mb-2">Habitación</label>
                                            <div className="relative">
                                                <Key className="absolute left-4 top-3.5 text-gray-300" size={18} />
                                                <input
                                                    type="text" required
                                                    className="w-full bg-[#F9F9F7] border border-gray-200 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-[#C5A880]"
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

                                        <button
                                            type="submit" disabled={loading}
                                            className="w-full bg-[#2C342C] text-white py-4 rounded-xl font-bold uppercase text-xs tracking-[0.2em] hover:bg-[#1A211B] transition-all disabled:opacity-70 flex justify-center mt-4"
                                        >
                                            {loading ? "Verificando..." : "Continuar"}
                                        </button>
                                    </form>
                                </motion.div>
                            )}

                            {/* --- PASO 2: DETALLES DE MESA --- */}
                            {step === 2 && (
                                <motion.div
                                    key="step2"
                                    initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                                    className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-xl border border-[#2C342C]/5"
                                >
                                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#C5A880] mb-2 block">Paso 2 de 2</span>
                                    <h1 className="font-serif text-3xl md:text-4xl text-[#2C342C] mb-2">Tu Mesa</h1>
                                    <p className="text-gray-500 mb-8 text-sm">
                                        Reservando para la <strong>Familia {guestInfo.lastName}</strong>.
                                    </p>

                                    <form onSubmit={handleBooking} className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="text-xs font-bold uppercase tracking-widest text-gray-400 block mb-2">Fecha</label>
                                                <div className="relative">
                                                    <Calendar className="absolute left-4 top-3.5 text-gray-300" size={18} />
                                                    <input
                                                        type="date" required
                                                        className="w-full bg-[#F9F9F7] border border-gray-200 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-[#C5A880] text-sm text-gray-600"
                                                        onChange={e => setBookingDetails({ ...bookingDetails, date: e.target.value })}
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="text-xs font-bold uppercase tracking-widest text-gray-400 block mb-2">Hora</label>
                                                <div className="relative">
                                                    <Clock className="absolute left-4 top-3.5 text-gray-300" size={18} />
                                                    <select
                                                        required
                                                        className="w-full bg-[#F9F9F7] border border-gray-200 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-[#C5A880] text-sm text-gray-600 appearance-none"
                                                        onChange={e => setBookingDetails({ ...bookingDetails, time: e.target.value })}
                                                    >
                                                        <option value="">Elegir horario...</option>
                                                        <option value="19:00">07:00 PM</option>
                                                        <option value="19:30">07:30 PM</option>
                                                        <option value="20:00">08:00 PM</option>
                                                        <option value="20:30">08:30 PM</option>
                                                        <option value="21:00">09:00 PM</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="text-xs font-bold uppercase tracking-widest text-gray-400 block mb-2">Número de Comensales</label>
                                            <div className="relative">
                                                <Users className="absolute left-4 top-3.5 text-gray-300" size={18} />
                                                <select
                                                    className="w-full bg-[#F9F9F7] border border-gray-200 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-[#C5A880] text-sm text-gray-600 appearance-none"
                                                    value={bookingDetails.diners}
                                                    onChange={e => setBookingDetails({ ...bookingDetails, diners: e.target.value })}
                                                >
                                                    {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
                                                        <option key={n} value={n}>{n} Personas</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="text-xs font-bold uppercase tracking-widest text-gray-400 block mb-2">Alergias o Dietas</label>
                                            <textarea
                                                rows="2"
                                                className="w-full bg-[#F9F9F7] border border-gray-200 rounded-xl p-4 focus:outline-none focus:border-[#C5A880] text-sm text-gray-600 resize-none"
                                                placeholder="Ej: Alergia a nueces, Mesa junto a ventana..."
                                                onChange={e => setBookingDetails({ ...bookingDetails, notes: e.target.value })}
                                            ></textarea>
                                        </div>

                                        <button
                                            type="submit" disabled={loading}
                                            className="w-full bg-[#2C342C] text-white py-4 rounded-xl font-bold uppercase text-xs tracking-[0.2em] hover:bg-[#1A211B] transition-all flex justify-center mt-4 shadow-lg"
                                        >
                                            {loading ? "Confirmando..." : "Reservar Mesa"}
                                        </button>
                                    </form>
                                </motion.div>
                            )}

                            {/* --- PASO 3: CONFIRMACIÓN --- */}
                            {step === 3 && (
                                <motion.div
                                    key="step3"
                                    initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                                    className="bg-white p-12 rounded-[2.5rem] shadow-xl border border-[#2C342C]/5 text-center flex flex-col items-center justify-center min-h-[400px]"
                                >
                                    <div className="w-20 h-20 bg-[#2C342C] rounded-full flex items-center justify-center text-[#C5A880] mb-6 shadow-xl">
                                        <CheckCircle size={40} />
                                    </div>
                                    <h2 className="font-serif text-4xl text-[#2C342C] mb-4">Mesa Confirmada</h2>
                                    <p className="text-gray-500 max-w-md mb-8 leading-relaxed">
                                        Te esperamos en <strong>{restaurantData.name}</strong>. Hemos notificado al Chef {restaurantData.chef} sobre tu visita.
                                    </p>
                                    <div className="bg-[#F9F9F7] px-6 py-3 rounded-lg mb-8 border border-dashed border-gray-300">
                                        <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Reserva #</p>
                                        <p className="font-mono text-lg text-[#2C342C]">TBL-{Math.floor(Math.random() * 10000)}</p>
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

export default RestaurantBookingPage;