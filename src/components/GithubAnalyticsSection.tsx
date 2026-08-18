import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  Flame, 
  Trophy, 
  GitFork, 
  Star, 
  ExternalLink, 
  FolderGit2,
  RefreshCw,
  Clock
} from 'lucide-react';
import { PROFILE_INFO } from '../data/profileData';
import { GithubRepo } from '../types';
import { SafeGithubStatCard } from './SafeGithubStatCard';

export const GithubAnalyticsSection: React.FC = () => {
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [loadingRepos, setLoadingRepos] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'repos' | 'trophies'>('overview');

  useEffect(() => {
    fetchRepos();
  }, []);

  const fetchRepos = async () => {
    setLoadingRepos(true);
    try {
      const response = await fetch(`https://api.github.com/users/${PROFILE_INFO.handle}/repos?sort=updated&per_page=6`);
      if (response.ok) {
        const data = await response.json();
        setRepos(data);
      } else {
        // Fallback placeholder data if GitHub rate limits
        setRepos([
          {
            id: 1,
            name: 'Nudrik',
            description: 'Interactive developer profile & neural network activity tracker',
            html_url: 'https://github.com/nudrik/Nudrik',
            stargazers_count: 12,
            forks_count: 4,
            language: 'TypeScript',
            updated_at: '2026-05-26',
            topics: ['portfolio', 'github-profile', 'neural-network', 'svg'],
          },
          {
            id: 2,
            name: 'PORTFOLIO',
            description: 'Personal web portfolio showcasing full-stack & AI/ML projects',
            html_url: 'https://github.com/nudrik/PORTFOLIO',
            stargazers_count: 8,
            forks_count: 2,
            language: 'JavaScript',
            updated_at: '2026-05-20',
            topics: ['portfolio', 'web-development', 'react'],
          }
        ]);
      }
    } catch {
      setRepos([
        {
          id: 1,
          name: 'Nudrik',
          description: 'Interactive developer profile & neural network activity tracker',
          html_url: 'https://github.com/nudrik/Nudrik',
          stargazers_count: 12,
          forks_count: 4,
          language: 'TypeScript',
          updated_at: '2026-05-26',
        }
      ]);
    } finally {
      setLoadingRepos(false);
    }
  };

  return (
    <section id="analytics" className="py-12 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#d2a8ff]/10 border border-[#d2a8ff]/30 flex items-center justify-center text-[#d2a8ff]">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[#e6edf3] font-mono tracking-tight flex items-center gap-2">
                <span>GitHub Analytics & Telemetry</span>
              </h2>
              <p className="text-sm text-[#8b949e]">
                Live metrics, contribution streaks, repository stats, and achievement trophies
              </p>
            </div>
          </div>

          {/* Tab selector */}
          <div className="flex items-center gap-1.5 p-1 bg-[#161b22] border border-[#30363d] rounded-xl text-xs font-mono">
            <button
              id="tab-analytics-overview"
              onClick={() => setActiveTab('overview')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                activeTab === 'overview' ? 'bg-[#21262d] text-[#e6edf3] font-semibold' : 'text-[#8b949e] hover:text-[#e6edf3]'
              }`}
            >
              Overview Stats
            </button>
            <button
              id="tab-analytics-repos"
              onClick={() => setActiveTab('repos')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                activeTab === 'repos' ? 'bg-[#21262d] text-[#e6edf3] font-semibold' : 'text-[#8b949e] hover:text-[#e6edf3]'
              }`}
            >
              Repositories
            </button>
            <button
              id="tab-analytics-trophies"
              onClick={() => setActiveTab('trophies')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                activeTab === 'trophies' ? 'bg-[#21262d] text-[#e6edf3] font-semibold' : 'text-[#8b949e] hover:text-[#e6edf3]'
              }`}
            >
              Trophies
            </button>
          </div>
        </div>

        {/* Tab 1: Overview stats */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Stats & Streak Side-by-Side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* GitHub Stats Card */}
              <SafeGithubStatCard
                title="Profile Stats"
                subtitle="@nudrik"
                icon={BarChart3}
                iconColor="text-[#58a6ff]"
                imgSrc="https://github-readme-stats.vercel.app/api?username=nudrik&show_icons=true&theme=tokyonight&hide_border=true&bg_color=0d1117&count_private=true&include_all_commits=true&cache_seconds=1800"
                altText="GitHub Stats"
                fallbackType="stats"
              />

              {/* Streak Stats Card */}
              <SafeGithubStatCard
                title="Contribution Streak"
                subtitle="consistent commits"
                icon={Flame}
                iconColor="text-[#f0883e]"
                imgSrc="https://github-readme-streak-stats.herokuapp.com/?user=nudrik&theme=tokyonight&hide_border=true&background=0d1117&cache_seconds=1800"
                altText="GitHub Streak"
                fallbackType="streak"
              />
            </div>

            {/* 31-Day Activity Graph */}
            <SafeGithubStatCard
              title="31-Day Commit Activity Graph"
              subtitle="Last 31 Days"
              icon={Clock}
              iconColor="text-[#3fb950]"
              imgSrc="https://github-readme-activity-graph.vercel.app/graph?username=nudrik&theme=react-dark&hide_border=true&area=true&custom_title=Contribution%20Graph%20(Last%2031%20Days)&bg_color=0d1117"
              altText="GitHub Activity Graph"
              fallbackType="activity"
            />
          </div>
        )}

        {/* Tab 2: Repositories list */}
        {activeTab === 'repos' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="text-xs font-mono text-[#8b949e]">
                Live Public Repositories for <span className="text-[#58a6ff]">@nudrik</span>
              </div>
              <button
                id="refresh-repos-btn"
                onClick={fetchRepos}
                className="flex items-center gap-1 text-xs text-[#58a6ff] hover:text-[#79c0ff] font-mono cursor-pointer"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loadingRepos ? 'animate-spin' : ''}`} />
                <span>Refresh</span>
              </button>
            </div>

            {loadingRepos ? (
              <div className="text-center py-12">
                <div className="w-8 h-8 border-2 border-[#58a6ff] border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                <p className="text-xs text-[#8b949e] font-mono">Fetching latest repositories from GitHub API...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {repos.map((repo) => (
                  <a
                    key={repo.id}
                    id={`repo-card-${repo.id}`}
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 rounded-xl bg-[#161b22]/80 hover:bg-[#161b22] border border-[#30363d] hover:border-[#58a6ff]/50 transition-all flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <FolderGit2 className="w-4 h-4 text-[#58a6ff]" />
                          <span className="text-sm font-bold text-[#e6edf3] font-mono group-hover:text-[#58a6ff] transition-colors">
                            {repo.name}
                          </span>
                        </div>
                        <ExternalLink className="w-3.5 h-3.5 text-[#8b949e] group-hover:text-[#58a6ff]" />
                      </div>
                      <p className="text-xs text-[#8b949e] line-clamp-2 mb-3">
                        {repo.description || 'Public repository by Nudrik Raju.'}
                      </p>
                    </div>

                    <div className="flex items-center gap-4 text-xs font-mono text-[#8b949e] pt-2 border-t border-[#21262d]">
                      {repo.language && (
                        <div className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-[#58a6ff]"></span>
                          <span>{repo.language}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-[#e3b341]" />
                        <span>{repo.stargazers_count}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <GitFork className="w-3 h-3 text-[#8b949e]" />
                        <span>{repo.forks_count}</span>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Trophies display */}
        {activeTab === 'trophies' && (
          <SafeGithubStatCard
            title="GitHub Profile Trophies"
            subtitle="Recognitions & Badges"
            icon={Trophy}
            iconColor="text-[#e3b341]"
            imgSrc="https://github-profile-trophy.vercel.app/?username=nudrik&theme=tokyonight&no-frame=true&no-bg=true&row=2&column=4&margin-w=15&margin-h=15"
            altText="GitHub Trophies"
            fallbackType="trophy"
          />
        )}

        {/* Section Divider SVG */}
        <div className="w-full my-8 flex justify-center">
          <img src="/assets/section-divider.svg" alt="Divider" className="w-full max-w-3xl opacity-80" />
        </div>
      </div>
    </section>
  );
};
