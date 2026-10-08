import React, { useState } from 'react';
import { Menu, X, Sun, Moon, FileText, Settings, ArrowUpRight } from 'lucide-react';
import { ProfileData } from '../types/portfolio';

interface NavbarProps {
  profile: ProfileData;
  isDark: boolean;
  onToggleTheme: () => void;
  onOpenResume: () => void;
  onOpenCustomizer: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  profile,
  isDark,
  onToggleTheme,
  onOpenResume,
  onOpenCustomizer,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Skills', href: '#skills' },
    { label: 'Experience', href: '#experience' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-neutral-950/80 dark:bg-neutral-950/85 light:bg-neutral-50/85 border-b border-neutral-800/80 light:border-neutral-200 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#"
          className="text-lg font-bold tracking-tight text-neutral-100 light:text-neutral-900 font-display hover:text-indigo-400 light:hover:text-indigo-600 transition-colors truncate max-w-[200px] sm:max-w-xs"
        >
          {profile.name}
        </a>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-neutral-400 light:text-neutral-600">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-neutral-100 light:hover:text-neutral-900 transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-indigo-500 hover:after:w-full after:transition-all after:duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Primary actions (Resume, Theme, Customize) */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={onToggleTheme}
            aria-label="Toggle color theme"
            className="p-2 text-neutral-400 light:text-neutral-600 hover:text-neutral-100 light:hover:text-neutral-900 rounded-lg hover:bg-neutral-800/60 light:hover:bg-neutral-200/60 transition-colors"
            title={isDark ? 'Switch to Light theme' : 'Switch to Dark theme'}
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
          </button>

          <button
            onClick={onOpenCustomizer}
            aria-label="Customize profile details"
            className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-neutral-400 light:text-neutral-600 hover:text-neutral-200 light:hover:text-neutral-900 rounded-lg hover:bg-neutral-800/60 light:hover:bg-neutral-200/60 transition-colors"
            title="Edit profile information"
          >
            <Settings className="w-3.5 h-3.5" />
            <span className="whitespace-nowrap">Edit Profile</span>
          </button>

          <button
            onClick={onOpenResume}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg shadow-sm hover:shadow transition-all duration-150 whitespace-nowrap active:scale-95"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Resume</span>
          </button>

          {/* Mobile hamburger toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-neutral-400 light:text-neutral-600 hover:text-neutral-100 light:hover:text-neutral-900 rounded-lg hover:bg-neutral-800/60 transition-colors"
            aria-label="Toggle mobile menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-neutral-800 light:border-neutral-200 bg-neutral-950/95 light:bg-neutral-50/95 px-5 py-4 space-y-3">
          <nav className="flex flex-col gap-2.5 text-sm font-medium text-neutral-300 light:text-neutral-700">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 hover:text-indigo-400 light:hover:text-indigo-600 transition-colors flex items-center justify-between"
              >
                <span>{link.label}</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-neutral-500" />
              </a>
            ))}
          </nav>
          <div className="pt-3 border-t border-neutral-800/80 light:border-neutral-200 flex items-center justify-between">
            <button
              onClick={() => {
                onOpenCustomizer();
                setMobileMenuOpen(false);
              }}
              className="text-xs font-medium text-neutral-400 light:text-neutral-600 flex items-center gap-1.5 hover:text-neutral-200"
            >
              <Settings className="w-3.5 h-3.5" />
              <span>Personalize Info</span>
            </button>
            <span className="text-xs text-neutral-500">{profile.location}</span>
          </div>
        </div>
      )}
    </header>
  );
};
