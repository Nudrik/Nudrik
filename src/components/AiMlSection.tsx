import React, { useState } from 'react';
import { 
  Brain, 
  Sparkles, 
  Bot, 
  Cpu, 
  Eye, 
  Layers, 
  Check, 
  Terminal,
  Compass
} from 'lucide-react';
import { AI_TOPICS } from '../data/profileData';
import { AiTopic } from '../types';

export const AiMlSection: React.FC = () => {
  const [selectedTopic, setSelectedTopic] = useState<AiTopic>(AI_TOPICS[2]); // Default to GenAI

  const getTopicIcon = (id: string) => {
    switch (id) {
      case 'ml': return <Cpu className="w-5 h-5" />;
      case 'dl': return <Layers className="w-5 h-5" />;
      case 'genai': return <Sparkles className="w-5 h-5" />;
      case 'llm': return <Brain className="w-5 h-5" />;
      case 'cv': return <Eye className="w-5 h-5" />;
      case 'agents': return <Bot className="w-5 h-5" />;
      default: return <Brain className="w-5 h-5" />;
    }
  };

  return (
    <section id="aiml" className="py-12 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#3fb950]/10 border border-[#3fb950]/30 flex items-center justify-center text-[#3fb950]">
              <Brain className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[#e6edf3] font-mono tracking-tight flex items-center gap-2">
                <span>AI & ML Specializations</span>
              </h2>
              <p className="text-sm text-[#8b949e]">
                Building intelligent applications with AI, Machine Learning, and modern LLM technologies
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#161b22] border border-[#30363d] text-xs font-mono text-[#8b949e]">
            <Compass className="w-3.5 h-3.5 text-[#58a6ff]" />
            <span>6 Core AI Domains</span>
          </div>
        </div>

        {/* AI Topics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
          {AI_TOPICS.map((topic) => {
            const isSelected = selectedTopic.id === topic.id;
            return (
              <button
                key={topic.id}
                id={`ai-topic-btn-${topic.id}`}
                onClick={() => setSelectedTopic(topic)}
                className={`p-3.5 rounded-xl text-left transition-all border flex flex-col justify-between cursor-pointer ${
                  isSelected 
                    ? 'bg-[#161b22] border-[#3fb950] shadow-md shadow-[#3fb950]/10 ring-1 ring-[#3fb950]/50 scale-[1.02]' 
                    : 'bg-[#0d1117]/80 hover:bg-[#161b22] border-[#21262d] hover:border-[#30363d]'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div 
                    className="p-2 rounded-lg"
                    style={{ 
                      backgroundColor: `${topic.badgeColor}25`, 
                      color: topic.badgeColor === '#0e4429' ? '#3fb950' : topic.badgeColor 
                    }}
                  >
                    {getTopicIcon(topic.id)}
                  </div>
                  {isSelected && (
                    <span className="w-2 h-2 rounded-full bg-[#3fb950] animate-pulse"></span>
                  )}
                </div>
                <div className="text-xs font-bold text-[#e6edf3] font-mono leading-tight">
                  {topic.title}
                </div>
              </button>
            );
          })}
        </div>

        {/* Detailed Focus Area Box for Selected Topic */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-[#161b22] to-[#0d1117] border border-[#30363d] shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Left: Summary & description */}
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3 mb-3">
                <div 
                  className="p-2.5 rounded-xl border border-[#30363d] bg-[#0d1117]"
                  style={{ color: selectedTopic.badgeColor === '#0e4429' ? '#3fb950' : selectedTopic.badgeColor }}
                >
                  {getTopicIcon(selectedTopic.id)}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#e6edf3] font-mono flex items-center gap-2">
                    <span>{selectedTopic.title}</span>
                    <span className="text-xs px-2 py-0.5 rounded bg-[#21262d] text-[#8b949e] border border-[#30363d] font-normal">
                      Active Exploration
                    </span>
                  </h3>
                  <div className="text-xs text-[#8b949e]">Domain Architecture & Tools</div>
                </div>
              </div>

              <p className="text-sm text-[#c9d1d9] leading-relaxed mb-4">
                {selectedTopic.description}
              </p>

              {/* Technologies */}
              <div className="mb-4">
                <div className="text-xs font-mono font-semibold text-[#8b949e] uppercase mb-2">
                  Key Frameworks & Libraries
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedTopic.technologies.map((tech, idx) => (
                    <span 
                      key={idx}
                      className="px-2.5 py-1 rounded-md bg-[#21262d] border border-[#30363d] text-xs font-mono text-[#58a6ff] font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Focus Areas & Pillars */}
            <div className="lg:col-span-5 p-4 rounded-xl bg-[#0d1117]/80 border border-[#21262d]">
              <div className="text-xs font-mono font-semibold text-[#3fb950] uppercase mb-3 flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5" />
                <span>Focus Pillars & Applied Use-Cases</span>
              </div>
              <ul className="space-y-2.5">
                {selectedTopic.focusAreas.map((area, idx) => (
                  <li key={idx} className="flex items-center gap-2.5 text-xs text-[#e6edf3]">
                    <div className="w-4 h-4 rounded-full bg-[#3fb950]/20 flex items-center justify-center text-[#3fb950] shrink-0">
                      <Check className="w-2.5 h-2.5" />
                    </div>
                    <span>{area}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-4 pt-3 border-t border-[#21262d] flex items-center justify-between text-[11px] text-[#8b949e]">
                <span>Status: <span className="text-[#3fb950]">Actively Implementing</span></span>
                <span className="font-mono">Ready for Collab</span>
              </div>
            </div>
          </div>
        </div>

        {/* Section Divider SVG */}
        <div className="w-full my-8 flex justify-center">
          <img src="/assets/section-divider.svg" alt="Divider" className="w-full max-w-3xl opacity-80" />
        </div>
      </div>
    </section>
  );
};
