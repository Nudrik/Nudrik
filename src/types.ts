export interface TechItem {
  id: string;
  name: string;
  category: 'languages' | 'frontend' | 'backend' | 'databases' | 'cloud' | 'tools';
  color: string;
  badgeBg: string;
  logo: string;
  description: string;
  iconName?: string;
  level?: string;
}

export interface AiTopic {
  id: string;
  title: string;
  badgeColor: string;
  logo: string;
  description: string;
  technologies: string[];
  focusAreas: string[];
}

export interface GithubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
  topics?: string[];
}

export interface SocialLink {
  id: string;
  name: string;
  url: string;
  badge: string;
  color: string;
  icon: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  liveUrl: string;
  githubUrl?: string;
  badgeText: string;
  badgeColor: string;
  status: string;
  category: string;
  techStack: string[];
  highlights: string[];
  role: string;
  iconType: 'bloodbank' | 'portfolio' | 'neural';
}
