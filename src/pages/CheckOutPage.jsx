import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, Lock, CheckCircle, Calendar, Users, ShieldCheck, Tag, Gift, Wifi, Coffee, Sparkles } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

// BASE DE DATOS DE CÓDIGOS
const PROMO_CODES = {
    'WELCOME2026': { type: 'percent', value: 0.15, minNights: 1, label: '15% Descuento Bienvenida' },
    'WINTER26': { type: 'free_night', value: 1, minNights: 4, label: '4ta Noche Gratis (Invierno)' },
    'WARMTH': { type: 'fixed', value: 100, minNights: 2, label: '$100 USD Crédito Spa' }
};

const CheckoutPage = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    // 1. RECUPERAR DATOS URL
    const roomName = searchParams.get('roomName') || "Oceanfront Villa";
    const pricePerNight = parseInt(searchParams.get('price') || "450");
    const nights = parseInt(searchParams.get('nights') || "1");
    const checkInRaw = searchParams.get('checkIn');
    const checkOutRaw = searchParams.get('checkOut');
    const promoFromUrl = searchParams.get('promo'); // Código que viene del BookingPage

    // Formateo de fechas
    const displayCheckIn = checkInRaw ? format(new Date(checkInRaw), 'dd MMM yyyy', { locale: es }) : "N/A";
    const displayCheckOut = checkOutRaw ? format(new Date(checkOutRaw), 'dd MMM yyyy', { locale: es }) : "N/A";

    // ESTADOS
    const [promoInput, setPromoInput] = useState('');
    const [appliedPromo, setAppliedPromo] = useState(null);
    const [promoError, setPromoError] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    // 2. FUNCIÓN DE VALIDACIÓN Y APLICACIÓN
    const validateAndApplyCode = (codeToTest) => {
        setPromoError('');

        if (!codeToTest) return;

        const code = codeToTest.trim().toUpperCase();
        const promo = PROMO_CODES[code];

        // Llenamos el input para que el usuario vea el código
        setPromoInput(code);

        if (!promo) {
            setPromoError('El código no es válido.');
            setAppliedPromo(null);
            return;
        }

        // Validaciones condicionales
        if (nights < promo.minNights) {
            setPromoError(`La oferta ${code} requiere mínimo ${promo.minNights} noches de estancia.`);
            setAppliedPromo(null);
            return;
        }

        // Si pasa todo, lo aplicamos
        setAppliedPromo({ ...promo, code });
        setPromoError('');
    };

    // 3. EFECTO: INTENTAR APLICAR CÓDIGO AL CARGAR
    useEffect(() => {
        if (promoFromUrl) {
            validateAndApplyCode(promoFromUrl);
        }
        // Scroll arriba
        window.scrollTo(0, 0);
    }, []);

    // 4. LÓGICA DE CÁLCULO FINANCIERO
    const calculateTotals = () => {
        const baseSubtotal = pricePerNight * nights;
        let discountAmount = 0;

        if (appliedPromo) {
            if (appliedPromo.type === 'percent') {
                discountAmount = baseSubtotal * appliedPromo.value;
            } else if (appliedPromo.type === 'free_night') {
                discountAmount = pricePerNight * appliedPromo.value;
            } else if (appliedPromo.type === 'fixed') {
                discountAmount = appliedPromo.value;
            }
        }

        const finalSubtotal = Math.max(0, baseSubtotal - discountAmount);
        const taxes = finalSubtotal * 0.16;
        const serviceFee = finalSubtotal * 0.05;
        const total = finalSubtotal + taxes + serviceFee;

        return { baseSubtotal, discountAmount, taxes, serviceFee, total };
    };

    const { baseSubtotal, discountAmount, taxes, serviceFee, total } = calculateTotals();

    // MANEJO MANUAL (Botón "Aplicar")
    const handleApplyManual = () => {
        validateAndApplyCode(promoInput);
    };

    const handlePayment = (e) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setSuccess(true);
        }, 2000);
    };

    if (success) {
        return (
            <div className="min-h-screen bg-[#F9F9F7] flex flex-col items-center justify-center p-6 text-center">
                <div className="w-24 h-24 bg-[#2C342C] rounded-full flex items-center justify-center text-[#C5A880] mb-6 shadow-2xl">
                    <CheckCircle size={48} />
                </div>
                <h2 className="font-serif text-4xl text-[#2C342C] mb-4">¡Reserva Confirmada!</h2>
                <p className="text-gray-500 max-w-md mb-8">
                    Tu código de referencia es <strong>#ALY-{Math.floor(Math.random() * 10000)}</strong>. Hemos enviado los detalles a tu correo.
                </p>
                <button onClick={() => navigate('/')} className="bg-[#C5A880] text-white px-8 py-3 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-[#b0926b] transition-all">
                    Volver al Inicio
                </button>
            </div>
        );
    }

    return (
        <div className="bg-[#F9F9F7] min-h-screen font-sans selection:bg-[#2C342C] selection:text-white">
            <div className="bg-white shadow-sm sticky top-0 z-40">
                <Navbar />
            </div>

            <div className="max-w-[1200px] mx-auto px-6 py-12">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-gray-500 hover:text-[#C5A880] transition-colors mb-8 group"
                >
                    <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="text-xs font-bold uppercase tracking-widest">Volver a Selección</span>
                </button>

                <div className="flex flex-col-reverse lg:flex-row gap-12">

                    {/* COLUMNA IZQUIERDA: FORMULARIO */}
                    <div className="w-full lg:w-2/3">
                        <h1 className="font-serif text-3xl md:text-4xl text-[#2C342C] mb-8">Finalizar Reserva</h1>

                        <form onSubmit={handlePayment} className="space-y-8">
                            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-[#2C342C]/5">
                                <h3 className="font-serif text-xl text-[#2C342C] mb-6">1. Información del Huésped</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <input required type="text" className="w-full bg-[#F9F9F7] border border-gray-200 rounded-xl p-3 focus:outline-none focus:border-[#C5A880]" placeholder="Nombre" />
                                    <input required type="text" className="w-full bg-[#F9F9F7] border border-gray-200 rounded-xl p-3 focus:outline-none focus:border-[#C5A880]" placeholder="Apellido" />
                                    <input required type="email" className="w-full bg-[#F9F9F7] border border-gray-200 rounded-xl p-3 focus:outline-none focus:border-[#C5A880] md:col-span-2" placeholder="Email" />
                                </div>
                            </div>

                            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-[#2C342C]/5">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="font-serif text-xl text-[#2C342C]">2. Método de Pago</h3>
                                    <div className="flex gap-2 text-gray-400"><CreditCard size={20} /><Lock size={20} /></div>
                                </div>
                                <div className="space-y-6">
                                    <input required type="text" className="w-full bg-white border border-gray-200 rounded-xl p-3 focus:outline-none focus:border-[#C5A880] font-mono" placeholder="Número de Tarjeta" />
                                    <div className="grid grid-cols-2 gap-6">
                                        <input required type="text" className="w-full bg-white border border-gray-200 rounded-xl p-3 font-mono" placeholder="MM/YY" />
                                        <input required type="text" className="w-full bg-white border border-gray-200 rounded-xl p-3 font-mono" placeholder="CVC" />
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-[#2C342C] text-white py-5 rounded-full font-bold text-sm uppercase tracking-widest hover:bg-[#1A211B] transition-all shadow-xl flex justify-center items-center gap-3"
                            >
                                {loading ? <span className="animate-spin h-5 w-5 border-2 border-white/30 border-t-white rounded-full"></span> : `Pagar $${total.toLocaleString()} MXN`}
                            </button>
                        </form>
                    </div>

                    {/* COLUMNA DERECHA: RESUMEN */}
                    <div className="w-full lg:w-1/3">
                        <div className="sticky top-32 space-y-6">

                            <div className="bg-white p-8 rounded-[2rem] shadow-xl ring-1 ring-black/5 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-[#C5A880] rounded-full blur-[60px] opacity-10 pointer-events-none"></div>

                                <h3 className="font-serif text-xl text-[#2C342C] mb-6 relative z-10">Tu Estancia</h3>

                                <div className="mb-6 pb-6 border-b border-gray-100 relative z-10">
                                    <p className="text-[#C5A880] text-[10px] font-bold uppercase tracking-widest mb-1">Habitación Seleccionada</p>
                                    <p className="font-serif text-2xl text-[#2C342C] leading-none mb-4">{roomName}</p>

                                    <div className="bg-[#F9F9F7] p-4 rounded-xl">
                                        <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3 flex items-center gap-2">
                                            <Gift size={12} /> Amenidades Incluidas
                                        </p>
                                        <ul className="grid grid-cols-2 gap-y-2">
                                            <li className="text-xs text-gray-600 flex items-center gap-2"><Wifi size={10} /> Wifi Alta Vel.</li>
                                            <li className="text-xs text-gray-600 flex items-center gap-2"><Coffee size={10} /> Desayuno</li>
                                            <li className="text-xs text-gray-600 flex items-center gap-2"><Sparkles size={10} /> Limpieza</li>
                                            <li className="text-xs text-gray-600 flex items-center gap-2"><ShieldCheck size={10} /> Seguro</li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 mb-6 pb-6 border-b border-gray-100 relative z-10">
                                    <div>
                                        <div className="flex items-center gap-2 text-gray-400 mb-1">
                                            <Calendar size={14} /> <span className="text-[10px] font-bold uppercase tracking-widest">Entrada</span>
                                        </div>
                                        <p className="text-sm font-medium text-[#2C342C] capitalize">{displayCheckIn}</p>
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 text-gray-400 mb-1">
                                            <Calendar size={14} /> <span className="text-[10px] font-bold uppercase tracking-widest">Salida</span>
                                        </div>
                                        <p className="text-sm font-medium text-[#2C342C] capitalize">{displayCheckOut}</p>
                                    </div>
                                </div>

                                {/* CÓDIGO DE DESCUENTO */}
                                <div className="mb-6 pb-6 border-b border-gray-100 relative z-10">
                                    <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Código Promocional</p>

                                    {!appliedPromo ? (
                                        <div className="flex gap-2">
                                            <div className="relative flex-1">
                                                <Tag size={14} className="absolute left-3 top-3 text-gray-400" />
                                                <input
                                                    type="text"
                                                    value={promoInput}
                                                    onChange={(e) => setPromoInput(e.target.value)}
                                                    placeholder="Ej: WELCOME2026"
                                                    className="w-full bg-[#F9F9F7] border border-gray-200 rounded-lg py-2 pl-9 pr-2 text-sm uppercase focus:outline-none focus:border-[#C5A880]"
                                                />
                                            </div>
                                            <button
                                                onClick={handleApplyManual}
                                                className="bg-[#2C342C] text-white px-4 rounded-lg text-xs font-bold uppercase hover:bg-black transition-colors"
                                            >
                                                Aplicar
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="bg-[#C5A880]/10 border border-[#C5A880]/30 rounded-lg p-3 flex justify-between items-center">
                                            <div>
                                                <p className="text-xs font-bold text-[#C5A880] flex items-center gap-1">
                                                    <Tag size={12} /> {appliedPromo.code}
                                                </p>
                                                <p className="text-[10px] text-gray-600">{appliedPromo.label}</p>
                                            </div>
                                            <button onClick={() => { setAppliedPromo(null); setPromoInput(''); }} className="text-xs text-gray-400 hover:text-red-500 underline">Quitar</button>
                                        </div>
                                    )}
                                    {promoError && <p className="text-[10px] text-red-500 mt-2 font-medium bg-red-50 p-2 rounded-lg">{promoError}</p>}
                                </div>

                                {/* DESGLOSE FINANCIERO */}
                                <div className="space-y-3 text-sm text-gray-600 mb-6 relative z-10">
                                    <div className="flex justify-between">
                                        <span>${pricePerNight.toLocaleString()} x {nights} noches</span>
                                        <span>${baseSubtotal.toLocaleString()}</span>
                                    </div>

                                    {appliedPromo && (
                                        <div className="flex justify-between text-[#C5A880] font-medium">
                                            <span>Descuento aplicado</span>
                                            <span>- ${discountAmount.toLocaleString()}</span>
                                        </div>
                                    )}

                                    <div className="flex justify-between">
                                        <span>Impuestos y tasas (16%)</span>
                                        <span>${taxes.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Cargo por servicio (5%)</span>
                                        <span>${serviceFee.toLocaleString()}</span>
                                    </div>
                                </div>

                                {/* TOTAL */}
                                <div className="pt-6 border-t border-gray-100 flex justify-between items-baseline relative z-10">
                                    <span className="font-bold text-[#2C342C]">Total (MXN)</span>
                                    <span className="font-serif text-3xl text-[#2C342C]">${total.toLocaleString()}</span>
                                </div>
                            </div>

                            <div className="text-center">
                                <p className="text-[10px] text-gray-400 uppercase tracking-widest flex items-center justify-center gap-2">
                                    <ShieldCheck size={12} /> Mejor precio garantizado
                                </p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default CheckoutPage;