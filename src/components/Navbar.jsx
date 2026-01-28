import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import { useLenis } from 'lenis/react';

const Navbar = () => {
    const { openBooking } = useBooking();
    const navigate = useNavigate();
    const location = useLocation();
    const lenis = useLenis();

    const navLinks = [
        { name: 'Inicio', path: '/', id: 'top' },
        { name: 'Nosotros', path: '/#nosotros', id: 'nosotros' },
        { name: 'Habitaciones', path: '/#habitaciones', id: 'habitaciones' },
        { name: 'Servicios', path: '/#servicios', id: 'servicios' },
        { name: 'Actividades', path: '/#actividades', id: 'actividades' },

    ];

    const handleNavClick = (e, link) => {
        // Solo interceptamos el scroll si ya estamos en la página de inicio
        if (location.pathname === '/') {
            e.preventDefault();

            // 1. Forzamos a Lenis a recalcular las alturas (importante si las imágenes cargaron tarde)
            lenis?.resize();

            if (link.path === '/') {
                // Ir arriba del todo
                lenis?.scrollTo(0, { duration: 1.5 });
            } else {
                // 2. CORRECCIÓN: Usamos 'link.id' directamente (ej: "nosotros") en lugar de procesar el path
                const element = document.getElementById(link.id);

                if (element) {
                    lenis?.scrollTo(element, {
                        offset: -80, // Espacio para que la barra no tape el título
                        duration: 1.5,
                        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
                    });
                }
            }
        }
        // Si no estamos en el inicio (ej: /booking), dejamos que React Router haga su trabajo normal
    };

    return (
        <nav className="w-full py-4 px-8 flex justify-between items-center bg-white/90 backdrop-blur-md z-50 fixed top-0 left-0 right-0 border-b border-[#2C342C]/5 transition-all duration-300">

            {/* Logo */}
            <Link
                to="/"
                onClick={(e) => handleNavClick(e, { path: '/', id: 'top' })}
                className="flex items-center gap-2 group cursor-pointer"
            >
                <div className="bg-[#2C342C] text-[#F2F0E9] p-1.5 rounded-full group-hover:bg-[#C5A880] transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                        <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.591a.75.75 0 101.06 1.061l1.591-1.591zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.591-1.591a.75.75 0 10-1.061 1.06l1.591 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.591a.75.75 0 001.06 1.061l1.591-1.591zM5.25 12a.75.75 0 01-.75.75H2.25a.75.75 0 010-1.5H4.5a.75.75 0 01.75.75zM4.758 4.758a.75.75 0 00-1.061 1.06l1.591 1.591a.75.75 0 101.06-1.061L4.758 4.758z" />
                    </svg>
                </div>
                <span className="text-xl font-bold tracking-tight text-[#2C342C]">Alyvia</span>
            </Link>

            {/* Menú Desktop */}
            <ul className="hidden lg:flex items-center gap-10 text-xs font-bold uppercase tracking-widest text-[#2C342C]/60">
                {navLinks.map((link) => (
                    <li key={link.name}>
                        <Link
                            to={link.path}
                            onClick={(e) => handleNavClick(e, link)}
                            className="hover:text-[#2C342C] cursor-pointer transition-colors hover:underline decoration-[#C5A880] underline-offset-4 decoration-2"
                        >
                            {link.name}
                        </Link>
                    </li>
                ))}
            </ul>

            {/* Botón Reservar */}
            <div className="flex items-center gap-4">
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