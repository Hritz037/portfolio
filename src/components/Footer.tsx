import React from 'react';
import { ArrowUp, Github, Linkedin, Mail, Twitter } from 'lucide-react';
import { ProfileData } from '../types/portfolio';

interface FooterProps {
  profile: ProfileData;
}

export const Footer: React.FC<FooterProps> = ({ profile }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-neutral-800/80 light:border-neutral-200 py-10 bg-neutral-950 light:bg-neutral-50 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400 light:text-neutral-600">
          {/* Left: Copyright */}
          <div className="flex items-center gap-2">
            <span className="font-semibold text-neutral-200 light:text-neutral-900 font-display">
              {profile.name}
            </span>
            <span aria-hidden="true">·</span>
            <span>© {currentYear}</span>
            <span aria-hidden="true">·</span>
            <span>All rights reserved</span>
          </div>

          {/* Center: Quiet navigation / socials */}
          <div className="flex items-center gap-5">
            <a
              href="https://github.com/hritikagupta"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-neutral-200 light:hover:text-neutral-900 transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/hritikagupta"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-neutral-200 light:hover:text-neutral-900 transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="https://x.com/hritikagupta"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-neutral-200 light:hover:text-neutral-900 transition-colors"
            >
              Twitter
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="hover:text-neutral-200 light:hover:text-neutral-900 transition-colors"
            >
              Email
            </a>
          </div>

          {/* Right: Back to top button */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 hover:text-neutral-200 light:hover:text-neutral-900 transition-colors"
            aria-label="Back to top of page"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
