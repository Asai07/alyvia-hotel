// src/pages/AdminLogin.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Lock } from 'lucide-react';

const AdminLogin = () => {
    return (
        <div className="flex min-h-screen w-full bg-[#2C342C] text-[#F2F0E9]">

            {/* COLUMNA IZQUIERDA: Imagen "Mood" */}
            <div className="hidden lg:block w-1/2 relative overflow-hidden">
                <motion.img
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.5 }}
                    src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop"
                    alt="Admin Mood"
                    className="absolute inset-0 w-full h-full object-cover opacity-60 filter grayscale contrast-125"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#2C342C]"></div>

                <div className="absolute bottom-12 left-12 max-w-md">
                    <h2 className="font-serif text-4xl mb-2">Internal Portal</h2>
                    <p className="text-white/40 text-sm">Authorized personnel only. <br />Alyvia Hotels & Resorts Management System.</p>
                </div>
            </div>

            {/* COLUMNA DERECHA: Formulario */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative">

                {/* Decoración de fondo sutil */}
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none"></div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="w-full max-w-md z-10"
                >
                    <div className="mb-12">
                        <div className="w-12 h-12 rounded-full bg-[#F2F0E9]/10 flex items-center justify-center mb-6 text-[#C5A880]">
                            <Lock size={20} />
                        </div>
                        <h1 className="font-serif text-5xl mb-2 text-[#F2F0E9]">Welcome back.</h1>
                        <p className="text-[#F2F0E9]/40">Please enter your credentials to access the dashboard.</p>
                    </div>

                    <form className="space-y-8">
                        <div className="space-y-6">
                            <div>
                                <label className="text-[10px] font-bold uppercase tracking-widest text-[#C5A880] mb-2 block">Username / Email</label>
                                <input
                                    type="email"
                                    className="w-full bg-transparent border-b border-[#F2F0E9]/20 py-3 text-[#F2F0E9] placeholder:text-[#F2F0E9]/10 focus:outline-none focus:border-[#C5A880] transition-colors text-lg"
                                    placeholder="manager@alyvia.com"
                                />
                            </div>
                            <div>
                                <label className="text-[10px] font-bold uppercase tracking-widest text-[#C5A880] mb-2 block">Password</label>
                                <input
                                    type="password"
                                    className="w-full bg-transparent border-b border-[#F2F0E9]/20 py-3 text-[#F2F0E9] placeholder:text-[#F2F0E9]/10 focus:outline-none focus:border-[#C5A880] transition-colors text-lg"
                                    placeholder="••••••••••••"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between pt-4">
                            <label className="flex items-center gap-2 cursor-pointer group">
                                <input type="checkbox" className="hidden" />
                                <div className="w-4 h-4 border border-[#F2F0E9]/30 rounded-sm flex items-center justify-center group-hover:border-[#C5A880] transition-colors">
                                    {/* Check visual simulado */}
                                </div>
                                <span className="text-xs text-[#F2F0E9]/50 group-hover:text-[#F2F0E9] transition-colors">Remember me</span>
                            </label>
                            <a href="#" className="text-xs text-[#F2F0E9]/50 hover:text-[#C5A880] transition-colors">Forgot Password?</a>
                        </div>

                        <button className="w-full bg-[#F2F0E9] text-[#2C342C] py-5 rounded-xl font-bold uppercase text-xs tracking-[0.2em] hover:bg-[#C5A880] hover:text-white transition-all flex items-center justify-center gap-3 shadow-lg">
                            Access Dashboard <ArrowRight size={16} />
                        </button>
                    </form>
                </motion.div>
            </div>
        </div>
    );
};

export default AdminLogin;