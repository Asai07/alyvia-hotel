// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ReactLenis } from 'lenis/react';
import ScrollToTop from './components/ScrollToTop';
import LandingPage from './pages/LandingPage';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import BookingPage from './pages/BookingPage';
import CheckoutPage from './pages/CheckOutPage';
import { BookingProvider } from './context/BookingContext';
import BookingWidgetModal from './components/BookingWidgetModal';
import ServiceBookingPage from './pages/ServiceBookingPage';
import RestaurantBookingPage from './pages/RestaurantBookingPage';
import ExperienceBookingPage from './pages/ExperienceBookingPage';
import AboutPage from './pages/AboutPage';
import EventPlanningPage from './pages/EventPlanningPage';

function App() {
  // CONFIGURACIÓN PREMIUM DE LENIS
  const lenisOptions = {
    duration: 1.5,      // Cuánto tarda en frenar (más alto = más suave/pesado)
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Curva de suavizado
    smoothWheel: true,  // Scroll suave con rueda de ratón
    smoothTouch: true,  // <--- ESTA ES LA CLAVE: Activa el efecto en móvil
    touchMultiplier: 1.5, // Sensibilidad del dedo (ajustar si se siente muy lento)
  };

  return (
    <BookingProvider>
      {/* Pasamos las opciones al componente root */}
      <ReactLenis root options={lenisOptions}>
        <Router>
          <ScrollToTop />
          <BookingWidgetModal />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/booking" element={<BookingPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/services/book" element={<ServiceBookingPage />} />
            <Route path="/dining/book" element={<RestaurantBookingPage />} />
            <Route path="/experiences/book" element={<ExperienceBookingPage />} />
            <Route path="/events/plan" element={<EventPlanningPage />} />
          </Routes>
        </Router>
      </ReactLenis>
    </BookingProvider>
  );
}

export default App;