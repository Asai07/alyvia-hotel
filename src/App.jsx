// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ReactLenis } from 'lenis/react';
import LandingPage from './pages/LandingPage';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import BookingPage from './pages/BookingPage';
import CheckoutPage from './pages/CheckOutPage';
import { BookingProvider } from './context/BookingContext';
import BookingWidgetModal from './components/BookingWidgetModal';
function App() {
  return (
    <BookingProvider>
      <ReactLenis root>
        <Router>
          <BookingWidgetModal />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/booking" element={<BookingPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
          </Routes>
        </Router>
      </ReactLenis>
    </BookingProvider>
  );
}

export default App;