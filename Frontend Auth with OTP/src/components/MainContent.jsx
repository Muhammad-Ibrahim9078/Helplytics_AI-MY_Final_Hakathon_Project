import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  MapPin,
  ArrowRight,
  Loader2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const MainContent = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [requests, setRequests] = useState([]);
  const [stats, setStats] = useState({ members: 0, requests: 0, solved: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const headers = token ? { Authorization: `Bearer ${token}` } : {};

      const [reqRes, statsRes] = await Promise.all([
        axios.get("http://localhost:8000/api/requests", { headers }),
        axios.get("http://localhost:8000/api/requests/stats", { headers })
      ]);

      if (reqRes.data.success) setRequests(reqRes.data.data);
      if (statsRes.data.success) setStats(statsRes.data.data);
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredRequests = searchTerm
    ? requests.filter(r => 
        r.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : requests;

  const statCards = [
    { label: 'MEMBERS', value: `${stats.members}+`, sub: 'Students, mentors, & helpers.' },
    { label: 'REQUESTS', value: `${stats.requests}+`, sub: 'Support posts shared.' },
    { label: 'SOLVED', value: `${stats.solved}+`, sub: 'Problems resolved through action.' },
  ];

  const getCategoryColor = (cat) => {
    if (cat === "Design") return "bg-[#e8f0fe] text-[#1967d2]";
    if (cat === "Career") return "bg-gray-100 text-gray-600";
    return "bg-[#e4efed] text-[#1a8570]";
  };

  const getUrgencyColor = (urg) => {
    if (urg === "High") return "bg-[#feeceb] text-[#d93025]";
    if (urg === "Low") return "bg-[#e6f4ea] text-[#1e8e3e]";
    return "bg-[#fef7e0] text-[#b06000]";
  };

  const getStatusColor = (status) => {
    if (status === "Solved") return "bg-[#e6f4ea] text-[#1e8e3e]";
    return "bg-white border border-gray-200 text-gray-500";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F4F2EB] flex items-center justify-center">
        <Loader2 className="animate-spin text-[#1a8570]" size={40} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4F2EB] font-sans">
      <div className="max-w-[1100px] mx-auto px-6 py-10">
        
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <span className="text-[#1a8570] text-[10px] font-bold tracking-[0.15em] uppercase mb-2 block">
                Dashboard
            </span>
            <h1 className="text-4xl font-extrabold text-[#111] tracking-tight">Good morning, Explorer</h1>
            <p className="text-gray-500 mt-2 text-[15px]">Check out what the community is solving today.</p>
          </div>
          
          <button 
            onClick={() => navigate("/create-request")}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-[#1a8570] text-white rounded-full hover:bg-[#156d5b] transition-all duration-200 shadow-md font-bold text-[14px]"
          >
            <Plus size={18} />
            Post a request
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
          {statCards.map((stat, index) => (
            <div key={index} className="bg-[#FAF9F5] rounded-[24px] p-6 border border-[#ebe9e1] shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]">
              <p className="text-[10px] font-bold text-[#1a8570] tracking-[0.15em] mb-2 uppercase">{stat.label}</p>
              <p className="text-3xl font-extrabold text-[#111] mb-1">{stat.value}</p>
              <p className="text-[12px] text-gray-500">{stat.sub}</p>
            </div>
          ))}
        </div>

        {/* Search */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
          <div className="flex-1 relative w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search community challenges..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 bg-[#FAF9F5] border border-[#ebe9e1] rounded-2xl focus:outline-none focus:border-[#1a8570] transition-all text-[14.5px]"
            />
          </div>
          <button className="hidden sm:flex items-center gap-2 px-5 py-3.5 bg-[#FAF9F5] border border-[#ebe9e1] rounded-2xl text-gray-700 hover:bg-gray-50 transition-colors font-semibold text-[14px]">
            <Filter size={16} />
            Filters
          </button>
        </div>

        {/* Request Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-6">
          {filteredRequests.map((req) => (
            <div
              key={req._id}
              className="bg-[#FAF9F5] border border-[#ebe9e1] rounded-[32px] p-6 flex flex-col shadow-sm hover:shadow-md transition-all group"
            >
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${getCategoryColor(req.category)}`}>
                    {req.category}
                </span>
                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${getUrgencyColor(req.urgency)}`}>
                    {req.urgency}
                </span>
                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${getStatusColor(req.status)}`}>
                    {req.status}
                </span>
              </div>

              {/* Content */}
              <h3 className="text-[17px] font-bold text-[#111] mb-2 leading-snug group-hover:text-[#1a8570] transition-colors">
                {req.title}
              </h3>
              <p className="text-[13px] text-gray-500 mb-4 line-clamp-2 leading-relaxed">
                {req.description}
              </p>
              
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {(req.tags || []).map((tag, idx) => (
                  <span key={idx} className="bg-[#EBEEEB] text-gray-600 text-[10px] font-semibold px-2.5 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Footer */}
              <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="font-bold text-[13px] text-[#111]">{req.author?.username || "Unknown"}</span>
                  <div className="flex items-center gap-1 text-[11px] text-gray-400">
                    <MapPin size={10} />
                    <span>{req.author?.location || "Remote"} • {req.helpers?.length || 0} helper interested</span>
                  </div>
                </div>
                <button 
                  onClick={() => navigate(`/request/${req._id}`)}
                  className="bg-white hover:bg-gray-50 text-gray-800 px-5 py-2.5 rounded-full text-[12px] font-bold shadow-sm border border-gray-100 transition-all flex items-center gap-2"
                >
                  Open details
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredRequests.length === 0 && (
          <div className="text-center py-20 bg-white/50 rounded-[32px] border border-dashed border-gray-300">
            <h3 className="text-xl font-bold text-gray-400">No requests found</h3>
            <p className="text-gray-400 mt-1">Try adjusting your search term.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MainContent;