import React, { useState } from 'react';
import { 
  Mail, 
  Send, 
  Check, 
  Copy, 
  ExternalLink, 
  MessageSquare, 
  Globe, 
  Terminal, 
  Code2, 
  Instagram, 
  Github,
  HeartHandshake
} from 'lucide-react';
import { PROFILE_INFO, SOCIAL_LINKS } from '../data/profileData';

export const ContactSection: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [senderName, setSenderName] = useState('');

  const copyEmail = () => {
    navigator.clipboard.writeText(PROFILE_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoUrl = `mailto:${PROFILE_INFO.email}?subject=${encodeURIComponent(subject || 'Collaboration Inquiry from Portfolio')}&body=${encodeURIComponent(
      `Hi Nudrik,\n\n${message}\n\nBest regards,\n${senderName || 'Visitor'}`
    )}`;
    window.location.href = mailtoUrl;
  };

  const getSocialIcon = (id: string) => {
    switch (id) {
      case 'bloodbank': return <HeartHandshake className="w-4 h-4" />;
      case 'github': return <Github className="w-4 h-4" />;
      case 'portfolio': return <Globe className="w-4 h-4" />;
      case 'leetcode': return <Code2 className="w-4 h-4" />;
      case 'hackerrank': return <Terminal className="w-4 h-4" />;
      case 'instagram': return <Instagram className="w-4 h-4" />;
      case 'email': return <Mail className="w-4 h-4" />;
      default: return <ExternalLink className="w-4 h-4" />;
    }
  };

  return (
    <section id="contact" className="py-12 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-[#f0883e]/10 border border-[#f0883e]/30 flex items-center justify-center text-[#f0883e]">
            <Mail className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-[#e6edf3] font-mono tracking-tight flex items-center gap-2">
              <span>Connect With Me</span>
            </h2>
            <p className="text-sm text-[#8b949e]">
              Open for software engineering opportunities, AI research collaborations, and open-source contributions
            </p>
          </div>
        </div>

        {/* 2 Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Social Links Cards */}
          <div className="lg:col-span-6 space-y-4">
            <div className="p-6 rounded-2xl bg-[#161b22]/70 border border-[#30363d] shadow-sm">
              <h3 className="text-sm font-semibold text-[#e6edf3] font-mono uppercase tracking-wider mb-4">
                Verified Social & Coding Channels
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {SOCIAL_LINKS.map((link) => (
                  <a
                    key={link.id}
                    id={`social-link-${link.id}`}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-[#0d1117]/80 hover:bg-[#161b22] border border-[#21262d] hover:border-[#58a6ff]/50 transition-all flex items-center justify-between group cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-lg bg-[#161b22] border border-[#30363d] text-[#e6edf3] group-hover:text-[#58a6ff] transition-colors">
                        {getSocialIcon(link.id)}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-[#e6edf3] font-mono group-hover:text-[#58a6ff] transition-colors">
                          {link.name}
                        </div>
                        <div className="text-[10px] text-[#8b949e]">
                          {link.id === 'email' ? 'Direct Mail' : link.id === 'bloodbank' ? 'Live App' : 'Profile'}
                        </div>
                      </div>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-[#8b949e] group-hover:text-[#58a6ff] transition-colors" />
                  </a>
                ))}
              </div>

              {/* Direct email pill */}
              <div className="mt-4 p-3.5 rounded-xl bg-[#0d1117] border border-[#21262d] flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-[#8b949e] font-mono">
                  <Mail className="w-4 h-4 text-[#58a6ff]" />
                  <span className="text-[#e6edf3] select-all">{PROFILE_INFO.email}</span>
                </div>
                <button
                  id="contact-copy-email-btn"
                  onClick={copyEmail}
                  className="flex items-center gap-1 px-2.5 py-1 text-xs rounded bg-[#21262d] hover:bg-[#30363d] text-[#e6edf3] border border-[#30363d] transition-colors cursor-pointer"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-3 h-3 text-[#3fb950]" />
                      <span className="text-[#3fb950] text-[11px]">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3 text-[#8b949e]" />
                      <span className="text-[11px]">Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Quick Message Composer */}
          <div className="lg:col-span-6">
            <div className="p-6 rounded-2xl bg-[#161b22]/70 border border-[#30363d] shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <MessageSquare className="w-4 h-4 text-[#58a6ff]" />
                <h3 className="text-sm font-semibold text-[#e6edf3] font-mono uppercase tracking-wider">
                  Quick Collaboration Message
                </h3>
              </div>

              <form onSubmit={handleSendMessage} className="space-y-4">
                <div>
                  <label htmlFor="contact-sender-name" className="block text-xs font-mono text-[#8b949e] mb-1">Your Name / Organization</label>
                  <input
                    id="contact-sender-name"
                    type="text"
                    required
                    placeholder="e.g. Jane Doe / AI Labs"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg bg-[#0d1117] border border-[#30363d] text-[#e6edf3] placeholder-[#8b949e] focus:outline-none focus:border-[#58a6ff] focus:ring-1 focus:ring-[#58a6ff]"
                  />
                </div>

                <div>
                  <label htmlFor="contact-subject" className="block text-xs font-mono text-[#8b949e] mb-1">Subject</label>
                  <input
                    id="contact-subject"
                    type="text"
                    required
                    placeholder="Project Inquiry / Job Opportunity / Collaboration"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg bg-[#0d1117] border border-[#30363d] text-[#e6edf3] placeholder-[#8b949e] focus:outline-none focus:border-[#58a6ff] focus:ring-1 focus:ring-[#58a6ff]"
                  />
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-xs font-mono text-[#8b949e] mb-1">Message</label>
                  <textarea
                    id="contact-message"
                    required
                    rows={4}
                    placeholder="Describe your project, question, or proposal..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg bg-[#0d1117] border border-[#30363d] text-[#e6edf3] placeholder-[#8b949e] focus:outline-none focus:border-[#58a6ff] focus:ring-1 focus:ring-[#58a6ff] resize-none"
                  />
                </div>

                <button
                  id="send-message-btn"
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-[#238636] hover:bg-[#2ea043] text-white text-xs font-mono font-medium transition-all shadow-md shadow-[#238636]/20 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Direct Email to Nudrik</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
