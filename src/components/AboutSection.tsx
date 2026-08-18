import React from 'react';
import { 
  Rocket, 
  Users, 
  BookOpen, 
  Lightbulb, 
  MessageSquare, 
  Zap, 
  Brain,
  Sparkles,
  CheckCircle2,
  Code
} from 'lucide-react';
import { TopLanguagesBreakdown } from './TopLanguagesBreakdown';

export const AboutSection: React.FC = () => {
  const highlights = [
    {
      icon: <Rocket className="w-5 h-5 text-[#58a6ff]" />,
      title: 'Scalable Full-Stack Engineering',
      desc: 'Passionate about crafting modular, resilient full-stack applications and solving algorithmic problems through clean DSA principles.',
    },
    {
      icon: <Users className="w-5 h-5 text-[#3fb950]" />,
      title: 'High-Impact Collaboration',
      desc: 'Excited to collaborate on impactful projects across Web Development, Artificial Intelligence, and Machine Learning systems.',
    },
    {
      icon: <BookOpen className="w-5 h-5 text-[#d2a8ff]" />,
      title: 'Continuous Innovation',
      desc: 'Actively exploring advanced DSA paradigms, distributed backend architectures, Machine Learning pipelines, and Generative AI agents.',
    },
    {
      icon: <Lightbulb className="w-5 h-5 text-[#f0883e]" />,
      title: 'Value-Driven Solutions',
      desc: 'Focused on engineering high-utility software that solves tangible real-world problems with fluid user experiences.',
    },
    {
      icon: <MessageSquare className="w-5 h-5 text-[#79c0ff]" />,
      title: 'Consult & Chat',
      desc: 'Ask me about Full Stack Development (React, Node.js, Express), Python, Java, Data Structures, and AI/ML fundamentals.',
    },
    {
      icon: <Zap className="w-5 h-5 text-[#e3b341]" />,
      title: 'Beyond the Terminal',
      desc: 'Outside of coding, I enjoy reading technical literature, staying ahead with bleeding-edge tech trends, and self-improvement.',
    },
  ];

  return (
    <section id="about" className="py-12 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-[#58a6ff]/10 border border-[#58a6ff]/30 flex items-center justify-center text-[#58a6ff]">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-[#e6edf3] font-mono tracking-tight flex items-center gap-2">
              <span>About Me</span>
              <span className="text-xs font-normal text-[#8b949e] px-2 py-0.5 rounded bg-[#21262d] border border-[#30363d]">
                Bio & Focus
              </span>
            </h2>
            <p className="text-sm text-[#8b949e]">Background, engineering ethos, and current technological vectors</p>
          </div>
        </div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Highlights Grid */}
          <div className="lg:col-span-7 space-y-4">
            <div className="p-6 rounded-2xl bg-[#161b22]/70 border border-[#30363d] shadow-sm">
              <h3 className="text-base font-semibold text-[#e6edf3] mb-4 flex items-center gap-2">
                <Code className="w-4 h-4 text-[#58a6ff]" />
                <span>Engineering Profile</span>
              </h3>
              
              <div className="space-y-4">
                {highlights.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3.5 p-3 rounded-xl bg-[#0d1117]/60 border border-[#21262d] hover:border-[#30363d] transition-colors">
                    <div className="p-2 rounded-lg bg-[#161b22] border border-[#30363d] shrink-0 mt-0.5">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-[#e6edf3] mb-0.5">{item.title}</h4>
                      <p className="text-xs text-[#8b949e] leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Focus Card & Top Languages Card */}
          <div className="lg:col-span-5 space-y-6">
            {/* Current Focus Banner */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-[#161b22] to-[#0d1117] border border-[#30363d] shadow-lg">
              <div className="flex items-center gap-2 mb-3">
                <Brain className="w-5 h-5 text-[#3fb950]" />
                <h3 className="text-sm font-semibold text-[#e6edf3] uppercase tracking-wider font-mono">
                  Current Focus: GenAI & ML
                </h3>
              </div>
              <p className="text-xs text-[#8b949e] mb-4 leading-relaxed">
                Actively engineering production LLM applications, multimodal generative pipelines, autonomous agent architectures, and deep neural algorithms.
              </p>

              <div className="flex flex-wrap gap-2">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#58a6ff]/10 border border-[#58a6ff]/30 text-[#58a6ff] text-xs font-mono font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>🔭 Working on AI Projects</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#3fb950]/10 border border-[#3fb950]/30 text-[#3fb950] text-xs font-mono font-medium">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>🌱 Learning Generative AI</span>
                </div>
              </div>
            </div>

            {/* GitHub Top Languages Live Telemetry Card */}
            <TopLanguagesBreakdown />
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
