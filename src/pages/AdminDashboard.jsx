// src/pages/AdminDashboard.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    LayoutDashboard, CalendarDays, Users, BedDouble,
    Bell, Search, Settings, LogOut, Wallet,
    TrendingUp, Clock, CheckCircle, MoreHorizontal,
    Tag, AlertCircle, Wrench, Coffee, Car, Plus
} from 'lucide-react';

// --- SUB-COMPONENTES (UI KIT) ---

const SidebarIcon = ({ icon: Icon, id, activeTab, setActiveTab }) => {
    const isActive = activeTab === id;
    return (
        <div
            onClick={() => setActiveTab(id)}
            className={`w-12 h-12 flex items-center justify-center rounded-xl cursor-pointer transition-all duration-300 group relative
            ${isActive ? 'bg-[#1A211B] text-[#C5A880] shadow-lg shadow-[#1A211B]/20' : 'text-gray-400 hover:bg-white hover:text-[#1A211B] hover:shadow-md'}`}
        >
            <Icon size={20} strokeWidth={2} />
            {isActive && <motion.div layoutId="active-pill" className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-[#C5A880] rounded-l-full"></motion.div>}

            <span className="absolute left-14 bg-[#1A211B] text-white text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                {id}
            </span>
        </div>
    );
};

const StatBadge = ({ icon: Icon, label, value, trend }) => (
    <motion.div whileHover={{ y: -5 }} className="bg-white p-5 rounded-[1.5rem] shadow-sm border border-gray-100 flex flex-col justify-between h-32 cursor-default">
        <div className="flex justify-between items-start">
            <div className="p-2 bg-[#F2F0E9] rounded-full text-[#1A211B]"><Icon size={18} /></div>
            <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">{trend}</span>
        </div>
        <div>
            <h3 className="font-serif text-2xl text-[#1A211B]">{value}</h3>
            <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">{label}</p>
        </div>
    </motion.div>
);

// --- VISTAS DEL DASHBOARD (CONTENIDO) ---

// 1. VISTA PRINCIPAL (DASHBOARD)
const DashboardView = () => (
    <div className="flex flex-col lg:flex-row h-full gap-8">

        {/* PANEL OSCURO (Izquierda) */}
        <motion.div
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
            className="w-full lg:w-[30%] bg-[#1A211B] text-[#F2F0E9] p-8 flex flex-col justify-between relative overflow-hidden rounded-[2.5rem] shadow-2xl min-h-[600px]"
        >
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#C5A880] rounded-full blur-[120px] opacity-20 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#2C342C] rounded-full blur-[80px] opacity-40 pointer-events-none"></div>

            <div className="relative z-10">
                <h2 className="text-sm font-bold uppercase tracking-widest text-[#C5A880] mb-2">⚡ Financial Overview</h2>
                <h1 className="font-serif text-3xl text-white">Summary</h1>
            </div>

            <div className="relative z-10 bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-[2rem] mt-8 cursor-pointer hover:bg-white/10 transition-colors">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h3 className="font-serif text-4xl text-white mb-1">$142.8k</h3>
                        <p className="text-xs text-white/40 font-bold uppercase tracking-widest">Total Revenue</p>
                    </div>
                    <div className="p-2 bg-[#C5A880]/20 rounded-lg text-[#C5A880]"><TrendingUp size={20} /></div>
                </div>
                <div className="flex items-end justify-between gap-2 h-24">
                    {[35, 50, 45, 70, 60, 85, 100].map((h, i) => (
                        <div key={i} className={`w-full rounded-t-sm ${i === 6 ? 'bg-[#C5A880]' : 'bg-white/10'}`} style={{ height: `${h}%` }}></div>
                    ))}
                </div>
            </div>

            <div className="relative z-10 bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-[2rem] mt-6 flex-1 flex flex-col justify-center cursor-pointer hover:bg-white/10 transition-colors">
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <h3 className="text-2xl font-serif text-white">84%</h3>
                        <p className="text-xs text-white/40 font-bold uppercase tracking-widest">Occupancy Rate</p>
                    </div>
                    <div className="w-16 h-16 rounded-full border-4 border-white/10 border-t-[#C5A880] border-r-[#C5A880] rotate-45"></div>
                </div>
                <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden mt-4">
                    <div className="bg-[#C5A880] w-[84%] h-full"></div>
                </div>
            </div>
        </motion.div>

        {/* PANEL CLARO (Derecha) */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="flex-1 overflow-y-auto no-scrollbar pr-2">

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatBadge icon={Users} label="Total Guests" value="1,240" trend="+12%" />
                <StatBadge icon={BedDouble} label="Check-ins" value="12" trend="+4" />
                <StatBadge icon={Clock} label="Avg Stay" value="3.5n" trend="+0.5" />
                <StatBadge icon={CheckCircle} label="Clean Rooms" value="28" trend="90%" />
            </div>

            {/* Guests & Events */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">

                {/* LISTA DE HUÉSPEDES (Ahora con 3 items) */}
                <div>
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-serif text-xl text-[#1A211B]">👋 Active Guests</h3>
                        <button className="text-gray-400 hover:text-[#1A211B] p-2 hover:bg-white rounded-full transition-colors"><MoreHorizontal size={18} /></button>
                    </div>
                    <div className="bg-white p-4 rounded-[2rem] shadow-sm border border-gray-100 space-y-2">
                        {/* Guest 1 */}
                        <div className="flex items-center justify-between p-3 hover:bg-[#F9F9F7] rounded-xl cursor-pointer transition-colors group">
                            <div className="flex items-center gap-3">
                                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop" className="w-10 h-10 rounded-full object-cover border border-gray-100" alt="User" />
                                <div><h4 className="text-sm font-bold text-[#1A211B]">Cameron Williamson</h4><p className="text-xs text-gray-400">Suite 101</p></div>
                            </div>
                            <span className="text-[10px] font-bold bg-[#1A211B] text-white px-2 py-1 rounded-full group-hover:bg-[#C5A880] transition-colors">Checking In</span>
                        </div>
                        {/* Guest 2 */}
                        <div className="flex items-center justify-between p-3 hover:bg-[#F9F9F7] rounded-xl cursor-pointer transition-colors group">
                            <div className="flex items-center gap-3">
                                <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=2080&auto=format&fit=crop" className="w-10 h-10 rounded-full object-cover border border-gray-100" alt="User" />
                                <div><h4 className="text-sm font-bold text-[#1A211B]">Esther Howard</h4><p className="text-xs text-gray-400">Villa Ocean</p></div>
                            </div>
                            <span className="text-[10px] font-bold bg-gray-100 text-gray-400 px-2 py-1 rounded-full group-hover:bg-white group-hover:shadow-sm transition-all">Stay Over</span>
                        </div>
                        {/* Guest 3 (Nuevo) */}
                        <div className="flex items-center justify-between p-3 hover:bg-[#F9F9F7] rounded-xl cursor-pointer transition-colors group">
                            <div className="flex items-center gap-3">
                                <img src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=2080&auto=format&fit=crop" className="w-10 h-10 rounded-full object-cover border border-gray-100" alt="User" />
                                <div><h4 className="text-sm font-bold text-[#1A211B]">Jacob Jones</h4><p className="text-xs text-gray-400">Penthouse</p></div>
                            </div>
                            <span className="text-[10px] font-bold bg-gray-100 text-gray-400 px-2 py-1 rounded-full group-hover:bg-white group-hover:shadow-sm transition-all">Checking Out</span>
                        </div>
                    </div>
                </div>

                {/* EVENTO ESPECIAL */}
                <div>
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-serif text-xl text-[#1A211B]">🔥 Special Event</h3>
                    </div>
                    <div className="bg-[#C5A880]/10 p-6 rounded-[2rem] relative overflow-hidden h-[256px] flex flex-col justify-end group cursor-pointer shadow-sm hover:shadow-md transition-all">
                        <img src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2070&auto=format&fit=crop" className="absolute top-0 left-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" alt="Event" />
                        <div className="relative z-10 bg-white/90 backdrop-blur p-4 rounded-xl border border-white/20">
                            <div className="flex justify-between items-start">
                                <div><h4 className="font-serif text-lg text-[#1A211B]">Wine Tasting</h4><p className="text-xs text-gray-500">Tonight • 19:00 PM</p></div>
                                <div className="bg-[#1A211B] text-white px-2 py-1 rounded text-xs font-bold shadow-lg">FEB 14</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* SECCIÓN INFERIOR */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-12">

                {/* PROMOCIONES ACTIVAS (Clickable) */}
                <div>
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-serif text-xl text-[#1A211B]">🏷️ Active Promos</h3>
                    </div>
                    <div className="bg-white p-4 rounded-[2rem] shadow-sm border border-gray-100 space-y-2">
                        {/* Promo 1 */}
                        <div className="flex justify-between items-center p-3 border-b border-gray-50 cursor-pointer hover:bg-[#F9F9F7] rounded-xl transition-colors group">
                            <div className="flex gap-3 items-center">
                                <div className="bg-[#C5A880]/10 p-2 rounded-lg text-[#C5A880] group-hover:scale-110 transition-transform"><Tag size={16} /></div>
                                <div><h4 className="font-bold text-sm text-[#1A211B]">Winter Solstice</h4><p className="text-xs text-gray-400 font-mono">WINTER26</p></div>
                            </div>
                            <span className="text-green-600 text-xs font-bold bg-green-50 px-2 py-1 rounded-full">Active</span>
                        </div>
                        {/* Promo 2 */}
                        <div className="flex justify-between items-center p-3 cursor-pointer hover:bg-[#F9F9F7] rounded-xl transition-colors group mb-2">
                            <div className="flex gap-3 items-center">
                                <div className="bg-[#C5A880]/10 p-2 rounded-lg text-[#C5A880] group-hover:scale-110 transition-transform"><Tag size={16} /></div>
                                <div><h4 className="font-bold text-sm text-[#1A211B]">Early Bird</h4><p className="text-xs text-gray-400 font-mono">EARLY26</p></div>
                            </div>
                            <span className="text-green-600 text-xs font-bold bg-green-50 px-2 py-1 rounded-full">Active</span>
                        </div>

                        {/* Botón Create New Promo */}
                        <button className="w-full py-3 border-2 border-dashed border-gray-200 rounded-xl text-gray-400 text-xs font-bold uppercase tracking-widest hover:border-[#C5A880] hover:text-[#C5A880] hover:bg-[#C5A880]/5 transition-all flex items-center justify-center gap-2 group">
                            <Plus size={16} className="group-hover:rotate-90 transition-transform" /> Create New Coupon
                        </button>
                    </div>
                </div>

                {/* CONCIERGE (Ahora con 3 items) */}
                <div>
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-serif text-xl text-[#1A211B]">🛎️ Concierge</h3>
                        <span className="bg-red-50 text-red-500 text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1"><span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></span>2 Urgent</span>
                    </div>
                    <div className="bg-white p-2 rounded-[2rem] shadow-sm border border-gray-100 space-y-1">
                        {/* Tarea 1 */}
                        <div className="flex gap-4 p-3 hover:bg-red-50 rounded-xl cursor-pointer transition-colors group">
                            <div className="p-2 bg-red-100 text-red-500 rounded-lg h-fit group-hover:scale-110 transition-transform"><AlertCircle size={16} /></div>
                            <div><h4 className="text-sm font-bold text-[#1A211B]">AC Malfunction</h4><p className="text-xs text-gray-500">Room 404 • Reported 10m ago</p></div>
                        </div>
                        {/* Tarea 2 */}
                        <div className="flex gap-4 p-3 hover:bg-orange-50 rounded-xl cursor-pointer transition-colors group">
                            <div className="p-2 bg-orange-100 text-orange-500 rounded-lg h-fit group-hover:scale-110 transition-transform"><Coffee size={16} /></div>
                            <div><h4 className="text-sm font-bold text-[#1A211B]">Room Service</h4><p className="text-xs text-gray-500">Villa 02 • Breakfast Order</p></div>
                        </div>
                        {/* Tarea 3 (Nuevo) */}
                        <div className="flex gap-4 p-3 hover:bg-blue-50 rounded-xl cursor-pointer transition-colors group">
                            <div className="p-2 bg-blue-100 text-blue-500 rounded-lg h-fit group-hover:scale-110 transition-transform"><Car size={16} /></div>
                            <div><h4 className="text-sm font-bold text-[#1A211B]">Airport Transfer</h4><p className="text-xs text-gray-500">Mr. Bond • 14:00 PM</p></div>
                        </div>
                    </div>
                </div>

            </div>
        </motion.div>
    </div>
);

// (El resto de las vistas CalendarView, RoomsView, SimpleView se mantienen igual que en el código anterior)
// ... Asegúrate de mantener esas funciones aquí abajo ...

// 2. VISTA CALENDARIO (Placeholder Funcional)
const CalendarView = () => (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-8 h-full bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden flex flex-col">
        <div className="flex justify-between items-center mb-8">
            <h1 className="font-serif text-3xl text-[#1A211B]">Bookings Calendar</h1>
            <div className="flex gap-2">
                <button className="px-4 py-2 border rounded-full text-xs font-bold hover:bg-gray-50">Day</button>
                <button className="px-4 py-2 bg-[#1A211B] text-white rounded-full text-xs font-bold">Week</button>
                <button className="px-4 py-2 border rounded-full text-xs font-bold hover:bg-gray-50">Month</button>
            </div>
        </div>
        <div className="flex-1 border-t border-l border-gray-200 grid grid-cols-7 grid-rows-6">
            {[...Array(42)].map((_, i) => (
                <div key={i} className="border-r border-b border-gray-200 p-2 min-h-[80px] relative hover:bg-gray-50 transition-colors">
                    <span className="text-xs text-gray-400 font-bold">{i + 1 <= 31 ? i + 1 : ''}</span>
                    {i === 4 && <div className="absolute top-8 left-1 right-1 bg-[#1A211B] text-white text-[10px] p-1 rounded font-bold truncate cursor-pointer hover:scale-105 transition-transform">Check-in: Sarah</div>}
                    {i === 15 && <div className="absolute top-8 left-1 right-1 bg-[#C5A880] text-white text-[10px] p-1 rounded font-bold truncate cursor-pointer hover:scale-105 transition-transform">Wedding Event</div>}
                </div>
            ))}
        </div>
    </motion.div>
);

const RoomsView = () => {
    const [filter, setFilter] = useState('all');
    const generateRooms = (floor) => {
        return [...Array(12)].map((_, i) => {
            const roomNum = (floor * 100) + (i + 1);
            const statusRandom = Math.random();
            const status = statusRandom > 0.6 ? 'occupied' : statusRandom > 0.3 ? 'dirty' : 'available';
            return { id: roomNum, number: roomNum, type: i % 4 === 0 ? 'Suite' : 'Standard', status: status };
        });
    };
    const floors = [1, 2, 3, 4];
    const RoomCard = ({ room }) => {
        const styles = {
            available: 'bg-white border-gray-200 text-gray-500 hover:border-green-400',
            occupied: 'bg-[#1A211B] border-[#1A211B] text-white',
            dirty: 'bg-[#C5A880] border-[#C5A880] text-white'
        };
        if (filter !== 'all' && room.status !== filter) return null;
        return (
            <div className={`relative p-4 rounded-2xl border transition-all duration-300 cursor-pointer hover:shadow-lg group h-28 flex flex-col justify-between ${styles[room.status]}`}>
                <div className="flex justify-between items-start"><span className="font-serif text-xl font-bold">{room.number}</span><span className="text-[10px] uppercase tracking-wider opacity-60">{room.type}</span></div>
                <div>
                    <div className="flex items-center gap-2 mb-1"><div className={`w-2 h-2 rounded-full ${room.status === 'available' ? 'bg-green-500' : 'bg-white'}`}></div><span className="text-[10px] font-bold uppercase tracking-widest">{room.status}</span></div>
                    {room.status === 'occupied' && <p className="text-[10px] opacity-60 truncate">Mr. Anderson</p>}
                </div>
            </div>
        );
    };
    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="h-full flex flex-col">
            <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
                <div><h1 className="font-serif text-3xl text-[#1A211B]">Room Status</h1><p className="text-xs text-gray-400 mt-1">Real-time housekeeping & occupancy map.</p></div>
                <div className="bg-white p-1 rounded-xl shadow-sm border border-gray-100 flex">
                    {['all', 'available', 'occupied', 'dirty'].map((f) => (
                        <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${filter === f ? 'bg-[#1A211B] text-white shadow-md' : 'text-gray-400 hover:bg-gray-50'}`}>{f}</button>
                    ))}
                </div>
            </div>
            <div className="flex-1 overflow-y-auto pr-2 pb-10 space-y-8 no-scrollbar">
                {floors.map((floor) => (
                    <div key={floor}>
                        <div className="flex items-center gap-4 mb-4"><h3 className="font-serif text-xl text-[#1A211B]">Floor {floor}</h3><div className="h-px bg-gray-200 flex-1"></div></div>
                        <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-3">{generateRooms(floor).map((room) => (<RoomCard key={room.id} room={room} />))}</div>
                    </div>
                ))}
            </div>
        </motion.div>
    );
};

const SimpleView = ({ title, icon: Icon }) => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full flex flex-col items-center justify-center text-center p-12 bg-white rounded-[2.5rem] border border-gray-100 border-dashed">
        <div className="w-20 h-20 bg-[#F2F0E9] rounded-full flex items-center justify-center text-[#1A211B] mb-6"><Icon size={40} /></div>
        <h2 className="font-serif text-3xl text-[#1A211B] mb-2">{title} Management</h2>
        <p className="text-gray-400 max-w-md">This module allows you to manage all {title.toLowerCase()} related data.</p>
        <button className="mt-8 px-8 py-3 bg-[#1A211B] text-white rounded-full font-bold uppercase text-xs tracking-widest hover:bg-[#C5A880] transition-colors">Configure {title}</button>
    </motion.div>
);

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const renderContent = () => {
        switch (activeTab) {
            case 'dashboard': return <DashboardView />;
            case 'calendar': return <CalendarView />;
            case 'rooms': return <RoomsView />;
            case 'guests': return <SimpleView title="Guests" icon={Users} />;
            case 'wallet': return <SimpleView title="Finance" icon={Wallet} />;
            case 'settings': return <SimpleView title="Settings" icon={Settings} />;
            default: return <DashboardView />;
        }
    };

    return (
        <div className="flex h-screen bg-[#F9F9F7] font-sans overflow-hidden selection:bg-[#C5A880] selection:text-white">
            <aside className="w-24 bg-white flex flex-col items-center py-8 border-r border-gray-100 z-20 shadow-sm relative">
                <div className="mb-12 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
                    <div className="w-10 h-10 bg-[#1A211B] rounded-full flex items-center justify-center text-[#F2F0E9] font-serif font-bold text-xl hover:scale-110 transition-transform">A.</div>
                </div>
                <nav className="flex-1 flex flex-col gap-6 w-full items-center">
                    <SidebarIcon id="dashboard" icon={LayoutDashboard} activeTab={activeTab} setActiveTab={setActiveTab} />
                    <SidebarIcon id="calendar" icon={CalendarDays} activeTab={activeTab} setActiveTab={setActiveTab} />
                    <SidebarIcon id="rooms" icon={BedDouble} activeTab={activeTab} setActiveTab={setActiveTab} />
                    <SidebarIcon id="guests" icon={Users} activeTab={activeTab} setActiveTab={setActiveTab} />
                    <SidebarIcon id="wallet" icon={Wallet} activeTab={activeTab} setActiveTab={setActiveTab} />
                    <SidebarIcon id="settings" icon={Settings} activeTab={activeTab} setActiveTab={setActiveTab} />
                </nav>
                <div className="mt-auto"><SidebarIcon id="logout" icon={LogOut} activeTab={activeTab} setActiveTab={() => console.log('Logout')} /></div>
            </aside>
            <div className="flex-1 flex flex-col h-full overflow-hidden">
                <header className="px-8 py-6 flex justify-between items-center bg-[#F9F9F7] shrink-0">
                    <div className="flex items-center gap-2 text-[#1A211B]"><span className="text-xs font-bold uppercase tracking-widest text-gray-400">Alyvia Admin /</span><span className="text-xs font-bold uppercase tracking-widest text-[#1A211B]">{activeTab}</span></div>
                    <div className="flex items-center gap-6">
                        <div className="relative"><Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} /><input type="text" placeholder="Global Search..." className="pl-10 pr-4 py-2.5 bg-white rounded-full text-sm outline-none w-64 shadow-sm border border-gray-100 focus:border-[#C5A880] transition-colors" /></div>
                        <div className="flex items-center gap-4 border-l border-gray-200 pl-6">
                            <div className="relative cursor-pointer hover:scale-110 transition-transform"><Bell size={20} className="text-[#1A211B]" /><span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border border-white"></span></div>
                            <img src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=1974&auto=format&fit=crop" className="w-9 h-9 rounded-full object-cover border border-gray-200" alt="Profile" />
                        </div>
                    </div>
                </header>
                <main className="flex-1 p-8 pt-0 overflow-hidden">{renderContent()}</main>
            </div>
        </div>
    );
};

export default AdminDashboard;