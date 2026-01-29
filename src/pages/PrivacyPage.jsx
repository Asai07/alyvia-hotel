import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const PrivacyPage = () => {
    useEffect(() => { window.scrollTo(0, 0); }, []);

    return (
        <div className="bg-[#F9F9F7] min-h-screen font-sans selection:bg-[#2C342C] selection:text-white">
            <div className="bg-white shadow-sm sticky top-0 z-40"><Navbar /></div>

            <div className="max-w-5xl mx-auto px-6 py-24">
                <div className="mb-12 border-b border-gray-200 pb-8">
                    <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#C5A880] mb-4 block">Legal</span>
                    <h1 className="font-serif text-4xl md:text-6xl text-[#2C342C] mb-4">Política de Privacidad</h1>
                    <p className="text-gray-500">Última actualización: 28 de Enero de 2026</p>
                </div>

                <div className="prose prose-lg prose-headings:font-serif prose-headings:text-[#2C342C] text-gray-600 max-w-none space-y-12">

                    <section>
                        <p>
                            En <strong>Alyvia Hotels & Resorts</strong> ("Alyvia", "nosotros", "nuestro"), la privacidad de nuestros huéspedes es una prioridad fundamental. Esta Política de Privacidad describe cómo recopilamos, utilizamos, almacenamos y protegemos su información personal de conformidad con las normativas internacionales de protección de datos.
                        </p>
                    </section>

                    <section>
                        <h3>1. Información que Recopilamos</h3>
                        <p>Podemos recopilar y procesar los siguientes datos sobre usted:</p>
                        <ul className="list-disc pl-5 space-y-2">
                            <li><strong>Información de Identidad:</strong> Nombre completo, fecha de nacimiento, nacionalidad y datos del pasaporte o identificación oficial (requerido por ley en el registro).</li>
                            <li><strong>Información de Contacto:</strong> Dirección de correo electrónico, número de teléfono y dirección postal.</li>
                            <li><strong>Información Financiera:</strong> Datos de tarjetas de crédito/débito (encriptados y tokenizados a través de pasarelas de pago seguras), historial de transacciones y datos de facturación.</li>
                            <li><strong>Información de Perfil y Estancia:</strong> Preferencias de habitación, restricciones dietéticas, alergias, solicitudes especiales, historial de estancias anteriores y fechas de celebraciones (cumpleaños, aniversarios).</li>
                            <li><strong>Datos Técnicos:</strong> Dirección IP, tipo de navegador, zona horaria y datos de navegación cuando utiliza nuestro sitio web o red Wi-Fi.</li>
                        </ul>
                    </section>

                    <section>
                        <h3>2. Finalidad del Tratamiento de Datos</h3>
                        <p>Utilizamos su información personal para los siguientes fines:</p>
                        <ul className="list-disc pl-5 space-y-2">
                            <li><strong>Gestión de Reservas:</strong> Procesar pagos, confirmar reservas y gestionar su cuenta de huésped.</li>
                            <li><strong>Servicio al Huésped:</strong> Personalizar su experiencia (ej. asignar una habitación tranquila, preparar amenidades de bienvenida).</li>
                            <li><strong>Cumplimiento Legal:</strong> Cumplir con las leyes locales de registro de viajeros y normativas fiscales.</li>
                            <li><strong>Seguridad:</strong> Garantizar la seguridad de nuestras instalaciones mediante sistemas de CCTV (circuitos cerrados de televisión) en áreas públicas.</li>
                            <li><strong>Marketing (con consentimiento):</strong> Enviarle ofertas exclusivas, boletines informativos y promociones de temporada. Puede darse de baja en cualquier momento.</li>
                        </ul>
                    </section>

                    <section>
                        <h3>3. Divulgación de Información a Terceros</h3>
                        <p>No vendemos sus datos personales. Sin embargo, podemos compartir su información con:</p>
                        <ul className="list-disc pl-5 space-y-2">
                            <li><strong>Proveedores de Servicios:</strong> Empresas que nos prestan servicios de TI, procesamiento de pagos, limpieza o actividades turísticas que usted haya contratado a través de nuestro Concierge.</li>
                            <li><strong>Autoridades Legales:</strong> Cuando la ley lo requiera para cumplir con obligaciones judiciales, fiscales o de seguridad nacional.</li>
                        </ul>
                    </section>

                    <section>
                        <h3>4. Seguridad de los Datos</h3>
                        <p>
                            Alyvia implementa medidas de seguridad técnicas, administrativas y físicas rigurosas para proteger su información contra acceso no autorizado, pérdida, destrucción o alteración. Utilizamos encriptación SSL (Secure Socket Layer) para todas las transacciones en línea y restringimos el acceso a los datos personales solo a empleados que necesiten conocerlos para cumplir con sus funciones laborales.
                        </p>
                    </section>

                    <section>
                        <h3>5. Sus Derechos (Derechos ARCO)</h3>
                        <p>Usted tiene derecho a:</p>
                        <ul className="list-disc pl-5 space-y-2">
                            <li><strong>Acceder</strong> a los datos personales que tenemos sobre usted.</li>
                            <li><strong>Rectificar</strong> cualquier dato inexacto o incompleto.</li>
                            <li><strong>Cancelar</strong> (eliminar) sus datos cuando ya no sean necesarios para los fines que fueron recogidos.</li>
                            <li><strong>Oponerse</strong> al tratamiento de sus datos para fines específicos (como marketing directo).</li>
                        </ul>
                        <p className="mt-4">Para ejercer estos derechos, contacte a nuestro Oficial de Privacidad en: <a href="mailto:privacy@alyvia.com" className="text-[#C5A880] underline">privacy@alyvia.com</a>.</p>
                    </section>

                    <section>
                        <h3>6. Cookies y Tecnologías de Rastreo</h3>
                        <p>
                            Utilizamos cookies propias y de terceros para mejorar la funcionalidad del sitio web, analizar el tráfico y mostrar publicidad relevante. Puede configurar su navegador para rechazar todas o algunas cookies, aunque esto podría afectar la funcionalidad de nuestro sitio de reservas.
                        </p>
                    </section>

                    <section>
                        <h3>7. Cambios en la Política</h3>
                        <p>
                            Nos reservamos el derecho de modificar esta política en cualquier momento. Cualquier cambio significativo será notificado a través de nuestro sitio web o por correo electrónico.
                        </p>
                    </section>

                </div>
            </div>
            <Footer />
        </div>
    );
};

export default PrivacyPage;