import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  MapPin,
  Clock,
  ArrowRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MainContent = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  // Sample data inspired by the Landing mockup
  const requests = [
    {
      id: 1,
      title: "Need help making my portfolio responsive before demo day",
      description: "My HTML/CSS portfolio breaks on tablets and I need layout guidance before tomorrow evening.",
      tags: ["HTML/CSS", "Responsive", "Portfolio"],
      category: "Web Development",
      urgency: "High",
      status: "Solved",
      author: "Sara Noor",
      location: "Karachi",
      helpers: 1
    },
    {
      id: 2,
      title: "Looking for Figma feedback on a volunteer event poster",
      description: "I have a draft poster for a campus community event and want sharper hierarchy, spacing, and CTA copy.",
      tags: ["Figma", "Poster", "Design Review"],
      category: "Design",
      urgency: "Medium",
      status: "Open",
      author: "Ayesha Khan",
      location: "Lahore",
      helpers: 2
    },
    {
      id: 3,
      title: "JavaScript quiz app debugging",
      description: "Need help with some closure issues in my latest React project logic.",
      tags: ["JavaScript", "React", "Debugging"],
      category: "Web Development",
      urgency: "High",
      status: "Open",
      author: "Ali Ahmed",
      location: "Karachi",
      helpers: 0
    },
    {
      id: 4,
      title: "Database optimization for learning portal",
      description: "Queries are running slow on large datasets. Looking for indexing advice.",
      tags: ["SQL", "Backend", "Performance"],
      category: "Web Development",
      urgency: "Medium",
      status: "Open",
      author: "Zainab B.",
      location: "Islamabad",
      helpers: 3
    }
  ];

  // Quick stats
  const stats = [
    { label: 'MEMBERS', value: '384+', sub: 'Students, mentors, & helpers.' },
    { label: 'REQUESTS', value: '72+', sub: 'Support posts shared.' },
    { label: 'SOLVED', value: '69+', sub: 'Problems resolved through action.' },
  ];

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
          {stats.map((stat, index) => (
            <div key={index} className="bg-[#FAF9F5] rounded-[24px] p-6 border border-[#ebe9e1] shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]">
              <p className="text-[10px] font-bold text-[#1a8570] tracking-[0.15em] mb-2 uppercase">{stat.label}</p>
              <p className="text-3xl font-extrabold text-[#111] mb-1">{stat.value}</p>
              <p className="text-[12px] text-gray-500">{stat.sub}</p>
            </div>
          ))}
        </div>

        {/* Search and Filters */}
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

        {/* Community Feed / Request Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-6">
          {requests.map((req) => (
            <div
              key={req.id}
              className="bg-[#FAF9F5] border border-[#ebe9e1] rounded-[32px] p-6 flex flex-col shadow-sm hover:shadow-md transition-all group"
            >
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                    req.category === "Design" ? "bg-[#e8f0fe] text-[#1967d2]" : "bg-[#e4efed] text-[#1a8570]"
                }`}>
                    {req.category}
                </span>
                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                    req.urgency === "High" ? "bg-[#feeceb] text-[#d93025]" : "bg-[#fef7e0] text-[#b06000]"
                }`}>
                    {req.urgency}
                </span>
                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                    req.status === "Solved" ? "bg-[#e6f4ea] text-[#1e8e3e]" : "bg-white border border-gray-200 text-gray-500"
                }`}>
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
              
              {/* Internal Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {req.tags.map((tag, idx) => (
                  <span key={idx} className="bg-[#EBEEEB] text-gray-600 text-[10px] font-semibold px-2.5 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Footer */}
              <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="font-bold text-[13px] text-[#111]">{req.author}</span>
                  <div className="flex items-center gap-1 text-[11px] text-gray-400">
                    <MapPin size={10} />
                    <span>{req.location} • {req.helpers} helper interested</span>
                  </div>
                </div>
                <button className="bg-white hover:bg-gray-50 text-gray-800 px-5 py-2.5 rounded-full text-[12px] font-bold shadow-sm border border-gray-100 transition-all flex items-center gap-2">
                  Open details
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State Check (not needed for sample, but good practice) */}
        {requests.length === 0 && (
          <div className="text-center py-20 bg-white/50 rounded-[32px] border border-dashed border-gray-300">
            <h3 className="text-xl font-bold text-gray-400">No requests found</h3>
            <p className="text-gray-400 mt-1">Try adjusting your filters or search term.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MainContent;