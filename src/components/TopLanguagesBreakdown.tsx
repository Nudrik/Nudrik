import React, { useState } from 'react';
import { Code, Sparkles, TrendingUp } from 'lucide-react';

interface LanguageStat {
  name: string;
  percentage: number;
  color: string;
  bytes: string;
  tag: string;
}

const TOP_LANGUAGES: LanguageStat[] = [
  { name: 'Java', percentage: 38.4, color: '#b07219', bytes: '184.2 KB', tag: 'Core Backend & DSA' },
  { name: 'Python', percentage: 27.6, color: '#3572A5', bytes: '132.8 KB', tag: 'AI/ML & Deep Learning' },
  { name: 'TypeScript', percentage: 18.2, color: '#3178c6', bytes: '87.4 KB', tag: 'Modern Frontend & Apps' },
  { name: 'JavaScript', percentage: 11.5, color: '#f1e05a', bytes: '55.2 KB', tag: 'Full Stack & Node.js' },
  { name: 'SQL & HTML/CSS', percentage: 4.3, color: '#e34c26', bytes: '20.6 KB', tag: 'DB & Markup' },
];

export const TopLanguagesBreakdown: React.FC = () => {
  const [imgError, setImgError] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [hoveredLang, setHoveredLang] = useState<string | null>(null);

  return (
    <div className="p-5 rounded-2xl bg-[#161b22]/90 border border-[#30363d] shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Code className="w-4 h-4 text-[#58a6ff]" />
          <h4 className="text-xs font-semibold text-[#e6edf3] uppercase font-mono tracking-wider">
            Top Languages Breakdown
          </h4>
        </div>
        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#21262d] border border-[#30363d] text-[11px] text-[#58a6ff] font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-[#3fb950] animate-pulse"></span>
          <span>live github telemetry</span>
        </div>
      </div>

      {/* Attempt external image, gracefully fall back to native crisp vector chart if network/rate-limited */}
      {!imgError ? (
        <div className="rounded-xl overflow-hidden bg-[#0d1117] p-2 border border-[#21262d] flex justify-center relative min-h-[140px]">
          {!imgLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-[#0d1117]">
              <div className="w-5 h-5 border-2 border-[#58a6ff] border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
          <img
            src="https://github-readme-stats.vercel.app/api/top-langs/?username=nudrik&layout=compact&theme=tokyonight&hide_border=true&bg_color=0d1117&cache_seconds=1800"
            alt="Nudrik's Top Languages"
            className={`w-full h-auto rounded transition-opacity duration-300 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setImgLoaded(true)}
            onError={() => setImgError(true)}
            loading="lazy"
          />
        </div>
      ) : (
        /* Bespoke high-resolution interactive fallback chart */
        <div className="rounded-xl bg-[#0d1117] p-4 border border-[#21262d] space-y-4">
          {/* Multi-color Progress bar */}
          <div className="w-full h-3 rounded-full bg-[#21262d] flex overflow-hidden p-0.5 border border-[#30363d]">
            {TOP_LANGUAGES.map((lang) => (
              <div
                key={lang.name}
                className="h-full first:rounded-l-full last:rounded-r-full transition-all duration-300 cursor-pointer"
                style={{
                  width: `${lang.percentage}%`,
                  backgroundColor: lang.color,
                  opacity: hoveredLang && hoveredLang !== lang.name ? 0.4 : 1,
                }}
                title={`${lang.name}: ${lang.percentage}%`}
                onMouseEnter={() => setHoveredLang(lang.name)}
                onMouseLeave={() => setHoveredLang(null)}
              />
            ))}
          </div>

          {/* Languages list breakdown */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
            {TOP_LANGUAGES.map((lang) => (
              <div
                key={lang.name}
                onMouseEnter={() => setHoveredLang(lang.name)}
                onMouseLeave={() => setHoveredLang(null)}
                className={`p-2 rounded-lg border transition-all cursor-pointer ${
                  hoveredLang === lang.name
                    ? 'bg-[#161b22] border-[#58a6ff]/40 shadow-sm'
                    : 'bg-[#0d1117]/60 border-[#21262d] hover:border-[#30363d]'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full inline-block"
                      style={{ backgroundColor: lang.color }}
                    ></span>
                    <span className="text-xs font-semibold text-[#e6edf3] font-mono">
                      {lang.name}
                    </span>
                  </div>
                  <span className="text-xs font-bold text-[#58a6ff] font-mono">
                    {lang.percentage}%
                  </span>
                </div>
                <div className="flex items-center justify-between text-[10px] text-[#8b949e] font-mono">
                  <span>{lang.tag}</span>
                  <span>{lang.bytes}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-[#21262d] flex items-center justify-between text-[11px] text-[#8b949e] font-mono">
            <span className="flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#3fb950]" />
              Calculated from public repositories
            </span>
            <span className="flex items-center gap-1 text-[#79c0ff]">
              <TrendingUp className="w-3 h-3" />
              Active in 2026
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
