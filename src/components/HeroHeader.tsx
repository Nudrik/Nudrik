import React, { useState } from 'react';
import { 
  FileText, 
  Globe, 
  Github, 
  Mail, 
  ExternalLink, 
  Copy, 
  Check, 
  Terminal,
  Code2,
  ArrowDown,
  HeartHandshake,
  Instagram
} from 'lucide-react';
import { PROFILE_INFO } from '../data/profileData';
import { ProfileViewsCounter } from './ProfileViewsCounter';

interface HeroHeaderProps {
  onOpenResume: () => void;
}

export const HeroHeader: React.FC<HeroHeaderProps> = ({ onOpenResume }) => {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(PROFILE_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scrollToProjects = () => {
    const el = document.getElementById('projects');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative pt-24 pb-10 sm:pt-28 sm:pb-14 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#58a6ff]/10 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div className="absolute top-1/3 left-1/4 w-[350px] h-[250px] bg-[#3fb950]/10 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div className="absolute top-1/3 right-1/4 w-[350px] h-[250px] bg-[#d2a8ff]/10 rounded-full blur-3xl pointer-events-none -z-10"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* SVG Typing Header banner */}
        <div className="relative rounded-2xl overflow-hidden border border-[#30363d] shadow-2xl bg-[#0d1117] mb-8 group">
          <div className="flex items-center justify-between px-4 py-2.5 bg-[#161b22] border-b border-[#30363d] text-xs text-[#8b949e] font-mono">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#ff5f56] inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-[#ffbd2e] inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-[#27c93f] inline-block"></span>
              <span className="ml-2 text-[#e6edf3]">nudrik/profile-terminal.sh</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-[#3fb950] flex items-center gap-1 font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-[#3fb950] animate-ping"></span>
                ACTIVE
              </span>
            </div>
          </div>

          <div className="w-full flex items-center justify-center p-2 sm:p-4 bg-[#0d1117]">
            <img 
              src="/assets/typing-header.svg" 
              alt="Nudrik Raju Header" 
              className="w-full max-w-4xl h-auto block select-none pointer-events-none" 
            />
          </div>
        </div>

        {/* Action Badges Row */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mb-8">
          {/* Blood Bank Live App Badge */}
          <a
            id="badge-blood-bank"
            href={PROFILE_INFO.bloodBankUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-[#e63946]/20 hover:bg-[#e63946]/30 text-[#ff7b72] border border-[#e63946]/40 text-xs font-semibold uppercase tracking-wider transition-all shadow-sm group cursor-pointer"
          >
            <HeartHandshake className="w-4 h-4 text-[#e63946] group-hover:scale-110 transition-transform" />
            <span>Blood Bank App</span>
            <ExternalLink className="w-3 h-3 opacity-70" />
          </a>

          {/* Portfolio badge */}
          <a
            id="badge-portfolio"
            href={PROFILE_INFO.portfolioUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-[#8a2be2]/20 hover:bg-[#8a2be2]/30 text-[#d2a8ff] border border-[#8a2be2]/40 text-xs font-semibold uppercase tracking-wider transition-all shadow-sm"
          >
            <Globe className="w-4 h-4 text-[#d2a8ff]" />
            <span>Portfolio</span>
            <ExternalLink className="w-3 h-3 opacity-70" />
          </a>

          {/* Resume badge */}
          <button
            id="badge-resume"
            onClick={onOpenResume}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-[#238636]/20 hover:bg-[#238636]/30 text-[#3fb950] border border-[#238636]/40 text-xs font-semibold uppercase tracking-wider transition-all shadow-sm cursor-pointer"
          >
            <FileText className="w-4 h-4 text-[#3fb950]" />
            <span>Resume</span>
          </button>

          {/* GitHub Follow badge */}
          <a
            id="badge-github"
            href={PROFILE_INFO.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-[#21262d] hover:bg-[#30363d] text-[#e6edf3] border border-[#30363d] text-xs font-semibold uppercase tracking-wider transition-all shadow-sm"
          >
            <Github className="w-4 h-4 text-[#e6edf3]" />
            <span>GitHub</span>
            <ExternalLink className="w-3 h-3 opacity-70" />
          </a>

          {/* LeetCode badge */}
          <a
            id="badge-leetcode"
            href={PROFILE_INFO.leetcodeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-[#d29922]/20 hover:bg-[#d29922]/30 text-[#e3b341] border border-[#d29922]/40 text-xs font-semibold uppercase tracking-wider transition-all shadow-sm"
          >
            <Code2 className="w-4 h-4 text-[#e3b341]" />
            <span>LeetCode</span>
          </a>

          {/* Instagram badge */}
          <a
            id="badge-instagram"
            href={PROFILE_INFO.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-[#e4405f]/20 hover:bg-[#e4405f]/30 text-[#ff7b72] border border-[#e4405f]/40 text-xs font-semibold uppercase tracking-wider transition-all shadow-sm"
          >
            <Instagram className="w-4 h-4 text-[#e4405f]" />
            <span>@NUDRIK_RAJU_BAHATAM</span>
            <ExternalLink className="w-3 h-3 opacity-70" />
          </a>

          {/* HackerRank badge */}
          <a
            id="badge-hackerrank"
            href={PROFILE_INFO.hackerrankUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-[#238636]/20 hover:bg-[#238636]/30 text-[#7ee787] border border-[#238636]/40 text-xs font-semibold uppercase tracking-wider transition-all shadow-sm"
          >
            <Terminal className="w-4 h-4 text-[#7ee787]" />
            <span>HackerRank</span>
          </a>

          {/* Live Profile Views badge */}
          <ProfileViewsCounter username={PROFILE_INFO.handle} />
        </div>

        {/* Quick Contact bar & Email copier */}
        <div className="flex flex-wrap items-center justify-center gap-3 max-w-xl mx-auto p-3 rounded-xl bg-[#161b22]/70 border border-[#30363d] text-sm">
          <div className="flex items-center gap-2 text-xs text-[#8b949e] font-mono">
            <Mail className="w-3.5 h-3.5 text-[#58a6ff]" />
            <span className="text-[#e6edf3] select-all">{PROFILE_INFO.email}</span>
          </div>
          <button
            id="copy-email-btn"
            onClick={copyEmail}
            className="flex items-center gap-1 px-2.5 py-1 text-xs rounded bg-[#21262d] hover:bg-[#30363d] text-[#e6edf3] border border-[#30363d] transition-colors cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3 h-3 text-[#3fb950]" />
                <span className="text-[#3fb950]">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3 text-[#8b949e]" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>

        {/* Jump down to projects */}
        <div className="mt-8 flex flex-col items-center justify-center gap-1">
          <span className="text-[11px] font-mono text-[#8b949e]">Explore Projects & Profile</span>
          <button 
            id="scroll-to-projects-btn"
            onClick={scrollToProjects}
            className="p-2 text-[#8b949e] hover:text-[#58a6ff] hover:bg-[#21262d] rounded-full transition-all cursor-pointer"
            aria-label="Scroll to projects"
          >
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </button>
        </div>

        {/* Section Divider SVG */}
        <div className="w-full my-6 flex justify-center">
          <img src="/assets/section-divider.svg" alt="Divider" className="w-full max-w-3xl opacity-80" />
        </div>
      </div>
    </section>
  );
};
