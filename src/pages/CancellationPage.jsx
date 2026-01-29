import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { AlertTriangle, Clock, CreditCard, ShieldCheck } from 'lucide-react';

const CancellationPage = () => {
    useEffect(() => { window.scrollTo(0, 0); }, []);

    return (
        <div className="bg-[#F9F9F7] min-h-screen font-sans selection:bg-[#2C342C] selection:text-white">
            <div className="bg-white shadow-sm sticky top-0 z-40"><Navbar /></div>

            <div className="max-w-5xl mx-auto px-6 py-24">
                <div className="mb-12 border-b border-gray-200 pb-8">
                    <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#C5A880] mb-4 block">Reservas</span>
                    <h1 className="font-serif text-4xl md:text-6xl text-[#2C342C] mb-4">Política de Cancelación y Reembolsos</h1>
                    <p className="text-gray-500">Claridad y transparencia para tu tranquilidad.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                    {/* Tarifa Flexible */}
                    <div className="bg-white p-8 rounded-[2rem] shadow-xl shadow-gray-200/50 border border-[#2C342C]/5">
                        <div className="w-12 h-12 bg-[#2C342C]/5 rounded-full flex items-center justify-center text-[#2C342C] mb-6">
                            <ShieldCheck size={24} />
                        </div>
                        <h3 className="font-serif text-2xl text-[#2C342C] mb-4">Tarifa Flexible</h3>
                        <p className="text-gray-600 text-sm leading-relaxed mb-4">
                            Diseñada para ofrecerte la máxima libertad. Puedes cancelar o modificar tu reserva sin penalización si cambias de planes.
                        </p>
                        <ul className="text-sm text-gray-500 space-y-2 border-t border-gray-100 pt-4">
                            <li>• Cancelación gratuita hasta <strong>48 horas</strong> antes de la llegada (15:00 hora local).</li>
                            <li>• Cancelaciones dentro de las 48 horas incurrirán en una penalización equivalente a <strong>1 noche de estancia</strong> más impuestos.</li>
                        </ul>
                    </div>

                    {/* Tarifa No Reembolsable */}
                    <div className="bg-white p-8 rounded-[2rem] shadow-xl shadow-gray-200/50 border border-[#2C342C]/5">
                        <div className="w-12 h-12 bg-[#C5A880]/10 rounded-full flex items-center justify-center text-[#C5A880] mb-6">
                            <CreditCard size={24} />
                        </div>
                        <h3 className="font-serif text-2xl text-[#2C342C] mb-4">Tarifa No Reembolsable</h3>
                        <p className="text-gray-600 text-sm leading-relaxed mb-4">
                            Nuestra tarifa más económica. El pago total se realiza al momento de reservar y garantiza tu habitación.
                        </p>
                        <ul className="text-sm text-gray-500 space-y-2 border-t border-gray-100 pt-4">
                            <li>• El cobro del 100% se realiza al confirmar la reserva.</li>
                            <li>• No admite cambios, cancelaciones ni reembolsos bajo ninguna circunstancia voluntaria.</li>
                        </ul>
                    </div>
                </div>

                <div className="prose prose-lg prose-headings:font-serif prose-headings:text-[#2C342C] text-gray-600 max-w-none space-y-12">

                    <section>
                        <h3>1. Política de "No Show" (No Presentación)</h3>
                        <p>
                            Si el huésped no se presenta en el hotel antes de las 23:59 horas del día programado de llegada sin previo aviso, la reserva se considerará "No Show".
                        </p>
                        <ul className="list-disc pl-5">
                            <li><strong>Tarifa Flexible:</strong> Se cobrará la penalización de 1 noche más impuestos y el resto de la reserva será cancelada.</li>
                            <li><strong>Tarifa No Reembolsable:</strong> Se retendrá el 100% del monto total de la estancia y no habrá derecho a reembolso.</li>
                        </ul>
                    </section>

                    <section>
                        <h3>2. Salida Anticipada (Early Departure)</h3>
                        <p>
                            Si un huésped decide acortar su estancia y realizar el Check-out antes de la fecha reservada, el hotel se reserva el derecho de cobrar el monto total de la estancia original reservada como compensación por el bloqueo de la habitación, salvo que se acuerde lo contrario con la Gerencia por circunstancias especiales.
                        </p>
                    </section>

                    <section>
                        <h3>3. Fuerza Mayor</h3>
                        <p>
                            En caso de eventos de fuerza mayor comprobables (desastres naturales, cierre de fronteras gubernamentales, pandemias declaradas) que impidan la llegada al hotel:
                        </p>
                        <p>
                            Alyvia ofrecerá un <strong>Crédito de Viaje</strong> por el monto total pagado, válido para ser utilizado en una nueva reserva dentro de los siguientes 12 meses, sujeto a disponibilidad y tarifas vigentes. No se realizarán reembolsos en efectivo para tarifas No Reembolsables, pero garantizamos flexibilidad en fechas.
                        </p>
                    </section>

                    <section>
                        <h3>4. Proceso de Reembolsos</h3>
                        <div className="bg-[#F2F0E9] p-6 rounded-xl border border-[#C5A880]/30 flex items-start gap-4">
                            <Clock className="text-[#C5A880] shrink-0 mt-1" />
                            <div>
                                <h4 className="font-bold text-[#2C342C] text-sm uppercase mb-1">Tiempos de Procesamiento</h4>
                                <p className="text-sm text-gray-600 m-0">
                                    Los reembolsos aprobados se procesarán inmediatamente por parte del hotel. Sin embargo, dependiendo de su entidad bancaria, el reflejo en su estado de cuenta puede demorar entre <strong>15 a 30 días hábiles</strong>.
                                </p>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h3>5. Reservas de Grupos</h3>
                        <p>
                            Las reservas de más de 5 habitaciones se consideran "Grupo" y están sujetas a políticas de cancelación y contratos específicos que pueden diferir de las políticas generales aquí expuestas. Por favor contacte a ventas@alyvia.com para más detalles.
                        </p>
                    </section>

                </div>
            </div>
            <Footer />
        </div>
    );
};

export default CancellationPage;