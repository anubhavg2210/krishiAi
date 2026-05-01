import { useState, useEffect } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Activity, Droplets, Wind, AlertCircle, ThermometerSun, Sprout } from "lucide-react";

export default function DashboardPage() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const res = await fetch("http://127.0.0.1:8000/dashboard");
                const result = await res.json();
                setData(result);
            } catch (error) {
                console.error("Error fetching dashboard data:", error);
            }
            setLoading(false);
        };
        fetchDashboardData();
    }, []);

    if (loading) {
        return (
            <div className="flex h-96 items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4CAF50]"></div>
            </div>
        );
    }

    if (!data) return null;

    return (
        <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in zoom-in duration-500">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pt-4">
                <div>
                    <h1 className="text-4xl font-black text-gray-900 tracking-tight">
                        Farmer <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4CAF50] to-teal-500">Dashboard</span>
                    </h1>
                    <p className="text-gray-600 mt-1 font-medium">Your farm's real-time overview and analytics.</p>
                </div>
                <div className="bg-white px-5 py-2.5 rounded-full shadow-sm border border-gray-100 flex items-center gap-3">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </span>
                    <span className="text-sm font-bold text-gray-700">System Live</span>
                </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-all">
                    <div className="bg-green-100 p-4 rounded-2xl text-green-600">
                        <Activity size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 font-bold uppercase">Farm Health</p>
                        <h3 className="text-3xl font-black text-gray-900">{data.farmHealth}%</h3>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-all">
                    <div className="bg-blue-100 p-4 rounded-2xl text-blue-600">
                        <Droplets size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 font-bold uppercase">Water Usage</p>
                        <h3 className="text-2xl font-black text-gray-900">{data.waterUsage}</h3>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-all">
                    <div className="bg-yellow-100 p-4 rounded-2xl text-yellow-600">
                        <ThermometerSun size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 font-bold uppercase">Weather</p>
                        <h3 className="text-lg font-black text-gray-900 leading-tight">{data.weatherSummary}</h3>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-3xl shadow-sm border border-orange-200 bg-orange-50/50 flex items-center gap-4 hover:shadow-md transition-all">
                    <div className="bg-orange-100 p-4 rounded-2xl text-orange-600">
                        <AlertCircle size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-orange-600 font-bold uppercase">Active Alerts</p>
                        <h3 className="text-3xl font-black text-orange-900">{data.activeAlerts}</h3>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Chart Section */}
                <div className="lg:col-span-2 bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                        <Sprout className="text-green-500" /> Weekly Crop Health Index
                    </h3>
                    <div className="h-72 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data.chartData}>
                                <defs>
                                    <linearGradient id="colorHealth" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#4CAF50" stopOpacity={0.3}/>
                                        <stop offset="95%" stopColor="#4CAF50" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 12}} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 12}} domain={['dataMin - 5', 'dataMax + 5']} />
                                <Tooltip 
                                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    itemStyle={{ color: '#111827', fontWeight: 'bold' }}
                                />
                                <Area type="monotone" dataKey="health" stroke="#4CAF50" strokeWidth={3} fillOpacity={1} fill="url(#colorHealth)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Soil & Status Panel */}
                <div className="space-y-6">
                    <div className="bg-gradient-to-br from-indigo-900 to-purple-900 p-6 rounded-3xl text-white shadow-lg relative overflow-hidden">
                        <div className="absolute -right-4 -bottom-4 opacity-10">
                            <Wind size={120} />
                        </div>
                        <h3 className="text-xl font-bold mb-4">Soil Profile</h3>
                        <div className="space-y-4 relative z-10">
                            <div className="bg-white/10 backdrop-blur rounded-xl p-4 border border-white/10">
                                <p className="text-indigo-200 text-sm font-medium">Moisture Level</p>
                                <p className="text-2xl font-black text-white">{data.soilMoisture}</p>
                            </div>
                            <div className="bg-white/10 backdrop-blur rounded-xl p-4 border border-white/10">
                                <p className="text-indigo-200 text-sm font-medium">NPK Nutrient Status</p>
                                <p className="text-2xl font-black text-white">{data.npkLevel}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
                        <div className="space-y-3">
                            <button onClick={() => window.location.href = "/timeline"} className="w-full bg-gray-50 hover:bg-[#4CAF50] hover:text-white text-gray-700 font-bold py-3 px-4 rounded-xl transition-colors border border-gray-200 hover:border-[#4CAF50] text-left flex justify-between items-center">
                                View Smart Timeline <span>→</span>
                            </button>
                            <button onClick={() => window.location.href = "/disease"} className="w-full bg-gray-50 hover:bg-[#4CAF50] hover:text-white text-gray-700 font-bold py-3 px-4 rounded-xl transition-colors border border-gray-200 hover:border-[#4CAF50] text-left flex justify-between items-center">
                                Run Disease Scan <span>→</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
