import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CalendarDays, Users, BedDouble, ChevronDown, Minus, Plus } from 'lucide-react';
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

    // Referencias
    const widgetRef = useRef(null);
    const calendarPopupRef = useRef(null);
    const navigate = useNavigate(); // <--- Hook de navegación

    const handleSearch = () => {
        // 1. Validar que haya fechas seleccionadas
        if (!dateRange?.from || !dateRange?.to) {
            alert("Por favor selecciona las fechas de tu estadía.");
            return;
        }

        // 2. Crear la URL con parámetros (Query Params)
        // Esto es el estándar web para compartir búsquedas
        const params = new URLSearchParams({
            checkIn: dateRange.from.toISOString(),
            checkOut: dateRange.to.toISOString(),
            adults: guests.adults,
            children: guests.children,
            roomType: roomType
        });

        // 3. Redirigir a la página de resultados (que crearemos luego)
        // La URL se verá tipo: /booking?checkIn=2026-01-27&adults=2...
        navigate(`/booking?${params.toString()}`);
    };
    // --- MANEJO DE CLICS EXTERNOS ---
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!openMenu) return;
            const isClickInsideWidget = widgetRef.current && widgetRef.current.contains(event.target);
            const isClickInsidePopup = calendarPopupRef.current && calendarPopupRef.current.contains(event.target);

            if (!isClickInsideWidget && !isClickInsidePopup) {
                setOpenMenu(null);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [openMenu]);

    // --- POSICIÓN INTELIGENTE ---
    const toggleMenu = (menu) => {
        if (openMenu === menu) {
            setOpenMenu(null);
            return;
        }
        if (widgetRef.current) {
            const rect = widgetRef.current.getBoundingClientRect();
            const spaceBelow = window.innerHeight - rect.bottom;
            setMenuPlacement(spaceBelow < 350 ? 'top' : 'bottom');
        }
        setOpenMenu(menu);
    };

    const formatDateDisplay = () => {
        if (dateRange?.from) {
            if (dateRange.to) {
                return `${format(dateRange.from, 'dd MMM', { locale: es })} - ${format(dateRange.to, 'dd MMM', { locale: es })}`;
            }
            return format(dateRange.from, 'dd MMM', { locale: es }) + " - (Selecciona salida)";
        }
        return "Seleccionar fechas";
    };


    // Clases dinámicas de posición
    const popupClasses = `absolute left-0 z-50 bg-white p-6 rounded-[2rem] shadow-2xl border border-gray-100 overflow-hidden 
        ${menuPlacement === 'top' ? 'bottom-full mb-4' : 'top-full mt-4'}`;

    const animProps = {
        initial: { opacity: 0, y: menuPlacement === 'top' ? 10 : -10, scale: 0.95 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: menuPlacement === 'top' ? 10 : -10, scale: 0.95 },
        transition: { duration: 0.2 }
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
                                <motion.div
                                    ref={calendarPopupRef}
                                    {...animProps}
                                    className={popupClasses}
                                    // STOP PROPAGATION: Esto evita el cierre al clickear dentro
                                    onMouseDown={(e) => e.stopPropagation()}
                                >
                                    <DayPicker
                                        mode="range"
                                        selected={dateRange}
                                        onSelect={setDateRange}
                                        locale={es}
                                        showOutsideDays
                                        styles={{
                                            root: {
                                                '--rdp-accent-color': '#2C342C',
                                                '--rdp-accent-color-dark': '#2C342C',
                                                '--rdp-background-color': '#F2F0E9',
                                            },

                                            caption_label: {
                                                fontFamily: 'ui-serif, Georgia, serif',
                                                fontSize: '1.1rem',
                                                color: '#2C342C',
                                                textTransform: 'capitalize',
                                            },

                                            nav_button: {
                                                color: '#2C342C',
                                                borderRadius: '999px',
                                            },

                                            day: {
                                                width: 42,
                                                height: 42,
                                                fontSize: '0.85rem',
                                                fontWeight: 500,
                                                color: '#2C342C',
                                                borderRadius: '999px',
                                            },

                                            day_today: {
                                                color: '#C5A880',
                                                fontWeight: 700,
                                            },

                                            day_selected: {
                                                backgroundColor: '#2C342C',
                                                color: '#F2F0E9',
                                            },

                                            day_range_start: {
                                                backgroundColor: '#2C342C',
                                                color: '#F2F0E9',
                                            },

                                            day_range_end: {
                                                backgroundColor: '#2C342C',
                                                color: '#F2F0E9',
                                            },

                                            day_range_middle: {
                                                backgroundColor: '#F2F0E9',
                                                color: '#2C342C',
                                            },
                                        }}
                                    />


                                </motion.div>
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
                                <motion.div
                                    {...animProps}
                                    className={`w-64 cursor-default ${popupClasses}`}
                                    onMouseDown={(e) => e.stopPropagation()}
                                >
                                    {/* Contador Adultos */}
                                    <div className="flex justify-between items-center mb-6">
                                        <div>
                                            <p className="font-serif text-[#2C342C]">Adultos</p>
                                            <p className="text-xs text-gray-400">Desde 13 años</p>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <button
                                                onClick={() => setGuests(p => ({ ...p, adults: Math.max(1, p.adults - 1) }))}
                                                className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-[#F2F0E9] text-[#2C342C] transition-colors"
                                            ><Minus size={14} /></button>
                                            <span className="font-bold w-4 text-center text-[#2C342C]">{guests.adults}</span>
                                            <button
                                                onClick={() => setGuests(p => ({ ...p, adults: Math.max(1, p.adults + 1) }))}
                                                className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-[#F2F0E9] text-[#2C342C] transition-colors"
                                            ><Plus size={14} /></button>
                                        </div>
                                    </div>

                                    {/* Contador Niños */}
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <p className="font-serif text-[#2C342C]">Niños</p>
                                            <p className="text-xs text-gray-400">2 - 12 años</p>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <button
                                                onClick={() => setGuests(p => ({ ...p, children: Math.max(0, p.children - 1) }))}
                                                className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-[#F2F0E9] text-[#2C342C] transition-colors"
                                            ><Minus size={14} /></button>
                                            <span className="font-bold w-4 text-center text-[#2C342C]">{guests.children}</span>
                                            <button
                                                onClick={() => setGuests(p => ({ ...p, children: Math.max(0, p.children + 1) }))}
                                                className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-[#F2F0E9] text-[#2C342C] transition-colors"
                                            ><Plus size={14} /></button>
                                        </div>
                                    </div>
                                </motion.div>
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
                                <span className="font-serif text-[#2C342C] text-lg truncate">{roomType}</span>
                                <ChevronDown size={14} className={`text-[#2C342C]/30 transition-transform ${openMenu === 'room' ? 'rotate-180' : ''}`} />
                            </div>
                        </div>

                        <AnimatePresence>
                            {openMenu === 'room' && (
                                <motion.div
                                    {...animProps}
                                    className={`w-60 py-2 ${popupClasses}`}
                                    onMouseDown={(e) => e.stopPropagation()}
                                >
                                    {['Cualquier Suite', 'Ocean Villa', 'Garden Suite', 'The Penthouse'].map((room) => (
                                        <div
                                            key={room}
                                            onClick={() => { setRoomType(room); setOpenMenu(null); }}
                                            className={`px-6 py-3 hover:bg-[#F2F0E9] cursor-pointer transition-colors flex items-center justify-between
                                            ${roomType === room ? 'bg-[#F2F0E9] font-bold text-[#1A211B]' : 'text-gray-600'}`}
                                        >
                                            <span className="text-sm font-serif">{room}</span>
                                            {roomType === room && <div className="w-2 h-2 rounded-full bg-[#C5A880]"></div>}
                                        </div>
                                    ))}
                                </motion.div>
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