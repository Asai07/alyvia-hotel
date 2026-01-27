import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { X, CalendarDays, Users, BedDouble, Minus, Plus, Search, Check, ChevronDown } from 'lucide-react'; // Agregué BedDouble y ChevronDown
import { useBooking } from '../context/BookingContext';
import { format, addDays } from 'date-fns';
import { es } from 'date-fns/locale';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

const ROOM_OPTIONS = ['Cualquier Suite', 'Ocean Villa', 'Garden Suite', 'The Penthouse'];

const BookingWidgetModal = () => {
    const { isBookingOpen, closeBooking, initialRoom } = useBooking();
    const navigate = useNavigate();

    // --- ESTADOS ---
    const [dateRange, setDateRange] = useState({
        from: new Date(),
        to: addDays(new Date(), 3)
    });
    const [guests, setGuests] = useState({ adults: 2, children: 0 });
    const [roomType, setRoomType] = useState("Cualquier Suite");

    // Control de qué tab está abierto ('dates', 'guests', 'room', o null)
    const [activeTab, setActiveTab] = useState(null);

    useEffect(() => {
        if (isBookingOpen) {
            // Si viene una habitación predefinida, la usamos. Si no, "Cualquier Suite".
            setRoomType(initialRoom || "Cualquier Suite");
            setActiveTab(null);
        }
    }, [isBookingOpen, initialRoom]);

    const handleSearch = () => {
        if (!dateRange?.from || !dateRange?.to) return;

        const params = new URLSearchParams({
            checkIn: dateRange.from.toISOString(),
            checkOut: dateRange.to.toISOString(),
            adults: guests.adults,
            children: guests.children,
            roomType: roomType // Aquí mandamos la selección al BookingPage
        });

        closeBooking();
        window.scrollTo(0, 0);
        navigate(`/booking?${params.toString()}`);
    };

    const formatDateDisplay = () => {
        if (dateRange?.from) {
            if (dateRange.to) {
                return `${format(dateRange.from, 'dd MMM', { locale: es })} - ${format(dateRange.to, 'dd MMM', { locale: es })}`;
            }
            return format(dateRange.from, 'dd MMM', { locale: es }) + " - ...";
        }
        return "Seleccionar fechas";
    };

    return (
        <AnimatePresence>
            {isBookingOpen && (
                <div className="fixed inset-0 z-[200] flex items-end md:items-center justify-center px-4 pb-4 md:pb-0">

                    {/* BACKDROP */}
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        onClick={closeBooking}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />

                    {/* MODAL CONTAINER */}
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 20 }}
                        className="relative bg-white w-full max-w-4xl rounded-[2.5rem] shadow-2xl z-10 overflow-hidden flex flex-col md:flex-row max-h-[85vh] h-auto"
                    >
                        {/* BOTÓN CERRAR */}
                        <button
                            onClick={closeBooking}
                            className="absolute top-4 right-4 z-20 w-10 h-10 bg-white/80 hover:bg-white backdrop-blur rounded-full flex items-center justify-center text-[#2C342C] transition-colors shadow-sm"
                        >
                            <X size={20} />
                        </button>

                        {/* COLUMNA IZQUIERDA: IMAGEN */}
                        <div className="hidden md:flex w-5/12 relative bg-[#2C342C] min-h-[400px]">
                            <img
                                src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop"
                                alt="Ambiente Alyvia"
                                className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#2C342C] via-transparent to-transparent opacity-90"></div>

                            <div className="relative z-10 p-10 flex flex-col justify-end h-full text-[#F2F0E9]">
                                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#C5A880] mb-4">
                                    Tu Refugio
                                </span>
                                <h2 className="font-serif text-4xl leading-tight mb-4">
                                    {roomType !== "Cualquier Suite" ? roomType : "Encuentra tu Espacio"}
                                </h2>
                                <p className="text-white/60 text-sm leading-relaxed">
                                    {roomType !== "Cualquier Suite"
                                        ? "Una excelente elección. Estás a un paso de confirmar tu paraíso privado."
                                        : "Selecciona tus fechas para descubrir la disponibilidad en tiempo real."}
                                </p>
                            </div>
                        </div>

                        {/* COLUMNA DERECHA: FORMULARIO */}
                        <div className="w-full md:w-7/12 bg-white flex flex-col relative min-h-0">

                            {/* --- ÁREA SCROLLABLE --- */}
                            <div className="overflow-y-auto p-6 md:p-10 custom-scrollbar flex-1">

                                <div className="md:hidden mb-6 mt-2">
                                    <h2 className="font-serif text-2xl md:text-3xl text-[#2C342C] mb-1">Reserva tu Estancia</h2>
                                    <p className="text-gray-400 text-xs md:text-sm">Mejor precio garantizado</p>
                                </div>

                                <div className="space-y-4 md:space-y-6 pb-2">

                                    {/* 1. SELECTOR FECHAS */}
                                    <div>
                                        <label className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 flex items-center gap-2">
                                            <CalendarDays size={14} /> Fechas de Estancia
                                        </label>
                                        <button
                                            onClick={() => setActiveTab(activeTab === 'dates' ? null : 'dates')}
                                            className={`w-full text-left p-4 rounded-xl border transition-all flex justify-between items-center
                                            ${activeTab === 'dates' ? 'border-[#C5A880] bg-[#C5A880]/5' : 'border-gray-200 bg-[#F9F9F7]'}`}
                                        >
                                            <span className="font-serif text-base md:text-lg text-[#2C342C]">{formatDateDisplay()}</span>
                                            <span className={`text-[10px] font-bold uppercase tracking-wider ${activeTab === 'dates' ? 'text-[#C5A880]' : 'text-gray-400'}`}>
                                                {activeTab === 'dates' ? 'CERRAR' : 'EDITAR'}
                                            </span>
                                        </button>

                                        <AnimatePresence>
                                            {activeTab === 'dates' && (
                                                <motion.div
                                                    initial={{ opacity: 0, height: 0, overflow: 'hidden' }}
                                                    animate={{ opacity: 1, height: 'auto', overflow: 'visible' }}
                                                    exit={{ opacity: 0, height: 0, overflow: 'hidden' }}
                                                    transition={{ duration: 0.3 }}
                                                    className="mt-2 md:mt-4 bg-[#F2F0E9] rounded-3xl p-2 md:p-4 flex justify-center border border-[#2C342C]/5"
                                                >
                                                    <DayPicker
                                                        mode="range"
                                                        selected={dateRange}
                                                        onSelect={setDateRange}
                                                        locale={es}
                                                        styles={{
                                                            root: { '--rdp-accent-color': '#2C342C', '--rdp-background-color': '#F2F0E9', margin: 0 },
                                                            caption_label: { fontFamily: 'ui-serif, serif', color: '#2C342C' },
                                                            day_selected: { backgroundColor: '#2C342C', color: '#F2F0E9' },
                                                            day: { fontSize: '0.8rem' }
                                                        }}
                                                    />
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>

                                    {/* 2. SELECTOR HUÉSPEDES */}
                                    <div>
                                        <label className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 flex items-center gap-2">
                                            <Users size={14} /> Huéspedes
                                        </label>
                                        <button
                                            onClick={() => setActiveTab(activeTab === 'guests' ? null : 'guests')}
                                            className={`w-full text-left p-4 rounded-xl border transition-all flex justify-between items-center
                                            ${activeTab === 'guests' ? 'border-[#C5A880] bg-[#C5A880]/5' : 'border-gray-200 bg-[#F9F9F7]'}`}
                                        >
                                            <span className="font-serif text-base md:text-lg text-[#2C342C]">
                                                {guests.adults} Adultos, {guests.children} Niños
                                            </span>
                                            <span className={`text-[10px] font-bold uppercase tracking-wider ${activeTab === 'guests' ? 'text-[#C5A880]' : 'text-gray-400'}`}>
                                                {activeTab === 'guests' ? 'LISTO' : 'EDITAR'}
                                            </span>
                                        </button>

                                        <AnimatePresence>
                                            {activeTab === 'guests' && (
                                                <motion.div
                                                    initial={{ opacity: 0, height: 0, overflow: 'hidden' }}
                                                    animate={{ opacity: 1, height: 'auto', overflow: 'visible' }}
                                                    exit={{ opacity: 0, height: 0, overflow: 'hidden' }}
                                                    transition={{ duration: 0.3 }}
                                                    className="mt-2 md:mt-4 bg-[#F2F0E9] rounded-3xl p-4 md:p-6 space-y-4 border border-[#2C342C]/5"
                                                >
                                                    <div className="flex justify-between items-center">
                                                        <div><p className="font-serif text-[#2C342C]">Adultos</p><p className="text-xs text-gray-400">Mayores de 13</p></div>
                                                        <div className="flex items-center gap-3">
                                                            <button onClick={() => setGuests(p => ({ ...p, adults: Math.max(1, p.adults - 1) }))} className="w-8 h-8 rounded-full border border-gray-200 bg-white flex items-center justify-center"><Minus size={14} /></button>
                                                            <span className="font-bold w-4 text-center">{guests.adults}</span>
                                                            <button onClick={() => setGuests(p => ({ ...p, adults: Math.max(1, p.adults + 1) }))} className="w-8 h-8 rounded-full border border-gray-200 bg-white flex items-center justify-center"><Plus size={14} /></button>
                                                        </div>
                                                    </div>
                                                    <div className="flex justify-between items-center pt-4 border-t border-gray-200/50">
                                                        <div><p className="font-serif text-[#2C342C]">Niños</p><p className="text-xs text-gray-400">2 - 12 años</p></div>
                                                        <div className="flex items-center gap-3">
                                                            <button onClick={() => setGuests(p => ({ ...p, children: Math.max(0, p.children - 1) }))} className="w-8 h-8 rounded-full border border-gray-200 bg-white flex items-center justify-center"><Minus size={14} /></button>
                                                            <span className="font-bold w-4 text-center">{guests.children}</span>
                                                            <button onClick={() => setGuests(p => ({ ...p, children: Math.max(0, p.children + 1) }))} className="w-8 h-8 rounded-full border border-gray-200 bg-white flex items-center justify-center"><Plus size={14} /></button>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>

                                    {/* 3. SELECTOR DE HABITACIÓN (NUEVO) */}
                                    <div>
                                        <label className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 flex items-center gap-2">
                                            <BedDouble size={14} /> Preferencia de Suite
                                        </label>
                                        <button
                                            onClick={() => setActiveTab(activeTab === 'room' ? null : 'room')}
                                            className={`w-full text-left p-4 rounded-xl border transition-all flex justify-between items-center
                                            ${activeTab === 'room' ? 'border-[#C5A880] bg-[#C5A880]/5' : 'border-gray-200 bg-[#F9F9F7]'}`}
                                        >
                                            <span className="font-serif text-base md:text-lg text-[#2C342C] truncate pr-2">
                                                {roomType}
                                            </span>
                                            <ChevronDown size={16} className={`text-gray-400 transition-transform ${activeTab === 'room' ? 'rotate-180 text-[#C5A880]' : ''}`} />
                                        </button>

                                        <AnimatePresence>
                                            {activeTab === 'room' && (
                                                <motion.div
                                                    initial={{ opacity: 0, height: 0, overflow: 'hidden' }}
                                                    animate={{ opacity: 1, height: 'auto', overflow: 'visible' }}
                                                    exit={{ opacity: 0, height: 0, overflow: 'hidden' }}
                                                    transition={{ duration: 0.3 }}
                                                    className="mt-2 md:mt-4 bg-[#F2F0E9] rounded-3xl p-2 border border-[#2C342C]/5 overflow-hidden"
                                                >
                                                    {ROOM_OPTIONS.map((option) => (
                                                        <div
                                                            key={option}
                                                            onClick={() => { setRoomType(option); setActiveTab(null); }}
                                                            className={`px-4 py-3 rounded-xl cursor-pointer transition-colors flex items-center justify-between
                                                            ${roomType === option ? 'bg-white shadow-sm font-bold text-[#2C342C]' : 'hover:bg-white/50 text-gray-600'}`}
                                                        >
                                                            <span className="text-sm">{option}</span>
                                                            {roomType === option && <div className="w-2 h-2 rounded-full bg-[#C5A880]"></div>}
                                                        </div>
                                                    ))}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>

                                </div>
                            </div>

                            {/* --- ÁREA FIJA (Botón Sticky) --- */}
                            <div className="p-6 border-t border-gray-100 bg-white z-20 shrink-0">
                                <button
                                    onClick={handleSearch}
                                    className="w-full bg-[#2C342C] text-white py-4 rounded-[1.5rem] font-bold uppercase text-xs tracking-[0.2em] hover:bg-[#1A211B] transition-all shadow-xl hover:shadow-2xl flex items-center justify-center gap-2 group"
                                >
                                    Ver Disponibilidad <Search size={16} className="group-hover:scale-110 transition-transform" />
                                </button>
                                <p className="text-center text-[10px] text-gray-400 mt-2 md:mt-3 flex items-center justify-center gap-1">
                                    <Check size={10} /> Tarifa más baja garantizada
                                </p>
                            </div>

                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default BookingWidgetModal;