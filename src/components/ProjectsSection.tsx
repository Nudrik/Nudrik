import React from 'react';
import { 
  Rocket, 
  ExternalLink, 
  Github, 
  Activity, 
  CheckCircle2, 
  ShieldCheck, 
  Layers,
  HeartHandshake,
  Globe
} from 'lucide-react';
import { FEATURED_PROJECTS } from '../data/profileData';

export const ProjectsSection: React.FC = () => {
  return (
    <section id="projects" className="py-12 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#e63946]/10 border border-[#e63946]/30 flex items-center justify-center text-[#e63946]">
              <Rocket className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[#e6edf3] font-mono tracking-tight flex items-center gap-2">
                <span>Featured Projects</span>
                <span className="text-xs font-normal text-[#e63946] px-2 py-0.5 rounded bg-[#e63946]/10 border border-[#e63946]/30">
                  Live Deployments
                </span>
              </h2>
              <p className="text-sm text-[#8b949e]">
                Production-ready full-stack applications, real-time healthcare systems, and AI showcases
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#161b22] border border-[#30363d] text-xs font-mono text-[#3fb950]">
            <span className="w-2 h-2 rounded-full bg-[#3fb950] animate-ping"></span>
            <span>Hosted & Accessible Online</span>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {FEATURED_PROJECTS.map((project) => {
            const isBloodBank = project.iconType === 'bloodbank';
            return (
              <div
                key={project.id}
                id={`featured-project-${project.id}`}
                className="relative rounded-2xl bg-gradient-to-br from-[#161b22] to-[#0d1117] border border-[#30363d] p-6 shadow-xl hover:border-[#58a6ff]/50 transition-all flex flex-col justify-between group"
              >
                {/* Accent top gradient bar */}
                <div 
                  className="absolute top-0 left-6 right-6 h-[2px] rounded-full opacity-80 group-hover:opacity-100 transition-opacity"
                  style={{ 
                    background: isBloodBank 
                      ? 'linear-gradient(90deg, #e63946, #f0883e)' 
                      : 'linear-gradient(90deg, #8a2be2, #58a6ff)' 
                  }}
                />

                <div>
                  {/* Top Category & Status Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div 
                        className="p-2 rounded-lg border"
                        style={{ 
                          backgroundColor: isBloodBank ? '#e639461a' : '#8a2be21a',
                          borderColor: isBloodBank ? '#e639464d' : '#8a2be24d',
                          color: isBloodBank ? '#e63946' : '#a371f7'
                        }}
                      >
                        {isBloodBank ? <HeartHandshake className="w-5 h-5" /> : <Globe className="w-5 h-5" />}
                      </div>
                      <div>
                        <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#8b949e]">
                          {project.category}
                        </span>
                        <div className="text-[11px] text-[#3fb950] flex items-center gap-1 font-mono">
                          <Activity className="w-3 h-3" />
                          <span>{project.status}</span>
                        </div>
                      </div>
                    </div>

                    {/* Live Badge */}
                    <span 
                      className="text-xs font-mono px-3 py-1 rounded-full font-semibold border flex items-center gap-1.5"
                      style={{ 
                        backgroundColor: `${project.badgeColor}1a`, 
                        borderColor: `${project.badgeColor}66`,
                        color: project.badgeColor === '#E63946' ? '#ff7b72' : '#d2a8ff' 
                      }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: project.badgeColor }}></span>
                      {project.badgeText}
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="text-lg font-bold text-[#e6edf3] font-mono group-hover:text-[#58a6ff] transition-colors mb-1">
                    {project.title}
                  </h3>
                  <p className="text-xs font-mono text-[#58a6ff] mb-3">
                    {project.tagline}
                  </p>

                  <p className="text-xs text-[#8b949e] leading-relaxed mb-4">
                    {project.description}
                  </p>

                  {/* Key Highlights */}
                  <div className="p-3.5 rounded-xl bg-[#0d1117]/80 border border-[#21262d] mb-4 space-y-2">
                    <div className="text-[11px] font-mono font-semibold text-[#e6edf3] uppercase tracking-wider flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#3fb950]" />
                      <span>Architecture & Core Capabilities</span>
                    </div>
                    <ul className="space-y-1.5">
                      {project.highlights.map((h, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-[#c9d1d9]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#3fb950] shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech Stack Pills */}
                  <div className="mb-6">
                    <div className="text-[10px] font-mono text-[#8b949e] uppercase mb-2 flex items-center gap-1">
                      <Layers className="w-3 h-3" />
                      <span>Built With</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {project.techStack.map((tech, idx) => (
                        <span 
                          key={idx}
                          className="px-2 py-0.5 rounded-md bg-[#21262d] border border-[#30363d] text-[11px] font-mono text-[#e6edf3]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Action Buttons */}
                <div className="pt-4 border-t border-[#21262d] flex items-center gap-3">
                  <a
                    id={`project-live-btn-${project.id}`}
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-mono font-bold text-white transition-all shadow-md cursor-pointer"
                    style={{ 
                      backgroundColor: isBloodBank ? '#e63946' : '#8a2be2',
                      boxShadow: isBloodBank ? '0 4px 14px rgba(230, 57, 70, 0.35)' : '0 4px 14px rgba(138, 43, 226, 0.35)'
                    }}
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Launch Live Application</span>
                  </a>

                  {project.githubUrl && (
                    <a
                      id={`project-github-btn-${project.id}`}
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl bg-[#21262d] hover:bg-[#30363d] border border-[#30363d] text-[#e6edf3] transition-colors"
                      aria-label="View Source on GitHub"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Section Divider SVG */}
        <div className="w-full my-8 flex justify-center">
          <img src="/assets/section-divider.svg" alt="Divider" className="w-full max-w-3xl opacity-80" />
        </div>
      </div>
    </section>
  );
};
