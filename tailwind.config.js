/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['"Plus Jakarta Sans"', 'sans-serif'],
                serif: ['"Playfair Display"', 'serif'], // <--- Nueva fuente de lujo
            },
            colors: {
                olive: {
                    DEFAULT: '#2C342C', // Fondo principal (Verde profundo)
                    light: '#3D463D',   // Para bordes o detalles sutiles
                    accent: '#C5A880',  // Dorado suave para detalles pequeños
                },
                cream: '#F2F0E9',       // El color de las cards (Papel suave)
                forest: '#1A211B',      // Color del texto (Casi negro, pero verde)
            }
        },
    },
    plugins: [],
}