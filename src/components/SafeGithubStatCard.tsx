import React, { useState } from 'react';
import { LucideIcon, RefreshCw } from 'lucide-react';

interface SafeGithubStatCardProps {
  title: string;
  subtitle?: string;
  icon: LucideIcon;
  iconColor: string;
  imgSrc: string;
  altText: string;
  fallbackType: 'stats' | 'streak' | 'activity' | 'trophy';
}

export const SafeGithubStatCard: React.FC<SafeGithubStatCardProps> = ({
  title,
  subtitle,
  icon: Icon,
  iconColor,
  imgSrc,
  altText,
  fallbackType,
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const renderFallback = () => {
    switch (fallbackType) {
      case 'stats':
        return (
          <div className="w-full p-4 rounded-xl bg-[#0d1117] border border-[#21262d] text-xs font-mono space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#21262d]">
              <span className="text-[#8b949e]">Nudrik's GitHub Stats</span>
              <span className="px-2 py-0.5 rounded bg-[#238636]/20 text-[#3fb950] text-[10px] font-bold">Grade: A+</span>
            </div>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="flex justify-between">
                <span className="text-[#8b949e]">Total Stars:</span>
                <span className="text-[#e3b341] font-bold">24 ★</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8b949e]">Total Commits:</span>
                <span className="text-[#58a6ff] font-bold">380+</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8b949e]">Total PRs:</span>
                <span className="text-[#a371f7] font-bold">42</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8b949e]">Contributed to:</span>
                <span className="text-[#3fb950] font-bold">12 repos</span>
              </div>
            </div>
          </div>
        );

      case 'streak':
        return (
          <div className="w-full p-4 rounded-xl bg-[#0d1117] border border-[#21262d] text-xs font-mono space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#21262d]">
              <span className="text-[#8b949e]">GitHub Streak Telemetry</span>
              <span className="text-[#f0883e] font-bold">🔥 Active Streak</span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-2 rounded bg-[#161b22] border border-[#21262d]">
                <div className="text-lg font-bold text-[#58a6ff]">120+</div>
                <div className="text-[10px] text-[#8b949e]">Total Days</div>
              </div>
              <div className="p-2 rounded bg-[#161b22] border border-[#21262d]">
                <div className="text-lg font-bold text-[#f0883e]">48</div>
                <div className="text-[10px] text-[#8b949e]">Current Streak</div>
              </div>
              <div className="p-2 rounded bg-[#161b22] border border-[#21262d]">
                <div className="text-lg font-bold text-[#3fb950]">62</div>
                <div className="text-[10px] text-[#8b949e]">Longest Streak</div>
              </div>
            </div>
          </div>
        );

      case 'activity':
        return (
          <div className="w-full p-4 rounded-xl bg-[#0d1117] border border-[#21262d] text-xs font-mono space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[#8b949e]">31-Day Activity Heatmap</span>
              <span className="text-[#3fb950] text-[11px]">84 commits this month</span>
            </div>
            {/* Vector Activity bars representation */}
            <div className="flex items-end gap-1.5 h-16 pt-2 overflow-hidden">
              {[3, 5, 2, 8, 4, 7, 6, 9, 3, 5, 8, 12, 6, 4, 8, 10, 5, 7, 9, 4, 6, 11, 8, 5, 9, 7, 10, 6, 8, 12, 7].map((val, i) => (
                <div
                  key={i}
                  className="flex-1 bg-[#238636] hover:bg-[#39d353] rounded-t transition-all cursor-pointer"
                  style={{ height: `${(val / 12) * 100}%` }}
                  title={`Day ${i + 1}: ${val} commits`}
                />
              ))}
            </div>
          </div>
        );

      case 'trophy':
        return (
          <div className="w-full p-4 rounded-xl bg-[#0d1117] border border-[#21262d] text-xs font-mono">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 rounded-lg bg-[#161b22] border border-[#30363d] text-center">
                <div className="text-xl mb-1">🏆</div>
                <div className="font-bold text-[#e3b341]">A+ Rank</div>
                <div className="text-[10px] text-[#8b949e]">Top Developer</div>
              </div>
              <div className="p-3 rounded-lg bg-[#161b22] border border-[#30363d] text-center">
                <div className="text-xl mb-1">🔥</div>
                <div className="font-bold text-[#f0883e]">Streak Master</div>
                <div className="text-[10px] text-[#8b949e]">Daily Commits</div>
              </div>
              <div className="p-3 rounded-lg bg-[#161b22] border border-[#30363d] text-center">
                <div className="text-xl mb-1">⭐</div>
                <div className="font-bold text-[#58a6ff]">Star Hunter</div>
                <div className="text-[10px] text-[#8b949e]">Open Source</div>
              </div>
              <div className="p-3 rounded-lg bg-[#161b22] border border-[#30363d] text-center">
                <div className="text-xl mb-1">⚡</div>
                <div className="font-bold text-[#3fb950]">AI Builder</div>
                <div className="text-[10px] text-[#8b949e]">ML Architect</div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="p-5 rounded-2xl bg-[#161b22]/70 border border-[#30363d] shadow-sm flex flex-col justify-between">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Icon className={`w-4 h-4 ${iconColor}`} />
          <span className="text-xs font-semibold text-[#e6edf3] font-mono uppercase">
            {title}
          </span>
        </div>
        {subtitle && (
          <span className="text-[11px] text-[#8b949e] font-mono">{subtitle}</span>
        )}
      </div>

      {!hasError ? (
        <div className="rounded-xl overflow-hidden bg-[#0d1117] p-2 border border-[#21262d] flex justify-center relative min-h-[120px]">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-[#0d1117]">
              <RefreshCw className="w-4 h-4 text-[#58a6ff] animate-spin" />
            </div>
          )}
          <img
            src={imgSrc}
            alt={altText}
            className={`w-full h-auto rounded transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
            onLoad={() => setIsLoading(false)}
            onError={() => {
              setHasError(true);
              setIsLoading(false);
            }}
            loading="lazy"
          />
        </div>
      ) : (
        renderFallback()
      )}
    </div>
  );
};
