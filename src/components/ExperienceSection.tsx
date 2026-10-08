import React from 'react';
import { Briefcase, Calendar, MapPin, CheckCircle2 } from 'lucide-react';
import { ExperienceItem } from '../types/portfolio';

interface ExperienceSectionProps {
  experiences: ExperienceItem[];
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({ experiences }) => {
  return (
    <section id="experience" className="py-20 border-t border-neutral-800/80 light:border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="text-xs font-semibold text-indigo-400 light:text-indigo-600 tracking-wider uppercase mb-2">
            Career Timeline & Impact
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-100 light:text-neutral-900 font-display tracking-tight text-balance">
            Track record of shipping mission-critical systems.
          </h2>
        </div>

        {/* Experience Timeline */}
        <div className="space-y-8 relative before:absolute before:inset-0 before:left-4 sm:before:left-8 before:w-0.5 before:bg-neutral-800/80 light:before:bg-neutral-200 before:pointer-events-none">
          {experiences.map((exp) => (
            <div key={exp.id} className="relative pl-10 sm:pl-16">
              {/* Timeline Indicator Dot */}
              <div
                className={`absolute left-2.5 sm:left-6.5 top-1.5 w-3.5 h-3.5 rounded-full border-2 ${
                  exp.current
                    ? 'bg-indigo-500 border-neutral-950 light:border-white ring-4 ring-indigo-500/20'
                    : 'bg-neutral-800 light:bg-neutral-300 border-neutral-950 light:border-white'
                }`}
              />

              {/* Experience Card */}
              <div className="p-6 sm:p-8 rounded-2xl bg-neutral-900/60 light:bg-neutral-100/80 border border-neutral-800/80 light:border-neutral-200 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-neutral-100 light:text-neutral-900 font-display">
                      {exp.role}
                    </h3>
                    <div className="text-sm font-semibold text-indigo-400 light:text-indigo-600 mt-0.5">
                      {exp.company}
                      <span className="text-neutral-500 font-normal"> · {exp.location}</span>
                    </div>
                  </div>

                  <div className="text-xs font-mono-code text-neutral-400 light:text-neutral-500 tabular-nums">
                    {exp.period}
                  </div>
                </div>

                <p className="text-sm text-neutral-300 light:text-neutral-700 leading-relaxed">
                  {exp.summary}
                </p>

                {/* Bulleted Achievements */}
                <div className="space-y-2 pt-2">
                  {exp.achievements.map((ach, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-neutral-400 light:text-neutral-600 leading-relaxed">
                      <span className="text-indigo-400 light:text-indigo-600 font-bold">›</span>
                      <span>{ach}</span>
                    </div>
                  ))}
                </div>

                {/* Tech Badges / Stack */}
                <div className="pt-3 border-t border-neutral-800/60 light:border-neutral-200/80 flex flex-wrap gap-x-2 gap-y-1 text-xs">
                  {exp.technologies.map((tech, idx) => (
                    <span key={tech} className="font-mono-code text-neutral-400 light:text-neutral-600">
                      {tech}
                      {idx < exp.technologies.length - 1 && (
                        <span aria-hidden="true" className="ml-2 text-neutral-600 light:text-neutral-300">·</span>
                      )}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
