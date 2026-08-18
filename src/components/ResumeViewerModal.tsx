import React, { useState } from 'react';
import { 
  X, 
  Download, 
  FileText, 
  ExternalLink,
  Code, 
  Award,
  CheckCircle2,
  Printer,
  Mail,
  Github,
  Globe,
  GraduationCap,
  Briefcase,
  Layers,
  HeartHandshake,
  Sparkles,
  Loader2,
  Check,
  Moon,
  Sun
} from 'lucide-react';
import { PROFILE_INFO } from '../data/profileData';

interface ResumeViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeViewerModal: React.FC<ResumeViewerModalProps> = ({ isOpen, onClose }) => {
  const [themeMode, setThemeMode] = useState<'dark' | 'paper'>('dark');
  const [downloading, setDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  if (!isOpen) return null;

  // Direct and resilient PDF download
  const handleDownloadPdf = async () => {
    setDownloading(true);
    setDownloadSuccess(false);
    try {
      const response = await fetch(PROFILE_INFO.resumeFile);
      if (!response.ok) {
        throw new Error('Failed to fetch PDF binary');
      }
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = 'Nudrik_Raju_Resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setDownloadSuccess(true);
      setTimeout(() => {
        window.URL.revokeObjectURL(blobUrl);
        setDownloadSuccess(false);
      }, 3000);
    } catch (err) {
      console.warn('Direct blob download failed, falling back to direct download link:', err);
      const link = document.createElement('a');
      link.href = PROFILE_INFO.resumeFile;
      link.download = 'Nudrik_Raju_Resume.pdf';
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } finally {
      setDownloading(false);
    }
  };

  // Direct print
  const handlePrint = () => {
    window.print();
  };

  // Open in clean new tab
  const handleOpenInNewTab = () => {
    window.open(PROFILE_INFO.resumeFile, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div 
        id="resume-modal"
        className="relative w-full max-w-4xl max-h-[92vh] bg-[#0d1117] border border-[#30363d] rounded-2xl shadow-2xl flex flex-col overflow-hidden"
      >
        {/* Modal Top Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-4 sm:px-6 py-3.5 bg-[#161b22] border-b border-[#30363d]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#238636]/20 border border-[#238636]/40 flex items-center justify-center text-[#3fb950] shrink-0">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-[#e6edf3] font-mono leading-none flex items-center gap-2">
                <span>{PROFILE_INFO.name}</span>
                <span className="text-[11px] px-1.5 py-0.5 rounded bg-[#238636]/20 text-[#3fb950] border border-[#238636]/40 font-normal">
                  Curriculum Vitae
                </span>
              </h3>
              <p className="text-xs text-[#8b949e] mt-1 hidden sm:block">
                Full-Stack Web Developer & AI/ML Engineer
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Theme / Style Switcher */}
            <div className="flex items-center p-0.5 bg-[#0d1117] border border-[#30363d] rounded-lg text-xs font-mono">
              <button
                id="btn-dark-resume"
                onClick={() => setThemeMode('dark')}
                title="Dark Developer Theme"
                className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                  themeMode === 'dark' ? 'bg-[#21262d] text-[#58a6ff] font-semibold' : 'text-[#8b949e] hover:text-[#e6edf3]'
                }`}
              >
                <Moon className="w-3 h-3" />
                <span>Dark</span>
              </button>
              <button
                id="btn-paper-resume"
                onClick={() => setThemeMode('paper')}
                title="Standard ATS White Paper Layout"
                className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                  themeMode === 'paper' ? 'bg-[#21262d] text-[#3fb950] font-semibold' : 'text-[#8b949e] hover:text-[#e6edf3]'
                }`}
              >
                <Sun className="w-3 h-3" />
                <span>Paper</span>
              </button>
            </div>

            {/* Open Raw PDF tab */}
            <button
              id="open-pdf-tab-btn"
              onClick={handleOpenInNewTab}
              title="Open raw PDF file in new window"
              className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#21262d] hover:bg-[#30363d] text-[#c9d1d9] border border-[#30363d] text-xs font-medium transition-colors cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#58a6ff]" />
              <span>Open PDF</span>
            </button>

            {/* Print button */}
            <button
              id="print-resume-btn"
              onClick={handlePrint}
              title="Print or Save as PDF via Browser"
              className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#21262d] hover:bg-[#30363d] text-[#c9d1d9] border border-[#30363d] text-xs font-medium transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>

            {/* Download button */}
            <button
              id="download-resume-btn"
              onClick={handleDownloadPdf}
              disabled={downloading}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-white text-xs font-semibold transition-all shadow-sm cursor-pointer ${
                downloadSuccess 
                  ? 'bg-[#2ea043] text-white' 
                  : 'bg-[#238636] hover:bg-[#2ea043]'
              }`}
            >
              {downloading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Saving...</span>
                </>
              ) : downloadSuccess ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Downloaded!</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PDF</span>
                </>
              )}
            </button>

            {/* Close button */}
            <button
              id="close-resume-modal-btn"
              onClick={onClose}
              className="p-1.5 rounded-lg text-[#8b949e] hover:text-[#e6edf3] hover:bg-[#21262d] transition-colors cursor-pointer"
              title="Close Modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className={`p-4 sm:p-6 overflow-y-auto max-h-[calc(90vh-120px)] ${themeMode === 'paper' ? 'bg-[#f6f8fa]' : 'bg-[#0d1117]'}`}>
          <div 
            id="printable-resume" 
            className={`max-w-3xl mx-auto space-y-6 transition-all ${
              themeMode === 'paper' 
                ? 'bg-white text-[#24292f] p-6 sm:p-8 rounded-xl shadow-md border border-[#d0d7de]' 
                : 'text-[#e6edf3]'
            }`}
          >
            {/* Header Contact Block */}
            <div className={`p-5 rounded-2xl border ${themeMode === 'paper' ? 'bg-[#f6f8fa] border-[#d0d7de]' : 'bg-[#161b22]/90 border-[#30363d]'}`}>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className={`text-2xl sm:text-3xl font-bold font-mono tracking-tight ${themeMode === 'paper' ? 'text-[#1f2328]' : 'text-[#e6edf3]'}`}>
                    {PROFILE_INFO.name}
                  </h2>
                  <p className="text-sm font-mono font-semibold text-[#0969da] dark:text-[#3fb950] mt-0.5">
                    Full Stack Software Developer & AI/ML Engineer
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 text-xs font-mono">
                  <a
                    href={`mailto:${PROFILE_INFO.email}`}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md border transition-colors ${
                      themeMode === 'paper'
                        ? 'bg-white text-[#0969da] border-[#d0d7de] hover:border-[#0969da]'
                        : 'bg-[#0d1117] text-[#58a6ff] border-[#30363d] hover:border-[#58a6ff]'
                    }`}
                  >
                    <Mail className="w-3 h-3" />
                    <span>{PROFILE_INFO.email}</span>
                  </a>
                  <a
                    href={PROFILE_INFO.portfolioUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md border transition-colors ${
                      themeMode === 'paper'
                        ? 'bg-white text-[#8250df] border-[#d0d7de] hover:border-[#8250df]'
                        : 'bg-[#0d1117] text-[#d2a8ff] border-[#30363d] hover:border-[#d2a8ff]'
                    }`}
                  >
                    <Globe className="w-3 h-3" />
                    <span>Portfolio</span>
                  </a>
                  <a
                    href={PROFILE_INFO.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md border transition-colors ${
                      themeMode === 'paper'
                        ? 'bg-white text-[#24292f] border-[#d0d7de] hover:border-[#24292f]'
                        : 'bg-[#0d1117] text-[#e6edf3] border-[#30363d] hover:border-[#e6edf3]'
                    }`}
                  >
                    <Github className="w-3 h-3" />
                    <span>GitHub</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Professional Summary */}
            <div className={`p-5 rounded-2xl border ${themeMode === 'paper' ? 'bg-white border-[#d0d7de]' : 'bg-[#161b22]/70 border-[#30363d]'}`}>
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider mb-2 flex items-center gap-2 text-[#0969da] dark:text-[#58a6ff]">
                <Briefcase className="w-4 h-4" />
                <span>Professional Summary</span>
              </h4>
              <p className={`text-xs sm:text-sm leading-relaxed ${themeMode === 'paper' ? 'text-[#57606a]' : 'text-[#c9d1d9]'}`}>
                Passionate and results-driven Software Engineer specialized in architecting resilient Full-Stack Web Applications, scalable RESTful API microservices, Data Structures & Algorithms, and Deep Learning / AI solutions. Strong foundation in Java, Python, TypeScript, React, Express, MongoDB, and PostgreSQL with a proven track record of designing production systems (e.g. Smart Blood Bank Management System) and high-performance neural compute pipelines.
              </p>
            </div>

            {/* Technical Skills Matrix */}
            <div className={`p-5 rounded-2xl border ${themeMode === 'paper' ? 'bg-white border-[#d0d7de]' : 'bg-[#161b22]/70 border-[#30363d]'}`}>
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider mb-3 flex items-center gap-2 text-[#1a7f37] dark:text-[#3fb950]">
                <Code className="w-4 h-4" />
                <span>Technical Competencies</span>
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1">
                  <div className={`font-semibold font-mono ${themeMode === 'paper' ? 'text-[#0969da]' : 'text-[#58a6ff]'}`}>Programming Languages</div>
                  <div className={`${themeMode === 'paper' ? 'text-[#57606a]' : 'text-[#8b949e]'} leading-relaxed`}>Java, Python, TypeScript, JavaScript (ES6+), C, SQL (PostgreSQL, MySQL)</div>
                </div>
                <div className="space-y-1">
                  <div className={`font-semibold font-mono ${themeMode === 'paper' ? 'text-[#0969da]' : 'text-[#58a6ff]'}`}>Frontend Development</div>
                  <div className={`${themeMode === 'paper' ? 'text-[#57606a]' : 'text-[#8b949e]'} leading-relaxed`}>React.js, Tailwind CSS, HTML5, CSS3, JavaScript DOM, Bootstrap, Responsive UI</div>
                </div>
                <div className="space-y-1">
                  <div className={`font-semibold font-mono ${themeMode === 'paper' ? 'text-[#0969da]' : 'text-[#58a6ff]'}`}>Backend & API Architecture</div>
                  <div className={`${themeMode === 'paper' ? 'text-[#57606a]' : 'text-[#8b949e]'} leading-relaxed`}>Node.js, Express.js, RESTful Web Services, JWT Authentication, Apache Tomcat</div>
                </div>
                <div className="space-y-1">
                  <div className={`font-semibold font-mono ${themeMode === 'paper' ? 'text-[#0969da]' : 'text-[#58a6ff]'}`}>Databases & Storage</div>
                  <div className={`${themeMode === 'paper' ? 'text-[#57606a]' : 'text-[#8b949e]'} leading-relaxed`}>MongoDB, PostgreSQL, MySQL, Oracle Database, LocalStorage / IndexedDB</div>
                </div>
                <div className="space-y-1">
                  <div className={`font-semibold font-mono ${themeMode === 'paper' ? 'text-[#0969da]' : 'text-[#58a6ff]'}`}>AI / Machine Learning & DL</div>
                  <div className={`${themeMode === 'paper' ? 'text-[#57606a]' : 'text-[#8b949e]'} leading-relaxed`}>PyTorch, TensorFlow, Convolutional Neural Networks (CNN), ResNet, Transformers, Generative AI</div>
                </div>
                <div className="space-y-1">
                  <div className={`font-semibold font-mono ${themeMode === 'paper' ? 'text-[#0969da]' : 'text-[#58a6ff]'}`}>DevOps, Cloud & Tooling</div>
                  <div className={`${themeMode === 'paper' ? 'text-[#57606a]' : 'text-[#8b949e]'} leading-relaxed`}>Git, GitHub Actions, Docker, Render Cloud, Vercel, VS Code, Postman, Linux / Bash</div>
                </div>
              </div>
            </div>

            {/* Featured Engineering Projects */}
            <div className={`p-5 rounded-2xl border ${themeMode === 'paper' ? 'bg-white border-[#d0d7de]' : 'bg-[#161b22]/70 border-[#30363d]'}`}>
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider mb-4 flex items-center gap-2 text-[#cf222e] dark:text-[#e63946]">
                <Layers className="w-4 h-4" />
                <span>Featured Engineering Projects</span>
              </h4>

              <div className="space-y-4">
                {/* Project 1 */}
                <div className={`p-4 rounded-xl border ${themeMode === 'paper' ? 'bg-[#f6f8fa] border-[#d0d7de]' : 'bg-[#0d1117] border-[#21262d]'}`}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1.5">
                    <div className="flex items-center gap-2">
                      <HeartHandshake className="w-4 h-4 text-[#e63946]" />
                      <h5 className={`text-sm font-bold font-mono ${themeMode === 'paper' ? 'text-[#1f2328]' : 'text-[#e6edf3]'}`}>
                        Smart Blood Bank Management System
                      </h5>
                    </div>
                    <a
                      href={PROFILE_INFO.bloodBankUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-mono text-[#cf222e] dark:text-[#ff7b72] hover:underline flex items-center gap-1 font-semibold"
                    >
                      <span>Live Production App</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  <p className={`text-xs mb-2 leading-relaxed ${themeMode === 'paper' ? 'text-[#57606a]' : 'text-[#8b949e]'}`}>
                    End-to-end full-stack healthcare coordination platform with real-time donor-recipient matching, emergency blood stock level management, role-based hospital portals, and JWT secured REST APIs.
                  </p>
                  <div className="flex flex-wrap gap-1.5 text-[10px] font-mono">
                    {['React', 'Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'TailwindCSS', 'Render Cloud'].map((t) => (
                      <span key={t} className={`px-2 py-0.5 rounded border ${themeMode === 'paper' ? 'bg-white text-[#57606a] border-[#d0d7de]' : 'bg-[#161b22] text-[#8b949e] border-[#30363d]'}`}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Project 2 */}
                <div className={`p-4 rounded-xl border ${themeMode === 'paper' ? 'bg-[#f6f8fa] border-[#d0d7de]' : 'bg-[#0d1117] border-[#21262d]'}`}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1.5">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#58a6ff]" />
                      <h5 className={`text-sm font-bold font-mono ${themeMode === 'paper' ? 'text-[#1f2328]' : 'text-[#e6edf3]'}`}>
                        Interactive Developer Portfolio & AI/ML Showcase
                      </h5>
                    </div>
                    <a
                      href={PROFILE_INFO.portfolioUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-mono text-[#0969da] dark:text-[#58a6ff] hover:underline flex items-center gap-1 font-semibold"
                    >
                      <span>Live Portfolio Site</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  <p className={`text-xs mb-2 leading-relaxed ${themeMode === 'paper' ? 'text-[#57606a]' : 'text-[#8b949e]'}`}>
                    Engineered dynamic developer showcase incorporating interactive Deep CNN & Vision Transformer canvas simulation, real-time GitHub stats telemetry, and responsive project galleries.
                  </p>
                  <div className="flex flex-wrap gap-1.5 text-[10px] font-mono">
                    {['React', 'TypeScript', 'TailwindCSS', 'Canvas API', 'GitHub REST API'].map((t) => (
                      <span key={t} className={`px-2 py-0.5 rounded border ${themeMode === 'paper' ? 'bg-white text-[#57606a] border-[#d0d7de]' : 'bg-[#161b22] text-[#8b949e] border-[#30363d]'}`}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Education & Academic Credentials */}
            <div className={`p-5 rounded-2xl border ${themeMode === 'paper' ? 'bg-white border-[#d0d7de]' : 'bg-[#161b22]/70 border-[#30363d]'}`}>
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider mb-3 flex items-center gap-2 text-[#8250df] dark:text-[#d2a8ff]">
                <GraduationCap className="w-4 h-4" />
                <span>Education & Coursework</span>
              </h4>
              <div className="space-y-3">
                <div>
                  <div className={`flex flex-col sm:flex-row sm:items-center justify-between text-xs sm:text-sm font-semibold ${themeMode === 'paper' ? 'text-[#1f2328]' : 'text-[#e6edf3]'}`}>
                    <span>Bachelor of Technology (B.Tech) in Computer Science & Engineering</span>
                    <span className={`font-mono text-xs ${themeMode === 'paper' ? 'text-[#57606a]' : 'text-[#8b949e]'}`}>2022 – 2026</span>
                  </div>
                  <p className={`text-xs mt-1 leading-relaxed ${themeMode === 'paper' ? 'text-[#57606a]' : 'text-[#8b949e]'}`}>
                    Key Coursework: Data Structures & Algorithms, Object-Oriented Programming (Java), Database Management Systems (DBMS), Operating Systems, Computer Networks, Machine Learning & Deep Neural Networks.
                  </p>
                </div>
              </div>
            </div>

            {/* Key Strengths & Certifications */}
            <div className={`p-5 rounded-2xl border ${themeMode === 'paper' ? 'bg-white border-[#d0d7de]' : 'bg-[#161b22]/70 border-[#30363d]'}`}>
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider mb-3 flex items-center gap-2 text-[#1a7f37] dark:text-[#7ee787]">
                <Award className="w-4 h-4" />
                <span>Engineering Highlights & Achievements</span>
              </h4>
              <div className={`grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs ${themeMode === 'paper' ? 'text-[#57606a]' : 'text-[#c9d1d9]'}`}>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#1a7f37] dark:text-[#3fb950] shrink-0" />
                  <span>Algorithmic problem solving across LeetCode & HackerRank</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#1a7f37] dark:text-[#3fb950] shrink-0" />
                  <span>Production deployment on Render Cloud, Vercel, and GitHub Pages</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#1a7f37] dark:text-[#3fb950] shrink-0" />
                  <span>Strong understanding of Deep Learning tensor operations & CNNs</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#1a7f37] dark:text-[#3fb950] shrink-0" />
                  <span>Clean code principles, Git workflow, and component modularity</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Bottom Action Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-4 sm:px-6 py-3 bg-[#161b22] border-t border-[#30363d] text-xs text-[#8b949e] font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#3fb950]"></span>
            <span>Document: My_Resume.pdf (Verified Binary Ready)</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="text-[#8b949e] hover:text-[#e6edf3] flex items-center gap-1 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={handleOpenInNewTab}
              className="text-[#58a6ff] hover:underline flex items-center gap-1 transition-colors cursor-pointer"
            >
              <span>Open PDF in Tab</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
