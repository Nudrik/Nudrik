import React, { useState, useMemo } from 'react';
import { 
  Layers, 
  Search, 
  Code, 
  Layout, 
  Server, 
  Database, 
  Cloud, 
  Wrench
} from 'lucide-react';
import { TECH_ITEMS } from '../data/profileData';
import { TechItem } from '../types';

export const TechStackSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeItem, setActiveItem] = useState<TechItem | null>(null);

  const categories = [
    { id: 'all', label: 'All Tech', icon: <Layers className="w-4 h-4" /> },
    { id: 'languages', label: 'Languages', icon: <Code className="w-4 h-4" /> },
    { id: 'frontend', label: 'Frontend', icon: <Layout className="w-4 h-4" /> },
    { id: 'backend', label: 'Backend', icon: <Server className="w-4 h-4" /> },
    { id: 'databases', label: 'Databases', icon: <Database className="w-4 h-4" /> },
    { id: 'cloud', label: 'Cloud & DevOps', icon: <Cloud className="w-4 h-4" /> },
    { id: 'tools', label: 'Tools', icon: <Wrench className="w-4 h-4" /> },
  ];

  const filteredItems = useMemo(() => {
    return TECH_ITEMS.filter((item) => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section id="techstack" className="py-12 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#58a6ff]/10 border border-[#58a6ff]/30 flex items-center justify-center text-[#58a6ff]">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[#e6edf3] font-mono tracking-tight flex items-center gap-2">
                <span>Tech Stack & Tools</span>
                <span className="text-xs font-normal text-[#8b949e] px-2 py-0.5 rounded bg-[#21262d] border border-[#30363d]">
                  {TECH_ITEMS.length} Technologies
                </span>
              </h2>
              <p className="text-sm text-[#8b949e]">
                Core programming languages, frameworks, persistence engines, and infrastructure
              </p>
            </div>
          </div>

          {/* Search box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#8b949e]" />
            <input
              id="tech-search-input"
              type="text"
              placeholder="Search tech, tools, or DBs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg bg-[#161b22] border border-[#30363d] text-[#e6edf3] placeholder-[#8b949e] focus:outline-none focus:border-[#58a6ff] focus:ring-1 focus:ring-[#58a6ff]"
            />
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-6 scrollbar-none">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                id={`cat-filter-${cat.id}`}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-mono whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#58a6ff] text-[#0d1117] font-semibold shadow-md shadow-[#58a6ff]/20'
                    : 'bg-[#161b22] hover:bg-[#21262d] text-[#8b949e] hover:text-[#e6edf3] border border-[#30363d]'
                }`}
              >
                {cat.icon}
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tech Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5">
          {filteredItems.map((item) => {
            const isSelected = activeItem?.id === item.id;
            return (
              <div
                key={item.id}
                id={`tech-item-${item.id}`}
                onClick={() => setActiveItem(isSelected ? null : item)}
                className={`p-4 rounded-xl border transition-all cursor-pointer group ${
                  isSelected
                    ? 'bg-[#1c2128] border-[#58a6ff] shadow-md shadow-[#58a6ff]/10 ring-1 ring-[#58a6ff]/40'
                    : 'bg-[#161b22]/70 hover:bg-[#161b22] border-[#30363d]/80 hover:border-[#58a6ff]/50'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2.5">
                    <span 
                      className="w-3 h-3 rounded-full shrink-0 shadow-sm"
                      style={{ backgroundColor: item.color }}
                    ></span>
                    <span className="text-sm font-bold text-[#e6edf3] font-mono group-hover:text-[#58a6ff] transition-colors">
                      {item.name}
                    </span>
                  </div>
                  {item.level && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#21262d] text-[#8b949e] border border-[#30363d]">
                      {item.level}
                    </span>
                  )}
                </div>

                <p className="text-xs text-[#8b949e] line-clamp-2 leading-relaxed mb-3">
                  {item.description}
                </p>

                {/* Shield badge preview */}
                <div className="pt-2 border-t border-[#21262d] flex items-center justify-between text-[11px]">
                  <span className="text-[#6e7681] font-mono uppercase text-[10px]">
                    {item.category}
                  </span>
                  <span className="text-[10px] text-[#58a6ff] font-mono group-hover:underline">
                    {isSelected ? 'close' : 'details'}
                  </span>
                </div>

                {/* Expanded details if selected */}
                {isSelected && (
                  <div className="mt-3 pt-3 border-t border-[#30363d] space-y-2">
                    <div className="p-2 rounded bg-[#0d1117] border border-[#21262d] text-xs text-[#c9d1d9]">
                      <div className="font-semibold text-[#58a6ff] mb-1 font-mono">Overview:</div>
                      {item.description}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12 p-6 rounded-2xl bg-[#161b22]/50 border border-[#30363d]">
            <p className="text-sm text-[#8b949e]">No technologies found matching "{searchQuery}".</p>
          </div>
        )}

        {/* Section Divider SVG */}
        <div className="w-full my-8 flex justify-center">
          <img src="/assets/section-divider.svg" alt="Divider" className="w-full max-w-3xl opacity-80" />
        </div>
      </div>
    </section>
  );
};
