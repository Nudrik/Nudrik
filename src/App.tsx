import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroHeader } from './components/HeroHeader';
import { ProjectsSection } from './components/ProjectsSection';
import { AboutSection } from './components/AboutSection';
import { AiMlSection } from './components/AiMlSection';
import { TechStackSection } from './components/TechStackSection';
import { GithubAnalyticsSection } from './components/GithubAnalyticsSection';
import { NeuralNetworkVisualizer } from './components/NeuralNetworkVisualizer';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ResumeViewerModal } from './components/ResumeViewerModal';

export const App: React.FC = () => {
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black text-[#e6edf3] font-sans antialiased selection:bg-[#58a6ff]/30 selection:text-[#79c0ff]">
      {/* Top Navbar */}
      <Navbar onOpenResume={() => setIsResumeOpen(true)} />

      {/* Main Content Sections */}
      <main>
        <HeroHeader onOpenResume={() => setIsResumeOpen(true)} />
        <ProjectsSection />
        <AboutSection />
        <AiMlSection />
        <TechStackSection />
        <GithubAnalyticsSection />
        <NeuralNetworkVisualizer />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Resume Modal */}
      <ResumeViewerModal 
        isOpen={isResumeOpen} 
        onClose={() => setIsResumeOpen(false)} 
      />
    </div>
  );
};

export default App;
