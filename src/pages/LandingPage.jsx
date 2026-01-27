import React from 'react';

import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Rooms from '../components/Rooms';
import Services from '../components/Services';
import Restaurants from '../components/Restaurants';
import Experiences from '../components/Experiences';
import Gallery from '../components/Gallery';
import Promotions from '../components/Promotions';
import Events from '../components/Events';
import Reviews from '../components/Reviews';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import PromoModal from '../components/PromoModal';

const LandingPage = () => {
    return (
        <main className="font-sans antialiased bg-cream selection:bg-olive-accent selection:text-white min-h-screen">
            <PromoModal />
            <Navbar />
            <Hero />
            <About />
            <Rooms />
            <Services />
            <Restaurants />
            <Experiences />
            <Gallery />
            <Promotions />
            <Events />
            <Reviews />
            <Contact />
            <Footer />
        </main>
    );
};

export default LandingPage;