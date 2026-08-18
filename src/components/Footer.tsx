import React from 'react';
import { ArrowUp } from 'lucide-react';
import { PROFILE_INFO } from '../data/profileData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="footer" className="py-12 border-t border-[#21262d] bg-black relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand info */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#58a6ff] to-[#3fb950] flex items-center justify-center font-mono font-bold text-[#0d1117] text-xs">
              NR
            </div>
            <div>
              <div className="text-sm font-semibold text-[#e6edf3] font-mono">
                {PROFILE_INFO.name}
              </div>
              <div className="text-xs text-[#8b949e]">
                Full Stack & AI/ML Engineer
              </div>
            </div>
          </div>

          {/* Badges & Actions */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0d1117] border border-[#21262d] text-[#8b949e] text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-[#3fb950]"></span>
              <span>MIT License</span>
            </div>
          </div>

          {/* Back to top button */}
          <button
            id="scroll-to-top-btn"
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#161b22] hover:bg-[#21262d] text-[#8b949e] hover:text-[#e6edf3] border border-[#30363d] text-xs font-mono transition-colors cursor-pointer"
          >
            <ArrowUp className="w-3.5 h-3.5" />
            <span>Top</span>
          </button>
        </div>

        <div className="mt-8 pt-6 border-t border-[#21262d] flex flex-col sm:flex-row items-center justify-between text-xs text-[#6e7681] font-mono gap-2">
          <div>
            © {new Date().getFullYear()} Nudrik Raju. All rights reserved.
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#3fb950]"></span>
            <span>Production Ready</span>
          </div>
        </div>
      </div>
    </footer>
  );
};


