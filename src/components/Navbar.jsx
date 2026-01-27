import React from 'react';
import { Search } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
// 1. IMPORTAR HOOK DE LENIS
import { useLenis } from 'lenis/react';

const Navbar = () => {
    const { openBooking } = useBooking();
    const navigate = useNavigate();
    const location = useLocation();
    const lenis = useLenis(); // 2. OBTENER INSTANCIA

    const navLinks = [
        { name: 'Inicio', path: '/', id: 'top' }, // 'top' para volver arriba
        { name: 'Nosotros', path: '/#nosotros', id: 'nosotros' },
        { name: 'Habitaciones', path: '/#habitaciones', id: 'habitaciones' },
        { name: 'Servicios', path: '/#servicios', id: 'servicios' },
        { name: 'Actividades', path: '/#actividades', id: 'actividades' },
        { name: 'Membresía', path: '/#membresia', id: 'membresia' }
    ];

    // 3. FUNCIÓN DE SCROLL INTELIGENTE
    const handleNavClick = (e, link) => {
        // A) ¿Estamos en la página de inicio?
        if (location.pathname === '/') {
            e.preventDefault(); // Evitamos que el navegador salte bruscamente

            if (link.path === '/') {
                // Caso especial: Ir arriba del todo
                lenis?.scrollTo(0, { duration: 1.5 }); // duration opcional para hacerlo más lento/lujoso
            } else {
                // Caso normal: Ir a una sección
                const targetId = link.path.replace('/', ''); // Quitamos la barra -> "#nosotros"

                // Lenis scrollTo acepta selectores CSS
                lenis?.scrollTo(targetId, {
                    offset: -100, // Ajuste para que el Navbar no tape el título (importante)
                    duration: 1.5,
                    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) // Easing suave
                });
            }
        }
        // B) Si NO estamos en Home, dejamos que Link funcione normal
        // (React Router nos llevará a "/", y el navegador buscará el ID)
    };

    return (
        <nav className="w-full py-4 px-8 flex justify-between items-center bg-white/90 backdrop-blur-md z-50 fixed top-0 left-0 right-0 border-b border-[#2C342C]/5 transition-all duration-300">

            {/* Logo - También lo conectamos para que suba suave */}
            <Link
                to="/"
                onClick={(e) => handleNavClick(e, { path: '/' })}
                className="flex items-center gap-2 group cursor-pointer"
            >
                <div className="bg-[#2C342C] text-[#F2F0E9] p-1.5 rounded-full group-hover:bg-[#C5A880] transition-colors">
                    {/* SVG Icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                        <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.591a.75.75 0 101.06 1.061l1.591-1.591zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.591-1.591a.75.75 0 10-1.061 1.06l1.591 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.591a.75.75 0 001.06 1.061l1.591-1.591zM5.25 12a.75.75 0 01-.75.75H2.25a.75.75 0 010-1.5H4.5a.75.75 0 01.75.75zM4.758 4.758a.75.75 0 00-1.061 1.06l1.591 1.591a.75.75 0 101.06-1.061L4.758 4.758z" />
                    </svg>
                </div>
                <span className="text-xl font-bold tracking-tight text-[#2C342C]">Alyvia</span>
            </Link>

            <ul className="hidden lg:flex items-center gap-10 text-xs font-bold uppercase tracking-widest text-[#2C342C]/60">
                {navLinks.map((link) => (
                    <li key={link.name}>
                        <Link
                            to={link.path}
                            onClick={(e) => handleNavClick(e, link)} // <--- INTERCEPTAMOS EL CLIC
                            className="hover:text-[#2C342C] cursor-pointer transition-colors hover:underline decoration-[#C5A880] underline-offset-4 decoration-2"
                        >
                            {link.name}
                        </Link>
                    </li>
                ))}
            </ul>

            <div className="flex items-center gap-4">
                <div className="hidden md:flex items-center bg-[#F2F0E9] rounded-full px-4 py-2.5 border border-[#2C342C]/5 focus-within:border-[#2C342C]/20 transition-colors">
                    <Search size={16} className="text-[#2C342C]/40 mr-2" />
                    <input type="text" placeholder="Buscar..." className="bg-transparent text-sm outline-none w-24 placeholder:text-[#2C342C]/30 text-[#2C342C]" />
                </div>

                <button
                    onClick={() => openBooking()}
                    className="bg-[#2C342C] text-[#F2F0E9] px-6 py-3 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-[#1A211B] transition-all shadow-lg shadow-[#2C342C]/20 hover:shadow-[#2C342C]/40 active:scale-95"
                >
                    Reservar
                </button>
            </div>
        </nav>
    );
};

export default Navbar;