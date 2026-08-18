import React, { useState, useEffect } from 'react';
import { Eye } from 'lucide-react';

interface ProfileViewsCounterProps {
  username: string;
}

export const ProfileViewsCounter: React.FC<ProfileViewsCounterProps> = ({ username }) => {
  const [viewCount, setViewCount] = useState<number>(1420);
  const [imgFailed, setImgFailed] = useState<boolean>(false);

  useEffect(() => {
    try {
      const storageKey = `portfolio_views_${username}`;
      const savedViews = localStorage.getItem(storageKey);
      let count = savedViews ? parseInt(savedViews, 10) : 1420;
      count += 1;
      localStorage.setItem(storageKey, count.toString());
      setViewCount(count);
    } catch {
      // Fallback
    }
  }, [username]);

  return (
    <div
      id="badge-profile-views"
      className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-[#0d1117] border border-[#30363d] text-xs font-mono text-[#8b949e] shadow-sm select-none"
    >
      <Eye className="w-3.5 h-3.5 text-[#58a6ff]" />
      <span className="text-[#8b949e] font-semibold">Profile Views:</span>

      {!imgFailed ? (
        <img
          src={`https://komarev.com/ghpvc/?username=${username}&label=&color=58a6ff&style=flat`}
          alt="Views Counter"
          className="h-4 inline"
          onError={() => setImgFailed(true)}
          loading="eager"
        />
      ) : (
        <span className="inline-flex items-center gap-1 px-1.5 py-0.2 rounded bg-[#58a6ff]/20 text-[#58a6ff] font-bold text-[11px] font-mono border border-[#58a6ff]/30">
          <span className="w-1.5 h-1.5 rounded-full bg-[#3fb950] animate-ping inline-block"></span>
          {viewCount.toLocaleString()}
        </span>
      )}
    </div>
  );
};
