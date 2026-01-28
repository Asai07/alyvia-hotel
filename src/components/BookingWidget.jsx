import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CalendarDays, Users, BedDouble, ChevronDown, Minus, Plus, X, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { format, addDays } from 'date-fns';
import { es } from 'date-fns/locale';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

const BookingWidget = () => {
    // --- ESTADOS ---
    const [dateRange, setDateRange] = useState({
        from: new Date(),
        to: addDays(new Date(), 3)
    });
    const [guests, setGuests] = useState({ adults: 2, children: 0 });
    const [roomType, setRoomType] = useState("Cualquier Suite");

    // Control de Menús
    const [openMenu, setOpenMenu] = useState(null);
    const [menuPlacement, setMenuPlacement] = useState('bottom');
    const [isMobile, setIsMobile] = useState(false); // Nuevo estado para control robusto

    // Referencias
    const widgetRef = useRef(null);
    const calendarPopupRef = useRef(null);
    const navigate = useNavigate();

    // --- DETECCIÓN DE MÓVIL ---
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const handleSearch = () => {
        if (!dateRange?.from || !dateRange?.to) {
            alert("Por favor selecciona las fechas de tu estadía.");
            return;
        }
        const params = new URLSearchParams({
            checkIn: dateRange.from.toISOString(),
            checkOut: dateRange.to.toISOString(),
            adults: guests.adults,
            children: guests.children,
            roomType: roomType
        });
        navigate(`/booking?${params.toString()}`);
    };

    // --- MANEJO DE CLICS EXTERNOS ---
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!openMenu) return;
            // En móvil, el backdrop maneja el cierre, así que esto es principalmente para desktop
            const isClickInsideWidget = widgetRef.current && widgetRef.current.contains(event.target);
            const isClickInsidePopup = calendarPopupRef.current && calendarPopupRef.current.contains(event.target);

            if (!isClickInsideWidget && !isClickInsidePopup) {
                setOpenMenu(null);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [openMenu]);

    // --- POSICIÓN INTELIGENTE (SOLO DESKTOP) ---
    const toggleMenu = (menu) => {
        if (openMenu === menu) {
            setOpenMenu(null);
            return;
        }
        // Solo calculamos posición en desktop
        if (!isMobile && widgetRef.current) {
            const rect = widgetRef.current.getBoundingClientRect();
            const spaceBelow = window.innerHeight - rect.bottom;
            setMenuPlacement(spaceBelow < 400 ? 'top' : 'bottom');
        }
        setOpenMenu(menu);
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

    // --- CLASES DINÁMICAS (LA SOLUCIÓN ROBUSTA) ---
    // En móvil usamos 'inset-0 m-auto' que centra vertical/horizontalmente sin depender de transform
    const popupClasses = isMobile
        ? "fixed inset-0 z-50 m-auto w-[90%] max-w-sm h-fit max-h-[85dvh] overflow-y-auto bg-white rounded-[1.5rem] shadow-2xl p-4 flex flex-col"
        : `absolute z-50 bg-white p-6 rounded-[2rem] shadow-2xl border border-gray-100 overflow-hidden w-auto ${menuPlacement === 'top' ? 'bottom-full mb-4' : 'top-full mt-4'} left-0`;

    // --- ANIMACIÓN CONDICIONAL ---
    // En móvil animamos escala (zoom) para no romper el centrado. En desktop animamos Y (deslizamiento).
    const animVariants = isMobile ? {
        initial: { opacity: 0, scale: 0.9 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.9 }
    } : {
        initial: { opacity: 0, y: menuPlacement === 'top' ? 10 : -10, scale: 0.95 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: menuPlacement === 'top' ? 10 : -10, scale: 0.95 }
    };

    return (
        <div className="relative z-50" ref={widgetRef} id="booking-widget">

            <motion.div
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="max-w-5xl mx-auto bg-white rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(44,52,44,0.15)] p-4 flex flex-col md:flex-row items-center justify-between gap-4 border border-[#2C342C]/5 relative"
            >
                <div className="grid grid-cols-1 md:grid-cols-3 w-full gap-8 px-6 py-2">

                    {/* --- 1. SECCIÓN FECHAS --- */}
                    <div className="relative">
                        <div
                            onClick={() => toggleMenu('dates')}
                            className="flex flex-col gap-2 border-r border-gray-100 last:border-0 group cursor-pointer"
                        >
                            <div className="flex items-center gap-2 text-[#2C342C]/50 group-hover:text-[#C5A880] transition-colors">
                                <CalendarDays size={16} />
                                <span className="text-[10px] font-bold uppercase tracking-widest">Fechas</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="font-serif text-[#2C342C] text-lg capitalize whitespace-nowrap overflow-hidden text-ellipsis">
                                    {formatDateDisplay()}
                                </span>
                                <ChevronDown size={14} className={`text-[#2C342C]/30 transition-transform ${openMenu === 'dates' ? 'rotate-180' : ''}`} />
                            </div>
                        </div>

                        <AnimatePresence>
                            {openMenu === 'dates' && (
                                <>
                                    {/* BACKDROP MÓVIL */}
                                    {isMobile && (
                                        <motion.div
                                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
                                            onClick={() => setOpenMenu(null)}
                                        />
                                    )}

                                    {/* POPUP */}
                                    <motion.div
                                        ref={calendarPopupRef}
                                        {...animVariants}
                                        transition={{ duration: 0.2 }}
                                        className={popupClasses}
                                        onMouseDown={(e) => e.stopPropagation()}
                                    >
                                        {/* Header Móvil */}
                                        <div className="flex md:hidden justify-between items-center mb-4 pb-2 border-b border-gray-100 shrink-0">
                                            <span className="font-serif text-lg text-[#2C342C]">Seleccionar Fechas</span>
                                            <button onClick={() => setOpenMenu(null)} className="p-2 text-gray-400 hover:text-[#C5A880]">
                                                <X size={20} />
                                            </button>
                                        </div>

                                        <div className="flex justify-center">
                                            <DayPicker
                                                mode="range"
                                                selected={dateRange}
                                                onSelect={setDateRange}
                                                locale={es}
                                                styles={{
                                                    root: { '--rdp-accent-color': '#2C342C', '--rdp-background-color': '#F2F0E9', margin: 0 },
                                                    day: { fontSize: '0.9rem' },
                                                    caption_label: { fontSize: '1rem', color: '#2C342C', fontFamily: 'serif' },
                                                    table: { maxWidth: '100%' }
                                                }}
                                            />
                                        </div>

                                        {/* Botón Guardar (Solo Móvil) */}
                                        <div className="mt-4 pt-3 border-t border-gray-100 md:hidden shrink-0">
                                            <button
                                                onClick={() => setOpenMenu(null)}
                                                className="w-full bg-[#2C342C] text-[#F2F0E9] py-3 rounded-xl font-bold text-xs uppercase tracking-widest shadow-lg flex items-center justify-center gap-2 hover:bg-[#1A211B]"
                                            >
                                                Guardar Fechas <Check size={16} />
                                            </button>
                                        </div>
                                    </motion.div>
                                </>
                            )}
                        </AnimatePresence>
                    </div>


                    {/* --- 2. SECCIÓN HUÉSPEDES --- */}
                    <div className="relative md:pl-4 border-r border-gray-100">
                        <div
                            onClick={() => toggleMenu('guests')}
                            className="flex flex-col gap-2 group cursor-pointer"
                        >
                            <div className="flex items-center gap-2 text-[#2C342C]/50 group-hover:text-[#C5A880] transition-colors">
                                <Users size={16} />
                                <span className="text-[10px] font-bold uppercase tracking-widest">Huéspedes</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="font-serif text-[#2C342C] text-lg">
                                    {guests.adults} Adultos, {guests.children} Niños
                                </span>
                                <ChevronDown size={14} className={`text-[#2C342C]/30 transition-transform ${openMenu === 'guests' ? 'rotate-180' : ''}`} />
                            </div>
                        </div>

                        <AnimatePresence>
                            {openMenu === 'guests' && (
                                <>
                                    {isMobile && (
                                        <motion.div
                                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
                                            onClick={() => setOpenMenu(null)}
                                        />
                                    )}

                                    <motion.div
                                        {...animVariants}
                                        className={`${popupClasses} ${!isMobile ? 'w-72 cursor-default' : ''}`}
                                        onMouseDown={(e) => e.stopPropagation()}
                                    >
                                        {/* Header Móvil */}
                                        <div className="flex md:hidden justify-between items-center mb-6 pb-2 border-b border-gray-100">
                                            <span className="font-serif text-lg text-[#2C342C]">Huéspedes</span>
                                            <button onClick={() => setOpenMenu(null)}><X size={20} className="text-gray-400" /></button>
                                        </div>

                                        {/* Contadores */}
                                        <div className="space-y-6">
                                            <div className="flex justify-between items-center">
                                                <div>
                                                    <p className="font-serif text-[#2C342C] text-lg">Adultos</p>
                                                    <p className="text-xs text-gray-400">Desde 13 años</p>
                                                </div>
                                                <div className="flex items-center gap-4">
                                                    <button
                                                        onClick={() => setGuests(p => ({ ...p, adults: Math.max(1, p.adults - 1) }))}
                                                        className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-[#F2F0E9] text-[#2C342C]"
                                                    ><Minus size={16} /></button>
                                                    <span className="font-bold w-4 text-center text-[#2C342C] text-lg">{guests.adults}</span>
                                                    <button
                                                        onClick={() => setGuests(p => ({ ...p, adults: Math.max(1, p.adults + 1) }))}
                                                        className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-[#F2F0E9] text-[#2C342C]"
                                                    ><Plus size={16} /></button>
                                                </div>
                                            </div>

                                            <div className="flex justify-between items-center">
                                                <div>
                                                    <p className="font-serif text-[#2C342C] text-lg">Niños</p>
                                                    <p className="text-xs text-gray-400">2 - 12 años</p>
                                                </div>
                                                <div className="flex items-center gap-4">
                                                    <button
                                                        onClick={() => setGuests(p => ({ ...p, children: Math.max(0, p.children - 1) }))}
                                                        className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-[#F2F0E9] text-[#2C342C]"
                                                    ><Minus size={16} /></button>
                                                    <span className="font-bold w-4 text-center text-[#2C342C] text-lg">{guests.children}</span>
                                                    <button
                                                        onClick={() => setGuests(p => ({ ...p, children: Math.max(0, p.children + 1) }))}
                                                        className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-[#F2F0E9] text-[#2C342C]"
                                                    ><Plus size={16} /></button>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Botón Guardar (Solo Móvil) */}
                                        <div className="mt-8 pt-4 border-t border-gray-100 md:hidden">
                                            <button
                                                onClick={() => setOpenMenu(null)}
                                                className="w-full bg-[#2C342C] text-[#F2F0E9] py-3 rounded-xl font-bold text-xs uppercase tracking-widest shadow-lg flex items-center justify-center gap-2"
                                            >
                                                Listo <Check size={16} />
                                            </button>
                                        </div>
                                    </motion.div>
                                </>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* --- 3. SECCIÓN SUITE --- */}
                    <div className="relative md:pl-4">
                        <div
                            onClick={() => toggleMenu('room')}
                            className="flex flex-col gap-2 group cursor-pointer"
                        >
                            <div className="flex items-center gap-2 text-[#2C342C]/50 group-hover:text-[#C5A880] transition-colors">
                                <BedDouble size={16} />
                                <span className="text-[10px] font-bold uppercase tracking-widest">Suite</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="font-serif text-[#2C342C] text-lg truncate block max-w-[120px]">{roomType}</span>
                                <ChevronDown size={14} className={`text-[#2C342C]/30 transition-transform ${openMenu === 'room' ? 'rotate-180' : ''}`} />
                            </div>
                        </div>

                        <AnimatePresence>
                            {openMenu === 'room' && (
                                <>
                                    {isMobile && (
                                        <motion.div
                                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
                                            onClick={() => setOpenMenu(null)}
                                        />
                                    )}

                                    <motion.div
                                        {...animVariants}
                                        className={`${popupClasses} ${!isMobile ? 'w-64 py-2 cursor-default' : ''}`}
                                        onMouseDown={(e) => e.stopPropagation()}
                                    >
                                        {/* Header Móvil */}
                                        <div className="flex md:hidden justify-between items-center mb-4 pb-2 border-b border-gray-100">
                                            <span className="font-serif text-lg text-[#2C342C]">Preferencia Suite</span>
                                            <button onClick={() => setOpenMenu(null)}><X size={20} className="text-gray-400" /></button>
                                        </div>

                                        {['Cualquier Suite', 'Ocean Villa', 'Garden Suite', 'The Penthouse'].map((room) => (
                                            <div
                                                key={room}
                                                onClick={() => { setRoomType(room); setOpenMenu(null); }}
                                                className={`px-4 py-3 hover:bg-[#F2F0E9] cursor-pointer transition-colors flex items-center justify-between rounded-lg
                                                ${roomType === room ? 'bg-[#F2F0E9] font-bold text-[#1A211B]' : 'text-gray-600'}`}
                                            >
                                                <span className="text-sm font-serif">{room}</span>
                                                {roomType === room && <div className="w-2 h-2 rounded-full bg-[#C5A880]"></div>}
                                            </div>
                                        ))}
                                    </motion.div>
                                </>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* BOTÓN DE ACCIÓN */}
                <button
                    onClick={handleSearch}
                    className="w-full md:w-auto bg-[#2C342C] text-[#F2F0E9] px-10 py-6 rounded-[2rem] font-bold text-xs uppercase tracking-widest hover:bg-[#1A211B] transition-colors shadow-xl shadow-[#2C342C]/20 whitespace-nowrap active:scale-95 duration-200"
                >
                    Consultar Disponibilidad
                </button>
            </motion.div>
        </div>
    );
};

export default BookingWidget;