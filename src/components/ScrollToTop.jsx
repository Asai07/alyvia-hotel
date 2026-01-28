import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLenis } from 'lenis/react';

const ScrollToTop = () => {
    const { pathname } = useLocation();
    const lenis = useLenis();

    useEffect(() => {
        // 1. Forzar scroll nativo inmediato
        window.scrollTo(0, 0);

        // 2. Si Lenis está activo, forzar su reinicio sin animación (immediate: true)
        if (lenis) {
            lenis.scrollTo(0, { immediate: true });
        }
    }, [pathname, lenis]); // Se ejecuta cada vez que cambia la ruta

    return null; // Este componente no renderiza nada visual
};

export default ScrollToTop;