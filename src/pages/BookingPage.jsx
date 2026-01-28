import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import {
    Calendar, Calculator, Info, MapPin,
    ArrowRight, Star, Users, Check, Edit2
} from 'lucide-react';

// --- BASE DE DATOS MOCK ---
const ROOMS_DB = [
    {
        id: "ocean-villa",
        matchName: "Ocean Villa",
        displayName: "Oceanfront Villa",
        price: 450,
        size: "85m²",
        maxAdults: 2,
        maxChildren: 2,
        bed: "King Size",
        desc: "Despierta con el sonido de las olas. Acceso directo a playa privada.",
        features: ["Vista al Mar", "Piscina Privada", "Desayuno", "Mayordomo"],
        image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070&auto=format&fit=crop"
    },
    {
        id: "garden-suite",
        matchName: "Garden Suite",
        displayName: "Garden Sanctuary Suite",
        price: 320,
        size: "60m²",
        maxAdults: 2,
        maxChildren: 1,
        bed: "Queen Size",
        desc: "Un refugio de paz rodeado de flora tropical y diseño zen.",
        features: ["Jardín Zen", "Tina de Piedra", "Terraza", "Smart Home"],
        image: "https://images.unsplash.com/photo-1591088398332-8a7791972843?q=80&w=1974&auto=format&fit=crop"
    },
    {
        id: "penthouse",
        matchName: "The Penthouse",
        displayName: "The Horizon Penthouse",
        price: 890,
        size: "120m²",
        maxAdults: 4,
        maxChildren: 0,
        bed: "2 King Size",
        desc: "La joya de la corona. Vistas panorámicas y privacidad absoluta.",
        features: ["Vista 360°", "Jacuzzi Rooftop", "Bar Privado", "Chofer"],
        image: "https://images.unsplash.com/photo-1602002418082-a4443e081dd1?q=80&w=1974&auto=format&fit=crop"
    }
];

const BookingPage = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    // RECUPERAR DATOS URL
    const checkIn = searchParams.get('checkIn') ? new Date(searchParams.get('checkIn')) : new Date();
    const checkOut = searchParams.get('checkOut') ? new Date(searchParams.get('checkOut')) : new Date();
    const adults = parseInt(searchParams.get('adults') || 2);
    const children = parseInt(searchParams.get('children') || 0);
    const selectedRoomType = searchParams.get('roomType') || "Cualquier Suite";

    // CÁLCULOS
    const diffTime = Math.abs(checkOut - checkIn);
    const nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
    const formattedDates = `${format(checkIn, 'dd MMM', { locale: es })} - ${format(checkOut, 'dd MMM yyyy', { locale: es })}`;
    const handleBooking = (room) => {
        // 1. Formateamos las fechas para que sean strings seguros en la URL
        // Usamos 'yyyy-MM-dd' para que sea fácil de leer por cualquier sistema
        const checkInStr = format(checkIn, 'yyyy-MM-dd');
        const checkOutStr = format(checkOut, 'yyyy-MM-dd');

        // 2. Construimos la URL con parámetros
        const params = new URLSearchParams({
            roomName: room.matchName,
            price: room.price.toString(),
            nights: nights.toString(),
            checkIn: checkInStr,
            checkOut: checkOutStr,
            adults: adults.toString(),
            children: children.toString()
        });

        // 3. Navegamos
        navigate(`/checkout?${params.toString()}`);
    };
    // ORDENAMIENTO
    const sortedRooms = [...ROOMS_DB].sort((a, b) => {
        if (selectedRoomType === "Cualquier Suite") return 0;
        return a.matchName === selectedRoomType ? -1 : 1;
    });

    return (
        <div className="bg-[#F9F9F7] min-h-screen font-sans selection:bg-[#2C342C] selection:text-white">

            {/* Navbar pegajoso */}
            <div className="bg-white shadow-sm sticky top-0 z-40">
                <Navbar />
            </div>

            <div className="max-w-[1400px] mx-auto px-6 py-12">

                {/* ENCABEZADO (Con separación extra añadida mt-8) */}
                <div className="mb-12 mt-8">
                    <div className="flex items-center gap-2 text-[#C5A880] mb-2">
                        <Calendar size={18} />
                        <span className="text-xs font-bold uppercase tracking-widest">
                            Disponibilidad confirmada • {nights} Noches
                        </span>
                    </div>
                    <h1 className="font-serif text-4xl md:text-5xl text-[#2C342C]">
                        {selectedRoomType === "Cualquier Suite"
                            ? "Nuestras Suites Disponibles"
                            : `Disponibilidad para "${selectedRoomType}"`}
                    </h1>
                </div>

                <div className="flex flex-col lg:flex-row gap-12">

                    {/* COLUMNA IZQUIERDA: RESULTADOS */}
                    <div className="w-full lg:w-2/3 space-y-8">
                        {sortedRooms.map((room) => {
                            const isSelected = room.matchName === selectedRoomType;
                            const totalPrice = room.price * nights;

                            return (
                                <div
                                    key={room.id}
                                    className={`bg-white rounded-[2rem] overflow-hidden transition-all duration-300 flex flex-col md:flex-row group relative
                            ${isSelected ? 'border-2 border-[#C5A880] shadow-xl ring-4 ring-[#C5A880]/10' : 'border border-[#2C342C]/5 shadow-sm hover:shadow-lg'}`}
                                >
                                    {isSelected && (
                                        <div className="absolute top-0 left-0 bg-[#C5A880] text-white text-[10px] font-bold uppercase tracking-widest px-4 py-2 z-20 rounded-br-xl">
                                            Tu Selección
                                        </div>
                                    )}

                                    {/* Imagen */}
                                    <div className="w-full md:w-2/5 relative overflow-hidden h-64 md:h-auto">
                                        <img
                                            src={room.image}
                                            alt={room.displayName}
                                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                    </div>

                                    {/* Contenido */}
                                    <div className="w-full md:w-3/5 p-8 flex flex-col justify-between">
                                        <div>
                                            <div className="flex justify-between items-start mb-2">
                                                <div>
                                                    <h3 className="font-serif text-2xl text-[#2C342C]">{room.displayName}</h3>
                                                    <p className="text-xs text-gray-400 mt-1">{room.size} • Capacidad: {room.maxAdults} Adultos</p>
                                                </div>
                                            </div>

                                            <p className="text-gray-500 text-sm leading-relaxed mb-6 border-l-2 border-[#C5A880]/30 pl-4">
                                                {room.desc}
                                            </p>

                                            <div className="grid grid-cols-2 gap-2 mb-6">
                                                {room.features.map((feature, idx) => (
                                                    <div key={idx} className="flex items-center gap-2 text-xs text-gray-600">
                                                        <div className="w-4 h-4 rounded-full bg-[#F2F0E9] flex items-center justify-center text-[#C5A880]">
                                                            <Check size={10} />
                                                        </div>
                                                        {feature}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* FOOTER TARJETA: Aquí está la acción principal */}
                                        <div className="bg-[#F9F9F7] -mx-8 -mb-8 p-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                                            <div>
                                                <div className="flex items-center gap-2 text-xs text-gray-400 mb-1">
                                                    <span>${room.price} x {nights} noches</span>
                                                    <Info size={12} className="cursor-help" title="Impuestos no incluidos" />
                                                </div>
                                                <div className="flex items-baseline gap-1">
                                                    <span className="font-serif text-3xl text-[#2C342C]">${totalPrice.toLocaleString()}</span>
                                                    <span className="text-sm text-gray-500 font-bold">Total</span>
                                                </div>
                                            </div>

                                            <button
                                                onClick={() => handleBooking(room)} // <--- AQUÍ EL CAMBIO
                                                className={`px-8 py-3 rounded-full font-bold text-xs uppercase tracking-widest transition-all flex items-center gap-2 shadow-lg
    ${isSelected ? 'bg-[#C5A880] text-white hover:bg-[#b0926b]' : 'bg-[#2C342C] text-white hover:bg-[#1A211B]'}`}
                                            >
                                                Reservar Ahora <ArrowRight size={14} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* COLUMNA DERECHA: RESUMEN FLOTANTE (Solo Información) */}
                    <div className="w-full lg:w-1/3 relative hidden lg:block">
                        <div className="sticky top-32">
                            <div className="bg-[#2C342C] text-[#F2F0E9] p-8 rounded-[2rem] shadow-2xl relative overflow-hidden ring-4 ring-white">

                                {/* Decoración sutil */}
                                <div className="absolute top-0 right-0 w-40 h-40 bg-[#C5A880] rounded-full blur-[80px] opacity-20 pointer-events-none"></div>

                                <div className="relative z-10">
                                    <h3 className="font-serif text-2xl mb-1">Resumen de Viaje</h3>
                                    <p className="text-white/40 text-xs mb-6">Detalles de tu búsqueda actual</p>

                                    <div className="space-y-6">
                                        {/* Fechas */}
                                        <div className="flex gap-4 group cursor-pointer hover:bg-white/5 p-2 rounded-lg transition-colors" onClick={() => navigate('/')}>
                                            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#C5A880]">
                                                <Calendar size={20} />
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex justify-between items-center">
                                                    <p className="text-[10px] font-bold uppercase tracking-widest text-white/50">Fechas</p>
                                                    <Edit2 size={12} className="opacity-0 group-hover:opacity-100 transition-opacity text-[#C5A880]" />
                                                </div>
                                                <p className="font-serif text-lg leading-tight mt-1">{formattedDates}</p>
                                            </div>
                                        </div>

                                        {/* Huéspedes */}
                                        <div className="flex gap-4 group cursor-pointer hover:bg-white/5 p-2 rounded-lg transition-colors" onClick={() => navigate('/')}>
                                            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#C5A880]">
                                                <Users size={20} />
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex justify-between items-center">
                                                    <p className="text-[10px] font-bold uppercase tracking-widest text-white/50">Huéspedes</p>
                                                    <Edit2 size={12} className="opacity-0 group-hover:opacity-100 transition-opacity text-[#C5A880]" />
                                                </div>
                                                <p className="font-serif text-lg leading-tight mt-1">
                                                    {adults} Adultos
                                                    {children > 0 && `, ${children} Niños`}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-8 pt-6 border-t border-white/10">
                                        {/* Botón Secundario (Discreto) */}
                                        <button
                                            onClick={() => navigate('/')}
                                            className="w-full py-3 text-xs font-bold uppercase tracking-widest text-[#C5A880] hover:text-white hover:bg-white/10 border border-[#C5A880]/30 rounded-xl transition-all flex items-center justify-center gap-2"
                                        >
                                            <Calculator size={14} /> Cambiar Búsqueda
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 flex items-center justify-center gap-2 text-gray-400 text-xs">
                                <MapPin size={12} />
                                <span>Mejor precio garantizado reservando aquí.</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <Footer />
        </div>
    );
};

export default BookingPage;