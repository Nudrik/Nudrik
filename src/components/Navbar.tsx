import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Sparkles, 
  Layers, 
  BarChart3, 
  Network, 
  Mail, 
  ExternalLink,
  Github,
  Rocket,
  HeartHandshake
} from 'lucide-react';
import { PROFILE_INFO } from '../data/profileData';

interface NavbarProps {
  onOpenResume: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenResume }) => {
  const [scrolled, setScrolled] = useState(false);

  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const sections = ['hero', 'projects', 'about', 'aiml', 'techstack', 'analytics', 'neural', 'contact'];
      const scrollPos = window.scrollY + 100;
      for (const s of sections) {
        const el = document.getElementById(s);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(s);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header 
      id="navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled 
          ? 'bg-black/95 backdrop-blur-md border-b border-[#21262d] shadow-xl shadow-black/80 py-2.5' 
          : 'bg-transparent py-4 border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand */}
        <button 
          id="nav-brand-btn"
          onClick={() => scrollTo('hero')} 
          className="flex items-center gap-2 text-left group focus:outline-none cursor-pointer"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#58a6ff] to-[#3fb950] flex items-center justify-center font-mono font-bold text-[#0d1117] text-sm shadow-md shadow-[#58a6ff]/20 group-hover:scale-105 transition-transform">
            NR
          </div>
          <div>
            <div className="text-sm font-semibold text-[#e6edf3] flex items-center gap-1.5 font-mono">
              <span>{PROFILE_INFO.name}</span>
              <span className="w-2 h-2 rounded-full bg-[#3fb950] animate-pulse"></span>
            </div>
            <div className="text-[11px] text-[#8b949e]">Full Stack & AI/ML</div>
          </div>
        </button>

        {/* Navigation links */}
        <nav className="hidden lg:flex items-center gap-1 text-xs text-[#8b949e] font-mono">
          <button 
            id="nav-link-projects"
            onClick={() => scrollTo('projects')}
            className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 transition-colors cursor-pointer ${
              activeSection === 'projects' ? 'text-[#e63946] bg-[#e63946]/10 font-semibold' : 'hover:text-[#e6edf3] hover:bg-[#21262d]'
            }`}
          >
            <Rocket className="w-3.5 h-3.5" />
            <span>Projects</span>
          </button>
          <button 
            id="nav-link-about"
            onClick={() => scrollTo('about')}
            className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
              activeSection === 'about' ? 'text-[#58a6ff] bg-[#58a6ff]/10 font-semibold' : 'hover:text-[#e6edf3] hover:bg-[#21262d]'
            }`}
          >
            About
          </button>
          <button 
            id="nav-link-aiml"
            onClick={() => scrollTo('aiml')}
            className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 transition-colors cursor-pointer ${
              activeSection === 'aiml' ? 'text-[#3fb950] bg-[#3fb950]/10 font-semibold' : 'hover:text-[#e6edf3] hover:bg-[#21262d]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI & ML</span>
          </button>
          <button 
            id="nav-link-techstack"
            onClick={() => scrollTo('techstack')}
            className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 transition-colors cursor-pointer ${
              activeSection === 'techstack' ? 'text-[#58a6ff] bg-[#58a6ff]/10 font-semibold' : 'hover:text-[#e6edf3] hover:bg-[#21262d]'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Tech Stack</span>
          </button>
          <button 
            id="nav-link-analytics"
            onClick={() => scrollTo('analytics')}
            className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 transition-colors cursor-pointer ${
              activeSection === 'analytics' ? 'text-[#d2a8ff] bg-[#d2a8ff]/10 font-semibold' : 'hover:text-[#e6edf3] hover:bg-[#21262d]'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Analytics</span>
          </button>
          <button 
            id="nav-link-neural"
            onClick={() => scrollTo('neural')}
            className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 transition-colors cursor-pointer ${
              activeSection === 'neural' ? 'text-[#7ee787] bg-[#7ee787]/10 font-semibold' : 'hover:text-[#e6edf3] hover:bg-[#21262d]'
            }`}
          >
            <Network className="w-3.5 h-3.5" />
            <span>Neural Graph</span>
          </button>
          <button 
            id="nav-link-contact"
            onClick={() => scrollTo('contact')}
            className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 transition-colors cursor-pointer ${
              activeSection === 'contact' ? 'text-[#f0883e] bg-[#f0883e]/10 font-semibold' : 'hover:text-[#e6edf3] hover:bg-[#21262d]'
            }`}
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Contact</span>
          </button>
        </nav>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          {/* Blood Bank Live Quick Link */}
          <a
            id="nav-bloodbank-btn"
            href={PROFILE_INFO.bloodBankUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-semibold rounded-md bg-[#e63946]/20 hover:bg-[#e63946]/30 text-[#ff7b72] border border-[#e63946]/40 transition-colors"
          >
            <HeartHandshake className="w-3.5 h-3.5 text-[#e63946]" />
            <span>Blood Bank App</span>
            <ExternalLink className="w-3 h-3 opacity-70" />
          </a>

          <button
            id="nav-resume-btn"
            onClick={onOpenResume}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md bg-[#238636] hover:bg-[#2ea043] text-white transition-all shadow-sm shadow-[#238636]/30 cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Resume</span>
          </button>


          <a
            id="nav-github-link"
            href={PROFILE_INFO.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-md bg-[#21262d] hover:bg-[#30363d] text-[#e6edf3] border border-[#30363d] transition-colors"
          >
            <Github className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">GitHub</span>
            <ExternalLink className="w-3 h-3 text-[#8b949e]" />
          </a>
        </div>
      </div>
    </header>
  );
};
