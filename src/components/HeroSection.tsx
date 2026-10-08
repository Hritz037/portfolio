import React, { useState } from 'react';
import { ArrowDown, Github, Linkedin, Mail, Check, Copy, ExternalLink, Sparkles, Terminal } from 'lucide-react';
import { ProfileData } from '../types/portfolio';

interface HeroSectionProps {
  profile: ProfileData;
  onOpenContact: () => void;
  onOpenResume: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  profile,
  onOpenContact,
  onOpenResume,
}) => {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden">
      {/* Subtle background ambient mesh */}
      <div
        className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[700px] h-[450px] bg-gradient-to-tr from-indigo-500/10 via-purple-500/5 to-transparent blur-3xl -z-10"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Editorial Headline & Actions */}
          <div className="lg:col-span-7 space-y-6">
            {/* Clean unboxed availability line (Zero-pill discipline) */}
            <div className="flex items-center gap-2.5 text-xs text-neutral-400 light:text-neutral-600 font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>{profile.availability}</span>
              <span aria-hidden="true" className="text-neutral-600 light:text-neutral-300">·</span>
              <span>{profile.location}</span>
            </div>

            {/* Display Headline */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-neutral-100 light:text-neutral-900 font-display leading-[1.08] text-balance">
                Building <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-indigo-200 to-white light:from-indigo-600 light:to-neutral-900">scalable systems</span> & high-craft interfaces.
              </h1>
              <p className="text-lg sm:text-xl text-neutral-300 light:text-neutral-700 font-normal leading-relaxed max-w-2xl">
                I am <strong className="font-semibold text-neutral-100 light:text-neutral-900">{profile.name}</strong>, a {profile.roleTitle.toLowerCase()}. {profile.headline}
              </p>
            </div>

            {/* CTA Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#projects"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg shadow-sm hover:shadow-md transition-all duration-150 active:scale-95"
              >
                <span>View Selected Works</span>
                <ArrowDown className="w-4 h-4" />
              </a>

              <button
                onClick={onOpenContact}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold text-neutral-200 light:text-neutral-800 bg-neutral-900 light:bg-neutral-200/80 hover:bg-neutral-800 light:hover:bg-neutral-300/80 border border-neutral-800 light:border-neutral-300 rounded-lg transition-all duration-150 active:scale-95"
              >
                <Mail className="w-4 h-4 text-neutral-400" />
                <span>Get in Touch</span>
              </button>

              <button
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-1.5 px-3.5 py-2.5 text-xs font-medium text-neutral-400 light:text-neutral-600 hover:text-neutral-200 light:hover:text-neutral-900 border border-neutral-800/80 light:border-neutral-300 rounded-lg hover:bg-neutral-900/60 transition-colors"
                title="Copy email to clipboard"
              >
                {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span className="font-mono-code text-[11px]">{copiedEmail ? 'Copied!' : 'Copy Email'}</span>
              </button>
            </div>

            {/* Claim-to-Proof Adjacency: Key Quantitative Impact Metrics */}
            <div className="pt-6 border-t border-neutral-800/80 light:border-neutral-200 grid grid-cols-3 gap-4 max-w-lg">
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-neutral-100 light:text-neutral-900 font-display tabular-nums">
                  {profile.yearsExperience}+
                </div>
                <div className="text-xs text-neutral-400 light:text-neutral-600 mt-0.5">
                  Years Experience
                </div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-neutral-100 light:text-neutral-900 font-display tabular-nums">
                  {profile.shippedProjectsCount}+
                </div>
                <div className="text-xs text-neutral-400 light:text-neutral-600 mt-0.5">
                  Shipped Systems
                </div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-neutral-100 light:text-neutral-900 font-display tabular-nums">
                  {profile.usersReachedCount}
                </div>
                <div className="text-xs text-neutral-400 light:text-neutral-600 mt-0.5">
                  Daily Users
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Portrait & Quick Verified Credentials */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-sm sm:max-w-md">
              {/* Outer frame styling with single-level card elevation */}
              <div className="relative bg-neutral-900 light:bg-neutral-100 border border-neutral-800 light:border-neutral-300 rounded-2xl p-3 shadow-xl">
                {/* Photo container with Zero-Broken-Image fallback */}
                <div className="relative aspect-square rounded-xl overflow-hidden bg-neutral-800 light:bg-neutral-200">
                  <img
                    src="/src/assets/images/portrait_hritika_editorial_1791445947422.jpg"
                    alt={`Portrait of ${profile.name}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-[1.02]"
                    onError={(e) => {
                      // Fallback display if image fails to load
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  {/* Subtle scrim gradient at bottom */}
                  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-neutral-950/80 via-neutral-950/30 to-transparent pointer-events-none" />

                  {/* Clean unboxed tag over photo */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-neutral-200">
                    <span className="font-medium drop-shadow-sm">{profile.roleTitle}</span>
                    <span className="text-neutral-300 drop-shadow-sm">SF / Remote</span>
                  </div>
                </div>

                {/* Quick Social & Action Bar under portrait */}
                <div className="mt-3 pt-3 border-t border-neutral-800/80 light:border-neutral-200 flex items-center justify-between px-1">
                  <div className="flex items-center gap-3">
                    <a
                      href="https://github.com/hritikagupta"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 text-neutral-400 hover:text-neutral-100 light:hover:text-neutral-900 transition-colors rounded-md hover:bg-neutral-800/60"
                      aria-label="GitHub profile"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                    <a
                      href="https://linkedin.com/in/hritikagupta"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 text-neutral-400 hover:text-neutral-100 light:hover:text-neutral-900 transition-colors rounded-md hover:bg-neutral-800/60"
                      aria-label="LinkedIn profile"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                    <a
                      href={`mailto:${profile.email}`}
                      className="p-1.5 text-neutral-400 hover:text-neutral-100 light:hover:text-neutral-900 transition-colors rounded-md hover:bg-neutral-800/60"
                      aria-label="Send direct email"
                    >
                      <Mail className="w-4 h-4" />
                    </a>
                  </div>

                  <button
                    onClick={onOpenResume}
                    className="text-xs font-semibold text-indigo-400 light:text-indigo-600 hover:underline inline-flex items-center gap-1"
                  >
                    <span>Read CV</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
