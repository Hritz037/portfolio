import React from 'react';
import { GraduationCap, Award, Compass, Sparkles, BookOpen } from 'lucide-react';
import { ProfileData, EducationItem } from '../types/portfolio';

interface AboutSectionProps {
  profile: ProfileData;
  education: EducationItem[];
}

export const AboutSection: React.FC<AboutSectionProps> = ({ profile, education }) => {
  return (
    <section id="about" className="py-20 border-t border-neutral-800/80 light:border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="text-xs font-semibold text-indigo-400 light:text-indigo-600 tracking-wider uppercase mb-2">
            Biography & Engineering Ethos
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-100 light:text-neutral-900 font-display tracking-tight text-balance">
            Architecture with intention. Code with restraint.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Narrative Story */}
          <div className="lg:col-span-7 space-y-6 text-neutral-300 light:text-neutral-700 text-base leading-relaxed">
            <p className="text-lg text-neutral-200 light:text-neutral-800 font-normal leading-relaxed">
              {profile.bioIntro}
            </p>

            {profile.bioParagraphs.map((para, idx) => (
              <p key={idx} className="leading-relaxed">
                {para}
              </p>
            ))}

            {/* Education Highlight Card */}
            <div className="pt-6">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-400 light:text-neutral-500 mb-4 flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-indigo-400" />
                <span>Education & Academic Background</span>
              </h3>

              <div className="space-y-4">
                {education.map((edu, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-xl bg-neutral-900/60 light:bg-neutral-100/80 border border-neutral-800/80 light:border-neutral-200"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-1.5">
                      <h4 className="text-base font-bold text-neutral-100 light:text-neutral-900 font-display">
                        {edu.degree}
                      </h4>
                      <span className="text-xs font-mono-code text-neutral-400 light:text-neutral-500 tabular-nums">
                        {edu.period}
                      </span>
                    </div>

                    <div className="text-sm font-medium text-indigo-400 light:text-indigo-600 mb-2">
                      {edu.institution} <span className="text-neutral-500">· {edu.location}</span>
                    </div>

                    {edu.honors && (
                      <div className="text-xs text-neutral-400 light:text-neutral-600 mb-2 flex items-center gap-1.5">
                        <Award className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span>{edu.honors}</span>
                      </div>
                    )}

                    <p className="text-xs text-neutral-400 light:text-neutral-600">
                      {edu.focus}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Guiding Engineering Principles */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-2xl bg-neutral-900/40 light:bg-neutral-100/60 border border-neutral-800/80 light:border-neutral-200">
              <div className="flex items-center gap-2 mb-6">
                <Compass className="w-4 h-4 text-indigo-400" />
                <h3 className="text-base font-bold text-neutral-100 light:text-neutral-900 font-display">
                  Working Principles
                </h3>
              </div>

              <div className="space-y-6">
                {profile.principles.map((principle, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <h4 className="text-sm font-semibold text-neutral-100 light:text-neutral-900">
                      {principle.title}
                    </h4>
                    <p className="text-xs text-neutral-400 light:text-neutral-600 leading-normal">
                      {principle.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* Quick Specs unboxed metadata */}
              <div className="mt-8 pt-6 border-t border-neutral-800/80 light:border-neutral-200 space-y-2.5 text-xs text-neutral-400 light:text-neutral-600">
                <div className="flex items-center justify-between">
                  <span>Primary Languages</span>
                  <span className="text-neutral-200 light:text-neutral-800 font-mono-code">TypeScript, Go, SQL</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Architecture Specialty</span>
                  <span className="text-neutral-200 light:text-neutral-800">Event-driven & CRDTs</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Open Source</span>
                  <span className="text-neutral-200 light:text-neutral-800">HyperCore ORM Maintainer</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
