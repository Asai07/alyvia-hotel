import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const TermsPage = () => {
    useEffect(() => { window.scrollTo(0, 0); }, []);

    return (
        <div className="bg-[#F9F9F7] min-h-screen font-sans selection:bg-[#2C342C] selection:text-white">
            <div className="bg-white shadow-sm sticky top-0 z-40"><Navbar /></div>

            <div className="max-w-5xl mx-auto px-6 py-24">
                <div className="mb-12 border-b border-gray-200 pb-8">
                    <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#C5A880] mb-4 block">Legal</span>
                    <h1 className="font-serif text-4xl md:text-6xl text-[#2C342C] mb-4">Términos y Condiciones</h1>
                    <p className="text-gray-500">Vigencia a partir de: 1 de Enero de 2026</p>
                </div>

                <div className="prose prose-lg prose-headings:font-serif prose-headings:text-[#2C342C] text-gray-600 max-w-none space-y-12">

                    <section>
                        <p>
                            Bienvenido a <strong>Alyvia Hotels & Resorts</strong>. Al realizar una reserva o utilizar nuestros servicios, usted acepta incondicionalmente los siguientes términos y condiciones. Estos términos constituyen un contrato legal vinculante entre el Huésped y Alyvia.
                        </p>
                    </section>

                    <section>
                        <h3>1. Políticas de Reserva y Pago</h3>
                        <ul className="list-disc pl-5 space-y-2">
                            <li><strong>Edad Mínima:</strong> El huésped principal debe ser mayor de 18 años y presentar una identificación oficial válida y tarjeta de crédito al momento del Check-in.</li>
                            <li><strong>Garantía:</strong> Todas las reservas requieren una tarjeta de crédito válida como garantía. Alyvia se reserva el derecho de pre-autorizar la tarjeta antes de la llegada para verificar su validez.</li>
                            <li><strong>Depósito de Seguridad:</strong> Al momento del Check-in, se podrá retener un depósito de seguridad (varía según la categoría de habitación) para cubrir posibles gastos incidentales o daños. Este monto será liberado al Check-out tras la inspección de la habitación.</li>
                            <li><strong>Moneda:</strong> Las tarifas están expresadas en Dólares Estadounidenses (USD) o Moneda Nacional según la ubicación, y están sujetas a los impuestos locales aplicables y cargos por servicio.</li>
                        </ul>
                    </section>

                    <section>
                        <h3>2. Horarios de Entrada y Salida</h3>
                        <ul className="list-disc pl-5 space-y-2">
                            <li><strong>Check-in:</strong> A partir de las 15:00 horas (3:00 PM). El acceso temprano está sujeto a disponibilidad y puede incurrir en cargos adicionales.</li>
                            <li><strong>Check-out:</strong> Hasta las 12:00 horas (12:00 PM).</li>
                            <li><strong>Late Check-out:</strong> Las salidas después de la hora establecida están sujetas a disponibilidad. Salidas entre 12:00 PM y 6:00 PM incurrirán en un cargo del 50% de la tarifa diaria. Salidas después de las 6:00 PM se cobrarán como una noche completa.</li>
                        </ul>
                    </section>

                    <section>
                        <h3>3. Normas de Conducta y Uso de Instalaciones</h3>
                        <ul className="list-disc pl-5 space-y-2">
                            <li><strong>Código de Conducta:</strong> Alyvia se reserva el derecho de admisión y permanencia. No se tolerará comportamiento agresivo, acoso, intoxicación pública o cualquier acto que perturbe la paz de otros huéspedes o del personal.</li>
                            <li><strong>Prohibido Fumar:</strong> Todas nuestras habitaciones y espacios cerrados son 100% libres de humo. Se aplicará una multa de limpieza profunda de $250 USD si se detecta evidencia de tabaco o vapeo en la habitación.</li>
                            <li><strong>Mascotas:</strong> Solo se permiten mascotas en villas designadas bajo previa reserva y pago de la tarifa correspondiente. El dueño es responsable de cualquier daño o limpieza adicional necesaria.</li>
                            <li><strong>Ocupación Máxima:</strong> Por razones de seguridad, no se permite exceder la capacidad máxima de personas indicada para cada tipo de suite.</li>
                        </ul>
                    </section>

                    <section>
                        <h3>4. Responsabilidad y Objetos de Valor</h3>
                        <p>
                            Alyvia pone a disposición de los huéspedes cajas de seguridad en cada habitación. El hotel <strong>no se hace responsable</strong> por la pérdida, robo o daño de dinero, joyas, documentos u otros objetos de valor que no hayan sido depositados en la caja fuerte de la habitación o en la caja fuerte central de recepción.
                        </p>
                        <p className="mt-2">
                            El uso de las instalaciones recreativas (piscinas, gimnasio, playa) es bajo el propio riesgo del huésped. Alyvia no asume responsabilidad por lesiones personales derivadas del uso imprudente de dichas instalaciones.
                        </p>
                    </section>

                    <section>
                        <h3>5. Daños a la Propiedad</h3>
                        <p>
                            El huésped es responsable de cualquier daño causado a la propiedad del hotel, mobiliario o equipos, ya sea por negligencia o acto intencional. Alyvia se reserva el derecho de cargar a la tarjeta de crédito registrada el costo total de las reparaciones o reposiciones necesarias.
                        </p>
                    </section>

                    <section>
                        <h3>6. Propiedad Intelectual</h3>
                        <p>
                            Todo el contenido de este sitio web (imágenes, logotipos, textos, software) es propiedad exclusiva de Alyvia Hotels & Resorts y está protegido por las leyes internacionales de derechos de autor. Está prohibida su reproducción sin consentimiento expreso.
                        </p>
                    </section>

                    <section>
                        <h3>7. Ley Aplicable y Jurisdicción</h3>
                        <p>
                            Estos términos se rigen por las leyes del lugar donde se ubica el hotel. Cualquier disputa derivada de estos términos se someterá a la jurisdicción exclusiva de los tribunales locales competentes.
                        </p>
                    </section>

                </div>
            </div>
            <Footer />
        </div>
    );
};

export default TermsPage;